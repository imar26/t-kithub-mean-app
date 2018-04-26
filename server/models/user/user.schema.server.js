module.exports = function() {
    let mongoose = require('mongoose');

    let userSchema = mongoose.Schema({
        firstName: String,
        lastName: String,
        userName: String,
        email: String,
        password: String,
        roles: {
            type: String,
            enum: ['ADMIN', 'USER'],
            default: 'USER'
        },
        facebook: {
            id: String,
            token: String
        },
        google: {
	        id: String,
	        token: String
        },
        resetPasswordToken: String,
        resetPasswordExpires: Date, 
        cartId: {type : mongoose.Schema.Types.ObjectId,
                ref: 'cartModel'},
        orders: [{type : mongoose.Schema.Types.ObjectId,
                ref: 'orderModel'}],   
        dateCreated: {
			type: Date,
			default: Date.now
		}
    }, {collection: 'UserDB'});

    return userSchema;
};