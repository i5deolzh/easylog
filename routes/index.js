var express = require('express');
var router = express.Router();

var moment = require('moment');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var ContentSchema = new Schema({
    content: {
        type: String
    },
    tags: {
        type: String
    },
    created: {
        type: Date,
        'default': Date.now
    }
});
mongoose.model('Content', ContentSchema);
var Content = mongoose.model('Content');

mongoose.connect('mongodb://localhost:27017/mylog', function(err){
    if (err) {
        console.error('connect to %s error: ', 'mongodb://localhost:27017/mylog', err.message);
        process.exit(1);
    }
});

router.get('/', function(req, res){
    res.render('index', {
        created: moment().format("YYYY-MM-DD HH:mm")
    });
});

router.get('/latest', function(req, res){
    Content.find({}, function(err, docs){
        res.send({
            list: docs
        });
    });
});

router.post('/new', function(req, res){
    var content = new Content();
    content.content = req.body.content;
    content.tags = req.body.tags;
    content.created = req.body.created;
    content.save(function(err, m){
        if (err) {
            res.send({
                error: 'err'
            });
        }
        else {
            res.send({
                error: 'ok'
            });
        }
    });
});

module.exports = router;