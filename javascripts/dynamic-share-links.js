$(document).ready(function() {
    var share_links = {
        'fb_share_link': 'http://www.facebook.com/sharer.php?u={{url}}',
        'tw_share_link': 'http://www.twitter.com/share?url={{url}}',
        'email_share_link' :'',
        'email_signup_link': ''
    }

    $('.share_buttons').each(function(i, buttons) {
        var url;
        var $post = $(buttons).closest('article.post');
        if ($post.length > 0) {
            url = $post.find('.small a').first().attr('href');
        } else {
            url = window.location;
        }

        $(buttons).find('a').each(function(i, link) {
            if (share_links[link.className] !== '') {
                var dest = share_links[link.className]
                    .replace(/{{url}}/, encodeURIComponent(url));
                $(link).attr('href', dest);
            }
            $(link).on('click', function(ev) {
                ga('send', 'event', 'share',
                   ev.target.className, ev.target.href);
            });
        });
    });
    
    $('.share_buttons_raw').each(function(i, buttons) {
         $(buttons).find('a').on('click', function(ev) {
            ga('send', 'event', 'share',
                ev.target.className, ev.target.href);
         });
    });
    
    $('.eaSubmitButton').on('click', function () {
        ga('send', 'event', 'submit', window.location);
    });
});
