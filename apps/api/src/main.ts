import * as path from 'path';
import * as express from 'express';
import * as session from 'express-session';

import * as cookieParser from 'cookie-parser';
import { SQLLiteStore } from './app/api/v1/middleware/session';
import indexRouter from './app/api/v1/index';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: process.env.EXPRESS_SESSION_SECRET,
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

app.use('/api/v1', indexRouter);

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log('Listening at http://localhost:' + port + '/api/v1');
});
server.on('error', console.error);
