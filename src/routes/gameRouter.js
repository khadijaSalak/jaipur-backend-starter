import express from "express"
import * as gameService from "../services/gameService"

const router = express.Router()

// Ecoute la requête POST /games.
router.post("/", function (req, res) {
  // TODO retourner le status 400 si le nom n'existe pas.
  console.log(req.body)
  if (!req.body.name) {

    res.status(400).send("Tapezzzzzzzzzzzz un nommmmmm ");
    return 
    }

  const newGame = gameService.createGame(req.body.name)
  
  res.status(201).json({ id: newGame.id, name: newGame.name })
})

router.get("/",function(req,res){

//res.status(200).json([{name:"test"}])
const newGame = gameService.listGames()
//console.log(newGame.forEach(game => game.name))
//res.status(200).json([{name:newGame[0].name}])
res.status(200).json({ id: newGame.id, name: newGame.name })
})
export default router