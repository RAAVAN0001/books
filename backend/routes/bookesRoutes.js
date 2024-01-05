import express from "express";
import { Book } from "../model/bookModel.js";

const router = express.Router()
// route for saving a new book
router.post('/', async (req, res) => {
    const { title, author, publishYear } = req.body;
    try {
        if (!(title || author || publishYear)) {
            return res.status(400).send({
                message: 'Please provide all required fields',
            });
        }

        const newBook = {
            title,
            author,
            publishYear,
        };

        const book = await Book.create(newBook);
        return res.status(201).send(book);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
});

// get all books from db
router.get('/', async (req, res) => {
    try {
        const books = await Book.find({});
        res.status(200).json({
            count: books.length,
            data: books
        }); // Send the retrieved books in the response
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

//geting one books form db
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const book = await Book.findById(id);

        res.status(200).json(book); // Send the retrieved books in the response
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

//route for update a book
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, author, publishYear } = req.body;

        if (!title && !author && !publishYear) {
            return res.status(400).json({
                message: 'Send at least one field to update: title, author, publishYear'
            });
        }

        const result = await Book.findByIdAndUpdate(id, req.body, { new: true });

        if (!result) {
            return res.status(404).json({
                message: 'Book not found'
            });
        }

        return res.status(200).json({
            message: 'Book updated successfully',
            updatedBook: result
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

//for deleting a book
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const result = await Book.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: 'Book not found' })
        }
        return res.status(200).send({ message: 'Book deleted successfully' })


    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
})

export default router;

