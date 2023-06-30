import { ILobbyListObject } from "./FindGame"
import silhouette from "../Images/silhouette.png"
import key from "../Images/key.png"

export const LobbyListObject: React.FC<ILobbyListObject> = ({ uid, name, players, pass, inProgress }) => {
    return (
        <div className="lobby-list-object">
            <img className="pass-img" src={key} style={{opacity: (pass ? 1 : 0)}} />
            <label className="name-label">{name}</label>
            <label className="progress-label">{(inProgress ? "in progress" : "waiting")}</label>
            <div className="player-number">
                <img src={silhouette} />
                <label>{players}/4</label>
            </div>
        </div>
    )
}
