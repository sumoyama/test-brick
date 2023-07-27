import { useContext } from "react";
import { calculateFinalPrice } from "../../utils/calculate";
import ProductContext from "../../context/ProductContext";

export default function TableListProducts() {
  const { listProducts, removeProduct } = useContext(ProductContext);
  return (
    <tbody>
      {listProducts.map((product) => (
        <tr key={`Product ${product.id}`}>
          <td>{product.name}</td>
          <td>{product.qtd}</td>
          <td>{`$ ${product.price}`}</td>
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
    </tbody>
  );
}
