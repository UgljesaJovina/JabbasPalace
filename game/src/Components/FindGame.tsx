import { useEffect, useState } from "react";
import { useConnectionContext } from "../Contexts/ConnectionContext"
import "../Styles/lobbyListStyle.css"
import { LobbyListObject } from "./LobbyListObject";
import { useNavigate } from "react-router";
import ILobbyListObject from "../Interfaces/ILobbyListObject";

type LobbyUpdateActions = "add" | "remove" | "update";

export const FindGame = () => {
    const { connectionState: { socket, name } } = useConnectionContext();
    const [lobbies, setLobbies] = useState<ILobbyListObject[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!socket) return;
        if (!name) navigate("/", { replace: true });

        socket.emit("request_lobbies", (lobbies: ILobbyListObject[]) => {
            console.log("Got lobbies", lobbies);
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
            socket.removeAllListeners();
        }
    }, [socket]);

    return (
        <div className="find-game">
            <div className="info">
                <p>{lobbies.length} available lobbies</p>
                <hr />
            </div>
            <div className="lobby-list">
                {lobbies.map(l => <LobbyListObject key={l.uid} 
                    uid={l.uid} name={l.name} pass={l.pass} inProgress={l.inProgress} playerNum={l.playerNum} />)}
            </div>
        </div>
    )
}