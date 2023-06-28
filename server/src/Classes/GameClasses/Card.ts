import { Player } from "../LobbyClasses/Player";

export abstract class Card {
    public name: string = "card";
    public faction: "Rebbel" | "Palace";

    constructor(faction: "Rebbel" | "Palace") {
        this.faction = faction;
    }

    public serialize = () : string => {
        return JSON.stringify({ name: this.name, faction: this.faction });
    }

    public abstract playCard(player: Player, targetPlayer: Player | null, card?: Card): void;
}