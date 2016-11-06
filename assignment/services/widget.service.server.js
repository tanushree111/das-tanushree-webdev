module.exports = function(app) {
    var multer = require('multer'); // npm install multer --save
    var mime = require('mime'); // npm install mime --save
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, __dirname+'/../../public/assignment/uploads')
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + '.' + mime.extension(file.mimetype));
        }
    });
    var upload = multer({ storage: storage });
    var widgets =
        [
            {"_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
            {"_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            {
                "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"
            },
            {"_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            {"_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            {
                "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E"
            },
            {"_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];
    var widgetTypes =
        [
            {"widgetType": "HEADER"},{"widgetType": "LABEL"},{"widgetType": "HTML"},{"widgetType": "TEXT INPUT"},
            {"widgetType": "LINK"},{"widgetType": "BUTTON"},{"widgetType": "IMAGE"},{"widgetType": "YOUTUBE"},
            {"widgetType": "DATA TABLE"},{"widgetType": "REPEATER"}
        ];

    app.post('/api/page/:pageId/widget', createWidget);
    app.get('/api/page/:pageId/widget', findAllWidgetsForPage);
    app.get('/api/widget/:widgetId', findWidgetById);
    app.put('/api/widget/:widgetId', updateWidget);
    app.delete('/api/widget/:widgetId', deleteWidget);
    app.get('/api/widgetTypes', getWidgetTypes);
    app.post('/api/upload', upload.single('myFile'), uploadImage);
    app.put('/api/page/:pageId/widget', sortWidgets);



    function findAllWidgetsForPage(req, res){
        var pageId = req.params.pageId;
        var result = [];
        for(var w in widgets){
            if(widgets[w].pageId === pageId){
                result.push(widgets[w]);
            }
        }
        res.json(result);
    }

    function findWidgetById(req, res){
        var wgid = req.params.widgetId;
        for(var w in widgets){
            if(widgets[w]._id === wgid){
                res.send(widgets[w]);
                return;
            }
        }
        res.send(0);
    }

    function createWidget(req, res){
        var widget = req.body;
        var pageId = req.params.pageId;
        widget._id = (new Date()).getTime().toString();
        widget.pageId = pageId;
        widgets.push(widget);

        res.send(widgets);

    }

    function updateWidget(req, res){
        var widget = req.body;
        var wgid = req.params.widgetId;
        for(var w in widgets){
            if(widgets[w]._id === wgid){
                widgets[w] = widget;
            }
        }
        res.send(200);
    }


    function deleteWidget(req, res){
        var wgid = req.params.widgetId;

        for(var w in widgets){
            if(widgets[w]._id === wgid){
                widgets.splice(w, 1);
            }
        }
        res.send(200);
    }

    function getWidgetTypes(req, res){
        res.json(widgetTypes);
    }

    function uploadImage(req, res) {
        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var pageId = req.body.pageId;
        var widgetId = req.body.widgetId;
        var width = req.body.width;
        var myFile = req.file;

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;
        if(widgetId != null && widgetId != "") {
            for (var w in widgets) {
                if (widgets[w]._id === widgetId) {
                    widgets[w].url = '/assignment/uploads/' + filename;
                    widgets[w].width = width;
                    break;
                }
            }
        }else{
            var widget = {}
            widget._id = (new Date()).getTime().toString();
            widgetId = widget._id;
            widget.pageId = pageId;
            widget.widgetType = "IMAGE";
            widget.url = '/assignment/uploads/' + filename;
            widget.width = width;
            widgets.push(widget);
        }
            var url = '../assignment/index.html#/user/' + userId + '/website/' + websiteId + '/page/' + pageId + '/widget/' + widgetId;
            res.redirect(url);

    }

    function sortWidgets(req, res){
        var initial = req.query.initial;
        var final = req.query.final;
        var pageId = req.params.pageId;
        var len = widgets.length;
        var result = [];
        while(len--){
            if(widgets[len].pageId === pageId){
                result.push(widgets[len]);
                widgets.splice(len, 1);
            }
        }
        result.reverse().splice(final, 0, result.splice(initial, 1)[0]);
        widgets = widgets.concat(result);
    }

}