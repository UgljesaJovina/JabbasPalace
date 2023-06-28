import { useSocket } from "../Hooks/UseSocket";
import { SocketContextProvider } from "./SocketContext";

export function SocketProvider(props: any) { 
    const socket = useSocket('ws://localhost:1337', {
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        autoConnect: false
    });

    return (
        <SocketContextProvider value={socket}>
            {props.children}
        </SocketContextProvider>
    )
}