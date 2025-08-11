import requests
from bs4 import BeautifulSoup
import pandas as pd
import time
from difflib import SequenceMatcher

excel_path = 'test_load.xlsx'
df = pd.read_excel(excel_path)
df['Toolstation Price'] = ''
df['Toolstation Description'] = ''

def search_toolstation(query):
    headers = {"User-Agent": "Mozilla/5.0"}
    url = f"https://www.toolstation.com/search?q={query.replace(' ', '+')}"
    resp = requests.get(url, headers=headers)
    print(resp)
    if resp.status_code != 200:
        return None
    soup = BeautifulSoup(resp.content, 'html.parser')

    best_score = 0.0
    best_href = None

    cards = soup.select('div[data-component="ProductCardHorizontal"][data-testid="product-card"]')
    for card in cards:
        link = card.select_one('a[data-testid="product-card-image-link"], a[href*="hep2o-blanking-peg"]')
        title_tag = card.select_one('a[href*="hep2o-blanking-peg"] p.font-semibold')
        title = title_tag.get_text(strip=True) if title_tag else link.get_text(strip=True) if link else ''
        if not link or not title:
            continue
        score = SequenceMatcher(None, query.lower(), title.lower()).ratio()
        print(f"Found card: title='{title}' score={score:.2f}")
        if score > best_score:
            best_score = score
            best_href = link['href']

    if best_href:
        print("Best link:", best_href, "score:", best_score)
        return "https://www.toolstation.com" + best_href
    return None

def get_toolstation_details(product_url):
    headers = {"User-Agent": "Mozilla/5.0"}
    resp = requests.get(product_url, headers=headers)
    resp.raise_for_status()
    soup = BeautifulSoup(resp.content, 'html.parser')

    price_tag = soup.select_one('span.font-bold.text-blue')
    price = price_tag.get_text(strip=True) if price_tag else ''

    desc_tag = soup.select_one('div[data-testid="product-description"]')
    desc = desc_tag.get_text(strip=True) if desc_tag else ''
    return price, desc

for idx, row in df.iterrows():
    item = str(row.get('Item', '')).strip()
    print(f"\nSearching for: {item}")
    try:
        product_url = search_toolstation(item)
        if product_url:
            price, desc = get_toolstation_details(product_url)
            df.at[idx, 'Toolstation Price'] = price
            df.at[idx, 'Toolstation Description'] = desc
        else:
            df.at[idx, 'Toolstation Price'] = 'Not Found'
            df.at[idx, 'Toolstation Description'] = 'Not Found'
    except Exception as e:
        df.at[idx, 'Toolstation Price'] = f'Error: {e}'
        df.at[idx, 'Toolstation Description'] = f'Error: {e}'
    time.sleep(1)

df.to_excel('output_with_toolstation_data.xlsx', index=False)
print("Done!")
