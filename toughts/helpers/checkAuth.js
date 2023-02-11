const checkAuth = (req, res, next) => {
  const userId = req.session.userId

  if(!userId) {
    res.redirect('/')
  }

  next()
}

module.exports = checkAuth