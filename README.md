# JavaScript-Feed

A HTML embedded event feed for [Happening @ Michigan](https://events.umich.edu/) coded with JavaScript.

## Feature

1. Show all the events from an user chosen page in [Happening @ Michigan](https://events.umich.edu/).
2. Title linked to the specific event, date, location, and additional links of every event will be shown.
3. A link to the user chosen page.

## Usage
1. Find the event page to be fed to the event feed on [Happening @ Michigan](https://events.umich.edu/).
2. Copy the URL of the json file (located on the bottom of the left side bar) for that page.
3. Open the [feedEmbeddedVersion.html](https://github.com/Alanhou1222/JavaScript-Feed/blob/main/feedEmbeddedVersion.html) file from this repo or use the following code.
```html
<meta name="viewport" content="width=device-width, initial-scale=1">
<script type="text/javascript" src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">        
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Alanhou1222/JavaScript-Feed@2.1.0/feed.css" integrity="sha384-q+kQp0wLuhXDFz6K3uZkq9873k0O6POs20xnS36sHNHyLZufGS6v9bSTPdrD4jY1" crossorigin="anonymous">
<div id="myfeed" url = "https://events.umich.edu/day/json?v=2"></div>
<script src="https://cdn.jsdelivr.net/gh/Alanhou1222/JavaScript-Feed@2.1.0/feed.js" integrity="sha384-HE/NiCvGF8D6eKzLlPLA1PP3tFP1dIzNMdZXA4bM3QXaFYr8SV4JSjOcdYT36vuT" crossorigin="anonymous"></script>
```
4. Replace the url attribute of \<div id = "myfeed"\> with the URL you just copied (default URL is for [New Events Today](https://events.umich.edu/day)).
5. Paste the whole HTML code to where you want the event feed to be.
6. You're all set!

## Example

```html
<!-- "New Events Today" for May 25, 2022 -->
<meta name="viewport" content="width=device-width, initial-scale=1">
<script type="text/javascript" src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">        
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Alanhou1222/JavaScript-Feed@2.1.0/feed.css" integrity="sha384-q+kQp0wLuhXDFz6K3uZkq9873k0O6POs20xnS36sHNHyLZufGS6v9bSTPdrD4jY1" crossorigin="anonymous">
<div id="myfeed" url = "https://events.umich.edu/day/json?v=2"></div>
<script src="https://cdn.jsdelivr.net/gh/Alanhou1222/JavaScript-Feed@2.1.0/feed.js" integrity="sha384-HE/NiCvGF8D6eKzLlPLA1PP3tFP1dIzNMdZXA4bM3QXaFYr8SV4JSjOcdYT36vuT" crossorigin="anonymous"></script>
```
![Screen Shot](/images/event-feed-example.png)


