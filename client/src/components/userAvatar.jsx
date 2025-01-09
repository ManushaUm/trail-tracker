import React from "react";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { Fragment, useState } from "react";
import { FaUser, FaUserLock } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getInitials } from "../utils";

const UserAvatar = () => {
  const [open, setOpen] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Logout");
  };

  return (
    <>
      <div>
        <Menu as="div" className="relative inline-block text-left">
          <MenuButton className="w-10 h-10 2xl:w-12 2xl:h-12 items-center justify-center rounded-full bg-red-700">
            <span className="text-white font-semibold">
              {getInitials(user?.name)}
            </span>
          </MenuButton>

          <MenuItems
            anchor="bottom"
            transition
            className="absolute right-0 mt-2 w-56 origin-top-right divide-gray-100 rounded-md bg-white shadow-2xl ring-1 ring-black/5 focus:outline-none"
          >
            <div className="p-4">
              <MenuItem>
                {({ active }) => (
                  <button
                    onClick={() => setOpen(true)}
                    className={`${
                      active ? "bg-red-700 text-white" : "text-gray-700"
                    } group flex w-full items-center rounded-md px-2 py-2 text-base`}
                  >
                    <FaUser className="mr-2" aria-hidden="true" />
                    Profile
                  </button>
                )}
              </MenuItem>
              <MenuItem>
                {({ active }) => (
                  <button
                    onClick={() => setOpenPassword(true)}
                    className={`${
                      active ? "bg-red-700 text-white" : "text-gray-700"
                    } grpup flex w-full items-center rounded-md px-2 py-2 text-base`}
                  >
                    <FaUserLock className="mr-2" aria-hidden="true" />
                    Change Password
                  </button>
                )}
              </MenuItem>
              <MenuItem>
                {({ active }) => (
                  <button
                    onClick={handleLogout}
                    className={`${
                      active ? "bg-red-700 text-white" : "text-red-700"
                    } group flex w-full items-center rounded-md px-2 py-2 text-base`}
                  >
                    <IoLogOutOutline
                      className={`${
                        active ? "text-white" : "text-red-600"
                      } mr-2"`}
                      aria-hidden="true"
                    />
                    <span>Logout</span>
                  </button>
                )}
              </MenuItem>
            </div>
          </MenuItems>
        </Menu>
      </div>
    </>
  );
};

export default UserAvatar;
