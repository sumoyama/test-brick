import { useContext } from "react";
import CompaniesContext from "../../context/CompaniesContext";

export default function SelectCompanies() {
  const {
    company,
    handleChangeCompanies,
    companies,
    disabledCompanyFirstSelect,
  } = useContext(CompaniesContext);
  return (
    <select
      name="paises"
      id="paises"
      value={company}
      onChange={handleChangeCompanies}
    >
      {" "}
      <option disabled={disabledCompanyFirstSelect}>Select the Company</option>
      {companies.map(({ name }, index) => (
        <option key={name + index} value={name}>
          {name}
        </option>
      ))}
    </select>
  );
}
