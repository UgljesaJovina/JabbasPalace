import { useEffect, useState } from "react";
import { useConnectionContext } from "../Contexts/ConnectionContext"
import "../Styles/lobbyListStyle.css"
import { LobbyListObject } from "./LobbyListObject";
import { useNavigate } from "react-router";
import ILobbyListObject from "../Interfaces/ILobbyListObject";
import { RoomPasswordModal } from "./RoomPasswordInput";

type LobbyUpdateActions = "add" | "remove" | "update";

export interface IPassModalParams {
    uid: string;
    name: string;
    show: boolean;
}

export const FindGame = () => {
    const { connectionState: { socket, name } } = useConnectionContext();
    const [lobbies, setLobbies] = useState<ILobbyListObject[]>([]);
    const [passwordModal, setPasswordModal] = useState<IPassModalParams>({ uid: "", name: "", show: false });
    const navigate = useNavigate();

    useEffect(() => {
        if (!name || !socket || !socket.connected) {
            navigate("/", { replace: true });
            return;
        } 

        socket.emit("request_lobbies", (lobbies: ILobbyListObject[]) => {
            setLobbies(lobbies);
        });

        socket.on("update_lobby_list", (lobby: ILobbyListObject, action: LobbyUpdateActions) => {
            switch(action) {
                case "add":
                    setLobbies(curr => [...curr, lobby]);
                    break;
                case "remove":
                    setLobbies(curr => curr.filter(l => l.uid !== lobby.uid));
                    break;
                case "update":
                    setLobbies(curr => curr.map(l => l.uid === lobby.uid ? lobby : l))
                    break;
            }
        });

        return () => {
            socket.removeAllListeners("update_lobby_list");
        }
    }, [socket]);

    return (
        <div className="find-game">
            <div className="info">
                <p>{lobbies.length} available lobbies</p>
                <hr />
            </div>
            <div className="lobby-list">
                {lobbies.map(l => <LobbyListObject key={l.uid} uid={l.uid} name={l.name} 
                    pass={l.pass} inProgress={l.inProgress} playerNum={l.playerNum} setModal={setPasswordModal} />)}
            </div>
            <RoomPasswordModal params={passwordModal} setModal={setPasswordModal} />
        </div>
    )
}