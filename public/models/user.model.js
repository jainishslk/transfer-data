const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = new Schema({
    lastName: {type: String, required: false},
    firstName: {type: String, required: false},
    email: {type: String, required: true},
    mobile: {type: String, required: true},
    password: {type: String, required: true},
    createdDate: { type: Number, select: false},
    userType: { type: String, select: true},
});


UserSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
}); 

//Export the model
module.exports = mongoose.model('users', UserSchema);