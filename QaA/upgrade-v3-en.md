# Languages:

* [**English Version**](./upgrade-v3-en.md)

* [**中文版本**](./upgrade-v3.md)


_______________________________


# Altizure Js SDK 3

- Simulate the Earth with an infinite subdivision surface.

- Unified memory and video memory management for the Earth and Altizure models. Avoid application crashes caused by memory and video memory.

- The mathematical model of the Earth strictly complies with the WGS84 standard, meet the requirements of high precision geographic applications.

- The Cartesian coordinate system used is consistent with ECEF, using real world dimensions.

- Improve the earth map texture loading strategy, allowing skipping intermediate level. More basemap related functions will be opened in the future.

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

    ```
    sandbox::earthView::camera::near
    sandbox::earthView::camera::far
    ```

    The scale of the value returned by the above interface has changed, and the value returned now is in meters, which is 6378137 times the original value (earth radius).


### Report new issues

    You can submit an issue to https://github.com/altizure/sdk.examples/issues

### Examples to be updated
    Example 5.6
    Example 5.8
    Example 5.13

_______________________________

## Don't want to upgrade? And how to continue using SDK 2?

- The following website links will continue to point to SDK 2

    beta.altizure.cn/sdk

    beta.altizure.com/sdk

- In addition, the following permanent addresses can also be used

    https://beta.altizure.cn/sdk-2.12.13

    https://beta.altizure.cn/sdk-2.12.13


 