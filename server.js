var express = require("express");
var app = express();
app.use(express.static(__dirname + "/"));
if (process.env.NODE_ENV === "production") {
  app.use(express.static("build"));
  app.get("*", (req, res) => {
    res.sendFile(`${__dirname}/build/index.html`);
  });
}
/* var port = process.env.PORT || 8000;
app.listen(port, function () {
  console.log("App is running on port " + port);
}); */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
