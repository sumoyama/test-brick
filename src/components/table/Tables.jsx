import TableHeader from "./TableHeader";
import TableListProducts from "./TableListProducts";
import TablePurchase from "./TablePurchase";
import TableSelectProducts from "./TableSelectProducts";

export default function Tables() {
  return (
    <>
      <h2>Select the Products to Purchase </h2>
      <table className="table">
        <TableHeader />
        <TableSelectProducts />
        <TableListProducts />
      </table>
      <TablePurchase />
    </>
  );
}
