require('./mscorlib.debug.js');require('./CommonAPI.js');require('./ServerAPI.js');require('./CommonLibraries.js');require('./CommonServerLibraries.js');require('./Models.js');
var fs = require('fs');
var http = require('http');
////////////////////////////////////////////////////////////////////////////////
// MM.HeadServer.HeadServer
var $MM_HeadServer_HeadServer = function() {
	this.$__dirname = '/usr/local/src/lamp/';
	this.$gateways = [];
	this.$indexForSites = [];
	this.$indexPageData = null;
	this.$oldGateways = [];
	this.$oldIndex = [];
	this.$pubsub = null;
	this.$qManager = null;
	this.$siteIndex = 0;
	this.$qManager = new CommonServerLibraries.Queue.QueueManager('Head1', new CommonServerLibraries.Queue.QueueManagerOptions([new CommonServerLibraries.Queue.QueueWatcher('HeadServer', null), new CommonServerLibraries.Queue.QueueWatcher('Head1', null)], ['GatewayServer']));
	fs.readFile(this.$__dirname + '/index.html', Function.mkdel(this, this.ready));
	this.$pubsub = new CommonServerLibraries.Queue.PubSub(Function.mkdel(this, function() {
		this.$pubsub.subscribe('PUBSUB.GatewayServers', Function.mkdel(this, function(message) {
			this.$indexForSites.add(this.$indexPageData.replaceAll('{{gateway}}', message));
			this.$gateways.add(message);
		}));
	}));
	http.createServer(Function.mkdel(this, this.$handlerWS)).listen(8844);
	setInterval(Function.mkdel(this, this.$pollGateways), 1000);
	this.$pollGateways();
};
$MM_HeadServer_HeadServer.prototype = {
	$pollGateways: function() {
		this.$pubsub.publish('PUBSUB.GatewayServers.Ping', '');
		if (this.$indexForSites.length > 0) {
			this.$oldIndex = this.$indexForSites;
		}
		if (this.$gateways.length > 0) {
			this.$oldGateways = this.$gateways;
		}
		this.$indexForSites = [];
		this.$gateways = [];
		this.$siteIndex = 0;
	},
	$handlerWS: function(request, response) {
		if (this.$oldGateways.length > 0) {
			var inj = this.$siteIndex++ % this.$oldIndex.length;
			response.end(this.$oldGateways[inj]);
			return;
		}
		response.end();
	},
	$handler: function(request, response) {
		var dict = {};
		dict['Content-Type'] = 'text/html';
		dict['Access-Control-Allow-Origin'] = '*';
		if (this.$oldIndex.length > 0) {
			response.writeHead(200, dict);
			var inj = this.$siteIndex++ % this.$oldIndex.length;
			response.end(this.$oldIndex[inj]);
		}
		else {
			response.writeHead(200, dict);
			response.end();
		}
	},
	ready: function(error, content) {
		this.$indexPageData = content.toString();
		http.createServer(Function.mkdel(this, this.$handler)).listen(80);
	}
};
$MM_HeadServer_HeadServer.$main = function() {
	new $MM_HeadServer_HeadServer();
};
Type.registerClass(global, 'MM.HeadServer.HeadServer', $MM_HeadServer_HeadServer, Object);
$MM_HeadServer_HeadServer.$main();
