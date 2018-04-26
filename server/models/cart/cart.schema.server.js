module.exports = function () {
    let mongoose = require('mongoose');

    let cartSchema = mongoose.Schema({
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'userModel'
        },
        events: [{
            eventId: { type: String },
            data:
                {
                    packageType: { type: String },
                    price: { type: String },
                    noTickets: { type: String },
                    total: { type: String }
                }

        }],
        dateCreated: {
            type: Date,
            default: Date.now
        }
    }, { collection: 'CartDB' });

    return cartSchema;
};