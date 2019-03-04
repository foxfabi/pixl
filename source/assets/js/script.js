
$(document).ready(function(){
  $(".splash").fadeOut("slow");

  function animateCSS(element, animationName, callback)
  {
    node = document.querySelector(element);
    node.classList.add('animated', animationName);
    function handleAnimationEnd()
    {
      node.classList.remove('animated', animationName);
      node.removeEventListener('animationend', handleAnimationEnd);
      if (typeof callback === 'function') callback();
    }
    node.addEventListener('animationend', handleAnimationEnd);
  }

  var guid = function ()
  {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return Math.random().toString(36).substr(2, 9);
  };

  function prefetch(images, index)
  {
    cleanup(images, index);
    // prefetch next image
    var img = $("<img />").attr({
      'id': 'slide-' + index + '-' + guid(),
      'class': 'hidden',
      'data-info': images[index].credits,
      'src': 'images/' + images[index].file
    }).on('load', function() {
      if (!this.complete || typeof this.naturalWidth == "undefined" || this.naturalWidth == 0)
      {
          // Do nothing
      } else {
          $("#image-list").append(img);
          showSlide(images, index);
      }
    });
  }

  function cleanup(images, index) {
    // Limit the amount of cached images
    var amount = $('#image-list img').length;
    while (amount > 1) {
      // remove first image in list
      $('#image-list img').first().remove();
      amount = $('#image-list img').length;
    }
  }
  
  function showSlide(images, index)
  {
    var animations = Array("lauryn","lacy","lainey","lalia");
    $("#cover-image").fadeOut("slow", function() {
      $("#cover-image").attr('class', ""); /*removeClass('animate');*/
      $(this).css({
        'background-image': "url('" + $('img:last').attr('src') + "')"
      });
      $("#credits").html($('img:last').attr('data-info'));
    }).delay(50).fadeIn("fast", function() {
      $("#cover-image").addClass(animations[Math.floor(Math.random()*animations.length)]);
      index++;
      if (index < images.length)
      {
        setTimeout(function()
        {
          prefetch(images, index);
        }, 4000);
      } else {
        setTimeout(function()
        {
          loadImage();
        }, 4000);
      }
    });
  }

  function loadImage()
  {
    $.ajax({
      url: 'images.php',
      success: function(data)
      {
        $("#image-list").empty();
        prefetch(data, 0);
      }
    });
  }

  animateCSS('body', "bounceInDown");

  setTimeout(function()
  {
    loadImage();
    $(".cover-heading").fadeOut();
  }, 2500);

});