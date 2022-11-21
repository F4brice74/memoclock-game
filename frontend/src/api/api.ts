import axios from "axios";
import { Result } from "../types/Result";


// définition de l'url du backend. Pour les besoins de l'exercice nous l'avons mis ici en dur.
// ce genre d'information devrait tout le temps etre sttocké dans un fichier .env

const backendUrl = "http://localhost:8080";
const resultUrl = `${backendUrl}/api/result`;

// méthode asynchrone pour récupérer les résultats (GET) en base de données.
// le catch des erreurs pourrait être amélioré...

export async function getResult(): Promise<Result[]> {
  try {
    const result = await axios.get(resultUrl);
    return result.data;
  } catch (err) {
    console.log(err);
    throw new Error("an error occured while fetching data");
  }
}

// méthode asynchrone pour envoyer les résultats (POST) en base de données.
// le catch des erreurs pourrait être amélioré...
// nous n'envoyobns pas la date de résultat, elle sera défini côté backend.

export async function postResult(score: number, playTime: number) {
  try {
    await axios.post(resultUrl, {
      score: score,
      time: playTime,
    });
  } catch (err) {
    console.log(err);
    throw new Error("an error occured while posting data");
  }
}

// on pourrait également utiliser la méthode Fetch à la place d'axios
