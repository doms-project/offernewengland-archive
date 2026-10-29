
(function () {
  document.documentElement.classList.add('cr-js');
  var init = function () {
    var root = document.getElementById('one-cr');
    if (!root) return;
    var items = root.querySelectorAll('.cr-reveal');
    if ('IntersectionObserver' in window) {
      var seen = 0;
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            var el = e.target;
            el.style.transitionDelay = (Math.min(seen % 4, 3) * 90) + 'ms';
            el.classList.add('cr-in');
            seen++;
            io.unobserve(el);
          }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
      items.forEach(function (el) { io.observe(el); });
    } else {
      items.forEach(function (el) { el.classList.add('cr-in'); });
    }
    var sticky = root.querySelector('.cr-sticky');
    var offer = document.getElementById('get-offer');
    if (sticky && offer && 'IntersectionObserver' in window) {
      var io2 = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          sticky.classList.toggle('cr-hide', e.isIntersecting);
        });
      }, { threshold: 0.05 });
      io2.observe(offer);
    }
    if (window.CSS && CSS.supports && CSS.supports('scroll-behavior', 'smooth')) {
      document.documentElement.style.scrollBehavior = 'smooth';
    }
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
