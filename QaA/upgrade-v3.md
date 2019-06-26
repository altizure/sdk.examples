# Altizure Js SDK 3

- 使用无限细分曲面逼近地球。

- 对于地球、实景模型进行统一内存、显存管理。避免因为内存、显存引起的应用崩溃。

- 地球的数学模型严格遵从 WGS84 标准，满足高精度地理应用。

- 笛卡尔坐标系和 ECEF 一致，使用真实世界尺寸。

- 提升地球地图纹理加载策略，允许跳过中间层级加载。未来会开放更多底图相关功能。

_______________________________

## SDK 3 解决的问题:

1. 使用多面体近似地球引起的：

    - 靠近地球时，某些地面不平

    - 在瓦片接缝处拾取坐标精度不足

    - 大面积模型边缘翘起

    - 瓦片接缝处模型无法拼合

    - tilt无法设置稳定限制，可能会翻到地面以下


2. 非 ecef 坐标系引起的数学问题：

    - 无法做数学上精确的 ecef, enu 等欧式坐标系到投影坐标系的转换

    - camera 无法做 姿态 wgs4 差值

    - 由matrix 差值的飞行，有时会反直觉的突然反转

    - 理论上，ecef ／ enu 准确的模型无法对齐

    - 无法做 geodetic 的一些操作， 比如曲面上的curve。

    - sdk layer 不得不经常调用引擎层数学，以获得真实世界尺寸，坐标系等等。

3. 内存管理引起的：

    - 地球无法在runtime 切换隐藏／销毁

    - 地球的lod计算依赖多面体，为了加速不能单瓦片计算，所以不能复用lod算法，也不能统一管理内存

4. 材质：

    - 无法预先使用 lod 祖先纹理，待自己纹理下载完成再进行更新。

    - 如果纹理没有下载，瓦片也不加载，球面不会细分，导致网速慢的时候，多面体问题更严重。

    - 纹理是绑定瓦片的，地球无法runtime切换纹理。

    - 无法组合不同类型纹理。

_______________________________

## 如何提前测试？

引用 https://unpkg.com/altizure@beta/release/altizure-sdk.min.js

绝大部分接口与 sdk2 没有变化

### 与 SDK2 有变化的部分

1. `camera matrix`
    ```
    Sandbox::camera::mat
    Sandbox::camera::flyToMat
    Sandbox::camera::flyToCamToEarth
    Sandbox::camera::matToPose
    ```

    ~ 升级方法 ~：

    以上涉及相机姿态矩阵 (范例 5.5)，可以先用 matToPose 转化，再使用 Sandbox::camera::flyTo 替换。
    如果您的代码中使用了以上接口，升级可参考 [升级范例](https://github.com/altizure/sdk.examples/tree/master/5-5-camera-mat/v3_upgrade.html) 

2. `camToEarth` 的值不同于以前

    如范例5.6 CameraMarker 类的初始化矩阵 camToEarth，范例5.8可视分析，范例7.3视频融合
    
    ~ 升级方法 ~：

    使用 sdk3，重新获取 camera.mat 值，或重新调整 matrix 值。

3. `sandbox::earthView::camera`

    sandbox::earthView::camera::near

    sandbox::earthView::camera::far

    以上接口返回数值尺度发生改变，现在返回的数值以米为单位，是原数值的 6378137 倍（地球半径）。


### 报告新的问题

    可以提交 issue 至 https://github.com/altizure/sdk.examples/issues

_______________________________

## 不想升级？如何继续使用 sdk2:

- 网站链接都将持续指向 sdk2

    beta.altizure.cn/sdk

    beta.altizure.com/sdk

- 另外，可以使用以下永久地址

    https://beta.altizure.com/sdk-2.12.6 

    https://beta.altizure.cn/sdk-2.12.6 


 