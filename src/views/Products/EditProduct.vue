<template>
  <v-container fluid>
    <div class="d-flex justify-space-between align-center">
      <v-card-title v-if="form.title"
        >Edit {{ form.title }} Product</v-card-title
      >
      <v-btn color="primary" to="/product/add">Add More Products</v-btn>
    </div>

    <v-card class="defaultCard" elevation="0">
      <v-card-title>Basic Information</v-card-title>

      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            outlined
            v-model="form.title"
            label="product title"
            :error-messages="serverErr['title']"
            :rules="reqRules"
          ></v-text-field>
          <v-row>
            <v-col sm="12" md="6">
              <v-text-field
                outlined
                v-model="form.sku"
                :error-messages="serverErr['sku']"
                label="product sku"
                :rules="reqRules"
              ></v-text-field>
            </v-col>
            <v-col sm="12" md="6">
              <v-text-field
                outlined
                type="number"
                v-model="form.quantity"
                :error-messages="serverErr['quantity']"
                label="product quantity"
                :rules="reqRules"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-autocomplete
            multiple
            outlined
            chips
            clearable
            deletable-chips
            v-model="form.categories"
            :error-messages="serverErr['categories']"
            label="product categories"
            :rules="reqRules"
            :items="categories"
            item-text="name"
            item-value="id"
          ></v-autocomplete>

          <v-row>
            <v-col sm="12" md="6">
              <v-text-field
                outlined
                v-model="form.price"
                :error-messages="serverErr['price']"
                label="product price"
                type="number"
                :rules="reqRules"
              ></v-text-field>
            </v-col>
            <v-col sm="12" md="6">
              <v-text-field
                outlined
                v-model="form.sale_price"
                :error-messages="serverErr['sale_price']"
                type="number"
                label="product sale price"
                :rules="reqRules"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-textarea
            rows="3"
            v-model="form.description"
            :error-messages="serverErr['description']"
            outlined
            label="product description"
          ></v-textarea>
          <v-checkbox
            v-model="form.availablity"
            label="availablity"
            hide-details
          ></v-checkbox>
          <v-checkbox v-model="form.featured" label="featured"></v-checkbox>
          <v-divider class="my-3"></v-divider>
          <v-card-title>Product Meta Data</v-card-title>
          <v-text-field
            outlined
            v-model="form.metaTitle"
            label="product meta title"
          ></v-text-field>
          <v-textarea
            rows="3"
            v-model="form.metaDescription"
            outlined
            label="product meta description"
          ></v-textarea>
        </v-form>
        <v-btn :loading="loading" color="primary" @click="Edit"
          >Edit Product</v-btn
        >
      </v-card-text>
    </v-card>
    <v-card class="defaultCard mt-4" elevation="0">
      <v-card-title>Product Images And Details</v-card-title>
      <v-card-text>
        <v-carousel v-model="carouselImage" hide-delimiters>
          <template v-if="form.images.length > 0">
            <v-carousel-item
              v-for="(img, i) in form.images"
              :key="'proImage' + i"
            >
              <v-sheet height="100%" tile>
                <v-row class="fill-height" align="center" justify="center">
                  <img
                    :id="'prevImage' + i"
                    :src="$getUrl(img.full, 'prevImage' + i)"
                    style="max-width: 100%; max-height: 100%"
                  />
                </v-row>
              </v-sheet>
            </v-carousel-item>
          </template>
          <v-carousel-item v-else>
            <v-sheet @click="openFile" color="grey" height="100%" tile>
              <v-row class="fill-height" align="center" justify="center">
                <v-btn text color="primary" class="mx-1">
                  <v-icon left>mdi-plus-circle-outline</v-icon> Add Image
                </v-btn>
              </v-row>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
        <div>
          <v-btn outlined color="error" class="mx-1" @click="removeImage()"
            ><v-icon>mdi-delete-outline</v-icon></v-btn
          >
          <v-btn @click="openFile" outlined color="success" class="mx-1"
            ><v-icon>mdi-plus-circle-outline</v-icon></v-btn
          >
        </div>
      </v-card-text>
      <v-file-input
        @change="SetFile"
        accept="image/*"
        multiple
        style="display: none"
        ref="ImageFile"
      ></v-file-input>
    </v-card>
    <v-card class="defaultCard mt-2" elevation="0">
      <v-card-title>Product Attributes</v-card-title>
      <product-atrributes></product-atrributes>
    </v-card>
    <v-card class="defaultCard mt-2" elevation="0">
      <v-card-title>Product Options</v-card-title>
      <product-option></product-option>
    </v-card>
  </v-container>
</template>

<script>
import productAtrributes from "../../components/product/productAtrributes.vue";
import ProductOption from '../../components/product/productOption.vue';
import Api from "../../store/Api";
export default {
  components: { productAtrributes, ProductOption },
  computed: {
    link() {
      return Api.product;
    },
    categories() {
      return this.$store.getters["Category/categories"];
    },
    product() {
      return this.$store.getters["Product/product"];
    },
  },
  data: () => ({
    model: 0,
    valid: true,
    loading: false,
    carouselImage: 1,
    form: {
      title: "",
      sku: "",
      quantity: "",
      price: "",
      sale_price: "",
      categories: [],
      description: "",
      metaDescription: "",
      metaTitle: "",
      featured: false,
      availablity: true,
      images: [],
    },
    serverErr: [],
    reqRules: [(v) => !!v || "input is required"],
  }),
  methods: {
    removeImage() {
      this.$store
        .dispatch(
          "Product/removeImage",
          this.form.images[this.carouselImage].id
        )
        .then(() => {
          this.form.images.splice(this.carouselImage, 1);
        });
    },
    SetFile(files) {
      let formData = new FormData();
      files.forEach((element, k) => {
        formData.append("image[" + k + "]", element);
      });
      formData.append("product_id", this.product.id);
      this.$store.dispatch("Product/addImage", formData).then((res) => {
        this.form.images = res.data;
        this.carouselImage = this.form.images.length - 1;
      });
    },
    openFile() {
      this.$refs.ImageFile.$refs.input.click();
    },
    getCat() {
      this.$store.dispatch("Category/getCats");
    },
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    Edit() {
      this.serverErr = [];
      if (this.validate) {
        this.loading = true;
        let newForm = Object.assign({}, this.form);
        newForm.images = "";
        newForm["_method"] = "put";

        this.$store
          .dispatch("Product/edit", this.$objectToFormData(newForm))
          .catch((rej) => {
            if (rej.response.status == 422)
              this.serverErr = rej.response.data.errors;
          })
          .finally(() => (this.loading = false));
      }
    },
    getProduct() {
      this.$store
        .dispatch("Product/getProduct", this.$route.params.id)
        .then(() => {
          this.form = this.product;
        });
    },
  },
  created() {
    this.getProduct();
    if (this.categories.length < 1) {
      this.getCat();
    }
  },
};
</script>

<style></style>
