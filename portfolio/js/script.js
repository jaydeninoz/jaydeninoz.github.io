$(document).ready(function() {
    $('#slides').superslides({
        animation: 'fade',
        play: 3000,
        pagination: false

    });

    var typed = new Typed(".typed", {
        strings: ["Software Engineering Graduate.", "Passionate Web Developer."],
        typeSpeed: 70,
        loop: true,
        startDelay: 1000,
        showCursor: false
    });

    $('.owl-carousel').owlCarousel({
        loop:true,
        items: 4,
        nav:true,
        responsive:{
            0:{
                items:1
            },
            480:{
                items:2
            },
            768:{
                items:3
            },
            938:{
                items:4
            }
        }
    })

   

    var skillsTopOffset = $(".skillsSection").offset().top;
    var statsTopOffset = $(".statsSection").offset().top;
    var countupFinished = false;

    $(window).scroll(function() {
        if(window.pageYOffset > skillsTopOffset - $(window).height() + 200 ) {
            $('.chart').easyPieChart({
                easing: 'easeInOut',
                barColor: '#fff',
                trackColor: false,
                scaleColor: false,
                lineWidth: 4,
                size: 152,
                onStep: function(from, to, percent) {
                    $(this.el).find('.percent').text(Math.round(percent))
                }
            });
        }
 
        if(!countupFinished && window.pageYOffset > statsTopOffset - $(window).height() + 200 ) {
            $(".counter").each(function() {
                var element = $(this);
                var endVal = parseInt(element.text());
        
                element.countup(endVal);
            });

            countupFinished = true;
        }
    });

    $("[data-fancybox]").fancybox();

    $(".items").isotope({
        filter: '*',
        animationOptions: {
            duration: 4000,
            easing: 'linear',
            queue: false,
        }
    })

    $("#filters a").click(function() {
        $("#filters .current").removeClass("current");
        $(this).addClass("current");
    
        var selector = $(this).attr("data-filter");

        $(".items").isotope({
            filter: selector,
            animationOptions: {
                duration: 1500,
                easing: 'linear',
                queue: false,
            }
        });

        return false;
    }); 

    // $(".timeline-item").hover(function () {
    //     $(".timeline-item").removeClass("active");
    //     $(this).toggleClass("active");
    //     $(this).prev(".timeline-item").toggleClass("close");
    //     $(this).next(".timeline-item").toggleClass("close");
    // });
    
    const nav = $('#navigation');
    const navTop = nav.offset().top;

    $(window).on("scroll", stickyNavigation);

    function stickyNavigation() {
        const body = $("body");

        if ($(window).scrollTop() >= navTop) {
            body.css("padding-top", nav.outerHeight() + "px");
            body.addClass("fixedNav");
        } else {
            body.css("padding-top", 0);
            body.removeClass("fixedNav");
        }
            
    }

});