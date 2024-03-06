import { createContext, useContext, useEffect, useState } from "react";
import GeneralHelper from "../Helpers/GeneralHelper";
import { CallApi } from "../Helpers/APIHelper";
import config from "../../config";
import { IUser } from "../types";

interface AuthContextType {
  isAuthenticated: boolean;
  authToken: string;
  sessionUser: IUser;
}

interface AuthContextProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  authToken: "",
  sessionUser: {} as IUser,
});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = (props: AuthContextProviderProps) => {
  const { children } = props;

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [sessionUser, setSessionUser] = useState<IUser>(null);
  const [authToken, setAuthToken] = useState<string>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log("Context is loading ...")
    loadSession();
  }, []);

  const loadSession = async () => {
    try {
      const currentSessionToken = await GeneralHelper.retrieveData("Token");
      currentSessionToken.data;
      const currentSession = await CallApi<IUser>(
        config.Endpoints.user.GetMyProfile,
        {},
        null,
        currentSessionToken.data
      );
      setAuthToken(currentSessionToken.data)
      setSessionUser(currentSession.data);
      setIsAuthenticated(true);
    } catch (error) {
        console.log(error)
    }
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ sessionUser, isAuthenticated,authToken }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
