import React from "react";
import "./timer.scss";
import "../../app.scss";

// définition du type des props reçu par le composant
type Props = {
  handlePlayTimeClick: () => void;
  playTime: number;
};


export const Timer = ({ playTime, handlePlayTimeClick }: Props) => {
  return (
    <section className="timerContainer">
      <p>
        Vous devez lancer le chronometre <br /> pour commencer la partie
      </p>
      <button
        disabled={playTime !== 0}
        className={playTime !==0 ? "appButton disabled" : "appButton" }
        onClick={() => {
          handlePlayTimeClick();
        }}
      >
        <b>{playTime === 0 ? "LANCER" : "GOOOO !"} </b>
      </button>
      <p> timer : {playTime} seconds</p>
    </section>
  );
};
