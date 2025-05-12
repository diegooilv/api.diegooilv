import { Router } from "express";

const router = Router();

// Por params
router.get("/pokemon/id/:id");
router.get("/pokemon/name/:name");
router.get("/type/id/id:");
router.get("/type/name/:name");
router.get("/move/id/id:");
router.get("/move/name/:name");
router.get("/item/id/:id");
router.get("item/name/:name");

// Por querys.
router.get("/pokemon");

export default router;