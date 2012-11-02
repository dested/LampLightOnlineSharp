////////////////////////////////////////////////////////////////////////////////
// Client.GameManager
var $Client_$GameManager = function() {
	this.$game = null;
	this.$1$WindowLocationField = null;
	//  game = new TowerD.Client.Game();
	//  game = new ZombieGame.Client.Game();
	this.$game = new ZakGame.Client.Game();
};
$Client_$GameManager.prototype = {
	get_$windowLocation: function() {
		return this.$1$WindowLocationField;
	},
	set_$windowLocation: function(value) {
		this.$1$WindowLocationField = value;
	},
	$mouseMove: function(queryEvent) {
		return this.$game.mouseMove(queryEvent);
	},
	$buildUI: function(uiManager) {
		this.$game.buildUI(uiManager);
	},
	$onClick: function(queryEvent) {
		return this.$game.onClick(queryEvent);
	},
	$mouseUp: function(queryEvent) {
		return this.$game.mouseUp(queryEvent);
	},
	$draw: function(context) {
		this.$game.draw(context);
	},
	$tick: function() {
		this.$game.tick();
	},
	$start: function(context) {
		this.$game.windowLocation = this.get_$windowLocation();
		this.$game.init([], context);
		this.$game.bindKeys(KeyboardJS);
	}
};
////////////////////////////////////////////////////////////////////////////////
// Client.ClientManager
var $Client_ClientManager = function() {
	this.$canvasHeight = 0;
	this.$canvasWidth = 0;
	this.$gameCanvas = null;
	this.$gameCanvasName = 'gameLayer';
	this.$gameGoodSize = null;
	this.$gameManager = null;
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
	this.$gameManager = new $Client_$GameManager();
	this.$bindInput();
	window.addEventListener('resize', Function.mkdel(this, function(e) {
		this.resizeCanvas();
	}));
	$(document).resize(Function.mkdel(this, function(e1) {
		this.resizeCanvas();
	}));
	this.resizeCanvas();
	var a = 0;
	window.setInterval(function() {
		a++;
		a++;
		a++;
	}, 16);
	window.setInterval(Function.mkdel(this, this.$tick), 16);
	window.setInterval(Function.mkdel(this, this.gameDraw), 33);
	window.setInterval(Function.mkdel(this, this.uiDraw), 100);
	this.$gameManager.$start(this.$gameCanvas.context);
	this.$gameManager.$buildUI(this.uiManager);
};
$Client_ClientManager.prototype = {
	$tick: function() {
		this.$gameManager.$tick();
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
		if (this.$gameManager.$mouseMove(queryEvent)) {
			return;
		}
		return;
	},
	$canvasOnClick: function(queryEvent) {
		queryEvent.preventDefault();
		if (this.uiManager.onClick(CommonClientLibraries.UIManager.CHelp.getCursorPosition(queryEvent))) {
			return;
		}
		if (this.$gameManager.$onClick(queryEvent)) {
			return;
		}
	},
	$canvasMouseUp: function(queryEvent) {
		queryEvent.preventDefault();
		this.uiManager.onMouseUp(this.$lastMouseMove);
		if (this.$gameManager.$mouseUp(queryEvent)) {
			return;
		}
	},
	resizeCanvas: function() {
		this.$canvasWidth = $(window).width();
		this.$canvasHeight = $(window).height();
		this.$uiCanvas.domCanvas.attr('width', this.$canvasWidth.toString());
		this.$uiCanvas.domCanvas.attr('height', this.$canvasHeight.toString());
		this.$gameManager.set_$windowLocation(CommonLibraries.Rectangle.$ctor1(0, 0, window.innerWidth, window.innerHeight));
		this.$gameCanvas.domCanvas.attr('width', this.$gameManager.get_$windowLocation().width.toString());
		this.$gameCanvas.domCanvas.attr('height', this.$gameManager.get_$windowLocation().height.toString());
		this.$uiGoodSize = CommonLibraries.Point.$ctor1(this.$canvasWidth, this.$canvasHeight);
		this.$gameGoodSize = CommonLibraries.Point.$ctor1(this.$gameManager.get_$windowLocation().width, this.$gameManager.get_$windowLocation().height);
		this.$gameCanvas.context.globalCompositeOperation = 'lighter';
		;
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
		this.$gameManager.$draw(this.$gameCanvas.context);
	},
	uiDraw: function() {
		this.clear(this.$uiCanvas);
		this.uiManager.draw(this.$uiCanvas.context);
	}
};
$Client_ClientManager.$main = function() {
	$(function() {
		new $Client_ClientManager();
	});
};
Type.registerClass(null, 'Client.$GameManager', $Client_$GameManager, Object);
Type.registerClass(global, 'Client.ClientManager', $Client_ClientManager, Object);
$Client_ClientManager.$main();
