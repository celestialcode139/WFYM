import config from "../../config";
import axios from "axios";
interface Options {
    url: string;
    method: string
}
interface Response {
    status?: string;
    data?: {}
    message: string
}
interface signedUrlInterface {
    url: string;
    file_name: string
}


const GetSignedURL = async (fileName: string): Promise<string> => {
    try {
        const resp = await axios.get(`${config.Endpoints.Media.PostSignedURL.url}/${fileName}`);
        if (resp.data.status == "success") {
            console.log("Response:", resp.data.data);
            return resp.data.data
        }

    } catch (error) {
        console.log("Error", error);

    }
    console.log("check if come here");

    return ''
}
const UploadImage = async (files: File[], onprogress: any) => {
    const signedUrl: signedUrlInterface[] = []
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const resp = await axios.put(`${await GetSignedURL(file.name)}`, file, {
            onUploadProgress: (progressEvent) => {
                onprogress(progressEvent)
            },
        });
        if (resp.status == 200) {
            const url = await GetImage(file.name);
            const object = { url, file_name: file.name }
            signedUrl.push(object)
        }
    }
    console.log("signedUrl:", signedUrl);

    return signedUrl
}
const GetImage = async (fileName: string): Promise<string> => {
    try {
        console.log("get image ");

        const image = await axios.get(`${config.Endpoints.Media.GetSignedURL.url}/${fileName}`);
        console.log(image.data.data);

        return image.data.data

    } catch (error) {
        console.log("Error", error);

    }
    return ""
}

export default { UploadImage, GetImage }