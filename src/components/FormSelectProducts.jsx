import { useContext } from "react";
import ProductContext from "../context/ProductContext";
export default function FormSelectProducts() {
  const {
    product,
    products,
    detailsPurchase,
    setProduct,
    addProduct,
    handleChangeProducts,
    disabledProductFirstSelect,
  } = useContext(ProductContext);

  return (
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
          onChange={({ target }) => {
            setProduct({ ...product, qtd: Number(target.value) });
          }}
        />
      </td>
      <td>{detailsPurchase.price}</td>
      <td>{`${detailsPurchase.discount * 100}%`}</td>
      <td>{detailsPurchase.taxRate}</td>
      <td>{detailsPurchase.total}</td>
      <td>
        <button onClick={addProduct} disabled={!detailsPurchase.total > 0}>
          add
        </button>
      </td>
    </tr>
  );
}
