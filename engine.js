var Particle = function(x,y){
	this.cur = new Vector(x,y);
	this.prev = new Vector(x,y);
	this.force = new Vector(0,0);
}

Particle.prototype = {

	inertia: function(){
		var tmp = this.cur.mul(2).isub(this.prev);
		this.prev.set(this.cur);
		this.cur.set(tmp);
	}
	,applyForce: function(f){
		this.force.iadd(f);
	}
	,accelerate: function(dt){
		this.cur.iadd(this.force.mul(dt*dt));
		this.force.reset();
	}
	,moveTo: function(pos){
		this.cur.set(pos);
		this.prev.set(pos);
	}
};

var Spring = function(a,b,stiffness){
	this.a = a;
	this.b = b;
	this.k = stiffness;
	this.restLength = 3;//a.cur.distance(b.cur);
}

var Joint = function(a,b,stiffness){
	return new Spring(a,b,8); //stiff enough??
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
	}
}
