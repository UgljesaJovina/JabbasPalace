import { useNavigate } from "react-router";
import { useConnectionContext } from "../Contexts/ConnectionContext";
import { useEffect, useState } from "react";
import { IPlayer } from "../Interfaces/IPlayer";
import { PlayerCard } from "./PlayerCard";
import "../Styles/lobbyStyle.css"
import { WaitingCard } from "./WaitingCard";
import { BackButton } from "./BackButton";

type PlayerUpdateActions = "add" | "remove" | "update";

export const Lobby = () => {
    const [players, setPlayers] = useState<IPlayer[]>([]);
    const { connectionState: { name, socket, lobby }, connectionDispatch } = useConnectionContext();
    const navigate = useNavigate();
    const startGameStyle = {
        opacity: (players.length < 4 ? .5 : 1), 
        cursor: (players.length < 4 ? "auto" : "pointer" )
    };

    useEffect(() => {
        if (!name || !socket || !socket.connected || !lobby) {
            navigate("/", { replace: true });
            return;
        }

        socket!.emit("request_player_data", (players: IPlayer[]) => {
            setPlayers(players);
        });

        socket!.on("update_player_list", (player: IPlayer, action: PlayerUpdateActions) => {
            switch(action) {
                case "add":
                    setPlayers(curr => [...curr, player]);
                    break;
                case "remove":
                    setPlayers(curr => curr.filter(p => p.socketId !== player.socketId));
                    break;
                case "update":
                    setPlayers(curr => curr.map(p => p.socketId === player.socketId ? player : p))
                    break;
            }
        });

        socket.on("start-game", () => {
            socket.emit("set-game-params");
            navigate("/game", { replace: true });
        });

        return () => { 
            socket!.removeAllListeners("update_player_list")
            socket.removeAllListeners("start-game");
            
            connectionDispatch({ type:"set_room", payload: null });
            socket.emit("leave_lobby");
        };

    }, []);

    const startGame = () => {
        if (players.length < 4 || !socket || !lobby) return;

        socket.emit("request-start-game", (error?: string) => {
            if (error) alert(error)
        })
    }

    return (
        <div className="lobby">
            <BackButton location="/game-type" />
            <label className="lobby-name">{lobby?.name}</label>
            <hr />
            {players.map(p => <PlayerCard key={p.socketId} name={p.name} isAdmin={p.isAdmin} />)}
            {/* Ovde cu da pocinim kriminal protiv covecanstva, ali me iskreno jako smara da ovo sad radim
                problem koji ce da resi buduci ja, mozda */}
            {Array.from({length: 4 - players.length}, (_, index) => index).map(val => <WaitingCard key={val} />)}
            {
                players.find(p => p.isAdmin)?.socketId === socket?.id // provera da li sam ja admin 
                && 
                <button className="start-game" style={startGameStyle} onClick={startGame}>Start Game</button>
            }
        </div>
    );
}