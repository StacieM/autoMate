var exports = module.exports = {}
 
exports.signup = function(req, res) {
    res.sendFile(path.join(__dirname + "/../public/newuser.html"));
}

exports.signin = function(req, res){
    res.sendFile(path.join(__dirname + "/../public/signIn.html"));
}

exports.index = function(req, res){
    res.sendFile(path.join(__dirname + "/../public/index.html"));
}

exports.schedule = function(req, res){
    res.sendFile(path.join(__dirname + "/../public/schedule.html"));
}

exports.confirmation = function(req, res){
    res.sendFile(path.join(__dirname + "/../public/confirmation.html"));
}

exports.contact = function(req, res){
    res.sendFile(path.join(__dirname + "/../public/Contact.html"));
}

exports.logout = function(req, res) {
    req.session.destroy(function(err) {
        res.redirect('/');
    });
}