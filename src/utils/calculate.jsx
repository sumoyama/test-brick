export const calculateTable = (listProducts) => {
  const { gross, discount, taxes } = listProducts.reduce(
    (acc, curr) => {
      acc["gross"] += parseFloat(curr.price) * curr.qtd;

      acc["discount"] += curr.total * curr.discount;
      acc["taxes"] += curr.total * curr.taxRate;
      return acc;
    },
    { gross: 0.0, discount: 0.0, taxes: 0.0 }
  );
  const net = gross - discount + taxes;
  return { gross, discount, taxes, net };
};

export const calculateFinalPrice = (total, discount, tax) => {
  const applyDiscount = total - total * discount;
  const applyTax = parseFloat(applyDiscount - applyDiscount * tax);
  return applyTax;
};

export const calcTaxRates = (name, products) =>
  products.find((item) => item.name === name);
