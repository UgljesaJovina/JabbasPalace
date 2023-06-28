export class Card {
    public name: string = "card";
    public faction: "Rebbel" | "Palace";

    constructor(faction: "Rebbel" | "Palace") {
        this.faction = faction;
    }

    public Serialize = () : string => {
        return JSON.stringify({ name: this.name, faction: this.faction });
    }
}