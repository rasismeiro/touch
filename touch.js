(function(w,d) {
  
  "use strict";
  
  w.Touch = function(id) {
    var t = {
      t: ['up', 'right', 'down', 'left'],
      tt: 300, tp: 150, dtp: 222, td: 50, lt: -1, 
      ltt: null, s : null, fn: [], e: null, o: null,
      p1: {x: 0, y: 0, t: 0},
      p2: {x: 0, y: 0, t: 0},
      distance: function() {
        return Math.round(Math.sqrt(Math.pow((this.p1.x - this.p2.x), 2) + Math.pow((this.p1.y - this.p2.y), 2)));
      },
      angle: function() {
        var d = Math.abs(this.p2.x - this.p1.x);
        return Math.round(Math.acos(d / Math.sqrt(Math.pow(d, 2) + Math.pow(this.p2.y - this.p1.y, 2))) * 57.3);
      },
      reset: function() {
        var target = this.e.touches.item(0);
        this.p1.x = target.clientX;
        this.p1.y = target.clientY;
        this.p1.t = this.e.timeStamp;
        this.p2.x = this.p1.x;
        this.p2.y = this.p1.y;
        this.p2.t = this.p1.t;
      },
      update: function() {
        var target = this.e.touches.item(0);
        this.p2.t = this.e.timeStamp;
        this.p2.x = target.clientX;
        this.p2.y = target.clientY;
      },
      direction: function() {
        return (this.angle() > 45) ? ((this.p1.y < this.p2.y) ? 2 : 0) : ((this.p1.x < this.p2.x) ? 1 : 3);
      },
      time: function() {
        return this.p2.t - this.p1.t;
      },   
      on: function(event, fn) {
        this.fn[event] = fn;
        return this;
      },
      swipe: function() {
        var f = 'swipe' + this.t[this.direction()];
        var e = new CustomEvent(f);
        this.o.dispatchEvent(e);        
        if ('function' === typeof(this.fn[f])) {
          this.fn[f](this.o);
        }        
      },
      pinch: function() {
        var e, n = 'pinch',dt = {scale : this.e.scale, style: this.s},
            p = {bubbles: false, cancelable: false, detail: dt};    
        if (this.e.scale < 1.0) {
          e = new CustomEvent('pinchout',p);
          e.scale = this.e.scale;
          e.style = dt.style;
          this.o.dispatchEvent(e);
          if ('function' === typeof this.fn[n+'out']) {
             this.fn[n+'out'](this.o, dt.scale, dt.style);
          }
        } else if (this.e.scale > 1.0){
          e = new CustomEvent('pinchin',p);
          e.scale = this.e.scale;
          e.style = dt.style;
          this.o.dispatchEvent(e);
          if ('function' === typeof this.fn[n+'in']){
             this.fn[n+'in'](this.o, this.e.scale, this.s);
          }
        }
      },
      tap: function(){
         var e = new CustomEvent('tap');
         this.o.dispatchEvent(e);
         if ('function' === typeof this.fn.tap){
           this.fn.tap(this.o);
         }
      },
      dbltap: function (){
        var e = new CustomEvent('dbltap');
        this.o.dispatchEvent(e);
        if ('function' === typeof this.fn.dbltap){
           this.fn.dbltap(this.o);
         }
      }
    };
    
    var CustomEvent = function(e, p) {
        p = p || {bubbles: false, cancelable: false, detail: undefined};
        var evt = d.createEvent('CustomEvent');
        evt.initCustomEvent(e, p.bubbles, p.cancelable, p.detail);
        return evt;
    };
    CustomEvent.prototype = w.CustomEvent.prototype;
    w.CustomEvent = CustomEvent;

    t.o = ('object' !== typeof id) ? d.getElementById(id) : id;

    if (null !== t.o) {
      t.o.addEventListener('touchstart', function(e){
        e.preventDefault();
        t.e = e;
        t.reset();
      }, false);

      t.o.addEventListener('touchmove', function(e){
        e.preventDefault();
        t.e = e;
        t.update();
      }, false);

      t.o.addEventListener('touchend', function(e){                
        e.preventDefault();
        t.e = e;        
        t.p2.t = e.timeStamp;
        var d, dd = t.distance(), tt = t.time();        
        if ((dd > t.td) && (tt < t.tt)){
          t.swipe();
        } else if (dd < 5 && tt < t.tp){
          if (t.lt<0){t.lt = e.timeStamp;}          
          d = e.timeStamp - t.lt;          
          t.lt = e.timeStamp;          
          if (d>10 && d<t.dtp) {
            w.clearTimeout(t.ltt);
            t.dbltap();
          } else {
            t.ltt = w.setTimeout(function(){t.tap();},t.dtp);
          }
          
        }
      }, false);

      t.o.addEventListener('gesturestart', function(e){
        e.preventDefault();
        t.e = e;
        var i,j,s = [], style = w.getComputedStyle(t.o, null);
        for(i = 0, j = style.length; i < j; i++){
           s[style[i]] = style.getPropertyValue(style[i]);
        }
        t.s = s;
      }, false);

      t.o.addEventListener('gesturechange', function(e){
        e.preventDefault();
        t.e = e;
        t.pinch();
      }, false);

      t.o.addEventListener('gestureend', function(e){        
        e.preventDefault();
        t.p1.t = e.timeStamp - (t.tt + 1);
        t.p2.t = e.timeStamp;       
      }, false);
    }
    return t;
  };
})(window, document);
