import { Server, Socket } from "socket.io";
import { lobbies, players } from "../socket";
import { Lobby } from "../Classes/LobbyClasses/Lobby";
import { Player } from "../Classes/LobbyClasses/Player";

export type UpdateActions = "add" | "remove" | "update";

export const lobbyCallbacks = (socket: Socket, io: Server, p: ILobbyParams) => {

    // hteo sam da callback-ove radim bez lobby parametra vec da uzimam p.lobby
    // oversight: p.lobby se odnosi samo na lobby u kom se nalazi osoba koja je lobby kreirala
    // cim izadje ili ode u drugi lobby, sve se sjebe posto p.lobby postane null

    const updateLobbyList = (lobby: Lobby, action: UpdateActions) => {
        io.emit("update_lobby_list", lobby.Serialize(), action);
    }

    const removeLobby = (lobby: Lobby) => {
        if (lobbies.delete(lobby.uid)) 
            updateLobbyList(lobby, "remove");
    }

    const updatePlayerList = (player: ILobbyPlayer, action: UpdateActions, lobby: Lobby) => {
        io.to(lobby.uid).emit("update_player_list", player, action);
        updateLobbyList(lobby, "update");
    }

    // const updateLobbyAdmin = (_lobby: Lobby, _player: Player) => {
    //     console.log(`Update p.lobby admin: ${p.lobby === _lobby}`)
        
    //     io.to(_lobby.uid).emit("update")
    // }
    // potencijalno nije potrebno zato sto ce updatePlayerList vec poslati admina novog
    
        socket.on("create_lobby", (name: string, pass: string | null, approve: (uid: string) => void) => {
            p.lobby = new Lobby(name, p.player, pass, removeLobby, updatePlayerList);
            p.player.lobby = p.lobby;
            lobbies.set(p.lobby.uid, p.lobby);
            approve(p.lobby.uid);
            socket.join(p.lobby.uid);
            updateLobbyList(p.lobby, "add");
        });

    socket.on("request_lobbies", (callback: ((lobbies: { /*svi params l.Serialize - mrzi me*/ }[]) => void)) => {
        callback([...lobbies.values()].map(l => l.Serialize()));
    });

    socket.on("request_lobby_enter", (uid: string, pass: string | null, result: (error?: string) => void) => {
        if (!lobbies.has(uid)) {
            result("no room with that id exists");
            return;
        }

        const l: Lobby = lobbies.get(uid) as Lobby;

        if (l.password && pass) {
            if (l.password !== pass) {
                result("wrong password!!!");
                return;
            }
        }

        if (!l.isOpen) {
            result("lobby is full!");
            return;
        }

        p.lobby = l;
        p.player.lobby = l;
        l.AddPlayer(p.player);
        socket.join(uid);
        result();
    });

    socket.on("leave_lobby", () => {
        if (!p.lobby) return;

        socket.leave(p.lobby.uid);
        p.lobby.RemovePlayer(socket.id);
        p.player.lobby = null;
        p.lobby = null;
    });

    socket.on("request_player_data", (callback: (players: ILobbyPlayer[]) => void) => {
        if (!p.lobby) return;

        callback(p.lobby.players.map(p => p.Serialize()));
    })
}

interface ILobbyParams {
    player: Player;
    lobby: Lobby | null;
}

export interface ILobbyPlayer {
    socketId: string;
    name: string;
    isAdmin: boolean;
}