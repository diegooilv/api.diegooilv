import { Router } from "express";
import { validateParams } from "../middlewares/validateParams.js";
import {
  getPokemonByIdController,
  getPokemonByNameController,
  getTypeByNameController,
} from "../controllers/pokemon.js";
const router = Router();

// Por params
router.get("/pokemon/id/:id", validateParams(["id"]), getPokemonByIdController);
router.get(
  "/pokemon/name/:name",
  validateParams(["name"]),
  getPokemonByNameController
);
//

router.get(
  "/type/name/:name",
  validateParams(["name"]),
  getTypeByNameController
);
//

router.get("/", (req, res) => {
  res.status(200).send("Request successful");
});
//

export default router;
