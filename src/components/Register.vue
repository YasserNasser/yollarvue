<template>
<div class="text-md-center">
  
  <v-layout>
    
    <v-flex xs6 offset-xs3>
      <h2 > Register</h2>
  <ValidationObserver ref="observer" v-slot="{  }">
    <form>
      <ValidationProvider v-slot="{ errors }" name="Name" rules="required|max:20">
        <v-text-field
          v-model="register.username"
          :counter="20"
          :error-messages="errors"
          label="Name"
          required
        ></v-text-field>
      </ValidationProvider>
      <ValidationProvider v-slot="{ errors }" name="email" rules="required|email">
        <v-text-field
          v-model="register.email"
          :error-messages="errors"
          label="E-mail"
          required
        ></v-text-field>
      </ValidationProvider>

        <ValidationProvider v-slot="{ errors }" name="password" rules="required">
        <v-text-field
          v-model="register.password"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :error-messages="errors"
          
          
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Password"
            hint="At least 8 characters"
            counter
            @click:append="show1 = !show1"
          required
        ></v-text-field>
      </ValidationProvider>


      <v-btn  @click="submit" rounded color="deep-purple" class="lighten-1 ma-2">Rigester</v-btn>
      <v-btn @click="clear" rounded color="deep-purple" class="lighten-1 ma-2">clear</v-btn>
    </form>
  </ValidationObserver>
  </v-flex>
  </v-layout>
  </div>
</template>


<script>
  import { required, email, max } from 'vee-validate/dist/rules'
  import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

  setInteractionMode('eager')

  extend('required', {
    ...required,
    message: '{_field_} can not be empty',
  })

  extend('max', {
    ...max,
    message: '{_field_} may not be greater than {length} characters',
  })

  extend('email', {
    ...email,
    message: 'Email must be valid',
  })

  export default {
    components: {
      ValidationProvider,
      ValidationObserver,
    },
    data: () => ({
      show1:false,
     register:{
       username: '',
      email: '',
      password: '',
     }
      
      
    }),
 rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          emailMatch: () => ('The email and password you entered don\'t match'),
        },
    methods: {
      submit () {
        
       this.$refs.observer.validate()
         this.$axios.post(this.$baseUrl+'/register', this.register)
         .then(response =>{
           let token = response.data.user.api_token;
            localStorage.setItem('token',token);
            this.$axios.post(this.$baseUrl+'/login', this.register)
        .then(response =>{
          let user = response.data.user;
           let token = response.data.user.api_token;
          //  this.$token =token;
          //let user = response.data.user;
            localStorage.setItem('token',token);
            localStorage.setItem('user',JSON.stringify(user));
            Event.$emit('login',user);
            this.$router.push('/')
          //console.log(user);
        });
           //console.log(response);
         });
       

      },
      clear () {
        this.register.username = ''
        this.register.email = ''
        this.register.password = ''
        this.$refs.observer.reset()
      },
    },
  }
</script>