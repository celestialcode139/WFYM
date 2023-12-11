import React from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const notify = (e:any) => {
  console.log(13123);
  toast(e);
};
export default { notify };
