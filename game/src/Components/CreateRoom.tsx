import { useEffect, useRef, useState } from "react";
import "../Styles/createRoomStyle.css"
import { Navigate, useNavigate } from "react-router";
import { useConnectionContext } from "../Contexts/ConnectionContext";
import { BackButton } from "./BackButton";

export const CreateRoom = () => {
    const { connectionState, connectionDispatch } = useConnectionContext();
    const { socket, name } = connectionState;
    const [emptyInput, setEmptyInput] = useState(false);
    const navigate = useNavigate();

    const nameInput = useRef<HTMLInputElement>(null);
    const passInput = useRef<HTMLInputElement>(null);
    const { current: roomName } = nameInput;
    const { current: roomPass } = passInput;

    useEffect(() => {
        if (!name) navigate("/", { replace: true });
    }, [name, navigate]);

    if (!socket || !socket.connected) return <Navigate to="/" />

    const createRoom = () => {
        if (!roomName) return;

        if (roomName.value.length >= 3) {
            socket.emit("create_lobby", roomName.value, roomPass?.value ? roomPass.value : null, (uid: string) => {
                connectionDispatch({ type: "set_room", payload: { 
                    uid: uid, 
                    name: roomName.value, 
                    password: roomPass?.value ? roomPass.value : null 
                }});

                navigate(`/room?uid=${uid}`, { replace: true });
            });
        }
        else
            setEmptyInput(true);
    }

    return (
        <div className="create-room">
            <BackButton location="/game-type" />
            <input placeholder="Room Name" className={`${emptyInput ? "empty-input" : ""}`} autoFocus ref={nameInput}
                onKeyDown={e => { if (e.key === "Enter") createRoom(); }} />
            <input placeholder="password" type="password" ref={passInput} onKeyDown={e => { if (e.key === "Enter") createRoom(); }} />
            <button onClick={createRoom}>Create</button>
        </div>
    )
}