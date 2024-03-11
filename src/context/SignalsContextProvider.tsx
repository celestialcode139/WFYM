import { createContext, useContext, useEffect, useState } from "react";
import { ICallData } from "../types";
import { firestore } from "../../firebaseConfig";
import { useAuth } from "./AuthContextProvider";
import moment from "moment";

interface CallReceiverDataType {
	incomingCall: ICallData;
	acceptCall: () => void;
	rejectCall: () => void;
}

interface CallDataProviderProps {
	children: React.ReactNode;
}

export const CallReceiverData = createContext<CallReceiverDataType>({
	incomingCall: null,
	acceptCall: null,
	rejectCall: null,
});

export const useCallReceiverData = () => useContext(CallReceiverData);

export const CallReceiverContextProvider = ({
	children,
}: CallDataProviderProps) => {
	const { sessionUser } = useAuth();
	console.log("sessionUsersessionUser ", sessionUser);

	const [incomingCall, setIncomingCall] = useState<ICallData>(null);

	useEffect(() => {
		const twoMinutesAgo = moment().subtract(1, "minutes").unix();

		console.log("twoMinutesAgotwoMinutesAgo", twoMinutesAgo);
		const mainProcess = firestore
			.collection("calls")
			.where("callStatus", "in", ["ringing", "accepted"])
			.where("receiverID", "==", sessionUser._id)
			.where("timestamp", ">=", twoMinutesAgo)
			.onSnapshot((snapshot) => {
				if (snapshot.size == 0) {
					setIncomingCall(null);
				}
				snapshot.forEach((doc) => {
					const data = doc.data();
					console.log(
						"🚀 ~ snapshot.forEach ~ doc.data();:",
						doc.data()
					);
					setIncomingCall(data as ICallData);
					const callStatus = doc.data()?.callStatus;
					console.log(
						"🚀 ~ snapshot.forEach ~ callStatus:",
						callStatus
					);

					const docID = doc.data()?.docID;
					const timeoutId = setTimeout(() => {
						watchCall(docID);
						clearTimeout(timeoutId);
					}, 30000);
				});
			});

		return () => {
			// alert("cancle the call");
			mainProcess();
			if (incomingCall?.docID) {
				firestore
					.collection("calls")
					.doc(incomingCall?.docID)
					.update({ callStatus: "cancel" });
			}
		};
	}, [sessionUser._id]);

	const acceptCall = () => {
		firestore
			.collection("calls")
			.doc(incomingCall.docID)
			.update({ callStatus: "accepted" });
		// Add logic to handle call acceptance
	};

	const rejectCall = () => {
		firestore
			.collection("calls")
			.doc(incomingCall.docID)
			.update({ callStatus: "rejected" });
	};
	const watchCall = (createCallData) => {
		const callRefDoc = firestore.collection("calls").doc(createCallData);

		const unsubscribe = callRefDoc.onSnapshot((doc) => {
			const callStatus = doc.data()?.callStatus;

			if (callStatus === "ringing") {
				console.log(
					"🚀 ~ timeoutId ~ callStatus: Caller1212",
					callStatus
				);

				// Update the document if the status has not changed
				callRefDoc.update({
					callStatus: "missed", // or any other status you want to set
				});
			}

			// Clear the timeout
		});

		return unsubscribe;
	};
	return (
		<CallReceiverData.Provider
			value={{ incomingCall, rejectCall, acceptCall }}
		>
			{children}
		</CallReceiverData.Provider>
	);
};

interface CallCreatorDataType {
	createCallData: ICallData;
	createCall: (e: string) => void;
	cancelCall: () => void;
}

export const CallCreatorDataContext = createContext<CallCreatorDataType>({
	createCallData: null,
	createCall: null,
	cancelCall: null,
});

export const useCallCreatorData = () => useContext(CallCreatorDataContext);

export const CallCreatorContextProvider = ({
	children,
}: CallDataProviderProps) => {
	const [createCallData, setCreateCallData] = useState(null);
	const { sessionUser } = useAuth();

	const createCall = async (receiverID: string) => {
		try {
			const callRef = firestore.collection(`calls`);
			const timestampId = moment().format("YYYYMMDDHHmmssSSS");
			const callRefDoc = callRef.doc(timestampId);
			const data = {
				callStatus: "ringing",
				receiverID: receiverID,
				docID: timestampId,
				sender: sessionUser,
				timestamp: moment().unix(),
			};
			await callRefDoc.set(data).then(() => {
				setCreateCallData(data);
				watchCall(timestampId);
			});

			// Clear the input field
		} catch (error) {
			console.error("Error sending message:", error);
		}
	};

	const watchCall = (createCallDataID) => {
		const callRefDoc = firestore.collection("calls").doc(createCallDataID);

		const unsubscribe = callRefDoc.onSnapshot((doc) => {
			const callStatus = doc.data()?.callStatus;
			console.log("🚀 ~ unsubscribe ~ callStatus:", callStatus);
			setCreateCallData(doc.data());

			const timeoutId = setTimeout(() => {
				if (createCallData.callStatus === "ringing") {
					console.log(
						"🚀 ~ timeoutId ~ callStatus: Caller1212",
						createCallData.callStatus
					);

					// Update the document if the status has not changed
					callRefDoc.update({
						callStatus: "missed", // or any other status you want to set
					});
				}

				// Clear the timeout
				clearTimeout(timeoutId);
			}, 60000); // 1 minute timeout
		});

		return unsubscribe;
	};

	const cancelCall = () => {
		firestore
			.collection("calls")
			.doc(createCallData.docID)
			.update({ callStatus: "cancel", });
		// Add logic to handle call rejection
	};

	return (
		<CallCreatorDataContext.Provider
			value={{ createCallData, createCall, cancelCall }}
		>
			{children}
		</CallCreatorDataContext.Provider>
	);
};
