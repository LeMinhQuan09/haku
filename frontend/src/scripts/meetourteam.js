import {
  disableScroll,
  enableScroll,
  headerHeight,
  isMobile,
  obServerElement,
  pxToVwMb,
} from './helper';
import gsap from '../3rd/gsap/index';
import DrawSVGPlugin from '../3rd/gsap/DrawSVGPlugin';
import ScrollTrigger from '../3rd/gsap/ScrollTrigger';
import Flip from '../3rd/gsap/Flip';

import { pxToVw } from './helper';
import { HoverButton } from './hoverButton';
import { customSelect } from './customSelect';

export function initMeetOurTeam() {
  const container = $('.meet-our-team');
  if (!container.length) {
    return;
  }

  //Position, size
  const members = container.find('.member');
  const memberHolder = container.find('.members');
  members.each(function () {
    const member = $(this);
    member.find('img').css('width', pxToVw(member.data('width')));
    member.css('top', pxToVw(member.data('x')));
    member.css('left', pxToVw(member.data('y')));
    const role = member.find('.role');
    role.html(role.text().replace(/,/g, '<br/>'));
    member.addClass('disabled');
  });

  // const originalHTML = members.toArray().sort((a, b) => {
  //   return parseInt($(a).data('order')) - parseInt($(b).data('order'));
  // });

  // memberHolder.html(originalHTML);

  gsap.set('.meet-our-team', { opacity: 0 });
  gsap.registerPlugin(Flip, DrawSVGPlugin);

  // Observer
  obServerElement(container[0], 0.1, function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting && !$(entry.target).hasClass('animated')) {
        gsap.set('.meet-our-team', { opacity: 1 });
        const tlCircle = gsap.timeline({ id: 'team' });

        tlCircle.set('#team-circle', {
          rotation: -180,
          transformOrigin: 'center center',
        });

        tlCircle.from('#team-circle', {
          drawSVG: '0%',
          duration: 2,
          ease: 'sine.inOut',
        });

        const memberEls = gsap.utils.toArray('.member');

        const sortedMembers = memberEls.sort((a, b) => {
          return parseInt($(a).data('order')) - parseInt($(b).data('order'));
        });

        sortedMembers.forEach(function (member, index) {
          gsap.from(member, {
            duration: 1,
            scale: 0.8,
            ease: 'sine.inOut',
            delay: index * 0.07,
            onComplete: function () {
              $(member).removeClass('disabled');
              new HoverButton(member, true);
            },
          });
          gsap.from($(member).find('img')[0], {
            duration: 1,
            opacity: 0,
            stagger: 0.1,
            delay: index * 0.07,
            ease: 'sine.inOut',
          });
          gsap.from($(member).find('h3')[0], {
            duration: 1,
            opacity: 0,
            stagger: 0.1,
            delay: index * 0.07,
            ease: 'sine.inOut',
          });
        });

        // GSDevTools.create({});

        observer.unobserve(entry.target);
      }
    });
  });

  // Select
  customSelect();

  $('#departments').on('change', function () {
    const department = $(this).val();
    const membersEles = gsap.utils.toArray('.member');

    const allPos = membersEles.map((ele, index) => {
      return {
        width: $(membersEles[index]).data('width'),
        x: $(membersEles[index]).data('x'),
        y: $(membersEles[index]).data('y'),
      };
    });

    const filteredMembers = membersEles.filter((ele) => {
      return $(ele).data('department') === parseInt(department);
    });

    const allTheRest = membersEles.filter((ele) => {
      return $(ele).data('department') !== parseInt(department);
    });

    let state = Flip.getState(membersEles, { props: 'opacity,top,left' });

    if (department === '0') {
      membersEles.forEach((ele, index) => {
        $(ele).css({
          top: pxToVw($(ele).data('x')),
          left: pxToVw($(ele).data('y')),
          opacity: 1,
        });
        $(ele).find('h3').css('opacity', 1);
        $(ele)
          .find('img')
          .css({
            opacity: 1,
            width: pxToVw($(ele).data('width')),
          });
        $(ele).removeClass('disabled');
      });
    } else {
      filteredMembers.forEach((ele, index) => {
        $(ele).css({
          top: pxToVw(allPos[index].x),
          left: pxToVw(allPos[index].y),
        });
        $(ele).find('h3').css('opacity', 1);
        $(ele)
          .find('img')
          .css({
            opacity: 1,
            width: pxToVw(allPos[index].width),
          });
        $(ele).removeClass('disabled');
      });

      allTheRest.forEach((ele, index) => {
        $(ele).css({
          top: pxToVw(allPos[index + filteredMembers.length].x),
          left: pxToVw(allPos[index + filteredMembers.length].y),
        });
        $(ele).find('h3').css('opacity', 0.3);
        $(ele)
          .find('img')
          .css({
            opacity: 0.3,
            width: pxToVw(allPos[index + filteredMembers.length].width),
          });
        $(ele).addClass('disabled');
      });
    }

    Flip.from(state, {
      duration: 0.5,
      opacity: 0.3,
      ease: 'sine.inOut',
    });
  });
}

