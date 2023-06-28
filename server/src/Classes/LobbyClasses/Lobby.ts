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

    public StartGame = (): Room | null => {
        if (this.players.length != 4) return null;
        this.inProgress = true;
        return new Room(this.uid, this.name, this.players.map(p => new GamePlayer(p.socketId, p.name)));
    }

    public AddPlayer = (player: Player) => {
        this.players.push(player);
        if (this.players.length === 4) this.isOpen = false;
    }

    public RemovePlayer = (playerId: string) => {
        this.players = this.players.filter(p => p.socketId !== playerId);
        this.isOpen = true;
    }
}