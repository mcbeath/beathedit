function refresh() {
    console.log("refresh");
    $('.raxus-slider .slider-area').each(function() {
        $(this).find('.dots').css('margin-top', -($(this).find('.dots').height()/2));
    });

    $('.raxus-slider[data-thumbnail]').each(function() {
        var thumb = $(this).attr('data-thumbnail');
        var way = thumb == 'left' || thumb == 'right' ? $(this).find('.mini-images li').innerWidth() : $(this).find('.mini-images li').innerHeight();
        $(this).find('.slider-area').css({'left':0, 'right':0, 'top': 0, 'bottom':0});
        $(this).find('.slider-area').css(thumb, way+20);
    });

    $('.raxus-slider').map(function(index, el) {
        raxusSliderGlobal('.dots:eq('+index+') li.selected', 'dot');    
        return this;
    });
}

$(function(){
    
    $(window).scroll(function(event) {
        if ( $('body').scrollTop() > 1 ) {
            $('.header').addClass('small1');
        } else {
            $('.header').removeClass('small');
        }
    });

    $('.dimension a.button').click(function(event) {
        $('#mySlider').css({
            'width': $(this).parent().find('.width').val(),
            'height': $(this).parent().find('.height').val()
        });
        if ( parseInt($(this).parent().find('.width').val()) > 655 ) {
            $('.a').removeClass('col-md-7').addClass('col-md-12').css('margin-bottom', '30px');
            $('.b').removeClass('col-md-5').addClass('col-md-12');
        } else {
            $('.a').removeClass('col-md-12').addClass('col-md-7');
            $('.b').removeClass('col-md-12').addClass('col-md-5');
        }
        setTimeout( function() { refresh() }, 500 )
    });

	$('#top, #lef, #rig, #bot').click(function(event) { 
        $('#mySlider').attr('data-thumbnail', $(this).text()); 
        refresh(); 
        $(this).parent().find('li').removeClass('selected');
        $(this).addClass('selected'); 
    });

    $('#hor').click(function(event) {
    	$('#mySlider').removeAttr('data-direction');
    	refresh();
    	$(this).parent().find('li').removeClass('selected');
    	$(this).addClass('selected');
    });
    $('#ver').click(function(event) {
    	$('#mySlider').attr('data-direction', 'vertical');
    	refresh();
    	$(this).parent().find('li').removeClass('selected');
    	$(this).addClass('selected'); 
    });
});

