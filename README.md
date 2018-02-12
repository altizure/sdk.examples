# Overview #

`Altizure Javascript SDK` is a web-based 3D graphics engine. You can use it to integrate your interactive 3D contents from [Altizure](https://www.altizure.com) to your business application.

Please check [altizure.github.io/dev-docs-site](https://altizure.github.io/dev-docs-site/) for more details.

### What is this repository for? ###

Examples for Altizure SDK. Check this page for a list of examples [altizure.github.io/sdk.examples/examples.sdk.html](https://altizure.github.io/sdk.examples/examples.sdk.html)

### How do I get set up? ###

1. git clone
    ```bash
      git clone https://github.com/altizure/sdk.examples.git
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

with your own ke
* Read [Documentation](https://altizure.github.io/dev-docs-site/zh-hans/docs/user_docs/web/).
* Check [FAQ](https://altizure.github.io/dev-docs-site/zh-hans/jssdk-faq.html).
* Learn from [Applications](https://altizure.github.io/dev-docs-site/zh-hans/jssdk-demo.html).

### What are the available versions? ###

Three versions are provided:

* beta: https://beta.altizure.com/sdk
* stable: https://www.altizure.com/sdk
* China: https://www.altizure.cn/sdk

### Bug report and Questions ###

Please write on [issue page](https://github.com/altizure/sdk.examples/issues).

### Changelog ###

* [English](changelog-en.md)
* [中文](changelog-zh-hans.md)


### Who do I talk to? ###

* [Altizure team](mailto:developers@altizure.com)
