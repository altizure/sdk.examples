# Overview #

`Altizure Javascript SDK` is a web-based 3D graphics engine. You can use it to integrate your interactive 3D contents from [Altizure](https://www.altizure.com) to your business application.

Please check [docs.altizure.com](https://docs.altizure.com/) for more details.

### What is this repository for? ###

Examples for Altizure SDK. Check this page for a list of examples [altizure.github.io/sdk.examples/examples.sdk.html](https://altizure.github.io/sdk.examples/examples.sdk.html)

### How do I get set up? ###

1. git clone
    1. Github
    ```bash
      git clone https://github.com/altizure/sdk.examples.git
    ```
    2. Or, using Bitbucket
    ```bash
      git clone https://altizure@bitbucket.org/altizure/altizure.bitbucket.io.git
    ```
2. setup a server
    ```bash
    python -m SimpleHTTPServer 8000
    ```
3. visit through browser [http://127.0.0.1:8000/examples.sdk.html](http://127.0.0.1:8000/examples.sdk.html)

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

### Bug report and Questions ###

Please write on [issue page](https://github.com/altizure/sdk.examples/issues).

### Who do I talk to? ###

* [Altizure team](mailto:developers@altizure.com)
* [Dr. Jingbo Liu](mailto:jingbo@connect.ust.hk)
