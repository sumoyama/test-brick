export const getListCompanies = async () => {
  const response = await fetch('https://react-test-38234-default-rtdb.firebaseio.com/companies.json');
  const data = response.json();
  return data;
}

export const getListProducts = async () => {
  const response = await fetch('https://react-test-38234-default-rtdb.firebaseio.com/products.json');
  const data = response.json();
  return data;
}

