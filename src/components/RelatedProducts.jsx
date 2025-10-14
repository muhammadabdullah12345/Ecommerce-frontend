import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

function RelatedProducts({ category, subcategory }) {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  function fetchRelatedProducts() {
    if (products.length > 0) {
      let relatedItems = products.slice();
      relatedItems = relatedItems.filter((item) => item.category === category);
      relatedItems = relatedItems.filter(
        (item) => item.subcategory === subcategory
      );
      setRelated(relatedItems.slice(0, 5));
    }
  }

  useEffect(() => {
    fetchRelatedProducts();
  }, [products]);
  return (
    <div className="my-24">
      <div className="text-center text-3xl py-2">
        <Title text1={"Related"} text2={"Products"} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {related.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            name={item.name}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
}

export default RelatedProducts;
