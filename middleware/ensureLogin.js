
const ensureLoggedIn = (redirectTo) => {
  return (req, res, next) => {
      if(req.user){
        next()
      }else{
          res.redirect(redirectTo);
      }
  }
}

const ensureLoggedOut = (redirectTo) => {
  return (req, res, next) => {
      if(!req.user){
          next();
      }else{
          res.redirect(redirectTo);
      }
  }
}

module.exports = {ensureLoggedIn, ensureLoggedOut}