import { ServerSocket } from "../../socket";
import { delay } from "../../util";
import { Card } from "./Cards/Card";
import { GamePlayer } from "./GamePlayer";

export class Room {
    public uid: string;
    public name: string;

    public deck: Card[] = [];
    public faceDownCard: Card; 
    public players: GamePlayer[];

    get notElimPlayers() {
        return this.players.filter(p => !p.eliminated); 
    }

    get notElimPlayersNum() {
        return this.notElimPlayers.length;
    }

    public lastWinnerInd: number = 0;

    constructor(uid: string, name: string, players: GamePlayer[]) {
        this.uid = uid;
        this.name = name;

        this.deck = this.buildDeck();

        this.faceDownCard = this.deck[0];

        this.players = players;

        this.startRound();
    }

    private buildDeck = (): Card[] => {
        return []; // FIXME: OVO 
    }

    private startRound = async () => {
        this.deck = this.buildDeck();
        let i = this.lastWinnerInd;
        for (; i < this.lastWinnerInd + 4; i++) {
            this.draw(this.players[i % 4]);
            await delay(300);
        }
        this.players.forEach(p => p.eliminated = false);
        this.startGameplayLoop(i);
    }

    private startGameplayLoop = (i: number) => {
        while (this.notElimPlayersNum > 1 && this.deck.length > 0) {
            this.draw(this.notElimPlayers[i % this.notElimPlayersNum]);
        }
    }

    private draw = (player: GamePlayer) => {
        if (this.deck.length <= 0) return;

        const card = this.deck.shift() as Card;
        player.handCards.push(card);

        player.socket.emit("draw_me", player.socket.id, card.name); 
        player.socket.to(this.uid).emit("draw_enemy", player.socket.id); 
    }

    public getPlayerFromId = (id: string): GamePlayer | null => {
        const player = this.players.find(p => p.socket.id === id);
        if (player) return player;
        return null;
    }
}