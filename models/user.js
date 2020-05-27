const user = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
  });

  User.findByEmail = async (email) => {
    const queryResult = await User.findOne({
      where: { email },
    });

    return queryResult;
  };

  return User;
};

export default user;
