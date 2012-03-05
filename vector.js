var Vector = function(x,y){
	this.x = x;
	this.y = y;
};

Vector.prototype = {
	set: function(v){
		this.x = v.x;
		this.y = v.y;
		return this;
	},

	reset: function(){
		this.x = 0;
		this.y = 0;
	},
	
	copy: function(){
		return new Vector(this.x, this.y);
	},

	add: function(v){
		return this.copy().iadd(v);
	},
	iadd: function(v){
		this.x += v.x;
		this.y += v.y;
		return this;
	},
	
	sub: function(v){
		return this.copy().isub(v);
	},
	isub: function(v){
		this.x -= v.x;
		this.y -= v.y;
		return this;
	},
	
	mul: function(n) {
		return this.copy().imul(n);
	},
	imul: function(n) {
		this.x *= n;
		this.y *= n;
		return this;
	},

	
	div: function(n) {
		return this.copy().idiv(n);
	},
	idiv: function(n) {
		this.x /= n;
		this.y /= n;
		return this;
	},
	
	len: function() {
		return Math.sqrt(this.x*this.x + this.y*this.y);
	},
	distance: function(v){
		return this.sub(v).len();
	},
	
	normalised: function(){
		return this.div(this.len());
	}
	
};
