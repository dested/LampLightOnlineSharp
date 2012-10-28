////////////////////////////////////////////////////////////////////////////////
// TowerD.Client.Game
var $TowerD_Client_Game = function() {
	this.$myPlayers = null;
	this.$p2 = null;
	ClientAPI.LampClient.call(this);
};
$TowerD_Client_Game.prototype = {
	init: function(players, context) {
		this.$myPlayers = players;
		context.globalCompositeOperation = 'lighter';
		this.$p2 = new $TowerD_Client_ParticleSystem();
		// Set some properties - check the class
		this.$p2.position = CommonLibraries.Point.$ctor1(300, 190);
		this.$p2.startColourRandom = [255, 255, 255, 1];
		this.$p2.endColourRandom = [255, 255, 255, 1];
		this.$p2.size = 20;
		this.$p2.maxParticles = 200;
		this.$p2.init();
	},
	tick: function() {
		this.$p2.update(1);
	},
	mouseMove: function(jQueryEvent) {
		this.$p2.position = CommonLibraries.Point.$ctor1(jQueryEvent.clientX, jQueryEvent.clientY);
		return false;
	},
	onClick: function(jQueryEvent) {
		return ClientAPI.LampClient.prototype.onClick.call(this, jQueryEvent);
	},
	mouseUp: function(jQueryEvent) {
		return ClientAPI.LampClient.prototype.mouseUp.call(this, jQueryEvent);
	},
	draw: function(context) {
		context.globalCompositeOperation = 'lighter';
		this.$p2.render(context);
	}
};
////////////////////////////////////////////////////////////////////////////////
// TowerD.Client.Particle
var $TowerD_Client_Particle = function() {
	this.position = null;
	this.direction = null;
	this.sharpness = 0;
	this.size = 0;
	this.timeToLive = 0;
	this.sizeSmall = 0;
	this.colour = null;
	this.deltaColour = null;
	this.drawColour = null;
	this.drawColourTransparent = null;
	this.position = CommonLibraries.DoublePoint.$ctor1(0, 0);
	this.direction = CommonLibraries.DoublePoint.$ctor1(0, 0);
	this.deltaColour = new Array(4);
	this.colour = new Array(4);
};
////////////////////////////////////////////////////////////////////////////////
// TowerD.Client.ParticleSystem
var $TowerD_Client_ParticleSystem = function() {
	this.emitCounter = 0;
	this.emissionRate = 0;
	this.duration = 0;
	this.elapsedTime = 0;
	this.lifeSpan = 0;
	this.lifeSpanRandom = 0;
	this.gravity = null;
	this.sharpness = 0;
	this.sharpnessRandom = 0;
	this.endColourRandom = null;
	this.endColour = null;
	this.startColourRandom = null;
	this.startColour = null;
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
	this.startColour = [250, 218, 68, 1];
	this.startColourRandom = [62, 60, 60, 0];
	this.endColour = [245, 35, 0, 0];
	this.endColourRandom = [60, 60, 60, 0];
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
		var start = [this.startColour[0] + this.startColourRandom[0] * RANDM1TO1(), this.startColour[1] + this.startColourRandom[1] * RANDM1TO1(), this.startColour[2] + this.startColourRandom[2] * RANDM1TO1(), this.startColour[3] + this.startColourRandom[3] * RANDM1TO1()];
		var end = [this.endColour[0] + this.endColourRandom[0] * RANDM1TO1(), this.endColour[1] + this.endColourRandom[1] * RANDM1TO1(), this.endColour[2] + this.endColourRandom[2] * RANDM1TO1(), this.endColour[3] + this.endColourRandom[3] * RANDM1TO1()];
		particle.colour = start;
		particle.deltaColour[0] = (end[0] - start[0]) / particle.timeToLive;
		particle.deltaColour[1] = (end[1] - start[1]) / particle.timeToLive;
		particle.deltaColour[2] = (end[2] - start[2]) / particle.timeToLive;
		particle.deltaColour[3] = (end[3] - start[3]) / particle.timeToLive;
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
				this.$stop();
			}
		}
		for (var index = this.particles.length - 1; index >= 0; index--) {
			var currentParticle = this.particles[index];
			// If the current particle is alive then update it
			if (currentParticle.timeToLive > 0) {
				// Calculate the new direction based on gravity
				currentParticle.direction = CommonLibraries.DoublePoint.add(currentParticle.direction, this.gravity);
				currentParticle.position = CommonLibraries.DoublePoint.add(currentParticle.position, currentParticle.direction);
				currentParticle.timeToLive -= delta;
				// Update colours based on delta
				var r = currentParticle.colour[0] += currentParticle.deltaColour[0] * delta;
				var g = currentParticle.colour[1] += currentParticle.deltaColour[1] * delta;
				var b = currentParticle.colour[2] += currentParticle.deltaColour[2] * delta;
				var a = currentParticle.colour[3] += currentParticle.deltaColour[3] * delta;
				// Calculate the rgba string to draw.
				var draw = [];
				draw.add('rgba(' + ((r > 255) ? 255 : ((r < 0) ? 0 : ~~ss.Int32.trunc(r))));
				draw.add(((g > 255) ? 255 : ((g < 0) ? 0 : ~~ss.Int32.trunc(g))).toString());
				draw.add(((b > 255) ? 255 : ((b < 0) ? 0 : ~~ss.Int32.trunc(b))).toString());
				draw.add(((a > 1) ? '1' : ((a < 0) ? '0' : a.toFixed(2))) + ')');
				currentParticle.drawColour = draw.join(',');
				draw.removeAt(3);
				draw.add('0)');
				currentParticle.drawColourTransparent = draw.join(',');
			}
			else {
				this.particles.remove(currentParticle);
			}
		}
	},
	$stop: function() {
		this.active = false;
		this.elapsedTime = 0;
		this.emitCounter = 0;
	},
	render: function(context) {
		for (var $t1 = 0; $t1 < this.particles.length; $t1++) {
			var particle = this.particles[$t1];
			var size = particle.size;
			var halfSize = ss.Int32.trunc(size) >> 1;
			var x = ~~ss.Int32.trunc(particle.position.x);
			var y = ~~ss.Int32.trunc(particle.position.y);
			var radgrad = context.createRadialGradient(x + halfSize, y + halfSize, particle.sizeSmall, x + halfSize, y + halfSize, halfSize);
			radgrad.addColorStop(0, particle.drawColour);
			radgrad.addColorStop(1, particle.drawColourTransparent);
			//Super cool if you change these values (and add more colour stops)
			context.fillStyle = radgrad;
			context.fillRect(x, y, size, size);
		}
	}
};
Type.registerClass(global, 'TowerD.Client.Game', $TowerD_Client_Game, ClientAPI.LampClient);
Type.registerClass(global, 'TowerD.Client.Particle', $TowerD_Client_Particle, Object);
Type.registerClass(global, 'TowerD.Client.ParticleSystem', $TowerD_Client_ParticleSystem, Object);
