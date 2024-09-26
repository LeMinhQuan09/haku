export function isMobile() {
  return window.innerWidth < 768;
}

export function isSafari() {
  return (
    navigator.userAgent.includes('Safari') &&
    !navigator.userAgent.includes('Chrome')
  );
}

export function pxToVw(px) {
  return (px * 100) / 1920 + 'vw';
}

export function pxToVwMb(px) {
  return (px * 100) / 375 + 'vw';
}

export function vWtoPx(vw) {
  return (vw * 1920) / 100 + 'px';
}

export function obServerElement(element, threshold, callback) {
  var observer = new IntersectionObserver(callback, {
    threshold: threshold,
  });
  observer.observe(element);
}

export function random(min, max) {
  const delta = max - min;
  return (direction = 1) => (min + delta * Math.random()) * direction;
}

export function maxHeight(elements) {
  let max = 0;
  elements.each(function () {
    console.log(max, $(this).outerHeight());
    max = Math.max(max, $(this).outerHeight());
  });
  return max;
}

export let headerHeight = 0;

export function setHeaderHeight() {
  headerHeight = $('#header').outerHeight();
  document.documentElement.style.setProperty('--h-height', headerHeight + 'px');
}

export function throttle(func, delay) {
  let lastCall = 0;

  return function (...args) {
    const now = new Date().getTime();

    if (now - lastCall < delay) {
      return;
    }

    lastCall = now;
    return func(...args);
  };
}

let scrollLocked = false;

function preventDefault(e) {
  e.preventDefault();
}

export function disableScroll(ele) {
  if (scrollLocked) return;
  $('html').addClass('no-scroll');

  $(ele).on('touchmove', preventDefault);

  scrollLocked = true;
}

export function enableScroll(ele) {
  if (!scrollLocked) return;
  $('html').removeClass('no-scroll');

  $(ele).off('touchmove', preventDefault);

  scrollLocked = false;
}

export function toggleScroll(ele) {
  if (scrollLocked) {
    enableScroll(ele);
  } else {
    disableScroll(ele);
  }
}

export function scrollToHash(hash) {
  if (hash) {
    console.log(hash, new Date());

    const target = $(`#${hash}`);
    const windowHash = new URLSearchParams(window.location.search).get(
      'active'
    );
    if (windowHash !== hash) {
      history.replaceState(
        null,
        null,
        document.location.pathname + '?active=' + hash
      );
    }
    if (target.length) {
      const offset = headerHeight;
      $('html, body').animate({
        scrollTop: Math.ceil(target.offset().top - offset),
      });
    }
  }
}
