export default {

    methods:{

        fetchBoardData(){
            let token = localStorage.getItem('token');
             this.$axios.get(this.$baseUrl+'/boards?api_token='+token)
             .then((response) => {
                 this.boards = response.data.boards;
                 //Event.$emit('boardsLoaded',this.boards);
             });
         }
    }

}