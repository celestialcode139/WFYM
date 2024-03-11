import { useNavigate } from "react-router-dom";
import { useCallReceiverData } from "../context/SignalsContextProvider";
import "./Incommingcall.css";
import { useAuth } from "../context/AuthContextProvider";
// import $ from "jquery";

function Incommingcall() {
	const navigate = useNavigate();

	const { acceptCall, incomingCall, rejectCall } = useCallReceiverData();
	const { sessionUser } = useAuth();
	return (
		<div className="card" style={{ zIndex: 999 }}>
			<div className="header">
				<div className="animation">
					<span className="icon ring"></span>
					<div className="cercle one"></div>
					<div className="cercle two"></div>
					<div className="cercle three"></div>
				</div>

				<p className="phoneNumber">182 5843 6068</p>
				<p className="calling">Calling</p>
			</div>

			<div className="footer">
				<div
					onClick={() => {
						rejectCall();
					}}
					className="bouton raccrocher"
				>
					<span className="icon red"></span>
				</div>
				<div
					onClick={() => {
						acceptCall();

						navigate(
							`/video-call/${sessionUser._id}/${incomingCall.sender._id}`
						);
					}}
					className="bouton decrocher"
				>
					<span className="icon green"></span>
				</div>
			</div>
		</div>
	);
}

export default Incommingcall;
