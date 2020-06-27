const express    = require('express')
const cors       = require('cors')
const jrCMS      = require('./jr-cms/jr-cms')


const { ghToken }  = require('./ghToken')


const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static('public'))

app.use(cors())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// jrCMS.setRepo({name: 'md-blog', owner: 'lufemas'})
jrCMS.setToken(ghToken)
jrCMS.init(app)

// jrCMS.RestAPI() //*

app.listen(PORT, ()=>{
  console.log(`Listening to PORT: ${PORT}`)
})