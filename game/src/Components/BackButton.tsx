import { useNavigate } from "react-router"
import "../Styles/backButtonStyle.css"

export const BackButton: React.FC<{ location: string }> = ({ location }) => {
    const navigate = useNavigate();

    return (
        <button className="c back-button" onClick={() => navigate(location, { replace: true })}>{"<"}</button>
    );
}