<template>
  <v-container fluid>
      
       <v-card-title class="text-capitalize">{{
      $vuetify.lang.t(`$vuetify.categories`)
    }}</v-card-title>
    <v-card class="defaultCard" elevation="0">
      <v-card-text>
        <div class="d-flex justify-space-between">
          <v-spacer></v-spacer
          ><add-cat></add-cat>
        </div>
        <data-table
          :link="link"
          :columns="columns"
          :pagination="true"
          :options="options"
          @edit="edit"
        ></data-table>
      </v-card-text>
    </v-card>
    <edit-cat v-model="open" :item='editItem'></edit-cat>
  </v-container>
</template>

<script>
import dataTable from "../../components/common/dataTable.vue";
import Api from "../../store/Api";
import AddCat from './AddCat.vue';
import EditCat from './editCat.vue';
export default {
  components: { dataTable, AddCat, EditCat },
  computed: {
    link() {
      return Api.category;
    },
  },
  data() {
    return {
      open:false,
      editItem:null,
      columns: [
        { name: "name", dataProp: "name", type: "text" },
        { name: "description", dataProp: "description", type: "text" },
        { name: "parent", dataProp: "parent", type: "text" },
        { name: "featured", dataProp: "featured", type: "bool",textY:'Yes',textN:'No' },
        { name: "main menu", dataProp: "menu", type: "bool",textY:'Yes',textN:'No' },
        { name: "create date", dataProp: "created_at", type: "date" },
      ],
      options: [
        { title: "edit category", icon: "mdi-pencil-box-outline",type:'edit',color:'success' },
        { title: "remove category", icon: "mdi-trash-can-outline",type:"delete", color:'error' },
      ],
    };
  },
  methods:{
    edit(item){
      this.editItem=item;
      this.open=true;

    }
  },
  created(){
    this.$store.commit('DataTable/reset');
  }
};
</script>

<style></style>
