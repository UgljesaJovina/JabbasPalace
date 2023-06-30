import { Server as HttpServer } from 'http';
import { Socket, Server } from 'socket.io';
import { Lobby } from './Classes/LobbyClasses/Lobby';
import { Player } from './Classes/LobbyClasses/Player';
import { Room } from './Classes/GameClasses/Room';
import { playerCallbacks } from './Callbacks/PlayerCallbacks';
import { lobbyCallbacks } from './Callbacks/LobbyCallbacks';

/** Master list of all available lobbies */
export const lobbies: Lobby[]  = [];

/** Master list of all in-progress games */
export const rooms: Room[] = [];

/** Master list of all connected players */
export const players: Player[]  = [];

export class ServerSocket {
    public static instance: ServerSocket;
    public io: Server;

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
        players.push(new Player(socket));
        playerCallbacks(socket, this.io);
        lobbyCallbacks(socket, this.io);
    }
}
