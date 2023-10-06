import express from 'express';
import session from 'express-session';
import lodash from 'lodash';
import morgan from 'morgan';
import nunjucks from 'nunjucks';
import ViteExpress from 'vite-express';

const app = express();
const port = '8000';

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(session({ secret: 'ssshhhhh', saveUninitialized: true, resave: false }));

nunjucks.configure('views', {
  autoescape: true,
  express: app,
});

const MOST_LIKED_FOSSILS = {
  aust: {
    img: '/img/australopith.png',
    name: 'Australopithecus',
    num_likes: 584,
  },
  quetz: {
    img: '/img/quetzal_torso.png',
    name: 'Quetzal',
    num_likes: 587,
  },
  steg: {
    img: '/img/stego_skull.png',
    name: 'Stegosaurus',
    num_likes: 598,
  },
  trex: {
    img: '/img/trex_skull.png',
    name: 'Tyrannosaurus Rex',
    num_likes: 601,
  },
};

const OTHER_FOSSILS = [
  {
    img: '/img/ammonite.png',
    name: 'Ammonite',
  },
  {
    img: '/img/mammoth_skull.png',
    name: 'Mammoth',
  },
  {
    img: '/img/ophthalmo_skull.png',
    name: 'Opthalmosaurus',
  },
  {
    img: '/img/tricera_skull.png',
    name: 'Triceratops',
  },
];

// TODO: Replace this comment with your code

app.get('/random-fossil.json', (req, res) => {
  const randomFossil = lodash.sample(OTHER_FOSSILS);
  res.json(randomFossil);
});

ViteExpress.listen(app, port, () => {
  console.log(`Server running on http://localhost:${port}...`);
});

app.get('/top-fossils', (req, res) => {
  if (req.session.name) {
  res.render('top-fossils.html.njk', { mostLiked: Object.values(MOST_LIKED_FOSSILS), name: req.session.name  })
  } else {
    res.render('homepage.html.njk')
  }
})

app.get('/', (req, res) => {
  // console.log(req.query)
  if (req.session.name) {
    res.render('top-fossils.html.njk', { mostLiked: Object.values(MOST_LIKED_FOSSILS), name: req.session.name  })
  } else {
  res.render('homepage.html.njk')
  }
})



app.post('/get-name', (req, res) => {
  // console.log(req.query)
  // console.log(req.body)
  // console.log(req.params)
  const { name } = req.body
    req.session.name = name
    res.redirect('/top-fossils')
})
