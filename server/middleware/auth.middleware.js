const jwt = require('jsonwebtoken')
const Boom = require('@hapi/boom')
const { user } = require('../models')

exports.verifyJwt = async (req, res) => {
  const accessToken = req.state?.accessToken || req.headers.authorization?.replace('Bearer ', '')
  console.log(accessToken);

  if (!accessToken) {
    throw Boom.unauthorized('Unauthorized access')
  }

  const decodedToken = jwt.verify(accessToken, process.env.TOKEN_SECRET)

  const userData = await user.findOne({
    where: { id: decodedToken.id },
    attributes: { exclude: ['password'] }
  })

  if (!userData) {
    throw Boom.unauthorized('Invalid Access Token')
  }

  req.user = userData

  return res.continue
}
