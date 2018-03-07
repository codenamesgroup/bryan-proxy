const express = require('express');
const morgan = require('morgan');
const path = require('path');
const proxy = require('express-http-proxy');

const app = express();
const port = process.env.PORT || 3000;

// app.use(morgan('dev'));

app.get('/:id', (req, res) => {
	res.sendFile(path.join(__dirname + '/public/index.html'));
});

// express.static(path.join(__dirname, 'public')));

/* maps and images component */

app.get('/map-and-images/business/:id', proxy('http://localhost:3001/map-and-images/business/:id', {
  proxyReqPathResolver: function(req) {
    return 'http://localhost:3001/map-and-images/business/' + req.params.id;
  }
}));

app.get('/map-and-images/business/:id/photos', proxy('http://localhost:3001/map-and-images/business/:id/photos', {
  proxyReqPathResolver: function(req) {
    return 'http://localhost:3001/map-and-images/business/' + req.params.id + '/photos';
  }
}));

/* highlights component */

app.use('/highlights/reviews/:id', proxy('http://localhost:3003/highlights/reviews/:id', {
  proxyReqPathResolver: function(req) {
    return 'http://localhost:3003/highlights/reviews/' + req.params.id;
  }
}));

app.use('/highlights/photos/:id', proxy('http://localhost:3003/highlights/photos/:id', {
  proxyReqPathResolver: function(req) {
    return 'http://localhost:3003/highlights/photos/' + req.params.id;
  }
}));

/* reviews component */

app.use('/reviews/reviews/:id', proxy('http://localhost:3004/reviews/:id', {
  proxyReqPathResolver: function(req) {
    return 'http://localhost:3004/reviews/reviews/' + req.params.id;
  }
}));

app.use('/reviews/user/:id', proxy('http://localhost:3004/user/:id', {
  proxyReqPathResolver: function(req) {
    return 'http://localhost:3004/reviews/user/' + req.params.id;
  }
}));

/* sidebar component */

app.use("/sidebar/business/:id", proxy("http://localhost:3002/sidebar/business/:id", {
  proxyReqPathResolver: function(req) {
    return "http://localhost:3002/sidebar/business/" + req.params.id;
  }
}));
app.use("/sidebar/postalCode/:code", proxy("http://localhost:3002/sidebar/postalCode/:code", {
  proxyReqPathResolver: function(req) {
    return "http://localhost:3002/sidebar/postalCode/" + req.params.code;
  }
}));
app.use("/sidebar/businessTips/:id", proxy("http://localhost:3002/sidebar/businessTips/:id", {
  proxyReqPathResolver: function(req) {
    return "http://localhost:3002/sidebar/businessTips/" + req.params.id;
  }
}));

/* @TODO: stuffs */

app.listen(port, () => {
	console.log(`server running at: http://localhost:${port}`);
});