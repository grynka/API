const { model } = require("mongoose");
const { param } = require("../app");
const Auto = require("../data/config");
const { HttpError, ctrlWrapper } = require("../helpers");
const { Brand } = require("../models/auto");
const TecDoc = require("../data/config");



const manuf = async (req, res) => {
  console.log(TecDoc)
  const data = await Brand.find({})
  res.json(data);
};

const manufactures = async (req, res) => {
  const [data] = await Auto.query(
    `SELECT id, description name 
    FROM manufacturers 
    WHERE canbedisplayed = 'True' 
    AND ispassengercar = 'True' 
    AND iscommercialvehicle = 'False' 
    ORDER BY description`
  );
  res.json(data);
};

const models = async (req, res) => {
  const { id } = req.params;
  const [data] = await Auto.query(
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
  const [data] = await Auto.query(
    `SELECT DISTINCT id, description name, a.displaytitle ,  a.displayvalue
    FROM passanger_cars pc 
    JOIN passanger_car_attributes a on pc.id = a.passangercarid
    WHERE canbedisplayed = 'True'
    AND modelid = ${id} AND ispassengercar = 'True'`
  );
//const modelsId = Array.from(new Set( data.map(model => model.id, model.name )))

let models = [];

data.forEach(({id, name, displaytitle, displayvalue} = element) => {
  const option = {id, name, [displaytitle]: displayvalue};
  if (models.id !== option.id) {
    console.log(option.id)
  }
  else 
  models = {...models, ...option}
 //console.log(models)
});

//modelsId.forEach(function(model){
  //  let types = (data.filter(item => item.id === model))
 //   models = [model, ...((types.map(type =>
  //     (type.id, type.name, {[type.displaytitle]: type.displayvalue,})
  //  )))]
 //   console.log(models)
//  })

//const models = data.filter(model => model.id === modelsId[0])

  res.json(models);
};

const search = async (req, res) => {
  const { query } = req.params;
  const [data] = await Auto.query(
    `SELECT m.description, a.OENbr FROM article_oe a 
      JOIN manufacturers m ON m.id=a.manufacturerId 
      WHERE a.datasupplierarticlenumber= ${query}`
  );
  res.json(data);
};

module.exports = {
  manufactures: ctrlWrapper(manufactures),
  models: ctrlWrapper(models),
  type: ctrlWrapper(type),
  search: ctrlWrapper(search),
  manuf: ctrlWrapper(manuf),

};
