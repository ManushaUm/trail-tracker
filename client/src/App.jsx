import { Fragment, useRef, useState } from "react";
import Login from "./pages/Login";
import {
  Route,
  Routes,
  Navigate,
  useLocation,
  replace,
  Outlet,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import TaskDetails from "./pages/TaskDetails";
import Users from "./pages/Users";
import Trash from "./pages/Trash";
import Tasks from "./pages/Tasks";
import { Toaster } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./components/SideBar";
import Navbar from "./components/Navbar";

import React from "react";
import { Transition } from "@headlessui/react";
import clsx from "clsx";
import { IoClose } from "react-icons/io5";
import { toggleSidebar } from "./redux/slices/authSlice";

function Layout() {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  const MobileSideBar = () => {
    const { isSidebarOpen } = useSelector((state) => state.auth);
    const mobileMenuRef = useRef(null);
    const dispatch = useDispatch();

    const closeSidebar = () => {
      dispatch(toggleSidebar(false));
    };
    return (
      <>
        <Transition
          show={isSidebarOpen}
          as={Fragment}
          enter="transition-opacity duration-700"
          enterFrom="opacity-x-10"
          enterTo="opacity-x-100"
          leave="transition-opacity duration-700"
          leaveFrom="opacity-x-100"
          leaveTo="opacity-x-0"
        >
          {() => (
            <div
              ref={(node) => (mobileMenuRef.current = node)}
              className={clsx(
                "md:hidden w-full h-full bg-black/40 transition-all duration-700 transform ",
                isSidebarOpen ? "translate-x-0" : "translate-x-full"
              )}
              onClick={() => closeSidebar()}
            >
              <div className="bg-white w-3/4 h-full">
                <div className="w-full flex justify-end px-5 mt-5">
                  <button
                    onClick={() => closeSidebar()}
                    className="flex justify-end items-end"
                  >
                    <IoClose size={25} />
                  </button>
                </div>

                <div className="-mt-10">
                  <Sidebar />
                </div>
              </div>
            </div>
          )}
        </Transition>
      </>
    );
  };

  return user ? (
    //user exists
    <div className="w-full h-screen flex flex-col md:flex-row">
      <div className=" bg-white sticky top-0 hidden md:block">
        <Sidebar />
      </div>

      {/* Sidebar for mobile */}
      <MobileSideBar />

      <div className="flex-1 overlay inset-y-auto">
        <Navbar />
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    //user does not exist
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

function App() {
  return (
    <main className="w-full min-h-screen bg-[#f3f4f6] ">
      <Routes>
        <Route element={<Layout />}>
          <Route element={<Navigate to="/dashboard" />} path="/" />
          <Route element={<Dashboard />} path="/dashboard" />
          <Route element={<Tasks />} path="/tasks" />
          <Route element={<Tasks />} path="/completed/:status" />
          <Route element={<Tasks />} path="/in-progress/:status" />
          <Route element={<Tasks />} path="/to-do/:status" />
          <Route element={<Users />} path="/users" />
          <Route element={<Trash />} path="/trashed" />
          <Route element={<TaskDetails />} path="/task/:id" />
        </Route>
        <Route element={<Login />} path="/login" />
      </Routes>

      <Toaster richColors />
    </main>
  );
}

export default App;
