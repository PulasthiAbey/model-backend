const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = process.env.PORT || 3832;

const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// database connections
mongoose.set("strictQuery", false);
mongoose
  .connect(
    process.env.URL_DB,
    { useNewUrlParser: true },
    { useUnifiedTopology: false }
  )
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log(JSON.stringify(err));
  });

const registerRoute = require("./routes/userServices/signup");
const loginRoute = require("./routes/userServices/login");
const newArticleRoute = require("./routes/magazineServices/createNew");
const viewArticleRoute = require("./routes/magazineServices/createNew");
const editArticleRoute = require("./routes/magazineServices/createNew");

app.get("/", (req, res) => {
  console.log("home");
  res.status(200).json({ message: `Welcome to Api` });
});

app.use("/api/v1/register", registerRoute);
app.use("/api/v1/login", loginRoute);
app.use("/api/v1/article", newArticleRoute);
app.use("/api/v1/article", viewArticleRoute);
app.use("/api/v1/article", editArticleRoute);

//listening from the server_error
app.listen(PORT, () => {
  console.log(`Server Running on http://localhost:${PORT}`);
});
