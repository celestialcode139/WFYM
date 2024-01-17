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

const CallApi = ({ url, method }:Options, body:{}):Promise<Response> => {
    const headers = {
        "Content-Type": "application/json",
    }
    return new Promise((resolve, reject) => {
        try {
            console.log("API url :", url,
                "\n Method :", method,
                "\n Headers :", headers,
                "\n Body :", body
            )
            fetch(url, {
                method: method,
                headers: headers,
                body: method != "GET" ? JSON.stringify(body) : null
            })
                .then((res) => res.json())
                .then((resjson:any) => {
                    resolve(resjson)
                })
                .catch((err) => {
                    console.log("failed", err);
                    const error = err.toString()
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