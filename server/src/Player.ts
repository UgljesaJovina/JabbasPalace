import { Card } from "./Card";

export class Player {
    public socketId: string;
    public name: string;

    public eliminated = false;
    public isAdmin = false;
    public handCards: Card[] = []
    public playedCards: Card[] = []

    constructor(socketId: string, name: string) {
        this.socketId = socketId;
        this.name = name;
    }

    public Serialize = () : string => {
        return JSON.stringify(
            { 
                ...this, 
                handCards: this.handCards.map(c => c.Serialize()), 
                playedCards: this.playedCards.map(c => c.Serialize())
            }
        );
    }
}