<template>
  <div class="home">
    <CesiumViewer />
  </div>
</template>

<script>
// @ is an alias to /src
import CesiumViewer from '@/components/CesiumViewer.vue'

export default {
  name: 'Home',
  components: {
    CesiumViewer
  }
}
</script>

<style scoped>
.home {
  height: 100%;
  width: 100%;
}
</style>
