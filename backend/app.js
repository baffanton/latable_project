const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors");

const userRouter = require("./src/routers/userRouter.js");
const dictionaryRouter = require("./src/routers/dictionaryRouter.js");
const restaurantRouter = require("./src/routers/restaurantRouter.js");

dotenv.config(); // Настраиваем использование env переменных

const dbConnection = require("./src/config/database.js");

const errorMiddleware = require("./src/middlewares/errorMiddleware.js");

dbConnection
  .authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error: " + err));

const app = express();

app.use(bodyParser.json()); // Body-parser
app.use(cookieParser()); // Cookie-parser
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Routers
app.use("/user", userRouter); // User
app.use("/dictionary", dictionaryRouter); // Dictionary
app.use("/restaurant", restaurantRouter); // Restaurant

// Midlewares
app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("Hello, World!"); // Отправить ответ на GET /
});

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    app.listen(PORT, () => console.log(`server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
