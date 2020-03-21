$(document).ready(function(){
    $(".dropdown").hover(
        // on mouse enter
        function(e) {
            let $dropdown = $('.dropdown-menu', this);
            if (typeof $dropdown !== 'undefined' && !!$dropdown.stop)
            $dropdown.stop(true,true).slideDown("400", 
                function() { $(this).addClass('open'); }
            );
        },
        // on mouse leave
        function(e) {
            let $dropdown = $('.dropdown-menu', this);
            if (typeof $dropdown !== 'undefined' && !!$dropdown.stop)
            $dropdown.stop(true,true).slideUp("400",
                function() { $(this).removeClass('open'); }
            );
        }
    );   
    $(".horiz-nav-item > a").click(function (e) {
        e.preventDefault();
        var href = $(this).attr("href");
        window.open(href);
        return false;
    });
});