import gsap from '../3rd/gsap/index.js';
import MorphSVGPlugin from '../3rd/gsap/MorphSVGPlugin.js';
import {
  isMobile,
  pxToVw,
  pxToVwMb,
  obServerElement,
  headerHeight,
} from './helper.js';

export function initTeaser() {
  gsap.registerPlugin(MorphSVGPlugin);
  const tl = gsap.timeline();
  tl.to('#teaser-arrow-short', {
    morphSVG: '#teaser-arrow-long',
    duration: 1,
    yoyo: true,
    repeat: -1,
  }).to(
    '#teaser .icon',
    {
      height: isMobile() ? pxToVwMb(41 + 24) : pxToVw(130),
      yoyo: true,
      duration: 1,
      repeat: -1,
    },
    '<'
  );

  const teaser = document.querySelector('#teaser');
  const more = document.querySelector('#teaser .more');

  obServerElement(teaser, 0.6, function (entries, observer) {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        gsap.to(more, { opacity: 0, duration: 1 });
        observer.unobserve(teaser);
      }
    });
  });

  const video = document.querySelector('#teaser video');

  const replay = document.querySelector('#teaser .replay');
  const fullscreen = document.querySelector('#teaser .fullscreen');

  gsap.set(replay, {
    opacity: 0,
    pointerEvents: 'none',
    visibility: 'hidden',
    display: 'none',
    cursor: 'auto',
  });

  gsap.set(fullscreen, {
    opacity: 0,
    pointerEvents: 'none',
    visibility: 'hidden',
    display: 'none',
    cursor: 'auto',
  });

  video.addEventListener('ended', () => {
    gsap.to(replay, {
      opacity: 1,
      pointerEvents: 'auto',
      visibility: 'visible',
      duration: 0.5,
      display: 'block',
      cursor: 'pointer',
    });
    gsap.to(fullscreen, {
      opacity: 0,
      pointerEvents: 'none',
      visibility: 'hidden',
      duration: 0.5,
      display: 'none',
      cursor: 'none',
    });
  });

  // When enter fullscreen add class fullscreen to video
  video.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
      video.classList.remove('fullscreen');
    } else {
      video.classList.add('fullscreen');
    }
  });

  replay.addEventListener('click', () => {
    // unmute video
    video.muted = false;
    video.currentTime = 0;
    video.play();
    gsap.to(fullscreen, {
      opacity: 1,
      pointerEvents: 'auto',
      visibility: 'visible',
      duration: 0.5,
      display: 'block',
      cursor: 'pointer',
    });
    gsap.to(replay, {
      opacity: 0,
      pointerEvents: 'none',
      visibility: 'hidden',
      duration: 0.5,
      display: 'none',
      cursor: 'none',
    });
  });

  fullscreen.addEventListener('click', () => {
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
    } else if (video.mozRequestFullScreen) {
      video.mozRequestFullScreen();
    } else if (video.msRequestFullscreen) {
      video.msRequestFullscreen();
    }
  });

  video.muted = true;

  const src = isMobile()
    ? video.getAttribute('data-src-mb')
    : video.getAttribute('data-src');

  const poster = isMobile()
    ? video.getAttribute('data-poster-mb')
    : video.getAttribute('data-poster');

  video.src = src;
  video.poster = poster;
  video.setAttribute('autoplay', 'true');
  video.load();
  video.oncanplaythrough = () => {
    video.play();
  };

  // Click .more, go to next section
  more.addEventListener('click', () => {
    const next = teaser.nextElementSibling;
    window.scrollTo({
      top: next.offsetTop - headerHeight,
      behavior: 'smooth',
    });
  });
}
