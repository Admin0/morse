jQuery(function($) {
  $.fn.hScroll = function(amount) {
    amount = amount || 120;
    $(this).bind("DOMMouseScroll mousewheel", function(event) {
      var oEvent = event.originalEvent,
        direction = oEvent.detail ? oEvent.detail * -amount : oEvent.wheelDelta,
        position = $(this).scrollLeft();
      position += direction > 0 ? -amount : amount;
      $(this).scrollLeft(position);
    });
  };
});

$(document).ready(function() {
  if (!is_mobile) {$('.contents.sub').hScroll(120);}
});
