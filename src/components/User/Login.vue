<template>
    <div class="Login">
        <div class="SystemTitle">实验室财务设备管理系统</div>
        <div class="LoginFormStyle" ref="LoginForm">
            <div class="LoginTitle">用户登录</div>
            <!-- <router-link :to="{ name: 'AdminLogin', path: '/AdminLogin' }" class="ChangeUser" ></router-link> -->
            <div class="UserNameStyle">用户名</div>
            <input
                type="text"
                name="UserName"
                id="UserName"
                class="InputStyle"
                placeholder="用户名"
                v-model="UserInformation.userId"
            />
            <div class="PassWordStyle">密码</div>
            <input
                type="password"
                name="password"
                id="password"
                class="InputStyle"
                placeholder="密码"
                v-model="UserInformation.userPassword"
            />
            <div class="ButtonDivStyle">
                <button
                    type="button"
                    class="LoginButtonStyle"
                    id="LoginButton"
                    @keyup.enter="LoginButtonClick"
                    v-on:click="LoginButtonClick"
                    
                >
                    Login
                </button>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    data() {
        return {
            UserInformation: {
                userId: "",
                userPassword: "",
            },
        };
    },
    methods: {
        CheckInputContent() {
            if (this.UserInformation.userId == "") {
                alert("请输入用户名");
                return false;
            } else if (this.UserInformation.userPassword == "") {
                alert("请输入密码");
                return false;
            }
            return true;
        },
        async LoginButtonClick() {
            if (this.CheckInputContent()) {
                // const result =await this.$http.post('/api/user/login',JSON.stringify(this.UserInformation));
                // console.log(result);
                const { data: res } = await this.$http.post(
                    "/api/user/login",
                    JSON.stringify(this.UserInformation)
                );
                console.log(res);
                // 判断登录后的状态
                if (res.success && res.code == 200) {
                    
                    if(res.data.userInfo.userType == 0) {
                        console.log(res.data.token);
                        window.sessionStorage.clear();
                        window.sessionStorage.setItem("TokenType", 'Admin')
                        window.sessionStorage.setItem("token",res.data.token);
                        this.$router.push('/AdminInformation');
                        return this.$message({
                            message: '欢迎 ' + res.data.userInfo.userName,
                            type: "success",
                            duration: 1000,
                        });
                    }
                    else if (res.data.userInfo.userType == 1) {
                        console.log(res.data.token);
                        window.sessionStorage.clear();
                        window.sessionStorage.setItem("TokenType", 'User')
                        window.sessionStorage.setItem("token",res.data.token);
                        this.$router.push('/UserInformation');
                        return this.$message({
                            message: '欢迎 ' + res.data.userInfo.userName + '老师',
                            type: "success",
                            duration: 1000,
                        });
                    }
                    else {
                        console.log(res.data.token);
                        window.sessionStorage.clear();
                        window.sessionStorage.setItem("TokenType", 'User')
                        window.sessionStorage.setItem("token",res.data.token);
                        this.$router.push('/UserInformation');
                        return this.$message({
                            message: '欢迎 ' + res.data.userInfo.userName,
                            type: "success",
                            duration: 1000,
                        });
                    }
                    // window.addEventListener("keydown",this.KeyDown,false);

                    // sessionStorge 会话期间存储机制 localStorage 持久化存储机制
                    
                } else {
                    return this.$message({
                        message: res.message,
                        type: "error",
                        duration: 1000,
                    });
                }
                

            }
        },
        KeyDown(e){
            if(e.keyCode == 13){
                this.LoginButtonClick();
            }
        }
    },
    mounted(){
        window.addEventListener("keydown",this.KeyDown,false);
    },
    destroyed() {
        window.removeEventListener("keydown",this.KeyDown,false);
    }
};
</script>
<style scoped>
* {
    box-sizing: border-box;
}
.Login {
    height: 100%;
    width: 100%;
    min-height: 600px;
    min-width: 1366px;
    color: white;
    font-size: 12px;
    font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue",
        Helvetica, Arial, "Lucida Grande", sans-serif;
    /* background-color: #333333; */
    background-image: url(../../assets/images/User/Login/LoginBackground.jpg);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    /* overflow: hidden; */
    /* background-color: #0184ff; */
}
.SystemTitle {
    height: 80px;
    line-height: 80px;
    font-size: 30px;
    font-weight: bold;
    /* background-color: #0184ff; */
    padding: 0 40px;
}
.LoginFormStyle {
    width: 400px;
    height: 450px;
    position: relative;
    margin: 0 auto;
    margin-top: 50px;
    /* background-color: #111; */
    /* box-shadow: 0 5px 10px 5px rgba(0, 0, 0, 0.2); */
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.5);
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.75);
    overflow: hidden;
}

.LoginTitle {
    margin-top: 20px;
    height: 50px;
    width: 100%;
    text-align: center;
    line-height: 50px;
    font-size: 25px;
    font-weight: bold;
    /* background-color: blueviolet; */
    color: #fff;
}
/* .LoginTitle::after{
    content: "";
    display: block;
    position: absolute;
    top: 0px;
    left: 50px;
    height: 300px;
    width: 620px;

    background: linear-gradient(50deg, rgba(255, 255, 255, 0.15), rgba(0, 0, 0, 0));
    transform: rotate(70deg);
    pointer-events: none;
} */
.UserNameStyle,
.PassWordStyle {
    height: 20px;
    width: 100%;
    line-height: 20px;
    margin-top: 50px;
    padding-left: 20px;
    font-size: 20px;
    font-weight: bold;
    color: #fff;
    /* background-color: rgb(60, 151, 151); */
}
.InputStyle {
    width: 358px;
    height: 35px;
    color: #000;
    font-size: 20px;
    margin-left: 20px;
    margin-top: 9px;
    /* background: linear-gradient(#1f2124, #27292c); */
    background-color: transparent;
    border: 1px solid #ebeef5;
    border-radius: 5px;
    padding-left: 20px;
    /* outline: white solid 1px; */
    outline: none;
}
.InputStyle:focus {
    border: 1px solid #76acfe
    
}
.ButtonDivStyle {
    margin-top: 70px;
    /* margin-bottom: 300px; */
    padding-bottom: 50px;
    /* height: 30px; */
    /* background-color: #cad3db; */
}
.LoginButtonStyle {
    float: right;
    width: 80px;
    height: 30px;
    font-size: 15px;
    font-weight: bold;
    /* margin-top: 40px; */
    margin-right: 20px;
    background-color: #0184ff;
    color: #fff;
    /* padding: 5px 10px; */
    border: 0px;
    border-radius: 5px;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.3),
        inset 0 10px 10px rgba(255, 255, 255, 0.1);
}
.LoginButtonStyle:hover {
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.3),
        inset 0 -10px 10px rgba(255, 255, 255, 0.1);
}
.ChangeUser{
    height: 30px;
    width: 30px;
    position: absolute;
    /* background-color: red; */
    top:30px;
    right: 10px;
    background-image: url(../../assets/images/User/Login/ChangeUser.png);
    background-size: 25px 25px;
    background-repeat: no-repeat;
    background-position: center;
}
</style>