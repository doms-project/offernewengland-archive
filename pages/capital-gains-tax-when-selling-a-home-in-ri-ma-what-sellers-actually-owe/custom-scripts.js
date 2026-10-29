
(function(){
  function init(){
  /* ---- HERO SLIDESHOW ---- */
  var slidesWrap=document.getElementById('cg-slides');
  if(slidesWrap){
    var slides=[].slice.call(slidesWrap.querySelectorAll('.cg-slide'));
    var dotsWrap=document.getElementById('cg-dots');
    var i=0,timer;
    if(slides.length>1){
      slides.forEach(function(s,idx){
        var b=document.createElement('button');b.type='button';b.setAttribute('aria-label','Slide '+(idx+1));
        if(idx===0)b.className='is-active';
        b.addEventListener('click',function(){go(idx);reset();});
        dotsWrap.appendChild(b);
      });
      var dots=[].slice.call(dotsWrap.children);
      var go=function(n){
        slides[i].classList.remove('is-active');dots[i].classList.remove('is-active');
        i=(n+slides.length)%slides.length;
        slides[i].classList.add('is-active');dots[i].classList.add('is-active');
      };
      var reset=function(){clearInterval(timer);timer=setInterval(function(){go(i+1);},6000);};
      reset();
    }
  }

  /* ---- REVEAL ON SCROLL (visible by default; only animates when JS runs) ---- */
  var cgScope=document.getElementById('one-cg');if(cgScope)cgScope.classList.add('cg-anim');
  var revs=[].slice.call(document.querySelectorAll('#one-cg .cg-reveal'));
  if('IntersectionObserver'in window){
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('is-in');io.unobserve(e.target);}});
    },{threshold:.12});
    revs.forEach(function(el){io.observe(el);});
  }else{revs.forEach(function(el){el.classList.add('is-in');});}

  /* ---- SMOOTH-SCROLL CTA BUTTONS TO THE BOTTOM FORM ---- */
  [].forEach.call(document.querySelectorAll('#one-cg a[href="#get-offer"]'),function(a){
    a.addEventListener('click',function(e){
      var target=document.getElementById('get-offer');
      if(target){e.preventDefault();target.scrollIntoView({behavior:'smooth',block:'start'});}
    });
  });

  }
  if(document.readyState!=='loading'){init();}else{document.addEventListener('DOMContentLoaded',init);}
})();
