# JavaScript-Feed

A HTML embedded event feed for [Happening @ Michigan](https://events.umich.edu/) coded with JavaScript.


## Features

1. Show all events from an user chosen page in [Happening @ Michigan](https://events.umich.edu/).
2. Titles link to the page of a specific event when the pop-ups are disabled or trigger pop-ups otherwise.
3. Date, location, and additional links of events will be shown.
4. Configurable ability to search by keyword, date, type, and tag.
5. Configurable ability to click an event and get a pop-up of more detail before going off to Happening.
6. Configurable ability to have a different view that every event is wider.
7. A link to the user chosen page.

## Usage
1. Find the event page to be fed to the event feed on [Happening @ Michigan](https://events.umich.edu/).
2. Copy the URL of the json file (located on the bottom of the left side bar) for that page.
3. Open the [feedEmbeddedVersion.html](https://github.com/Alanhou1222/JavaScript-Feed/blob/main/feedEmbeddedVersion.html) file from this repo or use the following code.
```html
<meta name="viewport" content="width=device-width, initial-scale=1">
<script type="text/javascript" src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">    
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap-grid.min.css"/>    
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Alanhou1222/JavaScript-Feed@3.3.2/feed.css" integrity="sha384-n6sIbikRD+6xHnlwS8FN2PN3i0Jhym1Rq0OPGXUP1HVWsseoplDT0h6LUgKSUQJR" crossorigin="anonymous">
<div id= "happening-feed" class = "happening-feed pop-up search" url = "https://events.umich.edu/week/json?v=2"></div>
<script src="https://cdn.jsdelivr.net/gh/Alanhou1222/JavaScript-Feed@3.3.2/feed.js" integrity="sha384-VoaFh4MBaleIiYr6CvluZ1HZ436lfSrK4Gdq2KpWmn277QW6M9H4lC0U+2nKHFjh" crossorigin="anonymous"></script>
```
4. Replace the url attribute of ```<div id = "happening-feed">``` with the URL you just copied (default URL is for [New Events This Week](https://events.umich.edu/week)).
5. Paste the whole HTML code to where you want the event feed to be.
6. Defalt setting for configurable abilities are normal view, pop-up enabled, and search enabled. 
7. To set the feed to wider view, add "wide" to class list of  ```<div id = "happening-feed">```. 
8. To disable pop-up, remove "pop-up" from class list of  ```<div id = "happening-feed">```
9. To disable search , remove "search" from class list of  ```<div id = "happening-feed">```
10. You're all set!

## Example

```html
<!-- "New Events This Week" for June 21, 2022 with default setting -->
<meta name="viewport" content="width=device-width, initial-scale=1">
<script type="text/javascript" src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">    
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap-grid.min.css"/>    
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Alanhou1222/JavaScript-Feed@3.2.0/feed.css" integrity="sha384-Aeo1hqs4QQNiYueo1pvhB+X16MCDBnQXeO6ljxevDpFRoIQysEeb7dekiw1oiXqJ" crossorigin="anonymous">
<div id= "happening-feed" class = "happening-feed pop-up search" url = "https://events.umich.edu/week/json?v=2"></div>
<script src="https://cdn.jsdelivr.net/gh/Alanhou1222/JavaScript-Feed@3.2.0/feed.js" integrity="sha384-SOD+Iyuo8/7KpAJz14+BNud7sFiL8kHuuhF8TVBvBD6FAFrAi4fDfPWwOFvdJyEs" crossorigin="anonymous"></script>
```
![Screen Shot](/images/event-feed-example.png)

## CSS Customization

If you want to override the default CSS, add another external style sheet reference before ```<div id="myfeed" url = "https://events.umich.edu/day/json?v=2"></div>``` of the embeded html and see the following insrtuctions or refer to the [default style sheet](https://github.com/Alanhou1222/JavaScript-Feed/blob/main/feed.css).

### Entire Feed
The default width of the entire feed is 100% of the container the embeded code is placed.
If you want to overide CSS properties of the entire feed, override properties of ```.happening-feed```.

#### Links
If you want to overide CSS properties(color, font-weight, line-height, etc.) of links, override properties of ```.happening-feed a```.

#### Loader
If you want to overide CSS properties(border, border-top, etc.) of the loader, override properties of ```.loader```.

### Events
#### Event Containers
If you want to overide CSS properties(border, background, etc.) of event containers , override properties of ```.event``` or ```.event-wide``` for wide version.
<strong> event amounts in a single row scale with width of the entire feed and cannot be changed through external style sheet.</strong>

#### Images
If you want to overide CSS properties(background-size, height, etc.) of images , override properties of ```.event-image```or ```.event-image-wide``` for wide version.

#### Text Areas
If you want to overide CSS properties(padding, etc.) of text areas, override properties of ```.event-text``` or ```.event-text-wide``` for wide version.

##### Titles
If you want to overide CSS properties of titles, override properties of ```.event h3, .event-wide h3 ```(margin, line-height, etc.) or ```.event h3 a, .event-wide h3 a``` (font-size, etc.).

##### Contents
If you want to overide CSS properties(font-size, line-height, etc.) of contents(dates and locations), override properties of ```.event li, .event-wide li```

#### Pop-up button
If you want to overide CSS properties of buttons that trigger pop-ups, override properties of ```.event-modal-button```.

#### Link to Happening @ Michigan
If you want to overide CSS properties of link to Happening @ Michigan, override properties of ```.link-to-happening ```(border, background, padding, etc.) or ```.link-to-happening a``` (font-size, etc.).

### Pagination
#### Page Buttons
If you want to overide CSS properties(padding, border-radius, font-size, etc.) of page buttons, override properties of ```.page-button```.

#### Current Page
If you want to overide CSS properties(background-color, etc.) of current page button, override properties of ```.current-page```.

### Pop-up
#### Pop-up container
If you want to overide CSS properties(background-color, animation-duration, etc.) of the pop-up container, override properties of ```.feed-modal```.

#### Pop-up Content
If you want to overide CSS properties(background-color, width, height, etc.) of the pop-up content area, override properties of ```.feed-modal-content```.

##### Links
If you want to overide CSS properties(color, etc.) of links in the pop-up, override properties of ```.feed-modal-content a```.

##### Pop-up Header
If you want to overide CSS properties of the pop-up header (color, background-color, etc.), override properties of ```.feed-modal-header```.

###### Pop-up Close Button
If you want to overide CSS properties(color, font-size, etc.) of the pop-up close button, override properties of ```.feed-modal-close```.

##### Pop-up Body
If you want to overide CSS properties of the pop-up body, override properties of ```.feed-modal-body```.

##### Pop-up Main Area
If you want to overide CSS properties of the pop-up main area, override properties of ```.feed-modal-main```.

###### Text
If you want to overide CSS properties(color, etc.) of the pop-up text, override properties of ```.feed-modal-text```.

###### Additional Information
If you want to overide CSS properties(border, padding, border-radius, etc.) of additional information(dates, times, and locations), override properties of ```.feed-modal ul```.

###### Link to Event Page
If you want to overide CSS properties(font-size, float, etc.) of the link to event page, override properties of ```#feed-modal-event-link```.

##### Pop-up Side Area
If you want to overide CSS properties of the pop-up side area, override properties of ```.feed-modal-side```.

###### Image
If you want to overide CSS properties(background-size, min-height, etc.) of the pop-up image, override properties of ```.feed-modal-image```.

###### Related Links(Title)
If you want to overide CSS properties(font-weight, padding, etc.) of the title of related links, override properties of ```.small-title```.

###### Related Links
If you want to overide CSS properties(font-size, etc.) of related links, override properties of ```.feed-modal-link```.

### Search
#### Search Container
If you want to overide CSS properties(background-image, height, etc.) of the search bar container, override properties of ```.feed-search```.

#### Search Content Area
If you want to overide CSS properties(min-height, padding, background, etc.) of the search content area, override properties of ```.search-content```.

##### Search Title
If you want to overide CSS properties(font-size, line-height, etc.) of the search title, override properties of ```.search-content h3```.

##### Search Links
If you want to overide CSS properties(color, etc.) of search links, override properties of ```.search-content a```.

##### Search Input
If you want to overide CSS properties(height, width, border-radius, etc.) of the search input, override properties of ```.search-input```.

##### Advance Search Toggle Container
If you want to overide CSS properties(margin-top, etc.) of the advance search toggle container, override properties of ```.advance-search-toggle-container```.

##### Advance Search Container
If you want to overide CSS properties(background-color, etc.) of the advance search container, override properties of ```.advance-search```.

###### Date Search Input
If you want to overide CSS properties(width, height, etc.) of date search inputs, override properties of ```.search-date```.

###### Types/Tags Search Container
If you want to overide CSS properties(padding-top, etc.) of types/tags search containers, override properties of ```.search-container```.

###### Search Checkbox Container
If you want to overide CSS properties(height, border, padding, etc.) of search checkboxes containers, override properties of ```.search-checkbox-container```.

###### Tag Search Input
If you want to overide CSS properties(height, border, etc.) of tag search input, override properties of ```.tag-search-input```.

###### Advance Search Button Container
If you want to overide CSS properties(padding, etc.) of advance search button container, override properties of ```.advance-search-button-container```.

###### Submit Button
If you want to overide CSS properties(background-color, border, padding, etc.) of advance search submit button, override properties of ```.advance-search-submit```.

###### Clear Button
If you want to overide CSS properties(background-color, border, color, etc.) of advance search clear button, override properties of ```.advance-search-clear```.
