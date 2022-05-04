const models = require("../models");

class N2yoController {
  static findLastRecord = (req, res) => {
    return models.n2yo
      .findLatest()
      .then(([rows]) => {
        res.send(rows);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  static findCategoryBySatId = (req, res) => {
    return models.n2yo
      .findCategoryBySatId()
      .then(([rows]) => {
        res.send(rows);
      })
      .catch((err) => {
        console.error(err);
      });
  };
}

module.exports = N2yoController;
