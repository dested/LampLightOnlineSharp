require('./mscorlib.debug.js');require('./CommonLibraries.js');require('./CommonServerLibraries.js');require('./Models.js');
require('./mscorlib.debug.js');require('./CommonLibraries.js');require('./CommonServerLibraries.js');require('./Models.js');
////////////////////////////////////////////////////////////////////////////////
// HeadServer.HeadServer
var $HeadServer_HeadServer = function() {
	this.$__dirname = '/usr/local/src/lamp';
	this.$gateways = [];
	this.$indexForSites = [];
	this.$indexPageData = null;
	this.$oldGateways = [];
	this.$oldIndex = [];
	this.$siteIndex = 0;
};
$HeadServer_HeadServer.$main = function() {
	new $HeadServer_HeadServer();
};
Type.registerClass(global, 'HeadServer.HeadServer', $HeadServer_HeadServer, Object);
$HeadServer_HeadServer.$main();
