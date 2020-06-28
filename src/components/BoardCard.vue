
<template >
<v-container grid-list-md fluid @click="editCardId=null;storeCardId=null" >
    <draggable v-model="cards" group="cards" @start="drag=true" @end="drag=false" @add="onAdd" tag="ul" style="min-height:15px" :listId="list.id"  >  
  <li v-for="(card, index) in cards" :key="card.id" :cardId="card.id" v-bind:listId="list.id" >
    <v-hover v-slot:default="{ hover }">
    <v-layout row >
      
          <v-list-item  >
            
              <v-list-item-content style="border-radius:5px" class="white" >
                <v-list-item-title  v-text="card.name"></v-list-item-title>
                <v-list-item-subtitle class="text--primary" >Updated: {{card.updated_at | formatDate}}</v-list-item-subtitle>
              </v-list-item-content>
                  

             
                         <v-expand-transition>
                        <v-btn icon v-if="hover"
                           
                        @click.stop="editCardId = card.id;dialog = true; showCard(editCardId)">
                         <v-icon  >mdi-eye</v-icon>
                        </v-btn>
                        </v-expand-transition>
                      
              <v-expand-transition>
               <v-btn icon v-if="hover">
                  <v-icon @click="deleteCard(card.id,index)">mdi-delete</v-icon>
                </v-btn>
              </v-expand-transition>
      <!-- <v-divider
            v-if="card.id + 1 < cards.length"
            :key="card.id"
          ></v-divider> -->
          </v-list-item >
          
          </v-layout>
          </v-hover >
          
  <!-- </li> -->
         
          <div class="text-center" >
                    <v-dialog
                      v-model="dialog"
                      width="700"
                      hieght="auto"
                    >
                      

                      <v-card>
                        <v-card-title
                          class="headline grey lighten-2"
                          primary-title 
                        >
                        <v-text-field @click.stop   v-model="newCard.name"  v-if="newCard.id==editCardId" @keyup.enter="updateCard(newCard.id,newCard.name,index)"></v-text-field>
                         <v-list-item-title  v-text="newCard.name" v-if="newCard.id!=editCardId" @click.stop="editCardId = newCard.id"></v-list-item-title>
                        </v-card-title>

                        <v-card-text>
                          <!-- <v-text-field @click.stop   v-model="newCard.name"  v-if="newCard.id==editCardId" @keyup.enter="updateCard(newCard.id,newCard.name)"></v-text-field> -->
                         <!-- <v-list-item-title  v-text="newCard.name"></v-list-item-title> -->
                         <v-divider></v-divider>

                       <v-list-item-subtitle class="text--primary" >{{newCard.user_name}} | {{newCard.updated_at | formatDate}}</v-list-item-subtitle>
                        <v-list-item-subtitle class="text--primary" v-html="newCard.description" >Description: </v-list-item-subtitle>
                       <!--<v-list-item-subtitle class="text--primary" >Updated: {{newCard.updated_at | formatDate}}</v-list-item-subtitle>
                       <v-list-item-subtitle class="text--primary" >Updated: {{newCard.updated_at | formatDate}}</v-list-item-subtitle> -->
                       <card-comment :newCard="newCard" :key="newCard.id" :cardComments="cardComments"></card-comment>
                       <!-- <ckeditor  :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor> -->
                        </v-card-text>

                        <v-divider></v-divider>
                            <!-- <v-flex class="white" md="auto"   @keyup.esc="editCardId=null">
                              <v-card @keyup.esc="editCardId=null" shaped raised>
                                <v-card-title class="white" >
                                <v-text-field @click.stop   v-model="cardData.name" label="Enter Card Name" v-if="list.id==storeCardId" @keyup.enter="storeCard(list.id)"></v-text-field>
                                <v-btn text small class="white lighten-2" @click.stop="storeCardId = list.id" v-if="list.id!=storeCardId"><v-icon>mdi-plus-circle</v-icon> Add Note</v-btn>
                                <v-btn text small rounded class="green lighten-2 ma-2" @click="storeCard(list.id)" v-if="list.id==storeCardId">Save Note</v-btn>
                          
                                </v-card-title>
                              </v-card>
                            </v-flex> -->
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="primary"
                            text
                            @click.stop="dialog = false;editCardId=null"
                          >
                            Close
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </div>
           </li>
        </draggable>
          <v-flex class="white" md="auto"   @keyup.esc="editCardId=null">
                <v-card @keyup.esc="editCardId=null" shaped raised>
                  <v-card-title class="white" >
                  <v-text-field @click.stop   v-model="cardData.name" label="Enter Card Name" v-if="list.id==storeCardId" @keyup.enter="storeCard(list.id)"></v-text-field>
                  <v-btn text small class="white lighten-2" @click.stop="storeCardId = list.id" v-if="list.id!=storeCardId"><v-icon>mdi-plus-circle</v-icon> Add Card</v-btn>
                  <v-btn text small rounded class="green lighten-2 ma-2" @click="storeCard(list.id)" v-if="list.id==storeCardId">Save Card</v-btn>
            
                  </v-card-title>
                </v-card>
              </v-flex>



    </v-container>
    
    
</template> 

<script>
import CardComment from '@/components/CardComment.vue'
  
