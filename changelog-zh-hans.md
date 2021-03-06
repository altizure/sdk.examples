# Altizure Javascript 3D SDK 更新日志

### 3.7.1
__发布时间:__
2019年11月29日

__改进:__
+ 支持带文件夹路径的瓦片数据。

__缺陷修复:__
* crop 部分模型区域错误问题。
* pickDepthMap 在部分模型未返回正确高度。
* [范例 5.13](https://altizure.github.io/sdk.examples/5-13-photo-fusion/) 初始化视角问题。

### 3.6.10
__发布时间:__
2019年11月7日

__改进:__
+ [范例 2.16] glTF Marker 支持 gammaOutput (是否开启颜色修正)。

__缺陷修复:__
+ （生产端修正瓦片边缝）瓦片加载支持修正后的数据格式。

### 3.6.10
__发布时间:__
2019年10月23日

__缺陷修复:__
+ 聚类 Web worker 在部分老版本浏览器报错。


### 3.6.7
__发布时间:__
2019年10月17日

__改进:__
+ 鼠标操作设置，增加单个操作对应多个按键。

### 3.6.5
__发布时间:__
2019年10月14日

__新功能:__
+ 照片投影。

### 3.6.3
__发布时间:__
2019年9月20日

__新功能:__
+ `RenderItems.PlanetItems::showGroundCloud {boolean}` 是否显示云层（大气层外视角）

### 3.6.2
__发布时间:__
2019年9月13日

__新功能:__
+ [範例 Sandbox::8.2](https://altizure.github.io/sdk.examples/8-2-custom-terrain/) 自定义高程数据来源(EPSG 900913)，目前支持`terrain-rgb`格式。

__改进:__
+ [范例 Sandbox::8.1](https://altizure.github.io/sdk.examples/8-1-terrain/) 用户注意不到地形变化，增加贴近飞行动画。

### 3.6.1
__发布时间:__
2019年9月11日

__新功能:__
+ [范例 Position::4.8](https://altizure.github.io/sdk.examples/4-8-ray-cast/) 计算射线与模型交点。
+ [范例 5.13.1](https://altizure.github.io/sdk.examples/5-13-1-photo-search/) 返回附近的照片。

__改进:__
+ [范例 6.5, 6.5.1](https://altizure.github.io/sdk.examples/6-5-marker-cluster/) 支持多组标签聚类。

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
