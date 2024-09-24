import React from "react";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import { IoFastFoodSharp } from "react-icons/io5";
import { IoMdExit } from "react-icons/io";
import { CgProfile } from "react-icons/cg";

const userNavigation = [
  { name: "Your Profile", link: "/profile" },
  { name: "My Orders", link: "/orders" },
  { name: "Sign out", link: "/logout" },
];

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <>
      {isSidebarOpen && (
        <div className="fixed w-[250px] top-0 left-0 shadow-lg bg-white h-full p-6 z-40">
          <div className="flex items-center mb-8 justify-between">
            <p className="font-bold text-xl">My Menu</p>
            <IoMdClose
              onClick={toggleSidebar}
              className="h-8 w-8 bg-gray-100 hover:bg-gray-300 rounded-full p-2 text-black font-bold"
            />
          </div>
          <div>
            {userNavigation.map((item) => (
              <div>
                <Link to={item.link}>
                  <div className="flex items-center gap-x-3 text-l hover:scale-110 hover:font-bold transition-transform duration-300">
                    {item.icon}
                    <h1 className="">{item.name}</h1>
                  </div>
                </Link>
                <hr className="my-3" />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
