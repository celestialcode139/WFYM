const Base_Url = {
  url: "https://witty-eel-leg-warmers.cyclic.app/api/v1/",
  // url: "http://localhost:8000/api/v1/"
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
    GetMetaDataRace: {
      url: `${Base_Url.url}init/get-metadata/race`,
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
      method: "POST",
    },
  },
  Match: {
    GetMatches: {
      url: `${Base_Url.url}match/match-request`,
      method: "GET",
    },
    FavDecline: {
      url: `${Base_Url.url}match/match-result`,
      method: "PUT",
    },
    GetLatestMatch: {
      url: `${Base_Url.url}match/latest-match-request`,
      method: "GET",
    },
    RequestMatch: {
      url: `${Base_Url.url}match/match-request`,
      method: "POST",
    },
  },
};

export default { Endpoints };
