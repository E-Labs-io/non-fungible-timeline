/** @format */

import React from "react";
import { ToastContainer } from "react-toastify";

interface ToastProps {
  position?:
    | "top-right"
    | "top-center"
    | "top-left"
    | "bottom-right"
    | "bottom-center"
    | "bottom-left";
  autoClose?: number | false;
  newestOnTop?: boolean;
  closeOnClick?: boolean;
  pauseOnFocusLoss?: boolean;
  draggable?: boolean;
}

const Toast = ({
  position,
  autoClose,
  newestOnTop,
  closeOnClick,
  pauseOnFocusLoss,
  draggable,
}: ToastProps) => (
  <ToastContainer
    position={position ? position : "bottom-center"}
    autoClose={autoClose != undefined ? autoClose : 5000}
    newestOnTop={newestOnTop != undefined ? newestOnTop : false}
    closeOnClick={closeOnClick != undefined ? closeOnClick : true}
    pauseOnFocusLoss={pauseOnFocusLoss != undefined ? pauseOnFocusLoss : true}
    draggable={draggable ? draggable : false}
  />
);

export default Toast;
