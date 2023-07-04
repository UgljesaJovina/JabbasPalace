import { Socket } from "socket.io";
import { Lobby } from "./Lobby";

export class Player {
    public socket: Socket;
    public name: string | undefined;
    public lobby: Lobby | null; // lobby the player is currently in

    constructor(socket: Socket, name?: string) {
        this.socket = socket;
        this.name = name;
        this.lobby = null;
    }

    public setName = (name: string) => {
        this.name = name;
    }

    public Serialize = () => {
        return { socketId: this.socket.id, name: this.name as string, isAdmin: this.lobby?.admin === this };
    }
}