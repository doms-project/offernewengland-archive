
(function(){
  var root=document.getElementById('one-fc');
  if(!root)return;

  /* progressive-enhancement: only hide reveals once JS runs */
  root.classList.add('fc-anim');

  /* ---- sticky nav shadow + mobile menu ---- */
  var nav=document.getElementById('fc-nav');
  var burger=document.getElementById('fc-burger');
  window.addEventListener('scroll',function(){
    if(window.scrollY>8){nav.classList.add('is-stuck');}else{nav.classList.remove('is-stuck');}
  },{passive:true});
  if(burger){burger.addEventListener('click',function(){nav.classList.toggle('is-open');});}
  document.querySelectorAll('#fc-links a').forEach(function(a){
    a.addEventListener('click',function(){nav.classList.remove('is-open');});
  });

  /* ---- hero slideshow ---- */
  var slides=[].slice.call(root.querySelectorAll('.fc-slide'));
  var dotsWrap=document.getElementById('fc-dots');
  var cur=0,timer=null;
  if(slides.length>1&&dotsWrap){
    slides.forEach(function(s,i){
      var b=document.createElement('button');
      b.setAttribute('aria-label','Slide '+(i+1));
      if(i===0)b.className='is-active';
      b.addEventListener('click',function(){go(i);reset();});
      dotsWrap.appendChild(b);
    });
    var dots=[].slice.call(dotsWrap.children);
    var go=function(n){
      slides[cur].classList.remove('is-active');
      dots[cur].classList.remove('is-active');
      cur=(n+slides.length)%slides.length;
      slides[cur].classList.add('is-active');
      dots[cur].classList.add('is-active');
    };
    var reset=function(){clearInterval(timer);timer=setInterval(function(){go(cur+1);},6000);};
    reset();
  }

  /* ---- scroll reveal ---- */
  var reveals=[].slice.call(root.querySelectorAll('.fc-reveal'));
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('is-in');io.unobserve(e.target);}});
    },{threshold:.12});
    reveals.forEach(function(el){io.observe(el);});
  }else{reveals.forEach(function(el){el.classList.add('is-in');});}

})();
