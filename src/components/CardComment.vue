
<template >
<v-container grid-list-md fluid @click="editCommentId=null;storeCommentId=null" >
    <!-- <draggable v-model="comments" group="comments" @start="drag=true" @end="drag=false" @add="onAdd" tag="ul" style="min-height:15px" :commentId="comment.id"  @change="onChange">   -->
  <li v-for="comment in cardComments" :key="comment.id" :commentId="comment.id" v-bind:cardId="newCard.id" >
    <v-hover v-slot:default="{ hover }">
    <v-layout row >
      
          <v-list-item  >
            
              <v-list-item-content style="border-radius:5px" class="white" >
                <v-list-item-title  v-text="comment.description"></v-list-item-title>
                <v-list-item-subtitle class="text--primary" >{{newCard.user_name}} | Updated: {{comment.updated_at | formatDate}}</v-list-item-subtitle>
              </v-list-item-content>
                  

             
                         <v-expand-transition>
                        <v-btn icon v-if="hover"
                           
                        @click.stop="editCommentId = comment.id;dialog = true; showComment(editCommentId)">
                         <v-icon  >mdi-eye</v-icon>
                        </v-btn>
                        </v-expand-transition>
                      
              <v-expand-transition>
               <v-btn icon v-if="hover">
                  <v-icon @click="deleteComment(comment.id)">mdi-delete</v-icon>
                </v-btn>
              </v-expand-transition>
      <v-divider
            v-if="comment.id + 1 < cardComments.length"
            :key="comment.id"
          ></v-divider>
          </v-list-item >
          
          </v-layout>
          </v-hover >
          
  </li>
         
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
                        <v-text-field @click.stop   v-model="newComment.description"  v-if="newComment.id==editCommentId" @keyup.enter="updateComment(newComment.id,newComment.description)"></v-text-field>
                         <v-list-item-title  v-text="newComment.description" v-if="newComment.id!=editCommentId" @click.stop="editCommentId = newComment.id"></v-list-item-title>
                        </v-card-title>

                        <v-card-text>
                          <!-- <v-text-field @click.stop   v-model="newCard.name"  v-if="newCard.id==editCardId" @keyup.enter="updateCard(newCard.id,newCard.name)"></v-text-field> -->
                         <!-- <v-list-item-title  v-text="newCard.name"></v-list-item-title> -->
                         <v-divider></v-divider>

                       <v-list-item-subtitle class="text--primary" >{{newComment.user_name}} | {{newComment.updated_at | formatDate}}</v-list-item-subtitle>
                        <v-list-item-subtitle class="text--primary" >Description: {{newComment.description}}</v-list-item-subtitle>
                       <!--<v-list-item-subtitle class="text--primary" >Updated: {{newCard.updated_at | formatDate}}</v-list-item-subtitle>
                       <v-list-item-subtitle class="text--primary" >Updated: {{newCard.updated_at | formatDate}}</v-list-item-subtitle> -->
                       
                       <ckeditor  :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
                        </v-card-text>

                        <v-divider></v-divider>
                            <v-flex class="white" md="auto"   @keyup.esc="editCommentId=null">
                              <v-card @keyup.esc="editCommentId=null" shaped raised>
                                <v-card-title class="white" >
                                <v-text-field @click.stop   v-model="commentData.description" label="Enter Comment Name" v-if="newCard.id==storeCommentId" @keyup.enter="storeComment(newCard.id)"></v-text-field>
                                <v-btn text small class="white lighten-2" @click.stop="storeCommentId = newCard.id" v-if="newCard.id!=storeCommentId"><v-icon>mdi-plus-circle</v-icon> Add Note</v-btn>
                                <v-btn text small rounded class="green lighten-2 ma-2" @click="storeComment(newCard.id)" v-if="newCard.id==storeCommentId">Save Note</v-btn>
                          
                                </v-card-title>
                              </v-card>
                            </v-flex>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="primary"
                            text
                            @click.stop="dialog = false;editCommentId=null"
                          >
                            Close
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </div>
          
        <!-- </draggable> -->
          <v-flex class="white" md="auto"   @keyup.esc="editCommentId=null">
                <v-card @keyup.esc="editCommentId=null" shaped raised>
                  <v-card-title class="white" >
                  <v-text-field @click.stop   v-model="commentData.description" label="Enter Comment " v-if="newCard.id==storeCommentId" @keyup.enter="storeComment(newCard.id)"></v-text-field>
                  <v-btn text small class="white lighten-2" @click.stop="storeCommentId = newCard.id" v-if="newCard.id!=storeCommentId"><v-icon>mdi-plus-circle</v-icon> Add Comment</v-btn>
                  <v-btn text small rounded class="green lighten-2 ma-2" @click="storeComment(newCard.id)" v-if="newCard.id==storeCommentId">Save Comment</v-btn>
            
                  </v-card-title>
                </v-card>
              </v-flex>



    </v-container>
    
    
</template> 

