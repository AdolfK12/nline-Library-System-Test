const express = require("express");
const Controller = require("../controllers/login-register-controller");
const BookController = require("../controllers/bookController");
const LoanController = require("../controllers/loanController");
const { authN, adminAuth } = require("../middleware/auth");
const errorHandler = require("../helpers/errorHandler");

const router = express.Router();

router.post("/register", Controller.register);
router.post("/login", Controller.login);

router.get("/books", authN, BookController.listBooks);

router.post("/borrow/:bookId", authN, LoanController.borrowBook);
router.post("/return/:bookId", authN, LoanController.returnBook);
router.get("/loans", authN, adminAuth, LoanController.viewAllLoans);
router.get("/loans/overdue", authN, adminAuth, LoanController.viewOverdueLoans);

router.use(errorHandler);

module.exports = router;
