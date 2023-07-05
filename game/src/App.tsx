import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { NameSelect } from "./Components/NameSelect";
import "./Styles/baseStyle.css";
import "./Styles/pageTransitionStyle.css";
import { GameType } from "./Components/GameType";
import { PageTransition } from "./Components/PageTransition";
import { CreateRoom } from "./Components/CreateRoom";
import { FindGame } from "./Components/FindGame";
import { Lobby } from "./Components/Lobby";
import { Game } from "./Components/Game";

function App() {
    const location = useLocation();

    return (
        <div className="background">
            <PageTransition location={location}>
                <Routes location={location}>
                    <Route path="/" element={<NameSelect />} />
                    <Route path="/game-type" element={<GameType />} />
                    <Route path="/create-room" element={<CreateRoom />} />
                    <Route path="/find-room" element={<FindGame />} />
                    <Route path="/room" element={<Lobby />} />
                    <Route path="/game" element={<Game />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </PageTransition>
        </div>
    );
}

export default App;
