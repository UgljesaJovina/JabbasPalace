import { Socket } from "socket.io";
import { players } from "../socket";

export const playerCallbacks = (socket: Socket) => {
    socket.on("send_name", (name: string) => {
        const player = players.find(p => p.socket === socket);
        player?.setName(name);
    });

    socket.on("disconnect", () => {
        const player = players.find(p => p.socket === socket);

        if (!player) return;

        const index = players.indexOf(player);
        
        players.splice(index, 1);
    });

    
}
