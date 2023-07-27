export const filterProductToRemove = (products, name) =>
  products.filter((prod) =>  prod.name !== name);

export const filterProductPrice = (products, name) =>
  products.find((item) => item.name === name);

export const filterRemoveProductListPurchase = (listProducts, id) =>
  listProducts.filter((product) => product.id !== id);


export const insertTheItemRemovedToListSelectProduct = (originalProducts, newListProducts) => 
  originalProducts.filter((product) => {
    return newListProducts.some((newProduct) => {
      return newProduct.name !== product.name;
    });
});