const { HttpError, ctrlWrapper } = require("../helpers");
const mariadb = require("mariadb");
const { Brand } = require("../models/manufacture")


const pool = mariadb.createPool({
  host: process.env.SERVER,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});



const manufactures = async (req, res) => {
  const connection = await pool.getConnection();
  const data = await connection.query(`SELECT id, description name 
    FROM manufacturers
    WHERE canbedisplayed = 'True' 
    AND ispassengercar = 'True' 
    AND iscommercialvehicle = 'False' 
    ORDER BY description`);
  res.json(data);
};

const models = async (req, res) => {
  const { id } = req.params;
  const connection = await pool.getConnection();
  const data = await connection.query(
    `SELECT id, description name, constructioninterval
    FROM models
    WHERE canbedisplayed = 'True'
    AND manufacturerid = ${id}
    ORDER BY description`
  );
  res.json(data);
};

const type = async (req, res) => {
  const { id } = req.params;
  const connection = await pool.getConnection();
  const data = await connection.query(
    `SELECT id, description name, a.displaytitle ,  a.displayvalue
    FROM passanger_cars pc 
    JOIN passanger_car_attributes a on pc.id = a.passangercarid
    WHERE canbedisplayed = 'True'
    AND modelid = ${id} AND ispassengercar = 'True'`
  );

 const acc = new Map();

 data
    .map(({ id, name, displaytitle, displayvalue }) => {
      const container = {};
      container["id"] = id;
      container["name"] = name;
      container["options"] = [{ [displaytitle]: displayvalue }];
      return container;
    })
    .forEach((elem) => {
      if (acc.get(elem.id) === undefined) {
        acc.set(elem.id, elem);
      }
      const { options } = acc.get(elem.id);
      options.push(elem.options.pop());
    });

res.json(Array.from(acc.values()));
};

const search = async (req, res) => {
  const { query } = req.params;
  const connection = await pool.getConnection();
  const data = await connection.query(
    `SELECT m.description, a.OENbr FROM article_oe a 
      JOIN manufacturers m ON m.id=a.manufacturerId 
      WHERE a.datasupplierarticlenumber= ${query}`
  );
  res.json(data);
};

const brands = async (req, res, next) => {
  console.log(Brand)
  try {
    const brand = await Brand.find().where({ispassengercar: "True"}).where({iscommercialvehicle: "False"}).where({isengine: "False"});
    res.status(200).json( brand );
  } catch (error) {
    next(error);
  }
}

module.exports = {
  manufactures: ctrlWrapper(manufactures),
  models: ctrlWrapper(models),
  brands: ctrlWrapper(brands),
  type: ctrlWrapper(type),
  search: ctrlWrapper(search),
};
