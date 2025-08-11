#!/usr/bin/env python3
"""
Toolstation product scraper (Python 3.9+)

Requirements:
    pip install pandas openpyxl selenium undetected-chromedriver python-Levenshtein
"""

import random
import sys
import time
from pathlib import Path
from difflib import SequenceMatcher

import pandas as pd
import undetected_chromedriver as uc
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains

# ----------------------------------------------------------------------
# Configuration
# ----------------------------------------------------------------------
INPUT_EXCEL = "test_load.xlsx"               # must contain an 'Item' column
OUTPUT_EXCEL = "output_with_toolstation_data.xlsx"
SEARCH_TIMEOUT = 12                          # seconds to wait for results
PAUSE_MIN, PAUSE_MAX = 1.2, 3.8              # human‑like delay range

# ----------------------------------------------------------------------
# Utility functions
# ----------------------------------------------------------------------
def pause() -> None:
    """Sleep a random human‑like interval."""
    time.sleep(random.uniform(PAUSE_MIN, PAUSE_MAX))

def move_mouse(driver, moves: int = 4) -> None:
    """Jitter the mouse cursor around the page to look human."""
    actions = ActionChains(driver)
    for _ in range(moves):
        x_off = random.randint(-250, 250)
        y_off = random.randint(-180, 180)
        try:
            actions.move_by_offset(x_off, y_off).perform()
        except Exception:
            # If offset is off‑screen, reset to origin
            actions.move_by_offset(-x_off, -y_off).perform()
        pause()

def similarity(a: str, b: str) -> float:
    """Return fuzzy ratio between two strings (0–1)."""
    return SequenceMatcher(None, a.lower(), b.lower()).ratio()

def start_driver():
    """Launch an undetected Chrome session with a rotating user agent."""
    ua_pool = [
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15",
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
    ]

    chrome_opts = uc.ChromeOptions()
    chrome_opts.add_argument("--window-size=1280,900")
    chrome_opts.add_argument("--disable-blink-features=AutomationControlled")
    chrome_opts.add_argument("--disable-infobars")
    chrome_opts.add_argument("--disable-extensions")
    chrome_opts.add_argument(f"user-agent={random.choice(ua_pool)}")

    # Headless mode is possible but marginally riskier
    driver = uc.Chrome(options=chrome_opts, headless=False)
    return driver

# ----------------------------------------------------------------------
# Core scraping logic
# ----------------------------------------------------------------------
def best_matching_card(cards, query: str):
    """Return the product card whose title best matches the query."""
    winner, top_score = None, 0.0
    for card in cards:
        try:
            title_el = card.find_element(By.CSS_SELECTOR, "p.font-semibold")
            title = title_el.text.strip()
            score = similarity(query, title)
            if score > top_score:
                winner, top_score = card, score
        except Exception:
            continue
    return winner

def scrape_single_query(driver, query: str) -> dict:
    """Fetch price & description for one search term."""
    search_url = f"https://www.toolstation.com/search?q={query.replace(' ', '+')}"
    driver.get(search_url)
    pause()
    move_mouse(driver)

    WebDriverWait(driver, SEARCH_TIMEOUT).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, "div[data-component='ProductCardHorizontal']"))
    )
    cards = driver.find_elements(By.CSS_SELECTOR, "div[data-component='ProductCardHorizontal']")
    card = best_matching_card(cards, query)

    if not card:
        return {"query": query, "price": "", "description": ""}

    # Price (try several selectors)
    price = ""
    for sel in ("span[data-testid='product-price']", "span.font-bold", "span[class*='price']"):
        try:
            price = card.find_element(By.CSS_SELECTOR, sel).text.strip()
            if price:
                break
        except Exception:
            continue

    # Title / description
    try:
        description = card.find_element(By.CSS_SELECTOR, "p.font-semibold").text.strip()
    except Exception:
        description = ""

    return {"query": query, "price": price, "description": description}

# ----------------------------------------------------------------------
# Main program
# ----------------------------------------------------------------------
def main() -> None:
    if not Path(INPUT_EXCEL).exists():
        print(f"Input file '{INPUT_EXCEL}' not found.", file=sys.stderr)
        sys.exit(1)

    df = pd.read_excel(INPUT_EXCEL)
    if "Item" not in df.columns:
        print(f"'Item' column missing in {INPUT_EXCEL}. Found columns: {list(df.columns)}", file=sys.stderr)
        sys.exit(1)

    queries = df["Item"].astype(str).tolist()
    driver = start_driver()
    results = []

    try:
        for q in queries:
            print(f"Scraping '{q}' …")
            results.append(scrape_single_query(driver, q))
            pause()
    finally:
        driver.quit()

    pd.DataFrame(results).to_excel(OUTPUT_EXCEL, index=False)
    print(f"Finished. Data saved to '{OUTPUT_EXCEL}'")

if __name__ == "__main__":
    main()
