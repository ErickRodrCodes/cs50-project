import { Router } from "express";
import { resetDatabase } from "../middleware/db";
import movieRouter from "../movie";
import userRouter from "../user";

const indexRouter = Router();

indexRouter.get("/", (req, res) => {
  res.send({ message: "Movie-Reviewer API v1.0.0" });
});

indexRouter.use('/user', userRouter)
indexRouter.use('/movie', movieRouter)
indexRouter.delete('/initialize', (req, res) => {
  resetDatabase();
  res.send({ message: 'Database initialized' });
})


export default indexRouter;
