const User = require('../models/user.model');

exports.user_create = function (req, res) {
    //console.log("req.body ::",req.body);
    let user = new User(
        {
            lastName: req.body.lastName,
            firstName: req.body.firstName,
            email: req.body.email,
            mobile: req.body.mobile,
            password: req.body.password,
            createdDate: new Date().getTime(),
            userType: req.body.userType
        }
    );

    User.findOne({email: req.body.email}, function (err, product) {
        console.log("product ::",product);
        if (err){
            user.save(function (err, doc) {
                if (err) {
                    return err;
                }
                res.send({message:'User Created successfully', data: doc})
            })
        } else if(product === null) {
            user.save(function (err, doc) {
                if (err) {
                    return err;
                }
                res.send({message:'User Created successfully', data: doc})
            })
        } else{
            res.send({message:'User Already created'})
        }
    })
};

exports.userlogin = function (req, res) {
    //console.log("req.body ::",req.body);
    let user = new User(
        {
            mobile: req.body.mobile,
            password: req.body.password
        }
    );

    User.findOne({mobile: req.body.mobile, password: req.body.password}, function (err, product) {
        console.log("product ::",product);
        try{
            if(product === null) {
                res.send({message:'User not found'})
            } else{
                res.send({message:'User Login Successfully', data: product})
            }
        }catch(error){
            res.send({message: error.message})
        }
    })
};

exports.user_details = function (req, res) {
    User.findById(req.params.id, function (err, product) {
        if (err) return err;
        res.send(product);
    })
};

exports.getAllUsers = function (req, res) {
    User.find({},function (err, users) {
        if (err) return err;
        res.send(users);
    })
};

exports.user_update = function (req, res) {
    console.log('here');
    User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true},
        function (err, doc) {
            if (err) return err;
            res.send({message:'User is updated.', data: doc});
        });
};

exports.user_delete = function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err, doc) {
        if (err) return err;
        res.send({message:'Deleted user '+req.params.id+' succesfully', data : doc})
    })
};