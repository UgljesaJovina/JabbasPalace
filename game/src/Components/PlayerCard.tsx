import crown from "../Images/crown.png";

export const PlayerCard: React.FC<{ name: string, isAdmin: boolean }> = ({ name, isAdmin }) => {
    return (
        <div className="player-card">
            <label className="player-name">{name}</label>
            <img className="admin-img" src={crown} alt="" style={{opacity: (isAdmin ? 1 : 0)}} />
        </div>
    )
}
