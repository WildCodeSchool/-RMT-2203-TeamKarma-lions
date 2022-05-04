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
      `select p.satid, p.category_name, p.satname, p.int_designator, p.launch_date, p.satlat, p.satlng, p.satalt, p.request_date from ${N2yoManager.table} p inner join (select id, satid, satalt, max(request_date) as max_date from ${N2yoManager.table} group by satid) m on p.satid = m.satid and p.request_date = m.max_date;`
    );
  }

  findCategoryBySatId() {
    return this.connection.query(
      `select distinct(satid), category_name from ${N2yoManager.table} order by satid;`
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
