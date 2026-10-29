
(function(){
  function init(){
    var root=document.getElementById('one-ch');
    if(!root||root.dataset.ready)return; root.dataset.ready='1';
    var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion:reduce)').matches;
    var slides=[].slice.call(root.querySelectorAll('.ch-slide')),dw=root.querySelector('#ch-dots'),i=0,timer=null;
    if(slides.length>1&&dw){ var go,reset;
      slides.forEach(function(s,idx){ var b=document.createElement('button'); b.setAttribute('aria-label','Slide '+(idx+1));
        if(idx===0)b.className='is-active'; b.addEventListener('click',function(){ go(idx); reset(); }); dw.appendChild(b); });
      var dots=[].slice.call(dw.children);
      go=function(n){ slides[i].classList.remove('is-active'); dots[i].classList.remove('is-active');
        i=n%slides.length; slides[i].classList.add('is-active'); dots[i].classList.add('is-active'); };
      reset=function(){ if(timer)clearInterval(timer); timer=setInterval(function(){ go(i+1); },6000); };
      reset();
    }
    if(!reduce&&'IntersectionObserver'in window){ root.classList.add('ch-anim');
      var io=new IntersectionObserver(function(en){ en.forEach(function(x){ if(x.isIntersecting){ x.target.classList.add('is-in'); io.unobserve(x.target); } }); },{threshold:.12,rootMargin:'0px 0px -8% 0px'});
      root.querySelectorAll('.ch-reveal').forEach(function(el){ io.observe(el); });
    }
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init); else init();
})();
