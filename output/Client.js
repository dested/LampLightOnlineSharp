
// Client.ClientManager
var $Client_ClientManager = function(gatewayServerAddress) {
	this.$canvasHeight = 0;
	this.$canvasWidth = 0;
	this.$gameCanvas = null;
	this.$gameCanvasName = 'gameLayer';
	this.$gameGoodSize = null;
	this.$gameManager = null;
	this.gateway = null;
	this.$lastMouseMove = null;
	this.$uiCanvas = null;
	this.$uiCanvasName = 'uiLayer';
	this.$uiGoodSize = null;
	this.uiManager = null;
	var elem = document.getElementById('loading');
	elem.parentNode.removeChild(elem);
	var stats = new xStats();
	document.body.appendChild(stats.element);
	this.$gameCanvas = CommonClientLibraries.CanvasInformation.create$3(document.getElementById(this.$gameCanvasName), 0, 0);
	this.$uiCanvas = CommonClientLibraries.CanvasInformation.create$3(document.getElementById(this.$uiCanvasName), 0, 0);
	this.uiManager = new CommonClientLibraries.UIManager.UIManager();
	this.gateway = new $Client_Gateway(gatewayServerAddress);
	this.$gameManager = new $Client_GameManager(Function.mkdel(this.gateway, this.gateway.on), Function.mkdel(this.gateway, this.gateway.emit));
	this.gateway.on('Area.Main.Login.Response', function(data) {
		window.alert(JSON.stringify(data));
	});
	this.gateway.login($Client_ClientManager.$randomName());
	this.$bindInput();
	window.addEventListener('resize', Function.mkdel(this, function(e) {
		this.resizeCanvas();
	}));
	$(document).resize(Function.mkdel(this, function(e1) {
		this.resizeCanvas();
	}));
	var a = 0;
	//Window.SetInterval(() => {},1000 / 60);
	window.setInterval(Function.mkdel(this, this.$tick), 16);
	window.setInterval(Function.mkdel(this, this.gameDraw), 16);
	window.setInterval(Function.mkdel(this, this.uiDraw), 100);
	this.$gameManager.start(this.$gameCanvas.context);
	this.resizeCanvas();
	this.$gameManager.buildUI(this.uiManager);
};
$Client_ClientManager.prototype = {
	$tick: function() {
		this.$gameManager.tick();
	},
	$bindInput: function() {
		this.$uiCanvas.domCanvas.mousedown(Function.mkdel(this, this.$canvasOnClick));
		this.$uiCanvas.domCanvas.mouseup(Function.mkdel(this, this.$canvasMouseUp));
		this.$uiCanvas.domCanvas.mousemove(Function.mkdel(this, this.$canvasMouseMove));
		this.$uiCanvas.domCanvas.bind('touchstart', Function.mkdel(this, this.$canvasOnClick));
		this.$uiCanvas.domCanvas.bind('touchend', Function.mkdel(this, this.$canvasMouseUp));
		this.$uiCanvas.domCanvas.bind('touchmove', Function.mkdel(this, this.$canvasMouseMove));
		this.$uiCanvas.domCanvas.bind('DOMMouseScroll', Function.mkdel(this, this.$handleScroll));
		this.$uiCanvas.domCanvas.bind('mousewheel', Function.mkdel(this, this.$handleScroll));
		this.$uiCanvas.domCanvas.bind('contextmenu', function(e) {
			e.preventDefault();
		});
		var dontPress = false;
		document.addEventListener('keypress', Function.mkdel(this, function(e1) {
			dontPress = this.uiManager.onKeyDown(e1);
		}), true);
		KeyboardJS.bind.key('e', function() {
		}, function() {
		});
	},
	$handleScroll: function(jQueryEvent) {
		jQueryEvent.preventDefault();
		var j = ss.Nullable.unbox(Type.cast((!!jQueryEvent.detail ? (jQueryEvent.detail * -120) : jQueryEvent.wheelDelta), ss.Int32));
		if (this.uiManager.onMouseScroll(jQueryEvent)) {
			return;
		}
	},
	$canvasMouseMove: function(queryEvent) {
		queryEvent.preventDefault();
		document.body.style.cursor = 'default';
		this.$lastMouseMove = CommonClientLibraries.UIManager.CHelp.getCursorPosition(queryEvent);
		if (this.uiManager.onMouseMove(this.$lastMouseMove)) {
			return;
		}
		if (this.$gameManager.mouseMove(this.$lastMouseMove)) {
			return;
		}
		return;
	},
	$canvasOnClick: function(queryEvent) {
		queryEvent.preventDefault();
		var cursorPosition = CommonClientLibraries.UIManager.CHelp.getCursorPosition(queryEvent);
		if (this.uiManager.onClick(cursorPosition)) {
			return;
		}
		if (this.$gameManager.onClick(cursorPosition)) {
			return;
		}
	},
	$canvasMouseUp: function(queryEvent) {
		queryEvent.preventDefault();
		this.uiManager.onMouseUp(this.$lastMouseMove);
		if (this.$gameManager.mouseUp(this.$lastMouseMove)) {
			return;
		}
	},
	resizeCanvas: function() {
		this.$canvasWidth = $(window).width();
		this.$canvasHeight = $(window).height();
		this.$uiCanvas.domCanvas.attr('width', this.$canvasWidth.toString());
		this.$uiCanvas.domCanvas.attr('height', this.$canvasHeight.toString());
		this.$gameManager.screen.width = window.innerWidth;
		this.$gameManager.screen.height = window.innerHeight;
		this.$gameCanvas.domCanvas.attr('width', this.$gameManager.screen.width.toString());
		this.$gameCanvas.domCanvas.attr('height', this.$gameManager.screen.height.toString());
		this.$uiGoodSize = CommonLibraries.Point.$ctor1(this.$canvasWidth, this.$canvasHeight);
		this.$gameGoodSize = CommonLibraries.Point.$ctor1(this.$gameManager.screen.width, this.$gameManager.screen.height);
	},
	clear: function(canv) {
		var w;
		if (ss.referenceEquals(canv, this.$gameCanvas)) {
			w = this.$gameGoodSize;
		}
		else {
			w = this.$uiGoodSize;
		}
		//canv.DomCanvas[0].Me().width = w.width;
		canv.context.clearRect(0, 0, w.x, w.y);
	},
	gameDraw: function() {
		this.clear(this.$gameCanvas);
		this.$gameManager.draw(this.$gameCanvas.context);
	},
	uiDraw: function() {
		this.clear(this.$uiCanvas);
		this.uiManager.draw(this.$uiCanvas.context);
	}
};
$Client_ClientManager.$randomName = function() {
	var randomName = '';
	var ra = Math.random() * 10;
	for (var i = 0; i < ra; i++) {
		randomName += String.fromCharCode(ss.Int32.trunc(65 + Math.random() * 26));
	}
	return randomName;
};
$Client_ClientManager.$main = function() {
	$(function() {
		new $Client_ClientManager(document.getElementById('gatewayServer').value);
	});
};
////////////////////////////////////////////////////////////////////////////////
// Client.GameManager
var $Client_GameManager = function(receiveChannelMessage, sendChannelMessage) {
	this.$game = null;
	this.receiveChannelMessage = null;
	this.sendChannelMessage = null;
	this.screen = null;
	this.receiveChannelMessage = receiveChannelMessage;
	this.sendChannelMessage = sendChannelMessage;
	//  game = new TowerD.Client.Game();
	this.$game = new ZombieGame.Client.Game();
	this.$game.receiveChannelMessage = this.receiveChannelMessage;
	this.$game.sendChannelMessage = this.sendChannelMessage;
	// game = new ZakGame.Client.Game();
	this.screen = CommonLibraries.Rectangle.$ctor1(0, 0, 0, 0);
};
$Client_GameManager.prototype = {
	mouseMove: function(queryEvent) {
		return this.$game.mouseMove(queryEvent);
	},
	buildUI: function(uiManager) {
		this.$game.buildUI(uiManager);
	},
	onClick: function(queryEvent) {
		return this.$game.onClick(queryEvent);
	},
	mouseUp: function(queryEvent) {
		return this.$game.mouseUp(queryEvent);
	},
	draw: function(context) {
		this.$game.draw(context);
	},
	tick: function() {
		this.$game.tick();
	},
	start: function(context) {
		this.$game.screen = this.screen;
		this.$game.init([], context);
		this.$game.bindKeys(KeyboardJS);
	}
};
////////////////////////////////////////////////////////////////////////////////
// Client.Gateway
var $Client_Gateway = function(gatewayServer) {
	this.$channels = null;
	this.gatewaySocket = null;
	this.$channels = {};
	this.gatewaySocket = io.connect(gatewayServer);
	this.gatewaySocket.on('Client.Message', Function.mkdel(this, function(data) {
		this.$channels[data.channel](data.content);
	}));
};
$Client_Gateway.prototype = {
	emit: function(channel, content) {
		this.gatewaySocket.emit('Gateway.Message', CommonLibraries.GatewayMessageModel.$ctor(channel, content));
	},
	on: function(channel, callback) {
		this.$channels[channel] = callback;
	},
	login: function(userName) {
		var $t2 = this.gatewaySocket;
		var $t1 = new CommonAPI.UserModel();
		$t1.set_userName(userName);
		$t2.emit('Gateway.Login', $t1);
	}
};
Type.registerClass(global, 'Client.ClientManager', $Client_ClientManager, Object);
Type.registerClass(global, 'Client.GameManager', $Client_GameManager, Object);
Type.registerClass(global, 'Client.Gateway', $Client_Gateway, Object);
$Client_ClientManager.$main();
