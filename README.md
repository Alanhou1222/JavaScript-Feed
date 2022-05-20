# JavaScript-Feed

A HTML embeded event feed for [Happening @ Michigan](https://events.umich.edu/) coded with JavaScript.

## Usage
1. Find the event page that you want to be fed to the event feed on [Happening @ Michigan](https://events.umich.edu/).
2. Copy the URL of the json file (locates on the bottom of the left side bar) for that page.
3. Open the [feedEmbededVersion.html](https://github.com/Alanhou1222/JavaScript-Feed/blob/main/feedEmbededVersion.html) file from this repo.
4. Replace the url attribute of <div id = "myfeed"> with what you just copied (default URL is for [New Events Today](https://events.umich.edu/day)).
5. Paste the whole HTML code from [feedEmbededVersion.html](https://github.com/Alanhou1222/JavaScript-Feed/blob/main/feedEmbededVersion.html) to where you want the event feed to be.
6. You're all set!

## Example

```html
<script type="text/javascript" src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">        
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Alanhou1222/JavaScript-Feed@latest/feed.css">
<div id="myfeed" url = "https://events.umich.edu/day/json?v=2"></div>
<script src = "https://cdn.jsdelivr.net/gh/Alanhou1222/JavaScript-Feed@latest/feed.js"></script>
```
![Screen Shot](https://drive.google.com/file/d/1fug3j0Pcv7v2CY6lxpHQGoNsjZMJyioQ/view)


