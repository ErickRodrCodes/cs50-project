import { Router } from 'express';

const clientRouter = Router();


clientRouter.get('/', (req, res) => {
  res.send('Welcome to api!');
});

clientRouter.get('/logout', (req, res, next) => {
  req?.session.destroy((err) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.redirect('/');
    }
  })
});
clientRouter.post('/login', (req, res) => {
  res.send('/login')
});
clientRouter.post('/registration', (req, res) => {
  res.send('/registration')
});


export default clientRouter;
