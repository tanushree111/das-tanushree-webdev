module.exports = function(app, model) {
    var pages =
        [
            { "_id": "321", "name": "Post 1", "websiteId": "456" },
            { "_id": "432", "name": "Post 2", "websiteId": "456" },
            { "_id": "543", "name": "Post 3", "websiteId": "456" }
        ];

    app.post('/api/website/:websiteId/page', createPage);
    app.get('/api/website/:websiteId/page', findAllPagesForWebsite);
    app.get('/api/page/:pageId', findPageById);
    app.put('/api/page/:pageId', updatePage);
    app.delete('/api/page/:pageId', deletePage);


    function findAllPagesForWebsite(req, res){
        var websiteId = req.params.websiteId;
        model
            .pageModel
            .findAllPagesForWebsite(websiteId)
            .then(
                function(pages){
                    if(pages) {
                        res.json(pages);
                    }else{
                        res.send('0');
                    }
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findPageById(req, res){
        var pid = req.params.pageId;
        model
            .pageModel
            .findPageById(pid)
            .then(
                function(page){
                    if(page) {
                        res.json(page);
                    }else{
                        res.send('0');
                    }
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }

    function createPage(req, res){
        var page = req.body;
        var websiteId = req.params.websiteId;
        //page._website = websiteId;
        model
            .pageModel
            .createPage(websiteId, page)
            .then(
                function(newPage){
                    res.send(newPage);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );

    }

    function updatePage(req, res){
        var page = req.body;
        var pid = req.params.pageId;
        model
            .pageModel
            .updatePage(pid, page)
            .then(
                function(status){
                    res.sendStatus(200);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }


    function deletePage(req, res){
        var pid = req.params.pageId;
        model
            .pageModel
            .deletePage(pid)
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