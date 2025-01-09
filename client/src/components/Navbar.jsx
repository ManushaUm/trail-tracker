import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineSearch } from "react-icons/md";
import UserAvatar from "./userAvatar";
import { toggleSidebar } from "../redux/slices/authSlice";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  return (
    <div className="flex justify-between items-center bg-white shadow-md p-4 px-4 py-3 2xl:py-4 sticky z=10 top-0">
      <div className="flex gap-4">
        <button
          onClick={() => dispatch(toggleSidebar(true))}
          className="text-2xl text-gray-500 md:hidden"
        >
          ☰
        </button>
        <div className="w-64 2xl:w-[400px] flex items-center gap-2 px-3 py-2 rounded-full">
          <MdOutlineSearch className="text-gray-500 text-xl" />
          <input
            type="text"
            placeholder="Search..."
            className=" flex-1 outline-none bg-transparent placeholder:text-gray-500 text-gray-800"
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <UserAvatar />
        {/* <NotificationPanel/>*/}
      </div>
    </div>
  );
};

export default Navbar;
