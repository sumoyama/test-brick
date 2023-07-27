import { useContext, useState } from "react";
import Proptypes from "prop-types";
import CompaniesContext from "./CompaniesContext";
import { useEffect } from "react";
import { getListCompanies } from "../utils/apis";
import ProductContext from "./ProductContext";

export function CompaniesProvider({ children }) {
  const [company, setCompany] = useState("");
  const [companies, setCompanies] = useState([]);

  const { product, setProduct } = useContext(ProductContext);

  const [disabledCompanyFirstSelect, setDisabledCompanyFirstSelect] =
    useState(false);

  useEffect(() => {
    getListCompanies().then((data) => {
      const dataCompanies = Object.keys(data).map((item) => data[item]);
      setCompanies(dataCompanies);
    });
  }, []);

  const handleChangeCompanies = ({ target: { value } }) => {
    const { company_discount: discount } = companies.find(
      ({ name }) => name === value
    );
    console.log(product, discount);
    setProduct({ ...product, discount });
    setCompany(value);
    setDisabledCompanyFirstSelect(true);
  };
  return (
    <CompaniesContext.Provider
      value={{
        company,
        setCompany,
        companies,
        setCompanies,
        disabledCompanyFirstSelect,
        handleChangeCompanies,
      }}
    >
      {children}
    </CompaniesContext.Provider>
  );
}

CompaniesProvider.propTypes = { children: Proptypes.node.isRequired };
