////////////////////////////////////////////////////////////////////////////////
// CommonLibraries.DelegateOrValue
var $CommonLibraries_DelegateOrValue$1 = function(T) {
	var $type = function(d) {
		this.isValue = false;
		this.$method = null;
		this.$value = T.getDefaultValue();
		this.$method = d;
		this.isValue = false;
	};
	$type.prototype = {
		$evaluate: function() {
			if (this.isValue === true) {
				return this.$value;
			}
			else if (this.isValue === false) {
				return this.$method();
			}
			return T.getDefaultValue();
		}
	};
	$type.$ctor1 = function(d) {
		this.isValue = false;
		this.$method = null;
		this.$value = T.getDefaultValue();
		this.$value = d;
		this.isValue = true;
	};
	$type.$ctor1.prototype = $type.prototype;
	$type.op_Implicit$2 = function(d) {
		return new (Type.makeGenericType($CommonLibraries_DelegateOrValue$1, [T]).$ctor1)(d);
	};
	$type.op_Implicit$1 = function(d) {
		return new (Type.makeGenericType($CommonLibraries_DelegateOrValue$1, [T]))(d);
	};
	$type.op_Implicit = function(d) {
		return d.$evaluate();
	};
	Type.registerGenericClassInstance($type, $CommonLibraries_DelegateOrValue$1, [T], function() {
		return Object;
	}, function() {
		return [];
	});
	return $type;
};
Type.registerGenericClass(global, 'CommonLibraries.DelegateOrValue$1', $CommonLibraries_DelegateOrValue$1, 1);
////////////////////////////////////////////////////////////////////////////////
// CommonLibraries.DoublePoint
var $CommonLibraries_DoublePoint = function() {
};
$CommonLibraries_DoublePoint.offset = function($this, windowLocation) {
	return $CommonLibraries_DoublePoint.$ctor1($this.x + windowLocation.x, $this.y + windowLocation.y);
};
$CommonLibraries_DoublePoint.negate = function($this, windowLocation) {
	return $CommonLibraries_DoublePoint.$ctor1($this.x - windowLocation.x, $this.y - windowLocation.y);
};
$CommonLibraries_DoublePoint.negate$1 = function($this, x, y) {
	return $CommonLibraries_DoublePoint.$ctor1($this.x - x, $this.y - y);
};
$CommonLibraries_DoublePoint.op_Implicit = function(p) {
	return $CommonLibraries_DoublePoint.$ctor1(p.x, p.y);
};
$CommonLibraries_DoublePoint.string = function($this) {
	return String.format('{{X:{0}, Y:{1}}}', $this.x, $this.y);
};
$CommonLibraries_DoublePoint.multiply = function($this, scaleFactor) {
	$this.x *= scaleFactor;
	$this.y *= scaleFactor;
	return $this;
};
$CommonLibraries_DoublePoint.add = function($this, scaleFactor) {
	$this.x += scaleFactor.x;
	$this.y += scaleFactor.y;
	return $this;
};
$CommonLibraries_DoublePoint.add$1 = function($this, scaleFactor) {
	$this.x += scaleFactor;
	$this.y += scaleFactor;
	return $this;
};
$CommonLibraries_DoublePoint.toPoint = function($this) {
	return $CommonLibraries_Point.$ctor1(ss.Int32.trunc($this.x), ss.Int32.trunc($this.y));
};
$CommonLibraries_DoublePoint.$ctor1 = function(x, y) {
	var $this = {};
	$this.x = 0;
	$this.y = 0;
	$this.x = x;
	$this.y = y;
	return $this;
};
$CommonLibraries_DoublePoint.$ctor = function(pos) {
	var $this = {};
	$this.x = 0;
	$this.y = 0;
	$this.x = pos.x;
	$this.y = pos.y;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// CommonLibraries.Extensions
var $CommonLibraries_Extensions = function() {
};
$CommonLibraries_Extensions.percent$1 = function(num) {
	return num + '%';
};
$CommonLibraries_Extensions.percent = function(num) {
	return num + '%';
};
$CommonLibraries_Extensions.withData = function(T, T2) {
	return function(item, data) {
		return new (Type.makeGenericType($CommonLibraries_ExtraData$2, [T, T2]))(item, data);
	};
};
////////////////////////////////////////////////////////////////////////////////
// CommonLibraries.ExtraData
var $CommonLibraries_ExtraData$2 = function(T, T2) {
	var $type = function(item, data) {
		this.item = T.getDefaultValue();
		this.data = T2.getDefaultValue();
		this.data = data;
		this.item = item;
	};
	$type.op_Implicit = function(d) {
		return d.item;
	};
	$type.op_Implicit$1 = function(d) {
		return d.data;
	};
	Type.registerGenericClassInstance($type, $CommonLibraries_ExtraData$2, [T, T2], function() {
		return Object;
	}, function() {
		return [];
	});
	return $type;
};
Type.registerGenericClass(global, 'CommonLibraries.ExtraData$2', $CommonLibraries_ExtraData$2, 2);
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
////////////////////////////////////////////////////////////////////////////////
// CommonLibraries.IntersectingRectangle
var $CommonLibraries_IntersectingRectangle = function(x, y, width, height) {
	this.x = 0;
	this.y = 0;
	this.width = 0;
	this.height = 0;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
};
$CommonLibraries_IntersectingRectangle.prototype = {
	intersects: function(p) {
		return this.x < p.x && this.x + this.width > p.x && this.y < p.y && this.y + this.height > p.y;
	}
};
$CommonLibraries_IntersectingRectangle.intersectsRect = function(r, p) {
	return r.x < p.x && r.x + r.width > p.x && r.y < p.y && r.y + r.height > p.y;
};
$CommonLibraries_IntersectingRectangle.intersectRect = function(r1, r2) {
	return !(r2.x > r1.x + r1.width || r2.x + 0 < r1.x || r2.y > r1.y + r1.height || r2.y + 0 < r1.y);
};
////////////////////////////////////////////////////////////////////////////////
// CommonLibraries.Point
var $CommonLibraries_Point = function() {
};
$CommonLibraries_Point.offset = function($this, windowLocation) {
	return $CommonLibraries_Point.$ctor1($this.x + windowLocation.x, $this.y + windowLocation.y);
};
$CommonLibraries_Point.negate = function($this, windowLocation) {
	return $CommonLibraries_Point.$ctor1($this.x - windowLocation.x, $this.y - windowLocation.y);
};
$CommonLibraries_Point.negate$1 = function($this, x, y) {
	return $CommonLibraries_Point.$ctor1($this.x - x, $this.y - y);
};
$CommonLibraries_Point.set = function($this, x, y) {
	$this.x = x;
	$this.y = y;
};
$CommonLibraries_Point.add = function($this, scaleFactor) {
	$this.x += ss.Int32.trunc(scaleFactor.x);
	$this.y += ss.Int32.trunc(scaleFactor.y);
	return $this;
};
$CommonLibraries_Point.add$1 = function($this, scaleFactor) {
	$this.x += ss.Int32.trunc(scaleFactor);
	$this.y += ss.Int32.trunc(scaleFactor);
	return $CommonLibraries_DoublePoint.op_Implicit($this);
};
$CommonLibraries_Point.clone = function($this) {
	return $CommonLibraries_Point.$ctor1($this.x, $this.y);
};
$CommonLibraries_Point.normalize = function($this, scale) {
	var norm = Math.sqrt($this.x * $this.x + $this.y * $this.y);
	if (norm !== 0) {
		$this.x = ss.Int32.trunc(scale * $this.x / norm);
		$this.y = ss.Int32.trunc(scale * $this.y / norm);
	}
	return $this;
};
$CommonLibraries_Point.$ctor1 = function(x, y) {
	var $this = {};
	$this.x = 0;
	$this.y = 0;
	$this.x = x;
	$this.y = y;
	return $this;
};
$CommonLibraries_Point.$ctor = function(pos) {
	var $this = {};
	$this.x = 0;
	$this.y = 0;
	$this.x = pos.x;
	$this.y = pos.y;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// CommonLibraries.Rectangle
var $CommonLibraries_Rectangle = function() {
};
$CommonLibraries_Rectangle.createInstance = function() {
	return $CommonLibraries_Rectangle.$ctor();
};
$CommonLibraries_Rectangle.$ctor = function() {
	var $this = $CommonLibraries_Point.$ctor1(0, 0);
	$this.width = 0;
	$this.height = 0;
	return $this;
};
$CommonLibraries_Rectangle.$ctor1 = function(x, y, width, height) {
	var $this = $CommonLibraries_Point.$ctor1(x, y);
	$this.width = 0;
	$this.height = 0;
	$this.width = width;
	$this.height = height;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// CommonLibraries.SizeNumber
var $CommonLibraries_SizeNumber = function(s) {
	this.$value = null;
	this.$value = s.toString();
};
$CommonLibraries_SizeNumber.$ctor1 = function(s) {
	this.$value = null;
	this.$value = s;
};
$CommonLibraries_SizeNumber.$ctor1.prototype = $CommonLibraries_SizeNumber.prototype;
$CommonLibraries_SizeNumber.op_Implicit$3 = function(d) {
	return new $CommonLibraries_SizeNumber.$ctor1(d);
};
$CommonLibraries_SizeNumber.op_Implicit$2 = function(d) {
	return new $CommonLibraries_SizeNumber(d);
};
$CommonLibraries_SizeNumber.op_Implicit$1 = function(d) {
	return d.$value;
};
$CommonLibraries_SizeNumber.op_Implicit = function(d) {
	return parseFloat(d.$value.replaceAll('%', ''));
};
Type.registerClass(global, 'CommonLibraries.DoublePoint', $CommonLibraries_DoublePoint, Object);
Type.registerClass(global, 'CommonLibraries.Extensions', $CommonLibraries_Extensions, Object);
Type.registerClass(global, 'CommonLibraries.Guid', $CommonLibraries_Guid, Object);
Type.registerClass(global, 'CommonLibraries.Help', $CommonLibraries_Help, Object);
Type.registerClass(global, 'CommonLibraries.IntersectingRectangle', $CommonLibraries_IntersectingRectangle, Object);
Type.registerClass(global, 'CommonLibraries.Point', $CommonLibraries_Point, Object);
Type.registerClass(global, 'CommonLibraries.Rectangle', $CommonLibraries_Rectangle);
Type.registerClass(global, 'CommonLibraries.SizeNumber', $CommonLibraries_SizeNumber, Object);
