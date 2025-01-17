import React from "react";
import "./GameHeader.css";

function GameHeader({ lives, points, badges, pointsDifficulty }) {
  const livesIcon = "❤️".repeat(lives);
  const badgesIcon = "⭐".repeat(badges);

  return (
      <div className="game-stats">
        <div className="stat">
          <span className="stat-label">Vidas: </span>
          <span className="stat-lives">{livesIcon}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Progreso: </span>
          <progress className="stat-progress" max={pointsDifficulty} value={points}></progress>
        </div>
        <div className="stat">
        <span className="stat-label">Premios: </span>
          <span className="stat-badges">{badgesIcon}</span>
        </div>
      </div>
  );
}

export default GameHeader;