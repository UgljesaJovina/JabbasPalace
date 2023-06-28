import React, { createContext, useContext } from "react";
import { useSocket } from "../Hooks/UseSocket";

const SocketContext = createContext({});
export const SocketContextProvider = SocketContext.Provider

export const useSocketContext = () => useContext(SocketContext);

