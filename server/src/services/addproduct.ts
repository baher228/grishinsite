import {db} from "../db";

function addProduct(
  name: string,
  description: string,
  price: number,
  image: string,
  category: string,
  stock: number
) {
  return db.query(
    "INSERT INTO products (name, description, price, image, category, stock) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [name, description, price, image, category, stock]
  );
}
function addBathNPlumbing(
  name: string,
  description: string,
  price: number,
  image: string,
  category: string = "Bath & Plumbing",
  stock: number
) {
  return db.query(
    "INSERT INTO products (name, description, price, image, category, stock) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [name, description, price, image, category, stock]
    );
}
addBathNPlumbing(
    "Manifold 4 Port",
    "",
    0,
    "https://cdn.aws.toolstation.com/images/141020-UK/388/93616.jpg",
    undefined,
    10
  );
  
  addBathNPlumbing(
    'Hep2O Female Adaptor Brass Socket 10mm x 1/2"',
    "",
    0,
    "https://media.screwfix.com/is/image/ae235/452FJ_P?$fxSharpen$=&wid=257&hei=257&dpr=on",
    undefined,
    10
  );
  
  addBathNPlumbing(
    'Hep2O Wall Plate Elbow 22mm x 3/4"',
    "",
    0,
    "https://www.wolseley.co.uk/_next/image//?url=https%3A%2F%2Fwww.wolseley.co.uk%2Fwcsstore%2FExtendedSitesCatalogAssetStore%2Fimages%2Fproducts%2FAssetPush%2Fwol-web-proof-large-w%2Fstd.lang.all%2F94%2F37%2F519437_wl.jpg&w=1920&q=75",
    undefined,
    10
  );
  
  addBathNPlumbing(
    "204mm Self-Seal Coupler Duct to Fitting",
    "",
    0,
    "https://www.epicair.co.uk/cdn/shop/files/SKU_VSSC204DF_280a21d4-b0e5-4ac5-9733-4c8aa7e5b220_1600x.png?v=1710412467",
    undefined,
    10
  );
  
  addBathNPlumbing(
    "Hep2O Double End Reduced Tee 10 x 10 x 22mm",
    "",
    0,
    "https://www.bes.co.uk/media/catalog/product/cache/b8675de55f1d5f7e508ea339822323ae/1/0/10-x-10-x-22-mm-white-two-ends-reducing-tee-hep2o_min_20734_P_1.jpg",
    undefined,
    10
  );
  
  addBathNPlumbing(
    "204mm Self-Seal Coupler Duct to Duct",
    "",
    0,
    "https://www.i-sells.co.uk/wp-content/uploads/2024/05/1000xSYSTEM-204-FASTSEAL-RECTANGULAR-DUCTING-TO-FITTING-QUICK-CONNECTOR-DUCVKC204DF.jpg",
    undefined,
    10
  );
  
  addBathNPlumbing(
    "Hep2O Blanking Peg 15mm",
    "",
    0,
    "https://static.prod.cmostores.com/uploads/products/20/l/hep2o-blanking-peg-p21254-15402_image.jpg?auto=compress&w=500&h=500&fit=fill&fill=solid&fillcolor=FFFFFF&rtype=webp",
    undefined,
    10
  );
  
  addBathNPlumbing(
    "5 Stage Reverse Osmosis Unit Polypropylene Cartridge",
    "",
    0,
    "https://m.media-amazon.com/images/I/61FJW5oVVfL._AC_UF1000,1000_QL80_.jpg",
    undefined,
    10
  );
  
  addBathNPlumbing(
    "Reducing Tee 15 x 10 x 10mm",
    "",
    0,
    "https://www.bes.co.uk/media/catalog/product/cache/b8675de55f1d5f7e508ea339822323ae/j/g/jg-speedfit-reducing-tee-15mm-x-10mm-x-10mm-white-12774-8_min_12774_P_1.jpg",
    undefined,
    10
  );
  
  addBathNPlumbing(
    "5 Stage Reverse Osmosis Unit Carbon Cartridge",
    "",
    0,
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGBK-7eHgA-e9ZSMVxFMKZgC5oYieCxak6XA&s",
    undefined,
    10
  );
  
  addBathNPlumbing(
    'Conex Extended Male Straight Connector with Back Nut 15mm x 1/2"',
    "",
    0,
    "https://cdn.aws.toolstation.com/images/141020-UK/388/92190.jpg",
    undefined,
    10
  );
  
  addBathNPlumbing(
    "Made4Trade Solder Ring Pipe Cowl 22mm",
    "",
    0,
    "https://www.bes.co.uk/media/catalog/product/cache/b8675de55f1d5f7e508ea339822323ae/2/2/22-mm-pipe-cowl-fittings-solder-ring_min_19009_P_1.jpg",
    undefined,
    10
  );