import gsap from '../3rd/gsap/index.js';
import Draggable from '../3rd/gsap/Draggable.js';
import InertiaPlugin from '../3rd/gsap/InertiaPlugin.js';

gsap.registerPlugin(Draggable, InertiaPlugin);

export class CustomScroll {
  constructor(el) {
    this.el = el;
    if (el.scrollHeight > Math.max(el.offsetHeight, el.clientHeight) + 20) {
      this.init();
    }
  }

  init() {
    this.scrollElement = document.createElement('div');
    this.scrollElement.className = 'scroll__element';
    this.scrollElement.style.overflow = 'visible';
    this.scrollElement.style.position = 'relative';
    this.scrollElement.innerHTML = this.el.innerHTML;
    this.el.innerHTML = '';
    this.el.appendChild(this.scrollElement);

    this.scrollBar = document.createElement('div');
    this.scrollBar.className = 'scroll__bar';
    this.el.appendChild(this.scrollBar);

    this.scrollThumb = document.createElement('div');
    this.scrollThumb.className = 'scroll__thumb';
    this.scrollBar.appendChild(this.scrollThumb);

    this.scrollProgress = document.createElement('div');
    this.scrollProgress.className = 'scroll__progress';
    this.scrollBar.appendChild(this.scrollProgress);

    this.scrollElement.addEventListener('wheel', this.onWheel.bind(this));

    this.drag = Draggable.create(this.scrollElement, {
      type: 'top',
      bounds: this.el,
      inertia: true,
      onDrag: this.update.bind(this),
      onThrowUpdate: this.update.bind(this),
      cursor: 'auto',
      activeCursor: 'auto',
    });

    this.thumbDrag = Draggable.create(this.scrollThumb, {
      type: 'top',
      bounds: this.scrollBar,
      inertia: true,
      onDrag: this.updateScrollThumb.bind(this),
      onThrowUpdate: this.updateScrollThumb.bind(this),
    });

    this.scrollBar.addEventListener('click', (e) => {
      const clickPos =
        e.clientY -
        this.scrollBar.getBoundingClientRect().top -
        this.scrollThumb.offsetHeight / 2;
      // Scroll scrollElement
      const scrollBarHeight = this.scrollBar.offsetHeight;
      const thumbHeight = this.scrollThumb.offsetHeight;
      const scrollHeight = this.scrollElement.offsetHeight;
      const height = scrollHeight - scrollBarHeight;
      const scrollTop = (-clickPos / (scrollBarHeight - thumbHeight)) * height;
      this.scrollElement.style.top = `${scrollTop}px`;
      this.drag[0].update();
      this.update();
    });
  }

  onWheel(e) {
    e.preventDefault();
    const scrollTop = this.scrollElement.offsetTop;
    this.scrollElement.style.top = `${scrollTop - e.deltaY}px`;
    if (this.scrollElement.offsetTop > 0) {
      this.scrollElement.style.top = '0px';
    }
    if (
      this.scrollElement.offsetTop <
      this.el.offsetHeight - this.scrollElement.offsetHeight
    ) {
      this.scrollElement.style.top = `${
        this.el.offsetHeight - this.scrollElement.offsetHeight
      }px`;
    }

    this.drag[0].update();
    this.update();
  }

  update() {
    const scrollTop = this.scrollElement.offsetTop;
    console.log(scrollTop);
    const scrollHeight = this.scrollElement.offsetHeight;
    const scrollBarHeight = this.scrollBar.offsetHeight;
    const height = scrollHeight - scrollBarHeight;
    const thumbHeight = this.scrollThumb.offsetHeight;
    const progress = (-scrollTop / height) * 100;
    const thumbTop = (-scrollTop / height) * (scrollBarHeight - thumbHeight);
    this.scrollThumb.style.top = `${thumbTop}px`;
    this.scrollProgress.style.height = `${progress}%`;
  }

  updateScrollThumb() {
    const thumbTop = this.thumbDrag[0].y;
    const scrollBarHeight = this.scrollBar.offsetHeight;
    const thumbHeight = this.scrollThumb.offsetHeight;
    const scrollHeight = this.scrollElement.offsetHeight;
    const height = scrollHeight - scrollBarHeight;
    const scrollTop = (-thumbTop / (scrollBarHeight - thumbHeight)) * height;
    const progress = (-scrollTop / height) * 100;
    this.scrollProgress.style.height = `${progress}%`;
    this.scrollElement.style.top = `${scrollTop}px`;
    this.drag[0].update();
  }
}
