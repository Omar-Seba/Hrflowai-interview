import React from "react";
import { FaRegCheckCircle } from "react-icons/fa";

interface ToastSuccessProps {
  message?: string;
  title: string;
}

const ToastSuccess: React.FC<ToastSuccessProps> = ({ title, message }) => {
  return (
    <div className="flex items-center w-full">
      <FaRegCheckCircle className="mr-4 text-green-600" size={30} />
      <div className="flex flex-col w-full">
        <h1 className="font-bold text-green-800">{title}</h1>
        <span className="italic text-green-800 first-letter:capitalize">
          {message}
        </span>
      </div>
    </div>
  );
};

export default ToastSuccess;
