升级到 Altizure Js SDK 3

废除接口：
a. SkylineHeightLimitCalculator: use SkylineHeightLimitCalculator.camera instead of SkylineHeightLimitCalculator._perspectiveCamera for some camera parameters
接口参数改变：
b. CameraMarker.camToEarth: new inner earth coordinate system used, previous matrix value deprecated
受影响的sdk.examples及对应原因：
1. 5-5-camera-mat: b, c
2. 5-6-camera-visualize: b, c, d, e
3. 5-8-visibility-analysis: b, c, d, e
4. 6-6-skyline: a
5. 7-3-video-fusion: b
6. 7-4-video-matching: b
接口行为改变：
c. sandbox.camera.mat: new inner earth coordinate system used, return new matrix value
d. sandbox.earthView.camera.near: new inner earth coordinate system used, no longer consistent with CameraMarker.near, need to times sandbox.Constants.scale / sandbox.Constants.EARTH_RADIUS
e. sandbox.earthView.camera.far: new inner earth coordinate system used, no longer consistent with CameraMarker.far, need to times sandbox.Constants.scale / sandbox.Constants.EARTH_RADIUS
升级效果:
