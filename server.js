const express = require("express");
const app = express();
const port = 3000;
const adminRoutes = require("./routes/mainRoutes");
const fs = require("fs");
const json = require("./firebase_wordbridge.json");
console.log(JSON.stringify(json));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use("/", adminRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
