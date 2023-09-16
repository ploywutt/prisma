import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import areaRouter from "./router/area.js";

const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.json());

app.use("/area", areaRouter);

app.get("/", (req, res) => {
  res.send("Home Service");
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
