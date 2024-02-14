import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const notify = (Message, AlertTime) => {
    toast(Message, {
        autoClose: AlertTime ? AlertTime : 5000
    });
};
export default { notify };
