const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

// eslint-disable-next-line no-useless-escape

const manufSchema = Joi.object({
  id: Joi.string().required(),
  canbedisplayed: Joi.bool().required(),
  description: Joi.string().required(),
  img: Joi.string().required(),
});

const manufactureSchema = Schema(
  {
    id: {
      type: String,
      required: [true, "ID is required"],
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      unique: true,
    },
    img: {
      type: String,
      default: "no image",
    },
  },
  { versionKey: false }
);

const schemas = {
  manufactureSchema,
};

manufactureSchema.post("save", handleMongooseError);

const Brand = model("manufacture", manufactureSchema);

module.exports = {
  Brand,
  schemas,
};
