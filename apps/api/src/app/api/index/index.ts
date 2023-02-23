import { Router } from "express";
import clientRoter from "../client";
import movieRouter from "../movie";

const indexRouter = Router();

indexRouter.get("/", (req, res) => {
  res.send("indexRouter");
});

indexRouter.use('/client', clientRoter)
indexRouter.use('/movie', movieRouter)


export default indexRouter;
