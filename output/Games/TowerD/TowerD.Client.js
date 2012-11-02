////////////////////////////////////////////////////////////////////////////////
// TowerD.Client.Color
var $TowerD_Client_Color = function() {
};
$TowerD_Client_Color.prototype = { red: 0, blue: 1, green: 2, yellow: 3 };
Type.registerEnum(global, 'TowerD.Client.Color', $TowerD_Client_Color, false);
////////////////////////////////////////////////////////////////////////////////
// TowerD.Client.Game
var $TowerD_Client_Game = function() {
	this.scale = CommonLibraries.Point.$ctor1(40, 30);
	this.$clicking = false;
	this.$myClickState = null;
	this.$myPlayers = null;
	this.$selectedKingdom = null;
	this.$selectedTower = null;
	this.$selectedWaypoint = null;
	this.kingdoms = null;
	this.waypointMaps = null;
	ClientAPI.LampClient.call(this);
	$TowerD_Client_Game.instance = this;
	$TowerD_Client_Game.debugText = [];
	this.waypointMaps = [];
	this.waypointMaps.add(new $TowerD_Client_WaypointMap(0, 2, [new $TowerD_Client_Waypoint(4, 4), new $TowerD_Client_Waypoint(36, 4)], this.scale));
	this.waypointMaps.add(new $TowerD_Client_WaypointMap(0, 3, [new $TowerD_Client_Waypoint(4, 4), new $TowerD_Client_Waypoint(16, 4), new $TowerD_Client_Waypoint(16, 26), new $TowerD_Client_Waypoint(36, 26)], this.scale));
	this.waypointMaps.add(new $TowerD_Client_WaypointMap(0, 1, [new $TowerD_Client_Waypoint(4, 4), new $TowerD_Client_Waypoint(4, 26)], this.scale));
	this.waypointMaps.add(new $TowerD_Client_WaypointMap(2, 3, [new $TowerD_Client_Waypoint(36, 4), new $TowerD_Client_Waypoint(36, 26)], this.scale));
	this.waypointMaps.add(new $TowerD_Client_WaypointMap(2, 1, [new $TowerD_Client_Waypoint(36, 4), new $TowerD_Client_Waypoint(4, 26)], this.scale));
	this.waypointMaps.add(new $TowerD_Client_WaypointMap(3, 1, [new $TowerD_Client_Waypoint(36, 26), new $TowerD_Client_Waypoint(4, 26)], this.scale));
	this.kingdoms = {};
	var $t4 = this.kingdoms;
	var $t1 = new $TowerD_Client_Kingdom();
	$t1.color = 0;
	var $t2 = [];
	$t2.add(new $TowerD_Client_Pieces_Towers_KingdomTower(0, 4, 4));
	$t1.towers = $t2;
	var $t3 = [];
	$t3.add(this.waypointMaps[0].first());
	$t3.add(this.waypointMaps[1].first());
	$t3.add(this.waypointMaps[2].first());
	$t1.waypoints = $t3;
	$t4['Mike'] = $t1;
	var $t8 = this.kingdoms;
	var $t5 = new $TowerD_Client_Kingdom();
	$t5.color = 2;
	var $t6 = [];
	$t6.add(new $TowerD_Client_Pieces_Towers_KingdomTower(2, 36, 4));
	$t5.towers = $t6;
	var $t7 = [];
	$t7.add(this.waypointMaps[0].last());
	$t7.add(this.waypointMaps[3].first());
	$t7.add(this.waypointMaps[4].first());
	$t5.waypoints = $t7;
	$t8['Joe'] = $t5;
	var $t12 = this.kingdoms;
	var $t9 = new $TowerD_Client_Kingdom();
	$t9.color = 3;
	var $t10 = [];
	$t10.add(new $TowerD_Client_Pieces_Towers_KingdomTower(3, 36, 26));
	$t10.add(new $TowerD_Client_Pieces_Towers_SingeShotTower(3, 34, 27));
	$t9.towers = $t10;
	var $t11 = [];
	$t11.add(this.waypointMaps[1].last());
	$t11.add(this.waypointMaps[3].last());
	$t11.add(this.waypointMaps[5].first());
	$t9.waypoints = $t11;
	$t12['Steve'] = $t9;
	var $t16 = this.kingdoms;
	var $t13 = new $TowerD_Client_Kingdom();
	$t13.color = 1;
	var $t14 = [];
	$t14.add(new $TowerD_Client_Pieces_Towers_KingdomTower(1, 4, 26));
	$t13.towers = $t14;
	var $t15 = [];
	$t15.add(this.waypointMaps[2].last());
	$t15.add(this.waypointMaps[4].last());
	$t15.add(this.waypointMaps[5].last());
	$t13.waypoints = $t15;
	$t16['Chris'] = $t13;
	//
	//            KeyboardJS.Instance().Bind.Key("space",
	//
	//            () => {
	//
	//            },
	//
	//            () => { });
};
$TowerD_Client_Game.prototype = {
	init: function(players, context) {
		this.$myPlayers = players;
		context.globalCompositeOperation = 'lighter';
		var $t1 = Object.getObjectEnumerator(this.kingdoms);
		try {
			while ($t1.moveNext()) {
				var kingdom = $t1.get_current();
				for (var $t2 = 0; $t2 < kingdom.value.towers.length; $t2++) {
					var tower = kingdom.value.towers[$t2];
					tower.get_drawer().init();
				}
				for (var $t3 = 0; $t3 < kingdom.value.units.length; $t3++) {
					var unit = kingdom.value.units[$t3];
					unit.get_drawer().init();
				}
			}
		}
		finally {
			$t1.dispose();
		}
		for (var $t4 = 0; $t4 < this.waypointMaps.length; $t4++) {
			var waypointMap = this.waypointMaps[$t4];
			waypointMap.drawer.init();
		}
	},
	tick: function() {
		var $t1 = Object.getObjectEnumerator(this.kingdoms);
		try {
			while ($t1.moveNext()) {
				var kingdom = $t1.get_current();
				for (var $t2 = 0; $t2 < kingdom.value.towers.length; $t2++) {
					var tower = kingdom.value.towers[$t2];
					tower.tick();
				}
				for (var index = kingdom.value.units.length - 1; index >= 0; index--) {
					var unit = kingdom.value.units[index];
					if (!unit.tick()) {
						kingdom.value.units.remove(unit);
					}
				}
			}
		}
		finally {
			$t1.dispose();
		}
		for (var $t3 = 0; $t3 < this.waypointMaps.length; $t3++) {
			var waypointMap = this.waypointMaps[$t3];
			waypointMap.drawer.tick();
		}
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
		var $t3 = new (Type.makeGenericType(CommonClientLibraries.UIManager.Button$1, [ss.Int32]))(0, 20, 50, 100, 25, Type.makeGenericType(CommonLibraries.DelegateOrValue$1, [String]).op_Implicit$1(Function.mkdel(this, function() {
			switch (this.$myClickState.data) {
				case 0: {
					return 'Move Kingdom';
				}
				case 1: {
					return 'Move Waypoint';
				}
				case 2: {
					return 'Add Waypoint';
				}
				case 3: {
					return 'Place Tower';
				}
			}
			return '';
		})));
		$t3.click = Function.mkdel(this, function(p) {
			this.$myClickState.data++;
			this.$myClickState.data = this.$myClickState.data % 4;
		});
		this.$myClickState = $t3;
		manageData.addControl(Type.makeGenericType(CommonClientLibraries.UIManager.Button$1, [ss.Int32])).call(manageData, this.$myClickState);
		var $t4 = new CommonClientLibraries.UIManager.Button(20, 80, 100, 25, Type.makeGenericType(CommonLibraries.DelegateOrValue$1, [String]).op_Implicit$2('Send Wave'));
		$t4.click = Function.mkdel(this, function(p1) {
			var $t5 = Object.getObjectEnumerator(this.kingdoms);
			try {
				while ($t5.moveNext()) {
					var kingdom = $t5.get_current();
					for (var i = 0; i < 4; i++) {
						var kingdom1 = { $: kingdom };
						window.setTimeout(Function.mkdel({ kingdom1: kingdom1, $this: this }, function() {
							this.kingdom1.$.value.units.add(new $TowerD_Client_Pieces_Units_QuickShooterUnit(this.kingdom1.$.value.waypoints[0].travel(150, this.$this.scale), this.kingdom1.$.value));
							this.kingdom1.$.value.units.add(new $TowerD_Client_Pieces_Units_QuickShooterUnit(this.kingdom1.$.value.waypoints[1].travel(150, this.$this.scale), this.kingdom1.$.value));
							this.kingdom1.$.value.units.add(new $TowerD_Client_Pieces_Units_QuickShooterUnit(this.kingdom1.$.value.waypoints[2].travel(150, this.$this.scale), this.kingdom1.$.value));
						}), 750 * i);
					}
				}
			}
			finally {
				$t5.dispose();
			}
		});
		manageData.addControl(CommonClientLibraries.UIManager.Button).call(manageData, $t4);
		var $t6 = new CommonClientLibraries.UIManager.Button(20, 125, 100, 25, Type.makeGenericType(CommonLibraries.DelegateOrValue$1, [String]).op_Implicit$1(function() {
			return ($TowerD_Client_Game.DRAWFAST ? 'Draw Slow' : 'Draw Fast');
		}));
		$t6.click = function(p2) {
			$TowerD_Client_Game.DRAWFAST = !$TowerD_Client_Game.DRAWFAST;
		};
		manageData.addControl(CommonClientLibraries.UIManager.Button).call(manageData, $t6);
	},
	mouseMove: function(jQueryEvent) {
		if (!this.$clicking) {
			return false;
		}
		var point = CommonLibraries.Point.$ctor1(ss.Int32.div(jQueryEvent.clientX, this.scale.x), ss.Int32.div(jQueryEvent.clientY, this.scale.y));
		switch (this.$myClickState.data) {
			case 0: {
				if (ss.isValue(this.$selectedTower)) {
					if (ss.isNullOrUndefined(this.$towerExistsAt(point.x, point.y))) {
						this.$selectedTower.set_x(point.x);
						this.$selectedTower.set_y(point.y);
						if (ss.referenceEquals(this.$selectedKingdom.get_kingdomTower(), this.$selectedTower)) {
							this.$selectedKingdom.waypoints[0].set_x(point.x);
							this.$selectedKingdom.waypoints[0].set_y(point.y);
							this.$selectedKingdom.waypoints[0].reorganize();
							this.$selectedKingdom.waypoints[1].set_x(point.x);
							this.$selectedKingdom.waypoints[1].set_y(point.y);
							this.$selectedKingdom.waypoints[1].reorganize();
							this.$selectedKingdom.waypoints[2].set_x(point.x);
							this.$selectedKingdom.waypoints[2].set_y(point.y);
							this.$selectedKingdom.waypoints[2].reorganize();
						}
					}
				}
				return true;
			}
			case 1: {
				if (ss.isValue(this.$selectedWaypoint)) {
					this.$selectedWaypoint.set_x(point.x);
					this.$selectedWaypoint.set_y(point.y);
					this.$selectedWaypoint.reorganize();
				}
				return true;
			}
			case 2: {
				break;
			}
			case 3: {
				break;
			}
		}
		return false;
	},
	onClick: function(jQueryEvent) {
		this.$clicking = true;
		this.$selectedWaypoint = null;
		this.$selectedTower = null;
		var point = CommonLibraries.Point.$ctor1(ss.Int32.div(jQueryEvent.clientX, this.scale.x), ss.Int32.div(jQueryEvent.clientY, this.scale.y));
		switch (this.$myClickState.data) {
			case 0: {
				this.$selectedKingdom = null;
				var $t1 = Object.getObjectEnumerator(this.kingdoms);
				try {
					while ($t1.moveNext()) {
						var kingdom = $t1.get_current();
						for (var $t2 = 0; $t2 < kingdom.value.towers.length; $t2++) {
							var tower1 = kingdom.value.towers[$t2];
							if (tower1.get_x() === point.x && tower1.get_y() === point.y) {
								this.$selectedKingdom = kingdom.value;
								this.$selectedTower = tower1;
								break;
							}
						}
					}
				}
				finally {
					$t1.dispose();
				}
				break;
			}
			case 1: {
				for (var $t3 = 0; $t3 < this.waypointMaps.length; $t3++) {
					var waypointMap = this.waypointMaps[$t3];
					for (var $t4 = 0; $t4 < waypointMap.waypoints.length; $t4++) {
						var p = waypointMap.waypoints[$t4];
						if (p.get_x() === point.x && p.get_y() === point.y) {
							this.$selectedWaypoint = p;
							break;
						}
					}
				}
				break;
			}
			case 2: {
				break;
			}
			case 3: {
				if (ss.isValue(this.$selectedKingdom)) {
					if (ss.isNullOrUndefined(this.$towerExistsAt(point.x, point.y))) {
						var tower = new $TowerD_Client_Pieces_Towers_SingeShotTower(this.$selectedKingdom.color, point.x, point.y);
						this.$selectedKingdom.towers.add(this.$selectedTower = tower);
						tower.get_drawer().init();
					}
				}
				break;
			}
		}
		return ClientAPI.LampClient.prototype.onClick.call(this, jQueryEvent);
	},
	$towerExistsAt: function(x, y) {
		var $t1 = Object.getObjectEnumerator(this.kingdoms);
		try {
			while ($t1.moveNext()) {
				var kingdom = $t1.get_current();
				for (var $t2 = 0; $t2 < kingdom.value.towers.length; $t2++) {
					var tower = kingdom.value.towers[$t2];
					if (tower.get_x() === x && tower.get_y() === y) {
						return tower;
					}
				}
			}
		}
		finally {
			$t1.dispose();
		}
		return null;
	},
	mouseUp: function(jQueryEvent) {
		this.$clicking = false;
		return ClientAPI.LampClient.prototype.mouseUp.call(this, jQueryEvent);
	},
	draw: function(context) {
		var $t1 = Object.getObjectEnumerator(this.kingdoms);
		try {
			while ($t1.moveNext()) {
				var kingdom = $t1.get_current();
				for (var $t2 = 0; $t2 < kingdom.value.towers.length; $t2++) {
					var tower = kingdom.value.towers[$t2];
					tower.get_drawer().draw(context, tower.get_x() * this.scale.x, tower.get_y() * this.scale.y);
				}
				for (var $t3 = 0; $t3 < kingdom.value.units.length; $t3++) {
					var unit = kingdom.value.units[$t3];
					unit.draw(context, unit.get_x() * this.scale.x, unit.get_y() * this.scale.y);
				}
			}
		}
		finally {
			$t1.dispose();
		}
		for (var $t4 = 0; $t4 < this.waypointMaps.length; $t4++) {
			var waypointMap = this.waypointMaps[$t4];
			waypointMap.drawer.draw(context, 0, 0);
		}
		for (var i = 0; i < $TowerD_Client_Game.debugText.length; i++) {
			if ($TowerD_Client_Game.debugText[i]) {
				context.save();
				context.strokeStyle = 'white';
				context.strokeText($TowerD_Client_Game.debugText[i].toString(), this.windowLocation.width - 120, i * 20 + 150);
				context.restore();
			}
		}
	}
};
////////////////////////////////////////////////////////////////////////////////
// TowerD.Client.Kingdom
var $TowerD_Client_Kingdom = function() {
	this.towers = null;
	this.units = null;
	this.waypoints = null;
	this.color = 0;
	this.towers = [];
	this.units = [];
};
$TowerD_Client_Kingdom.prototype = {
	get_kingdomTower: function() {
		return this.towers[0];
	}
};
////////////////////////////////////////////////////////////////////////////////
// TowerD.Client.Particle
var $TowerD_Client_Particle = function() {
	this.$cache = null;
	this.$curGradIndex = 0;
	this.system = null;
	this.position = null;
	this.direction = null;
	this.sharpness = 0;
	this.size = 0;
	this.timeToLive = 0;
	this.sizeSmall = 0;
	this.color = null;
	this.deltaColor = null;
	this.drawColor = null;
	this.drawColorTransparent = null;
	this.position = CommonLibraries.Point.$ctor1(0, 0);
	this.direction = CommonLibraries.DoublePoint.$ctor1(0, 0);
	this.deltaColor = new Array(4);
	this.color = new Array(4);
};
$TowerD_Client_Particle.prototype = {
	buildCache: function(delta, cache) {
		this.$cache = cache;
		if (ss.isValue(cache.images) || $TowerD_Client_Game.DRAWFAST) {
			return;
		}
		cache.images = [];
		var timetolive = this.timeToLive;
		while (this.$progress(delta)) {
			var key = this.drawColor + this.size + this.sharpness;
			if (!$TowerD_Client_Game.debugText[0]) {
				$TowerD_Client_Game.debugText[0] = 0;
			}
			$TowerD_Client_Game.debugText[0] = ss.Nullable.unbox(Type.cast($TowerD_Client_Game.debugText[0], ss.Int32)) + 1;
			var inf = CommonClientLibraries.CanvasInformation.create$2(ss.Int32.trunc(this.size), ss.Int32.trunc(this.size));
			var old = this.position;
			var halfSize = ss.Int32.trunc(this.size) >> 1;
			this.position = CommonLibraries.Point.$ctor1(ss.Int32.div(ss.Int32.trunc(this.size), 2) - halfSize, ss.Int32.div(ss.Int32.trunc(this.size), 2) - halfSize);
			this.render(inf.context, true);
			this.position = old;
			inf.ready();
			cache.images.add(inf);
		}
		this.timeToLive = timetolive;
	},
	$progress: function(delta) {
		if (this.timeToLive <= 0) {
			return false;
		}
		// Calculate the new direction based on gravity
		this.timeToLive -= delta;
		// Update Colors based on delta
		var r = this.color[0] += this.deltaColor[0] * delta;
		var g = this.color[1] += this.deltaColor[1] * delta;
		var b = this.color[2] += this.deltaColor[2] * delta;
		var a = this.color[3] += this.deltaColor[3] * delta;
		// Calculate the rgba string to draw.
		var draw = [];
		draw.add('rgba(' + ((r > 255) ? 255 : ((r < 0) ? 0 : ~~ss.Int32.trunc(r))));
		draw.add(((g > 255) ? 255 : ((g < 0) ? 0 : ~~ss.Int32.trunc(g))).toString());
		draw.add(((b > 255) ? 255 : ((b < 0) ? 0 : ~~ss.Int32.trunc(b))).toString());
		draw.add(((a > 1) ? '1' : ((a < 0) ? '0' : a.toFixed(2))) + ')');
		this.drawColor = draw.join(',');
		draw.removeAt(3);
		draw.add('0)');
		this.drawColorTransparent = draw.join(',');
		return true;
	},
	update: function(delta) {
		if (this.timeToLive <= 0) {
			return false;
		}
		this.direction = CommonLibraries.DoublePoint.add(this.direction, this.system.gravity);
		this.position = CommonLibraries.Point.add(this.position, this.direction);
		return this.$progress(delta);
	},
	render: function(context, force) {
		var x = this.position.x;
		var y = this.position.y;
		context.save();
		context.translate(x, y);
		if ($TowerD_Client_Game.DRAWFAST) {
			this.$drawCircle(context, this.$obtainGradient(context, this), this.size);
		}
		else if (force || ss.isNullOrUndefined(this.$cache.images)) {
			$TowerD_Client_Particle.$drawGrad(context, this.$obtainGradient(context, this), this.size);
		}
		else {
			$TowerD_Client_Particle.$drawImage(context, this.$cache.images[this.$curGradIndex++], this.size);
		}
		context.restore();
	},
	$drawCircle: function(context, radgrad, size) {
		context.fillStyle = radgrad;
		context.beginPath();
		context.arc(0, 0, size / 2, 0, Math.PI * 2, true);
		context.closePath();
		context.fill();
	},
	$obtainGradient: function(context, particle) {
		var halfSize = ss.Int32.trunc(particle.size) >> 1;
		//   string key = halfSize + particle.DrawColor + particle.SizeSmall;
		//   if (grads.ContainsKey(key)) {
		//   return grads[key];
		//   }
		if ($TowerD_Client_Game.DRAWFAST) {
			return particle.drawColor;
		}
		var radgrad = context.createRadialGradient(halfSize, halfSize, particle.sizeSmall, halfSize, halfSize, halfSize);
		//var radgrad = context.CreateLinearGradient(halfSize, halfSize, particle.SizeSmall, halfSize);
		radgrad.addColorStop(0, particle.drawColor);
		radgrad.addColorStop(1, particle.drawColorTransparent);
		//Super cool if you change these values (and add more Color stops)
		return radgrad;
	}
};
$TowerD_Client_Particle.$drawGrad = function(context, radgrad, size) {
	context.fillStyle = radgrad;
	context.fillRect(0, 0, size, size);
};
$TowerD_Client_Particle.$drawImage = function(context, inf, size) {
	if (inf.imageReady) {
		context.drawImage(inf.image, 0, 0);
	}
	else {
		context.drawImage(inf.canvas, 0, 0);
	}
};
////////////////////////////////////////////////////////////////////////////////
// TowerD.Client.ParticleSystem
var $TowerD_Client_ParticleSystem = function(numOfCaches) {
	this.$myNumOfCaches = 0;
	this.$caches = [];
	this.$curRand = ss.Int32.trunc(Math.random() * 100);
	this.$tick = 0;
	this.$totalEmited = 0;
	this.emitCounter = 0;
	this.emissionRate = 0;
	this.duration = 0;
	this.elapsedTime = 0;
	this.lifeSpan = 0;
	this.lifeSpanRandom = 0;
	this.gravity = null;
	this.sharpness = 0;
	this.sharpnessRandom = 0;
	this.endColorRandom = null;
	this.endColor = null;
	this.startColorRandom = null;
	this.startColor = null;
	this.angleRandom = 0;
	this.angle = 0;
	this.speedRandom = 0;
	this.speed = 0;
	this.sizeRandom = 0;
	this.size = 0;
	this.positionRandom = null;
	this.position = null;
	this.active = false;
	this.particles = null;
	this.maxParticles = 0;
	this.maxEmitted = 0;
	this.$myNumOfCaches = numOfCaches;
	this.maxParticles = 150;
	this.particles = [];
	this.active = true;
	this.position = CommonLibraries.Point.$ctor1(100, 100);
	this.positionRandom = CommonLibraries.Point.$ctor1(10, 10);
	this.size = 45;
	this.sizeRandom = 8;
	this.speed = 5;
	this.speedRandom = 1.5;
	this.lifeSpan = 9;
	this.lifeSpanRandom = 7;
	this.angle = 0;
	this.angleRandom = 360;
	this.gravity = CommonLibraries.DoublePoint.$ctor1(0.4, 0.2);
	this.startColor = [250, 218, 68, 1];
	this.startColorRandom = [5, 5, 5, 0];
	this.endColor = [245, 35, 0, 0];
	this.endColorRandom = [5, 5, 5, 0];
	this.sharpness = 40;
	this.sharpnessRandom = 10;
	this.maxEmitted = -1;
	this.elapsedTime = 0;
	this.duration = -1;
	this.emissionRate = 0;
	this.emitCounter = 0;
};
$TowerD_Client_ParticleSystem.prototype = {
	init: function() {
		this.emissionRate = this.maxParticles / this.lifeSpan;
		this.emitCounter = 0;
		this.$buildCaches();
	},
	addParticle: function() {
		if (this.particles.length === this.maxParticles) {
			return null;
		}
		if (this.$tick++ % this.$curRand === 0) {
			this.$caches[ss.Int32.trunc((this.$caches.length - 1) * Math.random())] = this.$newCache();
			this.$curRand = ss.Int32.trunc(Math.random() * 100);
		}
		// Take the next particle out of the particle pool we have created and initialize it	
		var particle = new $TowerD_Client_Particle();
		this.$initParticle(particle);
		this.particles.add(particle);
		// Increment the particle count 
		return particle;
	},
	$buildCaches: function() {
		for (var i = 0; i < this.$myNumOfCaches; i++) {
			this.$caches.add(this.$newCache());
		}
	},
	$newCache: function() {
		var $t1 = new $TowerD_Client_ParticleSystem$ParticleSystemCache();
		$t1.size = ss.Int32.trunc(this.size + this.sizeRandom * $TowerD_Client_ParticleSystem.$random());
		$t1.timeToLive = ss.Int32.trunc(this.lifeSpan + this.lifeSpanRandom * $TowerD_Client_ParticleSystem.$random());
		$t1.sharpness = this.sharpness + this.sharpnessRandom * $TowerD_Client_ParticleSystem.$random();
		$t1.start = [this.startColor[0] + this.startColorRandom[0] * $TowerD_Client_ParticleSystem.$random(), this.startColor[1] + this.startColorRandom[1] * $TowerD_Client_ParticleSystem.$random(), this.startColor[2] + this.startColorRandom[2] * $TowerD_Client_ParticleSystem.$random(), this.startColor[3] + this.startColorRandom[3] * $TowerD_Client_ParticleSystem.$random()];
		$t1.end = [this.endColor[0] + this.endColorRandom[0] * $TowerD_Client_ParticleSystem.$random(), this.endColor[1] + this.endColorRandom[1] * $TowerD_Client_ParticleSystem.$random(), this.endColor[2] + this.endColorRandom[2] * $TowerD_Client_ParticleSystem.$random(), this.endColor[3] + this.endColorRandom[3] * $TowerD_Client_ParticleSystem.$random()];
		return $t1;
	},
	randomCaches: function() {
		return this.$caches[ss.Int32.trunc(Math.random() * (this.$caches.length - 1))];
	},
	$initParticle: function(particle) {
		var cache = this.randomCaches();
		particle.system = this;
		particle.position.x = ss.Int32.trunc(this.position.x + this.positionRandom.x * $TowerD_Client_ParticleSystem.$random());
		particle.position.y = ss.Int32.trunc(this.position.y + this.positionRandom.y * $TowerD_Client_ParticleSystem.$random());
		var newAngle = (this.angle + this.angleRandom * $TowerD_Client_ParticleSystem.$random()) * (Math.PI / 180);
		// convert to radians
		var vector = CommonLibraries.DoublePoint.$ctor1(Math.cos(newAngle), Math.sin(newAngle));
		// Could move to lookup for speed
		var vectorSpeed = this.speed + this.speedRandom * $TowerD_Client_ParticleSystem.$random();
		particle.direction = CommonLibraries.DoublePoint.multiply(vector, vectorSpeed);
		particle.size = cache.size;
		particle.size = ((particle.size < 0) ? 0 : ~~ss.Int32.trunc(particle.size));
		particle.timeToLive = cache.timeToLive;
		particle.sharpness = cache.sharpness;
		particle.sharpness = ((particle.sharpness > 100) ? 100 : ((particle.sharpness < 0) ? 0 : particle.sharpness));
		// internal circle gradient size - affects the sharpness of the radial gradient
		particle.sizeSmall = ss.Int32.trunc(particle.size / 200 * particle.sharpness);
		//(size/2/100)
		var start = cache.start;
		var end = cache.end;
		particle.color = start;
		particle.deltaColor[0] = (end[0] - start[0]) / particle.timeToLive;
		particle.deltaColor[1] = (end[1] - start[1]) / particle.timeToLive;
		particle.deltaColor[2] = (end[2] - start[2]) / particle.timeToLive;
		particle.deltaColor[3] = (end[3] - start[3]) / particle.timeToLive;
		particle.buildCache(1, cache);
		if (!$TowerD_Client_Game.debugText[1]) {
			$TowerD_Client_Game.debugText[1] = 0;
		}
		$TowerD_Client_Game.debugText[1] = ss.Nullable.unbox(Type.cast($TowerD_Client_Game.debugText[1], ss.Int32)) + 1;
	},
	update: function(delta) {
		if (this.maxEmitted !== -1 && this.$totalEmited > this.maxEmitted) {
			this.active = false;
		}
		if (this.active && this.emissionRate > 0) {
			var rate = 1 / this.emissionRate;
			this.emitCounter += delta;
			while (this.particles.length < this.maxParticles && this.emitCounter > rate) {
				this.addParticle();
				this.$totalEmited++;
				this.emitCounter -= rate;
			}
			this.elapsedTime += delta;
			if (this.duration !== -1 && this.duration < this.elapsedTime) {
				this.stop();
			}
		}
		for (var index = this.particles.length - 1; index >= 0; index--) {
			var currentParticle = this.particles[index];
			if (!currentParticle.update(delta)) {
				this.particles.remove(currentParticle);
				$TowerD_Client_Game.debugText[1] = ss.Nullable.unbox(Type.cast($TowerD_Client_Game.debugText[1], ss.Int32)) - 1;
			}
		}
	},
	stop: function() {
		this.active = false;
		this.elapsedTime = 0;
		this.emitCounter = 0;
	},
	render: function(context) {
		for (var $t1 = 0; $t1 < this.particles.length; $t1++) {
			var particle = this.particles[$t1];
			particle.render(context, false);
		}
	}
};
$TowerD_Client_ParticleSystem.$random = function() {
	return Math.random() * 2 - 1;
};
////////////////////////////////////////////////////////////////////////////////
// TowerD.Client.ParticleSystem.ParticleSystemCache
var $TowerD_Client_ParticleSystem$ParticleSystemCache = function() {
	this.size = 0;
	this.timeToLive = 0;
	this.sharpness = 0;
	this.start = null;
	this.end = null;
	this.images = null;
};
////////////////////////////////////////////////////////////////////////////////
// TowerD.Client.Waypoint
var $TowerD_Client_Waypoint = function(x, y) {
	this.$1$MapField = null;
	this.$1$XField = 0;
	this.$1$YField = 0;
	this.set_x(x);
	this.set_y(y);
};
$TowerD_Client_Waypoint.prototype = {
	get_map: function() {
		return this.$1$MapField;
	},
	set_map: function(value) {
		this.$1$MapField = value;
	},
	get_x: function() {
		return this.$1$XField;
	},
	set_x: function(value) {
		this.$1$XField = value;
	},
	get_y: function() {
		return this.$1$YField;
	},
	set_y: function(value) {
		this.$1$YField = value;
	},
	reorganize: function() {
		this.get_map().reorganize();
	},
	travel: function(steps, scale) {
		return Array.fromEnumerable(this.get_map().travel(steps, scale, ss.referenceEquals(this.get_map().last(), this)));
	}
};
////////////////////////////////////////////////////////////////////////////////
// TowerD.Client.WaypointMap
var $TowerD_Client_WaypointMap = function(startColor, endColor, points, scale) {
	this.$myScale = null;
	this.waypoints = null;
	this.drawer = null;
	this.$myScale = scale;
	this.waypoints = [];
	for (var index = 0; index < points.length; index++) {
		this.add(points[index]);
	}
	this.drawer = new $TowerD_Client_Drawers_ColorWaypointDrawer(startColor, endColor, this, scale);
};
$TowerD_Client_WaypointMap.prototype = {
	add: function(point) {
		this.waypoints.add(point);
		point.set_map(this);
	},
	first: function() {
		return this.waypoints[0];
	},
	last: function() {
		return this.waypoints[this.waypoints.length - 1];
	},
	travel: function(stepsTotal, scale, reverse) {
		return new ss.IteratorBlockEnumerable(function() {
			return (function(stepsTotal, scale, reverse) {
				var $result, $state = 0, cur, dist, stp, index, index1, waypoint, nextWaypoint, i, waypoint1, nextWaypoint1, i1;
				return new ss.IteratorBlockEnumerator(function() {
					$sm1:
					for (;;) {
						switch ($state) {
							case 0: {
								$state = -1;
								cur = CommonLibraries.DoublePoint.$ctor1(0, 0);
								dist = CommonLibraries.DoublePoint.$ctor1(0, 0);
								stp = stepsTotal / (this.waypoints.length - 1);
								if (reverse) {
									index = this.waypoints.length - 1;
									$state = 1;
									continue $sm1;
								}
								else {
									index1 = 0;
									$state = 2;
									continue $sm1;
								}
							}
							case 1: {
								$state = -1;
								if (!(index >= 1)) {
									$state = -1;
									break $sm1;
								}
								waypoint = this.waypoints[index];
								nextWaypoint = this.waypoints[index - 1];
								cur.x = waypoint.get_x() * scale.x;
								cur.y = waypoint.get_y() * scale.y;
								dist.x = (nextWaypoint.get_x() - waypoint.get_x()) / stp;
								dist.y = (nextWaypoint.get_y() - waypoint.get_y()) / stp;
								i = 0;
								$state = 4;
								continue $sm1;
							}
							case 2: {
								$state = -1;
								if (!(index1 < this.waypoints.length - 1)) {
									$state = -1;
									break $sm1;
								}
								waypoint1 = this.waypoints[index1];
								nextWaypoint1 = this.waypoints[index1 + 1];
								cur.x = waypoint1.get_x() * scale.x;
								cur.y = waypoint1.get_y() * scale.y;
								dist.x = (nextWaypoint1.get_x() - waypoint1.get_x()) / stp;
								dist.y = (nextWaypoint1.get_y() - waypoint1.get_y()) / stp;
								i1 = 0;
								$state = 6;
								continue $sm1;
							}
							case 4: {
								$state = -1;
								if (!(i < stp)) {
									$state = 3;
									continue $sm1;
								}
								cur.x += dist.x * scale.x;
								cur.y += dist.y * scale.y;
								$result = CommonLibraries.Point.$ctor1(ss.Int32.trunc(cur.x), ss.Int32.trunc(cur.y));
								$state = 7;
								return true;
							}
							case 3: {
								$state = -1;
								index--;
								$state = 1;
								continue $sm1;
							}
							case 6: {
								$state = -1;
								if (!(i1 < stp)) {
									$state = 5;
									continue $sm1;
								}
								cur.x += dist.x * scale.x;
								cur.y += dist.y * scale.y;
								$result = CommonLibraries.Point.$ctor1(ss.Int32.trunc(cur.x), ss.Int32.trunc(cur.y));
								$state = 8;
								return true;
							}
							case 5: {
								$state = -1;
								index1++;
								$state = 2;
								continue $sm1;
							}
							case 7: {
								$state = -1;
								i++;
								$state = 4;
								continue $sm1;
							}
							case 8: {
								$state = -1;
								i1++;
								$state = 6;
								continue $sm1;
							}
							default: {
								break $sm1;
							}
						}
					}
					return false;
				}, function() {
					return $result;
				}, null, this);
			}).call(this, stepsTotal, scale, reverse);
		}, this);
	},
	reorganize: function() {
		this.drawer.reoganize();
	}
};
////////////////////////////////////////////////////////////////////////////////
// TowerD.Client.Drawers.ColorWaypointDrawer
var $TowerD_Client_Drawers_ColorWaypointDrawer = function(startColor, endColor, map, scale) {
	this.$myScale = null;
	this.$systems = null;
	this.$1$StartColorField = 0;
	this.$1$EndColorField = 0;
	this.$1$MapField = null;
	this.$myScale = scale;
	this.set_startColor(startColor);
	this.set_endColor(endColor);
	this.set_map(map);
};
$TowerD_Client_Drawers_ColorWaypointDrawer.prototype = {
	get_startColor: function() {
		return this.$1$StartColorField;
	},
	set_startColor: function(value) {
		this.$1$StartColorField = value;
	},
	get_endColor: function() {
		return this.$1$EndColorField;
	},
	set_endColor: function(value) {
		this.$1$EndColorField = value;
	},
	get_map: function() {
		return this.$1$MapField;
	},
	set_map: function(value) {
		this.$1$MapField = value;
	},
	reoganize: function() {
		this.init();
	},
	init: function() {
		this.$systems = [];
		var items = Array.fromEnumerable(this.get_map().travel(50, this.$myScale, false));
		for (var index = 0; index < items.length; index++) {
			var point = items[index];
			var system = new $TowerD_Client_ParticleSystem(3);
			var StartColors = null;
			var EndColors = null;
			var StartColors2 = null;
			var EndColors2 = null;
			switch (this.get_startColor()) {
				case 0: {
					StartColors = [163, 0, 0, 1];
					EndColors = [220, 0, 0, 1];
					break;
				}
				case 1: {
					StartColors = [0, 0, 255, 1];
					EndColors = [0, 0, 173, 1];
					break;
				}
				case 2: {
					StartColors = [53, 244, 73, 1];
					EndColors = [23, 104, 31, 1];
					break;
				}
				case 3: {
					StartColors = [255, 212, 0, 1];
					EndColors = [145, 121, 0, 1];
					break;
				}
			}
			switch (this.get_endColor()) {
				case 0: {
					StartColors2 = [163, 0, 0, 1];
					EndColors2 = [220, 0, 0, 1];
					break;
				}
				case 1: {
					StartColors2 = [0, 0, 255, 1];
					EndColors2 = [0, 0, 173, 1];
					break;
				}
				case 2: {
					StartColors2 = [53, 244, 73, 1];
					EndColors2 = [23, 104, 31, 1];
					break;
				}
				case 3: {
					StartColors2 = [255, 212, 0, 1];
					EndColors2 = [145, 121, 0, 1];
					break;
				}
			}
			StartColors[0] = ss.Int32.trunc(StartColors[0] + (StartColors2[0] - StartColors[0]) * (index / items.length));
			StartColors[1] = ss.Int32.trunc(StartColors[1] + (StartColors2[1] - StartColors[1]) * (index / items.length));
			StartColors[2] = ss.Int32.trunc(StartColors[2] + (StartColors2[2] - StartColors[2]) * (index / items.length));
			StartColors[3] = ss.Int32.trunc(StartColors[3] + (StartColors2[3] - StartColors[3]) * (index / items.length));
			EndColors[0] = ss.Int32.trunc(EndColors[0] + (EndColors2[0] - EndColors[0]) * (index / items.length));
			EndColors[1] = ss.Int32.trunc(EndColors[1] + (EndColors2[1] - EndColors[1]) * (index / items.length));
			EndColors[2] = ss.Int32.trunc(EndColors[2] + (EndColors2[2] - EndColors[2]) * (index / items.length));
			EndColors[3] = ss.Int32.trunc(EndColors[3] + (EndColors2[3] - EndColors[3]) * (index / items.length));
			system.startColor = StartColors;
			system.endColor = EndColors;
			system.size = 9;
			system.maxParticles = 4;
			system.lifeSpan = 11;
			system.lifeSpanRandom = 2;
			system.speed = 1;
			system.gravity = CommonLibraries.DoublePoint.$ctor1(0, 0);
			system.position = point;
			system.init();
			this.$systems.add(system);
		}
	},
	tick: function() {
		for (var $t1 = 0; $t1 < this.$systems.length; $t1++) {
			var particleSystem = this.$systems[$t1];
			particleSystem.update(1);
		}
	},
	draw: function(context, x, y) {
		for (var $t1 = 0; $t1 < this.$systems.length; $t1++) {
			var particleSystem = this.$systems[$t1];
			particleSystem.render(context);
		}
		//            system.Position.X = x;
		//            system.Position.Y = y;
	}
};
////////////////////////////////////////////////////////////////////////////////
// TowerD.Client.Drawers.Drawer
var $TowerD_Client_Drawers_Drawer = function() {
};
$TowerD_Client_Drawers_Drawer.prototype = { init: null, tick: null, draw: null };
////////////////////////////////////////////////////////////////////////////////
// TowerD.Client.Drawers.GunWeaponDrawer
var $TowerD_Client_Drawers_GunWeaponDrawer = function() {
	this.$projectiles = [];
	this.$system = null;
};
$TowerD_Client_Drawers_GunWeaponDrawer.prototype = {
	init: function() {
		this.$system = new $TowerD_Client_ParticleSystem(5);
		this.$system.position = CommonLibraries.Point.$ctor1(300, 190);
		this.$system.startColor = [255, 0, 0, 1];
		this.$system.endColor = [127, 55, 0, 1];
		this.$system.size = 20;
		this.$system.maxParticles = 25;
		this.$system.lifeSpan = 25;
		this.$system.init();
	},
	tick: function() {
		this.$system.update(1);
		for (var $t1 = 0; $t1 < this.$projectiles.length; $t1++) {
			var particleSystem = this.$projectiles[$t1];
			particleSystem.update(1);
		}
	},
	draw: function(context, x, y) {
		this.$system.position.x = x;
		this.$system.position.y = y;
		//     system.Render(context);
		for (var $t1 = 0; $t1 < this.$projectiles.length; $t1++) {
			var particleSystem = this.$projectiles[$t1];
			particleSystem.render(context);
		}
	},
	addProjectile: function(x, y) {
		var proj = new $TowerD_Client_ParticleSystem(6);
		proj.position = CommonLibraries.Point.clone(this.$system.position);
		proj.startColor = [127, 0, 0, 1];
		proj.endColor = [127, 55, 0, 1];
		proj.size = 15;
		proj.maxParticles = 25;
		proj.lifeSpan = 25;
		var angle = Math.atan2(-y - proj.position.y, -x - proj.position.x) / Math.PI * 180 + 180;
		proj.angle = ss.Int32.trunc(angle);
		proj.angleRandom = 10;
		proj.maxEmitted = 10;
		proj.speed = 10;
		proj.gravity = CommonLibraries.DoublePoint.$ctor1(0, 0);
		proj.init();
		this.$projectiles.add(proj);
	}
};
////////////////////////////////////////////////////////////////////////////////
// TowerD.Client.Drawers.KingdomDrawer
var $TowerD_Client_Drawers_KingdomDrawer = function(color) {
	this.$system = null;
	this.color = 0;
	this.color = color;
};
$TowerD_Client_Drawers_KingdomDrawer.prototype = {
	init: function() {
		this.$system = new $TowerD_Client_ParticleSystem(20);
		this.$system.position = CommonLibraries.Point.$ctor1(300, 190);
		switch (this.color) {
			case 0: {
				this.$system.startColor = [163, 0, 0, 1];
				this.$system.endColor = [220, 0, 0, 1];
				break;
			}
			case 1: {
				this.$system.startColor = [0, 0, 255, 1];
				this.$system.endColor = [0, 0, 173, 1];
				break;
			}
			case 2: {
				this.$system.startColor = [53, 244, 73, 1];
				this.$system.endColor = [23, 104, 31, 1];
				break;
			}
			case 3: {
				this.$system.startColor = [255, 212, 0, 1];
				this.$system.endColor = [145, 121, 0, 1];
				break;
			}
		}
		this.$system.size = 28;
		this.$system.maxParticles = 35;
		this.$system.lifeSpan = 6;
		this.$system.speed = 3;
		this.$system.gravity = CommonLibraries.DoublePoint.$ctor1(0, 0);
		this.$system.init();
	},
	tick: function() {
		this.$system.update(1);
	},
	draw: function(context, x, y) {
		this.$system.position.x = x;
		this.$system.position.y = y;
		this.$system.render(context);
	}
};
////////////////////////////////////////////////////////////////////////////////
// TowerD.Client.Drawers.QuickShooterDrawer
var $TowerD_Client_Drawers_QuickShooterDrawer = function(color) {
	this.$curSpeed = 0;
	this.$system = null;
	this.color = 0;
	this.color = color;
};
$TowerD_Client_Drawers_QuickShooterDrawer.prototype = {
	init: function() {
		this.$system = new $TowerD_Client_ParticleSystem(6);
		this.$system.position = CommonLibraries.Point.$ctor1(300, 190);
		switch (this.color) {
			case 0: {
				this.$system.startColor = [163, 0, 0, 1];
				this.$system.endColor = [220, 0, 0, 1];
				break;
			}
			case 1: {
				this.$system.startColor = [0, 0, 255, 1];
				this.$system.endColor = [0, 0, 173, 1];
				break;
			}
			case 2: {
				this.$system.startColor = [53, 244, 73, 1];
				this.$system.endColor = [23, 104, 31, 1];
				break;
			}
			case 3: {
				this.$system.startColor = [255, 212, 0, 1];
				this.$system.endColor = [145, 121, 0, 1];
				break;
			}
		}
		this.$system.size = 30;
		this.$system.sizeRandom = 2;
		this.$system.maxParticles = 30;
		this.$system.lifeSpan = 5;
		this.$system.speed = 1;
		this.$system.gravity = CommonLibraries.DoublePoint.$ctor1(0, 0);
		this.$system.init();
		this.$curSpeed = this.$system.speed;
	},
	tick: function() {
		this.$system.update(1);
	},
	draw: function(context, x, y) {
		this.$system.position.x = x;
		this.$system.position.y = y;
		this.$system.render(context);
	},
	destroy: function() {
		this.$system.active = false;
		return this.$system.particles.length === 0;
	},
	resetSpeed: function() {
		this.$system.speed = this.$curSpeed;
	},
	magnifySpeed: function(rate) {
		this.$system.speed = ss.Int32.trunc(this.$curSpeed * rate);
	}
};
////////////////////////////////////////////////////////////////////////////////
// TowerD.Client.Drawers.ShieldDrawer
var $TowerD_Client_Drawers_ShieldDrawer = function() {
};
////////////////////////////////////////////////////////////////////////////////
// TowerD.Client.Drawers.SingeShotDrawer
var $TowerD_Client_Drawers_SingeShotDrawer = function(color) {
	this.$system = null;
	this.color = 0;
	this.color = color;
};
$TowerD_Client_Drawers_SingeShotDrawer.prototype = {
	init: function() {
		this.$system = new $TowerD_Client_ParticleSystem(6);
		this.$system.position = CommonLibraries.Point.$ctor1(300, 190);
		switch (this.color) {
			case 0: {
				this.$system.startColor = [163, 0, 0, 1];
				this.$system.endColor = [220, 0, 0, 1];
				break;
			}
			case 1: {
				this.$system.startColor = [0, 0, 255, 1];
				this.$system.endColor = [0, 0, 173, 1];
				break;
			}
			case 2: {
				this.$system.startColor = [53, 244, 73, 1];
				this.$system.endColor = [23, 104, 31, 1];
				break;
			}
			case 3: {
				this.$system.startColor = [255, 212, 0, 1];
				this.$system.endColor = [145, 121, 0, 1];
				break;
			}
		}
		this.$system.size = 30;
		this.$system.sizeRandom = 2;
		this.$system.maxParticles = 10;
		this.$system.lifeSpan = 5;
		this.$system.speed = 1;
		this.$system.gravity = CommonLibraries.DoublePoint.$ctor1(0, 0);
		this.$system.init();
	},
	tick: function() {
		this.$system.update(1);
	},
	draw: function(context, x, y) {
		this.$system.position.x = x;
		this.$system.position.y = y;
		this.$system.render(context);
	}
};
////////////////////////////////////////////////////////////////////////////////
// TowerD.Client.Drawers.TowerDrawer
var $TowerD_Client_Drawers_TowerDrawer = function() {
};
////////////////////////////////////////////////////////////////////////////////
// TowerD.Client.Drawers.UnitDrawer
var $TowerD_Client_Drawers_UnitDrawer = function() {
};
$TowerD_Client_Drawers_UnitDrawer.prototype = { destroy: null, resetSpeed: null, magnifySpeed: null };
////////////////////////////////////////////////////////////////////////////////
// TowerD.Client.Drawers.WaypointDrawer
var $TowerD_Client_Drawers_WaypointDrawer = function() {
};
$TowerD_Client_Drawers_WaypointDrawer.prototype = { get_startColor: null, set_startColor: null, get_endColor: null, set_endColor: null, get_map: null, set_map: null, reoganize: null };
////////////////////////////////////////////////////////////////////////////////
// TowerD.Client.Drawers.WeaponDrawer
var $TowerD_Client_Drawers_WeaponDrawer = function() {
};
$TowerD_Client_Drawers_WeaponDrawer.prototype = { addProjectile: null };
////////////////////////////////////////////////////////////////////////////////
// TowerD.Client.Pieces.Shields.Shield
var $TowerD_Client_Pieces_Shields_Shield = function() {
};
$TowerD_Client_Pieces_Shields_Shield.prototype = { get_drawer: null, set_drawer: null, get_strength: null, set_strength: null };
////////////////////////////////////////////////////////////////////////////////
// TowerD.Client.Pieces.Towers.KingdomTower
var $TowerD_Client_Pieces_Towers_KingdomTower = function(color, x, y) {
	this.$1$WeaponsField = null;
	this.$1$ShieldsField = null;
	this.$1$XField = 0;
	this.$1$YField = 0;
	this.$1$DrawerField = null;
	this.set_x(x);
	this.set_y(y);
	this.set_drawer(new $TowerD_Client_Drawers_KingdomDrawer(color));
};
$TowerD_Client_Pieces_Towers_KingdomTower.prototype = {
	get_weapons: function() {
		return this.$1$WeaponsField;
	},
	set_weapons: function(value) {
		this.$1$WeaponsField = value;
	},
	get_shields: function() {
		return this.$1$ShieldsField;
	},
	set_shields: function(value) {
		this.$1$ShieldsField = value;
	},
	get_x: function() {
		return this.$1$XField;
	},
	set_x: function(value) {
		this.$1$XField = value;
	},
	get_y: function() {
		return this.$1$YField;
	},
	set_y: function(value) {
		this.$1$YField = value;
	},
	tick: function() {
		this.get_drawer().tick();
	},
	get_drawer: function() {
		return this.$1$DrawerField;
	},
	set_drawer: function(value) {
		this.$1$DrawerField = value;
	}
};
////////////////////////////////////////////////////////////////////////////////
// TowerD.Client.Pieces.Towers.SingeShotTower
var $TowerD_Client_Pieces_Towers_SingeShotTower = function(color, x, y) {
	this.$1$WeaponsField = null;
	this.$1$ShieldsField = null;
	this.$1$XField = 0;
	this.$1$YField = 0;
	this.$1$DrawerField = null;
	this.set_x(x);
	this.set_y(y);
	this.set_drawer(new $TowerD_Client_Drawers_SingeShotDrawer(color));
};
$TowerD_Client_Pieces_Towers_SingeShotTower.prototype = {
	get_weapons: function() {
		return this.$1$WeaponsField;
	},
	set_weapons: function(value) {
		this.$1$WeaponsField = value;
	},
	get_shields: function() {
		return this.$1$ShieldsField;
	},
	set_shields: function(value) {
		this.$1$ShieldsField = value;
	},
	get_x: function() {
		return this.$1$XField;
	},
	set_x: function(value) {
		this.$1$XField = value;
	},
	get_y: function() {
		return this.$1$YField;
	},
	set_y: function(value) {
		this.$1$YField = value;
	},
	tick: function() {
		this.get_drawer().tick();
	},
	get_drawer: function() {
		return this.$1$DrawerField;
	},
	set_drawer: function(value) {
		this.$1$DrawerField = value;
	}
};
////////////////////////////////////////////////////////////////////////////////
// TowerD.Client.Pieces.Towers.Tower
var $TowerD_Client_Pieces_Towers_Tower = function() {
};
$TowerD_Client_Pieces_Towers_Tower.prototype = { get_weapons: null, set_weapons: null, get_shields: null, set_shields: null, get_x: null, set_x: null, get_y: null, set_y: null, get_drawer: null, set_drawer: null, tick: null };
////////////////////////////////////////////////////////////////////////////////
// TowerD.Client.Pieces.Units.QuickShooterUnit
var $TowerD_Client_Pieces_Units_QuickShooterUnit = function(map, kingdom) {
	this.$ind = 0;
	this.$spinDownTimer = 0;
	this.$spinUpTimer = 0;
	this.$travelPoints = null;
	this.$1$SpinUpTimeField = 0;
	this.$1$SpinDownTimeField = 0;
	this.$1$WeaponsField = null;
	this.$1$ShieldsField = null;
	this.$1$XField = 0;
	this.$1$YField = 0;
	this.$1$DrawerField = null;
	this.$1$KingdomField = null;
	this.set_kingdom(kingdom);
	this.$travelPoints = map;
	this.set_weapons([]);
	this.set_shields([]);
	this.get_weapons().add(new $TowerD_Client_Pieces_Weapons_GunWeapon(this));
	this.set_drawer(new $TowerD_Client_Drawers_QuickShooterDrawer(kingdom.color));
	this.get_drawer().init();
	this.$spinUpTimer = 0;
	this.$spinDownTimer = 0;
	this.set_spinDownTime(30);
	this.set_spinUpTime(20);
};
$TowerD_Client_Pieces_Units_QuickShooterUnit.prototype = {
	get_spinUpTime: function() {
		return this.$1$SpinUpTimeField;
	},
	set_spinUpTime: function(value) {
		this.$1$SpinUpTimeField = value;
	},
	get_spinDownTime: function() {
		return this.$1$SpinDownTimeField;
	},
	set_spinDownTime: function(value) {
		this.$1$SpinDownTimeField = value;
	},
	get_weapons: function() {
		return this.$1$WeaponsField;
	},
	set_weapons: function(value) {
		this.$1$WeaponsField = value;
	},
	get_shields: function() {
		return this.$1$ShieldsField;
	},
	set_shields: function(value) {
		this.$1$ShieldsField = value;
	},
	get_x: function() {
		return this.$1$XField;
	},
	set_x: function(value) {
		this.$1$XField = value;
	},
	get_y: function() {
		return this.$1$YField;
	},
	set_y: function(value) {
		this.$1$YField = value;
	},
	get_drawer: function() {
		return this.$1$DrawerField;
	},
	set_drawer: function(value) {
		this.$1$DrawerField = value;
	},
	get_kingdom: function() {
		return this.$1$KingdomField;
	},
	set_kingdom: function(value) {
		this.$1$KingdomField = value;
	},
	tick: function() {
		var okay;
		var p;
		if (this.$ind === 0) {
			p = this.$travelPoints[this.$ind];
			this.set_x(p.x);
			this.set_y(p.y);
			if (this.$spinUpTimer++ < this.get_spinUpTime()) {
				this.get_drawer().magnifySpeed(5.95);
				okay = true;
			}
			else {
				this.$ind++;
				okay = true;
			}
		}
		else if (this.$ind === this.$travelPoints.length - 1) {
			p = this.$travelPoints[this.$ind];
			this.set_x(p.x);
			this.set_y(p.y);
			if (this.$spinDownTimer++ < this.get_spinDownTime()) {
				this.get_drawer().magnifySpeed(7.2);
				okay = true;
			}
			else {
				okay = !this.get_drawer().destroy();
			}
		}
		else {
			this.get_drawer().resetSpeed();
			p = this.$travelPoints[this.$ind++];
			this.set_x(p.x);
			this.set_y(p.y);
			okay = true;
		}
		var $t1 = this.get_weapons();
		for (var $t2 = 0; $t2 < $t1.length; $t2++) {
			var weapon = $t1[$t2];
			weapon.tick();
		}
		this.get_drawer().tick();
		return okay;
	},
	draw: function(context, x, y) {
		this.get_drawer().draw(context, this.get_x(), this.get_y());
		var $t1 = this.get_weapons();
		for (var $t2 = 0; $t2 < $t1.length; $t2++) {
			var weapon = $t1[$t2];
			weapon.draw(context, this.get_x(), this.get_y());
		}
	}
};
////////////////////////////////////////////////////////////////////////////////
// TowerD.Client.Pieces.Units.Unit
var $TowerD_Client_Pieces_Units_Unit = function() {
};
$TowerD_Client_Pieces_Units_Unit.prototype = { get_weapons: null, set_weapons: null, get_shields: null, set_shields: null, get_x: null, set_x: null, get_y: null, set_y: null, get_drawer: null, set_drawer: null, get_kingdom: null, set_kingdom: null, tick: null, draw: null };
////////////////////////////////////////////////////////////////////////////////
// TowerD.Client.Pieces.Weapons.GunWeapon
var $TowerD_Client_Pieces_Weapons_GunWeapon = function(unit) {
	this.$cooldownTimer = 0;
	this.$curTarget = null;
	this.$1$UnitField = null;
	this.$1$RangeField = 0;
	this.$1$OffsetXField = 0;
	this.$1$OffsetYField = 0;
	this.$1$CooldownField = 0;
	this.$1$StengthField = 0;
	this.$1$DrawerField = null;
	this.set_$unit(unit);
	this.set_drawer(new $TowerD_Client_Drawers_GunWeaponDrawer());
	this.get_drawer().init();
	this.set_cooldown(20);
	this.set_range(6);
};
$TowerD_Client_Pieces_Weapons_GunWeapon.prototype = {
	get_$unit: function() {
		return this.$1$UnitField;
	},
	set_$unit: function(value) {
		this.$1$UnitField = value;
	},
	get_range: function() {
		return this.$1$RangeField;
	},
	set_range: function(value) {
		this.$1$RangeField = value;
	},
	get_offsetX: function() {
		return this.$1$OffsetXField;
	},
	set_offsetX: function(value) {
		this.$1$OffsetXField = value;
	},
	get_offsetY: function() {
		return this.$1$OffsetYField;
	},
	set_offsetY: function(value) {
		this.$1$OffsetYField = value;
	},
	get_cooldown: function() {
		return this.$1$CooldownField;
	},
	set_cooldown: function(value) {
		this.$1$CooldownField = value;
	},
	get_stength: function() {
		return this.$1$StengthField;
	},
	set_stength: function(value) {
		this.$1$StengthField = value;
	},
	get_drawer: function() {
		return this.$1$DrawerField;
	},
	set_drawer: function(value) {
		this.$1$DrawerField = value;
	},
	tick: function() {
		var game = $TowerD_Client_Game.instance;
		this.get_drawer().tick();
		if (this.$cooldownTimer++ < this.get_cooldown()) {
			return true;
		}
		this.$cooldownTimer = 0;
		if (ss.isNullOrUndefined(this.$curTarget)) {
			var $t1 = Object.getObjectEnumerator(game.kingdoms);
			try {
				while ($t1.moveNext()) {
					var kingdomkv = $t1.get_current();
					var kingdom = kingdomkv.value;
					if (!ss.referenceEquals(kingdom, this.get_$unit().get_kingdom())) {
						for (var $t2 = 0; $t2 < kingdom.towers.length; $t2++) {
							var tower = kingdom.towers[$t2];
							var fm = Math.sqrt(Math.pow(ss.Int32.div(this.get_$unit().get_x(), game.scale.x) - tower.get_x(), 2) + Math.pow(ss.Int32.div(this.get_$unit().get_y(), game.scale.y) - tower.get_y(), 2));
							if (fm < this.get_range()) {
								this.$curTarget = tower;
							}
						}
					}
				}
			}
			finally {
				$t1.dispose();
			}
		}
		if (ss.isValue(this.$curTarget)) {
			this.get_drawer().addProjectile(this.$curTarget.get_x(), this.$curTarget.get_y());
		}
		this.$curTarget = null;
		return true;
	},
	draw: function(context, x, y) {
		this.get_drawer().draw(context, x + this.get_offsetX(), y + this.get_offsetY());
	}
};
////////////////////////////////////////////////////////////////////////////////
// TowerD.Client.Pieces.Weapons.Weapon
var $TowerD_Client_Pieces_Weapons_Weapon = function() {
};
$TowerD_Client_Pieces_Weapons_Weapon.prototype = { get_range: null, set_range: null, get_offsetX: null, set_offsetX: null, get_offsetY: null, set_offsetY: null, get_cooldown: null, set_cooldown: null, get_stength: null, set_stength: null, get_drawer: null, set_drawer: null, tick: null, draw: null };
Type.registerClass(global, 'TowerD.Client.Game', $TowerD_Client_Game, ClientAPI.LampClient);
Type.registerClass(global, 'TowerD.Client.Kingdom', $TowerD_Client_Kingdom, Object);
Type.registerClass(global, 'TowerD.Client.Particle', $TowerD_Client_Particle, Object);
Type.registerClass(global, 'TowerD.Client.ParticleSystem', $TowerD_Client_ParticleSystem, Object);
Type.registerClass(global, 'TowerD.Client.ParticleSystem$ParticleSystemCache', $TowerD_Client_ParticleSystem$ParticleSystemCache, Object);
Type.registerClass(global, 'TowerD.Client.Waypoint', $TowerD_Client_Waypoint, Object);
Type.registerClass(global, 'TowerD.Client.WaypointMap', $TowerD_Client_WaypointMap, Object);
Type.registerInterface(global, 'TowerD.Client.Drawers.Drawer', $TowerD_Client_Drawers_Drawer, []);
Type.registerInterface(global, 'TowerD.Client.Drawers.ShieldDrawer', $TowerD_Client_Drawers_ShieldDrawer, [$TowerD_Client_Drawers_Drawer]);
Type.registerInterface(global, 'TowerD.Client.Drawers.TowerDrawer', $TowerD_Client_Drawers_TowerDrawer, [$TowerD_Client_Drawers_Drawer]);
Type.registerInterface(global, 'TowerD.Client.Drawers.UnitDrawer', $TowerD_Client_Drawers_UnitDrawer, [$TowerD_Client_Drawers_Drawer]);
Type.registerInterface(global, 'TowerD.Client.Drawers.WaypointDrawer', $TowerD_Client_Drawers_WaypointDrawer, [$TowerD_Client_Drawers_Drawer]);
Type.registerInterface(global, 'TowerD.Client.Drawers.WeaponDrawer', $TowerD_Client_Drawers_WeaponDrawer, [$TowerD_Client_Drawers_Drawer]);
Type.registerInterface(global, 'TowerD.Client.Pieces.Shields.Shield', $TowerD_Client_Pieces_Shields_Shield, []);
Type.registerInterface(global, 'TowerD.Client.Pieces.Towers.Tower', $TowerD_Client_Pieces_Towers_Tower, []);
Type.registerInterface(global, 'TowerD.Client.Pieces.Units.Unit', $TowerD_Client_Pieces_Units_Unit, []);
Type.registerInterface(global, 'TowerD.Client.Pieces.Weapons.Weapon', $TowerD_Client_Pieces_Weapons_Weapon, []);
Type.registerClass(global, 'TowerD.Client.Drawers.ColorWaypointDrawer', $TowerD_Client_Drawers_ColorWaypointDrawer, Object, $TowerD_Client_Drawers_Drawer, $TowerD_Client_Drawers_WaypointDrawer);
Type.registerClass(global, 'TowerD.Client.Drawers.GunWeaponDrawer', $TowerD_Client_Drawers_GunWeaponDrawer, Object, $TowerD_Client_Drawers_Drawer, $TowerD_Client_Drawers_WeaponDrawer);
Type.registerClass(global, 'TowerD.Client.Drawers.KingdomDrawer', $TowerD_Client_Drawers_KingdomDrawer, Object, $TowerD_Client_Drawers_Drawer, $TowerD_Client_Drawers_TowerDrawer);
Type.registerClass(global, 'TowerD.Client.Drawers.QuickShooterDrawer', $TowerD_Client_Drawers_QuickShooterDrawer, Object, $TowerD_Client_Drawers_Drawer, $TowerD_Client_Drawers_UnitDrawer);
Type.registerClass(global, 'TowerD.Client.Drawers.SingeShotDrawer', $TowerD_Client_Drawers_SingeShotDrawer, Object, $TowerD_Client_Drawers_Drawer, $TowerD_Client_Drawers_TowerDrawer);
Type.registerClass(global, 'TowerD.Client.Pieces.Towers.KingdomTower', $TowerD_Client_Pieces_Towers_KingdomTower, Object, $TowerD_Client_Pieces_Towers_Tower);
Type.registerClass(global, 'TowerD.Client.Pieces.Towers.SingeShotTower', $TowerD_Client_Pieces_Towers_SingeShotTower, Object, $TowerD_Client_Pieces_Towers_Tower);
Type.registerClass(global, 'TowerD.Client.Pieces.Units.QuickShooterUnit', $TowerD_Client_Pieces_Units_QuickShooterUnit, Object, $TowerD_Client_Pieces_Units_Unit);
Type.registerClass(global, 'TowerD.Client.Pieces.Weapons.GunWeapon', $TowerD_Client_Pieces_Weapons_GunWeapon, Object, $TowerD_Client_Pieces_Weapons_Weapon);
$TowerD_Client_Game.DRAWFAST = false;
$TowerD_Client_Game.instance = null;
$TowerD_Client_Game.debugText = null;
$TowerD_Client_Particle.$info = CommonClientLibraries.CanvasInformation.create$2(300, 300);
