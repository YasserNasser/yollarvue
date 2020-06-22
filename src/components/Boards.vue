<template>
<div class=" flex-no-wrap justify-space-between" @click="editMode=false">
      <h2 >Your  Boards</h2>
    <v-layout row-sm column child-flex-sm>
      <v-row>
       
      <div v-for='board in boards' :key="board.id">  
      <v-hover v-slot:default="{ hover }">
        <v-card dark  shaped  raised color="deep-purple" class="lighten-1 ma-1"  style="cursor:pointer">


      <v-toolbar
      color="deep-purple lighten-1"
    >
     
       <v-text-field @click.stop  v-model="BoardName" label="Enter Board Name" v-if="updateId== board.id" @keyup.enter="updateBoard(board.id)"></v-text-field>
     
            <v-toolbar-title  v-else><router-link :to="{name:'SingleBoard',params:{id:board.id}}" style="text-decoration: none;" class="white--text">{{board.name}}</router-link></v-toolbar-title> 
      
      <v-spacer></v-spacer>
      <v-expand-transition>
     <v-btn icon v-if="hover">
                <v-icon @click.stop="updateId=board.id">mdi-pencil</v-icon>
              </v-btn>
         </v-expand-transition>
         <v-expand-transition>
            <v-btn icon v-if="hover">
                  <v-icon @click="deleteBoard(board.id)">mdi-delete</v-icon>
                </v-btn>
        </v-expand-transition>
    </v-toolbar>
            <v-card-text>
      <v-chip-group>
        <v-chip color="deep-purple" class="lighten-1 ma-1" style="fontSize:0.8rem">Created: {{board.created_at | formatDate}}</v-chip>
        <v-chip color="deep-purple"  class="lighten-1 ma-1" style="fontSize:0.8rem">Updated: {{board.updated_at | formatDate}}</v-chip>
      </v-chip-group>  
    </v-card-text>
        </v-card>
        </v-hover>
    </div>
    
    
    <v-flex md2>
          <v-card shaped raised>
            <v-card-title class="grey lighten-1">
              <v-text-field @click.stop   v-model="BoardName" label="Enter Board Name" v-if="editMode" @keyup.enter="storeBoard"></v-text-field>
                  <v-btn text small class="grey lighten-2" @click.stop="editMode = true" v-if="!editMode"><v-icon>mdi-plus-circle</v-icon> Add Board</v-btn>
                  <v-btn text small rounded class="green lighten-2 ma-2" @click="storeBoard" v-if="editMode">Save Board</v-btn>
            </v-card-title>
          </v-card>
    </v-flex>
    
        </v-row>
      
    </v-layout>
  </div>
</template>
<script>
import boardDataMixin from '../mixins/boardDataMixin'
  export default {
    components: {
     
    },
    data: () => ({
      boards:'',
      BoardName:'',
      editMode:'',
      hover:false,
      updateId:null,

    }),
     mixins:[boardDataMixin],
    methods: {
       deleteBoard(boardId){
          let token = localStorage.getItem('token');
         this.$axios.defaults.baseURL = this.$baseUrl;
          this.$axios.delete('/boards/'+boardId+'?api_token='+token)
          .then(()=>{
            this.$toast.success('Board Deleted Successfully.', {
                  position: 'top-right'
                });
                this.fetchBoardData();
                
          }).catch((error)=>{
              this.$toast.error('some error happend.'+error, {
                  position: 'top-right'
                }); 
          });
        },

    updateBoard(boardId){
          let token = localStorage.getItem('token');
         this.$axios.defaults.baseURL = this.$baseUrl;
          this.$axios.put('/boards/'+boardId+'?api_token='+token,{name:this.BoardName})
          .then(()=>{
            this.$toast.success('Board Updated Successfully.', {
                  position: 'top-right'
                });
                this.updateId = null;
                this.fetchBoardData();
                           this.BoardName= ''; 
                          // this.editBoardId=null;
          }).catch((error)=>{
              this.$toast.error('some error happend.'+error, {
                  position: 'top-right'
                }); 
          });
        },
     storeBoard(){
          this.editMode = false;
          let token = localStorage.getItem('token');
         this.$axios.defaults.baseURL = this.$baseUrl;
           // axios.defaults.headers.common['Authorization'] =token;
          this.$axios.post('/boards/?api_token='+token,{name:this.BoardName})
          .then((response)=>{
            this.$toast.success('Board Added Successfully.', {
                  position: 'top-right'
                });
                let newBoard = response.data.board;
                this.boards.push(newBoard);
                           this.BoardName= ''; 
          }).catch((error)=>{
              this.$toast.error('some error happend.'+error, {
                  position: 'top-right'
                }); 
          }); 
        },
        },
    mounted (){
        let token = localStorage.getItem('token');
        if(!token){
          this.$router.push('/login');
        }
        this.fetchBoardData(); 
    }
  }
</script>