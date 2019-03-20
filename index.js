var elastic = require("elasticsearch");

var client = new elastic.Client({
  host: "http://localhost:9200",
  log: "trace"
});

var fs = require("fs");
// for modify
// var dirname = "F:/some setup/elastic/6.5.4/bin/data/";
// var dirname_new = "F:/some setup/elastic/6.5.4/bin/data_customrouting/";

//for index
var dirname = "F:/some setup/elastic/6.5.4/bin/data_customrouting/";
async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}
Array.prototype.forEach = function (callback) {
  // this represents our array
  for (let index = 0; index < this.length; index++) {
    // We call the callback for each entry
    callback(this[index], index, this);
  }
};
const waitFor = (ms) => new Promise(r => setTimeout(r, ms));
fs.readdir(dirname, function(err, filenames) {
  if (err) {
    throw err;
  }
  /* modify data in json file */
  // const start = async() => {
  //   await asyncForEach(filenames, async(filename) => {
  //     await waitFor(50);
  //     fs.readFile(dirname + filename, "utf-8", function(err, content) {
  //       content = content.replace(/mydb/g, "customrouting");
  //       fs.writeFile(dirname_new + filename, content, (err)=> {
  //         if(err) {
  //           return console.log(err);
  //         }
  //         console.log("file " + filename + " successed!");
  //       });
      
  //     });
  //   });
  // }
  // start();
  /* end modify data in json file */





  /* insert data into elasticsearch */
  const start = async() => {
    await asyncForEach(filenames, async(filename) => {
      await waitFor(50);
      console.log(filename);
      fs.readFile(dirname + filename, "utf-8", function(err, content) {
        client.bulk({
          body:content
        });
      });
    });
  }
  start();
  /* end insert */
});
