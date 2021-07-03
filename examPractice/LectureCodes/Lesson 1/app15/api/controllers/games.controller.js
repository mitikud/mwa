module.exports.gamesGetAll = function (req, res) {
    console.log("gamesGetAll request recieved");
    res.status(200).json({"jsonData": true});
};