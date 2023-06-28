import { Player } from "../LobbyClasses/Player";
import { Card } from "./Card";

export class GamePlayer extends Player {
    public eliminated = false;
    public handCards: Card[] = []
    public playedCards: Card[] = []

    constructor(socketId: string, name: string) {
        super(socketId, name);
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