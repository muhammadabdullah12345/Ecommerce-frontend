import { createContext, useEffect, useState } from "react";
// import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// eslint-disable-next-line react-refresh/only-export-components
export const ShopContext = createContext();

function ShopContextProvider(props) {
  const currency = "$";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  function cartCount() {
    let cartCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            cartCount += cartItems[items][item];
          }
        } catch (err) {
          console.log(err.message);
        }
      }
    }
    return cartCount;
  }

  async function addToCart(itemId, size) {
    if (!size) {
      toast.error("Select Product Size");
    }
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);
  }

  async function updateQuantity(itemId, size, quantity) {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);
  }

  function cartTotal() {
    let cartTotal = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          try {
            cartTotal += itemInfo.price * cartItems[items][item];
          } catch (err) {
            console.log(err.message);
          }
        }
      }
    }
    return cartTotal;
  }

  const getProducts = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/product/list`);
      console.log(res.data);
      if (res.data.success) {
        setProducts(res.data.products);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    cartCount,
    updateQuantity,
    cartTotal,
    navigate,
    backendUrl,
    token,
    setToken,
    setCartItems,
  };

  return (
    <div>
      <ShopContext.Provider value={value}>
        {props.children}
      </ShopContext.Provider>
    </div>
  );
}

export default ShopContextProvider;
