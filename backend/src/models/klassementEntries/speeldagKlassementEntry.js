const {Schema} = require('mongoose');
const klassementEntryModel = require("../klassementEntry")

const speeldagKlassementEntry = new Schema({
    jokerGebruikt: {
		type: Boolean,
		default: false,
		require: false,
	},
	SchiftingsvraagAntwoord: {
		type: Number,
		require: false,
	}
})

module.exports = klassementEntryModel.discriminator("speeldagKlassementEntry", speeldagKlassementEntry);
