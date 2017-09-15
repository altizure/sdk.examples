# README #

`altizure.sdk` is a web-based 3D graphics engine. You can use it to customise your interactive 3D contents from [Altizure](https://www.altizure.com).

Please check [docs.altizure.com](https://docs.altizure.com/) for more details.

### What is this repository for? ###

Examples for Altizure SDK. Check this page for a list of examples [altizure.bitbucket.io/examples.sdk.html](https://altizure.bitbucket.io/examples.sdk.html)

### How do I get set up? ###

1. git clone, e.g. bitbucket
    ```bash
      git clone https://altizure@bitbucket.org/altizure/altizure.bitbucket.io.git
    ```
2. setup a server
    ```bash
    python -m SimpleHTTPServer 8000
    ```
3. visit through browswer http://localhost:8000/examples.sdk.html

### How do I start to use? ###

In the example html file (e.g. `./1-1-altizure-earth/index.html`), replace the key in

```js
  let options = {
    altizureApi:{
      // Altizure sdk demo key. Replace it with your own key.
      key: '7MkQf8UggsPaadvrlKALspJWZejZAJOLHn3cnIy'
    }
  }
```

with your own key.

### Who do I talk to? ###

* [Altizure team](mailto:developers@altizure.com)
* [Dr. Jingbo Liu](mailto:jingbo@connect.ust.hk)