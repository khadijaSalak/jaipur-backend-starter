import express from "express"
import * as gameService from "../services/gameService"

const router = express.Router()

// Ecoute la requête POST /games.
router.post("/", function (req, res) {
  // TODO retourner le status 400 si le nom n'existe pas.
  if (!req.body.name) {
    response.status(400).send('Tapezzzzzzzzzzzz un nommmmmm ');
    return 
    }
  const newGame = gameService.createGame(req.body.name)
  
  res.status(201).json({ id: newGame.id, name: newGame.name })
})

export default router