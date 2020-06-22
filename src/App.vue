    <template>
    <v-app id="inspire">
  <v-card>
    <v-app-bar
      color="deep-purple"
      dark
      class="lighten-1"
    >
      <v-app-bar-nav-icon @click="drawer = true" v-if="loggedIn"></v-app-bar-nav-icon>
     
        <div class="text-center" >
          <v-menu v-if="loggedIn">
            <template v-slot:activator="{ on }">
              <v-btn
                rounded color="deep-purple lighten-1" class="ma-2" 
                v-on="on"
                style="fontSize:0.8rem"
              >
                Boards
              </v-btn>
            </template>

            <v-list rounded color="deep-purple" class=" lighten-1 ma-2" >
              <v-list-item
                v-for="(item, index) in boards"
                :key="index"
              >
              <router-link :to="{name:'SingleBoard',params:{id:item.id}}" style="text-decoration: none;" >
                <v-list-item-title class="white--text lighten-1"  >{{ item.name }}</v-list-item-title>
              </router-link>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>

      <v-spacer></v-spacer>
       <router-link to="/" style="text-decoration: none;" class="white--text">
      <v-toolbar-title  >{{name}}</v-toolbar-title>
       </router-link>
      <v-spacer></v-spacer>
      <!-- <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn> -->
      <div class="text-center" v-if="!loggedIn">
        <router-link to="/register" style="text-decoration: none;"><v-btn rounded color="deep-purple" class="ma-1 lighten-1" style="fontSize:0.8rem"  >Register</v-btn></router-link>
        <router-link to="/login" style="text-decoration: none;"><v-btn rounded color="deep-purple" class="ma-1 lighten-1" style="fontSize:0.8rem">Login</v-btn ></router-link>
      </div>
      <div class="text-center" v-if="loggedIn">
        <router-link to="/logout" style="text-decoration: none;"><v-btn rounded color="deep-purple" class="ma-1 lighten-1"  style="fontSize:0.8rem">Logout</v-btn></router-link>
      </div>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
         <router-link to="/" style="text-decoration: none;">
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>
         </router-link>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{user.username}}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
      <v-container >
        <router-view></router-view>
      </v-container>
  </v-card>
      <v-footer
      app
      color="deep-purple"
      class="white--text lighten-1"
    >
      <span>{{name}}</span>
      <v-spacer />
      <span>&copy; 2020</span>
    </v-footer>
  </v-app>
</template>
<script>
import boardDataMixin from './mixins/boardDataMixin'
  export default {
    props: {
      source: String,
    },
  components: {
    
  },
    data: () => ({
      name:'Yollar',
      drawer: null,
      right: false,
      left: false,
      group:'',
      loggedIn:false,
      boards:'',
      offset: true,
      user:'',
    }),
    mixins:[boardDataMixin],
    created () {
      Event.$on('login', ($user) => {
         this.loggedIn = true;
         this.user=$user;
          this.fetchBoardData();   
      });
      Event.$on('logout', () => {
         this.loggedIn = false;
      });
      let token = localStorage.getItem('token');
        if(token){
          this.loggedIn = true;
        this.fetchBoardData();
       this.user = JSON.parse(localStorage.getItem('user'));
        }else{
          this.$router.push('/login');
        } 
    },
    methods: {
    },
  }
</script>