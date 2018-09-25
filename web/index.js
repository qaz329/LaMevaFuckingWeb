const express = require('express');
const app = express();
const port = 3000;

app.use(express.static(__dirname + '/public/'));

app.listen(port, function(){
	console.log('[INFO] Servidor web escoltant al port %d',port);
});