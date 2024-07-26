module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define(
    "Book",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isbn: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {}
  );

  Book.associate = function (models) {
    Book.hasMany(models.Loan, { foreignKey: "Book_Id" });
  };

  return Book;
};
