import { v4 } from "uuid";
import { Player } from "./Player";
import { Room } from "../GameClasses/Room";
import { GamePlayer } from "../GameClasses/GamePlayer";

export class Lobby {
    public uid: string;
    public name: string;
    public players: Player[] = [];

    public password: string | null;
    public isOpen = true;
    public inProgress = false;

    public onRemove: () => void;
    public updatePlayerList: (players: Player[]) => void;
    // public updateLobbyAdmin: (lobby: Lobby, player: Player) => void;

    constructor(name: string, player: Player, password: string | null, onRemove: () => void, 
        updatePlayerList: (players: Player[]) => void) 
    {
        this.uid = v4();
        this.name = name;
        this.players.push(player);
        this.password = password;
        this.onRemove = onRemove;
        this.updatePlayerList = updatePlayerList;
        // this.updateLobbyAdmin = updateLobbyAdmin;
    }

    public StartGame = (): Room => {
        this.inProgress = true;
        const room = new Room(this.uid, this.name, []);
        room.players = this.players.map(p => new GamePlayer(p.socket, p.name, room));
        return room;
    }

    public AddPlayer = (player: Player) => {
        this.players.push(player);

        if (this.players.some(p => p.isAdmin)) player.isAdmin = false;
        else player.isAdmin = true;

        this.updatePlayerList(this.players);
        if (this.players.length === 4) this.isOpen = false;
    }

    public RemovePlayer = (playerId: string) => {
        console.log(this.players);
        this.players = this.players.filter(p => p.socket.id !== playerId);
        console.log(this.players);
        this.isOpen = true;
        if (this.players.length === 0) this.onRemove();
        if (!this.players.some(p => p.isAdmin) && this.players.length > 0) this.players[0].isAdmin = true;
        this.updatePlayerList(this.players);
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