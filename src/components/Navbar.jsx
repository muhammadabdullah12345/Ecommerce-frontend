import { Link, NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";

export default function Navbar() {
  const [visible, setVisible] = useState(false);
  const { showSearch, setShowSearch, cartCount } = useContext(ShopContext);

  return (
    <div className="flex items-center justify-between font-medium py-5">
      <Link to="/">
        <img src={assets.logo} alt="" className="w-36 " />
      </Link>

      <ul className="hidden sm:flex text-gray-700 gap-5 text-sm">
        <NavLink to="/" className=" flex flex-col gap-1 items-center">
          Home
          <hr className="h-[1.5px] w-2/4 border-none bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/collection" className=" flex flex-col gap-1 items-center">
          Collection
          <hr className="h-[1.5px] w-2/4 border-none bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/about" className=" flex flex-col gap-1 items-center">
          About
          <hr className="h-[1.5px] w-2/4 border-none bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/contact" className=" flex flex-col gap-1 items-center">
          Contact
          <hr className="h-[1.5px] w-2/4 border-none bg-gray-700 hidden" />
        </NavLink>
      </ul>

      <div className="flex gap-6 items-center">
        <img
          src={assets.search_icon}
          alt=""
          className="w-5 cursor-pointer"
          onClick={() => setShowSearch(true)}
        />

        <div className="group relative">
          <Link to="/login">
            <img
              src={assets.profile_icon}
              alt=""
              className="w-5 cursor-pointer"
            />
          </Link>
          <div className="group-hover:block hidden absolute pt-4 right-0  dropdown-menu">
            <div className="bg-slate-100 flex flex-col gap-2 py-3 px-5 text-gray-500 rounded w-36">
              <p className="hover:text-black cursor-pointer">My Profile</p>
              <p className="hover:text-black cursor-pointer">Orders</p>
              <p className="hover:text-black cursor-pointer">Log out</p>
            </div>
          </div>
        </div>
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} alt="" className="w-5 min-w-5" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white text-[8px] aspect-square rounded-full">
            {cartCount()}
          </p>
        </Link>
        <img
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt=""
          onClick={() => setVisible(true)}
        />
      </div>
      {/* sidemenu for small screens */}
      <div
        className={`absolute right-0 top-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? "w-full" : "w-0"
        } sm:hidden`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            className="flex items-center gap-4 p-3 cursor-pointer"
            onClick={() => setVisible(false)}
          >
            <img src={assets.dropdown_icon} alt="" className="h-4 rotate-180" />
            <p>Back</p>
          </div>
          <NavLink
            to="/"
            className="py-2 pl-6 border border-gray-300"
            onClick={() => setVisible(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/collection"
            className="py-2 pl-6 border border-gray-300"
            onClick={() => setVisible(false)}
          >
            Collection
          </NavLink>
          <NavLink
            to="/about"
            className="py-2 pl-6 border border-gray-300"
            onClick={() => setVisible(false)}
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className="py-2 pl-6 border border-gray-300"
            onClick={() => setVisible(false)}
          >
            Contact
          </NavLink>
        </div>
      </div>
    </div>
  );
}
