# Altizure Sandbox 3D SDK 更新日志

### 2.3.2
__发布时间:__
2018年11月29日

__改进:__
* 厘清 `PolyFenceMarker` 中 `texture`, `alphaMap`, `color` 这三个的逻辑关系 (altizure issue #230)`。texture` 为彩色纹理，`alphaMap` 为透明掩码，`color` 为底色。 `範例2.4`更新。

__新功能:__
+ `PlanarPatchMarker` 多边形面片标注。每个面片的边界点存在于同一平面，面片边界不应自交。面片可以有任意倾斜角度。
+ `範例 2.13` 测量任意倾斜角度（包括立面）多边形的`周长`与`面积`。

+ `VideoProjectorMarker` 视频投影标注。类似于 `CameraMarker` ，并携带一个视频文件，并将视频文件投影到实景模型上。
+ `範例 7.3` video fusion 视频融合。可以将一段视频作为 LOD 实景模型的动态纹理。

___

### 2.2.3
__发布时间:__
2018年11月27日

__缺陷修复:__
* 修复 CanvasTagMarker 高度尺寸无效。

___


### 2.2.2
__发布时间:__
2018年11月26日

__改进:__
* 增加了`PolyFenceLineMarker`的透明通道 alphaChannel, 範例2.4更新。

__新功能:__
+ LightBeamMarker 範例2.10 更新。

___

### 2.2.1
__发布时间:__
2018年11月23日

__新功能:__
+ LightBeamMarker 增加 opacity 和交互事件。（altizure issue #228）

___

### 2.1.2
__发布时间:__
2018年11月22日

__缺陷修复:__

* 拉近相机时，有些项目会变模糊。（engine issue #55）

___


### 2.1.1
__发布时间:__
2018年11月21日

__範例改动:__

* 【範例2.1.1】 项目不会默认导入Altizure网站上的裁剪结果。在marker initialize完成后，可以使用marker.loadCropMask()来导入。
* 【範例4.5】 在部分IOS设备，高度alt 的获得延迟较高，可以加入一些时间间隔来等待高度的更新。
* 【範例5.8， 5.9】 可视域分析进行了优化，加入不可视部分以红色表示，去掉了与该分析无关的 color, intensity, penumbra, decay 参数，并大幅提高了fps。使用方法也小幅度调整，请参考範例。


___


### 0.2.24
__发布时间:__
2018年6月20日

__新功能:__
* 新版的`sandbox.camera.lookAt`，可以调整camera使得marker在视野中心。增加了[範例5.10](https://altizure.github.io/sdk.examples/5-10-camera-lookat/)。

__改进:__
* 优化了`PolyFenceLineMarker`的贴图逻辑，避免贴图错误。

__缺陷修复:__

* 修复了IE11对 `Math.log2` 未定义的报错。

___

### 0.2.22
__发布时间:__
2018年6月11日

__新功能:__
* `PolyLineMarker` 增加了动画，以及可选的纹理。可以通过调整`marker.style{animation, textture}`设置不同效果。 [範例2.4](https://altizure.github.io/sdk.examples/2-4-add-polyline/)
    ```
    /**
      * set the style of the fence
      * @public
      * @param {object} _style
      * @memberof PolyFenceLineMarker
      * @example <caption> Set the style </caption>
      *  polyFenceLineMarker.style = {
      *    texture: 'fence', // 'fence', 'arrow' or an image file url
      *    color: 0xffffff,
      *    animation: 'horizontal', // or 'verticle', 'none'. default 'hortizontal'
      *    opacity: 1.0
      *  }
      */
      set style (_style){}
    ```
* 根据选取的(不少于)三个点作为水平面，调整marker的的向上方向，`Marker::orientationByHorizontalPoints`
    ``` 
    /**
      * get the realigned orientation from horizontal points
      * @param {LngLatAlt[]} pts 
      * @param {bool} flip
      * @public
      * @returns {Quaternion}
      * @memberof Marker
      */
      orientationByHorizontalPoints (pts, flip = false)
    ```
* 高速测量平面面积，在不需要体积测量时使用 `GeometryUtils::areaByLngLatAlts`
    ```
    /**
      * @param {LngLatAlt[] | PolygonBaseMarker} pts - boundary points
      * @returns {Number} - squared meters
      */
      function areaByLngLatAlts (pts) {}
    ```
* 判断一个点（投影到地表后）是否在polygon范围内 `GeometryUtils::checkPtsInPoly`
    ```
    /**
      * @param {LngLatAlts} pts
      * @param {LngLatAlts} poly - conter clock wise boundary
      * @returns { bool[] } - whether the points are in the poly
      */
      function checkPtsInPoly (pts, poly) {}
    ```

__改进:__
* 增加autoScale範例 [范例 2.1.2](https://altizure.github.io/sdk.examples/2-1-add-project-autoScale/index.html)

__缺陷修复:__

___

### 0.2.20
__发布时间:__
2018年5月24日

__新功能:__
* Tag 类 Marker 增加 `isSprite` 属性，区分是否总面向镜头。更新 [范例 2.2*](https://altizure.github.io/sdk.examples/2-2-add-tag/index.html)。
* Tag 类增加 `pivot` -- 面向镜头时的旋转中心，详见[文档](http://docs.altizure.cn/zh-hans/docs/user_docs/web/TagMarker.html#pivot)。
* `AltizureProjectMarker` 初始化选项 `autoscale: {number | bool}` 自动缩放CAD类模型。[范例 2.1.2](https://altizure.github.io/sdk.examples/2-1-add-project-autoScale/index.html)
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

___

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

___

### 0.1.62

__发布时间:__
2018年2月8日

__新功能:__
* Shadow Map 和通视分析。[范例 5.8](https://altizure.github.io/sdk.examples/5-8-visibility-analysis/index.html)

__改进:__
* 提高渲染效率。

__缺陷修复:__
* 修复触碰手势和鼠标点击事件无响应的bug。
