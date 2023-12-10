import GeneralHelper from "./GeneralHelper";
interface Options {
    url:string;
    method:string
}
interface Response {
    status?:string;
    data?:{}
    message:string
}


const CallApi = ({ url, method }:Options, body:{},Id:any,Tokken:any):Promise<Response> => {
    const headers :Record<string, string> = {
        "Content-Type": "application/json",
    }
    return new Promise((resolve) => {
        try {
            if (Tokken) {
                headers.Authorization=Tokken;
            }
            console.log("API url :", Id?url+Id:url,
                "\n Method :", method,
                "\n Headers :", headers,
                "\n Body :", body
            )
            fetch(Id?url+Id:url, {
                method: method,
                headers: headers,
                body: method != "GET" ? JSON.stringify(body) : null
            })
                .then((res) => res.json())
                .then((resjson) => {
                    resolve(resjson)
                })
                .catch((err) => {
                    console.log("failed", err);
                    let error = err.toString()
                    resolve({message:"Something went wrong"})
                    if (error.includes("Network request failed")) {
                        GeneralHelper.ShowToast("Make Sure you have an active internet connection on your phone")
                    }
                });
        } catch (error) {
            resolve({message:"Something went wrong"})
            console.log(error);
        }
    })
};

export default { CallApi }