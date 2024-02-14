<template>
  <div class="box">
    <v-toolbar class="toolbar">
      <v-toolbar-title>{{ title }}</v-toolbar-title>
    </v-toolbar>
    <div>
      <slot>
        No Centent Defined
      </slot>
    </div>
  </div>
</template>

<script>
//container for login/register
export default {
  props: [
    'title'
  ]
}
</script>

<style scoped>
.box {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 70%;
  padding: 40px;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 255, 0.5);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.8);
  border-radius: 10px;
}


.toolbar {
  background-color: rgba(100, 100, 100, 0.5);
  border-radius: 10px;
}

.toolbar:hover {
  background-color: rgba(200, 200, 200, 0.4);
  padding: 0px;
  margin: 0px 10px 0px 10px;
  box-shadow: 0 0 10px #6da3a7,
    0 0 10px #ade2e6,
    0 0 10px #ade2e6,
    0 0 10px #ade2e6;
}
</style>
