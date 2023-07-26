import { useContext } from "react";
import ProductContext from "../context/ProductContext";

TablePurchase;
export default function TablePurchase() {
  const {
    infoPurchase: { gross, discount, taxes, net },
  } = useContext(ProductContext);

  return (
    <>
      <table className="tablePurchase">
        <tr>
          <td>Gross:</td>
          <td>{`$ ${gross}`}</td>
        </tr>
        <tr>
          <td>Discounts:</td>
          <td>{`$ ${discount}`}</td>
        </tr>
        <tr>
          <td>Taxes:</td>
          <td>{`$ ${taxes}`}</td>
        </tr>
        <tr>
          <td>Net:</td>
          <td>{`$ ${net}`}</td>
        </tr>
      </table>
      <button>Purchase</button>
    </>
  );
}
