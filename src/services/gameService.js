import * as db from "../database"
import { shuffle } from "lodash"
// why is there _ audébut de quelque proprietés ? => pour les rendre 
// private pour qu'ils ne soient pas visibles dans url
// Créer et retourne un newdeck mélangé avec 3 chameaux en moins.
export function initDeck() {
  // TODO
  // Créer un tableau vide
  // Ajouter les diamants, l'or, l'argent, les tissus, les épices, le cuir et les chameaux
  // Retourner le tableau remplis
  const _deck=[]
  for(let i=0;i<6;i++) _deck.push("diamonds")
  for(let i=0;i<6;i++) _deck.push("gold")
  for(let i=0;i<6;i++) _deck.push("silver")
  for(let i=0;i<8;i++) _deck.push("cloth")
  for(let i=0;i<8;i++) _deck.push("spice")
  for(let i = 0; i < 10; i++) _deck.push("leather")
  for(let i=0;i<11-3 ;i++) _deck.push("camel")

  return shuffle(_deck)
}

// Pioche x cartes d'un deck.
export function drawCards(deck, count = 1) {
  // TODO
  // Créer un tableau vide
  // Pour chaque carte à piocher:
  //  Retirer la carte piochée du deck et la mettre dans le tableau
  // Retourner le tableau contenant les cartes piochées
  const cards=[]
  for(let j=0;j<count;j++){
    const card=deck.shift()
    cards.push(card)
  }
  return cards
}

// Déplace les chameaux de la main d'un joueur (_players[i].hand) vers son enclos (_players[i].camelsCount).
export function putCamelsFromHandToHerd(game) {
  // TODO
  // Pour chaque joueur:
  //  Pour chaque chameau dans la main du joueur
  //  Enlever le chameau de la main et le mettre dans l'enclos
  game._players.forEach((player) => {
    let camelIndex = player.hand.findIndex((card) => card === "camel")
    while (camelIndex !== -1) {
      player.hand.splice(camelIndex, 1)
      player.camelsCount++
      camelIndex = player.hand.findIndex((card) => card === "camel")
    }
  })
}

// Créer un objet game.
export function createGame(name) {
  // TODO
  // Initialiser un nouveau deck avec la fonction précédente
  // Créer le marché avec 3 chameaux et 2 cartes piochés du deck
  // Générer un nouvel identifiant pour la partie
  // Pour chaque joueur:
  //  Créer la main en piochant 5 cartes du deck
  //  Initialiser l'enclos à 0
  //  Initialiser le score à 0
  // Créer les objets contenant les jetons
  // Rassembler le tout pour créer la partie
  // Mettre les chameaux des mains des joueurs dans leurs enclos avec la fonction précédente
  // Retourner la partie 
  const newdeck=initDeck()
  const market=["camel", "camel", "camel", ...drawCards(newdeck,2)]
  // créer une fonction getgames
  const game = {
    id: db.getGames().length + 1,
    name,
    market,
    _deck: newdeck,
    _players: [
      { hand: drawCards(newdeck, 5), camelsCount: 0, score: 0 },
      { hand: drawCards(newdeck, 5), camelsCount: 0, score: 0 },
    ],
    currentPlayerIndex: 0,
    tokens: {
      diamonds: [7, 7, 5, 5, 5],
      gold: [6, 6, 5, 5, 5],
      silver: [5, 5, 5, 5, 5],
      cloth: [5, 3, 3, 2, 2, 1, 1],
      spice: [5, 3, 3, 2, 2, 1, 1],
      leather: [4, 3, 2, 1, 1, 1, 1, 1, 1],
    },
    _bonusTokens: {
      3: shuffle([2, 1, 2, 3, 1, 2, 3]),
      4: shuffle([4, 6, 6, 4, 5, 5]),
      5: shuffle([8, 10, 9, 8, 10]),
    },
     winnerId: undefined,
  }
  putCamelsFromHandToHerd(game)
  db.saveGame(game)
  return game

  return {}
}
export function listGames(){

const gameslist=db.getGames()
return gameslist
}

export function deleteGames(game){

  const gamedeleted=db.deleteGame(game)
  return gamedeleted
}
export function showGame(req){
 

  const game=db.getGame(req.params.gameId,req.params.playerId)
  const gameres = {
    "currentPlayerIndex":game.currentPlayerIndex,
    "name":game.name,
    "id":game.id,
    "market":game.market,
    "tokens":game.tokens,
    "hand":game._players[game.currentPlayerIndex].hand,
    "camelsCount":game._players.camelsCount,
    "winnerIndex":game.winnerId,
    "bonusTokens":game._bonusTokens

  }
  return gameres

}