import {Router} from 'express'

const movieRouter = Router();

movieRouter.get('/', (req, res) => {
  res.send('Welcome to api!');
});

movieRouter.get('/:id', (req, res) => {
  res.send('Welcome to api!');
});

export default movieRouter;

