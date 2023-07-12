const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const contactRouter = require("./Routes/contactRoutes");
const userRouter = require("./Routes/userRoutes");
const errorHandler = require("./MiddleWare/errorHandler");

const app = express();
app.use(express.json());

const PORT = 5000 || process.env.PORT;

// Api
app.use("/api/contacts", contactRouter);
app.use("/api/users", userRouter);
app.use(errorHandler);

app.listen(PORT, () => {
    mongoose
        .connect(process.env.MONGO_LINK)
        .then(() => {
            console.log(`listening on port : ${PORT}`);
            console.log("Connection With Database has been established");
        })
        .catch((err) => {
            console.log(err.message);
        });
});
