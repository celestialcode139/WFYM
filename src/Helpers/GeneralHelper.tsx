import Cookies from 'js-cookie';

const ShowToast = (msg:string) => {
    alert(msg)
};
const storeData = (label:string, data:any) => {
    return new Promise((resolve, reject) => {
        try {
            Cookies.set(label, data)
            resolve({ status: 1, message: "Stored" })

        } catch (error) {
            resolve({ status: 0, message: "Something went wrong" })
            console.log(error);
        }
    })
};
const retrieveData = (label:string) => {
    return new Promise((resolve, reject) => {
        try {
            const storedData = Cookies.get(label);
            resolve({ status: 1, data: storedData })
        } catch (error) {
            resolve({ status: 0, message: "Something went wrong" })
            console.log(error);
        }
    })
};
const ClearData = (label:string) => {
    return new Promise((resolve, reject) => {
        try {
            Cookies.remove(label);
            resolve({ status: 1 })
        } catch (error) {
            resolve({ status: 0, message: "Something went wrong" })
            console.log(error);
        }
    })
};


export default { ShowToast, storeData, retrieveData, ClearData}