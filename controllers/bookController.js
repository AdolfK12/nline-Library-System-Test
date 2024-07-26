const { Book } = require("../models/index");

class BookController {
  static async listBooks(req, res, next) {
    try {
      const books = await Book.findAll();
      res.status(200).json(books);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = BookController;
