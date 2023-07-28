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
import { startTransition } from "react";

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
    const fetchListProducts = async () => {
      const data = await getListProducts();
      const productsList = Object.keys(data).map((item) => data[item]);
      setProducts(productsList);
      setOriginalProducts(productsList);
    };
    startTransition(fetchListProducts);
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
    setListProduct([
      ...listProducts,
      {
        ...product,
        total: calculatePriceTotal,
        id,
      },
    ]);
    const removeItemSelectList = filterProductToRemove(products, product.name);
    setProducts(removeItemSelectList);
    setProduct({
      ...initialStateProduct,
      id,
    });

    setDisabledProductFirstSelect(false);
  };

  const removeProduct = (id) => {
    const newListProducts = filterRemoveProductListPurchase(listProducts, id);
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
  const calculatePriceTotal = useMemo(
    () => parseFloat(Number(product.price) * product.qtd),
    [product]
  );

  const calculateTablePurchase = useMemo(
    () => calculateTable(listProducts),
    [listProducts]
  );
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
