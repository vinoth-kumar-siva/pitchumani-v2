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
  
	$('.non-auth-btn').click(function(){
		toastr.error("Authenticaion Required! Please login!")
		// swal("Your vote has been registered successfully!", "", "success")
	});

	$('.vote-now').click(function(){
		$.ajax({
      url: "/home/vote_now",
      method: "POST",
      data: {user_id: $('.vote-now').attr('data-userid')},
      success: function(data) {
          if (data["alert"] == "success"){
              toastr.success(data.message);  
          }
          else {
              toastr.error(data.message);
          }
          $('.support_count').html(data.support);
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
    $.ajax({
      url: "/home/create_post",
      method: "POST",
      data: {user_id: $('.vote-now').attr('data-userid'), message: $('#message').val()},
      success: function(data) {
        $('#message').val('');
        $("#refresh_comment").empty();

        toastr.success(data.message);
        
        var data_array = data.support;

        data_array.forEach(function (arrayItem) {
          location.reload();
          //console.log("array --->", arrayItem);
          //$('#refresh_comment').append('<ul class="media-list"><li><div class="media-body"><strong class="text-success" style="padding: 10px;">@'+ arrayItem.user_id +'&nbsp;&nbsp;'+ arrayItem.text +'</strong><span class="text-muted pull-right"><small class="text-muted"><button class="btn btn-xs"><span class="fa fa-thumbs-up like-btn" data-commentid="'+arrayItem.id+'"><b style="margin: 5px;">'+arrayItem.like_count+'</b></span></button></small></span></div></li></ul>');
        });
      }
    })
  });
})