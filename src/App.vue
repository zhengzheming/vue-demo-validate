<template>
  <div id="app">
    <img width="25%" src="./assets/logo.png">
    <Vuelidate-Component></Vuelidate-Component>
  </div>
</template>

<script>
import VuelidateComponent from "./components/Vuelidate";

export default {
  name: "App",
  components: {
    VuelidateComponent
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
* {
  margin: 0;
  padding: 0;
}

html {
  height: 100%;
  /*Image only BG fallback*/

  /*background = gradient + image pattern combo*/
  background: linear-gradient(rgba(196, 102, 0, 0.6), rgba(155, 89, 182, 0.6));
}

body {
  font-family: montserrat, arial, verdana;
}
</style>
