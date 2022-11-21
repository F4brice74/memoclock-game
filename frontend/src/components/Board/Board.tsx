import React, { useCallback, useEffect, useState } from "react";
import { getResult, postResult } from "../../api/api";

import { CardWithProps } from "../../types/cardWithProps";
import { Result } from "../../types/Result";
import { packOfCards, shuffleCard } from "../../utils/cardsHelper";
import { Card } from "../Card/Card";
import { Modal } from "../Modal/Modal";
import { Timer } from "../Timer/Timer";
import "./board.scss";

export const Board = () => {
  // on définit avec le hook useState l'ensemble du state nécessaire à notre jeu
  const [cards, setCards] = useState<CardWithProps[]>(packOfCards);
  const [returnedCards, setReturnedCards] = useState<number[]>([]);
  const [foundCards, setFoundCards] = useState<CardWithProps["identifier"][]>(
    []
  );
  const [score, setScore] = useState<number>(0);
  const [playTime, setPlaytime] = useState(0);
  const [winModal, setWinmodal] = useState(false);
  const [dBResult, setDbResult] = useState<Result[]>([]);
  const [timerId, setTimerId] = useState<any>(0);

  // 1. LES METHODES DE CLICK

  // scénario à réaliser lors du click sur une carte. On utilise le timeout pour ralentir le traitement des fonctions pour les besoins du jeu
  const handleCardClick = (index: number) => {
    //s'il y a déjà une carte retournée on ajoute dans le tableau des returnedCard la seconde (sans écraser la première) et on set le score. sinon on ajoute la première
    if (returnedCards.length === 1) {
      setReturnedCards((prev) => [...prev, index]);
      setScore(score + 1);
      setTimeout(() => {}, 1000);
    } else {
      setReturnedCards([index]);
    }
  };

  // scénraio à réaliser lors du click sur le timer.
  const handlePlayTimeClick = () => {
    // si le timer existe (s'il est lancé) on souhaitera l'arrêter et le remettre à zéro
    if (timerId) {
      clearInterval(timerId);
      setTimerId(0);
      return;
    }
    // sinon on voudra créer un timer et le lancer
    const newIntervalId = setInterval(() => {
      setPlaytime((prevCount) => prevCount + 1);
    }, 1000);
    setTimerId(newIntervalId);
  };

  // 1. LES METHODES DE CALCULS / RENDU

  // définition des cartes trouvées. on vérifie que l'identifier se trouve l'array de cartes trouvées.
  const isFoundCards = (card: CardWithProps) => {
    if (foundCards.includes(card.identifier)) return true;
    return false;
  };

  // définition des cartes retournées. on vérifie que les cartes sont dans l'array returnedCards OU dans l'array des cartes trouvées via la méthode ci dessus.
  const isReturnedCards = (card: CardWithProps, index: number) => {
    if (returnedCards.includes(index) || isFoundCards(card)) return true;
    return false;
  };

  // on vérifie si les cartes sont similaires. On  peut utiliser le hook useCallback pour éviter les rendus intempestifs grâce à la mémoisation
  const checkSimilarCards = useCallback(
    (cardsIndex: number[]) => {
      const [first, second] = cardsIndex;
      if (cards[first].identifier === cards[second].identifier) {
        setFoundCards((prev) => [...prev, cards[first].identifier]);
      }
      setReturnedCards([]);
    },
    [cards]
  );

  // methode pour récupérer les résultats en base et les enregistrer dans notre state.
  const getResultandSetState = async () => {
    const results = await getResult();
    setDbResult(results);
  };

  //Méthode pour recommencer la partie. On met à zéro les compteurs et les array et on mélange de nouveau les cartes.
  const restartGame = () => {
    setFoundCards([]);
    setReturnedCards([]);
    setScore(0);
    setPlaytime(0);
    setCards(shuffleCard(packOfCards));
  };

  // on chargement du jeu, on récupère les résultats, et on mélange les cartes.
  useEffect(() => {
    getResultandSetState();
    setCards(shuffleCard(packOfCards));
  }, []);

  // lorsque que l'array returnedCards est modifié et qu'il y 2 éléments dedans, on vérifie la similarité entre les cartes
  useEffect(() => {
    if (returnedCards.length === 2)
      setTimeout(() => {
        checkSimilarCards(returnedCards);
      }, 1000);
  }, [returnedCards]);

  // lorsque foundCards et cards changent sont modifiées, on vérifie une égalité pour lancer le scénario de victoire. (modal, arrêt du timer, envoi des résultats, récupération des résultats)
  useEffect(() => {
    if (foundCards.length === cards.length / 2) {
      setWinmodal(true);
      handlePlayTimeClick();
      postResult(score, playTime);
      getResultandSetState();
    }
  }, [foundCards, cards, score, playTime]);

  return (
    <div className="test">
      <Timer handlePlayTimeClick={handlePlayTimeClick} playTime={playTime} />
      <h4>Nombre de coups : {score}</h4>
      <section className="container">
        {cards.map((card, index) => (
          <div>
            {/* on passe différentes props à notre composant card pour lui permettre de se mettre à jour */}
            <Card
              disabled={playTime === 0}
              index={index}
              card={card}
              onClick={handleCardClick}
              isFound={isFoundCards(card)}
              isReturned={isReturnedCards(card, index)}
            />
          </div>
        ))}
      </section>
      {/* si winModal est vérifié et seulement si winModal est vérifié on affiche la modal */}
      {winModal && (
        <Modal
          score={score}
          playTime={playTime}
          setWinmodal={setWinmodal}
          restartGame={restartGame}
          dBResult={dBResult}
        />
      )}
    </div>
  );
};
