import silhouette from "../Images/silhouette.png"
import key from "../Images/key.png"
import { useConnectionContext } from "../Contexts/ConnectionContext"
import { Navigate, useNavigate } from "react-router";
import ILobbyListObject from "../Interfaces/ILobbyListObject";
import { Dispatch } from "react";
import { IPassModalParams } from "./FindGame";

export const LobbyListObject: React.FC<ILobbyListObject & { setModal: Dispatch<IPassModalParams>, order: number }> =  
    ({ uid, name, playerNum, pass, inProgress, setModal, order }) => { // ovo posle & samo sluzi da bi mogla da se passuje func za modal

    const { connectionState: { socket }, connectionDispatch } = useConnectionContext();
    const navigate = useNavigate();

    if (!socket || !socket.connected) return <Navigate to="/" />

    const enterLobby = () => {
        if (pass) {
            setModal({ uid: uid, name: name, show: true });
            return;
        }

        socket.emit("request_lobby_enter", uid, null, (error?: string) => {
            if (error) 
                alert(error);
            else {
                navigate(`/room?uid=${uid}`, { replace: true });
                connectionDispatch({ type: "set_room", payload: { uid: uid, name: name, password: null } });
                // TO-DO: implementirati passworde

                // scratch that, passwordModal ce da te ubaci u sobu sa passwordom
            }
        });
    }

    return (
        <div className="lobby-list-object" onClick={enterLobby} style={{animationDelay: `${200 + order * 200}ms`}} >
            <img className="pass-img" src={key} style={{opacity: (pass ? 1 : 0)}} alt="" />
            <label className="name-label">{name}</label>
            <label className="progress-label" style={{color: (inProgress || playerNum >= 4 ? "red" : "green")}}>
                {(inProgress ? "IN PROGRESS" :  (playerNum === 4 ? "FULL" : "OPEN"))}
            </label>
            <div className="player-number">
                <img src={silhouette} alt="" />
                <label>{playerNum}/4</label>
            </div>
        </div>
    )
}
