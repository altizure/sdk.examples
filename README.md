# Overview #

`Altizure Javascript SDK` is a web-based 3D graphics engine. You can use it to integrate your interactive 3D contents from [Altizure](https://www.altizure.com) to your business application.

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
3. visit through browser [http://localhost:8000/examples.sdk.html](http://127.0.0.1:8000/examples.sdk.html)

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

with your own key

* Learn from [Examples](https://altizure.github.io/sdk.examples/examples.sdk.html).
* Read [Documentation](https://altizure.github.io/dev-docs-site/zh-hans/docs/user_docs/web/).
* Check [FAQ](https://altizure.github.io/dev-docs-site/zh-hans/jssdk-faq.html).

### What are the available versions? ###

Three versions are provided:

* beta: https://beta.altizure.cn/sdk
* stable: https://www.altizure.com/sdk
* China: https://www.altizure.cn/sdk

### Bug report, Feature request, and Questions ###

Please create an issue on [issue page](https://github.com/altizure/sdk.examples/issues).

### References ###

* [Altizure Development Platform](https://developers.altizure.com/)
* [Altizure开发平台-快速入门教程](https://www.jianshu.com/p/53e2c72fec0d)
* [altizure.github.io/dev-docs-site](https://altizure.github.io/dev-docs-site/)
* [Browser compatibility 浏览器兼容性](https://altizure.github.io/sdk.examples/compatibility_report.html)

### Contributors ###

* [Altizure team](mailto:developers@altizure.com)
* [Jingbo Liu](https://bitbucket.org/jingbo/)
* Shenlai Gao
* Yasong Guo
* Yihang Qu

### Changelog ###

* [中文](changelog-zh-hans.md)
