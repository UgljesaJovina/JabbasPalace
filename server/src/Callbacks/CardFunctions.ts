import { Socket } from "socket.io";
import { Room } from "../Classes/GameClasses/Room";
import { GamePlayer } from "../Classes/GameClasses/GamePlayer";
import { Card } from "../Classes/GameClasses/Cards/Card";
import { ServerSocket } from "../socket";

export const targetPlayer = async (player: GamePlayer, room: Room) => {
    return new Promise<GamePlayer>((resolve, reject) => {
        player.socket.emit("request_player_target", (targetId: string) => {
            const t = room.getPlayerFromId(targetId);

            if (t) {
                ServerSocket.io.to(room.uid).emit("target_player", targetId);
                resolve(t);
            } 
            else reject(null);

        });
    });
};

export const targetPlayerOrCard = async (player: GamePlayer, room: Room) => {
    return new Promise<GamePlayer | Card>((resolve, reject) => {
        player.socket.emit("request_player_card_target", (targetId: string) => {
            if (targetId === "card") {
                resolve(room.faceDownCard);
                return;
            }
            const t = room.getPlayerFromId(targetId);
            
            if (t) {
                ServerSocket.io.to(room.uid).emit("target_player_card", targetId);
                resolve(t);
            }
            else reject(null);
        })
    });
};

export const selectCardPower = async (player: GamePlayer, room: Room) => {
    return new Promise<number>(resolve => {
        player.socket.emit("request_card_power", (power: number) => {
            ServerSocket.io.to(room.uid).emit("selected_power", power);
            resolve(power);
        })
    });
};