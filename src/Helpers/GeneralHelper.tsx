import Cookies from "js-cookie";
import { TokenResponse } from "../types";
// import { useAlert } from 'react-alert'

const ShowToast = (msg: string) => {
  // const alert = useAlert();
  // if (type=="success") {
  alert(msg);
  // }
};
const storeData = (label: string, data: any) => {
  return new Promise((resolve) => {
    try {
      Cookies.set(label, data);
      resolve({ status: 1, message: "Stored" });
    } catch (error) {
      resolve({ status: 0, message: "Something went wrong" });
      console.log(error);
    }
  });
};
const retrieveData = (label: string):Promise<TokenResponse> => {
  return new Promise((resolve) => {
    try {
      const storedData = Cookies.get(label);
      if (storedData) {
          resolve({ status: 1, data: storedData });
      }else{
        resolve({ status: 0, message: "Something went wrong" });

      }
    } catch (error) {
      resolve({ status: 0, message: "Something went wrong" });
      console.log(error);
    }
  });
};
const ClearData = (label: string) => {
  return new Promise((resolve) => {
    try {
      Cookies.remove(label);
      resolve({ status: 1 });
    } catch (error) {
      resolve({ status: 0, message: "Something went wrong" });
      console.log(error);
    }
  });
};

export default { ShowToast, storeData, retrieveData, ClearData };
