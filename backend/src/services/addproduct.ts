import {db} from "../db";
import readline from "readline";


function addProduct(
  name: string,
  brand: string | undefined,
  description: string,
  price: number,
  image: string,
  category: string,
  stock: number
) {
  return db.query(
    "INSERT INTO products (name, brand, description, price, image, category, stock) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
    [name, brand, description, price, image, category, stock]
    );
}

async function promptInput(prompt: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) =>
    rl.question(prompt, (answer) => {
      rl.close();
      resolve(answer);
    })
  );
}

async function main() {
  const categories = [
    "Bath & Plumbing",
    "Lighting",
    "Screws and fixings",
    "Landscaping",
    "Doors and security",
    "Storage and shelving"
  ];
  while (true) {
    const name = await promptInput("Product name (or type 'exit' to quit): ");
    if (name.trim().toLowerCase() === "exit") break;
    const brand = await promptInput("Brand (optional, press Enter to skip): ");
    const description = await promptInput("Description: ");
    const priceStr = await promptInput("Price: ");
    const price = parseFloat(priceStr);
    const image = await promptInput("Image URL: ");

    // Category selection
    console.log("Select a category:");
    categories.forEach((cat, idx) => {
      console.log(`${idx + 1}. ${cat}`);
    });
    let categoryIdx = -1;
    while (
      categoryIdx < 0 ||
      categoryIdx >= categories.length ||
      isNaN(categoryIdx)
    ) {
      const catInput = await promptInput(`Enter category number (1-${categories.length}): `);
      categoryIdx = parseInt(catInput, 10) - 1;
      if (catInput.trim().toLowerCase() === "exit") return;
    }
    const category = categories[categoryIdx];

    const stockStr = await promptInput("Stock: ");
    const stock = parseInt(stockStr, 10);

    try {
      const res = await addProduct(
        name,
        brand || undefined,
        description,
        isNaN(price) ? 0 : price,
        image,
        category,
        isNaN(stock) ? 0 : stock
      );
      console.log("Product added:", res.rows[0]);
    } catch (err) {
      console.error("Error adding product:", err);
    }
  }
}

main().then(() => {
  console.log("Exited.");
  process.exit(0);
});