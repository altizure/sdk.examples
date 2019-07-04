# Altizure Js SDK 3

- Simulate the Earth with an infinite subdivision surface

- Unified memory and video memory management for the Earth and Altizure models. Avoid application crashes caused by memory and video memory.

- The mathematical model of the Earth strictly complies with the WGS84 standard, meet the requirements of high precision geographic applications.

- The Cartesian coordinate system used is consistent with ECEF, using real world dimensions.

- Improve the earth map texture loading strategy, allowing skipping intermediate level. More basemap related functions will be opened in the future.

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

## How to test the SDK 3 in advance？

Reference

https://beta.altizure.cn/sdk3

or

https://beta.altizure.com/sdk3

in your applicaton.

Most of the interfaces have no change with SDK 2


### The part which different from sdk 2
1. `camera pose` rename， involving
    ```
    sandbox::camera::pose // will be renamed to `sandbox::camera::center`。
    sandbox::camera::flyTo // will be renamed to `sandbox::camera::flyToCenter`。
    ```
    The original interface will be void.

    *Upgrade method*：

    `sandbox::camera::pose` will be replaced with `sandbox::camera::center`

    `sandbox::camera::flyTo` will be replaced with `sandbox::camera::flyToCenter`

2. Renaming of camera pose related content when initializing Sandbox

    `options.camera.poseTo` will be renamed to `options.camera.center`

    `options.camera.flyTo` will be renamed to `options.camera.flyToCenter`

    The original interface will be void.

    *Upgrade method*：

    Before upgrade:

      ``` js
      let options = {
        ...
        camera: {
          poseTo: { // rename `center`
            alt: 50000000,
            ...
          },
          flyToCenter: { // rename `flyToCenterCenter`
            alt: 600,
            ...
          }
        }
      }
      let sandbox = new altizure.Sandbox('page-content', options)
      ```
    
      After upgrade:

      ``` js
      let options = {
        ...
        camera: {
          center: { // rename
            alt: 50000000,
            ...
          },
          flyToCenterCenter: { // rename
            alt: 600,
            ...
          }
        }
      }
      let sandbox = new altizure.Sandbox('page-content', options)
      ```
3. `camera matrix` The following interfaces will be removed from SDK 3, involving 
    ```
    Sandbox::camera::mat
    Sandbox::camera::flyToMat
    Sandbox::camera::matToPose
    ```

    *Upgrade method*：

    The above part about the camera pose matrix (as in Example 5.5) can be converted with matToPose and then replaced with Sandbox::camera::flyToCenter.
    If the above interface is used in your code, the upgrade process can refer to [Upgrade Example](https://github.com/altizure/sdk.examples/tree/master/5-5-camera-mat/v3_upgrade.html) 

4. `sandbox::earthView::camera`

    sandbox::earthView::camera::near

    sandbox::earthView::camera::far

    The scale of the value returned by the above interface changes, and the value returned now is in meters, which is 6378137 times the original value (earth radius).


### Report new issues

    You can submit an issue to https://github.com/altizure/sdk.examples/issues

### Samples to be updated
    Sample 5.6
    Sample 5.8
    Sample 5.13

_______________________________

## Don't want to upgrade? And how to continue using SDK 2?

- The following website links will continue to point to SDK 2

    beta.altizure.cn/sdk

    beta.altizure.com/sdk

- In addition, the following permanent addresses can also be used

    https://beta.altizure.cn/sdk-2.12.13

    https://beta.altizure.cn/sdk-2.12.13


 