export function initMeetOurTeamMb() {
  gsap.set('.meet-our-team', { opacity: 0 });
  const container = $('.meet-our-team');
  if (!container.length) {
    return;
  }

  const memberHolder = $('.members');
  const members = $('.member');
  // Sort members by order inside the holder
  const originalHTML = members
    .toArray()
    .sort((a, b) => $(a).data('order-mobile') - $(b).data('order-mobile'));

  memberHolder.html(originalHTML);

  gsap.registerPlugin(ScrollTrigger, Flip);

  gsap.set('.meet-our-team', { opacity: 1 });
  gsap.set('.member', { opacity: 0, scale: 0.8 });
  const scrollT = ScrollTrigger.batch('.member', {
    start: 'top bottom-=10%',
    end: 'bottom bottom',
    scrub: 1,
    fastScrollEnd: true,
    once: true,
    onEnter: (batch) => {
      gsap.to(batch, {
        duration: 0.5,
        opacity: 1,
        scale: 1,
        stagger: 0.1,
        ease: 'sine.inOut',
      });
    },
  });
  $('#departments').on('change', function () {
    const department = $(this).val();
    gsap.set('.member', { opacity: 1, scale: 1 });
    scrollT.forEach((st) => st.kill());
    let membersEles = gsap.utils.toArray('.member');
    let state = Flip.getState(membersEles, { props: 'opacity' });

    if (department === '0') {
      // reset order
      membersEles.forEach((ele, index) => {
        $(ele).css({
          order: $(ele).data('order-mobile'),
          opacity: 1,
        });
        $(ele).removeClass('disabled');
      });
    } else {
      membersEles.forEach((ele, index) => {
        if ($(ele).data('department') === parseInt(department)) {
          $(ele).css({
            order: index,
            opacity: 1,
          });
          $(ele).removeClass('disabled');
        } else {
          $(ele).css({
            order: 1000 + index,
            opacity: 0.3,
          });
          $(ele).addClass('disabled');
        }
      });
    }

    Flip.from(state, {
      duration: 0.5,
      opacity: 0.3,
      ease: 'sine.inOut',
      onComplete: () => {
        // Scroll to the first member
        // $('html, body').animate({
        //   scrollTop: $('#meet-our-team .title').offset().top - headerHeight,
        // });
      },
    });
  });
  customSelect();
}

