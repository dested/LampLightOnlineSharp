////////////////////////////////////////////////////////////////////////////////
// CommonServerLibraries.Consumer
var $CommonServerLibraries_Consumer = function(obj) {
	var tf = this;
	var $t1 = Object.keys(obj).getEnumerator();
	try {
		while ($t1.moveNext()) {
			var v = $t1.get_current();
			tf[v] = obj[v];
		}
	}
	finally {
		$t1.dispose();
	}
};
////////////////////////////////////////////////////////////////////////////////
// CommonServerLibraries.IPs
var $CommonServerLibraries_IPs = function() {
};
$CommonServerLibraries_IPs.get_gatewayIP = function() {
	return '50.116.22.241';
};
$CommonServerLibraries_IPs.get_redisIP = function() {
	return '50.116.28.16';
};
////////////////////////////////////////////////////////////////////////////////
// CommonServerLibraries.Queue.PubSub
var $CommonServerLibraries_Queue_PubSub = function(ready) {
	this.$pready = false;
	this.$pubClient = null;
	this.$sready = false;
	this.$subClient = null;
	this.$subbed = null;
	this.$subbed = new Object();
	var someSubbed = this.$subbed;
	var redis = require('redis');
	redis.debug_mode = false;
	this.$subClient = redis.createClient(6379, $CommonServerLibraries_IPs.get_redisIP());
	this.$pubClient = redis.createClient(6379, $CommonServerLibraries_IPs.get_redisIP());
	this.$subClient.on('subscribe', function(channel, count) {
		console.log('subscribed: ' + channel + ' ' + count);
	});
	this.$subClient.on('unsubscribe', function(channel1, count1) {
		console.log('unsubscribed: ' + channel1 + ' ' + count1);
	});
	this.$subClient.on('message', function(channel2, message) {
		if (!!ss.isValue(someSubbed[channel2])) {
			someSubbed[channel2](message);
		}
	});
	this.$subClient.on('ready', Function.mkdel(this, function() {
		this.$sready = true;
		if (this.$sready && this.$pready) {
			ready();
		}
	}));
	this.$pubClient.on('ready', Function.mkdel(this, function() {
		this.$pready = true;
		if (this.$sready && this.$pready) {
			ready();
		}
	}));
};
$CommonServerLibraries_Queue_PubSub.prototype = {
	publish: function(channel, content) {
		this.$pubClient.publish(channel, content);
	},
	subscribe: function(channel, callback) {
		this.$subClient.subscribe(channel);
		this.$subbed[channel] = callback;
	}
};
////////////////////////////////////////////////////////////////////////////////
// CommonServerLibraries.Queue.QueueItem
var $CommonServerLibraries_Queue_QueueItem = function() {
	this.channel = null;
};
////////////////////////////////////////////////////////////////////////////////
// CommonServerLibraries.Queue.QueueItemCollection
var $CommonServerLibraries_Queue_QueueItemCollection = function() {
	this.$queueItems = null;
	this.$queueItems = [];
};
$CommonServerLibraries_Queue_QueueItemCollection.prototype = {
	getByChannel: function(channel) {
		for (var $t1 = 0; $t1 < this.$queueItems.length; $t1++) {
			var queueWatcher = this.$queueItems[$t1];
			if (ss.referenceEquals(queueWatcher.channel, channel) || channel.indexOf(queueWatcher.channel.replaceAll('*', '')) === 0) {
				return queueWatcher;
			}
		}
		return null;
	},
	addItem: function(item) {
		this.$queueItems.add(item);
	}
};
////////////////////////////////////////////////////////////////////////////////
// CommonServerLibraries.Queue.QueueManager
var $CommonServerLibraries_Queue_QueueManager = function(name) {
	this.$channels = null;
	this.$qpCollection = null;
	this.$qwCollection = null;
	this.$1$NameField = null;
	this.set_name(name);
	this.$channels = {};
	this.$qwCollection = new $CommonServerLibraries_Queue_QueueItemCollection();
	this.$qpCollection = new $CommonServerLibraries_Queue_QueueItemCollection();
};
$CommonServerLibraries_Queue_QueueManager.prototype = {
	get_name: function() {
		return this.$1$NameField;
	},
	set_name: function(value) {
		this.$1$NameField = value;
	},
	addChannel: function(channel, callback) {
		this.$channels[channel] = callback;
	},
	$messageReceived: function(name, user, message) {
		user.gateway = name;
		if (ss.isValue(this.$channels[message.channel])) {
			this.$channels[message.channel](user, message);
		}
	},
	sendMessage: function(user, channel, message) {
		var pusher = Type.cast(this.$qpCollection.getByChannel(channel), $CommonServerLibraries_Queue_QueuePusher);
		if (ss.isNullOrUndefined(pusher)) {
			console.log(channel + ' No Existy');
			return;
		}
		pusher.message(channel, this.get_name(), user, message);
	},
	addWatcher: function(queueWatcher) {
		if (ss.isNullOrUndefined(queueWatcher.callback)) {
			queueWatcher.callback = Function.mkdel(this, this.$messageReceived);
		}
		this.$qwCollection.addItem(queueWatcher);
	},
	addPusher: function(queuePusher) {
		this.$qpCollection.addItem(queuePusher);
	}
};
////////////////////////////////////////////////////////////////////////////////
// CommonServerLibraries.Queue.QueueManagerOptions
var $CommonServerLibraries_Queue_QueueManagerOptions = function(watchers, pushers) {
	this.pushers = null;
	this.watchers = null;
	this.watchers = watchers;
	this.pushers = pushers;
};
////////////////////////////////////////////////////////////////////////////////
// CommonServerLibraries.Queue.QueueMessage
var $CommonServerLibraries_Queue_QueueMessage = function(name, user, content) {
	this.content = null;
	this.name = null;
	this.user = null;
	this.name = name;
	this.user = user;
	this.content = content;
};
////////////////////////////////////////////////////////////////////////////////
// CommonServerLibraries.Queue.QueuePusher
var $CommonServerLibraries_Queue_QueuePusher = function(pusher) {
	this.$client1 = null;
	$CommonServerLibraries_Queue_QueueItem.call(this);
	var redis = require('redis');
	this.channel = pusher;
	this.$client1 = redis.createClient(6379, $CommonServerLibraries_IPs.get_redisIP());
};
$CommonServerLibraries_Queue_QueuePusher.prototype = {
	message: function(channel, name, user, content) {
		var message = new $CommonServerLibraries_Queue_QueueMessage(name, user, content);
		var value = JSON.stringify(message, CommonLibraries.Help.sanitize);
		this.$client1.rpush(channel, value);
		//todo:maybe sanitize
	}
};
////////////////////////////////////////////////////////////////////////////////
// CommonServerLibraries.Queue.QueueWatcher
var $CommonServerLibraries_Queue_QueueWatcher = function(queue, callback) {
	this.$client1 = null;
	this.callback = null;
	$CommonServerLibraries_Queue_QueueItem.call(this);
	this.channel = queue;
	this.callback = callback;
	var redis = require('redis');
	this.$client1 = redis.createClient(6379, $CommonServerLibraries_IPs.get_redisIP());
	this.cycle(queue);
};
$CommonServerLibraries_Queue_QueueWatcher.prototype = {
	cycle: function(channel) {
		this.$client1.blpop([channel, 0], Function.mkdel(this, function(caller, dtj) {
			var data = Type.cast(dtj, Array);
			if (ss.isValue(dtj)) {
				var dt = JSON.parse(data[1]);
				this.callback(dt.name, dt.user, dt.content);
			}
			this.cycle(channel);
		}));
	}
};
Type.registerClass(global, 'CommonServerLibraries.Consumer', $CommonServerLibraries_Consumer, Object);
Type.registerClass(global, 'CommonServerLibraries.IPs', $CommonServerLibraries_IPs, Object);
Type.registerClass(global, 'CommonServerLibraries.Queue.PubSub', $CommonServerLibraries_Queue_PubSub, Object);
Type.registerClass(global, 'CommonServerLibraries.Queue.QueueItem', $CommonServerLibraries_Queue_QueueItem, Object);
Type.registerClass(global, 'CommonServerLibraries.Queue.QueueItemCollection', $CommonServerLibraries_Queue_QueueItemCollection, Object);
Type.registerClass(global, 'CommonServerLibraries.Queue.QueueManager', $CommonServerLibraries_Queue_QueueManager, Object);
Type.registerClass(global, 'CommonServerLibraries.Queue.QueueManagerOptions', $CommonServerLibraries_Queue_QueueManagerOptions, Object);
Type.registerClass(global, 'CommonServerLibraries.Queue.QueueMessage', $CommonServerLibraries_Queue_QueueMessage, Object);
Type.registerClass(global, 'CommonServerLibraries.Queue.QueuePusher', $CommonServerLibraries_Queue_QueuePusher, $CommonServerLibraries_Queue_QueueItem);
Type.registerClass(global, 'CommonServerLibraries.Queue.QueueWatcher', $CommonServerLibraries_Queue_QueueWatcher, $CommonServerLibraries_Queue_QueueItem);
