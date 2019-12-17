$(document).ready(function() {
  $(".slick-container").slick({
    centerMode: true,
    centerPadding: "25%",
    arrows: false,
    focusOnSelect: true,
    infinite: false
  });
  // Animation control
  removeAnimation($("#clear-animation"));
  $(".home-content").hide();
  exitAnimation($("#revert-animation"), true);

  $(".close-btn").on("click", function() {
    exitAnimation($("#clear-animation"), false);
  });

  // HOVER
  $(".learn-more-btn, .find-out-more-btn").hover(
    function() {
      $(this).css({
        "border-color": "#f5821f",
        color: "#f5821f"
      });
    },
    function() {
      $(this).css({
        "border-color": "white",
        color: "white"
      });
    }
  );
});

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
function redirect() {
  var currentSlick = $(".slick-current")
    .text()
    .trim();
  var pageHref = baseRef + "/about.html";
  if (currentSlick == "ABOUT") {
    pageHref = baseRef + "/about.html";
  } else if (currentSlick == "MESSAGE") {
    pageHref = baseRef + "/message.html";
  } else if (currentSlick == "MILESTONES") {
    pageHref = baseRef + "/milestones.html";
  } else if (currentSlick == "EVENTS") {
    pageHref = baseRef + "/events.html";
  } else if (currentSlick == "SPEAKER") {
    pageHref = baseRef + "/speaker.html";
  }
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
      window.location.href = pageHref;

      setTimeout(() => {
        elem.removeAttr("style");
        $("#animation-container").hide();
      }, 500);
    } else {
      poswidth = poswidth + 20;
      elem.css({
        width: poswidth + "px"
      });
    }
  }
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
        infinite: true,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2
            }
          },
          {
            breakpoint: 600,
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

function exitAnimation(frameID, homeClear) {
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
        window.location.href = baseRef + "/index.html";
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
