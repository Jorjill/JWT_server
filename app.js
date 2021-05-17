require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./api/users/user.router");

app.use(express.json());

// if url is /api/users, use userRouter in user.router
app.use("/api/users", userRouter);

// list on port 3000
app.listen(process.env.APP_PORT, () => {
    console.log("Server up and running on PORT: ", process.env.APP_PORT);
});