const express = require("express");
const bodyParser=require('body-parser');
const res = require("express/lib/response");
const mongoose=require('mongoose');
const app=express();
const PORT =3000;


//
app.use(bodyParser.json());

//localconnection(errorsome)
/*
mongoose.connect('mongodb://localhost:27017/CA_backend_assignment_express', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });*/

//cloud connection
  const atlasConnectionString = 'mongodb+srv://piyushwaghmarehere:WMwX54AgrdpKdYVN@cabackendassignment.0v3fmkw.mongodb.net/?retryWrites=true&w=majority';

// Connect to MongoDB Atlas
mongoose.connect(atlasConnectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected');
});

  //schema
  const movieSchema = new mongoose.Schema({
    name: String,
    img: String,
    summary: String,
  });

  const Movie=mongoose.model('Movie',movieSchema);

  //server start

  app.listen(PORT,() => {
    console.log('Server is running');
  });

  /*CRUD: 
(as the project assignment is simple we can write it here in app1.js
itself but if the project gets more complex and bigger we can organize routes in diffrent file and then import)*/

//(C)reate movie
app.post('/createmovies',async(req,res)=>{
    try {
        const data = req.body;
        const createdMovies = [];
    
        if (Array.isArray(data)) {
          const newMovies = await Movie.insertMany(data);
          res.status(201).json(newMovies);
        } else {
          // Single or multiple movie creation
          data.forEach(async (element) => {
            const { name, img, summary } = element;
            const newMovie = new Movie({ name, img, summary });
            await newMovie.save();
            createdMovies.push(newMovie);
          });
    
          res.status(201).json(createdMovies);
        }
      } catch (error) {
        res.status(500).json({ message: 'Failed to create movie(s)' });
      }

});

//(R)EAD

app.get('/readmovies/:id',async(req,res)=>{
    try {
        const movieId = req.params.id;
        const movie = await Movie.findById(movieId);
        
        if (!movie) {
          return res.status(404).json({ message: 'Movie not found' });
        }
    
        res.json(movie);
      } catch (error) {
        res.status(500).json({ message: 'Failed to read movie' });
      }
});

//(U)pdate
app.get('/updatemovies/:idOrName',async(req,res)=>{
    try {
        const { idOrName } = req.params;
        let movie;
    
        
        if (mongoose.Types.ObjectId.isValid(idOrName)) {
          movie = await Movie.findById(idOrName);
        } else {
          // it's a movie name and find the movie by name
          movie = await Movie.findOne({ name: idOrName });
        }
    
        if (!movie) {
          return res.status(404).json({ message: 'Movie not found' });
        }
    
        res.json(movie);
      } catch (error) {
        res.status(500).json({ message: 'Failed to get movie' });
      }
});
//(D)elete
app.delete('/deletemovies/:id',async(req,res)=>{
    try {
        const { id } = req.params;
        await Movie.findByIdAndDelete(id);
        res.json({ message: 'Movie deleted' });
    } catch (error) {
        res.status(500).json({ message: 'failed to delete movie' });
    }
});