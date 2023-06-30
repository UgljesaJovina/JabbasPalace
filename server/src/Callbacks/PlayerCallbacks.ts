import { Server, Socket } from "socket.io";
import { players } from "../socket";

export const playerCallbacks = (socket: Socket, io: Server) => {
    socket.on("send_name", (name: string, approve: () => void) => {
        const player = players.find(p => p.socket === socket);
        player?.setName(name);
        approve(); 
        // ovaj metod ce se pozvati na client strani da bi mu dao doznanja da je event primljen
        // otprilike ekvivalenta req-res patterna http-a
    });

    socket.on("disconnect", () => {
        const player = players.find(p => p.socket === socket);
        
        if (!player) return;

        const index = players.indexOf(player);
        
        players.splice(index, 1);
    });

    
}
