"""
Script to scrape price and description information for a list of products
from Toolstation or other websites. The input list is expected to be stored
in an Excel file with at least the following columns:

    - SKU:  an internal identifier for the product (not used directly for scraping)
    - Item: the name of the product to search for
    - Price (£): column to be filled with the price discovered during scraping
    - Photo: URL to an image of the product.  For Toolstation items this
      often contains the numeric product code in the filename, which can
      be extracted to build the product URL.
    - Description: column to be filled with the product description

This script demonstrates one way to automate the enrichment of the
spreadsheet using Python.  It relies on a combination of heuristics:

    * If the photo URL appears to come from Toolstation, it tries to
      extract the numeric product code and fetch the corresponding product
      page directly from Toolstation.
    * Otherwise it uses the product name to perform a search.  By default
      a Google Custom Search is attempted via the `googlesearch` package.

The script uses `requests` to download pages and `BeautifulSoup` to
extract price and description elements.  Because modern e‑commerce sites
often rely heavily on JavaScript, this approach may not work for every
product.  You may need to adjust selectors or add additional fallbacks
for other sites.

To run this script locally you need network access and the following
dependencies installed:

    pip install pandas requests beautifulsoup4 googlesearch-python

Example usage:

    python scrape_products.py --input Main_load.xlsx --output Main_load_filled.xlsx

Note: This script is provided as a starting point.  Depending on the
structure of the target websites and network restrictions, it might
require further customization.
"""

import argparse
import re
import sys
import time
from dataclasses import dataclass
from typing import Optional, Tuple

import pandas as pd
import requests
from bs4 import BeautifulSoup

try:
    # `googlesearch` provides a simple interface to Google Custom Search.
    # It may not be installed by default.  See: https://pypi.org/project/googlesearch-python/
    from googlesearch import search as google_search
except ImportError:
    google_search = None  # type: ignore


@dataclass
class ProductInfo:
    """Represents scraped product information."""
    price: Optional[str] = None
    description: Optional[str] = None


def extract_toolstation_code(photo_url: str) -> Optional[str]:
    """Try to extract a numeric Toolstation product code from the image URL.

    Many Toolstation product images are served from a CDN with a path such as
    `.../images/141020-UK/388/93616.jpg`.  The final numeric segment often
    corresponds to the product code used in the product URL (p93616).

    Args:
        photo_url: URL string pointing at the product image.

    Returns:
        The extracted numeric code as a string, or None if no pattern is found.
    """
    if not photo_url:
        return None
    # Look for a sequence of 5–6 digits before the file extension
    match = re.search(r"/([0-9]{5,7})\.(?:jpg|jpeg|png|webp)$", photo_url)
    if match:
        code = match.group(1)
        print(f"[DEBUG] Extracted Toolstation code from photo URL: {code}")
        return code
    print(f"[DEBUG] No Toolstation code found in photo URL: {photo_url}")
    return None


def fetch_product_page(url: str, *, timeout: float = 10.0) -> Optional[str]:
    """Download a web page using requests, returning its HTML or None on failure.

    Toolstation may block automated scrapers.  If you encounter HTTP 403
    errors, consider adjusting headers or using a headless browser like
    Selenium.  This function adds a user‑agent header to help mimic a
    browser request.
    """
    headers = {
        "User-Agent": (
            "Mozilla/5.0 (X11; Linux x86_64) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/114.0 Safari/537.36"
        )
    }
    try:
        print(f"[DEBUG] Fetching URL: {url}")
        resp = requests.get(url, headers=headers, timeout=timeout)
    except requests.RequestException as e:
        print(f"[DEBUG] RequestException while fetching {url}: {e}")
        return None
    # Only accept successful responses
    if resp.status_code >= 200 and resp.status_code < 300:
        print(f"[DEBUG] Successfully fetched page: {url}")
        return resp.text
    print(f"[DEBUG] Failed to fetch page: {url}, status code: {resp.status_code}")
    return None


def parse_toolstation_product(html: str) -> ProductInfo:
    """Extract price and description from a Toolstation product page.

    The function looks for:
      * A price string containing the pound sign (\u00a3)
      * A product details section introduced by a heading like "Product details"

    Args:
        html: Raw HTML of the product page.

    Returns:
        ProductInfo with the extracted price and description, where available.
    """
    soup = BeautifulSoup(html, "html.parser")
    info = ProductInfo()

    # Attempt to extract the price.  Toolstation often includes both VAT
    # inclusive and exclusive prices.  We'll capture the first occurrence
    # of a pound sign followed by numbers.
    price_text = None
    for text in soup.stripped_strings:
        if '£' in text:
            # Many unrelated strings include £ (delivery info, etc.).  We'll
            # pick the first plausible price: it should have digits after £.
            m = re.search(r"£\s*([0-9]+\.[0-9]{2})", text)
            if m:
                price_text = f"£{m.group(1)}"
                print(f"[DEBUG] Found price: {price_text}")
                break
    if not price_text:
        print("[DEBUG] No price found on page.")
    info.price = price_text

    # Extract the product description.  Toolstation product pages label
    # descriptive sections with an h3 heading "Product details".  We'll
    # capture the text between this heading and the next heading of the same level.
    description = []
    product_details_heading = soup.find(lambda tag: tag.name in ['h3', 'h2'] and 'Product details' in tag.get_text())
    if product_details_heading:
        print("[DEBUG] Found 'Product details' heading.")
        # Collect siblings until another heading or the end
        for sibling in product_details_heading.next_siblings:
            # Stop if we encounter another high-level heading
            if getattr(sibling, 'name', None) in ['h2', 'h3']:
                break
            if isinstance(sibling, str):
                continue
            # Concatenate text within paragraphs or list items
            text = sibling.get_text(separator=' ', strip=True)
            # Skip lines that look like prices (contain a pound sign followed by digits)
            if text and not re.search(r"\£\s*\d", text):
                description.append(text)
    else:
        print("[DEBUG] No 'Product details' heading found.")

    info.description = ' '.join(description) if description else None

    # Fallback: try the meta description
    if not info.description:
        meta_desc = soup.find('meta', attrs={'name': 'description'})
        if meta_desc and meta_desc.get('content'):
            info.description = meta_desc['content']
            print(f"[DEBUG] Used meta description: {info.description}")

    if info.description:
        print(f"[DEBUG] Found description: {info.description[:100]}{'...' if len(info.description) > 100 else ''}")
    else:
        print("[DEBUG] No description found.")

    return info


