import config from "../../config";
import axios from "axios";
const GetSignedURL = async (fileName) => {
    try {
        const resp = await axios.get(`${config.Endpoints.Media.PostSignedURL.url}/${fileName}`);
        if (resp.data.status == "success") {
            console.log("Response:", resp.data.data);
            return resp.data.data;
        }
    }
    catch (error) {
        console.log("Error", error);
    }
    console.log("check if come here");
    return '';
};
const UploadImage = async (files, onprogress) => {
    let signedUrl = [];
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const resp = await axios.put(`${await GetSignedURL(file.name)}`, file, {
            onUploadProgress: (progressEvent) => {
                onprogress(progressEvent);
            },
        });
        if (resp.status == 200) {
            let url = await GetImage(file.name);
            let object = { url, file_name: file.name };
            signedUrl.push(object);
        }
    }
    console.log("signedUrl:", signedUrl);
    return signedUrl;
};
const GetImage = async (fileName) => {
    try {
        console.log("get image ");
        const image = await axios.get(`${config.Endpoints.Media.GetSignedURL.url}/${fileName}`);
        console.log(image.data.data);
        return image.data.data;
    }
    catch (error) {
        console.log("Error", error);
    }
    return "";
};
export default { UploadImage, GetImage };
