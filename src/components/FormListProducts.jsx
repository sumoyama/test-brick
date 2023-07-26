import { useContext } from "react";
import ProductContext from "../context/ProductContext";

export default function FormListProducts() {
  const { listProducts, removeProduct } = useContext(ProductContext);
  const calculateFinalPrice = (total, discount, tax) => {
    const applyDiscount = total - total * discount;
    const applyTax = applyDiscount - applyDiscount * tax;

    return applyTax;
  };
  return (
    <>
      {listProducts.map((product) => (
        <tr key={`Product ${product.id}`}>
          <td>{product.name}</td>
          <td>{product.qtd}</td>
          <td>{product.price}</td>
          <td>{`${product.discount * 100}%`}</td>
          <td>{product.taxRate}</td>
          <td>
            {calculateFinalPrice(
              product.total,
              product.discount,
              product.taxRate
            )}
          </td>
          <td>
            <button onClick={() => removeProduct(product.id)}>x</button>
          </td>
        </tr>
      ))}
    </>
  );
}
