import { Socket } from "socket.io";
import { Player } from "../LobbyClasses/Player";
import { Card } from "./Cards/Card";
import { Room } from "./Room";
import { ServerSocket } from "../../socket";

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

    public playCard = async () => {
        return new Promise<(player: GamePlayer) => Promise<void>>((resolve, reject) => {
            this.socket.emit("request_card_index", (index: number) => {
                if (index >= this.handCards.length) {
                    this.socket.emit("error_card_select");
                    reject();
                    return;
                }
                ServerSocket.io.to(this.room.uid).emit("play", this.socket.id, this.handCards[index].name);
                resolve(this.handCards[index].play);
            })
        })
    }

    public playerInfo = () => {
        return {
            socketId: this.socket.id,
            name: this.name,
            handCards: [],
            playedCards: [],
            eliminated: false,
            winTokens: 0
        };
    }
}