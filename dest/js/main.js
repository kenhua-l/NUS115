$(window).resize(function() {
  if ($(window).width() < 992) {
    $(".tabs")
      .addClass("tabs-dropdown")
      .removeClass("tabs");
  } else {
    $(".tabs-dropdown")
      .addClass("tabs")
      .removeClass("tabs-dropdown");
  }
});
$(document).ready(function() {
  // homepage slick
  $('.navigator').slick({
    centerMode: true,
    centerPadding: "20%",
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
  removeAnimation($("#clear-animation"));
  exitAnimation($("#revert-animation"), true, null);

  $(".close-btn").on("click", function() {
    exitAnimation($("#clear-animation"), false, $(this).attr("id"));
  });

  // Nav tabs
  $(".tabs ul li a").on("click", function() {
    navTabs(true);
  });

  // Dropdown
  if ($(window).width() < 992) {
    $(".tabs")
      .addClass("tabs-dropdown")
      .removeClass("tabs");
  }

  $(".selected-container").on("click", function() {
    console.log("clicked");
    $(".tabs-dropdown ul").slideToggle();
  });

  $(".tabs-dropdown ul li a").on("click", function() {
    $(".tabs-dropdown ul").slideToggle();
    navTabs(true);
  });

  $(".milestones-container").on("beforeChange", function(
    event,
    slick,
    currentSlide,
    nextSlide
  ) {
    if (nextSlide == 0) {
      location.href = "#technology";
      $(".tabs-dropdown .selected").text(function() {
        return "TECHNOLOGY";
      });
    } else if (nextSlide == 1) {
      location.href = "#health";
      $(".tabs-dropdown .selected").text(function() {
        return "HEALTH";
      });
    } else if (nextSlide == 2) {
      location.href = "#enterprise";
      $(".tabs-dropdown .selected").text(function() {
        return "ENTERPRISE";
      });
    } else if (nextSlide == 3) {
      location.href = "#community";
      $(".tabs-dropdown .selected").text(function() {
        return "COMMUNITY";
      });
    } else if (nextSlide == 4) {
      location.href = "#sustainability";
      $(".tabs-dropdown .selected").text(function() {
        return "SUSTAINABILITY";
      });
    }
    navTabs(false);
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
  setTimeout(() => {
    var hash = location.hash;
    if (hash == "") {
      hash = "#technology";
    }
    $(".milestones-content")
      .find(".active")
      .removeClass("active");
    $(".tabs")
      .find(".active")
      .removeClass("active");
    $(".tabs-dropdown")
      .find(".active")
      .removeClass("active");
    $(".tabs")
      .find(hash)
      .addClass("active");
    $(".tabs-dropdown")
      .find(hash)
      .addClass("active");
    $(".milestones-content " + hash).addClass("active");

    if (toggle == true) {
      if (hash == "#technology") {
        $(".milestones-container").slick("slickGoTo", 0);
        $(".tabs-dropdown .selected").text(function() {
          return "TECHNOLOGY";
        });
      } else if (hash == "#health") {
        $(".milestones-container").slick("slickGoTo", 1);
        $(".tabs-dropdown .selected").text(function() {
          return "HEALTH";
        });
      } else if (hash == "#enterprise") {
        $(".milestones-container").slick("slickGoTo", 2);
        $(".tabs-dropdown .selected").text(function() {
          return "ENTERPRISE";
        });
      } else if (hash == "#community") {
        $(".milestones-container").slick("slickGoTo", 3);
        $(".tabs-dropdown .selected").text(function() {
          return "COMMUNITY";
        });
      } else if (hash == "#sustainability") {
        $(".milestones-container").slick("slickGoTo", 4);
        $(".tabs-dropdown .selected").text(function() {
          return "SUSTAINABILITY";
        });
      }
    } else {
      return;
    }
  }, 50);
  $(".content-container").animate({
    scrollTop: 0
  });
}
function responsiveSlider(slider) {
  var settings = {
    dots: true,
    adaptiveHeight: true
  };
  if (!slider.hasClass("slick-initialized")) {
    $(".grid-container")
      .addClass("grid-slider")
      .removeClass("grid-container");
    return slider.slick(settings);
  }
}

function removeAnimation(clearFrameID) {
  var conWidth = clearFrameID.find("#animation-container").width();
  var elem = clearFrameID.find("#animation");
  var posclear = 0;
  var widthClear = setInterval(clearFrame, 1);
  function clearFrame() {
    if (posclear > conWidth) {
      clearInterval(widthClear);
      elem.removeAttr("style");
      clearFrameID.find("#animation-container").hide();
      redirectedAnimate($(".wrapper"));
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
  // e.preventDefault();
  // var currentSlick = $(".slick-current")
    // .text()
    // .trim();

  // var pageHref = baseRef + "/about.html";
  // if (currentSlick == "ABOUT") {
    // pageHref = baseRef + "/about.html";
  // } else
  // if (currentSlick == "MESSAGE") {
  //   pageHref = baseRef + "/message.html";
  // } else if (currentSlick == "MILESTONES") {
  //   pageHref = baseRef + "/milestones.html";
  // } else if (currentSlick == "EVENTS") {
  //   pageHref = baseRef + "/events.html";
  // } else if (currentSlick == "DISTINGUISHED SPEAKER SERIES") {
  //   pageHref = baseRef + "/speaker.html";
  // }
  var pageHref = '/' + url + '.html';
  var conHeight = $("#animation-container").height();
  var conWidth = $("#animation-container").width();
  var elem = $("#animation");
  elem.css({
    bottom: 0,
    width: "300px",
    height: "100px",
    left: "0"
  });
  $("#animation-container").show();

  var pos = 0;
  var poswidth = elem.width();
  // var id = setInterval(frame, 1);
  var widthMove;
  $.when(pageTransit()).then(function(){
    setTimeout(function(){
      window.location.href = pageHref;
    }, 1500);
  });
  function pageTransit() {
    elem.animate({
      height: $(window).height()
    }, 500);
    elem.animate({
      width: $(window).width()
    }, 1000);
    // window.location.href = pageHref;
  }

  // function frame() {
  //   if (pos > conHeight) {
  //     clearInterval(id);
  //     widthMove = setInterval(widthframe, 1);
  //   } else {
  //     pos = pos + 20;
  //     elem.css({
  //       height: pos + "px"
  //     });
  //   }
  // }
  //
  // function widthframe() {
  //   if (poswidth > conWidth) {
  //     clearInterval(widthMove);
  //     window.location.href = pageHref;
  //     setTimeout(() => {
  //       elem.removeAttr("style");
  //       $("#animation-container").hide();
  //     }, 500);
  //   } else {
  //     poswidth = poswidth + 20;
  //     elem.css({
  //       width: poswidth + "px"
  //     });
  //   }
  // }
}

function redirectedAnimate(frameID) {
  var conHeight = frameID.find("#animation-container").height();
  var conWidth = frameID.find("#animation-container").width();
  var elem = frameID.find("#animation");
  frameID.find("#animation-container").show();
  var pos = 0;
  var poswidth = elem.width();
  var posclear = 0;
  var id = setInterval(frame, 1);
  var widthMove;
  function frame() {
    if (pos > conHeight) {
      clearInterval(id);
      widthMove = setInterval(widthframe, 1);
    } else {
      pos = pos + 20;
      elem.css({
        height: pos + "px"
      });
    }
  }
  function widthframe() {
    if (poswidth > conWidth) {
      clearInterval(widthMove);
      var widthClear = setInterval(clearFrame, 1);
      frameID.find(".content-container").css({
        background: "rgba(88, 107, 134, 0.7)"
      });
      frameID.find(".content").show();
      responsiveSlider($(".milestones-container"));
      $(".event-slider-container").slick({
        slidesToShow: 3,
        focusOnSelect: true,
        infinite: false,
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 2
            }
          },
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 1
            }
          }
        ]
      });
      function clearFrame() {
        if (posclear > conWidth) {
          clearInterval(widthClear);
          elem.removeAttr("style");
          navTabs(true);
          frameID.find("#animation-container").hide();
        } else {
          posclear = posclear + 20;
          elem.css({
            left: posclear + "px"
          });
        }
      }
    } else {
      poswidth = poswidth + 20;
      elem.css({
        width: poswidth + "px"
      });
    }
  }
}

function exitAnimation(frameID, homeClear, currentPage) {
  var conWidth = frameID.find("#animation-container").width();
  var elem = frameID.find("#animation");
  frameID.find("#animation-container").show();
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
        posclear = posclear + 20;
        elem.css({
          width: posclear + "px"
        });
      }
    }
  } else {
    posclear = 0;
    revertX = setInterval(revertFrameX, 1);
    function revertFrameX() {
      if (posclear > conWidth) {
        clearInterval(revertX);
        frameID.find("#animation-container").hide();
      } else {
        posclear = posclear + 20;
        elem.css({
          right: posclear + "px"
        });
      }
    }
  }
}
