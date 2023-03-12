const {Schema, model} = require("mongoose");
const {handleMongooseError} = require("../helpers");
const Joi = require("joi");

const contactsSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const updateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
  favorite: Joi.boolean(), 
});

const contactSchema = Schema( {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    }
  }, {versionKey: false})

const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required().error(new Error("missing field favorite"))
})

const schemas = {
  contactsSchema,
  updateSchema,
  updateFavoriteSchema,
}

contactSchema.post("save", handleMongooseError);

const Contact = model("contact", contactSchema)


module.exports = {
    Contact,
    schemas,
}