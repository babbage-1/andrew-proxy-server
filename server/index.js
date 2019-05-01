require('newrelic');
const express = require('express');
const path = require('path');
const proxy = require('http-proxy-middleware');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
// serve up static file
const staticPath = `${__dirname}/../public`;
console.log(staticPath);

app.use('/fandangit/:id', express.static(staticPath));
// app.use('/*/styles.css', express.static('public/styles.css'));
// app.use('/*', express.static('public'));

//
// app.use(express.static(__dirname + '/../client/dist'));
// app.use('/*/styles.css', express.static(__dirname + '/../client/dist/styles.css'));
// app.use('/*', express.static(__dirname + '/../client/dist'));


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

// video carousel
const videoCarouselOptions = {
  target: 'http://ec2-54-67-84-44.us-west-1.compute.amazonaws.com:3001',
  changeOrigin: true,
};
const videoCarouselProxy = proxy(videoCarouselOptions);
app.use('/videos', videoCarouselProxy);

// cast and crew
const castCrewOptions = {
  target: 'http://ec2-54-215-226-106.us-west-1.compute.amazonaws.com:2002',
  changeOrigin: true,
};
const castCrewProxy = proxy(castCrewOptions);
app.use('/actors', castCrewProxy);

// movie info
const movieInfoOptions = {
  target: 'http://ec2-54-91-248-31.compute-1.amazonaws.com:2000',
  changeOrigin: true,
};
const movieInfoProxy = proxy(movieInfoOptions);
app.use('/main', movieInfoProxy);
