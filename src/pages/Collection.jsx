import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

function Collection() {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [sortBy, setSortBy] = useState("relevant");
  // const [tempFilteredProducts, setTempFilteredProducts] = useState([]);

  function handleCategotry(e) {
    if (categories.includes(e.target.value)) {
      setCategories(categories.filter((item) => item !== e.target.value));
    } else {
      setCategories([...categories, e.target.value]);
    }
  }
  function handleSubCategotry(e) {
    if (subCategories.includes(e.target.value)) {
      setSubCategories(subCategories.filter((item) => item !== e.target.value));
    } else {
      setSubCategories([...subCategories, e.target.value]);
    }
  }

  function applyFilters() {
    let temp = products.slice();
    if (categories.length > 0) {
      temp = temp.filter((item) => categories.includes(item.category));
    }
    if (subCategories.length > 0) {
      temp = temp.filter((item) => subCategories.includes(item.subCategory));
    }
    if (search && showSearch) {
      temp = temp.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredProducts(temp);
  }
  useEffect(() => {
    applyFilters();
  }, [categories, subCategories, search, showSearch]);

  function sortProducts() {
    switch (sortBy) {
      case "low-high":
        setFilteredProducts((prev) =>
          [...prev].sort((a, b) => a.price - b.price)
        );
        break;
      case "high-low":
        setFilteredProducts((prev) =>
          [...prev].sort((a, b) => b.price - a.price)
        );
        break;
      default:
        applyFilters();
        break;
    }
  }
  useEffect(() => {
    sortProducts();
  }, [sortBy]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      <div className="min-w-60">
        <p
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
          onClick={() => setShowFilters(!showFilters)}
        >
          Filters
          <img
            src={assets.dropdown_icon}
            className={`h-3 sm:hidden ${showFilters ? "rotate-90" : ""}`}
            alt=""
          />
        </p>
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilters ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">Categories</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Men"}
                onChange={handleCategotry}
              />{" "}
              Men
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Women"}
                onChange={handleCategotry}
              />{" "}
              Women
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Kids"}
                onChange={handleCategotry}
              />{" "}
              Kids
            </p>
          </div>
        </div>
        <div
          className={`border border-gray-300 my-5 pl-5 py-3 mt-6 ${
            showFilters ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">Type</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Topwear"}
                onChange={handleSubCategotry}
              />{" "}
              Topwear
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Bottomwear"}
                onChange={handleSubCategotry}
              />{" "}
              Bottomwear
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Winterwear"}
                onChange={handleSubCategotry}
              />{" "}
              Winterwear
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"All"} text2={"Collections"} />
          <select
            className="border-2 border-gray-300 text-sm px-2"
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filteredProducts.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Collection;
