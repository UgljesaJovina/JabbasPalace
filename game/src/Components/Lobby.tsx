import { useNavigate } from "react-router";
import { useConnectionContext } from "../Contexts/ConnectionContext";
import { useEffect } from "react";

export const Lobby = () => {
    const { connectionState: { name } } = useConnectionContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!name) navigate("/", { replace: true });
    })

    return (<div></div>);
}