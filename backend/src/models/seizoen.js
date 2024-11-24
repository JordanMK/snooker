const mongoose = require("mongoose");

const seizoenSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  bevriesKlassement: {
    type: Boolean,
    default: false,
  },
  klassement: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "seizoenKlassementEntry"
  }],
  speeldagen: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "speeldagen"
  }],
  startdatum: {
    type: Date,
    default: Date.now,
  },
  seizoenBeeindigd: {
    type: Boolean,
    default: false,
  },
  aantalJokers: {
    type: Number,
    default: 4
  },
  isOnline: {
    type: Boolean,
    default: false,
  }
});

const seizoenModel = mongoose.model("seizoen", seizoenSchema);

exports.seizoenModel = seizoenModel;
