const Series = require("../Schemas/seriesModel");
const Subs = require("../Schemas/subscriptionsModel");

exports.getAllSeries = function () {
  return new Promise((resolve, reject) => {
    Series.find({}, function (err, data) {
      err ? reject(err) : resolve(data);
    });
  });
};

exports.getSeries = function (id) {
  return new Promise((resolve, reject) => {
    Series.findById(id, function (err, data) {
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
        err ? reject(err) : resolve({text : "The series has been updated" , serie : obj});
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
    series.save(function (err) {
      err ? reject(err) : resolve({text : "Serie has been added" , serie : series});
    });
  });
};

exports.deleteSeries = function (id) {
  return new Promise((resolve, reject) => {
    Series.findByIdAndDelete(id, function (err, data) {
      if (err) {
        reject(err);
      } else {
        Subs.deleteMany({ seriesId: id }, (error) => {
          error ? reject(error) : resolve("Series has ben deleted");
        });
      }
    });
  });
};
