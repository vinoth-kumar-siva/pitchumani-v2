// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require activestorage
//= require turbolinks
//= require_tree .
//= require jquery3
//= require popper
//= require bootstrap-sprockets
//= require toastr

$(document).ready(function() {
  
	$('.vote-now').click(function(){
    console.log("Yes! checking");
		$.ajax({
      url: "/home/vote_now",
      method: "POST",
      data: {user_id: $('.vote-now').attr('data-userid')},
      success: function(data) {
        if (data["alert"] == "success") {
            $('.vote-now').prop('disabled', true);
            toastr.success(data.message);
            $('#support').html(data.support);
            console.log("data.support -->",data.support);
            setTimeout( function() { 
              swal("Let the world know about him!", "Kapathanum nu vanta kaludhai ah kapathi vittutu poo")
              .then((value) => {
                $('html, body').animate({
                  scrollTop: $("#contact-section").offset().top
                }, 2000);
              });
            }  , 6000 );
              
        }
        else {
            toastr.error(data.message);
        }
      }
    })
  });

  $('.like-btn').click(function(){
    var class_name = $(this)
    var count_for_id = $(this).attr('id');

    //console.log("Hello world", class_name);
    $.ajax({
      url: "/home/like",
      method: "POST",
      data: {comment_id: $(this).attr('data-commentid')},
      success: function(data) {
        if (data["alert"] == "success"){
          toastr.success(data.message);
        }
        else {
            toastr.error(data.message);
        }
        $('.count').html(data.like_count);
      }
    })
  });
  
  $('.post-now').on( "click",function() {
    //console.log( $('#message').val())
    if($('#message').val() == '') {
      toastr.error('Please enter your name');
    } else if(($('#name').val() == '')) {
      toastr.error('Please enter your message');
    } else {
      $.ajax({
        url: "/home/create_post",
        method: "POST",
        data: {message: $('#message').val(), name: $('#name').val()},
        success: function(data) {
          toastr.success(data.message);
          console.log(data.support)
  
          var data_array = data.support;
          data_array.forEach(function (arrayItem) {
            $('#real_time_comments').append('<div class="slide-text"><blockquote><p><span>&ldquo;</span>'+arrayItem.text+'<span>&rdquo;</span></p><p class="author">&mdash;  '+arrayItem.name+'</p></blockquote></div>')
          });
          // if after submit message and name will be empty, add this code
          // $('#message').val('')
          // $('#name').val('')
          
        }
      })
    }
    
  });
})