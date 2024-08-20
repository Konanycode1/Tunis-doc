import express from "express";
import Cors from "cors";
import dotenv from "dotenv";
import path from "path";
import AllRoute from "./router/allRouter";
dotenv.config();
const App = express();
App.use(Cors());
App.use(express.json());
App.use(express.urlencoded({ extended: true }));
App.use(express.static(path.join(__dirname, "public")));

// Router group
App.use('/api/v1',AllRoute);
dotenv.config();

// App.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "index.html"));
// });



App.listen(process.env.PORT, () => {
    console.log("server started", process.env.PORT);
})