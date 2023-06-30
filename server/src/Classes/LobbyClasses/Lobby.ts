import { v4 } from "uuid";
import { Player } from "./Player";
import { Room } from "../GameClasses/Room";
import { GamePlayer } from "../GameClasses/GamePlayer";

export class Lobby {
    public uid: string;
    public name: string;
    public players: Player[] = [];

    public password: string | undefined;
    public isOpen = true;
    public inProgress = false;

    constructor(name: string, player: Player, password?: string) {
        this.uid = v4();
        this.name = name;
        this.players.push(player);
        this.password = password;
    }

    public StartGame = (): Room => {
        this.inProgress = true;
        const room = new Room(this.uid, this.name, []);
        room.players = this.players.map(p => new GamePlayer(p.socket, p.name, room));
        return room;
    }

    public AddPlayer = (player: Player) => {
        this.players.push(player);
        if (this.players.length === 4) this.isOpen = false;
    }

    public RemovePlayer = (playerId: string) => {
        this.players = this.players.filter(p => p.socket.id !== playerId);
        this.isOpen = true;
    }

    public Serialize = () => {
        return { 
            uid: this.uid, 
            name: this.name, 
            playerNum: this.players.length, 
            pass: (this.password ? true : false),
            inProgress: this.inProgress
        }
    }
}