def search_product_url(query: str, max_results: int = 5) -> Optional[str]:
    """Search the web for a product and return the first Toolstation product URL.

    This function uses the googlesearch package if available.  If it is
    unavailable, it returns None.

    Args:
        query: Search query string (e.g., product name plus "Toolstation").
        max_results: Number of search results to examine.

    Returns:
        A Toolstation URL string, or None if none found.
    """
    if google_search is None:
        print("[DEBUG] googlesearch package not available.")
        return None
    print(f"[DEBUG] Searching for product with query: '{query} Toolstation'")
    for url in google_search(query + " Toolstation", num_results=max_results):
        print(f"[DEBUG] Search result: {url}")
        if 'toolstation.com' in url:
            print(f"[DEBUG] Using Toolstation URL from search: {url}")
            return url
    print("[DEBUG] No Toolstation URL found in search results.")
    return None


def scrape_product(item_name: str, photo_url: str) -> ProductInfo:
    """Scrape price and description for a single product.

    The function attempts the following in order:
      1. If the photo URL contains a Toolstation product code, build a
         candidate product URL of the form `https://www.toolstation.com/p{code}`.
         As Toolstation product URLs include a slug, we cannot construct
         the full URL without searching; however, including the code in a
         web search query improves our chances of finding the correct page.
      2. Perform a web search for the item name (and code if extracted)
         plus "Toolstation".  Extract the first result on the Toolstation
         domain.
      3. If a Toolstation URL is found, download the page and parse it.
      4. If Toolstation fails or is unavailable, leave the fields empty.

    Args:
        item_name: Product name from the spreadsheet.
        photo_url: URL of the product image.

    Returns:
        ProductInfo with price and description (may be None if not found).
    """
    code = extract_toolstation_code(photo_url or '')
    search_terms = [item_name]
    if code:
        search_terms.append(code)
    query = ' '.join(search_terms)
    print(f"[DEBUG] Scraping product: item_name='{item_name}', photo_url='{photo_url}', query='{query}'")
    candidate_url = search_product_url(query)
    if not candidate_url:
        print("[DEBUG] No candidate URL found for product.")
        return ProductInfo()
    html = fetch_product_page(candidate_url)
    if not html:
        print("[DEBUG] Failed to fetch HTML for candidate URL.")
        return ProductInfo()
    info = parse_toolstation_product(html)
    print(f"[DEBUG] Scraped info: price={info.price}, description={'set' if info.description else 'not set'}")
    return info


def enrich_spreadsheet(df: pd.DataFrame, output_path: str = None) -> pd.DataFrame:
    """
    Iterate through the DataFrame and fill price and description fields.
    If interrupted, saves progress to output_path if provided.
    """
    updated = df.copy()
    try:
        for idx, row in updated.iterrows():
            # Skip rows that already have both price and description
            if pd.notna(row.get('Price (£)', None)) and pd.notna(row.get('Description', None)):
                print(f"[DEBUG] Row {idx} already has price and description, skipping.")
                continue
            item_name = str(row.get('Item', ''))
            photo_url = str(row.get('Photo', ''))
            print(f"[DEBUG] Scraping row {idx}: {item_name}")
            info = scrape_product(item_name, photo_url)
            if info.price:
                print(f"[DEBUG] Setting price for row {idx}: {info.price}")
                updated.at[idx, 'Price (£)'] = info.price
            if info.description:
                print(f"[DEBUG] Setting description for row {idx}: {info.description[:100]}{'...' if len(info.description) > 100 else ''}")
                updated.at[idx, 'Description'] = info.description
            # polite delay
            time.sleep(1.0)
    except KeyboardInterrupt:
        print("\n[DEBUG] Interrupted by user. Saving progress...")
        if output_path:
            try:
                updated.to_excel(output_path, index=False)
                print(f"[DEBUG] Progress saved to {output_path}")
            except Exception as e:
                print(f"[DEBUG] Error saving progress: {e}")
        else:
            print("[DEBUG] No output path provided, progress not saved.")
        sys.exit(130)
    return updated


def main(argv: Optional[list] = None) -> int:
    parser = argparse.ArgumentParser(description="Scrape product prices and descriptions from Toolstation.")
    parser.add_argument('--input', required=True, help='Path to the input Excel file (e.g. Main_load.xlsx)')
    parser.add_argument('--output', required=True, help='Path to the output Excel file with filled data')
    args = parser.parse_args(argv)

    try:
        df = pd.read_excel(args.input)
        print(f"[DEBUG] Loaded input file: {args.input}, {len(df)} rows")
    except Exception as e:
        print(f"Error reading input file: {e}")
        return 1
    enriched_df = enrich_spreadsheet(df, output_path=args.output)
    try:
        enriched_df.to_excel(args.output, index=False)
        print(f"Saved filled spreadsheet to {args.output}")
    except Exception as e:
        print(f"Error writing output file: {e}")
        return 1
    return 0


if __name__ == '__main__':
    sys.exit(main())