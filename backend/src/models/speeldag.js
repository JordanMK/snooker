const mongoose = require('mongoose');

const speeldagenSchema = new mongoose.Schema({
  schiftingsvraag: {
    type: String,
    required: true,
  },
  schiftingsantwoord: {
    type: Number,
    required: true,
  },
  wedstrijden: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'wedstrijd',
    },
  ],
  speeldagVotes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'speeldagVote',
    },
  ],
  klassement: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'speeldagKlassementEntry',
    },
  ],
  startDatum: {
    type: Date,
    required: true,
  },
  eindDatum: {
    type: Date,
    required: true,
  },
  isOnline: {
    type: Boolean,
    default: false,
  },
});

const speeldagenModel = mongoose.model('speeldagen', speeldagenSchema);

exports.speeldagenModel = speeldagenModel;
