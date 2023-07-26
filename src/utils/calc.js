export const calculateTable = (listProducts) => {
  const {gross, discount, taxes} = listProducts.reduce((acc, curr) => {
      acc['gross'] += parseFloat(curr.price) * curr.qtd;
      acc['discount'] += (curr.total * curr.discount);
      acc['taxes'] += (curr.total * curr.taxRate);
      return acc;
    }, {gross: 0.00, discount:0.00, taxes: 0.00});
   const net = gross - discount + taxes;
  return {gross, discount, taxes, net};
}


  export const calculateFinalPrice = (total, discount, tax) => {
    const applyDiscount = total - total * discount;
    const applyTax = parseFloat(applyDiscount - applyDiscount * tax);

    return applyTax;
  };