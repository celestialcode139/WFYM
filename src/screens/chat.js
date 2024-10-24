import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// App.js
import { useState, useEffect } from "react";
import { firestore } from "../../firebaseConfig";
import { Box, Container, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import "../App.css";
import { useParams } from "react-router-dom";
import AdminSignature from "../assets/images/adminSignature.svg";
import SendMsg from "../assets/icons/sendMsg.png";
import VideoIcon from "../assets/icons/video.svg";
import HeaderApp from "../components/header/AppHeader";
// import _ from "lodash";
import { Link } from "react-router-dom";
const useStyles = makeStyles(() => {
    return {
        appheader: {
            backgroundColor: "#ffffff",
            minHeight: "100vh",
            backgroundImage: `url(${AdminSignature})`,
            backgroundSize: "100%",
            backgroundRepeat: "no-repeat",
        },
        badge: {
            display: "flex",
            alignItems: "center",
            borderRadius: "10px",
            border: "1px solid #E8E6EA",
            padding: "10px 16px",
            fontSize: "12px!important",
            cursor: "pointer",
        },
        activeBadge: {
            backgroundColor: "black",
            color: "white",
            boxShadow: "6px 8px 10px 0px rgba(103, 103, 103, 0.19)",
        },
        pageContainer: {
            // maxWidth: "1000px",
            width: "90%",
        },
        matchMessages: {
            backgroundColor: "#F0F9F9",
            fontSize: "14px!important",
            padding: "15px",
            borderRadius: "10px",
            marginBottom: "10px!important",
            display: "inline-block",
        },
        myMessages: {
            backgroundColor: "#F3F3F3",
            fontSize: "14px!important",
            padding: "15px",
            borderRadius: "10px",
            marginBottom: "10px!important",
            display: "inline-block",
        },
        myMessagesParent: {
            display: "flex",
            justifyContent: "end",
        },
        leftTime: {
            fontSize: "12px!important",
            color: "#959595",
        },
        rightTime: {
            fontSize: "12px!important",
            color: "#959595",
            textAlign: "end",
        },
        messageField: {
            height: "35px",
            width: "calc(100% - 30px)",
            border: "1px solid #E8E6EA",
            borderRadius: "10px",
            padding: "7px 15px",
            position: "relative",
            //   position: "absolute",
            //   bottom: "25px",
            //   left: "calc(100% - 75%)",
        },
        videoImg: {
            backgroundColor: "#ffffff",
            height: "35px",
            padding: "7px 15px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "35px",
            borderRadius: "10px",
            border: "1px solid #E8E6EA",
            marginLeft: "10px",
        },
        bottomBar: {
            display: "flex",
            maxWidth: "calc(535.5px + 67px)!important",
            width: "100%",
            // left: "calc(50% - 300px)",
            // backgroundColor: "red",
        },
        "@media (max-width:600px)": {
            bottomBar: {
                maxWidth: "100%!important",
            },
        },
        stickyTop20: {
            position: "sticky",
            bottom: "20px",
        },
    };
});
const Chat = () => {
    const classes = useStyles();
    const { myId, matchId } = useParams();
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    let compositJoin = [myId, matchId].sort().join("");
    const sendMessage = async () => {
        try {
            // Add message to Firestore
            const messagesRef = firestore.collection(`chat_${compositJoin}`);
            await messagesRef.add({
                text: message,
                id: myId,
                displayName: "ABCD",
                timestemp: new Date(),
            });
            // Clear the input field
            setMessages([
                ...messages,
                { text: message, id: myId, displayName: "ABCD" },
            ]);
            setMessage("");
        }
        catch (error) {
            console.error("Error sending message:", error);
        }
    };
    const getAllMessages = () => {
        const messagesRef = firestore
            .collection(`chat_${compositJoin}`)
            .orderBy("timestemp", "asc");
        messagesRef.onSnapshot((querySnapshot) => {
            // notif();
            const messages = [];
            querySnapshot.forEach((doc) => {
                messages.push(doc.data());
            });
            setMessages(messages);
            // console.log(messages);
        });
    };
    useEffect(() => {
        getAllMessages();
    }, []);
    return (_jsx(Box, { className: `${classes.appheader}`, children: _jsxs(Container, { maxWidth: "xl", children: [_jsx(HeaderApp, { sx: { position: "relative", top: "15px" } }), _jsx(Box, { sx: { marginTop: "30px", padding: "20px 0px", position: "relative" }, className: `blurBg min100vh h-center`, children: _jsxs(Box, { className: `${classes.pageContainer}`, sx: { marginTop: { md: "100px", sm: "60px", xs: "30px" } }, children: [_jsx(Box, { children: messages.map((data, i) => {
                                    return (_jsx(Box, { className: `${data.id == myId ? classes.myMessagesParent : null}`, children: _jsxs(Box, { sx: { maxWidth: { md: "50%", xs: "80%" } }, children: [_jsx(Typography, { className: `${data.id == myId
                                                        ? classes.myMessages
                                                        : classes.matchMessages}`, children: data.text }), _jsx(Typography, { className: `${data.id == myId ? classes.rightTime : classes.leftTime}`, children: "2:55 PM" })] }) }, i));
                                }) }), _jsx(Box, { className: `${classes.stickyTop20} h-center`, children: _jsxs(Box, { className: `${classes.bottomBar}`, children: [_jsxs(Box, { sx: { width: "100%", position: "relative" }, children: [_jsx("input", { className: `${classes.messageField}`, type: "text", value: message, onChange: (e) => setMessage(e.target.value), placeholder: "Type your message..." }), _jsx(Box, { onClick: sendMessage, component: "img", src: SendMsg, className: "hover", sx: {
                                                        width: "25px",
                                                        position: "absolute",
                                                        right: "10px",
                                                        top: "14px",
                                                    } })] }), _jsx(Box, { className: `${classes.videoImg}`, children: _jsx(Link, { to: { pathname: `/video-call/${myId}/${matchId}` }, children: _jsx(Box, { component: "img", src: VideoIcon, sx: { width: "25px" } }) }) })] }) })] }) })] }) })
    // <div>
    //   <div>
    //     <p>Hello, ADDDD!</p>
    //     <ul>
    //       {messages.map((msg: any, index: any) => (
    //         <li key={index}>
    //           <strong>{msg?.displayName}:</strong> {msg?.text}
    //         </li>
    //       ))}
    //     </ul>
    // <input
    //   type="text"
    //   value={message}
    //   onChange={(e) => setMessage(e.target.value)}
    //   placeholder="Type your message..."
    // />
    //     <button onClick={sendMessage}>Send</button>
    //   </div>
    // </div>
    );
};
export default Chat;
