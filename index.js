require("dotenv").config({ path: "./config.env" });
const s3 = require("./s3");
const path = require("path");
const express = require("express");
const cors = require("cors")
const connectToMongoDB = require('./db')
const app = express();
// const path = require("path")

const port = process.env.PORT || 5000
connectToMongoDB();

app.use(cors())
// const viewsFolderPath = path.join(__dirname, "./views")
// MIDDLEWARE FOR JSON =>
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.set("view engine", "hbs");
// app.set("views", viewsFolderPath)


// INCLUDE ROUTES =>
app.use("/api/auth", require("./routes/auth"))
app.use("/api/notebooks", require("./routes/notebooks"))
app.use("/api/notes", require("./routes/notes"))

app.get('/s3Url', async (req, res) => {
  const url = await s3.generateUploadURL()
  res.send({url})
})

app.use(express.static(path.join(__dirname, "./notebooks-frontend/build")));
app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./notebooks-frontend/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});
app.listen(port, () => {
    console.log(`You are live on the port http://localhost:${port}`)
});

// bcrypt cors dotenv ejs express express-validator googleapis jsonwebtoken mongoose nodemailer
// first wheat wash resource wise demise venue glance slim rabbit coral universe