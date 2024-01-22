import React from "react";
import { MdOutlineErrorOutline } from "react-icons/md";

interface ToastErrorProps {
  message?: string;
  title: string;
}

const ToastError: React.FC<ToastErrorProps> = ({ title, message }) => {
  return (
    <div className="flex items-center w-full">
      <MdOutlineErrorOutline className="mr-4 text-red-600" size={30} />
      <div className="flex flex-col w-full">
        <h1 className="font-bold text-red-800">{title}</h1>
        <span className="italic text-red-800 first-letter:capitalize">
          {message}
        </span>
      </div>
    </div>
  );
};

export default ToastError;
