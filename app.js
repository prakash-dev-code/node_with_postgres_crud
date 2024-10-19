const express = require("express");
const app = express();
const productRoutes = require('./routes/productRoutes')
app.use(express.json());


app.use("/api/products", productRoutes)

app.use("/", (req, res, next) => {
  res.send(
    `<html>
        <body>
            <h1>Hello, World!</h1>
            <p>This is a simple Node.js Express server.</p>
        </body>

        </html>`
  );
});



module.exports = app;
