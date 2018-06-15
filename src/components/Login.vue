import Vue from 'vue';
import axios from 'axios'
import router from './router'

<template>
  <div class = "note" :style = "note">
    <div class = "loginFrame">
      <el-form :model = "AccountForm" rules = "rules" ref = "AccountForm"  class = "login-container">
        <div class = "tabsUser">
          <el-tabs v-model = "activeName" @tab-click = "handleClick" class = "users" style = "height: 30px;font-size: 25px;margin-bottom: 30px">
            <el-tab-pane label = "用户" name = "user" class = "tab1"></el-tab-pane>
            <el-tab-pane label = "管理员" name = "admin" class = "tab2"></el-tab-pane>
          </el-tabs>
        </div>

        <div class = "formGroup">
          <el-form-item  label = "账号" prop = "username" >
            <el-input type = "text" v-model="AccountForm.username" auto-complete = "off" placeholder = "请输入您的账号" class = "form-control" ></el-input></el-form-item>
          <el-form-item label = "密码"  prop = "password" class = "form-inline">
            <el-input type = "password" v-model="AccountForm.password" auto-complete = "off" placeholder = "请输入密码" class = "form-control" ></el-input></el-form-item>
        </div>
        <div class = "remFor">

          <router-link to = "/Register" class = "forget " style="margin-top: 0px">还未注册？</router-link>
          <router-view></router-view>
        </div>

        <div class = "formButton">
          <el-form-item style = "width:100%;">
            <el-button style = "width:100%; height: 35px; background: #3A825E; font-size:14px; font-family:PingFang SC; color:#fff; border-radius:10px " @click =  "login('AccountForm')" >登录</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>

</template>

<script>

  export default {
    name: '登录',
    data() {
      return {
        note: {
          position:"absolute",
          top:"0px",
          left:"0px",
          width: "100%",
          height:"100%",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
        },
        AccountForm : {
          username:'',
          password:'',
        },
        rules: {
          username :[
            {required: true, message: '请输入账号',trigger: 'blur'},
          ],
          password: [
            {required: true,message: '请输入密码', trigger: 'blur'},
          ]
        },
        activeName:''
      };
    },
    methods: {
      login(formName) {
          this.$refs[formName].validate((valid)=> {
              if(valid){
                if (this.activeName=="user"){
                    if (this.AccountForm.username=="admin")
                        alert('请点击管理员标签登入')
                    else{
                    this.$axios.post('http://localhost:8081/uc/verify',
                        {
                            'username': this.AccountForm.username,
                            'password': this.AccountForm.password,
                        })
                .then((response) => {
                    console.log(response.data)
                    if (response.data=="1"){
                        alert('用户名或密码错误')
                    }
                    else {
                        localStorage.token=response.data;
                        alert('登入成功')
                        this.$router.push('/Home')
                    }
                })}}
                else {
                    if (this.AccountForm.username!="admin")
                        alert('管理员账号错误')
                    else if (this.AccountForm.password!="admin")
                        alert('管理员密码错误')
                    else this.$router.push('/Home2')
                }
              }
          });
      }
    },
    created(){
      this.activeName="user";
    }
  }
</script>

<style>

  .login-container {
    -webkit-border-radius: 5px;
    border-radius: 15px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: rgba(255,255,255,0.7);
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

  label{
    width:55px;
    text-align:center;
  }

  .form-control{
    width:270px;
    flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
  }
  .forget{
    width:500px;
    text-align:right;
    font-size:14px;
    font-family:PingFang SC;

  }
  .remFor{
    margin-bottom: 0px;
    padding-bottom: 0px;
    text-align: right;
  }
  .tabsUser{
    display: inline-block;
    margin-left: 0px;
    margin-right:0px;
    text-align:center;
    font-size:25px;
  }



</style>
