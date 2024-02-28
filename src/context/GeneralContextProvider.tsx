import { createContext, useContext, useEffect, useState } from "react";
import GeneralHelper from "../Helpers/GeneralHelper";
import { TokenResponse } from "../components/PrivateRoute";

interface GeneralContextContextType {
  GeneralContext: any;
  updateGeneralContext: (user: any) => void;
}

interface GeneralContextProviderProps {
  children: React.ReactNode;
}

export const GeneralContextContext = createContext<GeneralContextContextType>({
  GeneralContext: null,
  updateGeneralContext: () => null,
});

export const useGeneralContext = () => useContext(GeneralContextContext);

export const GeneralContextProvider = (props: GeneralContextProviderProps) => {
  const { children } = props;

  const [GeneralContext, setGeneralContext] = useState<any>(null);
  const { userData, getMeResponse, isFetched, isLoading } = useGetMe();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [session, setSession] = useState<CognitoUserSession>(null);

  const updateGeneralContext = (data: any) => {
    setGeneralContext(data);
  };
  useEffect(() => {
    loadSession();
  }, []);

  const loadSession = async () => {
    try {
      const currentSession: TokenResponse = await GeneralHelper.retrieveData(
        "Token"
      );
      console.debug("Cognito token: ", currentSession);

      setIsAuthenticated(true);

      setSession(currentSession);
    } catch (error) {
      console.warn(error);
      setIsAuthenticated(false);
    }
    setLoading(false);
  };

  return (
    <GeneralContextContext.Provider
      value={{ updateGeneralContext, GeneralContext }}
    >
      {isFetched && children}
    </GeneralContextContext.Provider>
  );
};
