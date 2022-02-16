const express = require('express'),
      app = express();
      PORT = process.env.PORT || 1000;
      apiRoute = require("./routes/routeAPI");
      htmlRoute = require("./routes/routeHTML");

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

//built in middleware to serve static file in express.js
app.use(express.static("public"));

//importing routes.js file 
apiRoute(app);
htmlRoute(app);
 
app.listen(PORT, () => {
    console.log('app is running at http://localhost:' + PORT);
});