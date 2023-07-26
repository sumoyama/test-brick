import { useEffect, useState } from "react";
import Proptypes from "prop-types";
import ProductContext from "./ProductContext";
import { initialState } from "../utils/state";
import { getListProducts } from "../utils/apis";
import { calculateTable } from "../utils/calc";

export function ProductProvider({ children }) {
  const [product, setProduct] = useState({ ...initialState.product });
  const [detailsPurchase, setDetailsPurchase] = useState({
    ...initialState.details,
  });
  const [id, setId] = useState(1);
  const [products, setProducts] = useState([]);
  const [listProducts, setListProduct] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);
  const [disabledProductFirstSelect, setDisabledProductFirstSelect] =
    useState(false);
  const [infoPurchase, setInfoPurchase] = useState({
    gross: 0,
    discount: 0,
    taxes: 0,
    net: 0,
  });
  useEffect(() => {
    calculate();
  }, [product]);

  useEffect(() => {
    calculateTablePurchase();
  }, [listProducts]);

  useEffect(() => {
    getListProducts().then((product) => {
      const productsList = Object.keys(product).map((item) => product[item]);
      setProducts(productsList);
      setOriginalProducts(productsList);
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

    const removeItemSelectList = products.filter((prod) => {
      return prod.name !== product.name;
    });

    setProduct({
      ...initialState.product,
    });
    setDetailsPurchase({
      ...initialState.details,
    });
    setProducts(removeItemSelectList);
    setDisabledProductFirstSelect(false);
    setId(id + 1);
  };

  const removeProduct = (id) => {
    const newListProducts = listProducts.filter((product) => product.id !== id);
    setListProduct(newListProducts);
    if (newListProducts.length > 0) {
      const newSelectProducts = originalProducts.filter((product) => {
        return newListProducts.some((newProduct) => {
          return newProduct.name !== product.name;
        });
      });
      setProducts(newSelectProducts);
    } else {
      setProducts(originalProducts);
    }
  };

  const calculateTablePurchase = () => {
    const tablePurchase = calculateTable(listProducts);
    setInfoPurchase(tablePurchase);
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
        infoPurchase,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

ProductProvider.propTypes = { children: Proptypes.node.isRequired };
