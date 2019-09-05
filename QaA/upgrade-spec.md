example
* 2.1 autoScale
projectMarker._apiInfo.name -> projectMarker.spec.name

* 2.1 project viewer
marker._apiInfo.annotations -> marker.spec.render.annotations

* 4.5 lnglat to alt
```
let geoInfo = altmarker._apiInfo.geoInfo
maxlat = geoInfo.maxLat
maxlng = geoInfo.maxLong
minlat = geoInfo.minLat
minlng = geoInfo.minLong
```

```
let geoInfo = altmarker.spec.model.gis
maxlat = geoInfo.maxLat
maxlng = geoInfo.maxLng
minlat = geoInfo.minLat
minlng = geoInfo.minLng
```

