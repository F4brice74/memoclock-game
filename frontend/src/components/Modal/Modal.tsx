import React, { Dispatch, SetStateAction } from "react";
import "./modal.scss";
import "../../app.scss";
import { Result } from "../../types/Result";
import * as dayjs from "dayjs";

// définition du type des props reçu par le composant
type Props = {
  score: number;
  playTime: number;
  setWinmodal: Dispatch<SetStateAction<boolean>>;
  restartGame: () => void;
  dBResult: Result[];
};

export const Modal = ({
  score,
  playTime,
  setWinmodal,
  restartGame,
  dBResult,
}: Props) => {
  const handleClick = () => {
    setWinmodal(false);
    restartGame();
  };

  //on fait un traitement sur notre tableau de résultats, on le triant en fonction de la date de résultat. puis on applique la méthode slice pour ne conserver que les 10 denriers
  const sortedResult = dBResult
    ?.sort(
      (resultA, resultB) =>
        new Date(resultB.date).getTime() - new Date(resultA.date).getTime()
    )
    .slice(0, 10);

  return (
    <section className={"modalContainer"}>
      <h1>Félicitations !</h1>
      <p>
        {" "}
        voici ton score : {score} coups <br />
        temps de jeu : {playTime} secondes
      </p>
      <button className="appButton" onClick={handleClick}>
        <b>Rejouer !!</b>
      </button>
      <section className="modalSection">
        <h3>les 10 derniers scores</h3>
        {sortedResult.map((result: Result) => {
          return (
            <li>
              <>
                {/* on utilise un formatter dayJs par facilité et pour ne pas réinventer la roue */}
                {dayjs(result.date).format("DD/MM/YYYY HH:mm")} : {result.score}{" "}
                coups, avec un temp de {result.time} secondes
              </>
            </li>
          );
        })}
      </section>
    </section>
  );
};
