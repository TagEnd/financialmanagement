<template>
    <el-container class="home-container">
        <!-- 头部区域 -->
        <el-header
            style="
                height: 80px;
                line-height: 80px;
                font-size: 20px;
                color: azure;
                font-weight: bold;
            "
        >
            <span>实验室财务设备管理系统</span>
            <button
                style="
                    float: right;
                    height: 20px;
                    line-height: 20px;
                    margin-top: 30px;
                    font-size: 20px;
                    color: azure;
                    font-weight: bold;
                    border: 0px;
                    background-color: transparent;
                "
                @click="LogOut"
            >
                退出
            </button>
            <span style="float: right; margin-right: 20px">{{UserInformation.userName}}</span>
        </el-header>
        <el-container>
            <!-- 侧边栏 -->
            <el-aside width="200px">
                <el-menu
                    background-color="#0184ff"
                    text-color="#fff"
                    active-text-color="#ffd04b"
                    :router="true"
                >
                    <el-menu-item index="/UserProjectQuota">
                        <i class="el-icon-menu"></i>
                        <span slot="title">项目额度</span>
                    </el-menu-item>
                    <el-menu-item index="/UserDeviceManage">
                        <i class="el-icon-menu"></i>
                        <span slot="title">设备管理</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <!-- 主体部分 -->
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
    export default {
        data() {
            return {
                UserInformation: [],
            };
        },
        async created() {
            const {data: result} = await this.$http.get("/api/user/getUserInfo");
            console.log("userInformation");
            console.log(result);
            if(result.success&&result.code == 200){
                this.UserInformation = result.data.userInfo;
                console.log(this.UserInformation);
            }
        },
        methods: {
            LogOut() {
                window.sessionStorage.clear();
                this.$router.push({ path: '/UserLogin' })
            }
        },
    };
</script>
<style scoped>
.home-container {
    height: 100%;
}

.el-header {
    background-color: #0184ff;
}

.el-aside {
    background-color: #0184ff;
}

.el-main {
    background-color: azure;
}
</style>