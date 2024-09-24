import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectCart } from "../cart/cartSlice";
import { selectLoggedInUser } from "../auth/authSlice";
import { IoMdMenu } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import Sidebar from "../sidebar/sidebar";
import { useState } from "react";

const navigation = [
  { name: "Admin", link: "/admin", admin: "true" },
  { name: "Orders", link: "/admin/orders", admin: "true" },
];

function Navbar({ children }) {
  const user = useSelector(selectLoggedInUser);
  const items = useSelector(selectCart);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  let cartSize = 0;
  if (items) cartSize = items.length;
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30"
          onClick={() => {
            setIsSidebarOpen(false);
          }}
        />
      )}
      <div className="min-h-full">
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="flex justify-between mx-8 mt-4">
          <div className="flex gap-x-4 items-center">
            <IoMdMenu
              className="hover:bg-gray-100 h-8 w-8 rounded-full p-1"
              onClick={toggleSidebar}
            />
            <h2 className="text-xl">Tokyo</h2>
            <h1 className="font-bold -ml-3 text-2xl text-indigo-600">Flares</h1>
          </div>
          <div className="flex items-center relative">
            {navigation
              .filter((item) => {
                return item.admin === "false" || user.role === "admin";
              })
              .map((item) => (
                <Link to={item.link} key={item.name}>
                  <h1 className="mr-10 hover:scale-110 hover:font-bold transition-transform duration-300">
                    {item.name}
                  </h1>
                </Link>
              ))}
            <Link to="/cart">
              <IoCartOutline className="bg-gray-100 h-10 w-10 p-2 rounded-full hover:bg-gray-300" />
              <p className="text-xs bg-indigo-600 text-white rounded-full h-5 w-5 absolute -right-2 -top-1 flex items-center justify-center">
                {cartSize}
              </p>
            </Link>
          </div>
        </div>
        <main>
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </>
  );
}

export default Navbar;
