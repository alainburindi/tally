const choice = (sequelize, DataTypes) => {
  const Choice = sequelize.define("Choice", {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },

    name: {
      type: DataTypes.STRING,
    },

    votes: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    voteId: {
      type: DataTypes.INTEGER,
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });

  Choice.associate = (models) => {
    Choice.belongsTo(models.Vote, { foreignKey: "voteId" });
    Choice.belongsTo(models.User, { foreignKey: "userId" });
  };

  return Choice;
};

export default choice;
