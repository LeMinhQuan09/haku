import gsap from '../3rd/gsap/index';

import { isMobile, pxToVw, pxToVwMb, random } from './helper';

// Random animation
const randomX = random(4, 10);
const randomY = random(4, 10);
const randomTime = random(3, 5);
const maxTrans = 15;

export class HoverButton {
  constructor(el, anim) {
    this.el = el;
    this.anim = anim;
    this.img = el.querySelector('.img');
    if (!el) return;

    this.hover = false;
    this.centerX = 0;
    this.centerY = 0;
    this.maxXDistance = 0;
    this.maxYDistance = 0;
    this.savedX = 0;
    this.savedY = 0;
    this.attachEventsListener();
  }

  calculatePosition() {
    const rect = this.img.getBoundingClientRect();

    this.maxXDistance = rect.width / 2;
    this.maxYDistance = rect.height / 2;

    const R = rect.width / 2;
    this.centerX = rect.left + R;
    this.centerY = rect.top + R;
  }

  attachEventsListener() {
    this.img.addEventListener('mouseenter', () => {
      this.calculatePosition();
      this.onMouseEnter();
    });
    this.img.addEventListener('mousemove', (e) => {
      this.hover = true;
      this.onHover(e);
    });
    this.img.addEventListener('mouseleave', () => {
      this.onLeave();
    });
    if (this.anim) {
      this.moveX(this.el, 1);
      this.moveY(this.el, -1);
    }
  }

  moveX(target, direction) {
    this.gmoveX = gsap.to(target, randomTime(), {
      x: randomX(direction),
      ease: 'sine.inOut',
      onComplete: () => {
        this.moveX(target, direction * -1, this.moveX);
      },
      onUpdate: () => {
        this.savedX = gsap.getProperty(target, 'x');
        this.calculatePosition();
      },
    });
  }

  moveY(target, direction) {
    this.gmoveY = gsap.to(target, randomTime(), {
      y: randomY(direction),
      ease: 'sine.inOut',
      onComplete: () => {
        this.moveY(target, direction * -1, this.moveY);
      },
      onUpdate: () => {
        this.savedY = gsap.getProperty(target, 'y');
      },
    });
  }

  onMouseEnter() {
    gsap.set(this.img, {
      '--h-x': 0,
      '--h-y': 0,
    });
  }

  onHover(e) {
    if (this.anim) {
      this.el.style.zIndex = 200;
    }
    const x = e.clientX - this.centerX;
    const y = e.clientY - this.centerY;
    // const dist = Math.sqrt(Math.pow(x, 2) + Math.pow(x, 2)); // optionally use the total distance as a factor or restriction

    // Put that number over the max distance from 2)
    const xPercent = x / this.maxXDistance;
    const yPercent = y / this.maxYDistance;

    // Multiply that product by the max value from 1 and apply it to your element.
    const scaledXPercent = xPercent * maxTrans;
    const scaledYPercent = yPercent * maxTrans;

    gsap.to(this.img, {
      '--h-x': pxToVw(scaledXPercent),
      '--h-y': pxToVw(scaledYPercent),
      duration: 0.2,
      ease: 'sine.inOut',
      overwrite: 'auto',
    });
  }
  onLeave() {
    this.hover = false;
    gsap.to(this.img, {
      '--h-x': 0,
      '--h-y': 0,
      duration: 0.2,
      ease: 'sine.inOut',
      overwrite: true,
    });
    if (this.anim) {
      this.el.style.zIndex = 1;
    }
  }
}
