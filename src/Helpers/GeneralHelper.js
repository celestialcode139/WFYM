import Cookies from "js-cookie";
const ShowToast = (msg) => {
    // const alert = useAlert();
    // if (type=="success") {
    alert(msg);
    // }
};
const storeData = (label, data) => {
    return new Promise((resolve) => {
        try {
            Cookies.set(label, data);
            resolve({ status: 1, message: "Stored" });
        }
        catch (error) {
            resolve({ status: 0, message: "Something went wrong" });
            console.log(error);
        }
    });
};
const retrieveData = (label) => {
    return new Promise((resolve) => {
        try {
            const storedData = Cookies.get(label);
            if (storedData) {
                resolve({ status: 1, data: storedData });
            }
            else {
                resolve({ status: 0, message: "Something went wrong" });
            }
        }
        catch (error) {
            resolve({ status: 0, message: "Something went wrong" });
            console.log(error);
        }
    });
};
const ClearData = (label) => {
    return new Promise((resolve) => {
        try {
            Cookies.remove(label);
            resolve({ status: 1 });
        }
        catch (error) {
            resolve({ status: 0, message: "Something went wrong" });
            console.log(error);
        }
    });
};
export default { ShowToast, storeData, retrieveData, ClearData };
