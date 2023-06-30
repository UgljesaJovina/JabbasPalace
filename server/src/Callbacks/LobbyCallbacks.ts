import { Server, Socket } from "socket.io";
import { lobbies, players } from "../socket";
import { Lobby } from "../Classes/LobbyClasses/Lobby";

export const lobbyCallbacks = (socket: Socket, io: Server) => {
    const updateLobbyList = (lobby: Lobby) => {
        io.emit("update_lobby_list", lobby.Serialize());
    }

    socket.on("request_lobbies", () => {
        socket.emit("send_lobbies", lobbies.map(l => l.Serialize()));
    });

    socket.on("create_lobby", (name: string, pass: string | undefined, approve: (uid: string) => void) => {
        const player = players.find(p => p.socket === socket);
        if (!player) return;

        const lobby = new Lobby(name, player, pass);
        player.lobby = lobby;
        lobbies.push(lobby);
        approve(lobby.uid);
        updateLobbyList(lobby);
    });
}