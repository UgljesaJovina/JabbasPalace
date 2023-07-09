import { Server, Socket } from "socket.io";
import { players } from "../socket";
import { Player } from "../Classes/LobbyClasses/Player";

export const playerCallbacks = (socket: Socket, p: IPlayerParams) => { // p = params
    socket.on("send_name", (name: string, approve: () => void) => {
        p.player.setName(name);
        approve();
        // ovaj metod ce se pozvati na client strani da bi mu dao doznanja da je event primljen
        // otprilike ekvivalenta req-res patterna http-a
    });

    // socket.on("disconnect", () => {
        // const player = players.find(p => p.socket === socket);
        
        // if (!player) return;

        // ovde nece biti on disconnect event, bice u RoomCallbacks-u

    // });
}

interface IPlayerParams {
    player: Player;
}