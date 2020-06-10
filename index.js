const Sass = require("./sass");
const config = require("./config.json");

for (let conf of config.sass) {
    new Sass(conf);
}
