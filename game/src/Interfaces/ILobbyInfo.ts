export interface ILobbyInfo {
    uid: string;
    name: string;
    players: {
        name: string,
        isAdmin: boolean
    }
}