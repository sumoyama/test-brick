import { useEffect, useMemo, useState } from "react";
import Proptypes from "prop-types";
import ProductContext from "./ProductContext";
import { initialStateProduct } from "../utils/state";
import { getListProducts } from "../utils/apis";
import { calcTaxRates, calculateTable } from "../utils/calculate";
import {
  filterProductPrice,
  filterProductToRemove,
  filterRemoveProductListPurchase,
  insertTheItemRemovedToListSelectProduct,
} from "../utils/filters";

export function ProductProvider({ children }) {
  const [product, setProduct] = useState({
    ...initialStateProduct,
  });

  const [products, setProducts] = useState([]);
  const [listProducts, setListProduct] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);
  const [disabledProductFirstSelect, setDisabledProductFirstSelect] =
    useState(false);

  useEffect(() => {
    getListProducts().then((product) => {
      const productsList = Object.keys(product).map((item) => product[item]);
      setProducts(productsList);
      setOriginalProducts(productsList);
    });
  }, []);

  const onChangeInputProduct = ({ target }) => {
    setProduct({ ...product, qtd: Number(target.value) });
  };
  const handleChangeProducts = ({ target: { value } }) => {
    const { tax_rate: taxRate } = calcTaxRates(value, products);
    const findPrice = filterProductPrice(products, value);
    const price = findPrice ? findPrice.price : 0;
    setProduct({ ...product, name: value, price, taxRate });
    setDisabledProductFirstSelect(true);
  };

  const addProduct = () => {
    const id = product.id + 1;
    console.log(id);
    setListProduct([
      ...listProducts,
      {
        ...product,
        total: calculatePriceTotal,
        id,
      },
    ]);
    const removeItemSelectList = filterProductToRemove(products, product.name);

    setProduct({
      ...initialStateProduct,
      id,
    });

    setProducts(removeItemSelectList);
    setDisabledProductFirstSelect(false);
  };

  const removeProduct = (id) => {
    const newListProducts = filterRemoveProductListPurchase(listProducts, id);
    console.log(newListProducts);
    setListProduct(newListProducts);
    if (newListProducts.length > 0) {
      const newSelectProducts = insertTheItemRemovedToListSelectProduct(
        originalProducts,
        newListProducts
      );
      setProducts(newSelectProducts);
    } else {
      setProducts(originalProducts);
    }
  };
  const calculatePriceTotal = useMemo(() => {
    return parseFloat(Number(product.price) * product.qtd);
  }, [product]);

  const calculateTablePurchase = useMemo(() => {
    return calculateTable(listProducts);
  }, [listProducts]);
  return (
    <ProductContext.Provider
      value={{
        product,
        setProduct,
        products,
        listProducts,
        addProduct,
        disabledProductFirstSelect,
        handleChangeProducts,
        removeProduct,
        calculateTablePurchase,
        calculatePriceTotal,
        onChangeInputProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

ProductProvider.propTypes = { children: Proptypes.node.isRequired };
