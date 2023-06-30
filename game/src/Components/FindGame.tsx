import { useEffect, useState } from "react";
import { useConnectionContext } from "../Contexts/ConnectionContext"
import "../Styles/lobbyListStyle.css"
import { LobbyListObject } from "./LobbyListObject";
import { useNavigate } from "react-router";

export interface ILobbyListObject {
    uid: string;
    name: string;
    players: number;
    pass: boolean;
    inProgress: boolean;
}

export const FindGame = () => {
    const { connectionState: {socket, name}, connectionDispatch } = useConnectionContext();
    const [lobbies, setLobbies] = useState<ILobbyListObject[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!socket) return;
        // if (!name) navigate("/", { replace: true });

        socket.emit("request_lobbies");
        socket.on("send_lobbies", (lobbies: ILobbyListObject[]) => {
            setLobbies(lobbies);
        });
    }, []);

    return (
        <div className="find-game">
            <div className="info">
                <p>{lobbies.length} available lobbies</p>
                <hr />
            </div>
            <div className="lobby-list">
                <LobbyListObject uid="asd" name="Epic lobaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaby thing" pass inProgress players={3} />
                <LobbyListObject uid="asd" name="Epic lobby thing" pass={false} inProgress players={3} />
                <LobbyListObject uid="asd" name="Epic lobby thing" pass={false} inProgress players={3} />
                <LobbyListObject uid="asd" name="Epic lobby thing" pass={true} inProgress={false} players={3} />
                <LobbyListObject uid="asd" name="Epic lobby thing" pass={true} inProgress={false} players={3} />
                <LobbyListObject uid="asd" name="Epic lobby thing" pass={true} inProgress={false} players={3} />
                <LobbyListObject uid="asd" name="Epic lobby thing" pass={true} inProgress={false} players={3} />
                <LobbyListObject uid="asd" name="Epic lobby thing" pass={false} inProgress players={3} />
                <LobbyListObject uid="asd" name="Epic lobby thing" pass={false} inProgress players={3} />
                <LobbyListObject uid="asd" name="Epic lobby thing" pass={false} inProgress players={3} />
                <LobbyListObject uid="asd" name="Epic lobby thing" pass={false} inProgress players={3} />
                <LobbyListObject uid="asd" name="Epic lobby thing" pass={false} inProgress players={3} />
                <LobbyListObject uid="asd" name="Epic lobby thing" pass={false} inProgress players={3} />
                <LobbyListObject uid="asd" name="Epic lobby thing" pass={false} inProgress players={3} />
                <LobbyListObject uid="asd" name="Epic lobby thing" pass={false} inProgress players={3} />
                <LobbyListObject uid="asd" name="Epic lobby thing" pass={false} inProgress players={3} />
                <LobbyListObject uid="asd" name="Epic lobby thing" pass={false} inProgress players={3} />
                <LobbyListObject uid="asd" name="Epic lobby thing" pass={false} inProgress players={3} />
                <LobbyListObject uid="asd" name="Epic lobby thing" pass={false} inProgress players={3} />
                <LobbyListObject uid="asd" name="Epic lobby thing" pass={false} inProgress players={3} />
                <LobbyListObject uid="asd" name="Epic lobby thing" pass={false} inProgress players={3} />
                <LobbyListObject uid="asd" name="Epic lobby thing" pass={false} inProgress players={3} />
                <LobbyListObject uid="asd" name="Epic lobby thing" pass={false} inProgress players={3} />
                <LobbyListObject uid="asd" name="Epic lobby thing" pass={false} inProgress players={3} />
                <LobbyListObject uid="asd" name="Epic lobby thing" pass={false} inProgress players={3} />
                <LobbyListObject uid="asd" name="Epic lobby thing" pass={false} inProgress players={3} />
                <LobbyListObject uid="asd" name="Epic lobby thing" pass={false} inProgress players={3} />
                {lobbies.map(l => <LobbyListObject key={l.uid} 
                    uid={l.uid} name={l.name} pass={l.pass} inProgress={l.inProgress} players={l.players} />)}
            </div>
        </div>
    )
}