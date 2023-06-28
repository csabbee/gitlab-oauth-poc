import 'dotenv/config.js'
import { fileURLToPath } from 'url'
import express from 'express'
import session from 'express-session'
import passport from 'passport'
import './auth.js'

import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

const PORT = process.env.PORT || 80

app.use(session({ secret: 'secret' }))
app.use(passport.initialize())
app.use(passport.session())

app.get('/', (req, res) => {
  res.send('<a href="/gitlab">Log in with GitLab</a>')
})

const isLoggedIn = (req, res, next) => {
  req.user ? next() : res.sendStatus(401);
};

app.get('/gitlab', passport.authenticate('gitlab', { scope: ['openid'] }));
app.get('/gitlab/callback',
  passport.authenticate('gitlab', {
    successRedirect: '/success',
    failureRedirect: '/failure',
  })
);

app.get('/failure', (req, res) => {
  res.send('Something went wrong. Please try again');
});

app.get('/success', isLoggedIn, (req, res) => {
  const indexFilePath = path.join(__dirname, '/index.html')
  res.sendFile(indexFilePath)
});

app.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('You are now logged out!');
});


app.listen(PORT, () => {
  console.log(`App running on ${PORT}`)
})
