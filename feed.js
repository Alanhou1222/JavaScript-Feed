$(function() { // Document ready function
    var url = $('#happening-feed').attr('url'); // This is the URL for your JSON feed.
    
    //pagination
    var state = {
        'page':1,
        'elements': 7,
        'count': 0,
        'pageNum': 0,
        'window': 5,
        'feedSize': 0,
        'elementPerRow': 1,
    }

    //configuration
    var config = {
        'pop-up': false,
        'wide': false,
    }

    //copy of events data
    var events;

    //placeholder
    var placeholder = {
        'image_url': "https://events.umich.edu/images/default-events-module.png",
        'permalink': "https://events.umich.edu/",
        'event_title': "See whats Happening @ Michigan",
        'date_start': "",
        'location_name': "",
        'links': "",
    }

    function pagination(){
        $('#event-feed').empty();
        let trimStart = (state.page - 1) * state.elements;
        let trimEnd = trimStart + state.elements;
        let trimmedData = events.slice(trimStart, trimEnd);
        trimmedData.push(placeholder);
        for(i in trimmedData) { // loop though list of objects
            if(i%state.elementPerRow==0){
                row = '<div class="event-row container">';
                $('#event-feed').append(row);
            }
            let html = buildEvent(trimmedData[i]); // build html for object
            $('.event-row').last().append(html); // append each object to the <div id="happening-feed"></div>
            
        }
        pageButton();
    }
    $(window).resize(function() {
        state.feedSize = $('#happening-feed').width();
        if(state.elementPerRow != Math.floor(state.feedSize/300)){
            state.elementPerRow = Math.floor(state.feedSize/300)>=1 ? Math.floor(state.feedSize/300): 1;
            pagination();
        }
    });

    $(window).click(function(event){
        if(event.target == $('#modal')[0]){
            $('#modal').hide();
        }
    });

    // When the user clicks the button, open the modal 
    $("#modal-button").click(function() {
        $('#modal').show();
    });
    
    // When the user clicks on <span> (x), close the modal
    $("#modal-close").click(function() {
        $('#modal').hide();
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
            var classList = $('#happening-feed').attr("class");
            var classListArray =  classList.split(/\s+/);
            classListArray.forEach(element => {
                if(element == "pop-up"){
                    config["pop-up"] = true;
                }
                else if(element == "wide"){
                    config["wide"] = true;
                }
            });
            console.log(config);
            
            eventFeedHtml = '<div id = "event-feed"></div>';
            $('#happening-feed').append(eventFeedHtml);
            linkToHappening = url.replace("/json", "");
            linkToHappeningHtml = '<div class = "container link-to-happening"><a href = "'+ linkToHappening+ '">View the full page on Happening @ Michigan</a></div>'
            $('#happening-feed').append(linkToHappeningHtml);
            paginationHtml = '<div class = "pagination-container container"><div id="pagination-wrapper"></div></div>';
            $('#happening-feed').append(paginationHtml);
            events = data;
            state.count = events.length;
            state.pageNum = Math.ceil(state.count/state.elements);
            state.feedSize = $('#event-feed').width();
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
        html += '<div class = "event-text">';
        let title = obj.event_title;
        html += '<h3><a href ='+obj.permalink+'>'+title+'</a></h3>';
        let date = obj.date_start;
        if(date){
            html += '<ul><li><i class="fa fa-fw fa-calendar"></i><span> Date: '+date+'</span></li>';
        }
        
        let links = obj.links;
        let location_name = obj.location_name;
        if(location_name)
            html+= '<li><i class="fa fa-location-arrow fa-fw"></i> Location: '+location_name+'</li></ul>';
        for(let i = 0; i < Object.keys(links).length; i++){
            let defaultTitle = (links[i].url.split("://"))[1];
            defaultTitle = (defaultTitle.split('/'))[0];
            let text = links[i].title == null ? defaultTitle: links[i].title;
            link = '<i class="fa fa-link fa-fw"></i><a href = '+links[i].url+'> '+text + '</a><br>'
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