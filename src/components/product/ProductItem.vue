<template>
  <v-card
    :max-width="isList ? '100%' : $vuetify.breakpoint.smAndDown ? 320 : 260"
    flat
    tile
    @mouseleave="hover = false"
    @mouseover="hover = true"
    :class="{ 'mx-auto': true }"
  >
    <v-row class="ma-0" :class="{ 'justify-center': $vuetify.breakpoint.xs }">
      <v-carousel v-model="imgItem" height="auto">
        <v-carousel-item v-for="img in product.images" :key="img.id">
          <v-img
            eager
            :src="$getUrl(img.full)"
            :aspect-ratio="img.aspect_ratio"
            :contain="Boolean(img.auto)"
            min-height="340px"
            min-width="272px"
            class="grey"
          >
            <template v-slot:placeholder>
              <img-slot></img-slot>
            </template>
          </v-img>
        </v-carousel-item>
      </v-carousel>

      <div style="flex: 1">
        <v-card-title
          class="prodTitle secondary--text"
          :title="product.title"
          >{{ $subStr(product.title) }}</v-card-title
        >

        <v-card-text>
          <v-row align="center" class="mx-0">
            <v-rating
              :value="4.5"
              color="amber"
              dense
              half-increments
              readonly
              size="14"
            ></v-rating>

            <div class="grey--text ms-4">4.5 (413)</div>
          </v-row>
          <div
            v-show="hover && Object.keys(product.attributes).length > 0"
            class="my-4 text-subtitle-1 grey--text prodAttr"
          >
            <span
              v-for="(item, k) in Object.values(product.attributes)[0]"
              :key="k + 'attri'"
            >
              {{ item.value }}
              <template
                v-if="k + 1 != Object.values(product.attributes)[0].length"
                >/</template
              >
            </span>
          </div>
          <div v-show="!hover" class="my-4 text-subtitle-1 primary--text">
            {{ price }} EGP
          </div>
          <p v-if="isList">{{ product.description }}</p>
        </v-card-text>
      </div>
    </v-row>
  </v-card>
</template>

<script>
import imgSlot from "./imgSlot.vue";
export default {
  components: { imgSlot },
  name: "productItem",
  props: {
    product: {
      type: Object,
      required: true,
    },

    isList: {
      type: [Boolean, Number],
      default: false,
    },
  },
  data() {
    return {
      imgItem: 0,
      hover: false,
      attributes: {},
    };
  },
  computed: {
    price() {
      const $keys = Object.keys(this.product.attributes);
      return Object.values(this.product.attributes).reduce((a, i, index) => {
        this.attributes[$keys[index]] = i[0].id;
        return +i[0].price + a;
      }, +this.product.sale_price);
    },
  },
  watch: {
    imgItem(val) {
      this.$emit("setCurrent", val);
    },
  },
  methods: {},
};
</script>
<style lang="scss">
.speedBtn {
  box-shadow: 0 2px 6px 0 rgb(0 0 0 / 6%);
  border-color: #aaa !important;
  &:hover {
    background: var(--v-primary-base) !important;
    border-color: var(--v-primary-base) !important;

    .v-icon {
      color: #fff !important;
    }
  }
}
</style>
<style lang="scss" scoped>
.prodTitle {
  font-size: 1rem;
  &:hover {
    color: var(--v-primary-base) !important;
    cursor: pointer;
  }
}
.prodAttr {
  transition: all 600ms ease;
}
.over {
  background: transparent;
  width: 100%;
  height: 100%;
}
</style>
