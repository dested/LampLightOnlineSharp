////////////////////////////////////////////////////////////////////////////////
// ZakGame.Client.Game
var $ZakGame_Client_Game = function() {
	this.$clicking = false;
	this.$myClickState = null;
	this.$myPlayers = null;
	this.$someImage = null;
	ClientAPI.LampClient.call(this);
	$ZakGame_Client_Game.instance = this;
	$ZakGame_Client_Game.debugText = [];
};
$ZakGame_Client_Game.prototype = {
	bindKeys: function(manager) {
		manager.bind.key('space', function() {
			//keydown
		}, function() {
			//keyup
		});
	},
	init: function(players, context) {
		this.$myPlayers = players;
		this.$someImage = new Image();
		this.$someImage.addEventListener('load', function(e) {
			//idk do something when the image is loaded
		}, false);
		this.$someImage.src = 'http://dested.com/lamp/Games/ZombieGame/assets/LostGarden+WoodTiles.png';
	},
	tick: function() {
	},
	buildUI: function(manager) {
		var manageData;
		var $t1 = new CommonClientLibraries.UIManager.UIArea(this.windowLocation.width - 400, 100, 250, 300);
		$t1.closable = true;
		manager.addArea(manageData = $t1);
		manageData.visible = true;
		var $t2 = new CommonClientLibraries.UIManager.TextArea(30, 25, Type.makeGenericType(CommonLibraries.DelegateOrValue$1, [String]).op_Implicit$2('Manage Defense'));
		$t2.color = 'blue';
		manageData.addControl(CommonClientLibraries.UIManager.TextArea).call(manageData, $t2);
		this.$myClickState = null;
		var $t3 = new (Type.makeGenericType(CommonClientLibraries.UIManager.Button$1, [Boolean]))(false, 20, 50, 100, 25, Type.makeGenericType(CommonLibraries.DelegateOrValue$1, [String]).op_Implicit$1(Function.mkdel(this, function() {
			return (this.$myClickState.data ? 'This' : 'That');
		})));
		$t3.click = Function.mkdel(this, function(p) {
			this.$myClickState.data = !this.$myClickState.data;
		});
		this.$myClickState = $t3;
		manageData.addControl(Type.makeGenericType(CommonClientLibraries.UIManager.Button$1, [Boolean])).call(manageData, this.$myClickState);
		var $t4 = new CommonClientLibraries.UIManager.Button(20, 80, 100, 25, Type.makeGenericType(CommonLibraries.DelegateOrValue$1, [String]).op_Implicit$2('Send Wave'));
		$t4.click = function(p1) {
			//idk do something on button click
		};
		manageData.addControl(CommonClientLibraries.UIManager.Button).call(manageData, $t4);
	},
	mouseMove: function(jQueryEvent) {
		if (!this.$clicking) {
			return false;
		}
		return false;
	},
	onClick: function(jQueryEvent) {
		this.$clicking = true;
		var x = jQueryEvent.clientX;
		var y = jQueryEvent.clientY;
		$ZakGame_Client_Game.debugText[0] = x + ' ' + y;
		//idk do something with xy
		return false;
	},
	mouseUp: function(jQueryEvent) {
		this.$clicking = false;
		return false;
	},
	draw: function(context) {
		context.fillStyle = 'red';
		context.fillRect(100, 100, 200, 200);
		context.drawImage(this.$someImage, 250, 250);
		context.drawImage(this.$someImage, 350, 350, 100, 100, 200, 200, 100, 100);
		for (var i = 0; i < $ZakGame_Client_Game.debugText.length; i++) {
			if ($ZakGame_Client_Game.debugText[i]) {
				context.save();
				context.strokeStyle = 'white';
				context.strokeText($ZakGame_Client_Game.debugText[i].toString(), this.windowLocation.width - 120, i * 20 + 150);
				context.restore();
			}
		}
	}
};
Type.registerClass(global, 'ZakGame.Client.Game', $ZakGame_Client_Game, ClientAPI.LampClient);
$ZakGame_Client_Game.instance = null;
$ZakGame_Client_Game.debugText = null;
