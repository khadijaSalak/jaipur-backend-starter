import express from "express"
import * as gameService from "../services/gameService"
import * as db from "../database"
const router = express.Router()

// Ecoute la requête POST /games.
router.post("/", function (req, res) {
  // TODO retourner le status 400 si le nom n'existe pas.

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

res.status(200).json(newGame.map((game)=>({id:game.id, name:game.name})))
})
router.delete("/:id",function(req,res){
  
    //const del=gameService.deleteGames(req.params.id)
   console.log(req.params.id)
    const games=db.deleteGame(req.params.id)
   res.status(201).json(games.map((game)=>({id:game.id, name:game.name})));
        
     
   
})
router.get("/:gameId/players/:playerId",function(req,res){

     const gameInfo=gameService.showGame(req)
      console.log(gameInfo)
     if(gameInfo){
        
          res.json(gameInfo)
          
     }else{
        res.status(404).send("game not found")
     }

})
export default router