const Base_Url = {
  url: "https://witty-eel-leg-warmers.cyclic.app/api/v1/",
};
const Endpoints = {
  auth: {
    OTP: {
      SendOtp: {
        url: `${Base_Url.url}auth/send-otp`,
        method: "POST",
      },
      VarifyOtp: {
        url: `${Base_Url.url}auth/varify-otp`,
        method: "POST",
      },
    },
    SignUp: {
      url: `${Base_Url.url}auth/signup`,
      method: "POST",
    },
    SignIn: {
      url: `${Base_Url.url}auth/login`,
      method: "POST",
    },
    forgetPass: {
      url: `${Base_Url.url}auth/forget-password`,
      method: "POST",
    },
    setPass: {
      url: `${Base_Url.url}auth/set-password`,
      method: "POST",
    },
  },
  user: {
    GetMyProfile: {
      url: `${Base_Url.url}user/get-my-profile/`,
      method: "GET",
    },
    GetIdealPersonality: {
      url: `${Base_Url.url}user/get-ideal-person`,
      method: "GET",
    },
    UpdateUserProfile: {
      url: `${Base_Url.url}auth/update-user/`,
      method: "POST",
    },
    UpdateIdealPersonality: {
      url: `${Base_Url.url}user/set-ideal-person`,
      method: "POST",
    },
    UpdateBio: {
      url: `${Base_Url.url}user/set-user-profile`,
      method: "POST",
    },
    GetProfileVerification: {
      url: `${Base_Url.url}user/get-my-profile-verification`,
      method: "GET",
    },
  },
  Init: {
    GetMetaData: {
      url: `${Base_Url.url}init/get-metadata/`,
      method: "GET",
    },
  },
  Subscription: {
    GetAll: {
      url: `${Base_Url.url}subscription/all`,
      method: "GET",
    },
    AssignSubsecription: {
      url: `${Base_Url.url}user-subscription/create`,
      method: "GET",
    },
  },
};

export default { Endpoints };
