<template>
  <v-sheet>
    <v-simple-table class="dataTable my-4">
      <template v-slot:default>
        <thead>
          <tr>
            <th v-if="option">
              <v-checkbox></v-checkbox>
            </th>
            <th
              v-for="(column, index) in columns"
              :key="index + 'column'"
              v-text="$vuetify.lang.t(`$vuetify.${column.name}`)"
            ></th>
            <th v-if="option">
              <v-btn fab icon color="primary" :loading="actionLoading" dark>
                <v-icon>mdi-dots-horizontal</v-icon>
              </v-btn>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, k) in values ? values : dataCollection"
            :key="item.name"
          >
            <td v-if="option">
              <v-checkbox></v-checkbox>
            </td>
            <td
              v-for="(row, index) in columns"
              :class="'td' + index"
              :key="index + 'row'"
            >
              <v-img
                class="ma-2"
                v-if="row.type == 'image'"
                :src="getImage(item[row.dataProp])"
                eager
                width="150px"
              ></v-img>
              <v-chip v-else-if="row.type == 'date'">
                {{ getDate(item[row.dataProp]) }}
              </v-chip>
              <v-chip
                small
                class="ma-1"
                color="primary"
                v-else-if="row.type == 'arrayOfObject'"
                v-for="obj in item[row.dataProp]"
                :key="obj[row.objProp]"
              >
                {{ obj[row.objProp] }}
              </v-chip>
              <v-chip
                x-small
                outlined
                v-else-if="row.type == 'bool'"
                :color="item[row.dataProp] ? 'success' : 'error'"
              >
                {{
                  item[row.dataProp]
                    ? row.textY
                      ? $vuetify.lang.t(`$vuetify.${row.textY}`)
                      : $vuetify.lang.t(`$vuetify.active`)
                    : row.textN
                    ? $vuetify.lang.t(`$vuetify.${row.textN}`)
                    : $vuetify.lang.t(`$vuetify.deactive`)
                }}
              </v-chip>

              <router-link
                v-else-if="row.type == 'link'"
                :to="row.to + item[row.dataProp]"
                >{{ item[row.dataProp] }}</router-link
              >
              <template v-else-if="row.type == 'object'">{{
                item[row.dataProp][row.objProp]
              }}</template>
              <template v-else>{{ item[row.dataProp] }}</template>
            </td>
            <td v-if="option">
              <div class="">
                <v-menu offset-y min-width="150px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      fab
                      icon
                      color="primary"
                      dark
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon>mdi-dots-horizontal</v-icon>
                    </v-btn>
                  </template>

                  <v-list dense>
                    <v-list-item
                      v-for="(op, i) in options"
                      :key="i"
                      @click="doOption(op, item, k)"
                    >
                      <v-list-item-icon class="mr-0 pr-0">
                        <v-icon
                          small
                          v-text="op.icon"
                          :color="op.color"
                        ></v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title
                          v-text="$vuetify.lang.t(`$vuetify.${op.title}`)"
                        ></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </div>
            </td>
          </tr>
          <tr v-if="loading">
            <td
              class="text-center pt-2"
              :colspan="columns.length + (option ? 2 : 0)"
            >
              <v-progress-circular
                :size="40"
                color="primary"
                indeterminate
              ></v-progress-circular>
            </td>
          </tr>
          <tr
            v-if="
              dataCollection.length < 1 &&
              !loading &&
              (values ? values.length < 1 : true)
            "
          >
            <td
              class="text-center pt-2 text-capitalize"
              :colspan="columns.length + (option ? 2 : 0)"
            >
              {{ $vuetify.lang.t(`$vuetify.no data found`) }}
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <div
      class="d-flex justify-space-between align-center flex-wrap"
      v-if="pagination && meta"
    >
      <v-pagination
        circle
        v-model="page"
        v-if="meta.last_page > 1"
        :length="meta.last_page"
        :total-visible="$vuetify.breakpoint.xs ? 4 : 8"
        class="my-2"
      ></v-pagination>
      <v-combobox
        outlined
        class="my-2"
        hide-details
        dense
        :items="[5, 10, 15, 20, 50, 100, 200, 500, 700, 1000, 10000]"
        :style="{
          'max-width: 150px; min-width: 120px': !$vuetify.breakpoint.xs,
        }"
        :label="$vuetify.lang.t(`$vuetify.rows per page`)"
        type="number"
        v-model="per_page"
      >
      </v-combobox>
    </div>
  </v-sheet>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    values: {
      type: Array,
    },
    columns: {
      type: Array,
    },
    link: {
      type: String,
    },

    pagination: {
      type: Boolean,
      default: true,
    },
    option: {
      type: Boolean,
      default: true,
    },
    options: {
      type: Array,
      default: () => [
        { title: "view", icon: "mdi-eye", type: "view", color: "info" },
        {
          title: "edit",
          icon: "mdi-pencil-box-outline",
          type: "edit",
          color: "success",
        },
        {
          title: "remove",
          icon: "mdi-trash-can-outline",
          type: "delete",
          color: "error",
        },
      ],
    },
  },
  computed: {
    ...mapGetters("DataTable", ["dataCollection", "links", "meta", "loading"]),
  },
  methods: {
    getImage(url) {
      return this.$getUrl(url);
    },
    getData(url) {
      this.$store.dispatch("DataTable/getData", {
        link: url,
        pagination: this.pagination,
      });
    },
    getDate(date) {
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      return new Date(date).toLocaleDateString(
        localStorage.getItem("at-lang") || "en",
        options
      );
    },
    deleteItem(item, index) {
      this.actionLoading = true;
      this.$store
        .dispatch("DataTable/deleteItem", {
          link: this.link + "/" + item.id,
          index: index,
        })
        .then(() => {
          this.actionLoading = false;
          this.$toasted.success(
            this.$vuetify.lang.t("$vuetify.Deleted successfully"),
            {
              duration: 3000,
            }
          );
          this.$emit("delete", index);
        })
        .catch((rej) => {
          console.log(rej.response);
          if (rej.response.status == 423) {
            this.$toasted.error(rej.response.data, {
              duration: 5000,
            });
          } else {
            this.$toasted.error(
              this.$vuetify.lang.t("$vuetify.Failed to delete"),
              {
                duration: 3000,
              }
            );
          }
        });
    },
    doOption(op, item, index) {
      switch (op.type) {
        case "delete":
          //do delete request
          this.$toasted.show(
            this.$vuetify.lang.t(
              "$vuetify.are you sure you want to delete this item?"
            ),
            {
              // pass the icon name as string
              position: "top-center",
              fullWidth: false,
              singleton: true,
              action: [
                {
                  text: this.$vuetify.lang.t("$vuetify.Cancel"),
                  onClick: (e, toastObject) => {
                    toastObject.goAway(0);
                  },
                },
                {
                  text: this.$vuetify.lang.t("$vuetify.Yes"),
                  onClick: (e, toastObject) => {
                    this.deleteItem(item, index);
                    toastObject.goAway(0);
                  },
                },
              ],
            }
          );

          break;
        case "edit":
          if (op.link) {
            this.$router.push(this.$route.path + "/" + item.id + "/edit");
          }
          this.$emit("edit", item);
          break;
        case "show":
          if (op.link) {
            this.$router.push(this.$route.path + "/" + item.id);
          }
          this.$emit("show", item);
          break;
      }
    },
  },
  data() {
    return {
      page: 1,
      per_page: 15,
      actionLoading: false,
    };
  },
  created() {
    if (!this.values) {
      this.getData(this.link + "?page=1&per_page=15");
    }
  },
  watch: {
    page(val) {
      this.getData(this.link + `?page=${val}&per_page=${this.per_page}`);
    },
    per_page() {
      this.page = 1;
      this.getData(this.link + `?page=${this.page}&per_page=${this.per_page}`);
    },
  },
};
</script>

<style>
.dataTable th {
  font-weight: bold;
  text-transform: capitalize;
  color: #495057 !important;
  font-size: 13px !important;
}
.dataTable thead {
  border-color: #eff2f7;
  background-color: #eff2f7;
}
.dataTable tbody tr .td0 {
  color: #495057 !important;
  font-size: 13px !important;
  font-weight: bold;
}
.dataTable tbody tr td,
.dataTable thead tr th {
  border-color: #eff2f7 !important;
}
</style>