import draggable from 'vuedraggable'
import Classic from '@ckeditor/ckeditor5-build-classic';
  export default {
    props:['list'],
    components: {
     draggable,'card-comment':CardComment
    },
    data: () => ({
      cards:[],
       boardId:'',
       boards:'',
       board:'',
       lists:'',
       cardComments:[],
       cardData:{
          name:''
       },
       hover:false,
       dialog: false,
      editCardId:null,
      storeCardId:null,
      cardId:'',
      listId:'',
      newCard:'',
      editor: Classic,
                editorData: '',
                editorConfig: {
                    // The configuration of the editor.
                    
                }
    }),
    methods: {
       getLists(){
        this.boards.map((board)=>{
            if(board.id == this.boardId){
              this.board = board;
              this.cardComments = board.lists.card.comments;
              this.cards = board.lists.cards;
              console.log('cards after getlists : ', this.cards);
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
        showCard(cardId){
          let token = localStorage.getItem('token');
         this.$axios.defaults.baseURL = this.$baseUrl;
          this.$axios.get('/card/'+cardId+'?api_token='+token)
          .then((response)=>{
                let newCard = response.data.card;
                this.newCard = newCard;
                this.cardComments = this.newCard.comments
                //console.log(newCard);
                if(!this.cards){
                  this.cards=[];
                  }
                this.fetchBoardData();
                           this.cardData.name= ''; 
                           this.storeCardId ='';
                           this.editCardId=null;
          }).catch((error)=>{
              this.$toast.error('some error happend.'+error, {
                  position: 'top-right'
                }); 
          }); 
        },
       storeCard(listId){
          this.storeCardId = listId;
          let token = localStorage.getItem('token');
         this.$axios.defaults.baseURL = this.$baseUrl;
          this.$axios.post('/boards/'+this.list.board_id+'/list/'+this.list.id+'/card?api_token='+token,{name:this.cardData.name})
          .then((response)=>{
                let newCard = response.data.card;
                if(!this.cards){
                  this.cards=[];
                  }
                this.fetchBoardData();
                this.cards.push(newCard);
                this.$toast.success('Card Added Successfully.', {
                  position: 'top-right'
                });
                           this.cardData.name= ''; 
                           this.storeCardId ='';
          }).catch((error)=>{
              this.$toast.error('some error happend.'+error, {
                  position: 'top-right'
                }); 
          }); 
        },
        onAdd(evt){
          let cardId = evt.item.getAttribute('cardId');
          let toListId = evt.to.getElementsByTagName("li")[0].getAttribute('listId');
          this.moveCard(cardId,toListId);
        },
        moveCard(cardId,newlist_id){
          let token = localStorage.getItem('token');
         this.$axios.defaults.baseURL = this.$baseUrl;
          this.$axios.put('/card/'+cardId+'/list/'+newlist_id+'?api_token='+token,{list_id:newlist_id})
          .then(()=>{
            this.$toast.success('Card Updated Successfully.', {
                  position: 'top-right'
                });
                this.updateId = null;
                this.fetchBoardData();
                           this.listName= ''; 
                           this.editCardId=null;
          }).catch((error)=>{
              this.$toast.error('some error happend.'+error, {
                  position: 'top-right'
                }); 
          });
        },
        updateCard(cardId,newName,index){
          let token = localStorage.getItem('token');
         this.$axios.defaults.baseURL = this.$baseUrl;
          this.$axios.put('/card/'+cardId+'?api_token='+token,{name:newName})
          .then((response)=>{
            this.$toast.success('Card Updated Successfully.', {
                  position: 'top-right'
                });
                this.updateId = null;
                this.cards.splice(index,1);
                this.cards.push(response.data.card);
                           this.listName= ''; 
                           this.editCardId=null;
          }).catch((error)=>{
              this.$toast.error('some error happend.'+error, {
                  position: 'top-right'
                }); 
          });
        },
        deleteCard(cardId,index){
          let token = localStorage.getItem('token');
         this.$axios.defaults.baseURL = this.$baseUrl;
          this.$axios.delete('/card/'+cardId+'?api_token='+token)
          .then(()=>{
                if(!this.cards){
                  this.cards=[];
                  }
                this.fetchBoardData();
                this.cards = this.list.cards;
                this.cards.splice(index,1);
            this.$toast.success('Card Deleted Successfully.', {
                  position: 'top-right'
                });
                
                
          }).catch((error)=>{
              this.$toast.error('some error happend.'+error, {
                  position: 'top-right'
                }); 
          });
        },
        // onChange(){
        //    //console.log(evt.moved.oldIndex,evt.moved.newIndex);
        //   //  let newCards = this.cards.map((card,index)=>{
        //   //    card.priority = index+1;
        //   //    return card;
        //   //  });
        //      let token = localStorage.getItem('token');
        //  this.$axios.defaults.baseURL = this.$baseUrl;
        //   this.$axios.patch('/card/update-all?api_token='+token,{cards:newCards})
        //   .then(()=>{
        //     this.$toast.success('Cards Updated Successfully.', {
        //           position: 'top-right'
        //         });
        //         //this.fetchBoardData();
        //         //this.cards = this.list.cards;
        //   }).catch((error)=>{
        //       this.$toast.error('some error happend.'+error, {
        //           position: 'top-right'
        //         }); 
        //   });
        // },
    },
    created (){
      this.cards = this.list.cards;
        let token = localStorage.getItem('token');
        if(!token){
          this.$router.push('/login');
        }
    }
  }
</script>