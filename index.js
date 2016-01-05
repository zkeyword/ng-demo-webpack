var fs      = require('fs'),
	express = require('express'),
	app     = express(),
	Mock    = require('mockjs');

app.get('/', function(req, res) {
    fs.readFile(__dirname + '/index.html', 'utf8', function(err, text){
        res.send(text);
    });
});
//app.use(express.static('public'));
app.use('/dest', express.static('dest'));

app.post('/grid', function (req, res) {
	var Random = Mock.Random,
		data   = Mock.mock({
			'rows|10': [{
				'id': '@integer(60, 1000)',
				'name': '@cname',
				'email': '@email',
				'address': '@region',
				'time': '@datetime(yyyy-MM-dd)'
			}],
			'total': 50
		});
	
	res.send( JSON.stringify(data, null, 4) );
});


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});