$(function() { // Document ready function
    var url = $('#happening-feed').attr('url'); // This is the URL for your JSON feed.
    loaderHtml = '<div class = "loader-container center-container"><div class="loader"></div></div>';
    $('#happening-feed').append(loaderHtml);
    //pagination and modal
    var state = {
        'page':1,
        'elements': 7,
        'count': 0,
        'pageNum': 0,
        'window': 5,
        'feedSize': 0,
        'elementPerRow': 1,
        'currentEvent': 1,
    }

    //configuration
    var config = {
        'pop-up': false,
        'wide': false,
        'search': false,
    }

    //params
    var params = {
        'elementWidth': 300,
        'wide': "",
    }

    //copy of events data
    var events;
    var showEvents;

    //placeholder
    var placeholder = {
        'image_url': "https://events.umich.edu/images/default-events-module.png",
        'permalink': "https://events.umich.edu/",
        'event_title': "See whats Happening @ Michigan",
        'date_start': "",
        'location_name': "",
        'links': "",
    }

    // Run an ajax call. The documentation is here : http://api.jquery.com/jquery.ajax/
    $.ajax({
        url: url, // Set the URL for the json feed
        success: function(data) { // Run this if there is a successful call
            $('#happening-feed').empty();
            var classList = $('#happening-feed').attr("class");
            var classListArray =  classList.split(/\s+/);
            classListArray.forEach(element => {
                if(element == "pop-up") config["pop-up"] = true;
                else if(element == "wide"){
                    config["wide"] = true;
                    params['wide'] = "-wide";
                    params["elementWidth"] = 480;
                }
                else if(element == "search"){
                    config['search'] = true;
                }
            });
            if(config['search']){
                searchHtml = '<div class = "feed-search center-container"><div class = "search-content"><h4>Search Events</h4>'
                searchHtml += '<input id= "feed-input" class = "feed-input" type="text" placeholder="Search.."></input></div></div>';
                $('#happening-feed').append(searchHtml);
                $("#feed-input").on("keyup", function() {
                    search();
                    pagination();
                });
            }
            eventFeedHtml = '<div id = "event-feed"></div>';
            $('#happening-feed').append(eventFeedHtml);
            linkToHappening = url.replace("/json", "");
            linkToHappeningHtml = '<div class = "center-container link-to-happening"><a href = "'+ linkToHappening+ '">View the full page on Happening @ Michigan</a></div>'
            $('#happening-feed').append(linkToHappeningHtml);
            paginationHtml = '<div class = "center-container"><div id="pagination-wrapper"></div></div>';
            $('#happening-feed').append(paginationHtml);
            if(config['pop-up']){
                modalHtml = '<div id="modal" class="modal"><div class="modal-content"><div id = "modal-header" class="modal-header"><span id = "modal-close" class="close">&times;</span></div><div id = "modal-body" class="modal-body modal-row"></div></div></div>';
                $('#happening-feed').append(modalHtml);
                // When the user clicks on <span> (x), close the modal
                $('#modal-close').on('click', function(){
                    $('#modal').hide();
                });
            }
            events = data;
            showEvents = events;
            state.feedSize = $('#event-feed').width();
            state.elementPerRow = Math.floor(state.feedSize/params["elementWidth"])>=1 ? Math.floor(state.feedSize/params["elementWidth"]): 1;
            pagination();
        }
    });


    function pagination(){
        state.count = showEvents.length;
        state.pageNum = (Math.ceil(state.count/state.elements) == 0) ? 1:Math.ceil(state.count/state.elements);
        $('#event-feed').empty();
        let trimStart = (state.page - 1) * state.elements;
        let trimEnd = (trimStart + state.elements < state.count) ? trimStart + state.elements: state.count;
        for(let i = trimStart; i <= trimEnd; i++) { // loop though list of objects
            if((i-trimStart)%state.elementPerRow==0){
                row = '<div class="event-row center-container">';
                $('#event-feed').append(row);
            }
            if(i == trimEnd){
                html = buildEvent(placeholder,-1);
            }
            else{
                html = buildEvent(showEvents[i],i); // build html for object
            }
            $('.event-row').last().append(html); // append each object to the <div id="happening-feed"></div>
        }
        if(state.count == 0){
            html = "<h3>No events found. Please modify your search and try again</h3>";
            $('.event-row').last().append(html);
        }
        $(".modal-button").click(function() {
            $('#modal').show();
            state['currentEvent'] = $(this).val();
            buildModal(showEvents[state['currentEvent']]);
        });
        pageButton();
    }

    $(window).resize(function() {
        state.feedSize = $('#happening-feed').width();
        if(state.elementPerRow != Math.floor(state.feedSize/params["elementWidth"])){
            state.elementPerRow = Math.floor(state.feedSize/params["elementWidth"])>=1 ? Math.floor(state.feedSize/params["elementWidth"]): 1;
            pagination();
        }
        buildModal(showEvents[state['currentEvent']]);
    });

    $(window).click(function(event){
        if(event.target == $('#modal')[0]){
            $('#modal').hide();
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
    
    // create html for object.
    function buildEvent(obj,count) {
        let html = '<div class="event'+params['wide']+'" style="flex:0 0 '+(100/state.elementPerRow)+'%">';
        let image_url = (obj.image_url) ? obj.image_url: "https://events.umich.edu/images/default190@2x.png";
        let image = '<a class = "image-link" href ='+obj.permalink+'><div class = "event-image'+params['wide']+'" style="background-image: url('+image_url+')"></div></a>';
        html += image;
        html += '<div class = "event-text'+params['wide']+'">';
        let title = obj.event_title;
        html += '<h3><a href ='+obj.permalink+'>'+title+'</a></h3>';
        let date = obj.date_start;
        if(date){
            html += '<ul><li><i class="fa fa-fw fa-calendar"></i><span> Date: '+date+'</span></li>';
        }
        
        let links = obj.links;
        let location_name = obj.location_name;
        if(location_name) 
            html+= '<li><i class="fa fa-location-arrow fa-fw"></i><span> Location: '+location_name+'</span></li></ul>';
        for(let i = 0; i < Object.keys(links).length; i++){
            let defaultTitle = (links[i].url.split("://"))[1];
            defaultTitle = (defaultTitle.split('/'))[0];
            let text = links[i].title == null ? defaultTitle: links[i].title;
            link = '<i class="fa fa-link fa-fw maize"></i><a href = '+links[i].url+'> '+text + '</a><br>'
            if(i % 2 == 0){
                html += '<div class = center-container>';
            }
            html+= '<div class = "link-container">'+link+'</div>';
            if(i % 2 != 0 || i == Object.keys(links).length-1){
                html += '</div>';
            }
        }
        html += '</div>';
        // When the user clicks the buttons, open the modal 
        if(config["pop-up"]&&count != -1) html += '<button value = "'+count+'" class = "modal-button">Read More</button>';
        html += '</div>';
        return html;
    }

    function buildModal(obj){
        $('#modal-header h2, #modal-header h4').remove();
        $('#modal-body').empty();
        $('#modal-event-link').remove();
        titles = '<h2>'+obj.event_title+'</h2>';
        if(obj.event_subtitle != "") titles += '<h4>'+obj.event_subtitle+'</h4>';
        $('#modal-header').append(titles);
        html = '<div class = "modal-side">';
        let image_url = (obj.image_url) ? obj.image_url: "https://events.umich.edu/images/default190@2x.png";
        html += '<div class = "modal-image" style="background-image: url('+image_url+')"></div>';
        if($( window ).width() > 800) html += buildModalLinks(obj);
        html += '</div>';
        html += '<div class = "modal-main"><div class= "modal-text">';
        html += obj.description;
        html += '</div><hr><ul><li><i class="fa fa-fw fa-calendar"></i>';
        html += '<span> '+obj.date_start+'</span></li>';
        if(obj.location_name) html += '<li><i class="fa fa-location-arrow fa-fw"></i><span> Location: '+obj.location_name+'</span></li>';
        html += '</ul></div>';
        if($( window ).width() <= 800) html += buildModalLinks(obj);
        $('#modal-body').append(html);
        $('#modal-body').after('<a id = "modal-event-link" href ='+obj.permalink+'>View on Happening @ Michigan'+'</a>');
    }

    function buildModalLinks(obj){
        let links = obj.links;
        linkHtml = "";
        if(Object.keys(links).length > 0){
            linkHtml += '<div class = "small-title">related link</div>';
            for(let i = 0; i < Object.keys(links).length; i++){
                let defaultTitle = (links[i].url.split("://"))[1];
                defaultTitle = (defaultTitle.split('/'))[0];
                let text = links[i].title == null ? defaultTitle: links[i].title;
                link = '<i class="fa fa-link fa-fw blue"></i><a class = "modal-link" href = '+links[i].url+'> '+text + '</a><br>'
                linkHtml+= link;
            }
        }
        return linkHtml;
    }

    function search(){
        let value = $("#feed-input").val().toLowerCase();
        let eventSet = new Set();
        let count = 0;
        showEvents = events.filter(obj => obj.event_type.toLowerCase().includes(value));
        for(let i = count; i < showEvents.length; i++) eventSet.add(showEvents[i].id);
        count = showEvents.length;
        showEvents = showEvents.concat(events.filter(obj => obj.tags.find(element => element.toLowerCase().includes(value))&& !eventSet.has(obj.id)));
        for(let i = count; i < showEvents.length; i++) eventSet.add(showEvents[i].id);
        count = showEvents.length;
        showEvents = showEvents.concat(events.filter(obj => (obj.event_title.toLowerCase().includes(value)|| obj.building_name.toLowerCase().includes(value) || obj.description.toLowerCase().includes(value)) && !eventSet.has(obj.id)));
        state['page'] = 1;
    }
});