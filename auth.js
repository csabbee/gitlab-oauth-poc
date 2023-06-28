import 'dotenv/config.js'
import passport from 'passport'
import GitlabStrategy from 'passport-gitlab2'

const { GITLAB_APP_ID, GITLAB_APP_SECRET } = process.env

passport.use(new GitlabStrategy({
  clientID: GITLAB_APP_ID,
  clientSecret: GITLAB_APP_SECRET,
  callbackURL: 'https://gitlab-oauth-poc-l873j.kinsta.app/gitlab/callback'
},
  (accessToken, refreshToken, profile, cb) => cb(null, profile))
)

passport.serializeUser((user, cb) => {
  cb(null, user)
})
passport.deserializeUser((user, cb) => {
  cb(null, user)
})
