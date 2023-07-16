import { useEffect, useState } from "react";
import { useConnectionContext } from "../Contexts/ConnectionContext"
import { useNavigate } from "react-router";

interface IGamePlayer {
    socketId: string;
    name: string;
    handCards: string[];
    playedCards: string[];
    eliminated: boolean;
    winTokens: number;
}

export const Game = () => {
    const [allPlayers, setAllPlayers] = useState<IGamePlayer[]>([]);
    const { connectionState: { name, socket } } = useConnectionContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!name || !socket) {
            navigate("/", { replace: true });
            return;
        }

        socket.emit("request_player_info", (players: IGamePlayer[]) => {
            setAllPlayers(players);
            console.log(players);
        })

        socket.on("player_turn", (socketId: string) => {
            
        });
    }, [])

    return (<div></div>)
}