import { useEffect, useRef } from 'react';
import io, { ManagerOptions, Socket, SocketOptions } from 'socket.io-client';
import { useConnectionContext } from '../Contexts/ConnectionContext';

export const useSocket = (url: string, options?: Partial<ManagerOptions & SocketOptions> | undefined): Socket => {
    const { current: socket } = useRef(io(url, options));
    const { connectionDispatch } = useConnectionContext()

    useEffect(() => {
        socket.connect();
        return () => {
            if (socket) {
                socket.close();
            }
        };
    }, [socket, connectionDispatch]);

    return socket;
};
