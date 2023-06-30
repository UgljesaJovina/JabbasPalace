import { useEffect, useRef, useState } from "react";
import "../Styles/createRoomStyle.css"
import { useNavigate } from "react-router";
import { useConnectionContext } from "../Contexts/ConnectionContext";

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
        if (!name) navigate("/");
    }, []);

    const createRoom = () => {
        if (!socket || !roomName) return;

        if (roomName.value.length >= 3) {
            socket.emit("create_lobby", roomName.value, roomPass?.value, (uid: string) => {
                connectionDispatch({ type: "set_room", payload: { uid: uid, name: roomName.value, password: roomPass?.value } });
                navigate(`/room?uid=${uid}`);
            });
        }
        else
            setEmptyInput(true);
    }

    return (
        <div className="create-room">
            <input placeholder="Room Name" className={`${emptyInput ? "empty-input" : ""}`} autoFocus ref={nameInput}
                onKeyDown={e => { if (e.key === "Enter") createRoom(); }} />
            <input placeholder="password" ref={passInput} />
            <button onClick={createRoom}>Create</button>
        </div>
    )
}