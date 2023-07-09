import { Socket } from "socket.io";
import { Player } from "../LobbyClasses/Player";
import { Card } from "./Cards/Card";
import { Room } from "./Room";

export class GamePlayer extends Player {
    public eliminated = false;
    public handCards: Card[] = [];
    public playedCards: Card[] = [];
    public room: Room;
    public winTokens: number = 0;

    constructor(socket: Socket, name: string | undefined, room: Room) {
        super(socket, name);
        this.room = room;
    }

    public static getFromPlayer = (player: Player, room: Room) => {
        return new GamePlayer(player.socket, player.name, room);
    }

    public playCard = () => {
        this.socket.emit("request_card_index")
    }

    // public Serialize = () => {
    //     return
    //         { 
    //             ...this, 
    //             handCards: this.handCards.map(c => c.serialize()), 
    //             playedCards: this.playedCards.map(c => c.serialize())
    //         }
    //     ;
    // }
}