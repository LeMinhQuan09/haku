import { isSafari, isMobile } from './helper';
import gsap from '../3rd/gsap/index';

export function fixHover(ele) {
  if (isSafari()) {
    gsap.set(ele, {
      '--color1': '#fff',
      '--color2': '#fff',
    });
    ele
      .on('mouseover', function () {
        gsap.to(this, {
          duration: 0.3,
          '--color1': '#dd1940',
          '--color2': '#92035f',
          ease: 'power2.inOut',
        });
      })
      .on('mouseleave', function () {
        if ($(this).hasClass('active')) return;
        gsap.to(this, {
          duration: 0.3,
          '--color1': '#fff',
          '--color2': '#fff',
          ease: 'power2.easeInOut',
        });
      });
    // click outside
    $(document).click(function (e) {
      if (!$(e.target).closest(ele).length) {
        gsap.to(ele, {
          duration: 0.3,
          '--color1': '#fff',
          '--color2': '#fff',
          ease: 'power2.easeInOut',
        });
      }
    });
  }
}
