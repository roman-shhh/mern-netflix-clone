import express from 'express';
import { searchFunction } from '../controllers/content.controller.js';
import { getSearchHistory, removeItemFromSearchHistory } from '../controllers/search.controller.js';

const router = express.Router();

router.get("/person/:query", (req, res) => searchFunction('person', req, res));
router.get("/movie/:query", (req, res) => searchFunction('movie', req, res));
router.get("/tv/:query", (req, res) => searchFunction('tv', req, res));

router.get("/history", getSearchHistory);
router.delete("/history/:id", removeItemFromSearchHistory);

export default router;