<script>
//import draggable from 'vuedraggable'
import Classic from '@ckeditor/ckeditor5-build-classic';
  export default {
    props:['newCard','cardComments'],
    components: {
    //  draggable
    },
    data: () => ({
      comments:'',
       boardId:'',
       boards:'',
       board:'',
       lists:'',
       card:'',
       comment:'',
       cards:'',
       commentData:{
          description:''
       },
       hover:false,
       dialog: false,
      editCommentId:null,
      storeCommentId:null,
      commentId:'',
      cardId:'',
      newComment:'',
      editor: Classic,
                editorData: '<p>Content of the editor.</p>',
                editorConfig: {
                    // The configuration of the editor.
                    
                }
    }),
    methods: {
         getLists(){
        this.boards.map((board)=>{
            if(board.id == this.boardId){
              this.board = board;
               return this.comments = board.lists.cards.comments;
               //console.log('comments',this.comments);
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
    //    getCards(){
    //     this.cards.map((card)=>{
    //         if(card.id == this.cardId){
    //           this.card = card;
    //           return this.comments = card.comments;
    //         }
            
    //     });
     // },
      
    //     fetchListsData(){
    //         this.fetchBoardData();
    //         console.log(this.boardId);
    //         let token = localStorage.getItem('token');
            
    //          this.$axios.get(this.$baseUrl+'/boards/'+this.board.id+'/list?api_token='+token)
    //          .then((response) => {
    //              this.lists = response.data.lists;
    //              this.getCards();
    //          });
    //     },
        showComment(commentId){
          let token = localStorage.getItem('token');
         this.$axios.defaults.baseURL = this.$baseUrl;
          this.$axios.get('/comment/'+commentId+'?api_token='+token)
          .then((response)=>{
                let newComment = response.data.comment;
                this.newComment = newComment;
                //console.log(newComment);
                if(!this.comments){
                  this.comments=[];
                  }
                //this.fetchBoardData();
                //this.comments.push(newComment);
                this.$toast.success('Comment Pringed Successfully.', {
                  position: 'top-right'
                });
                        //    this.commentData.description= ''; 
                        //    this.storeCommentId ='';
                        //    this.editCommentId=null;
          }).catch((error)=>{
              this.$toast.error('some error happend.'+error, {
                  position: 'top-right'
                }); 
          }); 
        },
       storeComment(cardId){

          this.storeCommentId = cardId;
          let token = localStorage.getItem('token');
         this.$axios.defaults.baseURL = this.$baseUrl;
           // axios.defaults.headers.common['Authorization'] =token;
          this.$axios.post('/card/'+this.newCard.id+'/comment?api_token='+token,{description:this.commentData.description})
          .then((response)=>{
                let newComment = response.data.comment;
                //console.log(newComment);
                if(!this.comments){
                  this.comments=[];
                  }
                this.fetchBoardData();
                this.comments.push(newComment);
                this.$toast.success('Comment Added Successfully.', {
                  position: 'top-right'
                });
                           this.commentData.description= ''; 
                           this.storeCommentId ='';
          }).catch((error)=>{
              this.$toast.error('some error happend.'+error, {
                  position: 'top-right'
                }); 
          }); 
        },
        onAdd(evt){
          //console.log(evt.item,evt.to.getElementsByTagName("li")[0].getAttribute('listId'));
         //let fromListId = evt.item.getAttribute('listId');
          let commentId = evt.item.getAttribute('commentId');
          let toCardId = evt.to.getElementsByTagName("li")[0].getAttribute('cardId');
          //console.log(cardId,toListId,fromListId);
          this.updateCard(commentId,toCardId);
        },
        updateComment(commentId,newName){
          let token = localStorage.getItem('token');
         this.$axios.defaults.baseURL = this.$baseUrl;
          this.$axios.put('/comment/'+commentId+'?api_token='+token,{description:newName})
          .then(()=>{
            this.$toast.success('Comment Updated Successfully.', {
                  position: 'top-right'
                });
                this.updateId = null;
                this.fetchBoardData();
                           this.listName= ''; 
                           this.editCommentId=null;
          }).catch((error)=>{
              this.$toast.error('some error happend.'+error, {
                  position: 'top-right'
                }); 
          });
        },
        deleteComment(commentId){
          let token = localStorage.getItem('token');
         this.$axios.defaults.baseURL = this.$baseUrl;
          this.$axios.delete('/comment/'+commentId+'?api_token='+token)
          .then((response)=>{
            this.$toast.success('Comment Deleted Successfully.', {
                  position: 'top-right'
                });
                let newComment = response.data.comment;
                console.log('new Comment',newComment);
                console.log('before Comments',this.comments);
                this.cardComments.splice(commentId,1);
                console.log('After Comments',this.comments);
                this.fetchBoardData();
                
                console.log('After fetch data Comments',this.comments);
          }).catch((error)=>{
              this.$toast.error('some error happend.'+error, {
                  position: 'top-right'
                }); 
          });
        },
        // onChange(){
        //    //console.log(evt.moved.oldIndex,evt.moved.newIndex);
        //    let newComments = this.comments.map((comment,index)=>{
        //      comment.priority = index+1;
        //      return comment;
        //    });
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
        this.fetchBoardData();
        
            //   let token = localStorage.getItem('token');
            
            //  this.$axios.get(this.$baseUrl+'/cards/'++'?api_token='+token)
            //  .then((response) => {
            //      this.boards = response.data.boards;
            //      this.getLists();
            //  });
    //     this.cards = this.list.cards;
    //     console.log(this.list.cards);
     this.comments = this.cardComments;
      console.log('Heree cardComments',this.cardComments);
      console.log('Heree Comments',this.comments);
        let token = localStorage.getItem('token');
        if(!token){
          this.$router.push('/login');
        }
    }
  }
</script>