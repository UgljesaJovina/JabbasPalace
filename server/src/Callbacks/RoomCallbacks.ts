import { Server, Socket } from "socket.io";
import { Player } from "../Classes/LobbyClasses/Player";
import { GamePlayer } from "../Classes/GameClasses/GamePlayer";
import { Lobby } from "../Classes/LobbyClasses/Lobby";
import { Room } from "../Classes/GameClasses/Room";
import { ServerSocket, players } from "../socket";

export const roomCallbacks = (socket: Socket, p: IRoomParams) => {

    socket.on("request-start-game", (response: (error?: string) => void) => {
        if (p.lobby?.admin !== p.player) { 
            response("ure not the admin BAAAAAAAKAAAAAAA!");
            return;
        }

        if (p.lobby.players.length < 4) {
            response("not enough players BAAAAAAAKAAAAAAA");
            return;
        }

        p.lobby.StartGame();
        ServerSocket.io.to(p.lobby.uid).emit("start-game");
    });

    socket.on("set-game-params", () => {
        if (!p.lobby) return;

        p.room = p.lobby.room as Room;
        p.gamePlayer = p.room.players.find(gp => gp.socket === p.player.socket) as GamePlayer;
    });

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