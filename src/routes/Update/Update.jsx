import React, { useEffect } from "react";
import { LoginForm } from "../../components/LoginForm/LoginForm";
import { Link, useLocation } from "react-router-dom";
import { FiChevronLeft } from "react-icons/fi";
import { UpdateForm } from "../../components";
import { brand } from "../../config/Constants";

export const Update = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 100,
      left: 100,
      behavior: "smooth",
    });
  }, [pathname]);
  return (
    <div className="content relative col-span-3 flex h-screen w-full">
      <Link to="/profile">
        <button className="absolute m-4 flex items-center justify-evenly gap-2 rounded-3xl bg-gray-100 px-5 py-2 font-semibold hover:bg-gray-300">
          <FiChevronLeft /> Back to the App
        </button>
      </Link>
      <div className="flex h-screen flex-col items-center justify-center outline sm:w-full md:w-full lg:w-1/2">
        <UpdateForm />
      </div>
    </div>
  );
};