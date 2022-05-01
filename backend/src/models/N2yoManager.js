const AbstractManager = require("./AbstractManager");

class N2yoManager extends AbstractManager {
  static table = "n2yo";

  insert(item) {
    return this.connection.query(
      `insert into ${N2yoManager.table} (request_date, category_name, obslat, obslng, satid, satname, int_designator, launch_date, satlat, satlng, satalt) values (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        item.requestDate,
        item.categoryName,
        item.obsLat,
        item.obsLng,
        item.satId,
        item.satName,
        item.intDesignator,
        item.launchDate,
        item.satLat,
        item.satLng,
        item.satAlt,
      ]
    );
  }

  findLatest() {
    return this.connection.query(
      `select * from ${N2yoManager.table} order by request_date desc limit 1`
    );
  }

  // Field          | Type         | Null | Key | Default | Extra          |
  // +----------------+--------------+------+-----+---------+----------------+
  // | id             | int          | NO   | PRI | NULL    | auto_increment |
  // | request_date   | datetime     | NO   |     | NULL    |                |
  // | category_name  | varchar(100) | YES  |     | NULL    |                |
  // | satid          | int          | NO   |     | NULL    |                |
  // | satname        | varchar(255) | NO   |     | NULL    |                |
  // | int_designator | varchar(255) | YES  |     | NULL    |                |
  // | launch_date    | date         | YES  |     | NULL    |                |
  // | satlat         | double(12,8) | YES  |     | NULL    |                |
  // | satlng         | double(12,8) | YES  |     | NULL    |                |
  // | satalt         | double(12,4) | YES  |     | NULL    |                |

  // update(item) {
  //   return this.connection.query(
  //     `update ${ItemManager.table} set title = ? where id = ?`,
  //     [item.title, item.id]
  //   );
  // }
}

module.exports = N2yoManager;
