import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";

function CartTotal() {
  const { currency, delivery_fee, cartTotal } = useContext(ShopContext);
  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1={"Cart"} text2={"Totals"} />
      </div>

      <div className="flex flex-col gap-2 text-sm mt-2">
        <div className="flex justify-between">
          <p>SubTotal</p>
          <p>
            {currency} {cartTotal()}.00
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Shipping fee</p>
          <p>
            {currency} {delivery_fee}.00
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Total</p>
          <p>
            {currency} {cartTotal() === 0 ? 0 : cartTotal() + delivery_fee}.00
          </p>
        </div>
      </div>
    </div>
  );
}

export default CartTotal;
