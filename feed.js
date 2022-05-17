$(function() { // Document ready function
    var url = 'https://events.umich.edu/list/json?filter=all&range=2022-05-16to2022-05-18&v=2' // This is the URL for your JSON feed. In this example it will pull all of todays events.
    
    //pagination
    var state = {
        'page':1,
        'elements': 8,
        'count': 0,
        'pageNum': 0
    }
    
    //copy of events data
    var events;

    function pagination(page){
        let trimStart = (page - 1) * state.elements;
        let trimEnd = trimStart + state.elements;
        let trimmedData = events.slice(trimStart, trimEnd);
        for(i in trimmedData) { // loop though list of objects
            if(i%4==0){
                row = '<div class="eventRow container">';
                $('#myfeed').append(row);
            }
            let html = buildEvent(trimmedData[i]); // build html for object
            $('.eventRow').last().append(html); // append each object to the <div id="myfeed"></div>
        }
    }

    function pageButton(pages){
        $('#pagination-wrapper').empty();
        let html = '';
        for(let page = 1; page <= pages; page++){
            html += '<button value = '+page+' class = page-button>'+page+'</button>';
        }
        $('#pagination-wrapper').append(html);
        $('.page-button').on('click', function(){
            $('#myfeed').empty();
            state.page = $(this).val();
            pagination(state.page);
        })
        
    }
    // Run an ajax call. The documentation is here : http://api.jquery.com/jquery.ajax/
    $.ajax({
        url: url, // Set the URL for the json feed
        success: function(data) { // Run this if there is a successful call
            events = data;
            state.count = events.length;
            state.pageNum = Math.ceil(state.count/state.elements);
            if(events.length){ // if anything was returned
                pagination(state.page);
            }
            pageButton(state.pageNum);
        }
    });
    
    // create html for object.
    function buildEvent(obj) {
        let html = '<div class="event">';
        let image = '<img class = "event-image" src = "'+obj.image_url+'">';
        html += image+'<br>';
        html += '<div class = "eventText">';
        let title = obj.event_title;
        html += '<h3><a href ='+obj.permalink+'>'+title+'</a></h3>';
        let subtitle = obj.event_subtitle;
        html += '<i class = "subtitle">'+subtitle+'</i>';
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