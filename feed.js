$(function() { // Document ready function
    var url = $('#myfeed').attr('url'); // This is the URL for your JSON feed.
    
    //pagination
    var state = {
        'page':1,
        'elements': 8,
        'count': 0,
        'pageNum': 0,
        'window': 5,
        'feedSize': 0,
        'elementPerRow': 1,
    }
    
    //copy of events data
    var events;

    function pagination(){
        $('#myfeed').empty();
        let trimStart = (state.page - 1) * state.elements;
        let trimEnd = trimStart + state.elements;
        let trimmedData = events.slice(trimStart, trimEnd);
        for(i in trimmedData) { // loop though list of objects
            if(i%state.elementPerRow==0){
                row = '<div class="eventRow container">';
                $('#myfeed').append(row);
            }
            let html = buildEvent(trimmedData[i]); // build html for object
            $('.eventRow').last().append(html); // append each object to the <div id="myfeed"></div>
        }
        pageButton();
    }
    $(window).resize(function() {
        state.feedSize = $('#myfeed').width();
        if(state.elementPerRow != Math.floor(state.feedSize/300)){
            state.elementPerRow = Math.floor(state.feedSize/300)>=1 ? Math.floor(state.feedSize/300): 1;
            pagination();
        }
    });
    function pageButton(){
        $('#pagination-wrapper').empty();
        let html = '';
        var maxLeft = (state.page - Math.floor(state.window/2));
        var maxRight = (state.page + Math.floor(state.window/2));

        if(maxLeft < 1){
            maxLeft = 1;
            maxRight = state.window;
        }
        if(maxRight > state.pageNum){
            maxLeft = state.pageNum - (state.window - 1);
            maxRight = state.pageNum;
            if(maxLeft < 1){
                maxLeft = 1;
            }
        }
        for(let page = maxLeft; page <= maxRight; page++){
            html += '<button value = '+page+' class = page-button>'+page+'</button>';
        }
        if (state.page != 1) {
            html = '<button value='+1+' class = "page-button">&#171; First</button>' + html;
        }
    
        if (state.page != state.pageNum) {
            html += '<button value='+state.pageNum+' class="page-button">Last &#187;</button>';
        }
        $('#pagination-wrapper').append(html);
        $('.page-button').on('click', function(){
            state.page = Number($(this).val());
            pagination();
            $('.page-button').filter(function(){return this.value==state.page}).addClass('current-page');
        })
        
    }
    // Run an ajax call. The documentation is here : http://api.jquery.com/jquery.ajax/
    $.ajax({
        url: url, // Set the URL for the json feed
        success: function(data) { // Run this if there is a successful call
            paginationHtml = '<div class = "pagination-container container"><div id="pagination-wrapper"></div></div>';
            $('#myfeed').after(paginationHtml);
            linkToHappening = url.replace("/json", "");
            linkToHappeningHtml = '<div class = "container link-to-happening"><a href = "'+ linkToHappening+ '">View on Happening @ Michigan</a></div>'
            $('#myfeed').after(linkToHappeningHtml);
            events = data;
            state.count = events.length;
            state.pageNum = Math.ceil(state.count/state.elements);
            state.feedSize = $('#myfeed').width();
            state.elementPerRow = Math.floor(state.feedSize/300)>=1 ? Math.floor(state.feedSize/300): 1;
            if(events.length){ // if anything was returned
                pagination();
            }
            pageButton();
        }
    });

    // create html for object.
    function buildEvent(obj) {
        let html = '<div class="event" style="flex:0 0 '+(100/state.elementPerRow)+'%">';
        let image_url = (obj.image_url) ? obj.image_url: "https://events.umich.edu/images/default190@2x.png";
        let image = '<a class = "image-link" href ='+obj.permalink+'><div class = "event-image" style="background-image: url('+image_url+')"></div></a>';
        html += image;
        html += '<div class = "eventText">';
        let title = obj.event_title;
        html += '<h3 class = "event-title"><a href ='+obj.permalink+' class = "event-link event-title-link">'+title+'</a></h3>';
        let date = obj.date_start;
        html += '<ul><li><i class="fa fa-fw fa-calendar"></i><span> Date: '+date+'</span></li>';
        let links = obj.links;
        let location_name = obj.location_name;
        if(location_name)
            html+= '<li><i class="fa fa-location-arrow fa-fw"></i> Location: '+location_name+'</li></ul>';
        for(let i = 0; i < Object.keys(links).length; i++){
            let defaultTitle = (links[i].url.split("://"))[1];
            defaultTitle = (defaultTitle.split('/'))[0];
            let text = links[i].title == null ? defaultTitle: links[i].title;
            link = '<i class="fa fa-link fa-fw"></i><a href = '+links[i].url+' class = "event-link"> '+text + '</a><br>'
            if(i % 2 == 0){
                html += '<div class = container>';
            }
            html+= '<div class = "link-container">'+link+'</div>';
            if(i % 2 != 0){
                html += '</div>';
            }
        }
        html += '</div></div>';

        return html;
    }
    
});