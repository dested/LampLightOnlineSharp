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
	this.$myPlayers = null;
	this.kingdoms = null;
	this.waypointMaps = null;
	ClientAPI.LampClient.call(this);
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
	KeyboardJS.bind.key('space', Function.mkdel(this, function() {
		var $t17 = Object.getObjectEnumerator(this.kingdoms);
		try {
			while ($t17.moveNext()) {
				var kingdom = $t17.get_current();
				var $t19 = kingdom.value.units;
				var $t18 = [];
				$t18.add(new $TowerD_Client_Pieces_Unit_QuickShooterUnit(kingdom.value.waypoints[0].getPath(), this.scale, kingdom.value.color));
				$t18.add(new $TowerD_Client_Pieces_Unit_QuickShooterUnit(kingdom.value.waypoints[1].getPath(), this.scale, kingdom.value.color));
				$t18.add(new $TowerD_Client_Pieces_Unit_QuickShooterUnit(kingdom.value.waypoints[2].getPath(), this.scale, kingdom.value.color));
				$t19.addRange($t18);
			}
		}
		finally {
			$t17.dispose();
		}
	}), function() {
	});
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
	mouseMove: function(jQueryEvent) {
		return false;
	},
	onClick: function(jQueryEvent) {
		var tower = new $TowerD_Client_Pieces_Towers_SingeShotTower(3, ss.Int32.div(jQueryEvent.clientX, this.scale.x), ss.Int32.div(jQueryEvent.clientY, this.scale.y));
		this.kingdoms['Steve'].towers.add(tower);
		tower.get_drawer().init();
		return ClientAPI.LampClient.prototype.onClick.call(this, jQueryEvent);
	},
	mouseUp: function(jQueryEvent) {
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
////////////////////////////////////////////////////////////////////////////////
// TowerD.Client.Particle
var $TowerD_Client_Particle = function() {
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
	this.$grads = [];
	this.$curGradIndex = 0;
	this.position = CommonLibraries.Point.$ctor1(0, 0);
	this.direction = CommonLibraries.DoublePoint.$ctor1(0, 0);
	this.deltaColor = new Array(4);
	this.color = new Array(4);
};
$TowerD_Client_Particle.prototype = {
	buildCache: function(delta) {
		return;
		var timetolive = this.timeToLive;
		while (this.$progress(delta)) {
			var key = this.drawColor + this.size;
			if (!Object.keyExists(this.system.cachedGrads, key)) {
				if (!$TowerD_Client_Game.debugText[0]) {
					$TowerD_Client_Game.debugText[0] = 0;
				}
				$TowerD_Client_Game.debugText[0] = ss.Nullable.unbox(Type.cast($TowerD_Client_Game.debugText[0], ss.Int32)) + 1;
				var grad = this.$obtainGradient($TowerD_Client_Particle.$info.context, this);
				this.$grads.add(grad);
				this.system.cachedGrads[key] = grad;
			}
			else {
				this.$grads.add(this.system.cachedGrads[key]);
			}
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
		return true;
	},
	render: function(context) {
		var x = this.position.x;
		var y = this.position.y;
		context.save();
		context.translate(x, y);
		$TowerD_Client_Particle.$drawGrad(context, this.$obtainGradient(context, this), this.size);
		//   drawGrad(context, grads[curGradIndex++], Size);
		context.restore();
	},
	$obtainGradient: function(context, particle) {
		var halfSize = ss.Int32.trunc(particle.size) >> 1;
		//   string key = halfSize + particle.DrawColor + particle.SizeSmall;
		//   if (grads.ContainsKey(key)) {
		//   return grads[key];
		//   }
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
////////////////////////////////////////////////////////////////////////////////
// TowerD.Client.ParticleSystem
var $TowerD_Client_ParticleSystem = function() {
	this.cachedGrads = {};
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
	this.maxParticles = 150;
	this.particles = [];
	this.active = true;
	this.position = CommonLibraries.Point.$ctor1(100, 100);
	this.positionRandom = CommonLibraries.Point.$ctor1(10, 10);
	this.size = 45;
	this.sizeRandom = 15;
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
	this.elapsedTime = 0;
	this.duration = -1;
	this.emissionRate = 0;
	this.emitCounter = 0;
};
$TowerD_Client_ParticleSystem.prototype = {
	init: function() {
		this.emissionRate = ss.Int32.div(this.maxParticles, this.lifeSpan);
		this.emitCounter = 0;
	},
	addParticle: function() {
		if (this.particles.length === this.maxParticles) {
			return null;
		}
		// Take the next particle out of the particle pool we have created and initialize it	
		var particle = new $TowerD_Client_Particle();
		this.$initParticle(particle);
		this.particles.add(particle);
		// Increment the particle count 
		return particle;
	},
	$initParticle: function(particle) {
		particle.system = this;
		var RANDM1TO1 = function() {
			return Math.random() * 2 - 1;
		};
		particle.position.x = ss.Int32.trunc(this.position.x + this.positionRandom.x * RANDM1TO1());
		particle.position.y = ss.Int32.trunc(this.position.y + this.positionRandom.y * RANDM1TO1());
		var newAngle = (this.angle + this.angleRandom * RANDM1TO1()) * (Math.PI / 180);
		// convert to radians
		var vector = CommonLibraries.DoublePoint.$ctor1(Math.cos(newAngle), Math.sin(newAngle));
		// Could move to lookup for speed
		var vectorSpeed = this.speed + this.speedRandom * RANDM1TO1();
		particle.direction = CommonLibraries.DoublePoint.multiply(vector, vectorSpeed);
		particle.size = this.size + this.sizeRandom * RANDM1TO1();
		particle.size = ((particle.size < 0) ? 0 : ~~ss.Int32.trunc(particle.size));
		particle.timeToLive = this.lifeSpan + this.lifeSpanRandom * RANDM1TO1();
		particle.sharpness = this.sharpness + this.sharpnessRandom * RANDM1TO1();
		particle.sharpness = ((particle.sharpness > 100) ? 100 : ((particle.sharpness < 0) ? 0 : particle.sharpness));
		// internal circle gradient size - affects the sharpness of the radial gradient
		particle.sizeSmall = ~~ss.Int32.trunc(particle.size / 200 * particle.sharpness);
		//(size/2/100)
		var start = [this.startColor[0] + this.startColorRandom[0] * RANDM1TO1(), this.startColor[1] + this.startColorRandom[1] * RANDM1TO1(), this.startColor[2] + this.startColorRandom[2] * RANDM1TO1(), this.startColor[3] + this.startColorRandom[3] * RANDM1TO1()];
		var end = [this.endColor[0] + this.endColorRandom[0] * RANDM1TO1(), this.endColor[1] + this.endColorRandom[1] * RANDM1TO1(), this.endColor[2] + this.endColorRandom[2] * RANDM1TO1(), this.endColor[3] + this.endColorRandom[3] * RANDM1TO1()];
		particle.color = start;
		particle.deltaColor[0] = (end[0] - start[0]) / particle.timeToLive;
		particle.deltaColor[1] = (end[1] - start[1]) / particle.timeToLive;
		particle.deltaColor[2] = (end[2] - start[2]) / particle.timeToLive;
		particle.deltaColor[3] = (end[3] - start[3]) / particle.timeToLive;
		particle.buildCache(1);
		if (!$TowerD_Client_Game.debugText[1]) {
			$TowerD_Client_Game.debugText[1] = 0;
		}
		$TowerD_Client_Game.debugText[1] = ss.Nullable.unbox(Type.cast($TowerD_Client_Game.debugText[1], ss.Int32)) + 1;
	},
	update: function(delta) {
		if (this.active && this.emissionRate > 0) {
			var rate = ss.Int32.div(1, this.emissionRate);
			this.emitCounter += delta;
			while (this.particles.length < this.maxParticles && this.emitCounter > rate) {
				this.addParticle();
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
			particle.render(context);
		}
	}
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
	getPath: function() {
		if (ss.isNullOrUndefined(this.get_map())) {
			return null;
		}
		return (ss.referenceEquals(this.get_map().last(), this) ? this.get_map().reverse() : this.get_map());
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
	travel: function(stepsTotal, scale) {
		return new ss.IteratorBlockEnumerable(function() {
			return (function(stepsTotal, scale) {
				var $result, $state = 0, cur, dist, stp, index, waypoint, nextWaypoint, i;
				return new ss.IteratorBlockEnumerator(function() {
					$sm1:
					for (;;) {
						switch ($state) {
							case 0: {
								$state = -1;
								cur = CommonLibraries.DoublePoint.$ctor1(0, 0);
								dist = CommonLibraries.DoublePoint.$ctor1(0, 0);
								stp = stepsTotal / (this.waypoints.length - 1);
								index = 0;
								$state = 1;
								continue $sm1;
							}
							case 1: {
								$state = -1;
								if (!(index < this.waypoints.length - 1)) {
									$state = -1;
									break $sm1;
								}
								waypoint = this.waypoints[index];
								nextWaypoint = this.waypoints[index + 1];
								cur.x = waypoint.get_x() * scale.x;
								cur.y = waypoint.get_y() * scale.y;
								dist.x = (nextWaypoint.get_x() - waypoint.get_x()) / stp;
								dist.y = (nextWaypoint.get_y() - waypoint.get_y()) / stp;
								i = 0;
								$state = 3;
								continue $sm1;
							}
							case 3: {
								$state = -1;
								if (!(i < stp)) {
									$state = 2;
									continue $sm1;
								}
								cur.x += dist.x * scale.x;
								cur.y += dist.y * scale.y;
								$result = CommonLibraries.Point.$ctor1(ss.Int32.trunc(cur.x), ss.Int32.trunc(cur.y));
								$state = 4;
								return true;
							}
							case 2: {
								$state = -1;
								index++;
								$state = 1;
								continue $sm1;
							}
							case 4: {
								$state = -1;
								i++;
								$state = 3;
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
			}).call(this, stepsTotal, scale);
		}, this);
	},
	reverse: function() {
		var waypoints = this.waypoints.clone();
		waypoints.reverse();
		return new $TowerD_Client_WaypointMap(this.drawer.get_endColor(), this.drawer.get_startColor(), waypoints, this.$myScale);
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
	init: function() {
		this.$systems = [];
		var items = Array.fromEnumerable(this.get_map().travel(30, this.$myScale));
		for (var index = 0; index < items.length; index++) {
			var point = items[index];
			var system = new $TowerD_Client_ParticleSystem();
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
			system.size = 7;
			system.maxParticles = 10;
			system.lifeSpan = 10;
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
	this.$system = null;
};
$TowerD_Client_Drawers_GunWeaponDrawer.prototype = {
	init: function() {
		this.$system = new $TowerD_Client_ParticleSystem();
		this.$system.position = CommonLibraries.Point.$ctor1(300, 190);
		this.$system.startColor = [255, 0, 0, 1];
		this.$system.endColor = [127, 55, 0, 1];
		this.$system.size = 20;
		this.$system.maxParticles = 200;
		this.$system.lifeSpan = 40;
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
// TowerD.Client.Drawers.KingdomDrawer
var $TowerD_Client_Drawers_KingdomDrawer = function(color) {
	this.$system = null;
	this.color = 0;
	this.color = color;
};
$TowerD_Client_Drawers_KingdomDrawer.prototype = {
	init: function() {
		this.$system = new $TowerD_Client_ParticleSystem();
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
		this.$system.maxParticles = 50;
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
	this.$system = null;
	this.$curSpeed = 0;
	this.color = 0;
	this.color = color;
};
$TowerD_Client_Drawers_QuickShooterDrawer.prototype = {
	init: function() {
		this.$system = new $TowerD_Client_ParticleSystem();
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
		this.$system = new $TowerD_Client_ParticleSystem();
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
$TowerD_Client_Drawers_WaypointDrawer.prototype = { get_startColor: null, set_startColor: null, get_endColor: null, set_endColor: null, get_map: null, set_map: null };
////////////////////////////////////////////////////////////////////////////////
// TowerD.Client.Drawers.WeaponDrawer
var $TowerD_Client_Drawers_WeaponDrawer = function() {
};
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
// TowerD.Client.Pieces.Unit.QuickShooterUnit
var $TowerD_Client_Pieces_Unit_QuickShooterUnit = function(map, scale, color) {
	this.$ind = 0;
	this.$travelPoints = null;
	this.$1$MapField = null;
	this.$1$ColorField = 0;
	this.$spinUpTimer = 0;
	this.$spinDownTimer = 0;
	this.$1$SpinUpTimeField = 0;
	this.$1$SpinDownTimeField = 0;
	this.$1$WeaponsField = null;
	this.$1$ShieldsField = null;
	this.$1$XField = 0;
	this.$1$YField = 0;
	this.$1$DrawerField = null;
	this.set_map(map);
	this.set_color(color);
	this.$travelPoints = Array.fromEnumerable(map.travel(150, scale));
	this.set_drawer(new $TowerD_Client_Drawers_QuickShooterDrawer(color));
	this.get_drawer().init();
	this.$spinUpTimer = 0;
	this.$spinDownTimer = 0;
	this.set_spinDownTime(80);
	this.set_spinUpTime(40);
};
$TowerD_Client_Pieces_Unit_QuickShooterUnit.prototype = {
	get_map: function() {
		return this.$1$MapField;
	},
	set_map: function(value) {
		this.$1$MapField = value;
	},
	get_color: function() {
		return this.$1$ColorField;
	},
	set_color: function(value) {
		this.$1$ColorField = value;
	},
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
	tick: function() {
		var okay = true;
		var p;
		if (this.$ind === 0) {
			p = this.$travelPoints[this.$ind];
			this.set_x(p.x);
			this.set_y(p.y);
			if (this.$spinUpTimer++ < this.get_spinUpTime()) {
				this.get_drawer().magnifySpeed(2.95);
				okay = true;
			}
			else {
				this.$ind++;
			}
		}
		else if (this.$ind === this.$travelPoints.length - 1) {
			p = this.$travelPoints[this.$ind];
			this.set_x(p.x);
			this.set_y(p.y);
			if (this.$spinDownTimer++ < this.get_spinDownTime()) {
				this.get_drawer().magnifySpeed(3.8);
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
		this.get_drawer().tick();
		return okay;
	},
	draw: function(context, x, y) {
		this.get_drawer().draw(context, this.get_x(), this.get_y());
	}
};
////////////////////////////////////////////////////////////////////////////////
// TowerD.Client.Pieces.Unit.Unit
var $TowerD_Client_Pieces_Unit_Unit = function() {
};
$TowerD_Client_Pieces_Unit_Unit.prototype = { get_weapons: null, set_weapons: null, get_shields: null, set_shields: null, get_x: null, set_x: null, get_y: null, set_y: null, get_drawer: null, set_drawer: null, tick: null, draw: null };
////////////////////////////////////////////////////////////////////////////////
// TowerD.Client.Pieces.Weapons.Weapon
var $TowerD_Client_Pieces_Weapons_Weapon = function() {
};
$TowerD_Client_Pieces_Weapons_Weapon.prototype = { get_range: null, set_range: null, get_offsetX: null, set_offsetX: null, get_offsetY: null, set_offsetY: null, get_cooldown: null, set_cooldown: null, get_stength: null, set_stength: null, get_drawer: null, set_drawer: null };
Type.registerClass(global, 'TowerD.Client.Game', $TowerD_Client_Game, ClientAPI.LampClient);
Type.registerClass(global, 'TowerD.Client.Kingdom', $TowerD_Client_Kingdom, Object);
Type.registerClass(global, 'TowerD.Client.Particle', $TowerD_Client_Particle, Object);
Type.registerClass(global, 'TowerD.Client.ParticleSystem', $TowerD_Client_ParticleSystem, Object);
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
Type.registerInterface(global, 'TowerD.Client.Pieces.Unit.Unit', $TowerD_Client_Pieces_Unit_Unit, []);
Type.registerInterface(global, 'TowerD.Client.Pieces.Weapons.Weapon', $TowerD_Client_Pieces_Weapons_Weapon, []);
Type.registerClass(global, 'TowerD.Client.Drawers.ColorWaypointDrawer', $TowerD_Client_Drawers_ColorWaypointDrawer, Object, $TowerD_Client_Drawers_Drawer, $TowerD_Client_Drawers_WaypointDrawer);
Type.registerClass(global, 'TowerD.Client.Drawers.GunWeaponDrawer', $TowerD_Client_Drawers_GunWeaponDrawer, Object, $TowerD_Client_Drawers_Drawer, $TowerD_Client_Drawers_WeaponDrawer);
Type.registerClass(global, 'TowerD.Client.Drawers.KingdomDrawer', $TowerD_Client_Drawers_KingdomDrawer, Object, $TowerD_Client_Drawers_Drawer, $TowerD_Client_Drawers_TowerDrawer);
Type.registerClass(global, 'TowerD.Client.Drawers.QuickShooterDrawer', $TowerD_Client_Drawers_QuickShooterDrawer, Object, $TowerD_Client_Drawers_Drawer, $TowerD_Client_Drawers_UnitDrawer);
Type.registerClass(global, 'TowerD.Client.Drawers.SingeShotDrawer', $TowerD_Client_Drawers_SingeShotDrawer, Object, $TowerD_Client_Drawers_Drawer, $TowerD_Client_Drawers_TowerDrawer);
Type.registerClass(global, 'TowerD.Client.Pieces.Towers.KingdomTower', $TowerD_Client_Pieces_Towers_KingdomTower, Object, $TowerD_Client_Pieces_Towers_Tower);
Type.registerClass(global, 'TowerD.Client.Pieces.Towers.SingeShotTower', $TowerD_Client_Pieces_Towers_SingeShotTower, Object, $TowerD_Client_Pieces_Towers_Tower);
Type.registerClass(global, 'TowerD.Client.Pieces.Unit.QuickShooterUnit', $TowerD_Client_Pieces_Unit_QuickShooterUnit, Object, $TowerD_Client_Pieces_Unit_Unit);
$TowerD_Client_Game.debugText = null;
$TowerD_Client_Particle.$info = CommonClientLibraries.CanvasInformation.create(300, 300);
