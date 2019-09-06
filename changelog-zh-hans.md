# Altizure Javascript 3D SDK 更新日志
### 3.5.2
__发布时间:__
2019年9月6日

__改进:__
+ [范例 3.4](https://altizure.github.io/sdk.examples/3-4-control-config/) 滚轮永远绑定 dolly 操作。鼠标中键拖拽，允许进行操作平移（orbit）, 旋转（swirl）。


### 3.5.1
__发布时间:__
2019年9月5日

__新功能:__
+ [范例 3.4](https://altizure.github.io/sdk.examples/3-4-control-config/) 对于鼠标左/中/右键的功能进行设置更改。

### 3.4.5
__发布时间:__
2019年9月4日

__缺陷修复:__
* 加载部分模型可能导致地球地图消失。
* [范例 6.5，6.6] 将 geojson 范围查询改为本地文件，避免因查询失败导致范例无法演示。
* 部分模型在近距离的白模渲染光照不对。

### 3.4.3
__发布时间:__
2019年8月28日

__新功能:__
+ [范例 8.1](https://altizure.github.io/sdk.examples/8-1-terrain/) 全球地形，初始化 `Sandbox` 时选择 `renderItems::planet::showDem = true` 开启。

+ [範例 8.2](https://altizure.github.io/sdk.examples/8-2-rtk-project/) 导入 Altizure 第三代数据 （version 3），使用 `RTK` 生成的高精度GIS实景模型。

__缺陷修复:__
* `GeoSystem::align` 后，场景没有及时更新导致的 `crop` 位置不准确。
* 当 `tilt = 0`, 鼠标控制可能发生剧烈抖动。

__改进:__
一部分非公开的，但是再范例中使用过的接口，改为了公开接口。
* 2.1 autoScale
```
projectMarker._apiInfo.name -> projectMarker.spec.name
```

* 2.1 project viewer
```
marker._apiInfo.annotations -> marker.spec.render.annotations
```

* 4.5 lnglat to alt
```
let geoInfo = altmarker._apiInfo.geoInfo
maxlat = geoInfo.maxLat
maxlng = geoInfo.maxLong
minlat = geoInfo.minLat
minlng = geoInfo.minLong
```
更改为
```
let geoInfo = altmarker.spec.model.gis
maxlat = geoInfo.maxLat
maxlng = geoInfo.maxLng
minlat = geoInfo.minLat
minlng = geoInfo.minLng
```


### 3.2.1
__发布时间:__
2019年8月16日

__新功能:__
+ [範例 2.16](https://altizure.github.io/sdk.examples/2-16-add-gltf/) 导入 `GLTF/GLB` 模型

__改进:__
+ `Marker::postion`, `scale` 等接口兼容字符串类型
+ 升级地球底图访问速度，最大精度
- 优化减小 SDK js 文件体积

### 3.1.3
__发布时间:__
2019年8月7日

__新功能:__
+ [範例 6.5.1](https://altizure.github.io/sdk.examples/6-5-1-cluster-advanced/index.html) 带权重的 `Marker 聚类`
+ 範例 6.5.1 `Marker 聚类` 增加样式接口

__改进:__
+ 天空增加云特效

### 3.1.1
__发布时间:__
2019年8月2日

__新功能:__
+ 重新加入 `sandbox.camera.range()`
+ `sandbox.control.enabledSwirlLeft`

### 3.0.8
__发布时间:__
2019年7月31日

__缺陷修复:__
* `VideoProjectorMarker` destruct 崩溃问题。
* 可视域分析 sdk3 未能正确加载。

__改进:__
* `VideoProjectorMarker` 加入数据加载判断，当视频加载到可以播放时，才会融合到模型上。

______

[sdk2 更新日志](./changelog-zh-v2.md)
