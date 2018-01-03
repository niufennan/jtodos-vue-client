<template>
  <div id="app">
    <transition   name="custom-classes-transition"
    enter-active-class="animated bounceInLeft"
    leave-active-class="animated fadeOut"
    :duration="{ enter: 700, leave: 200 }"
    >
      <router-view/>
      </transition>
  </div>
</template>
<script>
export default {
  name: 'app'
}
</script>
<style  >
 @import '../static/css/animate.css';
 </style>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  position: relative;
  background:#6fc2f3;
}

</style>
