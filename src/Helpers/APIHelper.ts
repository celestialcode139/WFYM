import { useQuery } from "@tanstack/react-query";
import GeneralHelper from "./GeneralHelper";
interface Options {
  url: string;
  method: string;
}
interface Response<T> {
  error?: any;
  status?: string;
  data?: T;
  message: string;
}

const CallApi = <T = object>(
  { url, method }: Options,
  body: object,
  Id: string | null,
  Tokken: string
): Promise<Response<T>> => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  return new Promise((resolve) => {
    try {
      if (Tokken) {
        headers.Authorization = Tokken;
      }
      console.log(
        "API url :",
        Id ? url + Id : url,
        "\n Method :",
        method,
        "\n Headers :",
        headers,
        "\n Body :",
        body
      );
      fetch(Id ? url + Id : url, {
        method: method,
        headers: headers,
        body: method != "GET" ? JSON.stringify(body) : null,
      })
        .then((res) => res.json())
        .then((resjson) => {
          resolve(resjson);
        })
        .catch((err) => {
          console.log("failed", err);
          const error = err.toString();
          resolve({ message: "Something went wrong" });
          if (error.includes("Network request failed")) {
            GeneralHelper.ShowToast(
              "Make Sure you have an active internet connection on your phone"
            );
          }
        });
    } catch (error) {
      resolve({ message: "Something went wrong" });
      console.log(error);
    }
  });
};
const useCallApi = (
  { url, method }: Options,
  body: object,
  Id: string | null,
  Tokken: string
) => {
  return useQuery({
    queryKey: [""],
    queryFn: () =>
      fetch(Id ? url + Id : url, {
        method: method,
        headers: { Authorization: Tokken },
        body: method != "GET" ? JSON.stringify(body) : null,
      }),
  });
};
export { CallApi, useCallApi };
export default { CallApi };