export function initDetailSlider() {
  let members = $('.member');
  if (members.length === 0) return;

  // Slider init
  const slideDuration = 0.3;
  const wrap = true;
  let slides = document.querySelectorAll('.member-details__content__item');
  const prevButton = document.querySelector('.member-details__controls-prev');
  const nextButton = document.querySelector('.member-details__controls-next');
  const progressWrap = gsap.utils.wrap(0, 1);
  let numSlides = slides.length;

  let activeItem;
  let currentIndex;

  let proxy = document.createElement('div');
  let slideAnimation = gsap.to({}, {});
  let slideWidth = 0;
  let wrapWidth = 0;

  if (isMobile()) {
    const sortedSlides = Array.from(slides).sort((a, b) => {
      return (
        parseInt($(a).data('order-mobile')) -
        parseInt($(b).data('order-mobile'))
      );
    });

    document.querySelector('.member-details__content').innerHTML = '';
    sortedSlides.forEach((slide) => {
      document.querySelector('.member-details__content').appendChild(slide);
    });

    slides = document.querySelectorAll('.member-details__content__item');
  }

  slides.forEach((slide, index) => {
    slide.hvBtn = new HoverButton(slide);
  });

  gsap.set(slides, {
    xPercent: (i) => i * 100,
  });

  let wrapX = gsap.utils.wrap(-100, (numSlides - 1) * 100);

  let animation = gsap.to(slides, {
    xPercent: '+=' + numSlides * 100,
    duration: 1,
    ease: 'none',
    paused: true,
    repeat: -1,
    modifiers: {
      xPercent: wrapX,
    },
  });

  resize();

  window.addEventListener('resize', resize);

  prevButton.addEventListener('click', function () {
    animateSlides(1);
  });

  nextButton.addEventListener('click', function () {
    animateSlides(-1);
  });

  function animateSlides(direction) {
    slideAnimation.kill();
    let x = snapX(gsap.getProperty(proxy, 'x') + direction * slideWidth);

    currentIndex = currentIndex - direction;
    if (currentIndex < 0) {
      currentIndex = numSlides - 1;
    }
    if (currentIndex >= numSlides) {
      currentIndex = 0;
    }
    activeItem = members[currentIndex];

    // scroll active item into view
    if (activeItem) {
      activeItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    slideAnimation = gsap.to(proxy, {
      x: x,
      duration: slideDuration,
      onUpdate: updateProgress,
    });
  }

  function goToSlide(n) {
    slideAnimation.kill();
    let x = snapX(n * slideWidth);

    slideAnimation = gsap.set(proxy, {
      x: -x,
      onUpdate: updateProgress,
    });
    currentIndex = n;
    activeItem = members[currentIndex];
  }

  function updateProgress() {
    animation.progress(progressWrap(gsap.getProperty(proxy, 'x') / wrapWidth));
  }

  function snapX(value) {
    let snapped = gsap.utils.snap(slideWidth, value);
    return wrap
      ? snapped
      : gsap.utils.clamp(-slideWidth * (numSlides - 1), 0, snapped);
  }

  function resize() {
    const norm = gsap.getProperty(proxy, 'x') / wrapWidth || 0;

    slideWidth = slides[0].offsetWidth;
    wrapWidth = slideWidth * numSlides;

    gsap.set(proxy, {
      x: norm * wrapWidth,
    });

    // goToSlide(0);
    slideAnimation.progress(1);
  }

  function filter() {
    gsap.set(document.querySelectorAll('.member-details__content__item'), {
      clearProps: true,
    });
    members = $('.member').not('.disabled');
    slides = $('.member-details__content__item').not('.disabled').toArray();

    numSlides = slides.length;
    wrapX = gsap.utils.wrap(-100, (numSlides - 1) * 100);
    proxy.remove();
    proxy = document.createElement('div');

    gsap.set(slides, {
      xPercent: (i) => i * 100,
    });

    animation = gsap.to(slides, {
      xPercent: '+=' + numSlides * 100,
      duration: 1,
      ease: 'none',
      paused: true,
      repeat: -1,
      modifiers: {
        xPercent: wrapX,
      },
    });

    resize();
  }

  // Add event listener
  $('#departments').on('change', function () {
    const department = $(this).val();
    const slides = document.querySelectorAll('.member-details__content__item');

    slides.forEach((slide) => {
      if (department === '0') {
        $(slide).removeClass('disabled');
      } else {
        if ($(slide).data('department') === parseInt(department)) {
          $(slide).removeClass('disabled');
        } else {
          $(slide).addClass('disabled');
        }
      }
    });
    filter();
  });

  // Handle show / hide
  const memberDetails = document.querySelector('.member-details');
  const memberDetailsContent = document.querySelector(
    '.member-details__content'
  );

  const memberDetailsOverlay = document.querySelector(
    '.member-details__overlay'
  );
  const memberDetailsClose = document.querySelector('.member-details__close');
  const memberDetailsControls = document.querySelectorAll(
    '.member-details__controls-prev, .member-details__controls-next'
  );

  function showDetails(member) {
    const memberDetailsContentItems = document.querySelectorAll(
      '.member-details__content__item:not(.disabled)'
    );
    const detailImage = memberDetailsContent.querySelectorAll(
      '.member-details__content__item:not(.disabled) .img'
    );

    const index = $(member).index('.member:not(.disabled)');
    goToSlide(index);

    const target = memberDetailsContentItems[index];
    const targetContent = gsap.utils.toArray(
      memberDetailsContent.querySelectorAll('.info')
    );
    const targetBg = gsap.utils.toArray(
      memberDetailsContent.querySelectorAll('.bg')
    );
    const targetImg = gsap.utils.toArray(
      memberDetailsContent.querySelectorAll('.img')
    );

    // Position detail on top of the member
    Flip.fit(memberDetailsContent, member.querySelector('.img'), {
      // scale: true,
      fitChild: detailImage[currentIndex],
    });

    const state = Flip.getState(memberDetailsContent);
    gsap.set(memberDetailsContent, { clearProps: true }); // wipe out all inline stuff so it's in the native state (not scaled)

    // Hide content
    gsap.set(target, { clearProps: true });

    gsap.set(targetContent, {
      opacity: 0,
      translateY: 50,
    });

    // Hide overlay
    gsap.set(
      [
        memberDetailsOverlay,
        memberDetailsClose,
        memberDetailsControls,
        targetBg,
      ],
      { clearProps: true }
    );

    gsap.set(
      [
        memberDetailsOverlay,
        memberDetailsClose,
        memberDetailsControls,
        targetBg,
      ],
      {
        opacity: 0,
        pointerEvents: 'none',
        visibility: 'hidden',
      }
    );

    let bgTransform = isMobile() ? 'scaleY' : 'scaleX';
    let bgTransformOrigin = isMobile() ? 'top center' : 'left center';
    if (isMobile()) {
      gsap.set(targetBg, {
        [bgTransform]: 0,
        transformOrigin: bgTransformOrigin,
      });
      gsap.set(targetImg, {
        clearProps: true,
      });
      gsap.set(targetImg, {
        '--h-x': 0,
        '--h-y': 0,
      });
    } else {
      gsap.set(targetBg, {
        [bgTransform]: 0,
        transformOrigin: bgTransformOrigin,
      });
    }

    const tl = gsap.timeline();

    tl.set(memberDetails, {
      pointerEvents: 'all',
      visibility: 'visible',
      ease: 'power2.inOut',
      onComplete: () => memberDetails.classList.add('active'),
    }).to(
      memberDetailsOverlay,
      {
        duration: 0.3,
        opacity: 1,
        pointerEvents: 'all',
        visibility: 'visible',
      },
      '<'
    );

    const fltl = Flip.from(state, {
      duration: 0.3,
      ease: 'power2.inOut',
      scale: true,
      onComplete: () => {
        disableScroll($('.member-details')[0]);
      },
    })
      .to(
        targetBg,
        {
          duration: 0.3,
          [bgTransform]: 1,
          opacity: 1,
          pointerEvents: 'all',
          visibility: 'visible',
          ease: 'power2.inOut',
        },
        '<'
      )
      .to([memberDetailsClose, memberDetailsControls], {
        duration: 0.2,
        opacity: 1,
        pointerEvents: 'all',
        visibility: 'visible',
        ease: 'power2.inOut',
      });
    if (isMobile()) {
      fltl.to(
        targetImg,
        {
          duration: 0.3,
          '--h-x': pxToVwMb(5),
          '--h-y': pxToVwMb(-5),
          ease: 'power2.inOut',
        },
        '<'
      );
    }
    fltl
      .to(
        targetContent,
        {
          duration: 0.3,
          opacity: 1,
          translateY: 0,
          ease: 'power2.inOut',
        },
        '<'
      )
      .set(memberDetailsContent, { clearProps: true });
  }

  function hideDetails() {
    const state = Flip.getState(memberDetailsContent);

    const targetBg = memberDetailsContent.querySelectorAll('.bg');
    const targetContent = memberDetailsContent.querySelectorAll('.info');
    const targetImg = memberDetailsContent.querySelectorAll('.img');
    const detailImage = memberDetailsContent.querySelectorAll(
      '.member-details__content__item:not(.disabled) .img'
    );

    Flip.fit(memberDetailsContent, activeItem.querySelector('.img'), {
      // scale: true,
      fitChild: detailImage[currentIndex],
    });

    const tl = gsap.timeline();
    tl.to(targetContent, {
      duration: 0.3,
      opacity: 0,
      translateY: 50,
      ease: 'power2.inOut',
    });
    if (isMobile()) {
      tl.to(targetImg, {
        duration: 0.3,
        '--h-x': 0,
        '--h-y': 0,
      });
    }
    tl.to(
      [
        memberDetailsOverlay,
        memberDetailsClose,
        memberDetailsControls,
        targetBg,
      ],
      {
        duration: 0.3,
        opacity: 0,
        pointerEvents: 'none',
        visibility: 'hidden',
        ease: 'power2.inOut',
      },
      '<'
    );

    Flip.from(state, {
      duration: 0.3,
      ease: 'power2.inOut',
      scale: true,
      delay: 0.3,
    }).set(memberDetails, {
      pointerEvents: 'none',
      visibility: 'hidden',
      ease: 'power2.inOut',
      onComplete: () => {
        enableScroll($('.member-details')[0]);
        memberDetails.classList.remove('active');
      },
    });
  }

  memberDetailsClose.addEventListener('click', hideDetails);
  memberDetailsOverlay.addEventListener('click', hideDetails);
  // Close on esc
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      hideDetails();
    }
  });

  members.each(function () {
    const member = this;
    $(member).on('click', function () {
      showDetails(member);
    });
  });
}
