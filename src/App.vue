<template>
  <div id="nav">
    <router-link to="/">二三维联动地图</router-link> |
    <router-link to="/about">关于</router-link>
  </div>
  <div id="main">
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

#nav {
  height: 3.5%;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #0093d1;
    }
  }
}
#main {
  height: 96.5%;
  width: 100%;
  position: relative;
}
</style>
