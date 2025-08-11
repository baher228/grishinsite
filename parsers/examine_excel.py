import pandas as pd

# Check test_load.xlsx
try:
    df = pd.read_excel('test_load.xlsx')
    print("=== TEST_LOAD.XLSX ===")
    print("Columns:", df.columns.tolist())
    print("Shape:", df.shape)
    print("First few rows:")
    print(df.head())
    print("\nSample items:")
    if 'Item' in df.columns:
        print(df['Item'].head(10).tolist())
except Exception as e:
    print(f"Error reading test_load.xlsx: {e}")

print("\n" + "="*50 + "\n")

# Check Main_load.xlsx
try:
    df2 = pd.read_excel('Main_load.xlsx')
    print("=== MAIN_LOAD.XLSX ===")
    print("Columns:", df2.columns.tolist())
    print("Shape:", df2.shape)
    print("First few rows:")
    print(df2.head())
    print("\nSample items:")
    if 'Item' in df2.columns:
        print(df2['Item'].head(10).tolist())
except Exception as e:
    print(f"Error reading Main_load.xlsx: {e}")
