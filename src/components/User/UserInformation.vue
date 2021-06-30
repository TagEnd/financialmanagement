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
            <span style="float: right; margin-right: 20px">{{
                UserInformation.userName
            }}</span>
        </el-header>
        <el-container>
            <!-- 侧边栏 -->
            <el-aside width="200px">
                <el-menu
                    background-color="#0184ff"
                    text-color="#fff"
                    active-text-color="#ffd04b"
                    :router="true"
                    :default-active="ActivePath"
                    
                >
                    <el-menu-item
                        index="/UserProjectQuota"
                        @click="SaveNavState('/UserProjectQuota')"
                    >
                        <i class="el-icon-menu" style="height:20px;width:20px;font-size:20px"></i>
                        <span slot="title" style="font-size:18px">项目额度</span>
                    </el-menu-item>
                    <el-menu-item
                        index="/UserDeviceManage"
                        @click="SaveNavState('/UserDeviceManage')"
                    >
                        <i class="el-icon-menu" style="height:20px;width:20px;font-size:20px"></i>
                        <span slot="title" style="font-size:18px">设备管理（测试）</span>
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
            // 被激活的链接地址
            ActivePath: "",
        };
    },
    created() {
        this.GetUserInformation();
        this.ActivePath = window.sessionStorage.getItem("ActivePath");
    },
    methods: {
        async GetUserInformation() {
            const { data: result } = await this.$http.get(
                "/api/user/getUserInfo"
            );

            if (result.success && result.code == 200) {
                this.UserInformation = result.data.userInfo;
                console.log(result);
            } else {
                return this.$message({
                    message: res.message,
                    type: "error",
                    duration: 1000,
                });
            }
        },
        LogOut() {
            window.sessionStorage.clear();
            this.$router.push({ path: "/UserLogin" });
        },
        SaveNavState(ActivePath) {
            window.sessionStorage.setItem("ActivePath", ActivePath);
            this.ActivePath = ActivePath;
        },
    },
};
</script>
<style scoped>
.home-container {
    height: 100%;
    width: 100%;
    min-width: 1366px;
    min-height: 800px;
}

.el-header {
    background-color: #0184ff;
}

.el-aside {
    background-color: #0184ff;
}
.el-menu {
    border-right: none;
}

.el-main {
    background-color: azure;
}
</style>