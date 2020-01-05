var baseRef = $(location).attr('protocol') + '//' + $(location).attr('host');

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
  var toLeft = $('#clear-animation').data('home') ? true : false;
  animatePage($('#clear-animation'), false, toLeft, blockAnimate, [$('.content-container'), animatePage, [$('.content-container')]]);

  // navigator button
  $('.navigator-btn').on('click', function(e) {
    e.preventDefault();
    blockAnimate($('#clear-animation'), redirectPage, [$(this).attr('href')]);
  });
  // close btn
  $('.close-btn').on('click', function() {
    var currentPage = baseRef + "/index.html#" + $(this).data('page');
    animatePage($('#clear-animation'), true, false, redirectPage, [currentPage]);
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
  // setup
  navTabs(true);

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

// Utils
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

function navTabs(toggle) {
  var hash = $(location).attr('hash') != '' ? $(location).attr('hash') : '#' + $('.milestones-item[data-slick-index="0"]').data('title');
  $('.tabs a[href="'+hash+'"]').click();

  if (toggle == true) {
    var slideNum = $('.milestones-item[data-title="' + hash.substr(1) + '"]').data('slick-index');
    $('.milestones-container').slick('slickGoTo', slideNum);
    $('.tabs .selected').text(hash.substr(1).toUpperCase());
  }
}

function redirectPage(toUrl){
  $(location).attr('href', toUrl);
}

function transit(container, containerSpan, property, decrease=false) {
  containerSpan = !decrease ? containerSpan + 20 : containerSpan - 20;
  container.css(property, containerSpan + 'px');
  return containerSpan;
}

function animatePage(frameId, fill=false, toLeft=false, callbackFunction=null, callbackParam=null){
  var container = frameId.find(".animation-container");
  var conWidth = container.width();
  var animation = frameId.find(".animation");
  container.show();

  if(toLeft) { animation.css('left', '0') }
  var initial = fill ? 0 : conWidth; // fill from 0 to conWidth
  var goal = fill ? conWidth : 0;
  var reverse = fill ? false : true; // fill should grow, so not reverse

  var widthClear = setInterval(clearFrame, 1);
  function clearFrame() {
    if ((!fill && initial <= goal) || (fill && initial > goal)) {
      clearInterval(widthClear);
      if(!fill) { container.hide() }
      if(callbackFunction) { callbackFunction.apply(this, callbackParam) }
    } else {
      initial = transit(animation, initial, 'width', reverse);
    }
  }
}

function blockAnimate(frameId, callbackFunction=null, callbackParam=null) {
  var container = frameId.find(".animation-container");
  var goalHeight = container.height();
  var goalWidth = container.width();
  var animation = frameId.find(".animation");
  container.show();
  animation.css({width:'300px', height:'100px'});

  var initialHeight = animation.height();
  var initialWidth = animation.width();
  var setupHeight = setInterval(growHeight, 2);
  var setupWidth;
  function growHeight() {
    if (initialHeight > goalHeight) {
      clearInterval(setupHeight);
      setupWidth = setInterval(growWidth, 1);
    } else {
      initialHeight = transit(animation, initialHeight, 'height');
    }
  }

  function growWidth() {
    if (initialWidth > goalWidth) {
      clearInterval(setupWidth);
      $('.content').removeAttr("style");
      animation.css('right', '0');
      if(callbackFunction) { callbackFunction.apply(this, callbackParam) }
    } else {
      initialWidth = transit(animation, initialWidth, 'width');
    }
  }
}