const fs = require('fs');
const { title } = require('process');

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  addProduct(product) {
    const products = this.getProductsFromFile();
    const newProduct = {
      id: products.length > 0 ? products[products.length - 1].id + 1 : 1,
      title: product.title,
      description: product.description,
      price: product.price,
      thumbnail: product.thumbnail,
      code: product.code,
      stock: product.stock
    };
    products.push(newProduct);
    this.saveProductsToFile(products);
    return newProduct;
  }

  getProducts() {
    return this.getProductsFromFile();
  }

  getProductById(id) {
    const products = this.getProductsFromFile();
    return products.find((product) => product.id === id);
  }

  updateProduct(id, updatedFields) {
    const products = this.getProductsFromFile();
    const productIndex = products.findIndex((product) => product.id === id);
    if (productIndex >= 0) {
      const updatedProduct = { ...products[productIndex], ...updatedFields };
      products[productIndex] = updatedProduct;
      this.saveProductsToFile(products);
      console.log("Product updated: " + updatedProduct.title);
      return updatedProduct;
    }
    return null;
  }

  deleteProduct(id) {
    const products = this.getProductsFromFile();
    const updatedProducts = products.filter((product) => product.id !== id);
    this.saveProductsToFile(updatedProducts);
    console.log("Product deleted, now the products are: ");
    return updatedProducts;
  }

  getProductsFromFile() {
    if (!fs.existsSync(this.path)) {
      fs.writeFileSync(this.path, JSON.stringify([]));
    }
    const productsData = fs.readFileSync(this.path, 'utf-8');
    return JSON.parse(productsData);
  }

  saveProductsToFile(products) {
    fs.writeFileSync(this.path, JSON.stringify(products));
  }
}


const productManager = new ProductManager('products.json');

// Agregar varios producto
productManager.addProduct({
    title: 'Torta de chocolate',
    description: 'Sin azucar',
    price: 19.99,
    thumbnail: 'path/to/image',
    code: 'ABC123',
    stock: 10
  });
  productManager.addProduct({
    title: 'Torta de zanahoria',
    description: 'Sin gluten',
    price: 23.99,
    thumbnail: 'path/to/image2',
    code: 'EFG456',
    stock: 13
  });
  productManager.addProduct({
    title: 'Torta de manzana',
    description: 'Sin gluten',
    price: 27.99,
    thumbnail: 'path/to/image2',
    code: 'EFG456',
    stock: 13
  });
  
  // Obtener todos los productos
  const allProducts = productManager.getProducts();
  console.log( allProducts);
  
  // Obtener un producto por su id
  const productById = productManager.getProductById(1);
  console.log(productById);
  
  // Actualizar un producto
  const updatedProduct = productManager.updateProduct(2, {
    description: 'Con azucar',
    price: 29.99
  });
  console.log(updatedProduct);
  
  // Eliminar un producto
  const updatedProducts = productManager.deleteProduct(1);
  console.log(updatedProducts);