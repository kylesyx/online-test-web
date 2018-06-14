import Vue from 'vue';
import axios from 'axios'
import router from './router'

<template>
  <div>
    <h1>注册</h1>
    <div class = "note" :style = "note">
      <div class = "RegisterFrame">
        <el-form :model = "RegisterForm"   status-icon :rules = "rules" ref = "RegisterForm"  class = "register-container">
          <div class = "formGroup">
            <el-form-item  label = "账号" prop = "username" >
              <el-input type = "text" v-model="RegisterForm.username" auto-complete = "off" placeholder = "请输入您的账号" class = "form-control" ></el-input></el-form-item>
            <el-form-item label = "密码"  prop = "password" class = "form-inline">
              <el-input type = "password" v-model="RegisterForm.password" auto-complete = "off" placeholder = "请输入您的密码" class = "form-control" ></el-input></el-form-item>
            <el-form-item label = "确认"  prop = "confirm" class = "form-inline">
              <el-input type = "password" v-model="RegisterForm.confirm" auto-complete = "off" placeholder = "请再次输入密码" class = "form-control" ></el-input></el-form-item>
          </div>

          <div class = "formButton">
            <el-form-item style = "width:100%;">
              <el-button style = "width:100%; height: 35px; background: #3A825E; font-size:14px; font-family:PingFang SC; color:#fff; border-radius:10px " @click =  "submit('RegisterForm')" >提交</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      data(){

        var validatePass =(rule,value,callback)=>{
          if (value === '') {
            callback(new Error('请输入密码'));
          } else {
            if (this.RegisterForm.confirm !== '') {
              this.$refs.RegisterForm.validateField('confirm');
            }
            callback();
          }
        };
        var validatePass2 = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请再次输入密码'));
          } else if (value !== this.RegisterForm.password) {
            callback(new Error('两次输入密码不一致!'));
          } else {
            callback();
          }
        };

        return{
          note: {
            position:"absolute",
            top:"0px",
            left:"0px",
            width: "100%",
            height:"100%",
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
          },
          RegisterForm : {
            username:'',
            password:'',
            confirm:''
          },
          rules: {
            username :[
              {required: true, message: '请输入账号',trigger:'blur'},
              {min:1,max:8,message:'必须3-8个字符',trigger:'blur'}
            ],
            password: [
              {required:true,validator:validatePass,trigger:'blur'},
              {min:1,max:8,message:'必须5-8个字符',trigger:'blur'}
            ],
            confirm: [
              {required:true,validator:validatePass2,trigger:'blur'},
              {min:1,max:8,message:'必须5-8个字符',trigger:'blur'}
            ]
          }
        }
      },
      methods: {
        submit(formName){
          this.$refs[formName].validate((valid)=> {

            if(valid){
              this.$axios.get('http://localhost:8080/uc/select', {
                params: {
                  username: this.RegisterForm.username
                }
              })
                .then((response) => {
                if (response.data.username==null){
                  this.$axios.post('http://localhost:8080/uc/uadd',
                    {
                      'username': this.RegisterForm.username,
                      'password': this.RegisterForm.password,
                    }).then((result) => {
                    alert(result.data)
                    alert('submit');
                    this.$router.replace('/')
                  })
                }
                else alert('用户名重复'),
                  this.$router.replace('/Register')
              })
            }
            else{
              console.log('error');
              return false;
            }
          });
        }
      },
    }

</script>

<style scoped>
  .register-container {
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

</style>
