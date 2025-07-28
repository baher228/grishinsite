import time
import pandas as pd
import random
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains

# --- Step 1: Load product queries from Excel ---
input_excel = 'test_load.xlsx'
output_excel = 'output_with_toolstation_data.xlsx'

# Use 'Item' column as query source
df = pd.read_excel(input_excel)
if 'Item' not in df.columns:
    print(f"Error: 'Item' column not found in {input_excel}. Available columns: {list(df.columns)}")
    raise KeyError("Input Excel file must contain a column named 'Item'.")
queries = df['Item'].astype(str).tolist()

# --- Step 2: Prepare Selenium (Chrome headless) ---
chrome_options = Options()
#chrome_options.add_argument("--headless=new")  # Headless for background work
chrome_options.add_argument('--disable-blink-features=AutomationControlled')
chrome_options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36")

driver = webdriver.Chrome(options=chrome_options)

# --- Step 3: Prepare output dataframe ---
results = []

# --- Step 4: Iterate queries ---
for query in queries:
    try:
        search_url = f"https://www.toolstation.com/search?q={query.replace(' ', '+')}"
        driver.get(search_url)
        time.sleep(2)  # Wait for JS-rendering

        
        # Wait for first product card
        wait = WebDriverWait(driver, 8)
        product_card = wait.until(
            EC.presence_of_element_located(
                (By.CSS_SELECTOR, "div[data-component='ProductCardHorizontal']")
            )
        )

        # Extract price
        try:
            price_elem = product_card.find_element(By.CSS_SELECTOR, "span.font-bold.text-blue.text-size-6")
            price = price_elem.text.strip()
        except Exception:
            price = ""

        # Extract description/title
        try:
            desc_elem = product_card.find_element(By.CSS_SELECTOR, "p.font-semibold.text-blue.text-size-4, p.font-semibold.text-blue.text-size-3")
            description = desc_elem.text.strip()
        except Exception:
            description = ""

        results.append({
            'query': query,
            'price': price,
            'description': description
        })

    except Exception as e:
        # If no results found, save empty
        results.append({
            'query': query,
            'price': '',
            'description': ''
        })
    # --- Be nice to Toolstation servers ---
    time.sleep(2.7)

# --- Step 5: Save to Excel ---
output_df = pd.DataFrame(results)
output_df.to_excel(output_excel, index=False)

# --- Step 6: Cleanup ---
driver.quit()

print(f"Done! Data saved to {output_excel}")
