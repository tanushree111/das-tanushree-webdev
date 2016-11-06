module.exports = function(app) {
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
        var result = [];
        for(var p in pages){
            if(pages[p].websiteId === websiteId){
                result.push(pages[p]);
            }
        }
        res.json(result);
    }

    function findPageById(req, res){
        var pid = req.params.pageId;
        for(var p in pages){
            if(pages[p]._id === pid){
                res.send(pages[p]);
                return;
            }
        }
        res.send(0);
    }

    function createPage(req, res){
        var page = req.body;
        var websiteId = req.params.websiteId;
        page._id = (new Date()).getTime().toString();
        page.websiteId = websiteId;
        pages.push(page);

        res.send(pages);

    }

    function updatePage(req, res){
        var page = req.body;
        var pid = req.params.pageId;
        for(var p in pages){
            if(pages[p]._id === pid){
                pages[p] = page;
            }
        }
        res.send(200);
    }


    function deletePage(req, res){
        var pid = req.params.pageId;

        for(var p in pages){
            if(pages[p]._id === pid){
                pages.splice(p, 1);
            }
        }
        res.send(200);
    }


}