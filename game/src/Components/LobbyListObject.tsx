import { ILobbyListObject } from "./FindGame"
import silhouette from "../Images/silhouette.png"
import key from "../Images/key.png"
import { useConnectionContext } from "../Contexts/ConnectionContext"
import { useEffect } from "react"

export const LobbyListObject: React.FC<ILobbyListObject> = ({ uid, name, players, pass, inProgress }) => {

    const { connectionState: { socket } } = useConnectionContext();

    useEffect(() => {
        if (!socket) return;

        socket.on("enter_room", (/* name, uid, players... */) => {
            // TO-DO
        })
    })

    function enterLobby() {
        if (!socket) return

        socket.emit("request_room_enter", uid)
    }

    return (
        <div className="lobby-list-object" onClick={enterLobby}>
            <img className="pass-img" src={key} style={{opacity: (pass ? 1 : 0)}} />
            <label className="name-label">{name}</label>
            <label className="progress-label" style={{color: (inProgress ? "red" : "green")}}>
                {(inProgress ? "IN PROGRESS" : "OPEN")}
            </label>
            <div className="player-number">
                <img src={silhouette} />
                <label>{players}/4</label>
            </div>
        </div>
    )
}
