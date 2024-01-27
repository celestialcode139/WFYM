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
const UploadImage = async (files: File[]) => {
    let signedUrl: string[] = []
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const resp = await axios.put(`${await GetSignedURL(file.name)}`, file, {
            onUploadProgress: (progressEvent) => {
                const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                console.log(`Upload Progress: ${progress}%`);
                // You can use 'progress' variable to update your UI or do other things based on the progress
            },
        });
        if (resp.status == 200) {
            signedUrl.push(await GetImage(file.name))
        }
    }
    console.log();

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