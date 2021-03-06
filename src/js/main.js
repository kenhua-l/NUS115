var baseRef = $(location).attr("protocol") + "//" + $(location).attr("host");
var isFirefox = typeof InstallTrigger !== 'undefined';
var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));
var isIE = /*@cc_on!@*/false || !!document.documentMode;
var isEdge = !isIE && !!window.StyleMedia;
var isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
var isEdgeChromium = isChrome && (navigator.userAgent.indexOf("Edg") != -1);

$(document).ready(function() {
  if(!(isFirefox  || isSafari || isEdge || isChrome || isEdgeChromium)) {
    $('#browser').show();
  }
  // Animation control
  $(".content").css({ visibility: "hidden" });
  var toLeft = $("#clear-animation").data("home") ? true : false;
  animatePage($("#clear-animation"), false, toLeft, blockAnimate, [
    $(".content-container"),
    animatePage,
    [$(".content-container")]
  ]);

  // close btn
  $(".close-btn").on("click", function() {
    var currentPage = baseRef + "/index.html#" + $(this).data("page");
    animatePage($("#clear-animation"), true, false, redirectPage, [
      currentPage
    ]);
  });
});

// Utils
function slideToHash(slider, hash) {
  var hashExists = false;
  $(slider)
    .find(".slick-slide")
    .each(function() {
      if (
        $(this)
          .data("title")
          .toLowerCase() == hash.toLowerCase()
      ) {
        hashExists = true;
        $(slider).slick("slickGoTo", $(this).data("slick-index"));
      }
    });
  if (!hashExists) {
    $(slider).slick(
      "slickGoTo",
      $(slider)
        .find('[data-slick-start="true"]')
        .data("slick-index")
    );
  }
}

function navTabs(toggle) {
  var hash =
    $(location).attr("hash") != ""
      ? $(location).attr("hash")
      : $(".nav-tabs .nav-item:first-child .nav-link").attr("href");
  $('.tabs a[href="' + hash + '"]').click();

  if (toggle == true) {
    $(".tabs .selected").text(hash.substr(1).toUpperCase());
  }
}

function redirectPage(toUrl) {
  $(location).attr("href", toUrl);
}

function transit(container, containerSpan, property, decrease) {
  if (decrease === undefined) {
    decrease = false;
  }
  containerSpan = !decrease ? containerSpan + 20 : containerSpan - 20;
  container.css(property, containerSpan + "px");
  return containerSpan;
}

function animatePage(frameId, fill, toLeft, callbackFunction, callbackParam) {
  if (fill === undefined) {
    fill = false;
  }
  if (toLeft === undefined) {
    fill = false;
  }
  if (callbackFunction === undefined) {
    callbackFunction = null;
  }
  if (callbackParam === undefined) {
    callbackParam = null;
  }
  $("line, polyline").addClass("stop");
  var container = frameId.find(".animation-container");
  var conWidth = container.width();
  var animation = frameId.find(".animation");
  container.show();

  if (toLeft) {
    animation.css("left", "0");
  }
  var initial = fill ? 0 : conWidth; // fill from 0 to conWidth
  var goal = fill ? conWidth : 0;
  var reverse = fill ? false : true; // fill should grow, so not reverse

  var widthClear = setInterval(clearFrame, 1);
  function clearFrame() {
    if ((!fill && initial <= goal) || (fill && initial > goal)) {
      clearInterval(widthClear);
      if (!fill) {
        container.hide();
        $("line, polyline").removeClass("stop");
      }
      if (callbackFunction) {
        callbackFunction.apply(this, callbackParam);
      }
    } else {
      initial = transit(animation, initial, "width", reverse);
    }
  }
}

function blockAnimate(frameId, callbackFunction, callbackParam) {
  if(frameId.length == 0) {
    return;
  }
  if (callbackFunction === undefined) {
    callbackFunction = null;
  }
  if (callbackParam === undefined) {
    callbackParam = null;
  }
  var container = frameId.find(".animation-container");
  var goalHeight = container.height();
  var goalWidth = container.width();
  var animation = frameId.find(".animation");
  container.show();
  animation.css({ width: "100px", height: "100px" });

  var initialHeight = animation.height();
  var initialWidth = animation.width();
  var setupHeight = setInterval(growHeight, 1);
  var setupWidth;
  function growHeight() {
    $("line, polyline").addClass("stop");
    if (initialHeight > goalHeight) {
      clearInterval(setupHeight);
      setupWidth = setInterval(growWidth, 1);
    } else {
      initialHeight = transit(animation, initialHeight, "height");
    }
  }

  function growWidth() {
    if (initialWidth > goalWidth) {
      $("line, polyline").removeClass("stop");
      clearInterval(setupWidth);
      $(".content").removeAttr("style");
      animation.css("right", "0");
      if (callbackFunction) {
        callbackFunction.apply(this, callbackParam);
      }
    } else {
      initialWidth = transit(animation, initialWidth, "width");
    }
  }
}
