const models = require("../models");

class N2yoController {
  // static browse = (req, res) => {
  //   models.n2yo
  //     .findAll()
  //     .then(([rows]) => {
  //       res.send(rows);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       res.sendStatus(500);
  //     });
  // };

  static findLastRecord = (req, res) => {
    console.log("findLastRecord");
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
    console.log("findCategoryBySatId");
    return models.n2yo
      .findCategoryBySatId()
      .then(([rows]) => {
        res.send(rows);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // static read = (req, res) => {
  //   models.n2yo
  //     .find(req.params.id)
  //     .then(([rows]) => {
  //       if (rows[0] == null) {
  //         res.sendStatus(404);
  //       } else {
  //         res.send(rows[0]);
  //       }
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       res.sendStatus(500);
  //     });
  // };

  // static edit = (req, res) => {
  //   const item = req.body;

  //   // TODO validations (length, format...)

  //   item.id = parseInt(req.params.id, 10);

  //   models.item
  //     .update(item)
  //     .then(([result]) => {
  //       if (result.affectedRows === 0) {
  //         res.sendStatus(404);
  //       } else {
  //         res.sendStatus(204);
  //       }
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       res.sendStatus(500);
  //     });
  // };

  // static add = (req, res) => {
  //   const item = req.body;

  //   // TODO validations (length, format...)

  //   models.n2yo
  //     .insert(item)
  //     .then(([result]) => {
  //       res.status(201).send({ ...item, id: result.insertId });
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       res.sendStatus(500);
  //     });
  // };

  // static delete = (req, res) => {
  //   models.n2yo
  //     .delete(req.params.id)
  //     .then(() => {
  //       res.sendStatus(204);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       res.sendStatus(500);
  //     });
  // };
}

// load routines
// const populateDatabase = require("./N2yoListener");

// setInterval(populateDatabase, 5 * 1000);

// const boloss = N2yoController.findLatest();
// console.log(boloss);

module.exports = N2yoController;
