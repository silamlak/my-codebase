import express from 'express'
import { addSnippets, deleteSnippet, getSnippetDetail, getSnippets, updateSnippet } from '../controllers/codeController.js';

const router = express.Router()

router.get("/get", getSnippets);
router.post("/add", addSnippets);
router.get("/get/:id", getSnippetDetail);
router.put("/edit/:id", updateSnippet);
router.delete("/remove/:id", deleteSnippet);

export default router