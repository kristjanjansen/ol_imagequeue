var id = getURLParameter('id')
if (id) $('#id').val(id)


$("form").submit(function(e){
  e.preventDefault();
  var id = $('#id').val();

  $('#message').html('Please wait...')

  $.ajax({
     type: "POST",
     url: "/new",
     data: JSON.stringify({ id: id }),
     contentType: "application/json; charset=utf-8",
     dataType: "json",
     success: function(data) { 
       $('#message').html(data.message)
       $('#image').attr('src', data.image_url)
      },
     failure: function(errMsg) { 
       console.log(errMsg)
      }
   });
});


function getURLParameter(name) {
    return decodeURIComponent(
        (location.search.match(RegExp("[?|&]"+name+'=(.+?)(&|$)')))[1]
    );  
}
