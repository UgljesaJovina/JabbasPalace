import silhouette from "../Images/silhouette.png"
import key from "../Images/key.png"
import { useConnectionContext } from "../Contexts/ConnectionContext"
import { useNavigate } from "react-router";
import ILobbyListObject from "../Interfaces/ILobbyListObject";

export const LobbyListObject: React.FC<ILobbyListObject> = ({ uid, name, playerNum, pass, inProgress }) => {

    const { connectionState: { socket }, connectionDispatch } = useConnectionContext();
    const navigate = useNavigate();

    if (!socket) {
        navigate("/", { replace: true });
        return (<div></div>);
    }

    function enterLobby() {
        if (!socket) return;

        socket.emit("request_lobby_enter", uid, null, (error?: string) => {
            if (error) 
                alert(error);
            else {
                navigate(`/room?uid=${uid}`, { replace: true });
                connectionDispatch({ type: "set_room", payload: { uid: uid, name: name, password: null } });
                // TO-DO: implementirati passworde
            }
        });
    }

    return (
        <div className="lobby-list-object" onClick={enterLobby}>
            <img className="pass-img" src={key} style={{opacity: (pass ? 1 : 0)}} alt="" />
            <label className="name-label">{name}</label>
            <label className="progress-label" style={{color: (inProgress ? "red" : "green")}}>
                {(inProgress ? "IN PROGRESS" : "OPEN")}
            </label>
            <div className="player-number">
                <img src={silhouette} alt="" />
                <label>{playerNum}/4</label>
            </div>
        </div>
    )
}
