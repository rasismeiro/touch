  
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
  
  el.addEventListener('swiperigth',function(e){
      e.target.innerHTML = 'rigth';
  });
  
  el.addEventListener('pinchin',function(e){
      e.target.innerHTML = 'pinch in '+e.scale.toFixed(3);
      
      var f = parseInt(e.target.style['font-size'].replace('px',''));
      f = Math.round(f * parseFloat(e.scale));
      e.target.style.fontSize = f+'px';
      if (e.scale>1.5){
        alert(f);
      }
  });
  
  el.addEventListener('pinchout',function(e){
      e.target.innerHTML = 'pinch out '+ e.scale.toFixed(3);
      
      var f = parseInt(e.target.style['font-size'].replace('px',''));
      f = Math.round(f * parseFloat(e.scale));
      e.target.style.fontSize = f+'px';
      
      if (e.scale<0.5){
        alert(f);
      }
  });
  
  new Touch(el);
