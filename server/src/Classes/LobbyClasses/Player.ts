import { Socket } from "socket.io";
import { Lobby } from "./Lobby";

export class Player {
    public socket: Socket;
    public name: string | undefined;
    public isAdmin = false;
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
        return { id: this.socket.id, name: this.name, isAdmin: this.isAdmin };
    }
}