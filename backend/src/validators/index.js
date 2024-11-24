const joi = require('joi');

// These are still schemas that are missing, but were not implemented...

const createSeizoenSchema = joi.object({
  name: joi.string().min(5).max(255).required(),
  bevriesKlassement: joi.boolean(),
  klassement: joi.array().items(joi.string().hex().length(24)),
  speeldagen: joi.array().items(joi.string().hex().length(24)),
  startdatum: joi.date().required(),
  seizoenBeeindigd: joi.boolean(),
  aantalJokers: joi.number()
});

const createSpeeldagSchema = joi.object({
  schiftingsvraag: joi.string().required(),
  schiftingsantwoord: joi.number().required(),
  wedstrijden: joi.array().items(joi.string().hex().length(24)),
  speeldagVotes: joi.array().items(joi.string().hex().length(24)),
  klassement: joi.array().items(joi.string().hex().length(24)),
  startDatum: joi.date().required(),
  eindDatum: joi.date().required(),
});

const createSpeeldagVoteSchema = joi.object({
  user: joi.string().hex().length(24),
  jokerGebruikt: joi.bool(),
  SchiftingsvraagAntwoord: joi.number(),
  wedstrijdVotes: joi.array(),
});

const createUserSchema = joi.object({
  username: joi.string().min(1).max(100).required(),
  email: joi.string().min(1).max(100).required().email(),
  password: joi.string().min(1).max(100).required(),
});

const updateUserSchema = joi.object({
  betaald: joi.boolean(),
  username: joi.string().min(1).max(100),
  email: joi.string().email().min(1).max(100),
  password: joi.string().min(6).max(255),
  aantalJokers: joi.number().integer().min(0),
  jokersGebruikt: joi.number().integer().min(0),
});

const resultaat = [1, 2, 3, 0];

const createWedstrijdSchema = joi.object({
  datum: joi.date().required(),
  resultaat: joi.number().valid(...resultaat),
  thuis: joi.string().required(),
  uit: joi.string().required(),
});

const createWedstrijdVoteSchema = joi.object({
  vote: joi
    .number()
    .valid(...resultaat)
    .required(),
  wedstrijd: joi.string().hex().length(24).required(),
});

module.exports.schemas = {
  createSeizoenSchema: createSeizoenSchema,
  createSpeeldagSchema: createSpeeldagSchema,
  createSpeeldagVoteSchema: createSpeeldagVoteSchema,
  createUserSchema: createUserSchema,
  updateUserSchema: updateUserSchema,
  createWedstrijdSchema: createWedstrijdSchema,
  createWedstrijdVoteSchema: createWedstrijdVoteSchema
}
