import requests
from bs4 import BeautifulSoup
from difflib import SequenceMatcher

def test_toolstation_search():
    query = "Hep2O Blanking Peg 22mm"
    headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"}
    url = f"https://www.toolstation.com/search?q={query.replace(' ', '+')}"
    
    print(f"Searching URL: {url}")
    
    try:
        resp = requests.get(url, headers=headers)
        print(f"Response status: {resp.status_code}")
        
        if resp.status_code != 200:
            print("Failed to get response")
            return
            
        soup = BeautifulSoup(resp.content, 'html.parser')
        
        # Let's examine the page structure
        print("\n=== PAGE TITLE ===")
        title = soup.find('title')
        if title:
            print(title.get_text())
        
        # Look for different possible selectors
        print("\n=== LOOKING FOR PRODUCT CARDS ===")
        
        # Try different selectors
        selectors_to_try = [
            'div[data-component="ProductCardHorizontal"][data-testid="product-card"]',
            'div[data-testid="product-card"]',
            '.product-card',
            '[data-testid="product-card"]',
            'div.product-item',
            'article',
            '.search-result'
        ]
        
        for selector in selectors_to_try:
            cards = soup.select(selector)
            print(f"Selector '{selector}': Found {len(cards)} elements")
            
            if cards:
                for i, card in enumerate(cards[:3]):  # Show first 3
                    print(f"  Card {i+1}:")
                    # Look for links
                    links = card.find_all('a', href=True)
                    for link in links[:2]:  # Show first 2 links
                        print(f"    Link: {link.get('href', 'No href')} - Text: {link.get_text(strip=True)[:100]}")
                    
                    # Look for text content
                    text_content = card.get_text(strip=True)[:200]
                    if text_content:
                        print(f"    Text: {text_content}")
                    print()
                break
        
        # Also check if there are any results at all
        print("\n=== CHECKING FOR 'NO RESULTS' MESSAGE ===")
        no_results = soup.find(text=lambda text: text and ('no results' in text.lower() or 'not found' in text.lower()))
        if no_results:
            print(f"No results message found: {no_results}")
        
        # Save HTML for manual inspection
        with open('toolstation_search_result.html', 'w', encoding='utf-8') as f:
            f.write(resp.text)
        print("\nSaved HTML to 'toolstation_search_result.html' for manual inspection")
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_toolstation_search()
