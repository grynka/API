const {Schema, model} = require("mongoose");
const {handleMongooseError} = require("../helpers");
const Joi = require("joi");

const avtosSchema = Joi.object({
id: {
  type: String,
},
fulldescription: {
  type: String,
}
});

const updateSchema = Joi.object({

});

const avtoSchema = Schema( {
  id: {
    type: String,
  },
  fulldescription: {
    type: String,
  }
  }, {versionKey: false})

const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required().error(new Error("missing field favorite"))
})

const schemas = {
  avtoSchema,
  updateSchema,
  updateFavoriteSchema,
}

avtoSchema.post("save", handleMongooseError);

const Brand = model("manufacture", avtoSchema)
const Model = model("model", avtoSchema)


module.exports = {
  Brand,
  Model,
  schemas,
}