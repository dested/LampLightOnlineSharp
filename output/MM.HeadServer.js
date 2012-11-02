////////////////////////////////////////////////////////////////////////////////
// MM.HeadServer.HeadServer
var $MM_HeadServer_HeadServer = function() {
	this.$__dirname = '/usr/local/src/lamp';
	this.$gateways = [];
	this.$indexForSites = [];
	this.$indexPageData = null;
	this.$oldGateways = [];
	this.$oldIndex = [];
	this.$siteIndex = 0;
};
$MM_HeadServer_HeadServer.$main = function() {
	new $MM_HeadServer_HeadServer();
};
Type.registerClass(global, 'MM.HeadServer.HeadServer', $MM_HeadServer_HeadServer, Object);
$MM_HeadServer_HeadServer.$main();
