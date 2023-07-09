import { selectCardPower, targetPlayer } from "../../../Callbacks/CardFunctions";
import { ServerSocket } from "../../../socket";
import { GamePlayer } from "../GamePlayer";
import { Card } from "./Card";

export class Guard extends Card {

    constructor() {
        super("Guard", 1, "Palace");
    }

    public play = async (player: GamePlayer) : Promise<void> => {
        try {
            const target = await targetPlayer(player, player.room);
            const power = await selectCardPower(player, player.room);

            if (target.handCards[0].power === power) {
                target.eliminated = true;
                ServerSocket.io.to(player.room.uid).emit("eliminate", target.socket.id);
            }
        } catch (error) {
            player.socket.emit("error_player_select");
        }
    }
}
