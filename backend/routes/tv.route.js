import express from 'express';
import { getByCategory, getDetails, getSimilar, getTrailers, getTrending } from '../controllers/content.controller.js';

const router = express.Router();

router.get("/trending", (req, res) => getTrending('tv', req, res));
router.get("/:id/trailers", (req, res) => getTrailers('tv', req, res));
router.get("/:id/details", (req, res) => getDetails('tv', req, res));
router.get("/:id/similar", (req, res) => getSimilar('tv', req, res));
router.get("/:category", (req, res) => getByCategory('tv', req, res));

export default router;