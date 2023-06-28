import { Card } from "./Card";
import { GamePlayer } from "./GamePlayer";

export class Room {
    public uid: string;
    public name: string;

    public deck: Card[] = [];
    public players: GamePlayer[];

    constructor(uid: string, name: string, players: GamePlayer[]) {
        this.uid = uid;
        this.name = name;
        this.players = players;
    }
}