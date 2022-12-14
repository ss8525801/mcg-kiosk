import 'babel-polyfill'
import express from 'express'
import bodyParser from 'body-parser'

import mailer from './mailer'

const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('*', (req, res) => {
  res.send('Server is working. Please post at "/contact" to submit a message.')
})

app.post('/contact', (req, res) => {
  const { email = '', name = '' } = req.body

  mailer({ email, name }).then(() => {
    console.log(`Sent the message from <${name}> ${email}.`);
    res.redirect('/success');
  }).catch((error) => {
    console.log(`Failed to send the message from <${name}> ${email} with the error ${error && error.message}`);
    res.redirect('/success');
  })
})

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
})
