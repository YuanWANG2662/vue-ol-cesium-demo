<template>
  <div id="cesiumContainer" class="fullSize"></div>
</template>

<script>
import * as Cesium from 'cesium'
import "cesium/Build/Cesium/Widgets/widgets.css"
export default {
  name: 'CesiumViewer',
  mounted() {
    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3MmQ2OTc0Yy03NDVkLTRhZjAtYjBlNy1mMTVkYTU2OTY0NTIiLCJpZCI6NzYzMjgsImlhdCI6MTYzOTM4NzUyN30.qUsBewWXsupI5XlIpL2oX71PazE0lrzXFiJoGoEpoi4'
    var viewer = new Cesium.Viewer('cesiumContainer')
    console.log(viewer)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.fullSize {
  position: relative;
  top: 0;
  left: 0;
  border: none;
  width: 100%;
  height: 100%;
}
</style>
