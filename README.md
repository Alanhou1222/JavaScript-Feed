# JavaScript-Feed

A HTML embedded event feed for [Happening @ Michigan](https://events.umich.edu/) coded with JavaScript.


## Features

1. Show all events from an user chosen page in [Happening @ Michigan](https://events.umich.edu/).
2. Title linked to the specific event
3. Date, location, and additional links of events will be shown.
4. Configurable ability to search by keword, date, type, and tag.
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
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Alanhou1222/JavaScript-Feed@3.2.0/feed.css" integrity="sha384-Aeo1hqs4QQNiYueo1pvhB+X16MCDBnQXeO6ljxevDpFRoIQysEeb7dekiw1oiXqJ" crossorigin="anonymous">
<div id= "happening-feed" class = "happening-feed pop-up search" url = "https://events.umich.edu/week/json?v=2"></div>
<script src="https://cdn.jsdelivr.net/gh/Alanhou1222/JavaScript-Feed@3.2.0/feed.js" integrity="sha384-SOD+Iyuo8/7KpAJz14+BNud7sFiL8kHuuhF8TVBvBD6FAFrAi4fDfPWwOFvdJyEs" crossorigin="anonymous"></script>
```
4. Replace the url attribute of ```<div id = "happening-feed">``` with the URL you just copied (default URL is for [New Events This Week](https://events.umich.edu/week)).
5. Paste the whole HTML code to where you want the event feed to be.
6. Defalt setting for configurable abilities are normal view, enable pop-up, and enable search. 
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
If you want to overide CSS properties of the entire feed, override properties of ```#myfeed```.

### Events
#### Event Containers
If you want to overide CSS properties of event containers (border, background, etc.), override properties of ```.event```.
<strong> event amounts in a single row scale with width of the entire feed and cannot be changed through external style sheet.</strong>
#### Images
If you want to overide CSS properties of images (background-size, height, etc.), override properties of ```.event-image```.
#### Text Areas
If you want to overide CSS properties of text areas (padding), override properties of ```.event-text```.

##### Links
If you want to overide CSS properties of links <strong>including title</strong> (color, font-weight, line-height, etc.), override properties of ```.event a```.

##### Titles
If you want to overide CSS properties of titles, override properties of ```.event h3 ```(margin, line-height) or ```.event h3 a``` (font-size).

##### Contents
If you want to overide CSS properties of contents (font-size, line-height), override properties of ```.event li ```.