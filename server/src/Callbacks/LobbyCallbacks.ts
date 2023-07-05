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
    
        socket.on("create_lobby", (name: string, pass: string | null, response: (uid: string) => void) => {
            p.lobby = new Lobby(name, p.player, pass, removeLobby, updatePlayerList);
            p.player.lobby = p.lobby;
            lobbies.set(p.lobby.uid, p.lobby);
            response(p.lobby.uid);
            socket.join(p.lobby.uid);
            updateLobbyList(p.lobby, "add");
        });

    socket.on("request_lobbies", (callback: ((lobbies: { /*svi params l.Serialize - mrzi me*/ }[]) => void)) => {
        callback([...lobbies.values()].map(l => l.Serialize()));
    });

    socket.on("request_lobby_enter", (uid: string, pass: string | null, response: (error?: string) => void) => {
        if (!lobbies.has(uid)) {
            response("no room with that id exists");
            return;
        }

        const l: Lobby = lobbies.get(uid) as Lobby;

        if (l.password && pass) {
            if (l.password !== pass) {
                response("wrong password!!!");
                return;
            }
        }

        if (!l.isOpen) {
            response("lobby is full!");
            return;
        }

        p.lobby = l;
        p.player.lobby = l;
        l.AddPlayer(p.player);
        socket.join(uid);
        response();
    });

    socket.on("leave_lobby", () => {
        if (!p.lobby) return;

        socket.leave(p.lobby.uid);
        p.lobby.RemovePlayer(socket.id);
        p.player.lobby = null;
        p.lobby = null;
    });

    socket.on("request_player_data", (response: (players: ILobbyPlayer[]) => void) => {
        if (!p.lobby) return;

        response(p.lobby.players.map(p => p.Serialize()));
    });

    socket.on("request-start-game", (response: (error?: string) => void) => {
        if (p.lobby?.admin !== p.player) { 
            response("ure not the admin BAAAAAAAKAAAAAAA!");
            return;
        }

        io.to(p.lobby.uid).emit("start-game");
        p.lobby.StartGame();
    });
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