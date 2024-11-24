const {Schema} = require('mongoose')
const klassementEntryModel = require("../klassementEntry")

const seizoenKlassementEntry = new Schema({})

module.exports = klassementEntryModel.discriminator("seizoenKlassementEntry", seizoenKlassementEntry);
