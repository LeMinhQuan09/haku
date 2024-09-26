import {
  initDetailSlider,
  initMeetOurTeam,
  initMeetOurTeamMb,
} from './meetourteam';
import { isMobile } from './helper';
import { initTeaser } from './teaser';
import { VideoPlayer } from './videoplayer';
// import { initExpertise } from './expertise';

// Initialize
function init() {
  if (isMobile()) {
    initMeetOurTeamMb();
  } else {
    initMeetOurTeam();
    // initExpertise();
  }
  initDetailSlider();
  initTeaser();
  VideoPlayer.initAll();
}

// Document ready
$(document).ready(function () {
  // Initialize
  init();
});
