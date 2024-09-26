import { obServerElement } from './helper.js';

function distributeFields() {
  var container = $('.expertise-container');
  if (container.length === 0) return;
  var radius = container.width() / 2;
  var fields = $('.field'),
    container = $('.expertise-container'),
    width = container.width(),
    height = container.height(),
    angle = 0,
    step = (2 * Math.PI) / fields.length;

  // $('.line').addClass('animated');

  fields.each(function (index) {
    var x = Math.round(
      width / 2 + radius * Math.cos(angle) - $(this).width() / 2 - 1 // -1 for border
    );
    var y = Math.round(
      height / 2 + radius * Math.sin(angle) - $(this).height() / 2 - 1 // -1 for border
    );
    $(this).css({
      left: x + 'px',
      top: y + 'px',
    });
    if (index === 0) {
      $(this).addClass('top');
    }
    if (index === fields.length / 2) {
      $(this).addClass('bottom');
    }
    if (index > fields.length / 2) {
      $(this).addClass('left');
    }
    // setTimeout(
    //   function (ele) {
    //     $(ele).addClass('animated');
    //   },
    //   (1000 / fields.length) * index - 50,
    //   this
    // );
    angle += step;
  });

  // Observer
  obServerElement(container[0], 0.2, function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting && !$(entry.target).hasClass('animated')) {
        $(entry.target).find('.line').addClass('animated');
        fields.each(function (index) {
          setTimeout(
            function (ele) {
              $(ele).addClass('animated');
            },
            (1000 / fields.length) * index - 50,
            this
          );
        });
        observer.unobserve(entry.target);
      }
    });
  });
}

export function initExpertise() {
  distributeFields();
  $(window).resize(function () {
    distributeFields();
  });
}
