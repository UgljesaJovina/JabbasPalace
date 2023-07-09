import { GamePlayer } from "../GamePlayer";
import { Card } from "./Card";

export class HanSolo extends Card {
    constructor() {
        super("Han Solo", 0, "Rebbel");
    }

    public play = async (player: GamePlayer): Promise<void> =>  {
        
    }
}