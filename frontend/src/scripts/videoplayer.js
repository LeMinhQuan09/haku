import gsap from '../3rd/gsap/index.js';
import MorphSVGPlugin from '../3rd/gsap/MorphSVGPlugin.js';
import { headerHeight, isMobile, obServerElement } from './helper.js';

export class VideoPlayer {
  constructor(el) {
    this.el = el;
    this.video = el.querySelector('video');
    this.playButton = el.querySelector('.play-button');
    this.controls = el.querySelector('.controls');
    this.muteButton = el.querySelector('.mute-button');
    this.muteSvg = el.querySelector('.mute-button .muted');
    this.unmuteSvg = el.querySelector('.mute-button .unmuted');
    this.fullscreenButton = el.querySelector('.fullscreen');

    this.playsvg = el.querySelector('.play-button .play');
    this.pausesvg = el.querySelector('.play-button .pause');

    gsap.registerPlugin(MorphSVGPlugin);

    this.morphTimeline = gsap.timeline({ paused: true });
    this.morphTimeline.to(this.playsvg, {
      morphSVG: this.pausesvg,
      duration: 0.3,
    });

    this.muteButtonMorphTimeline = gsap.timeline({ paused: true });
    this.muteButtonMorphTimeline.to(this.unmuteSvg, {
      morphSVG: this.muteSvg,
      duration: 0.3,
    });

    this.playButton.addEventListener('click', this.togglePlay.bind(this));

    this.isIntro = true;
    this.isFulllScreen = false;
    this.isPlayFirstTime = false;
    this.manualPause = false;

    this.playButton.addEventListener(
      'mousemove',
      this.updatePlayButtonVisble.bind(this)
    );
    this.video.addEventListener('play', this.updatePlayButton.bind(this));
    this.video.addEventListener('pause', this.updatePlayButton.bind(this));
    this.video.addEventListener('timeupdate', this.checkIntro.bind(this));
    this.video.addEventListener('fullscreenchange', () => {
      if (!document.fullscreenElement && !isMobile() && this.isFulllScreen) {
        this.fullscreenButton.classList.remove('active');
        setTimeout(() => {
          $('html, body').animate({
            scrollTop: $(this.el).parent().offset().top - headerHeight,
          });
        }, 100);
      }
    });

    this.muteButton.addEventListener('click', this.toggleVolume.bind(this));

    this.fullscreenButton.addEventListener('click', () => {
      if (this.video.requestFullscreen) {
        this.video.requestFullscreen();
      } else if (this.video.webkitRequestFullscreen) {
        this.video.webkitRequestFullscreen();
      } else if (this.video.mozRequestFullScreen) {
        this.video.mozRequestFullScreen();
      } else if (this.video.msRequestFullscreen) {
        this.video.msRequestFullscreen();
      } else if (this.video.webkitEnterFullscreen) {
        this.video.webkitEnterFullscreen();
      }
      this.fullscreenButton.classList.add('active');
      this.isFulllScreen = true;
    });

    this.updatePlayButton();

    gsap.set(this.controls, {
      opacity: 0,
      pointerEvents: 'none',
      visibility: 'hidden',
    });

    this.observeVideo();
  }

  observeVideo() {
    obServerElement(this.video, 0.5, (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!this.isPlayFirstTime) {
            if (!this.isIntro) return;
            this.video.currentTime = 0;
            this.video.oncanplaythrough = () => {
              this.video.play();
            };
          } else {
            if (this.manualPause) return;
            this.video.play();
            this.hidePlayButton();
            this.showControls();
          }
        } else {
          if (this.isIntro) return;
          this.video.pause();
          this.showPlayButton();
          this.hideControls();
        }
      });
    });
  }

  togglePlay() {
    if (this.isIntro) {
      this.isIntro = false;
      this.video.loop = true;
      this.video.currentTime = 0;
      this.isPlayFirstTime = true;
      this.raiseVolume();
      this.hidePlayButton();
      this.updatePlayButton();
      this.showControls();
    } else {
      if (this.video.paused) {
        this.video.play();
        this.hidePlayButton();
        this.showControls();
        this.manualPause = false;
      } else {
        this.video.pause();
        this.showPlayButton();
        this.hideControls();
        this.manualPause = true;
      }
    }
  }

  raiseVolume() {
    // raise volume from 0 to 1 in 2 seconds
    this.video.muted = false;
    gsap.set(this.video, { volume: 0 });
    gsap.to(this.video, { volume: 1, duration: 2 });
  }

  toggleVolume() {
    this.video.muted = !this.video.muted;
    this.updateMuteButton();
  }

  updateMuteButton() {
    if (this.video.muted) {
      this.muteButtonMorphTimeline.play();
    } else {
      this.muteButtonMorphTimeline.reverse();
    }
  }

  updatePlayButton() {
    if (this.isIntro) return;
    if (this.video.paused) {
      this.playButton.classList.add('pause');
      this.morphTimeline.reverse();
    } else {
      this.playButton.classList.remove('pause');
      this.morphTimeline.play();
    }
  }

  showPlayButton() {
    clearTimeout(this.playButtonVisibleTimeout);
    gsap.to(this.playButton, { opacity: 1, duration: 0.3 });
  }

  hidePlayButton() {
    clearTimeout(this.playButtonVisibleTimeout);
    gsap.to(this.playButton, { opacity: 0, duration: 0.3, delay: 0.3 });
  }

  showControls() {
    gsap.to(this.controls, {
      opacity: 1,
      pointerEvents: 'all',
      visibility: 'visible',
      duration: 0.3,
    });
  }

  hideControls() {
    gsap.to(this.controls, {
      opacity: 0,
      pointerEvents: 'none',
      visibility: 'hidden',
      duration: 0.3,
    });
  }

  updatePlayButtonVisble() {
    if (this.isIntro) return;
    if (this.video.paused) {
      this.showPlayButton();
      return;
    }
    this.showPlayButton();
    clearTimeout(this.playButtonVisibleTimeout);
    this.playButtonVisibleTimeout = setTimeout(() => {
      this.hidePlayButton();
    }, 500);
  }

  checkIntro() {
    if (this.isIntro) {
      if (this.video.currentTime > 5) {
        this.video.currentTime = 0;
      }
    }
  }

  destroy() {
    this.playButton.removeEventListener('click', this.togglePlay);
    this.video.removeEventListener('play', this.updatePlayButton);
    this.video.removeEventListener('pause', this.updatePlayButton);
  }

  static init(el) {
    return new VideoPlayer(el);
  }

  static initAll() {
    document.querySelectorAll('.videoplayer').forEach(VideoPlayer.init);
  }

  static destroyAll() {
    document.querySelectorAll('.videoplayer').forEach((el) => {
      el.VideoPlayer.destroy();
    });
  }

  static destroyOnUnload() {
    window.addEventListener('unload', VideoPlayer.destroyAll);
  }
}
