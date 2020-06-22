<template>


<div @click="editMode=false;updateId=null">

<h4>{{board.name}}</h4>
  <v-container grid-list-md fluid>
      <v-layout row wrap>
  <v-flex md4 v-for="list in lists" :key="list.id" tag="ul"  v-bind:listId="list.id">
    
  <v-card :listId="list.id" shaped raised >
    <v-hover v-slot:default="{ hover }">
    <v-toolbar
      color="pink lighten-1"
      dark
      :listId="list.id"
    >
     
       <v-text-field @click.stop  v-model="listName" label="Enter List Name" v-if="updateId== list.id" @keyup.enter="updateList"></v-text-field>
      <v-toolbar-title  v-else>{{list.name}}</v-toolbar-title>
      
      <v-spacer></v-spacer>
     <v-expand-transition>
      <v-btn icon v-if="hover" >
        <v-icon @click.stop="updateId = list.id">mdi-pencil</v-icon>
      </v-btn>
     </v-expand-transition>
      <v-expand-transition>
      <v-btn icon v-if="hover">
        <v-icon @click="deleteList(list.id)">mdi-delete</v-icon>
      </v-btn>
      </v-expand-transition>
      
    </v-toolbar>
</v-hover>
    
        <board-card :list="list" :key="list.id" ></board-card>
      
  </v-card>
    
  </v-flex >
  <v-flex md2 wrap>
          <v-card shaped raised >
            <v-card-title class="grey lighten-3">
              <v-text-field @click.stop   v-model="listName" label="Enter List Name" v-if="editMode" @keyup.enter="storeList"></v-text-field>
                  <v-btn text small class="grey lighten-2" @click.stop="editMode = true" v-if="!editMode"><v-icon>mdi-plus-circle</v-icon> Add list</v-btn>
                  <v-btn text small rounded class="green lighten-2 ma-2" @click="storeList" v-if="editMode">Save list</v-btn>
            </v-card-title>
          </v-card>
          
        </v-flex>
        
        </v-layout>


    </v-container>
    
    </div>
    
</template>


<script>
  import BoardCard from '@/components/BoardCard.vue'
  export default {
    components: {
     'board-card':BoardCard
    },
    data: () => ({
      boards:'',
      board:'',
      lists:'',
      boardId:'',
      listName:'',
      editMode:false,
      updateId:null,
     
    }),
    methods: {
      getLists(){
        this.boards.map((board)=>{
            if(board.id == this.boardId){
              this.board = board;
              return this.lists = board.lists;
            }
            
        });
      },
      
        fetchBoardData(){
            let token = localStorage.getItem('token');
            
             this.$axios.get(this.$baseUrl+'/boards?api_token='+token)
             .then((response) => {
                 this.boards = response.data.boards;
                 this.getLists();
             });
        },
        storeList(){
          this.editMode = false;
          let token = localStorage.getItem('token');
         this.$axios.defaults.baseURL = this.$baseUrl;
           // axios.defaults.headers.common['Authorization'] =token;
          this.$axios.post('/boards/'+this.boardId+'/list/?api_token='+token,{name:this.listName})
          .then((response)=>{
            this.$toast.success('List Added Successfully.', {
                  position: 'top-right'
                });
                let newList = response.data.list;
                this.lists.push(newList);
                           this.listName= ''; 
          }).catch((error)=>{
              this.$toast.error('some error happend.'+error, {
                  position: 'top-right'
                }); 
          }); 
        },
        updateList(){
          let token = localStorage.getItem('token');
         this.$axios.defaults.baseURL = this.$baseUrl;
          this.$axios.put('/boards/'+this.boardId+'/list/'+this.updateId+'?api_token='+token,{name:this.listName})
          .then(()=>{
            this.$toast.success('List Updated Successfully.', {
                  position: 'top-right'
                });
                this.updateId = null;
                this.fetchBoardData();
                           this.listName= ''; 
          }).catch((error)=>{
              this.$toast.error('some error happend.'+error, {
                  position: 'top-right'
                }); 
          });
        },
        deleteList(listId){
          let token = localStorage.getItem('token');
         this.$axios.defaults.baseURL = this.$baseUrl;
          this.$axios.delete('/boards/'+this.boardId+'/list/'+listId+'?api_token='+token)
          .then(()=>{
            this.$toast.success('List Deleted Successfully.', {
                  position: 'top-right'
                });
                this.fetchBoardData();
          }).catch((error)=>{
              this.$toast.error('some error happend.'+error, {
                  position: 'top-right'
                }); 
          });
        }
     
    },
    created (){
      this.boardId = this.$route.params.id;

      this.fetchBoardData();
      
      
    },
    beforeRouteUpdate(to,from,next){
      this.boardId = to.params.id;
      this.fetchBoardData();
      next();
    }
  }
</script>