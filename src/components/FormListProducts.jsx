import { useContext } from "react";
import ProductContext from "../context/ProductContext";
import { calculateFinalPrice } from "../utils/calculate";

export default function FormListProducts() {
  const { listProducts, removeProduct } = useContext(ProductContext);
  return (
    <>
      {listProducts.map((product) => (
        <tr key={`Product ${product.id}`}>
          <td>{product.name}</td>
          <td>{product.qtd}</td>
          <td>{product.price}</td>
          <td>{`${product.discount * 100}%`}</td>
          <td>{`${product.taxRate * 100}%`}</td>
          <td>
            {calculateFinalPrice(
              product.total,
              product.discount,
              product.taxRate
            ).toFixed(2)}
          </td>
          <td>
            <button onClick={() => removeProduct(product.id)}>x</button>
          </td>
        </tr>
      ))}
    </>
  );
}
