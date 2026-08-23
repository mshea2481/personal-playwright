$(window).scroll(function() {
    var scroll = $(window).scrollTop();
    var width = $(window).width();
    if (scroll > 0 && width >= 768)  {
        $("#scroll").addClass("active");
        $("#shrink").addClass("active");
        $("#scroll-left-align").addClass("active");
        $("#adjust-height").addClass("active");
    }
    else {
        $("#scroll").removeClass("active");
        $("#shrink").removeClass("active");
        $("#scroll-left-align").removeClass("active");
        $("#adjust-height").removeClass("active");
    }
});


$(window).scroll(function() {
    var mobileScroll = $(window).scrollTop();
    var width = $(window).width();
    if (mobileScroll > 0 && width <= 768)  {
        $("#mobileScroll").addClass("active");
    }
    else {
        $("#mobileScroll").removeClass("active");
    }
});

document.addEventListener('DOMContentLoaded', () => {
  window.setTimeout(() => {
    document.querySelectorAll('.alert').forEach((alert) => {
      alert.style.transition = 'opacity 300ms ease';
      alert.style.opacity = '0';

      window.setTimeout(() => alert.remove(), 300);
    });
  }, 5000);
});