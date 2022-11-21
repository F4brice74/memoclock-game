import card01 from "../img/card_01.jpg";
import card02 from "../img/card_02.jpg";
import card03 from "../img/card_03.jpg";
import card04 from "../img/card_04.jpg";
import card05 from "../img/card_05.jpg";
import card06 from "../img/card_06.jpg";
import card07 from "../img/card_07.jpg";
import card08 from "../img/card_08.jpg";
import card09 from "../img/card_09.jpg";
import card10 from "../img/card_10.jpg";
import card11 from "../img/card_11.jpg";
import card12 from "../img/card_12.jpg";
import card13 from "../img/card_13.jpg";
import card14 from "../img/card_14.jpg";
import { CardWithProps } from "../types/cardWithProps";

// on crée un array de carte avec un identifier et l'url de la carte.
const cardsWithProps: CardWithProps[] = [
  {
    identifier: "card1",
    src: card01,
  },
  {
    identifier: "card2",
    src: card02,
  },
  {
    identifier: "card3",
    src: card03,
  },
  {
    identifier: "card4",
    src: card04,
  },
  {
    identifier: "card5",
    src: card05,
  },
  {
    identifier: "card6",
    src: card06,
  },
  {
    identifier: "card7",
    src: card07,
  },
  {
    identifier: "card8",
    src: card08,
  },
  {
    identifier: "card9",
    src: card09,
  },
  {
    identifier: "card10",
    src: card10,
  },
  {
    identifier: "card11",
    src: card11,
  },
  {
    identifier: "card12",
    src: card12,
  },
  {
    identifier: "card13",
    src: card13,
  },
  {
    identifier: "card14",
    src: card14,
  },
];

// on "spread" notre array 2 fois pour obtenir nos 14 paires de cartes.
// nous aurions également pu concatener 2 fois le tableau.

export const packOfCards = [...cardsWithProps, ...cardsWithProps];

// une fonction qui reçoit un array de carte et qui retourne un array mélangé aléatoirement.

export const shuffleCard = (cards: CardWithProps[]) => {
  return cards.sort((a, b) => 0.5 - Math.random());
};
