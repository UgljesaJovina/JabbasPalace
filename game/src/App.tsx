import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NameSelect } from "./Components/NameSelect";
import "./Styles/lobbystyle.css"
import { GameType } from "./Components/GameType";

function App() {


    return (
        <div className="background">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<NameSelect />} />
                    <Route path="/game-type" element={<GameType />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
