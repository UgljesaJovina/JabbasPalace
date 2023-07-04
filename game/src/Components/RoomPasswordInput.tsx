import { Dispatch, SetStateAction, useRef } from "react";
import { IPassModalParams } from "./FindGame";
import { useConnectionContext } from "../Contexts/ConnectionContext";
import { Navigate, useNavigate } from "react-router";

export const RoomPasswordModal: React.FC<{ params: IPassModalParams, setModal: Dispatch<SetStateAction<IPassModalParams>> }> = 
    ({ params: { uid, name, show }, setModal }) => {

    const { connectionState: { socket }, connectionDispatch } = useConnectionContext();
    const passInput = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const closeModal = () => {
        setModal(curr => { return { ...curr, show: false } })
    }

    if (!socket || !socket.connected) return <Navigate to="/" />

    const enterLobby = () => {
        if (!passInput.current) return;

        socket.emit("request_lobby_enter", uid, passInput.current.value, (error?: string) => {
            if (error)
                alert(error);
            else {
                navigate(`/room?uid=${uid}`, { replace: true });
                connectionDispatch({ type: "set_room", payload: { uid: uid, name: name, password: passInput.current!.value } });
            }
        });
    }

    return (
        <div className={`shade ${show ? "" : "hidden"}`}>
            <div style={{height: "100%", width: "100%"}} onClick={closeModal} ></div>
            <div className="password-modal" >
                <label>{name}</label>
                <hr />
                <input type="password" autoFocus placeholder="password" ref={passInput} onKeyDown={e => {if(e.key === "Enter") enterLobby();}} />
                <button onClick={enterLobby}>Connect</button>
            </div>
        </div>
    )
}