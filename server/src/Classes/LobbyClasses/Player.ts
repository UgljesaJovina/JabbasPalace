import { Socket } from "socket.io";

export class Player {
    public socket: Socket;
    public name: string | undefined;
    public isAdmin = false;

    constructor(socket: Socket, name?: string) {
        this.socket = socket;
        this.name = name;
    }

    public setName = (name: string) => {
        this.name = name;
    }
}