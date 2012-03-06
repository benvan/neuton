var Particle = Class.extend({
	cur:null,
	prev:null,
	force:null,
	fixed:false,
	init: function(x,y){
		this.cur = new Vector(x,y);
		this.prev = new Vector(x,y);
		this.force = new Vector(0,0);
	},
	inertia: function(){
		if (this.fixed) return;
		var tmp = this.cur.mul(2).isub(this.prev);
		this.prev.set(this.cur);
		this.cur.set(tmp);
	}
	,applyForce: function(f){
		this.force.iadd(f);
	}
	,accelerate: function(dt){
		if (this.fixed) return;
		this.cur.iadd(this.force.mul(dt*dt));
		this.force.reset();
	}
	,moveTo: function(pos){
		this.cur.set(pos);
		this.prev.set(pos);
	},
	draw:function(ctx){
		ctx.beginPath();
		ctx.arc(this.cur.x, this.cur.y, 1.5, 0, Math.PI*2, false);
		ctx.fill();
	},
	fix:function(v){
		this.fixed = (v == undefined) || v;
	}
});

var Spring = function(a,b,stiffness,len){
	this.a = a;
	this.b = b;
	this.k = stiffness;
	this.restLength = 4;//a.cur.distance(b.cur);
}

var Joint = function(a,b,stiffness){
	return new Spring(a,b,1); //stiff enough??
};


Spring.prototype = {
	relax: function(){
		var p1 = this.a.cur;
		var p2 = this.b.cur;
		
		var delta = p2.sub(p1);
		var dlen = delta.len();
		if (dlen > this.restLength){
		
			var mag = (dlen-this.restLength)/dlen;
			var force = delta.mul(mag).mul(this.k);


			this.a.applyForce(force);
			this.b.applyForce(force.mul(-1));
		}
	},
	draw: function(ctx){
		ctx.beginPath();
		ctx.moveTo(this.a.cur.x, this.a.cur.y);
		ctx.lineTo(this.b.cur.x, this.b.cur.y);
		ctx.stroke();
	}
}

var Rope = function(start,end,segments){
	this.start = new Particle(start.x, start.y);
	this.end = new Particle(end.x, end.y);
	this.segments = segments;
	this.particles = [];
	this.joints = [];

	var diff = a.sub(b);
	var incr = diff.normalised().imul(diff.len()/segments);
	var joinA = this.start;
	var joinB = this.end;
	for (var i = 0; i < segments; i++){
		this.particles.push(joinA);
		var offset = start.add(incr.mul(i));
		joinB = new Particle(offset.x, offset.y);
		this.joints.push(new Joint(joinA, joinB));
		joinA = joinB;
	}
	this.particles.push(joinB);
	
};

var Ball = Particle.extend({
	size:null,
	init: function(x,y,size){
		this._super(x,y);
		this.size = size;
	},
	draw: function(ctx){
		ctx.beginPath();
		ctx.arc(this.cur.x, this.cur.y, this.size, 0, Math.PI*2, false);
		var ret = ctx.fillStyle;
		ctx.fillStyle = '#bbb';
		ctx.fill();
		ctx.fillStyle = ret;
		ctx.stroke();
	}
});


