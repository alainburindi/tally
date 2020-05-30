const vote = (sequelize, DataTypes) => {
  const Vote = sequelize.define("Vote", {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
  });

  Vote.associate = (models) => {
    Vote.belongsTo(models.User, { foreignKey: "userId" });
  };

  return Vote;
};

export default vote;
