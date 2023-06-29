import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { NameSelect } from "./Components/NameSelect";
import "./Styles/lobbyStyle.css"
import "./Styles/pageTransitionStyle.css"
import { GameType } from "./Components/GameType";
import { PageTransition } from "./Components/PageTransition";

function App() {
    const location = useLocation();

    return (
        <div className="background">
            <PageTransition location={location}>
                <Routes location={location}>
                    <Route path="/" element={<NameSelect />} />
                    <Route path="/game-type" element={<GameType />} />
                </Routes>
            </PageTransition>
        </div>
    );
}

export default App;
