import { useContext } from "react";
import ProductContext from "../../context/ProductContext";
export default function TableSelectProducts() {
  const {
    product,
    products,
    addProduct,
    handleChangeProducts,
    onChangeInputProduct,
    disabledProductFirstSelect,
    calculatePriceTotal,
  } = useContext(ProductContext);
  const total = calculatePriceTotal;
  return (
    <tfoot>
      <tr>
        <td>
          <select value={product.name} onChange={handleChangeProducts}>
            <option disabled={disabledProductFirstSelect}>
              Select the product
            </option>
            {products.map((product) => (
              <option key={product.name} value={product.name}>
                {product.name}
              </option>
            ))}
          </select>
        </td>
        <td>
          <input
            type="number"
            value={product.qtd}
            onChange={onChangeInputProduct}
          />
        </td>
        <td>{`$ ${product.price}`}</td>
        <td>{`${product.discount * 100}%`}</td>
        <td>{`${product.taxRate * 100}%`}</td>
        <td>{`$ ${total}`}</td>
        <td>
          <button onClick={addProduct} disabled={!parseFloat(total) > 0}>
            add
          </button>
        </td>
      </tr>
    </tfoot>
  );
}
