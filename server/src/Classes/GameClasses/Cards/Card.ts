import { GamePlayer } from "../GamePlayer";

export abstract class Card {
    public name: string;
    public power: number;
    public faction: "Rebbel" | "Palace";
    
    constructor(name: string, power: number, faction: "Rebbel" | "Palace") {
        this.name = name;
        this.power = power;
        this.faction = faction;
    }

    public abstract play(player: GamePlayer): Promise<void>;

    public Serialize = () => {
        return this.name;
    }
}