<template>
  <v-row class="fill-height ma-0 back"   align="center" justify="center">
  <div v-if="withText" class="display-1 text-uppercase back--text text--darken-2 font-weight-bold">atyourway</div>
  </v-row>
</template>

<script>
export default {
  props:{
    withText:{
      type:Boolean,
      default:true
    }
  }
}
</script>
