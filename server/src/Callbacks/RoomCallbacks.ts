import { Server, Socket } from "socket.io";
import { Player } from "../Classes/LobbyClasses/Player";
import { GamePlayer } from "../Classes/GameClasses/GamePlayer";
import { Lobby } from "../Classes/LobbyClasses/Lobby";
import { Room } from "../Classes/GameClasses/Room";
import { players } from "../socket";

export const roomCallbacks = (socket: Socket, io: Server, p: IRoomParams) => {

    socket.on("disconnect", () => {
        players.delete(socket.id);
        socket.disconnect(true);

        if (!p.lobby) return;

        socket.leave(p.lobby.uid);
        p.lobby.RemovePlayer(socket.id);
        p.player.lobby = null;
        p.lobby = null;

        // room disconnect implementation
    })
}


interface IRoomParams {
    player: Player;
    lobby: Lobby | null;
    gamePlayer: GamePlayer | null;
    room: Room | null;
}