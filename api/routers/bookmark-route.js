
var getcontroller=require('../controllers/bookmark-controller');

var app=global.app;

app.get('/api/bookmark', getcontroller.get);
app.put('/api/bookmark', getcontroller.post);
