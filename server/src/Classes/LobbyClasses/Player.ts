export class Player {
    public socketId: string;
    public name: string;
    public isAdmin = false;

    constructor(socketId: string, name: string) {
        this.socketId = socketId;
        this.name = name;
    }
}