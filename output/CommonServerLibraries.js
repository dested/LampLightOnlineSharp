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
	return '50.116.28.16';
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
var $CommonServerLibraries_Queue_QueueItemCollection = function(queueItems) {
	this.$queueItems = null;
	this.$queueItems = queueItems;
};
$CommonServerLibraries_Queue_QueueItemCollection.prototype = {
	getByChannel: function(channel) {
		var $t1 = this.$queueItems.getEnumerator();
		try {
			while ($t1.moveNext()) {
				var queueWatcher = $t1.get_current();
				if (ss.referenceEquals(queueWatcher.channel, channel) || channel.indexOf(queueWatcher.channel.replaceAll('*', '')) === 0) {
					return queueWatcher;
				}
			}
		}
		finally {
			$t1.dispose();
		}
		return null;
	}
};
////////////////////////////////////////////////////////////////////////////////
// CommonServerLibraries.Queue.QueueManager
var $CommonServerLibraries_Queue_QueueManager = function(name, options) {
	this.name = null;
	this.channels = null;
	this.qp = null;
	this.$qpCollection = null;
	this.qw = null;
	this.$qwCollection = null;
	this.name = name;
	this.channels = new Object();
	this.qw = [];
	this.qp = [];
	for (var $t1 = 0; $t1 < options.watchers.length; $t1++) {
		var queueWatcher = options.watchers[$t1];
		if (ss.isNullOrUndefined(queueWatcher.get_callback())) {
			queueWatcher.set_callback(Function.mkdel(this, this.$messageReceived(Object)));
		}
		this.qw.add(queueWatcher);
	}
	this.qw.addRange(options.watchers);
	for (var $t2 = 0; $t2 < options.pushers.length; $t2++) {
		var pusher = options.pushers[$t2];
		this.qp.add(new $CommonServerLibraries_Queue_QueuePusher(pusher));
	}
	this.$qwCollection = new $CommonServerLibraries_Queue_QueueItemCollection(this.qw);
	this.$qpCollection = new $CommonServerLibraries_Queue_QueueItemCollection(this.qp);
};
$CommonServerLibraries_Queue_QueueManager.prototype = {
	addChannel: function(channel, callback) {
		this.channels[channel] = callback;
	},
	$messageReceived: function(T) {
		return function(name, user, eventChannel, content) {
			user.set_gateway(name);
			if (!!ss.isValue(this.channels[eventChannel])) {
				this.channels[eventChannel](user, content);
			}
		};
	},
	sendMessage: function(T) {
		return function(user, channel, eventChannel, content) {
			if (ss.isNullOrUndefined(this.$qpCollection.getByChannel(channel))) {
				console.log(channel + ' No Existy');
				return;
			}
			var pusher = Type.cast(this.$qpCollection.getByChannel(channel), $CommonServerLibraries_Queue_QueuePusher);
			pusher.message(T).call(pusher, channel, this.name, user, eventChannel, content);
		};
	}
};
////////////////////////////////////////////////////////////////////////////////
// CommonServerLibraries.Queue.QueueManagerOptions
var $CommonServerLibraries_Queue_QueueManagerOptions = function(watchers, pushers) {
	this.pushers = null;
	this.watchers = null;
	this.pushers = pushers;
	this.watchers = watchers;
};
////////////////////////////////////////////////////////////////////////////////
// CommonServerLibraries.Queue.QueueMessage
var $CommonServerLibraries_Queue_QueueMessage$1 = function(T) {
	var $type = function(name, user, eventChannel, content) {
		this.content = T.getDefaultValue();
		this.eventChannel = null;
		this.name = null;
		this.user = null;
		this.name = name;
		this.user = user;
		this.eventChannel = eventChannel;
		this.content = content;
	};
	Type.registerGenericClassInstance($type, $CommonServerLibraries_Queue_QueueMessage$1, [T], function() {
		return Object;
	}, function() {
		return [];
	});
	return $type;
};
Type.registerGenericClass(global, 'CommonServerLibraries.Queue.QueueMessage$1', $CommonServerLibraries_Queue_QueueMessage$1, 1);
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
	message: function(T) {
		return function(channel, name, user, eventChannel, content) {
			var message = new (Type.makeGenericType($CommonServerLibraries_Queue_QueueMessage$1, [T]))(name, user, eventChannel, content);
			var value = JSON.stringify(message, CommonLibraries.Help.sanitize);
			this.$client1.rpush(channel, value);
			//todo:maybe sanitize
		};
	}
};
////////////////////////////////////////////////////////////////////////////////
// CommonServerLibraries.Queue.QueueWatcher
var $CommonServerLibraries_Queue_QueueWatcher = function(queue, callback) {
	this.$client1 = null;
	this.$2$CallbackField = null;
	$CommonServerLibraries_Queue_QueueItem.call(this);
	this.channel = queue;
	this.set_callback(callback);
	var redis = require('redis');
	this.$client1 = redis.createClient(6379, $CommonServerLibraries_IPs.get_redisIP());
	this.cycle(queue);
};
$CommonServerLibraries_Queue_QueueWatcher.prototype = {
	get_callback: function() {
		return this.$2$CallbackField;
	},
	set_callback: function(value) {
		this.$2$CallbackField = value;
	},
	cycle: function(channel) {
		this.$client1.blpop([channel, 0], Function.mkdel(this, function(caller, dtj) {
			var data = Type.cast(dtj, Array);
			if (ss.isValue(dtj)) {
				var dt = JSON.parse(data[1]);
				this.get_callback()(dt.name, dt.user, dt.eventChannel, dt.content);
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
Type.registerClass(global, 'CommonServerLibraries.Queue.QueuePusher', $CommonServerLibraries_Queue_QueuePusher, $CommonServerLibraries_Queue_QueueItem);
Type.registerClass(global, 'CommonServerLibraries.Queue.QueueWatcher', $CommonServerLibraries_Queue_QueueWatcher, $CommonServerLibraries_Queue_QueueItem);
