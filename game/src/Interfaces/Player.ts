import { Card } from "./Card";

export interface Player {
    socketId: string;
    name: string;

    eliminated: boolean;
    isAdmin: boolean;

    handCards: Card[];
    playedCards: Card[];
    
    // otherPlayers: Player[];
}