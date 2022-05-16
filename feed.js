$(function() { // Document ready function
    var url = 'https://events.umich.edu/week/json?v=2' // This is the URL for your JSON feed. In this example it will pull all of todays events.
    
    // Run an ajax call. The documentation is here : http://api.jquery.com/jquery.ajax/
    $.ajax({
        url: url, // Set the URL for the json feed
        success: function(data) { // Run this if there is a successful call
            if(data.length){ // if anything was returned
                for(i in data) { // loop though list of objects
                    if(i%4==0){
                        row = '<div class="eventRow">';
                        $('#myfeed').append(row);
                    }
                    html = buildEvent(data[i]); // build html for object
                    $('.eventRow').last().append(html); // append each object to the <div id="myfeed"></div>
                }
            }
        }
    });

    // create html for object.
    function buildEvent(obj) {
        html = '<div class="event">';
        image = '<img class = "eventImage" src = "'+obj.image_url+'">';
        html += image+'<br>';
        html += '<div class = "eventText">';
        title = obj.combined_title;
        html += '<h3><a href ='+obj.permalink+'>'+title+'</a></h3>';
        date = obj.date_start;
        html += '<ul><li><i class="fa fa-fw fa-calendar"></i><span> Date: '+date+'</span></li>';
        links = obj.links;
        location_name = obj.location_name;
        if(location_name)
            html+= '<li><i class="fa fa-location-arrow fa-fw"></i> Location: '+location_name+'</li></ul>';
        for(let i = 0; i < Object.keys(links).length; i++){
            defaultTitle = (links[i].url.split("://"))[1];
            defaultTitle = (defaultTitle.split('/'))[0];
            text = links[i].title == null ? defaultTitle: links[i].title;
            link = '<i class="fa fa-link fa-fw"></i><a href = '+links[i].url+'> '+text + '</a><br>'
            html+= link;
        }
        html += '</div></div>';

        return html;
    }
});