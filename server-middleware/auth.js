var express = require('express')
var app = express()

const { Magic } = require('@magic-sdk/admin')

app.use(
  express.urlencoded({
    extended: true,
  })
)

app.use(express.json())

app.post('/login', (req, res) => {
  const mAdmin = new Magic(process.env.MAGIC_SECRET_KEY)
  mAdmin.token.validate(req.body.token)
  res.status(200).json({
    token: req.body.token,
  })
})

app.get('/user', async function (req, res) {
  const DIDToken = req.headers.authorization
  const mAdmin = new Magic(process.env.MAGIC_SECRET_KEY)
  const metadata = await mAdmin.users.getMetadataByToken(DIDToken)
  res.status(200).json({ user: metadata })
})

app.post('/logout', async function (req, res) {
  const DIDToken = req.headers.authorization
  console.log(DIDToken)
  const mAdmin = new Magic(process.env.MAGIC_SECRET_KEY)
  await mAdmin.users.logoutByToken(DIDToken)
  res.status(200).json({ authenticated: false })
})

module.exports = app
