import { createContext, useContext } from "react";
import { Socket } from "socket.io-client";
import { Dispatch } from 'react';
import { IRoom } from "../Interfaces/IRoom";

export interface IConnectionInfo {
    socket: Socket | null;
    name: string | null;
    lobby: IRoom | null;
}

export const defaultConnectionInfo: IConnectionInfo = {
    socket: null,
    name: null,
    lobby: null
}

export type TConnectionContextActions = "set_socket" | "set_name" | "set_room";
export type TConnectionContextPayload = Socket | string | IRoom;

export interface IConnectionContextActions {
    type: TConnectionContextActions,
    payload: TConnectionContextPayload
}

export interface IConnectionContextParams {
    connectionState: IConnectionInfo,
    connectionDispatch: Dispatch<IConnectionContextActions>
}

export const ConnectionReducer = (state: IConnectionInfo, action: IConnectionContextActions): IConnectionInfo => {
    switch (action.type) {
        case "set_name":
            return { ...state, name: action.payload as string };
        case "set_socket":
            return { ...state, socket: action.payload as Socket };
        case "set_room":
            return { ...state, lobby: action.payload as IRoom }
        default:
            return state;
    }
}

const ConnectionContext = createContext<IConnectionContextParams>
    ({ connectionState: defaultConnectionInfo, connectionDispatch: () => { } });

export const ConnectionContextProvider = ConnectionContext.Provider;

export const useConnectionContext = () => useContext(ConnectionContext);

