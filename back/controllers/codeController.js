import snippetModel from '../models/codebaseModel.js'
import { body, validationResult } from 'express-validator'

export const addSnippets = async (req, res, next) => {
    console.log('hello')
    const validations = [
      body('header').notEmpty().withMessage("add header"),
      body('description').notEmpty().withMessage("add description"),
      body('code').notEmpty().withMessage("add code"),
    ];
    try {
        await Promise.all(validations.map((validation) => validation.run(req)))
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }
        const newSnippet = new snippetModel(req.body)
        await newSnippet.save()
        res.status(201).json({message: 'New Snippet Added'})
    } catch (error) {
        next(error)
    }
}

// Controller function to get snippets by language
export const getSnippets = async (req, res, next) => {
  try {
    const { language } = req.query;

    if (!language) {
      return res.status(400).json({ message: "Language query parameter is required" });
    }

    const snippets = await snippetModel.find({ language });

    if (snippets.length === 0) {
      return res.status(404).json({ message: "No snippets found for the specified language" });
    }

    res.status(200).json(snippets);
  } catch (error) {
    next(error);
  }
};

// Controller function to get a snippet by its ID
export const getSnippetDetail = async (req, res, next) => {
  try {
    const { id } = req.params;

    const snippet = await snippetModel.findById(id);

    if (!snippet) {
      return res.status(404).json({ message: "Snippet not found" });
    }

    res.status(200).json(snippet);
  } catch (error) {
    next(error);
  }
};
export const deleteSnippet = async (req, res, next) => {
  try {
    console.log('hello')
    const { id } = req.params;

    await snippetModel.findByIdAndDelete(id);

    res.status(200).json({message: 'deleted successfully'});
  } catch (error) {
    next(error);
  }
};
export const updateSnippet = async (req, res, next) => {
  try {
    const { id } = req.params;

    const snippet = await snippetModel.findByIdAndUpdate(id, {$set: req.body}, {new: true});

    res.status(200).json(snippet);
  } catch (error) {
    next(error);
  }
};
