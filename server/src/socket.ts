import { Server as HttpServer } from 'http';
import { Socket, Server } from 'socket.io';
import { Player } from './Player';
// import { v4 } from 'uuid';

export class ServerSocket {
    public static instance: ServerSocket;
    public io: Server;

    /** Master list of all connected players */
    public players: Player[] = [];

    constructor(server: HttpServer) {
        ServerSocket.instance = this;
        this.io = new Server(server, {
            serveClient: false,
            pingInterval: 10000,
            pingTimeout: 5000,
            cookie: false,
            cors: {
                origin: '*'
            }
        });

        this.io.on('connect', this.StartListeners);
    }

    StartListeners = (socket: Socket) => {
        socket.emit("player_list", this.players.map(p => p.Serialize()));
        socket.on("give_name", (name: string) => {
            const player = new Player(socket.id, name);
            if (this.players.length === 0) player.isAdmin = true;
            this.players.push(player);
            this.io.emit("update_player_list", player.Serialize())
        });

        socket.on("disconnect", () => {
            console.log(this.players.map(p => p.Serialize()));
            
            const player = this.GetPlayerFromSocketId(socket.id);

            if (player) {
                this.players.splice(player.index, 1);

                if (!this.players.some(p => p.isAdmin) && this.players.length > 0) {
                    this.players[0].isAdmin = true;
                    this.io.emit("new_admin", this.players[0].socketId);
                } 

                this.io.emit("update_player_list", player.player.Serialize());
            }
        });
    }

    GetPlayerFromSocketId = (id: string) : { player : Player, index: number } | undefined => {
        var ret: { player: Player, index: number } | undefined = undefined;
        this.players.forEach((p, i) => { if (p.socketId === id) ret = { player: p, index: i } });
        return ret;
    }
}