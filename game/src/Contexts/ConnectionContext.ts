import { createContext, useContext } from "react";
import { Socket } from "socket.io-client";
import { Dispatch } from 'react';

export interface IRoom {
    uid: string;
    name: string;
    password: string | undefined;
}

export interface IConnectionInfo {
    socket: Socket | undefined;
    name: string | undefined;
    lobby: IRoom | undefined;
}

export const defaultConnectionInfo: IConnectionInfo = {
    socket: undefined,
    name: undefined,
    lobby: undefined
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
    console.log(`Received a reducer request, Action: ${action.type}, Payload: ${action.payload}`);

    switch (action.type) {
        case "set_name":
            return { ...state, name: action.payload as string };
            break;
        case "set_socket":
            return { ...state, socket: action.payload as Socket };
            break;
        case "set_room":
            return { ...state, lobby: action.payload as IRoom }
            break;
        default:
            return state;
    }
}

const ConnectionContext = createContext<IConnectionContextParams>
    ({ connectionState: defaultConnectionInfo, connectionDispatch: () => { } });

export const ConnectionContextProvider = ConnectionContext.Provider;

export const useConnectionContext = () => useContext(ConnectionContext);

