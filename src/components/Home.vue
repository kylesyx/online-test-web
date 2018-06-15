<template>
    <div>
      <h1>主界面</h1>
        <button id="logout" @click="logout()">注销</button>
    </div>
</template>

<script>
    export default {
        name: "Home",
      data(){
          return{

          }
      },
      methods:{
          logout(){
            localStorage.token=null;
            this.$router.push('/')
          }
      }
    }
</script>

<style scoped>

</style>
