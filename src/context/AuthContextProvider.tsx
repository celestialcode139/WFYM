import {
	Component,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";
import GeneralHelper from "../Helpers/GeneralHelper";
import { CallApi } from "../Helpers/APIHelper";
import config from "../../config";
import { IUser } from "../types";

interface AuthContextType {
	isAuthenticated: boolean;
	authToken: string;
	sessionUser: IUser;
	setAuthToken: React.Dispatch<React.SetStateAction<string>>;
	loadSession: () => Promise<boolean>;
}

interface AuthContextProviderProps {
	children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextType>({
	isAuthenticated: false,
	authToken: "",
	sessionUser: {} as IUser,
	setAuthToken: (e: string) => e,
	loadSession: () => null,
});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = (props: AuthContextProviderProps) => {
	const { children } = props;

	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const [sessionUser, setSessionUser] = useState<IUser>(null);
	const [authToken, setAuthToken] = useState<string>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		console.log("Context is loading ...");
		loadSession();
	}, []);

	const loadSession = async (): Promise<boolean> => {
		const currentSessionToken = await GeneralHelper.retrieveData("Token");
		return new Promise((response) => {
			try {
				console.log(
					"🚀 ~ loadSession ~ currentSessionToken.data || authToken:",
					currentSessionToken.data || authToken
				);
				CallApi<IUser>(
					config.Endpoints.user.GetMyProfile,
					{},
					null,
					currentSessionToken.data || authToken
				).then((data) => {
					if (!data?.error?.statusCode) {
						console.log("this is data", data.data);

						setSessionUser(data.data);
						setIsAuthenticated(true);
						setAuthToken(currentSessionToken.data || authToken);
						setLoading(false);
						response(true);
					} else {
						sessionUser;
						setLoading(false);
						response(false);
					}
				});
			} catch (error) {
				response(false);
				console.log(error);
			}
		});
	};
	console.log(sessionUser);

	console.log("🚀 ~ AuthContextProvider ~ sessionUser:", sessionUser);

	return (
		<AuthContext.Provider
			value={{
				sessionUser,
				isAuthenticated,
				authToken,
				setAuthToken,
				loadSession,
			}}
		>
			{!loading && children}
		</AuthContext.Provider>
	);
};
