import express from "express"

import healthRouter from "./healthRouter"
import gameRouter from "./gameRouter"

const router = express.Router()

router.use("/health", healthRouter)
// On ajoute ici notre nouveau routeur.
router.use("/games", gameRouter)
//router.use("/listgames",)
export default router