<template>
  <v-bottom-sheet scrollable :value="value" @input="change">
    <v-sheet class="pa-10" style="overflow: auto">
      <v-row>
        <v-col cols="12" sm="12" md="6">
          <product-item
            @setCurrent="setCurrentSelected"
            v-if="product"
            :product="product"
          ></product-item>
        </v-col>
        <v-col cols="12" sm="12" md="6">
          <v-switch
            :label="
              $vuetify.lang.t(
                `$vuetify.Adjust the width and height of the image to contain the entire image`
              )
            "
            class="text-h4"
            v-model="product.images[currentSelected].auto"
          ></v-switch>
          <v-card-text>
            <v-card-title>{{
              $vuetify.lang.t(`$vuetify.Set the aspect ratio of the image`)
            }}</v-card-title>
            <div>
              <span
                class="text-h4 font-weight-light"
                v-text="product.images[currentSelected].aspect_ratio"
              ></span>
            </div>
            <v-slider
              v-model="product.images[currentSelected].aspect_ratio"
              track-color="grey"
              always-dirty
              :step="0.1"
              :min="0.1"
              :max="4"
            >
              <template v-slot:prepend>
                <v-icon @click="decrement"> mdi-minus </v-icon>
              </template>

              <template v-slot:append>
                <v-icon @click="increment"> mdi-plus </v-icon>
              </template>
            </v-slider>
          </v-card-text>
        </v-col>
      </v-row>
      <v-btn color="primary" class="me-3" @click="saveChange()">{{
        $vuetify.lang.t(`$vuetify.save changes`)
      }}</v-btn>
      <v-btn color="primary" @click="change(false)">{{
        $vuetify.lang.t(`$vuetify.close`)
      }}</v-btn>
    </v-sheet>
  </v-bottom-sheet>
</template>

<script>
import ProductItem from "./ProductItem.vue";
export default {
  components: { ProductItem },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    product: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      currentSelected: 0,
    };
  },

  methods: {
    decrement() {
      this.product.images[this.currentSelected].aspect_ratio -= 0.1;
    },
    increment() {
      this.product.images[this.currentSelected].aspect_ratio += 0.1;
    },
    change(val) {
      this.$emit("input", val);
    },
    setCurrentSelected(val) {
      this.currentSelected = val || 0;
    },
    saveChange() {
      this.$store.dispatch("Product/EditImage", this.product.images);
    },
  },
};
</script>

<style></style>
