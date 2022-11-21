import React from "react";
import { CardWithProps } from "../../types/cardWithProps";
import "./card.scss";
import backCard from "../../img/card_dos.jpg";

// définition du type des props reçu par le composant
type Props = {
  disabled: boolean;
  index: number;
  card: CardWithProps;
  onClick: (index: number) => void;
  isFound: boolean;
  isReturned: boolean;
};

export const Card = ({
  disabled,
  index,
  card,
  onClick,
  isReturned,
  isFound,
}: Props) => {
  const handleClick = () => {
    // on lance la méthode onClick si et seulement si les conditions sont remplis
    !disabled && !isReturned && !isFound && onClick(index);
  };

  return (
    <div className="card" onClick={handleClick}>
      {/* on conditionne notre className en fonction d'un paramètre, à l'aide d'une ternaire */}
      <div className={isReturned ? "content returned" : "content"}>
        <div className="front">
          <img src={backCard} alt="memory-element-dos" />
        </div>
        <div className={isFound ? "back found" : "back"}>
          <img src={card.src} alt="memory-element" />
        </div>
      </div>
    </div>
  );
};
