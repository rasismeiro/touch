  
  var el = document.getElementById('demo');
  
  el.addEventListener('tap',function(e){
      e.target.innerHTML = 'tap';
  });
  
  el.addEventListener('dbltap',function(e){
      e.target.innerHTML = 'double tap';
  });
  
  el.addEventListener('swipeup',function(e){
      e.target.innerHTML = 'up';
  });
  
  el.addEventListener('swipedown',function(e){
      e.target.innerHTML = 'down';
  });
  
  el.addEventListener('swipeleft',function(e){
      e.target.innerHTML = 'left';
  });
  
  el.addEventListener('swiperight',function(e){
      e.target.innerHTML = 'right';
  });
  
  el.addEventListener('pinchin',function(e){
      e.target.innerHTML = 'pinch in '+e.scale.toFixed(3);
      
      var f = parseInt(e.style['font-size'].replace('px',''));
      f = Math.round(f * parseFloat(e.scale));
      if (f<32) { e.target.style.fontSize = f+'px';}
  });
  
  el.addEventListener('pinchout',function(e){
      e.target.innerHTML = 'pinch out '+ e.scale.toFixed(3);
      
      var f = parseInt(e.style['font-size'].replace('px',''));
      f = Math.round(f * parseFloat(e.scale));
      if (f>10) { e.target.style.fontSize = f+'px';}
  });
  
  new Touch(el);
