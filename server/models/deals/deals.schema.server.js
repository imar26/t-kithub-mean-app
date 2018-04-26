module.exports = function() {
    let mongoose = require('mongoose');

    let dealsSchema = mongoose.Schema({
        description : { type: String },
        code : { type: String }, 
        value : { type: Number},
        quantity : { type : Number },
        dateCreated: {
			type: Date,
			default: Date.now
		}
    }, {collection: 'DealsDB'});

    return dealsSchema;
};