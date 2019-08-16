# Altizure Javascript 3D SDK 更新日志

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
