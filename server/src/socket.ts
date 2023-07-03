import { Server as HttpServer } from 'http';
import { Socket, Server } from 'socket.io';
import { Lobby } from './Classes/LobbyClasses/Lobby';
import { Player } from './Classes/LobbyClasses/Player';
import { Room } from './Classes/GameClasses/Room';
import { playerCallbacks } from './Callbacks/PlayerCallbacks';
import { lobbyCallbacks } from './Callbacks/LobbyCallbacks';
import { GamePlayer } from './Classes/GameClasses/GamePlayer';
import { roomCallbacks } from './Callbacks/RoomCallbacks';

/** Master list of all available lobbies */
export const lobbies = new Map<string, Lobby>();

/** Master list of all in-progress games */
export const rooms = new Map<string, Room>();

/** Master list of all connected players */
export const players = new Map<string, Player>();

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

        // const player: Player = new Player(socket);
        // players.set(socket.id, player);
        // let lobby: Lobby | null = null;
        // let gamePlayer: GamePlayer | null = null;
        // let room: Room | null = null;

        // ovo je prethodni kod, razlog za menjanje je to sto 
        // referentni tipovi u c# i js-u ne rade isto,
        // pa ne mogu da uradim lobby = new Lobby() unutar funkcije

        const connParams: IConnectionParams = { player: new Player(socket), gamePlayer: null, lobby: null, room: null };

        players.set(socket.id, connParams.player);

        playerCallbacks(socket, this.io, connParams);
        lobbyCallbacks(socket, this.io, connParams);
        roomCallbacks(socket, this.io, connParams);

        // TO-DO, pogledaj sticky notes
    }
}

export interface IConnectionParams {
    player: Player;
    gamePlayer: GamePlayer | null;
    lobby: Lobby | null;
    room: Room | null;
}