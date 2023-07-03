import { Server, Socket } from "socket.io";
import { lobbies, players } from "../socket";
import { Lobby } from "../Classes/LobbyClasses/Lobby";
import { Player } from "../Classes/LobbyClasses/Player";

type LobbyUpdateActions = "add" | "remove" | "update";

export const lobbyCallbacks = (socket: Socket, io: Server, p: ILobbyParams) => {
    const updateLobbyList = (action: LobbyUpdateActions) => {
        console.log("updating lobbies")
        if (!p.lobby) return;
        console.log("success", p.lobby.Serialize(), action)
        io.emit("update_lobby_list", p.lobby.Serialize(), action);
    }

    const removeLobby = () => {
        if (!p.lobby) return;
        if (lobbies.delete(p.lobby.uid)) 
            updateLobbyList("remove");
    }

    const updatePlayerList = (players: Player[]) => {
        if (!p.lobby) return;
        io.to(p.lobby.uid).emit("update_player_list", players.map(p => p.Serialize()));
        updateLobbyList("update");
    }

    // const updateLobbyAdmin = (_lobby: Lobby, _player: Player) => {
    //     console.log(`Update p.lobby admin: ${p.lobby === _lobby}`)
        
    //     io.to(_lobby.uid).emit("update")
    // }
    // potencijalno nije potrebno zato sto ce updatePlayerList vec poslati admina novog

    const leaveLobby = () => {
        if (!p.lobby) return;

        socket.leave(p.lobby.uid);
        p.lobby.RemovePlayer(socket.id);
        p.player.lobby = null;
        p.lobby = null;
    };

    socket.on("request_lobbies", (callback: ((lobbies: { /*svi params l.Serialize - mrzi me*/ }[]) => void)) => {
        callback([...lobbies.values()].map(l => l.Serialize()));
    });

    socket.on("create_lobby", (name: string, pass: string | null, approve: (uid: string) => void) => {
        p.lobby = new Lobby(name, p.player, pass, removeLobby, updatePlayerList);
        p.player.lobby = p.lobby;
        lobbies.set(p.lobby.uid, p.lobby);
        approve(p.lobby.uid);
        socket.join(p.lobby.uid);
        updateLobbyList("add");
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

        p.lobby = l;
        p.player.lobby = l;
        l.AddPlayer(p.player);
        result();
    });

    socket.on("leave_lobby", leaveLobby);
}

interface ILobbyParams {
    player: Player;
    lobby: Lobby | null;
}