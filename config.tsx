const Base_Url = {
    url: 'http://localhost:8000/api/v1/'
};
const Endpoints = {
    auth: {
        OTP: {
            SendOtp: {
                url: `${Base_Url.url}auth/send-otp`,
                method: "POST"
            },
            VarifyOtp: {
                url: `${Base_Url.url}auth/varify-otp`,
                method: "POST"
            }
        },
        SignUp: {
            url: `${Base_Url.url}auth/signup`,
            method: "POST"
        },
        SignIn: {
            url: `${Base_Url.url}auth/login`,
            method: "POST"
        },
        forgetPass:{
            url: `${Base_Url.url}auth/forget-password`,
            method: "POST",
        },
        setPass:{
            url: `${Base_Url.url}auth/set-password`,
            method: "POST",
        }

    }
}

export default { Endpoints }