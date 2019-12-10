$(document).ready(function(){
    $('.nav_submenu').hide();

    $('aside .nav_item').click(function () {
        if (!(this).classList.contains('active')) {
            let submenu = this.parentNode.querySelector('.nav_submenu');
            if (submenu) {
                $('.nav_submenu').not(submenu).slideUp(600);
                $(submenu).slideToggle(600);
                $('.nav_item').not(this).removeClass('active_menu');
                $(this).toggleClass('active_menu');
            } else {
                $('.nav_item').removeClass('active');
                $(this).addClass('active');
            }
        }
    });

    $(".banner").slick({
        arrows: false
    });

    var ctx = document.getElementById('myChart').getContext('2d');

    var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
        datasets: [{
            label: 'Текущий период',
            borderColor: 'rgba(153, 102, 255, 1)',
            backgroundColor: 'rgba(243,243,243, 0)',
            data: [0, 5000, 5500, 15000, 43999, 25000, 36000]
        },
        {
            label: 'Предыдущий период',
            borderColor: 'rgba(255, 159, 64, 1)',
            backgroundColor: 'rgba(243,243,243, 0)',
            data: [5000, 7000, 5500, 19000, 11500, 10300, 15000]
        }]
    },

    // Configuration options go here
    options: {}
    });

    document.querySelectorAll('img.svg').forEach(function(img){
        var imgID = img.id;
        var imgClass = img.className;
        var imgURL = img.src;

        fetch(imgURL).then(function(response) {
            return response.text();
        }).then(function(text){

            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(text, "text/xml");

            // Get the SVG tag, ignore the rest
            var svg = xmlDoc.getElementsByTagName('svg')[0];

            // Add replaced image's ID to the new SVG
            if(typeof imgID !== 'undefined') {
                svg.setAttribute('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if(typeof imgClass !== 'undefined') {
                svg.setAttribute('class', imgClass+' replaced-svg');
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            svg.removeAttribute('xmlns:a');

            // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
            if(!svg.getAttribute('viewBox') && svg.getAttribute('height') && svg.getAttribute('width')) {
                svg.setAttribute('viewBox', '0 0 ' + svg.getAttribute('height') + ' ' + svg.getAttribute('width'))
            }

            // Replace image with new SVG
            img.parentNode.replaceChild(svg, img);

        });

    });

    $('select').niceSelect();

    $('.chart_period_btn').click(function() {
        if(!$(this).hasClass('active_period')) {
            $('.chart_period_btn').not(this).removeClass('active_period');
            $(this).addClass('active_period');
        }
    });

    let viewportWidth = window.innerWidth || document.documentElement.clientWidth;

    if (viewportWidth < 1350 && viewportWidth >= 767) {
        $('.chart').append($('.social'));
    } else if (viewportWidth < 1024) {
        $('aside').hide();
    }

    if(viewportWidth < 767) {
        $('.articles').slick({
            arrows: false
        });
    }

    window.addEventListener('resize', function () {
        viewportWidth = window.innerWidth || document.documentElement.clientWidth;
        if (viewportWidth < 1350 && viewportWidth >= 767) {
            $('.chart').append($('.social'));
        } else {
            $('.aside-right').append($('.social'));
        }

        if (viewportWidth < 1024) {
            $('aside').hide();
        } else {
            $('aside').show();
        }

        if (viewportWidth < 767) {
            $('.articles').slick({
                arrows: false
            });
        }
    }, false);

    $('.menu-btn').click(function() {
        $('aside').animate({
            width: "toggle"
        });
    });

    $('#nav-menu').click(function() {
        $('aside').slideToggle();
        let src = ($(this).find('img').attr('src') === "images/menu.svg") ? "images/close-btn.svg" : "images/menu.svg";
        $(this).find('img').attr("src", src);
        if($('.nav_user').is(':visible')) {
            $('.nav_user').slideUp();
            $('#user-menu').find('img').attr("src", "images/user-mobile.svg");
        }
    });

    $('#user-menu').click(function() {
        $('.nav_user').slideToggle();
        let src = ($(this).find('img').attr('src') === "images/user-mobile.svg") ? "images/close-btn.svg" : "images/user-mobile.svg";
        $(this).find('img').attr("src", src);
        if($('aside').is(':visible')) {
            $('aside').slideUp();
            $('#nav-menu').find('img').attr("src", "images/menu.svg");
        }
    });

    $("html").on("swipe click", function(event)  {
        if($(event.target).is('.info-btn, .info-btn > img')) {
            $('.imgBtn').toggleClass('rotateBtn');
            $('.head_info').slideToggle();
        } else if($('.head_info').is(':visible')) {
            $('.imgBtn').removeClass('rotateBtn');
            $('.head_info').slideUp();
        }
    });

});
