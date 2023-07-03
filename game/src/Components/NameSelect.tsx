import { useRef, useState } from "react";
import { useConnectionContext } from "../Contexts/ConnectionContext";
import { useNavigate } from "react-router";
import { Loading } from "./Loading";
import "../Styles/nameStyle.css";

export const NameSelect = () => {
    /** All the props of the current connection */
    const { connectionState: {socket}, connectionDispatch } = useConnectionContext();

    const nameInput = useRef<HTMLInputElement>(null);
    
    const [emptyInput, setEmptyInput] = useState(false);
    const navigate = useNavigate();
    
    const sendName = () => {
        const {current: name} = nameInput;
        
        if (!socket || !name) return;

        if (name.value.length >= 3) {
            socket.emit("send_name", name.value, () => {
                connectionDispatch({ type: "set_name", payload: name.value })
    
                navigate("/game-type", { replace: true }    ); 
                // replace ce da ukloni browser history kako igrc ne bi mogao da se vrti na name select
                // trenutno je u komentaru radi debuggovanja
            });
        }
        else 
            setEmptyInput(true);
    }

    if (!socket) return <Loading />

    return (
        <div className="name-input">
            <label>Your Name:</label>
            <input className={`${emptyInput ? "empty-input" : ""}`} autoFocus placeholder="username" ref={nameInput} maxLength={12}
                onKeyDown={event => { if (event.key === "Enter") sendName(); }} />
            <button onClick={sendName}>Connect!</button>
        </div>
    );
}