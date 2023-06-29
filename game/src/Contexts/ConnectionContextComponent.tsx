import { useSocket } from "../Hooks/UseSocket";
import { ConnectionContextProvider, ConnectionReducer, defaultConnectionInfo } from "./ConnectionContext";
import React, { PropsWithChildren, useEffect, useReducer } from "react";

export const ConnectionProvider: React.FC<PropsWithChildren> = ({children}) => { 
    const socket = useSocket('ws://localhost:5050', {
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        autoConnect: false
    });

    const [ConnectionState, ConnectionDispatch] = useReducer(ConnectionReducer, defaultConnectionInfo);

    useEffect(() => {
        ConnectionDispatch({ type: "set_socket", payload: socket })
    }, [socket]);

    return (
        <ConnectionContextProvider value={{ connectionState: ConnectionState, connectionDispatch: ConnectionDispatch }}>
            {children}
        </ConnectionContextProvider>
    )
}