const express = require("express");
const app = express();
const port = 3000;
const adminRoutes = require("./routes/mainRoutes");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use("/", adminRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
