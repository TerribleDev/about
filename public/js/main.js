jQuery(document).ready(function ($) {
    $('.level-bar-inner').css('width', '0');

    $(window).on('load', function () {
        $('.level-bar-inner').each(function () {
            var itemWidth = $(this).data('level');

            $(this).animate({
                width: itemWidth
            }, 800);
        });

    });

    /* Bootstrap Tooltip for Skillset */
    $('.level-label').tooltip();

    /* jQuery RSS - https://github.com/sdepold/jquery-rss */
    $("#rss-feeds").rss(

        //Change this to your own rss feeds
        "https://blog.tommyparnell.com/rss",

        {
            // how many entries do you want?
            // default: 4
            // valid values: any integer
            limit: 3,

            // the effect, which is used to let the entries appear
            // default: 'show'
            // valid values: 'show', 'slide', 'slideFast', 'slideSynced', 'slideFastSynced'
            effect: 'slideFastSynced',

            // outer template for the html transformation
            // default: "<ul>{entries}</ul>"
            // valid values: any string
            layoutTemplate: "<div class='item'>{entries}</div>",

            // inner template for each entry
            // default: '<li><a href="{url}">[{author}@{date}] {title}</a><br/>{shortBodyPlain}</li>'
            // valid values: any string
            entryTemplate: '<h3 class="title"><a href="{url}" target="_blank">{title}</a></h3><div><p>{shortBodyPlain}</p><a class="more-link" href="{url}" target="_blank"><i class="fa fa-external-link"></i>Read more</a></div>'
        }
    );
    window.GitHubActivity.feed({
        username: "tparnell8",
        selector: "#feed",
        limit: 20 // optional
    });

    var buildFinalFantasy = function (data) {
        return "<aside class=\"aside section\"> \
        <div class=\"section-inner\"> \
            <h2 class=\"heading\">Final Fantasy XIV Data</h2> \
            <div class=\"content\"> \
             <div class=\"row\"> \
              <div class=\"col-md-6\"> \
                <ul class=\"list-unstyled\"> \
                    <li><i class=\"fa \"></i><img src=\"" + data.avatar + "\" </li> \
                    <li><i class=\"fa \"></i> Name: <a href=\"http://na.finalfantasyxiv.com/lodestone/character/8696200/\"> " + data.name + "</a> </li> \
                    <li><i class=\"fa \"></i> Active Level: " + data.activeLevel + " </li> \
                    <li><i class=\"fa \"></i> Active Job: " + data.activeJob+ " </li> \
                    <li><i class=\"fa \"></i> Current City: " + data.city+ " </li> \
                    <li><i class=\"fa \"></i> World: " + data.world + " </li> \
                    <li><i >Data supplied by <a href=\"http://xivsync.com/\"> XVISync API </a></i>  </li> \
               </ul> \
                </div> \
                <div class=\"col-md-6\"> \
                     <img class=\"img-responsive\" src=\"" + data.portrait + " \" /> \
                </div> \
              </div> \
            </div> \
        </div> \
    </aside>";
    };

    LodestoneAPI.Search.Character(8696200, null, function (data) {
        if (data !== undefined && data !== null) {
            $('.secondary').append(buildFinalFantasy(data));
        }
    });

    $(window).scroll(function () {
        var sticky = $('.header'),
            scroll = $(window).scrollTop();

        if (scroll >= 131) sticky.addClass('stick');
        else sticky.removeClass('stick');
    });

});
