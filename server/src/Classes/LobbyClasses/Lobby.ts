import { v4 } from "uuid";
import { Player } from "./Player";
import { Room } from "../GameClasses/Room";
import { GamePlayer } from "../GameClasses/GamePlayer";
import { ILobbyPlayer, UpdateActions } from "../../Callbacks/LobbyCallbacks";

export class Lobby {
    public uid: string;
    public name: string;
    public players: Player[] = [];
    public admin: Player;

    public password: string | null;
    public isOpen = true;
    public inProgress = false;
    public room: Room | null = null;

    public onRemove: (lobby: Lobby) => void;
    public updatePlayerList: (player: ILobbyPlayer, action: UpdateActions, lobby: Lobby) => void;
    // public updateLobbyAdmin: (lobby: Lobby, player: Player) => void;

    constructor(name: string, player: Player, password: string | null, onRemove: (lobby: Lobby) => void, 
        updatePlayerList: (player: ILobbyPlayer, action: UpdateActions, lobby: Lobby) => void) 
    {
        this.uid = v4();
        this.name = name;
        this.players.push(player);
        this.admin = player;
        this.password = password;
        this.onRemove = onRemove;
        this.updatePlayerList = updatePlayerList;
        // this.updateLobbyAdmin = updateLobbyAdmin;
    }

    public StartGame = (): Room => {
        this.inProgress = true;
        const room = new Room(this.uid, this.name, this.players);
        this.room = room;
        return room;
    }

    public AddPlayer = (player: Player) => {
        if (this.players.includes(player)) return;
        // mora da stoji zbog cudnog slucaja kada server ne detektuje da je igrac izasao
        // i onda krene da stackuje instance istog igraca ???

        this.players.push(player);

        this.updatePlayerList(player.Serialize(), "add", this);
        if (this.players.length === 4) this.isOpen = false;
    }

    public RemovePlayer = (playerId: string) => {
        const player = this.players.find(p => p.socket.id === playerId) as Player;
        this.players = this.players.filter(p => p.socket.id !== playerId);
        this.isOpen = true;

        if (this.players.length === 0) this.onRemove(this);

        if (!this.players.some(p => p === this.admin) && this.players.length > 0) {
            this.admin = this.players[0];
            this.updatePlayerList(this.admin.Serialize(), "update", this);
        }

        this.updatePlayerList(player.Serialize(), "remove", this);
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