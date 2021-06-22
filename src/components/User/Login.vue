<template>
    <div class="Login">
        <div class="LoginFormStyle" ref="LoginForm">
            <div class="LoginTitle">用户登录</div>
            <div class="UserNameStyle">用户名</div>
            <input type="text" name="UserName" id="UserName" class="InputStyle" placeholder="用户名" v-model="UserInformation.username"/>
            <div class="PassWordStyle">密码</div>
            <input type="password" name="password" id="password" class="InputStyle" placeholder="密码" v-model="UserInformation.password">
            <div class="ButtonDivStyle">
                <button type="button" class="LoginButtonStyle" id="LoginButton" v-on:click="LoginButtonClick">Login</button>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    data() {
        return {
            UserInformation: {
                username: '',
                password: '',
            },
        };
    },
    methods: {
        LoginButtonClick() {
            // console.log(this.$refs.LoginForm);
            this.$router.push({ path:'/UserInformation'})
        }
    },
};
</script>
<style scoped>
* {
    box-sizing: border-box;
}
.Login {
    height: 100%;
    width: 100%;
    color: white;
    font-size: 12px;
    font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue",
        Helvetica, Arial, "Lucida Grande", sans-serif;
    /* background-color: #333333; */
    background-image: url(../../assets/images/User/Login/LoginBackground.jpg);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    overflow: hidden;
}
.LoginFormStyle {
    width: 400px;
    /* height: 300px; */
    position: relative;
    margin: 0 auto;
    margin-top: 100px;
    /* background-color: #111; */
    /* box-shadow: 0 5px 10px 5px rgba(0, 0, 0, 0.2); */
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.5);
    box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.75);
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
    color: #000;
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
    color: #000;;
    /* background-color: rgb(60, 151, 151); */
}
.InputStyle {
    width: 358px;
    height: 35px;
    color:#000;
    font-size: 20px;
    margin-left: 20px;
    margin-top: 9px;
    /* background: linear-gradient(#1f2124, #27292c); */
    background-color: transparent;
    box-shadow: 0 1px 0 rgba(255, 255, 255, 0.1);
    border: 1px solid #222;
    border-radius: 5px;
    /* outline: white solid 1px; */
}
.InputStyle:focus {
    outline: rgba(255, 255, 255, 0.1) solid 1px;
    
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
	box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.3), inset 0 10px 10px rgba(255, 255, 255, 0.1);
}
.LoginButtonStyle:hover {
	box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.3), inset 0 -10px 10px rgba(255, 255, 255, 0.1);

}
</style>