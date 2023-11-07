import connection from './config/connection.js';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

// Router Imports
import videogamesRouter from './routes/videogames.routes.js';
import developersRouter from './routes/developers.routes.js';
import ratingsRouter from './routes/ratings.routes.js';
import usersRouter from './routes/users.routes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({}));
app.use(morgan('dev'));

// Routes
app.use('/videogames', videogamesRouter);
app.use('/developers', developersRouter);
app.use('/ratings', ratingsRouter);
app.use('/users', usersRouter);

app.use('/', async (_req, res) => {
  res.status(200).send({
    system: 'Videogames API',
    status: '🟢 System operational',
    version: '1.0.0',
  });
});

// Server
await connection.sync({ force: false });

const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});
