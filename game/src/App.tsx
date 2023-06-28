import React, { useEffect, useRef } from 'react';
import { Socket, io } from 'socket.io-client';
import { Player } from './Interfaces/Player';

function App() {

    const { current: socket } = useRef(io("ws://localhost:5050"));
    let myPlayer: Player;
    let allPlayers: Player[];

    useEffect(() => {
        socket.connect();

        socket.on("player_list", (players: Player[]) => {
            allPlayers = players;
        });

        socket.emit("give_name", prompt("What will be your name?"));

        socket.on("update_player_list", (data: string) => {
            const player: Player = JSON.parse(data);
            console.log(`A NEWWW CHALLENGERR! ${player.name} ${player.socketId}`);
            allPlayers.push(player);
            if (!myPlayer && player.socketId === socket.id) myPlayer = player;
        });

        return () => {
            if(socket){
                socket.close();
            }
        }
    }, [socket])

    return (
        <div>
            
        </div>
    );
}

export default App;
