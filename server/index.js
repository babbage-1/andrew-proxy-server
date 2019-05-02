require('newrelic');
const express = require('express');
const path = require('path');
const proxy = require('http-proxy-middleware');
const cors = require('cors');
const app = express();


app.use(cors());
// serve up static file
const staticPath = `${__dirname}/../public`;
console.log(staticPath);

app.use('/fandangit/:id', express.static(staticPath));

// video carousel
const videoCarouselOptions = {
  target: 'http://ec2-13-57-213-223.us-west-1.compute.amazonaws.com:3001',
  changeOrigin: true,
};
const videoCarouselProxy = proxy(videoCarouselOptions);
app.use('/videos', videoCarouselProxy);

// cast and crew
const castCrewOptions = {
  target: 'http://ec2-13-57-198-90.us-west-1.compute.amazonaws.com:2002',
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


app.get('/loaderio-1698ae3347ba9e825f4991774b9b4485', (req, res) => {
  const filePath = path.join(__dirname, './loaderio-1698ae3347ba9e825f4991774b9b4485.txt');
  res.sendFile(filePath);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
