import express from 'express';
import fetch from 'node-fetch';
import bodyParser from 'body-parser';
import pg from 'pg';
import crypto from 'crypto';
import cors from 'cors';
import jwt from 'jsonwebtoken';

const app = express();
const PORT = 3000;
const YTS_API_URI = "https://yts.mx/api/v2"

const pool = new pg.Pool({
  user: 'KinoBambino_admin',
  host: 'localhost',
  database: 'KinoBambino_DB',
  password: 'password',
  port: 5432,
});

const jwtSecret = 'mysecret';

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors({ origin: 'http://localhost:4200' }));

app.get('/', (_, res) => {
  res.json({ 'status': 'OK' });
})

function setQueryParams(title, genre, year) {
  let queryParams = '';
  if (title || genre || year) {
    queryParams += `&`;
    if (title) {
      queryParams += `query_term=${title}&`;
    }
    if (genre) {
      queryParams += `genre=${genre}&`;
    }
    if (year) {
      queryParams += `query_term=${year}`;
    }
  }
  return queryParams;
}

app.get('/api/movies/:page_number', async (req, res) => {
  const page_number = req.params.page_number;
  const genre = req.query.genre;
  const year = parseInt(req.query.year, 10);
  const title = req.query.title;

  let url = `${YTS_API_URI}/list_movies.json?page=${page_number}`;

  const queryParams = setQueryParams(title, genre, year);
  url += queryParams;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data.data);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

app.get('/api/movie-details/:id', async (req, res) => {
  const id = req.params.id;
  const url = `${YTS_API_URI}/movie_details.json?movie_id=${id}&with_images=true&with_cast=true`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data.data.movie)
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

app.post('/api/ratings', (req, res, next) => {
  const newRating = {
    movie_id: req.body.movie_id,
    rating: req.body.rating,
    user_id: req.body.user_id
  };
  const query = 'INSERT INTO ratings (rating, movie_id, user_id) VALUES ($1, $2, $3)';
  const values = [newRating.rating, newRating.movie_id, newRating.user_id];
  pool.query(query, values, (error, result) => {
    if (error) {
      return res.status(409).json({
        type: "error",
        message: "You have already rated this film."
      });
    } 
    return res.status(200).json({
      type: "info",
      message: "Movie rated successfully."
    });
  })
});

app.get('/api/ratings/:movieId', (req, res, next) => {
  const movieId = req.params.movieId;
  const query = 'SELECT * FROM ratings WHERE movie_id = $1';
  const values = [movieId];
  pool.query(query, values, (error, result) => {
    if (error) {
      return next(error);
    }
    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Ratings not found."
      });
    }
    const ratings = result.rows.map(row => row.rating);
    return res.status(200).json({
      ratings: ratings,
      message: "Ratings found."
    });
  });
});

app.get('/api/ratings/:movieId/:userId', (req, res, next) => {
  const movieId = req.params.movieId;
  const userId = req.params.userId;

  const query = 'SELECT * FROM ratings WHERE movie_id = $1 AND user_id = $2';
  const values = [movieId, userId];

  pool.query(query, values, (error, result) => {
    if (error) {
      return next(error);
    }
    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Rating not found."
      });
    }
    return res.status(200).json({
      rating: result.rows[0].rating,
      message: "Rating found."
    });
  });
});

app.post('/api/signup', (req, res, next) => {
  const hashedUserPassword = crypto.createHash('sha256').update(req.body.password).digest('hex');
  const newUser = {
    email: req.body.email,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: hashedUserPassword,
  };
  const query = 'INSERT INTO users (email, firstname, lastname, password) VALUES ($1, $2, $3, $4) RETURNING *';
  const values = [newUser.email, newUser.firstname, newUser.lastname, newUser.password];

  pool.query(query, values, (error, result) => {
    if (error) {
      if (error.constraint === "users_email_key") {
        return res.status(409).json({
          message: "Email already exists in the database."
        });
      } else {
        return next(error);
      }
    }
    return res.status(200).json({
      message: "User created successfully"
    });
  });
});

app.post('/api/login', async function (req, res) {
  const { email, password } = req.body;
  const hashedUserPassword = crypto.createHash('sha256').update(password).digest('hex');
  const query = 'SELECT * FROM users WHERE email = $1 AND password = $2';
  const values = [email, hashedUserPassword];

  try {
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      res.status(401).json({
        message: 'Invalid email or password.'
      });
      return;
    }

    const user = result.rows[0];
    const isPasswordValid = user.password === hashedUserPassword;

    if (!isPasswordValid) {
      return res.status(401).json({
        message: 'Invalid email or password.'
      });
    }
    
    const token = jwt.sign({ sub: user.id }, jwtSecret);
    res.json({ access_token: token, user_id: user.user_id });

  } catch (error) {
    res.status(500).json({
      message: 'Internal server error.'
    });
  }
});

app.listen(PORT, () => console.log(`Express server currently running on port ${PORT}`));
