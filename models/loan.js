const { Op } = require("sequelize"); // Impor Op dari Sequelize

module.exports = (sequelize, DataTypes) => {
  const Loan = sequelize.define(
    "Loan",
    {
      User_Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          async isOneBookAtATime(value) {
            const existingLoan = await Loan.findOne({
              where: {
                User_Id: value,
                returnDate: null,
              },
            });
            if (existingLoan) {
              throw new Error("User can only borrow one book at a time.");
            }
          },
        },
      },
      Book_Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      loanDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      returnDate: {
        type: DataTypes.DATE,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {}
  );

  Loan.associate = function (models) {
    Loan.belongsTo(models.User, { foreignKey: "User_Id" });
    Loan.belongsTo(models.Book, { foreignKey: "Book_Id" });
  };

  Loan.addScope("overdue", {
    where: {
      returnDate: null,
      loanDate: {
        [Op.lt]: new Date(new Date() - 14 * 24 * 60 * 60 * 1000),
      },
    },
  });

  return Loan;
};
