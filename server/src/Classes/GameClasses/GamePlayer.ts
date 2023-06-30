import { Socket } from "socket.io";
import { Player } from "../LobbyClasses/Player";
import { Card } from "./Card";
import { Room } from "./Room";

export class GamePlayer extends Player {
    public eliminated = false;
    public handCards: Card[] = [];
    public playedCards: Card[] = [];
    public room: Room;

    constructor(socket: Socket, name: string | undefined, room: Room) {
        super(socket, name);
        this.room = room;
    }

    public Serialize = () : string => {
        return JSON.stringify(
            { 
                ...this, 
                handCards: this.handCards.map(c => c.serialize()), 
                playedCards: this.playedCards.map(c => c.serialize())
            }
        );
    }
}