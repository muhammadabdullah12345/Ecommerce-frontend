import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";

function Product() {
  const { productId } = useParams();
  const { products, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const { currency } = useContext(ShopContext);
  const [size, setSize] = useState("");

  useEffect(() => {
    if (products && productId) {
      const product = products.find((item) => item._id === productId);
      if (product) {
        setProductData(product);
        setImage(product.image[0]);
      }
    }
  }, [productId, products]);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        <div className="flex-1 flex flex-col-reverse sm:flex-row gap-3 ">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((img, index) => (
              <img
                onClick={() => setImage(img)}
                key={index}
                src={img}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img src={image} alt="" className="w-full h-auto" />
          </div>
        </div>
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center mt-2 gap-1">
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_dull_icon} alt="" className="w-3" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 bg-gray-100 ${
                    item === size ? "border-orange-500" : ""
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button
            className="bg-black text-white py-3 px-8 text-sm active:bg-gray-700"
            onClick={() => addToCart(productData._id, size)}
          >
            Add to Cart
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="mt-5 text-gray-500 text-sm flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-4 py-6 text-sm text-gray-500">
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Consequuntur ipsum nobis necessitatibus. Sapiente inventore, dicta
            vero pariatur obcaecati sequi! Distinctio optio perferendis in
            excepturi neque quasi labore natus odit dolores delectus maxime
            mollitia, voluptatem sed ex repellendus ut. Natus a quae aut
            dignissimos atque, tempore libero laboriosam suscipit accusamus illo
            cum, blanditiis iure quidem doloremque! Esse quo odio facere
            blanditiis.
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum fugiat
            itaque impedit magni dicta omnis totam, cumque labore doloribus
            aliquam eaque quia minima nisi, exercitationem sunt porro ullam ut
            esse perferendis facilis? Est doloribus tempore perspiciatis
            necessitatibus praesentium officia sit?
          </p>
        </div>
      </div>
      <RelatedProducts
        category={productData.category}
        subcategory={productData.subcategory}
      />
    </div>
  ) : (
    <div className="opacity-0">Loading...</div>
  );
}

export default Product;
