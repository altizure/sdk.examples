# Languages:

* [**English Version**](./upgrade-v3-en.md)

* [**中文版本**](./upgrade-v3.md)


_______________________________


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

5. 接口设计缺陷:

    - 接口 camera.pose 和 marker.pose 语义上重复，但是却表示不相同的意义，接口参数也不同，非常容易导致概念混淆。

    - 接口 camera.mat 迫使用户使用不明含义的空间变换矩阵数组。并且没有将内部数学进行足够封装，导致升级时接口无法兼容。

_______________________________

## 如何提前测试？

引用

https://beta.altizure.cn/sdk3

or

https://beta.altizure.com/sdk3



绝大部分接口与 SDK 2 没有变化

### 与 SDK 2 有变化的部分
1. `camera pose` 更名， 涉及
    ```
    sandbox::camera::pose // 将更名为 `sandbox::camera::center`。
    sandbox::camera::flyTo // 将更名为 `sandbox::camera::flyToCenter`。
    ```
    原有接口作废。

    *升级方法*：

    将`sandbox::camera::pose` 替换为 `sandbox::camera::center`

    `sandbox::camera::flyTo` 替换为 `sandbox::camera::flyToCenter`

2. 初始化 Sandbox 时，camera pose 相关的更名。

    `options.camera.poseTo` 更名为 `options.camera.center`

    `options.camera.flyTo` 更名为 `options.camera.flyToCenter`

    原有接口作废。

    *升级方法*：

    升级前:

      ``` js
      let options = {
        ...
        camera: {
          poseTo: { // 更名 `center`
            alt: 50000000,
            ...
          },
          flyTo: { // 更名 `flyToCenter`
            alt: 600,
            ...
          }
        }
      }
      let sandbox = new altizure.Sandbox('page-content', options)
      ```
    
      升级后:

      ``` js
      let options = {
        ...
        camera: {
          center: { // 更名
            alt: 50000000,
            ...
          },
          flyToCenter: { // 更名
            alt: 600,
            ...
          }
        }
      }
      let sandbox = new altizure.Sandbox('page-content', options)
      ```
3. `camera matrix` 以下接口将从 SDK 3 中移除， 涉及
    ```
    Sandbox::camera::mat
    Sandbox::camera::flyToMat
    Sandbox::camera::matToPose
    ```

    *升级方法*：

    以上涉及相机姿态矩阵 (范例 5.5)，可以先用 matToPose 转化，再使用 Sandbox::camera::flyToCenter 替换。
    如果您的代码中使用了以上接口，升级可参考 [升级范例](https://github.com/altizure/sdk.examples/tree/master/5-5-camera-mat/v3_upgrade.html) 

4. `sandbox::earthView::camera`

    ```
    sandbox::earthView::camera::near
    sandbox::earthView::camera::far
    ```

    以上接口返回数值尺度发生改变，现在返回的数值以米为单位，是原数值的 6378137 倍（地球半径）。


### 相关 issue

+ [`SDK2` 中对齐的 `Polygon` 和实景模型在 `SDK3` 出现偏移](https://bitbucket.org/jingbo/altizure.sdk.examples/issues/20/coordinate-not-corresponding-between-sdk2)

### 报告新的问题

    可以提交 issue 至 https://github.com/altizure/sdk.examples/issues

### 尚未更新至最新版本的范例
    范例 5.6
    范例 5.8
    范例 5.13

_______________________________

## 不想升级？如何继续使用 SDK 2:

- 网站链接都将持续指向 SDK 2

    beta.altizure.cn/sdk

    beta.altizure.com/sdk

- 另外，可以使用以下永久地址

    https://beta.altizure.cn/sdk-2.12.13

    https://beta.altizure.cn/sdk-2.12.13


 
