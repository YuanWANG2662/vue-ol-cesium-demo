<template>
  <div id="map2d"></div>
  <div id="map3d"></div>
  <button id="enable">{{ isEnabled ? "disable" : "enable" }}</button>
</template>

<script>
import "cesium/Build/Cesium/Widgets/widgets.css"
import * as Cesium from 'cesium'
window.Cesium = Cesium

Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3MmQ2OTc0Yy03NDVkLTRhZjAtYjBlNy1mMTVkYTU2OTY0NTIiLCJpZCI6NzYzMjgsImlhdCI6MTYzOTM4NzUyN30.qUsBewWXsupI5XlIpL2oX71PazE0lrzXFiJoGoEpoi4'

import OLCesium from 'olcs/OLCesium.js'
import Map from 'ol/Map'
import View from 'ol/View'
import { getWidth, getTopLeft } from 'ol/extent'
import TileLayer from 'ol/layer/Tile'
import { get as getProjection } from 'ol/proj'
// import OSM from 'ol/source/OSM'
import WMTS from 'ol/source/WMTS'
import WMTSTileGrid from 'ol/tilegrid/WMTS'

export default {
  name: 'CesiumViewer',
  data() {
    return {
      isEnabled: true
    }
  },
  mounted() {
    const projection = getProjection('EPSG:3857')
    const projectionExtent = projection.getExtent()
    const size = getWidth(projectionExtent) / 256
    const resolutions = new Array(14)
    const matrixIds = new Array(14)
    for (let z = 0; z < 14; ++z) {
      // generate resolutions and matrixIds arrays for this WMTS
      resolutions[z] = size / Math.pow(2, z)
      matrixIds[z] = z
    }

    const map = new Map({
      layers: [
        // new TileLayer({
        //   source: new OSM(),
        //   opacity: 0.7
        // }),
        new TileLayer({
          opacity: 0.7,
          source: new WMTS({
            attributions: 'Tiles © <a href="http://cache1.arcgisonline.cn/arcgis/rest/services/ChinaOnlineCommunity/MapServer/WMTS">ArcGIS</a>',
            url: 'http://cache1.arcgisonline.cn/arcgis/rest/services/ChinaOnlineCommunity/MapServer/WMTS',
            layer: 'WorldTimeZones',
            matrixSet: 'GoogleMapsCompatible',
            format: 'image/png',
            projection,
            tileGrid: new WMTSTileGrid({
              origin: getTopLeft(projectionExtent),
              resolutions,
              matrixIds
            }),
            style: 'default',
            wrapX: true
          })
        })
      ],
      target: 'map2d',
      view: new View({
        center: [-11158582, 4813697],
        zoom: 4
      })
    })

    const ol2d = map
    const ol3d = new OLCesium({ map: ol2d, target: 'map3d' })
    const scene = ol3d.getCesiumScene()
    scene.terrainProvider = Cesium.createWorldTerrain()
    ol3d.setEnabled(true)

    document.getElementById('enable').addEventListener('click', () => {
      ol3d.setEnabled(!ol3d.getEnabled())
      this.isEnabled = !this.isEnabled
      console.log(this.isEnabled)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#map2d,
#map3d {
  position: relative;
  float: left;
  width: 50%;
  height: 100%;
}
#map3d {
  background-color: #c0c0c0;
}
#enable {
  position: absolute;
  right: 10px;
  top: 10px;
}
</style>

<style>
li {
  list-style-type: none;
}

#map2d
  > div
  > div.ol-overlaycontainer-stopevent
  > div.ol-unselectable.ol-control {
  position: absolute;
  width: 30px;
  right: 0;
}
.ol-zoom {
  top: 5px;
}
.ol-rotate {
  top: 50px;
}
.ol-attribution {
  bottom: 10px;
}

#map2d
  > div
  > div.ol-overlaycontainer-stopevent
  > div.ol-attribution.ol-unselectable.ol-control.ol-collapsed
  > ul {
  margin: 0 15px;
  position: absolute;
  bottom: 0;
  right: 0;
  width: 120px;
  font-size: 14px;
  line-height: 20px;
}
</style>