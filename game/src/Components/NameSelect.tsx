import { useRef, useState } from "react";
import { useConnectionContext } from "../Contexts/ConnectionContext";
import { useNavigate } from "react-router";
import { Loading } from "./Loading";

export function NameSelect() {
    const { connectionState, connectionDispatch } = useConnectionContext();
    const nameinput = useRef<HTMLInputElement>(null);
    const [emptyInput, setEmptyInput] = useState(false);
    const navigate = useNavigate();

    const sendName = () => {
        if (!connectionState.socket) return;
        if (nameinput.current?.value && nameinput.current.value.length >= 3) {
            connectionState.socket.emit("send_name", nameinput.current.value, connectionState.socket.id);
            connectionDispatch({ type: "set_name", payload: nameinput.current.value })
            navigate("/game-type"/*, { replace: true }*/);
        }
        else 
            setEmptyInput(true);
    }

    if (!connectionState.socket) return <Loading />

    return (
        <div className="name-input">
            <label>Your Name:</label>
            <input className={`${emptyInput ? "empty-input" : ""}`} placeholder="username" ref={nameinput} maxLength={12} />
            <button onClick={sendName}>Connect!</button>
        </div>
    );
}