### Requirements

#### Image toolkits

##### On Debian/Ubuntu

```
apt-get install imagemagick
```

##### On OSX

```
brew install imagemagick
```

For other systems see [imagemagick](http://www.imagemagick.org/script/binary-releases.php) download page.

#### Node

You'll need [NodeJS and NPM](http://nodejs.org/download/) and [Volo](https://github.com/volojs/volo#install) installed

### Installation

```
npm install
volo install
```

### Configuration

Create file ```config/default.json``` with following contents (fill with your values):

```
{
  "dirImagesIn": "",
  "dirImagesInThumbnails": "",
  "thumbnailsExt": "",
  "spUrl": "",
  "spSessionId": "",
}
```

### Run

Run 

```
node app.js
```

and then point the browser to ```localhost:8000```. 

Note that you can drag a bookmarklet to your toolbar to save you from typing a photo id.