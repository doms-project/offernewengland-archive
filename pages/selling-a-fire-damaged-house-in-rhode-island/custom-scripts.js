
(function(){
  function init(){
    var hdr=document.getElementById('one-hdr');
    if(hdr&&hdr.parentNode!==document.body)document.body.appendChild(hdr);
    var bar=document.getElementById('hbar');
    if(bar&&!bar.dataset.ready){ bar.dataset.ready='1';
      var onScroll=function(){ bar.classList.toggle('is-solid',window.pageYOffset>40); };
      onScroll(); window.addEventListener('scroll',onScroll,{passive:true});
      var burger=document.getElementById('hburger'),drawer=document.getElementById('hdrawer'),scrim=document.getElementById('hscrim');
      if(burger&&drawer&&scrim){
        var setMenu=function(o){ burger.classList.toggle('is-open',o); drawer.classList.toggle('is-open',o);
          scrim.classList.toggle('is-open',o); burger.setAttribute('aria-expanded',o?'true':'false'); };
        burger.addEventListener('click',function(){ setMenu(!drawer.classList.contains('is-open')); });
        scrim.addEventListener('click',function(){ setMenu(false); });
        drawer.querySelectorAll('a,button').forEach(function(el){ el.addEventListener('click',function(){ setMenu(false); }); });
      }
    }
    var root=document.getElementById('one-fd');
    if(root&&!root.dataset.ready){ root.dataset.ready='1';
      var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion:reduce)').matches;
      var slides=[].slice.call(root.querySelectorAll('.fd-slide')),dw=root.querySelector('#fd-dots'),i=0,timer=null;
      if(slides.length>1&&dw){ var go,reset;
        slides.forEach(function(s,idx){ var b=document.createElement('button'); b.setAttribute('aria-label','Slide '+(idx+1));
          if(idx===0)b.className='is-active'; b.addEventListener('click',function(){ go(idx); reset(); }); dw.appendChild(b); });
        var dots=[].slice.call(dw.children);
        go=function(n){ slides[i].classList.remove('is-active'); dots[i].classList.remove('is-active');
          i=n%slides.length; slides[i].classList.add('is-active'); dots[i].classList.add('is-active'); };
        reset=function(){ if(timer)clearInterval(timer); timer=setInterval(function(){ go(i+1); },6000); };
        reset();
      }
      if(!reduce&&'IntersectionObserver'in window){ root.classList.add('fd-anim');
        var io=new IntersectionObserver(function(en){ en.forEach(function(x){ if(x.isIntersecting){ x.target.classList.add('is-in'); io.unobserve(x.target); } }); },{threshold:.12,rootMargin:'0px 0px -8% 0px'});
        root.querySelectorAll('.fd-reveal').forEach(function(el){ io.observe(el); });
      }
    }
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init); else init();
})();
