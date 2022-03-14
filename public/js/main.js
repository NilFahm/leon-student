  // Activate smooth scroll on page load with hash links in the url

$( document ).ready(function() {   
   

$(".eyeIcon").on("click", function () {
        $(this).toggleClass("active");
        if ($(this).hasClass("active")) {
            $(this).parent().find("input").attr("type", "text");
        } else {
            $(this).parent().find("input").attr("type", "password");
        }
 });
 $('.serachTopwhit input').keyup(function() {
  if ($(this).val().length < 3) {
    $('.searchCloseBtn').show();
  }
});

 $('.searchCloseBtn').click(function() {
    $(this).hide();
    $(this).next('input').val('');
  });
 //
$('.identiBtns a').click(function() {
    $('.identiBtns a').removeClass('active')
    $(this).addClass('active');
    
  });
//
$('.micLink, .vidLink, .linkMic, .linkEnd, .linkVid, .techVidIcon, .techMicIcon').click(function() {
    $(this).toggleClass('active')
  });

$('.linkHand').click(function() {
    $(this).addClass('active')
  });
// 
$('.slider1 ul').slick({
  dots: false,
  infinite: false,
});


$('#detailsView-tab').click(function() {
    $('#summaryView').removeClass('active')
    $('#detailsView').addClass('active')
    $('.sliderResult').slick({
          dots: false,
          infinite: false,
        });
    
    
  });

$('#summaryView-tab').click(function() {
    $('#summaryView').addClass('active')
    $('#detailsView').removeClass('active')
    $('.sliderResult').slick({
          dots: false,
          infinite: false,
        });
    
    
  });
 

 


//
$( ".match1 img" ).draggable();  
//

$('.tabs a').click(function(){
    var tab_id = $(this).attr('data-tab');

    $('.tabs a').removeClass('current');
    $('.tab-content').removeClass('current');

    $(this).addClass('current');
    $("#"+tab_id).addClass('current');

    $('.sliderResult').slick({
      dots: false,
      infinite: false,
    });
  })


	$('input,textarea').focus(function(){
	$(this).data('placeholder',$(this).attr('placeholder'))
		   .attr('placeholder','');
	}).blur(function(){
	   $(this).attr('placeholder',$(this).data('placeholder'));
	});  

// select 

$('.techOptIcon').click(function() {
    $(this).toggleClass('active');
    $('.techOptBox, .teachBotomLinks').toggleClass('active')

  });
$('.startActivitypup .starLink a').click(function() {
    
    $('.techOptBox, .teachBotomLinks, .techOptIcon').removeClass('active')

  });

$('.startActivitypup .starLink a').click(function() {
      $('.brainBtn').show();
      $("#startActivitypup").modal('hide');
  });

//
$('.shareBtn').click(function() {
    if ($('.shareBtn').text() == "Off") {
      $(this).text("On")
    } else {
      $(this).text("Off")
    }
});
//

$('.startBtn').click(function() {
    //$(this).toggleClass('active');
    if ($('.startBtn').text() == "Start") {
      $(this).text("Stop").addClass('active')
      $('.charBtnBox').show();
      $('#slideShowOff').show();
    } else {
      $(this).text("Start").removeClass('active')
      $(".charBtnBox").hide();
      $('#slideShowOff').show();
      $('#slideShowOff2').hide();
      $('.shareBoxNew').removeClass('active');
    }

});
//
$('.charBtnBox').click(function() {
    $(this).toggleClass('active');
    $('.shareBoxNew').toggleClass('active');
    $('#slideShowOff').toggle();
    $('#slideShowOff2').toggle();

  });

$('.dashclickLayer').click(function() {
    $(this).hide();
    $(this).parents('.menuLeft').removeClass('menuSmall');
    $('.dashBox1').addClass('dashBox1New');
    $('.dashBox2').addClass('dashBox2New');
    $('.dashclickLayerRight').show();
    

  });

$('.dashclickLayerRight').click(function() {
    $('.dashclickLayerRight').hide();
    $('.menuLeft').addClass('menuSmall');
    $('.dashBox1').removeClass('dashBox1New');
    $('.dashBox2').removeClass('dashBox2New');
    $('.dashclickLayer').show();
  });

$('.dashLinks a').click(function() {
    $('.dashLinks a').removeClass('active');
    $(this).addClass('active');
    $('.dashclickLayerRight').hide();
    $('.menuLeft').addClass('menuSmall');
    $('.dashBox1').removeClass('dashBox1New');
    $('.dashBox2').removeClass('dashBox2New');
    $('.dashclickLayer').show();
  });


$('.scroll-pane').jScrollPane();

$('.topClassList').jScrollPane();




});

