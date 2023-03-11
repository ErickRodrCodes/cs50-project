import * as path from 'path';
import * as express from 'express';
import * as session from 'express-session';

import * as cookieParser from 'cookie-parser';
import { Message } from '@project14-8-6/api-interfaces';

import indexRouter from './app/api/index';
import { SQLLiteStore } from './app/api/middleware/session';


const app = express();

console.log({EXPRESS_SESSION_SECRET: process.env.EXPRESS_SESSION_SECRET})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: 'secret',
  store: new SQLLiteStore({
    db: path.join(__dirname, '..','..','..','db','session_store.db'),
    concurrentDB: 'true',
    table: 'session_store',
  }),
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure:false
  }
}));

app.use('/v1', indexRouter);










app.get('/api', (req, res) => {
  const greeting: Message = { message: 'Welcome to api!' };
  res.send(greeting);
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log('Listening at http://localhost:' + port + '/api');
});
server.on('error', console.error);
