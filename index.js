import express from "express";
import { config } from "dotenv";
import bodyParser from "body-parser";
import expressLayout from "express-ejs-layouts";
import { sequelize } from "./models";
import router from "./routes";

config();

const app = express();

//EJS
app.use(expressLayout);
app.set("view engine", "ejs");

// BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 500;

app.use("/assets", express.static("public"));
app.get("/", (req, res) => {
  res.render("landing");
});

app.use(router);

sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `Server listening on port: ${PORT} in ${process.env.NODE_ENV} mode`
      );
    });
  })
  .catch((err) => {
    console.log(`Unable to connect to the databse ${err}`);
  });
