# Changelog of Altizure Javascript 3D SDK

### 2.8.8
__Release date:__
2019年4月8日

__New features:__
* The `opacity`, `color`, `image` of the background can be modified dynamically. Example 1.5 has been updated to demo the new features.


### 2.8.7
__Release date:__
2019年4月3日

__New features:__
+ All `PlaneMarker` and inherited classes support `fixedSize` for the non-sprite mode.

__Improvements:__
* Use localStorage to cache common graphql requests, to reduce the waiting time for loading projects.

__Bug fixes:__
* Merged multiple IP location requests.

### 2.8.5
__Release date:__
Mar. 29th, 2019

__New features:__
+ Add example `Project/6.8 Water Edit` Multiple water surface editting.

__Improvements:__
* In the visibility analysis, if the area is visible from more view points, it will be tinted greener.

__Bug fixes:__
* `sandbox.destruct()` may influence the controller of `ObjMarker` in other `Sandbox`。


### 2.8.3
__Release date:__
Mar. 25th, 2019

__New features:__
+ Add example `6.10 Interactive Distance Measure` The distance measure tool under `Analysis`.
+ Real-time video streaming fusion with 3D model. (Hardware solution indluded. Plz contact Altizure Marketing Dept fro details.)

__Improvements:__
* Add a button link to the github code in the lower right corner of example.
* Improve the LOD loading strategy, reduce the CPU consumption.

__Bug fixes:__
* IE11 compability problems.

### 2.7.3
__Release date:__
Mar. 12th, 2019

__New features:__
+ `altizure-plugin-geosystem` Support for establishing a local coordinate system for `ObjMarker`.
+ Add example `5.11 Camera Move Path` The camera move path, can move at a constant speed on the specified path.
+ Add example `7.5 Plugin Shapefile` import `shapefile`. [example 7.5](https://altizure.github.io/sdk.examples/7-5-plugin-shapefile/index.html)
+ Add example `6.9 Floor Distinguish` [example 6.9](https://altizure.github.io/sdk.examples/6-9-floor-distinguish/index.html)

### 2.7.2
__Release date:__
Mar. 10th, 2019

__New features:__
* Add `DemMarker` support to import `wmts` standard terrain data (elevation map and orthophoto map).

### 2.6.1
__Release date:__
Mar. 7th, 2019

__New features:__
* Cropping and video fusion can coexist. Refer to Example 7.3.

### 2.5.10
__Release date:__
Mar. 4th, 2019

__Bug fixes:__
* Fixed a problem that `PlaneMarker` and its inherited classes flash when initialized.
* Fixed a problem that the location of `AltizureProjectMarker` or fence is not accurate.

__New features:__
* Add 6.8 example to create/modify the water surface.

### 2.5.6
__Release date:__
Feb. 22nd, 2019

__Bug fixes:__
* Fixed a problem that `AltizureProjectMarker`'s `focus` angle is inconsistent with the cover design of the website settings.
* Fixed a problem that `AltizureProjectMarker`'s bounding box is inconsistent with the model.

__New features:__
* Add example 2.15: LOD point cloud project display.
* Add `pointSize` interface of point cloud to adjust point size.
* Add example 10.5 Tool-tip.

__Improvements:__
* Reorganize the list of examples based on functionality.

### 2.4.16
__Release date:__
Jan. 24th, 2019

__Improvements:__
* Add `color` interface of `PlaneMarker` (and its inheritance classes include `CanvasTagMarker`, `Tagmarker`, etc.) to change the background color of the image; and the `pinColor` interface to change the color of pointer below the image.

### 2.4.14
__Release date:__
Jan. 24th, 2019

__Bug fixes:__
* Fix `div` containing sandbox After `scroll`, only locally in window, `Marker` mouse interaction event location is not accurate.

### 0.2.24
__Release date:__


### 0.1.62

__Release date:__
Feb. 8th, 2018

__New features:__
* Shadow map and visibility analysis. [Sample 5.8](https://altizure.github.io/sdk.examples/5-8-visibility-analysis/index.html)

__Improvements:__
* Rendering performance

__Bug fixes:__
* Bugs on touch event and mouse click event handle.
