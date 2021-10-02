const Series = require("../Schemas/seriesModel");
const Subs = require("../Schemas/subscriptionsModel")

exports.getAllSeries = function () {
  return new Promise((resolve, reject) => {
    Series.find({}, function (err, data) {
      err ? reject(err) : resolve(data);
    });
  });
};

exports.updateSeries = function (id, obj) {
  return new Promise((resolve, reject) => {
    Series.findByIdAndUpdate(
      id,
      {
        name: obj.name,
        premiered: obj.premiered,
        genres: obj.genres,
        img: obj.img,
      },
      function (err) {
        err ? reject(err) : resolve("The series has been updated");
      }
    );
  });
};

exports.addSeries = function (obj) {
  return new Promise((resolve, reject) => {
    let series = new Series({
      name: obj.name,
      premiered: obj.premiered,
      genres: obj.genres,
      img: obj.img,
    });
    series.save(function (err, data) {
      err ? reject(err) : resolve(data);
    });
  });
};

exports.deleteSeries = function (id) {
  return new Promise((resolve, reject) => {
    Series.findByIdAndDelete(id, function (err) {
      if(err){
        reject(err);
      }else{
        Subs.deleteMany({
          'series_id' : {
            $in : [id]
          }, function(err ,result){
            if(err){
              reject(err)
            }else{
              resolve("series deleted")
            }
          }
        })
      }
    });
  });
};
