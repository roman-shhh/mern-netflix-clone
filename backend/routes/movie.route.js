import express from 'express';
import { getByCategory, getDetails, getSimilar, getTrailers, getTrending } from '../controllers/content.controller.js';

const router = express.Router();

router.get("/trending", (req, res) => getTrending('movie', req, res));
router.get("/:id/trailers", (req, res) => getTrailers('movie', req, res));
router.get("/:id/details", (req, res) => getDetails('movie', req, res));
router.get("/:id/similar", (req, res) => getSimilar('movie', req, res));
router.get("/:category", (req, res) => getByCategory('movie', req, res));

export default router;