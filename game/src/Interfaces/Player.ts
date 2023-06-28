import { Card } from "./Card";

export interface Player {
    socketId: string;
    name: string;
    isAdmin: boolean;
}