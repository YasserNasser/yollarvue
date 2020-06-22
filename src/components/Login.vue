<template>
<div class="text-md-center">
  <v-layout>
    <v-flex xs6 offset-xs3>
      <h2 > Login</h2>
  <ValidationObserver ref="observer" v-slot="{  }">
    <form @keyup.enter="submit">
      <ValidationProvider v-slot="{ errors }" name="email" rules="required|email">
        <v-text-field
          v-model="login.email"
          :error-messages="errors"
          label="E-mail"
          required
        ></v-text-field>
      </ValidationProvider>

        <ValidationProvider v-slot="{ errors }" name="password" rules="required">
        <v-text-field
          v-model="login.password"
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
      <v-btn  @click="submit" rounded color="deep-purple" class=" lighten-1 ma-2">Login</v-btn>
      <v-btn @click="clear" rounded color="deep-purple" class=" lighten-1 ma-2">clear</v-btn>
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
      show1: false,
     login:{
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
        this.$axios.post(this.$baseUrl+'/login', this.login)
        .then(response =>{
          let user = response.data.user;
           let newtoken = response.data.user.api_token;
            localStorage.setItem('token',newtoken);
            this.$token = newtoken;
           // window.axios.defaults.params={api_token:newtoken};
            localStorage.setItem('user',JSON.stringify(user));
            Event.$emit('login',user);
            this.$router.push('/');
        });
        this.$refs.observer.validate()
      },
      clear () {
        this.login.email = '';
        this.login.password = '';
        this.$refs.observer.reset();
      },
    },
  }
</script>