/** @format */
import React from "react";
import { toast, Id } from "react-toastify";

export interface ToastCallProps {
  action: "loading" | "success" | "dismiss" | "error" | "update";
  toastItem?: void | Id; //On 'Error' & 'Success' calls, with this argument will dismiss its toast
  children?: any;
  updateType?: "error" | "info" | "success" | "warning";
  autoClose?: number | false;
}

const ToastCall = ({
  action,
  toastItem,
  children,
  updateType,
  autoClose,
}: ToastCallProps) => {
  if (action === "loading")
    return toast.loading(children, {
      autoClose: autoClose,
    });
  else if (action === "success") {
    !!toastItem && toast.dismiss(toastItem);
    return toast.success(children, {
      autoClose: autoClose,
    });
  }
  else if (action === "dismiss") return toast.dismiss(toastItem && toastItem);
  else if (action === "update")
    return toast.update(toastItem && toastItem, {
      type: updateType ? updateType : toast.TYPE.INFO,
      render: () => children,
      autoClose: autoClose,
    });
  else if (action === "error") {
    //!!toastItem && toast.dismiss(toastItem);
    console.log('calling error');
    return toast.error(children, {
      autoClose: autoClose,
    });
  }
};

export default ToastCall;
