module.exports = function(app, model) {
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
    app.post('/api/upload', upload.single('myFile'), uploadImage);
    app.post('/api/page/:pageId/widget', createWidget);
    app.get('/api/page/:pageId/widget', findAllWidgetsForPage);
    app.get('/api/widget/:widgetId', findWidgetById);
    app.put('/api/widget/:widgetId', updateWidget);
    app.delete('/api/widget/:widgetId', deleteWidget);
    app.get('/api/widgetTypes', getWidgetTypes);
    app.put('/api/page/:pageId/widget', sortWidgets);



    function findAllWidgetsForPage(req, res){
        var pageId = req.params.pageId;
        model
            .widgetModel
            .findAllWidgetsForPage(pageId)
            .then(
                function(widgets){
                    if(widgets) {
                        res.json(widgets);
                    }else{
                        res.send('0');
                    }
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findWidgetById(req, res) {
        var wgid = req.params.widgetId;
        model
            .widgetModel
            .findWidgetById(wgid)
            .then(
                function (widget) {
                    if (widget) {
                        res.json(widget);
                    } else {
                        res.send('0');
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function createWidget(req, res){
        var widget = req.body;
        var pageId = req.params.pageId;
        //widget._page = pageId;
        model
            .widgetModel
            .createWidget(pageId, widget)
            .then(
                function(newWidget){
                    res.send(newWidget);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );

    }

    function updateWidget(req, res){
        var widget = req.body;
        var wgid = req.params.widgetId;
        model
            .widgetModel
            .updateWidget(wgid, widget)
            .then(
                function(status){
                    res.sendStatus(200);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }


    function deleteWidget(req, res){
        var wgid = req.params.widgetId;
        model
            .widgetModel
            .deleteWidget(wgid)
            .then(
                function(status){
                    res.sendStatus(200);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }

    function getWidgetTypes(req, res){
        //res.json(widgetTypes);
        var types = model
            .widgetModel
            .findWidgetTypes()
        res.json(types);
            /*.then(
                function(types){
                    if(types) {
                        res.json(types);
                    }else{
                        res.send('0');
                    }
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );*/
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
            model
                .widgetModel
                .findWidgetById(widgetId)
                .then(
                    function (widget) {
                        if (widget) {
                            widget.url = '/assignment/uploads/' + filename;
                            widget.width = width;
                            model
                                .widgetModel
                                .updateWidget(widgetId, widget)
                                .then(
                                    function(status){
                                        var url = '../assignment/index.html#/user/' + userId + '/website/' + websiteId + '/page/' + pageId + '/widget/' + widgetId;
                                        res.redirect(url);
                                    }
                                );
                        } else {
                            var widget = {};
                            widget.pageId = pageId;
                            widget.widgetType = "IMAGE";
                            widget.url = '/assignment/uploads/' + filename;
                            widget.width = width;
                            model
                                .widgetModel
                                .createWidget(pageId, widget)
                                .then(
                                    function(newWidget){
                                        var url = '../assignment/index.html#/user/' + userId + '/website/' + websiteId + '/page/' + pageId + '/widget/' + widgetId;
                                        res.redirect(url);
                                    }
                                );
                        }
                    },
                    function (error) {

                    }
                );

        }else{
            var widget = {};
            widget.pageId = pageId;
            widget.widgetType = "IMAGE";
            widget.url = '/assignment/uploads/' + filename;
            widget.width = width;
            model
                .widgetModel
                .createWidget(pageId, widget)
                .then(
                    function(newWidget){
                        var url = '../assignment/index.html#/user/' + userId + '/website/' + websiteId + '/page/' + pageId + '/widget/' + widgetId;
                        res.redirect(url);
                    }
                );
        }

    }

    function sortWidgets(req, res){
        var initial = req.query.initial;
        var final = req.query.final;
        var pageId = req.params.pageId;

        model
            .widgetModel
            .reorderWidget(pageId, initial, final)
            .then(
                function(status){
                    res.sendStatus(200);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }

}