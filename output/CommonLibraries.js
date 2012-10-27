////////////////////////////////////////////////////////////////////////////////
// CommonLibraries.Guid
var $CommonLibraries_Guid = function() {
};
$CommonLibraries_Guid.newGuid = function() {
	var guid = '';
	for (var i = 0; i < 12; i++) {
		guid += String.fromCharCode(parseInt((Math.random() * 26 + 65).toString()));
	}
	return guid;
};
////////////////////////////////////////////////////////////////////////////////
// CommonLibraries.Help
var $CommonLibraries_Help = function() {
};
$CommonLibraries_Help.sanitize = function(name, value) {
	if (typeof(value) == 'function') {
		return null;
	}
	if (name.indexOf(String.fromCharCode(95)) !== 0 && name.toLowerCase() !== 'socket' && name.toLowerCase() !== 'fiber' && name.toLowerCase() !== 'debuggingsocket') {
		return value;
	}
	return null;
};
Type.registerClass(global, 'CommonLibraries.Guid', $CommonLibraries_Guid, Object);
Type.registerClass(global, 'CommonLibraries.Help', $CommonLibraries_Help, Object);
