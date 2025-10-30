import React from "react";
import { Button } from "./ui/button";

const Modal = ({
  handleDelete,
  handleCancel,
  title,
  bodyText,
  confirmText,
}) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-[rgba(128,128,128,0.2)]">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-md p-6 mx-4">
        <div>
          <h1 className="font-semibold text-lg flex">{title}</h1>
        </div>
        <div>
          <p className="text-left my-3">{bodyText}</p>
        </div>
        <div className="flex gap-2 justify-end">
          <Button
            variant="secondary"
            onClick={() => handleCancel(false)}
            className="cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            variant="warning"
            onClick={handleDelete}
            className="px-4 py-2 rounded-md bg-red-600 text-white cursor-pointer"
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
