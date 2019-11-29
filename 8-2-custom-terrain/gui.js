
let gui = new dat.GUI()

var control = {
  map: 'build-in-0',
  showWireframe: true
}

let maps = {
  // build-in maps
  ['build-in-0']: new altizure.EarthWmtsTileURL('mapName0', 'default'),
  ['build-in-1']: new altizure.EarthWmtsTileURL('mapName1', 'Carto-Dark'),
  // customize
  ['Customize-map']: new altizure.EarthWmtsTileURL('mapName2', function (level, x, y) {
    return `https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/${level}/${y}/${x}`
  }),
  // https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}
  ['Customize-map2']: new altizure.EarthWmtsTileURL('mapName3', function (level, x, y) {
    let idx = (level + x + y + 2) % 4
    let s = ['a', 'b', 'c', 'd'][idx]

    return `https://stamen-tiles-${s}.a.ssl.fastly.net/watercolor/${level}/${x}/${y}.jpg`
  })
}
const keys = Object.keys(maps)

gui.add(control, 'map', keys).onChange((val) => {
  console.log(val)
  sandbox.renderItems.planet.wmtsTileURL = maps[val]
})

gui.add(control, 'showWireframe').onChange((val) => {
  sandbox.renderItems.planet.showPlanetWireframe = val
})
