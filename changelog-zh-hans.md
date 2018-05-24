# Altizure Sandbox 3D SDK 更新日志

### 0.2.19
__发布时间:__
2018年5月24日

__新功能:__
* Tag 类 Marker 增加 `isSprite` 属性，区分是否总面向镜头。更新 [范例 2.2*](https://altizure.github.io/sdk.examples/2-2-add-tag/index.html)。
* `AltizureProjectMarker` 初始化选项 `autoscale: {number | bool}` 自动缩放CAD类模型。详见文档。
* 根据天际线的区域限高。[范例 6.6](https://altizure.github.io/sdk.examples/6-6-skyline/index.html)
    
    ![效果图](./public/assets/img/examples/6-6-height-limit.png "区域限高")

__改进:__
* 保留主站裁剪效果。
* 加入cdn自动发布流程。
* 集中处理离线渲染。
* 提高quality上限。
* 添加瓦片bbox显示接口 showTileBBox。
* CameraMatrix重构及用例测试。

__缺陷修复:__
* 当有重叠出现，positionsAltitude 返回错误高度。
* GeoSystem 对齐后， Marker::position 未更新。
* CAD模型的材质显示错误。
* Marterial array 导致的 marker::destruct 报错。
* 销毁项目模型时释放裁剪Mask内存。

### 0.2.5
__发布时间:__
2018年4月9日

__新功能:__
* 区域标注 Zone Marker。[范例 2.11](https://altizure.github.io/sdk.examples/2-11-add-zone/index.html)
* 建筑对象化。 [範例 6.4](https://altizure.github.io/sdk.examples/6-4-objectation/index.html)
* 标注聚合。[範例 6.5](https://altizure.github.io/sdk.examples/6-5-marker-cluster/index.html)
* 质量-效率平衡选项 sandbox.quality。
* 高进度投影坐标系 GeoSystem。
* CAD转换
* 交互式可视域分析。[範例5.9](https://altizure.github.io/sdk.examples/5-9-interactive-visibility/index.html)

__改进:__
* threejs 更新至0.91.0
* 提高渲染效率。

__缺陷修复:__
* LightBeam color 接口，接受string类型。


### 0.1.62

__发布时间:__
2018年2月8日

__新功能:__
* Shadow Map 和通视分析。[范例 5.8](https://altizure.github.io/sdk.examples/5-8-visibility-analysis/index.html)

__改进:__
* 提高渲染效率。

__缺陷修复:__
* 修复触碰手势和鼠标点击事件无响应的bug。
