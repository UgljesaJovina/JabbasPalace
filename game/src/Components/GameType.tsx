import { useEffect } from "react";
import { useConnectionContext } from "../Contexts/ConnectionContext";
import { useNavigate } from "react-router";
import "../Styles/gameType.css";

export const GameType = () => {
    const { connectionState: {name} } = useConnectionContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!name) navigate("/", { replace: true });
    }, []);

    return (
        <div className="game-type">
            <button onClick={() => navigate("/create-room", { replace: true })} style={{backgroundColor: "greenyellow"}}>Create a room</button>
            <button onClick={() => navigate("/find-room", { replace: true })} style={{backgroundColor: "blueviolet"}}> Join a room</button>
        </div>
    );
}