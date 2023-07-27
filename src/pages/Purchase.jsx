import { Suspense, useContext, useEffect, useState } from "react";
import "./Purchase.css";
import FormSelectProducts from "../components/FormSelectProducts";
import FormListProducts from "../components/FormListProducts";
import CompaniesContext from "../context/CompaniesContext";
import TablePurchase from "../components/TablePurchase";

export default function Purchase() {
  const {
    company,
    handleChangeCompanies,
    companies,
    disabledCompanyFirstSelect,
  } = useContext(CompaniesContext);
  function Loading() {
    return <h2>🌀 Loading...</h2>;
  }
  return (
    <>
      <Suspense fallback={<Loading />}>
        <h1>Purchase Page</h1>
        <h2>Select the company </h2>
        <select
          name="paises"
          id="paises"
          value={company}
          onChange={handleChangeCompanies}
        >
          {" "}
          <option disabled={disabledCompanyFirstSelect}>
            Select the Company
          </option>
          {companies.map(({ name }, index) => (
            <option key={name + index} value={name}>
              {name}
            </option>
          ))}
        </select>
        <h2>Select the Products to Purchase </h2>
        <table className="table">
          <thead>
            <tr>
              <th>Products</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Discount</th>
              <th>Taxes</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <FormListProducts />
            <FormSelectProducts />
          </tbody>
        </table>
        <TablePurchase />
      </Suspense>
    </>
  );
}
