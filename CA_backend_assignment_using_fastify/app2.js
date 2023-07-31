
const fastify = require('fastify');
const mongoose = require('mongoose');
const fastifyCors = require('@fastify/cors');


const app = fastify();



const atlasConnectionString = 'mongodb+srv://piyushwaghmarehere:WMwX54AgrdpKdYVN@cabackendassignment.0v3fmkw.mongodb.net/?retryWrites=true&w=majority';


mongoose.connect(atlasConnectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB Atlas');
});

const movieSchema = new mongoose.Schema({
  name: String,
  img: String,
  summary: String,
});

const Movie = mongoose.model('Movie', movieSchema);
app.register(fastifyCors);
app.listen(3000, (err) => {
  if (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
  console.log('Server is running at 3000');
});



app.post('/createmovies', async (req, res) => {
  try {
    const data = req.body;
    const createdMovies = [];

    if (Array.isArray(data)) {
      // Batch create movies
      const newMovies = await Movie.insertMany(data);
      res.status(201).send(newMovies);
    } else {
      // Single or multiple movie creation
      for (const element of data) {
        const { name, img, summary } = element;
        const newMovie = new Movie({ name, img, summary });
        await newMovie.save();
        createdMovies.push(newMovie);
      }

      res.status(201).send(createdMovies);
    }
  } catch (error) {
    res.status(500).send({ message: 'Failed to create movie(s)' });
  }
});

app.get('/readmovies/:id', async (req, res) => {
  try {
    const movieId = req.params.id;
    const movie = await Movie.findById(movieId);

    if (!movie) {
      return res.status(404).send({ message: 'Movie not found' });
    }

    res.send(movie);
  } catch (error) {
    res.status(500).send({ message: 'Failed to read movie' });
  }
});

app.get('/updatemovies/:idOrName', async (req, res) => {
  try {
    const { idOrName } = req.params;
    let movie;

    // Check if the provided parameter is a valid MongoDB ObjectId (i.e., a movie ID)
    if (mongoose.isValidObjectId(idOrName)) {
      movie = await Movie.findById(idOrName);
    } else {
      // If it's not a valid ObjectId, assume it's a movie name and find the movie by name
      movie = await Movie.findOne({ name: idOrName });
    }

    if (!movie) {
      return res.status(404).send({ message: 'Movie not found' });
    }

    res.send(movie);
  } catch (error) {
    res.status(500).send({ message: 'Failed to get movie' });
  }
});

app.delete('/deletemovies/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Movie.findByIdAndDelete(id);
    res.send({ message: 'Movie deleted' });
  } catch (error) {
    res.status(500).send({ message: 'Failed to delete movie' });
  }
});
