<template>
  <v-container fluid>
    <div class="d-flex justify-space-between align-center">
      <v-card-title v-if="form.title">{{
        $vuetify.lang.t(`$vuetify.Edit product`, form.title)
      }}</v-card-title>
      <v-btn color="primary" to="/product/add">{{
        $vuetify.lang.t(`$vuetify.add more products`)
      }}</v-btn>
    </div>

    <v-card class="defaultCard" elevation="0">
      <v-card-title>{{
        $vuetify.lang.t(`$vuetify.basic information`)
      }}</v-card-title>

      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            outlined
            v-model="form.title"
            :label="$vuetify.lang.t(`$vuetify.product title`)"
            :error-messages="serverErr['title']"
            :rules="reqRules"
          ></v-text-field>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                outlined
                v-model="form.sku"
                :error-messages="serverErr['sku']"
                :label="$vuetify.lang.t(`$vuetify.product sku`)"
                :rules="reqRules"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                outlined
                type="number"
                v-model="form.quantity"
                :error-messages="serverErr['quantity']"
                :label="$vuetify.lang.t(`$vuetify.product quantity`)"
                :rules="[...isNumber]"
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
            :label="$vuetify.lang.t(`$vuetify.product categories`)"
            :rules="reqRules"
            :items="categories"
            item-text="name"
            item-value="id"
          ></v-autocomplete>

          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                outlined
                v-model="form.price"
                :error-messages="serverErr['price']"
                :label="$vuetify.lang.t(`$vuetify.product price`)"
                type="number"
                :rules="[...reqRules, ...isNumber]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                outlined
                v-model="form.sale_price"
                :error-messages="serverErr['sale_price']"
                type="number"
                :label="$vuetify.lang.t(`$vuetify.product sale price`)"
                :rules="[...reqRules, ...isNumber]"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-text-field
            outlined
            type="number"
            :rules="isNumber"
            :label="$vuetify.lang.t(`$vuetify.permenent discount`)"
            v-model.number="form.permanentDiscount"
            :error-messages="serverErr['permanentDiscount']"
          ></v-text-field>
          <v-textarea
            rows="3"
            v-model="form.description"
            :error-messages="serverErr['description']"
            outlined
            :label="$vuetify.lang.t(`$vuetify.product description`)"
          ></v-textarea>
          <v-checkbox
            v-model="form.availablity"
            :label="$vuetify.lang.t(`$vuetify.availablity`)"
            hide-details
          ></v-checkbox>
          <v-checkbox
            v-model="form.featured"
            :label="$vuetify.lang.t(`$vuetify.featured`)"
          ></v-checkbox>
          <v-divider class="my-3"></v-divider>
          <v-card-title>{{
            $vuetify.lang.t(`$vuetify.product meta data`)
          }}</v-card-title>
          <v-text-field
            outlined
            v-model="form.metaTitle"
            :label="$vuetify.lang.t(`$vuetify.product meta title`)"
          ></v-text-field>
          <v-textarea
            rows="3"
            v-model="form.metaDescription"
            outlined
            :label="$vuetify.lang.t(`$vuetify.product meta description`)"
          ></v-textarea>
        </v-form>
        <v-btn :loading="loading" color="primary" @click="Edit">{{
          $vuetify.lang.t(`$vuetify.edit product`)
        }}</v-btn>
      </v-card-text>
    </v-card>
    <v-card class="defaultCard mt-4" elevation="0">
      <v-card-title>{{
        $vuetify.lang.t(`$vuetify.product images and details`)
      }}</v-card-title>
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
                <v-btn text color="primary" class="mx-1 title font-weight-bold">
                  <v-icon left>mdi-plus-circle-outline</v-icon>
                  {{ $vuetify.lang.t(`$vuetify.add image`) }}
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
      <v-card-title>{{
        $vuetify.lang.t("$vuetify.product attributes")
      }}</v-card-title>
      <product-atrributes></product-atrributes>
    </v-card>
    <v-card class="defaultCard mt-2" elevation="0">
      <v-card-title>{{
        $vuetify.lang.t("$vuetify.product options")
      }}</v-card-title>
      <product-option></product-option>
    </v-card>
    <v-card class="defaultCard mt-2" elevation="0">
      <v-card-title>{{
        $vuetify.lang.t("$vuetify.Offer a discount on the product")
      }}</v-card-title>
      <v-card-text>
        <v-form lazy-validation ref="discountForm">
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                :label="$vuetify.lang.t('$vuetify.discount')"
                suffix="%"
                outlined
                dense
                :rules="isNumber"
                type="number"
                v-model.number="form.discount"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="form.startDate"
                    :label="$vuetify.lang.t('$vuetify.start date')"
                    append-icon="mdi-calendar"
                    readonly
                    outlined
                    :rules="reqRules"
                    dense
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="form.startDate"
                  :active-picker.sync="activePicker"
                  :min="
                    new Date(
                      Date.now() - new Date().getTimezoneOffset() * 60000
                    )
                      .toISOString()
                      .substr(0, 10)
                  "
                  @change="save"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-menu
                ref="menuTime"
                v-model="menu2"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="form.startTime"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="form.startTime"
                    :label="$vuetify.lang.t('$vuetify.start time')"
                    outlined
                    dense
                    :rules="reqRules"
                    append-icon="mdi-clock-time-four-outline"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-if="menu2"
                  v-model="form.startTime"
                  full-width
                  @click:minute="$refs.menuTime.save(form.startTime)"
                ></v-time-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                :label="$vuetify.lang.t('$vuetify.duration in minutes')"
                :suffix="$vuetify.lang.t('$vuetify.minutes')"
                outlined
                dense
                :rules="isNumber"
                type="number"
                v-model.number="form.duration"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-checkbox
                :label="$vuetify.lang.t('$vuetify.add to discounts slider ?')"
                v-model="form.discountSlider"
                color="primary"
                hide-details
                class="mt-0"
              ></v-checkbox>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-btn
                color="primary"
                :loading="discountLoading"
                :text="discountLoading"
                block
                @click="saveDiscount()"
                >{{ $vuetify.lang.t("$vuetify.save") }}</v-btn
              >
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import productAtrributes from "../../components/product/productAtrributes.vue";
import ProductOption from "../../components/product/productOption.vue";
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
  data() {
    return {
      model: 0,
      discountValid: true,
      valid: true,
      loading: false,
      discountLoading: false,
      carouselImage: 1,
      menu: false,
      menu2: false,
      activePicker: null,
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
        discount: 0,
        permanentDiscount: 0,
        startDate: new Date().toString(),
        duration: 1,
        startTime: null,
        discountSlider: false,
      },
      serverErr: [],
      reqRules: [
        (v) => !!v || this.$vuetify.lang.t(`$vuetify.input field is required`),
      ],
      isNumber: [
        (v) =>
          /^\s*(?=.*[0-9])\d*(?:\.\d{1,2})?\s*$/.test(v) ||
          this.$vuetify.lang.t(
            `$vuetify.number must be equal or greater than 0`
          ),
      ],
    };
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
  },

  methods: {
    save(date) {
      this.$refs.menu.save(date);
    },
    saveDiscount() {
      if (this.$refs.discountForm.validate()) {
        this.discountLoading = true;
        const { discount, duration, startDate, startTime, discountSlider } =
          this.form;
        this.$store
          .dispatch("Product/saveDiscount", {
            discount,
            startDate,
            duration,
            startTime,
            discountSlider,
          })
          .then(() => {
            this.$toasted.success(
              this.$vuetify.lang.t("$vuetify.Saved successfully"),
              {
                duration: 3000,
              }
            );
          })
          .catch(() => {
            this.$toasted.error(
              this.$vuetify.lang.t("$vuetify.Failed to saves"),
              {
                duration: 3000,
              }
            );
          })
          .finally(() => {
            this.discountLoading = false;
          });
      } else {
        this.$toasted.error(
          this.$vuetify.lang.t("$vuetify.form validation error"),
          {
            duration: 3000,
          }
        );
      }
    },
    removeImage() {
      this.$store
        .dispatch(
          "Product/removeImage",
          this.form.images[this.carouselImage].id
        )
        .then(() => {
          this.form.images.splice(this.carouselImage, 1);
          this.$toasted.success(
            this.$vuetify.lang.t("$vuetify.Deleted successfully"),
            {
              duration: 3000,
            }
          );
        })
        .catch(() => {
          this.$toasted.success(
            this.$vuetify.lang.t("$vuetify.Failed to delete"),
            {
              duration: 3000,
            }
          );
        });
    },
    SetFile(files) {
      let formData = new FormData();
      files.forEach((element, k) => {
        formData.append("image[" + k + "]", element);
      });
      formData.append("product_id", this.product.id);
      this.$store
        .dispatch("Product/addImage", formData)
        .then((res) => {
          this.form.images = res.data;
          this.carouselImage = this.form.images.length - 1;
          this.$toasted.success(
            this.$vuetify.lang.t("$vuetify.Added successfully"),
            {
              duration: 3000,
            }
          );
        })
        .catch(() => {
          this.$toasted.error(this.$vuetify.lang.t("$vuetify.Failed to add"), {
            duration: 3000,
          });
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
          .then(() => {
            this.$toasted.success(
              this.$vuetify.lang.t("$vuetify.Edited successfully"),
              {
                duration: 3000,
              }
            );
          })
          .catch((rej) => {
            if (rej.response.status == 422)
              this.serverErr = rej.response.data.errors;

            this.$toasted.error(
              this.$vuetify.lang.t("$vuetify.Failed to edit"),
              {
                duration: 3000,
              }
            );
          })
          .finally(() => (this.loading = false));
      }
    },
    getProduct() {
      this.$store
        .dispatch("Product/getProduct", this.$route.params.id)
        .then(() => {
          this.form = this.product;
          this.form.discount = this.form.discount || 1;
          this.form.duration = this.form.duration || 1;
          if (this.form.startDate) {
            const date = new Date(
              new Date(this.form.startDate + " UTC").toString()
            );
            // Coverting to local datetime
            this.form.startDate =
              date.getFullYear() +
              "-" +
              (date.getMonth() + 1) +
              "-" +
              date.getDate();
            this.form.startTime =
              date.getHours() +
              ":" +
              date.getMinutes() +
              ":" +
              date.getSeconds();
          }
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
