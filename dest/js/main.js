$(document).ready(function() {
  // homepage slick
  $('.navigator').slick({
    centerMode: true,
    centerPadding: "25%",
    arrows: false,
    focusOnSelect: true,
    infinite: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          centerPadding: "15%"
        }
      }
    ]
  });
  var slideNum = $(location).attr('hash').substr(1);
  slideToHash('.navigator', slideNum);

  // Animation control
  $('.content').css({'visibility':'hidden'});
  removeAnimation($("#clear-animation"));
  exitAnimation($("#revert-animation"), true, null);

  // close btn
  $('.close-btn').on('click', function() {
    exitAnimation($("#clear-animation"), false, $(this).attr("id"));
  });

  // Milestones page
  // Nav tabs
  $('.selected').on('click', function(){
    $('.tabs ul').slideToggle();
  });
  $('.tabs .nav-link').on('click', function(){
    var hash = $(this).attr('href');
    $(location).attr('hash', hash);
    $('.milestones-container').slick('slickGoTo', $('.milestones-item[data-title="' + hash.substr(1) + '"]').data('slick-index'))
  })
  // milestone slick
  $('.milestones-container').slick({
    dots: true,
    adaptiveHeight: false
  })

  $('.milestones-container').on('beforeChange', function(e,s,c,n) {
    var nextSlideTitle = $('.milestones-item[data-slick-index="' + n + '"]').data('title');
    $(location).attr('hash', nextSlideTitle);
    $('.tabs .selected').text(nextSlideTitle.toUpperCase());

    navTabs(false);
  });

  // Events page
  // event slick
  $(".events-container").slick({
    slidesToShow: 3,
    focusOnSelect: true,
    infinite: false,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  });
});

// added
function slideToHash(slider, hash) {
  var hashExists = false;
  $(slider).find('.slick-slide').each(function(){
    if($(this).data('title').toLowerCase() == hash.toLowerCase()){
      hashExists = true;
      $(slider).slick('slickGoTo', $(this).data('slick-index'));
    }
  })
  if(!hashExists) {
    $(slider).slick('slickGoTo', $(slider).find('[data-slick-start="true"]').data('slick-index'));
  }
}
// added

function navTabs(toggle) {
  var hash = $(location).attr('hash') != '' ? $(location).attr('hash') : '#' + $('.milestones-item[data-slick-index="0"]').data('title');
  $('.tabs a[href="'+hash+'"]').click();

  if (toggle == true) {
    var slideNum = $('.milestones-item[data-title="' + hash.substr(1) + '"]').data('slick-index');
    $('.milestones-container').slick('slickGoTo', slideNum);
    $('.tabs .selected').text(hash.substr(1).toUpperCase());
  }
}

function removeAnimation(clearFrameID) {
  console.log('removeAnimation', clearFrameID);
  var conWidth = clearFrameID.find(".animation-container").width();
  // var conWidth = clearFrameID.find("#animation-container").width();
  var elem = clearFrameID.find(".animation");
  // var elem = clearFrameID.find("#animation");
  var posclear = 0;
  var widthClear = setInterval(clearFrame, 1);
  function clearFrame() {
    if (posclear > conWidth) {
      clearInterval(widthClear);
      elem.removeAttr("style");
      clearFrameID.find(".animation-container").hide();
      // clearFrameID.find("#animation-container").hide();
      redirectedAnimate($(".content-container"));
      // redirectedAnimate($(".wrapper"));
    } else {
      posclear = posclear + 20;
      elem.css({
        left: posclear + "px"
      });
    }
  }
}

var baseRef = "";

// slick-redirect
function redirect(url) {
  console.log('redirect');
  var pageHref = '/' + url + '.html';
  var conHeight = $(".animation-container").height();
  var conWidth = $(".animation-container").width();
  var elem = $(".animation");
  elem.css({
    bottom: 0,
    width: "300px",
    height: "100px",
    left: "0"
  });
  $(".animation-container").show();

  var pos = 0;
  var poswidth = elem.width();
  var id = setInterval(frame, 1);
  var widthMove;
  function frame() {
    if (pos > conHeight) {
      clearInterval(id);
      widthMove = setInterval(widthframe, 1);
    } else {
      pos = addHeight(elem, pos);
    }
  }

  function widthframe() {
    if (poswidth > conWidth) {
      clearInterval(widthMove);
      window.location.href = pageHref;
      setTimeout(() => {
        elem.removeAttr("style");
        $(".animation-container").hide();
      }, 500);
    } else {
      poswidth = addWidth(elem, poswidth);
    }
  }
}

function addHeight(container, containerHeight) {
  containerHeight = containerHeight + 20;
  container.css({
    height: containerHeight + 'px'
  });
  return containerHeight;
}

function addWidth(container, containerWidth) {
  containerWidth = containerWidth + 20;
  container.css({
    width: containerWidth + 'px'
  });
  return containerWidth;
}

function redirectedAnimate(frameID) {
  var conHeight = frameID.height();
  var conWidth = frameID.width();
  console.log('conHeight:'+ conHeight+', conWidth:'+conWidth);
  var elem = frameID.find(".animation");
  frameID.find(".animation-container").show();
  var pos = 0;
  var poswidth = elem.width();
  var posclear = 0;
  var id = setInterval(frame, 10);
  var widthMove;
  function frame() {
    if (pos > conHeight) {
      clearInterval(id);
      widthMove = setInterval(widthframe, 10);
    } else {
      pos = addHeight(elem, pos);
    }
  }
  function widthframe() {
    if (poswidth > conWidth) {
      clearInterval(widthMove);
      var widthClear = setInterval(clearFrame, 1);
      // frameID.find(".content").show();
      function clearFrame() {
        $('.content').removeAttr("style");
        if (posclear > conWidth) {
          clearInterval(widthClear);
          elem.removeAttr("style");
          navTabs(true);
          frameID.find(".animation-container").hide();
        } else {
          posclear = posclear + 20;
          elem.css({
            left: posclear + "px"
          });
        }
      }
    } else {
      poswidth = addWidth(elem, poswidth);
    }
  }
}

function exitAnimation(frameID, homeClear, currentPage) {
  var conWidth = frameID.find(".animation-container").width();
  console.log('exitAnimation', frameID, conWidth, $(window).width());
  var elem = frameID.find(".animation");
  console.log(elem);
  frameID.find(".animation-container").show();
  var posclear = 0;
  var revertX;
  if (homeClear == false) {
    elem.css({
      height: "100%",
      width: 0,
      right: 0
    });
    var revertY = setInterval(revertFrameY, 1);
    function revertFrameY() {
      if (posclear > conWidth) {
        clearInterval(revertY);
        window.location.href = baseRef + "/index.html#" + currentPage;
      } else {
        posclear = addWidth(elem, posclear);
      }
    }
  } else {
    posclear = 0;
    revertX = setInterval(revertFrameX, 1);
    function revertFrameX() {
      if (posclear > conWidth) {
        clearInterval(revertX);
        frameID.find(".animation-container").hide();
      } else {
        posclear = posclear + 20;
        elem.css({
          right: posclear + "px"
        });
      }
    }
  }
}
