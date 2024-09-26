import {
  isSafari,
  isMobile,
  headerHeight,
  setHeaderHeight,
  throttle,
  disableScroll,
  enableScroll,
  toggleScroll,
  scrollToHash,
} from './helper';
import { fixHover } from './fixHover';
import { CustomScroll } from './customScroll';
import { gsap } from '../3rd/gsap';

function initLanguageMenu() {
  // Language menu
  const languageMenu = $('.language-dropdown');
  const langguageMenuBtn = $('.language-dropdown__btn');
  langguageMenuBtn.click(function () {
    languageMenu.toggleClass('active');
    langguageMenuBtn.toggleClass('active');
  });
  // Click outside, close menu
  $(document).click(function (e) {
    if (!$(e.target).closest('.language-dropdown').length) {
      languageMenu.removeClass('active');
      langguageMenuBtn.removeClass('active');
    }
  });
}

function initMobileMenu() {
  const mobileMenuBtn = $('#header .hamburger');
  const mobileMenu = $('#header .nav');
  mobileMenu.css({
    height: `${screen.height - headerHeight}px`,
  });
  mobileMenuBtn.click(function () {
    mobileMenuBtn.toggleClass('active');
    mobileMenu.toggleClass('active');
    toggleScroll(mobileMenu[0]);
  });
}

function initMenu() {
  let lastActive = '';

  function checkactiveMenu(off = 0) {
    // active menu
    const offset = off ? off : $(window).scrollTop() + $(window).height() / 2;
    const menu = $('#header .nav');
    const menuLinks = menu.find('.nav-link');
    const activeDot = menu.find('.active-dot');
    const menuItems = menuLinks.map(function () {
      const href = $(this).attr('href');
      const item = $(href);
      if (item.length) {
        return item;
      }
    });

    const current = menuItems.filter(function () {
      if (
        Math.ceil($(this).offset().top) <= Math.ceil(offset) &&
        Math.ceil($(this).offset().top + $(this).outerHeight()) >
          Math.ceil(offset)
      ) {
        return this;
      }
    });

    const id = current.length ? current[current.length - 1] : '';

    if (!id || id.attr('id') === lastActive) {
      return;
    }

    lastActive = id.attr('id');
    const currentSection = $(id);
    menuLinks.removeClass('active');
    menuLinks
      .filter(`[href="#${currentSection.attr('id')}"]`)
      .addClass('active');
    if (currentSection.length) {
      $('.hamburger').removeClass('active');
      $('.nav').removeClass('active');
      history.replaceState(
        null,
        null,
        document.location.pathname + '?active=' + $(currentSection).attr('id')
      );
      // Move active dot to current menu item
      const firstActiveMenu = menuLinks
        .filter('.active')
        .not('.sr-only')
        .first();

      function moveActiveDot() {
        if (firstActiveMenu.length === 0) {
          gsap.to(activeDot, {
            duration: 0.5,
            opacity: 0,
            visibility: 'hidden',
            ease: 'power2.out',
            x: 0,
            width: 0,
            height: 0,
            y: 0,
          });
        } else {
          const currentOffset =
            firstActiveMenu.offset().left - menu.offset().left;

          // Random width and height from firstActiveMenu height to maximum 2 times of firstActiveMenu height
          const randomWidth =
            firstActiveMenu.height() + Math.random() * firstActiveMenu.height();

          // Random position on firstActiveMenu width and height
          const randomX =
            Math.random() * firstActiveMenu.width() - randomWidth / 2;
          const randomY =
            Math.random() * firstActiveMenu.height() - randomWidth / 2;

          gsap.to(activeDot, {
            duration: 0.5,
            opacity: 1,
            visibility: 'visible',
            ease: 'power2.out',
            x: currentOffset + randomX,
            width: randomWidth,
            height: randomWidth,
            y: randomY,
          });
        }
      }

      if (!isMobile()) {
        moveActiveDot();
      }

      window.addEventListener('resize', function () {
        if (!isMobile()) {
          moveActiveDot();
        }
      });
    }
  }

  // click menu
  const navItems = $('#header .nav-link');
  navItems.click(function (e) {
    e.preventDefault();
    const target = $(this).attr('href').split('#')[1];
    scrollToHash(target);
    $('.hamburger').removeClass('active');
    $('.nav').removeClass('active');
    $('.nav-link').removeClass('active');
    $(this).toggleClass('active');
    enableScroll();
  });

  const throttleEvent = throttle(() => {
    checkactiveMenu();
  }, 100);

  $(window)
    .on('load', function () {
      if (!isSafari()) {
        setTimeout(() => {
          scrollToHash(
            new URLSearchParams(window.location.search).get('active')
          );
        }, 10);
      }
    })
    .on('scroll', throttleEvent)
    .on('resize', throttleEvent);
}

function initScroll() {
  $('.custom-scroll').each(function () {
    new CustomScroll(this);
  });
}

function initScFix() {
  if (!isMobile()) return;
  $('.sc').each(function () {
    $(this).css({
      height: $(window).height() - headerHeight,
    });
  });
  $('.min-sc').each(function () {
    $(this).css({
      minHeight: $(window).height() - headerHeight,
    });
  });
  $('.max-sc').each(function () {
    $(this).css({
      maxHeight: $(window).height() - headerHeight,
    });
  });
}

// document ready
$(document).ready(function () {
  setHeaderHeight();
  initScFix();
  // Safari fix
  if (isSafari()) {
    $('body').addClass('safari');
  }
  if (isMobile()) {
    $('body').addClass('mobile');
  }
  initScroll();
  fixHover($('.nav-link, .language-dropdown__btn, .language-dropdown li'));
  initLanguageMenu();
  if (isMobile()) {
    initMobileMenu();
  }
  initMenu();
  if (isSafari()) {
    setTimeout(() => {
      scrollToHash(new URLSearchParams(window.location.search).get('active'));
    }, 100);
  }
});

// $(window).on('load', function () {
//   console.log('window loaded');
// });

$(window).on('beforeunload', function () {
  $(window).scrollTop(0);
});

// Resize
$(window).on('resize', function () {
  setHeaderHeight();
  initScFix();
});

// Reload when orientation change
window.addEventListener('orientationchange', function () {
  // location.reload();
});
