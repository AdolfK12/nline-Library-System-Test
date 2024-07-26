const { Loan, Book, User, sequelize } = require("../models/index");

class LoanController {
  static async borrowBook(req, res, next) {
    try {
      const { bookId } = req.params;
      const userId = req.userData.id;

      const book = await Book.findByPk(bookId);
      if (!book) {
        throw { name: "DataNotFound", message: "Book not found" };
      }

      const existingLoan = await Loan.findOne({
        where: {
          Book_Id: bookId,
          returnDate: null,
        },
      });

      if (existingLoan) {
        throw {
          name: "BookAlreadyLoaned",
          message: "The book is already loaned",
        };
      }

      const currentLoan = await Loan.findOne({
        where: {
          User_Id: userId,
          returnDate: null,
        },
      });

      if (currentLoan) {
        throw {
          name: "UserCannotBorrowMultipleBooks",
          message: "User can only borrow one book at a time",
        };
      }

      const newLoan = await Loan.create({
        User_Id: userId,
        Book_Id: bookId,
        loanDate: new Date(),
        status: "borrowed",
      });

      res.status(201).json(newLoan);
    } catch (error) {
      next(error);
    }
  }

  static async returnBook(req, res, next) {
    try {
      const { bookId } = req.params;
      const userId = req.userData.id;

      const loan = await Loan.findOne({
        where: {
          Book_Id: bookId,
          User_Id: userId,
          returnDate: null,
        },
      });

      if (!loan) {
        throw {
          name: "DataNotFound",
          message: "No active loan found for this book",
        };
      }

      loan.returnDate = new Date();
      loan.status = "available";
      await loan.save();

      res.status(200).json({ message: "Book returned successfully" });
    } catch (error) {
      next(error);
    }
  }

  static async viewAllLoans(req, res, next) {
    try {
      const loans = await Loan.findAll({
        include: [User, Book],
      });
      res.status(200).json(loans);
    } catch (error) {
      next(error);
    }
  }

  static async viewOverdueLoans(req, res, next) {
    try {
      const overdueLoans = await Loan.scope("overdue").findAll({
        include: [User, Book],
      });
      res.status(200).json(overdueLoans);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = LoanController;
