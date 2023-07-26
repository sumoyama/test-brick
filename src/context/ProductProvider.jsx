import { useEffect, useState } from "react";
import Proptypes from "prop-types";
import ProductContext from "./ProductContext";
import { initialState } from "../utils/state";
import { getListProducts } from "../utils/apis";

export function ProductProvider({ children }) {
  const [product, setProduct] = useState({ ...initialState.product });
  const [detailsPurchase, setDetailsPurchase] = useState({
    ...initialState.details,
  });
  const [id, setId] = useState(1);
  const [products, setProducts] = useState([]);
  const [listProducts, setListProduct] = useState([]);
  const [disabledProductFirstSelect, setDisabledProductFirstSelect] =
    useState(false);

  useEffect(() => {
    calculate();
  }, [product]);

  useEffect(() => {
    getListProducts().then((product) => {
      const productsList = Object.keys(product).map((item) => product[item]);
      setProducts(productsList);
    });
  }, []);

  const calculate = () => {
    const findPrice = products.find((item) => item.name === product.name);
    const price = findPrice ? findPrice.price : 0;
    const total = Number(price) * product.qtd;
    setDetailsPurchase({ ...detailsPurchase, price, total });
  };

  const taxRates = (name) => {
    const { tax_rate: taxRate } = products.find((item) => item.name === name);
    setDetailsPurchase({ ...detailsPurchase, taxRate });
  };

  const handleChangeProducts = ({ target: { value } }) => {
    taxRates(value);
    setProduct({ ...product, name: value });
    setDisabledProductFirstSelect(true);
  };

  const addProduct = () => {
    setListProduct([
      ...listProducts,
      {
        id,
        ...product,
        ...detailsPurchase,
      },
    ]);
    setProduct({
      ...initialState.product,
    });
    setDetailsPurchase({
      ...initialState.details,
    });
    setDisabledProductFirstSelect(false);
    setId(id + 1);
  };

  const removeProduct = (id) => {
    const newListProducts = listProducts.filter((product) => product.id !== id);
    setListProduct(newListProducts);
    console.log(newListProducts);
  };
  return (
    <ProductContext.Provider
      value={{
        product,
        setProduct,
        detailsPurchase,
        setDetailsPurchase,
        products,
        setProducts,
        listProducts,
        setListProduct,
        addProduct,
        taxRates,
        disabledProductFirstSelect,
        handleChangeProducts,
        removeProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

ProductProvider.propTypes = { children: Proptypes.node.isRequired };
