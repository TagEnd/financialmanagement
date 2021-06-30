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
            <span>实验室财务设备管理系统（管理端）</span>
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
            <span style="float: right; margin-right: 20px">{{AdminInformation.userName}}</span>
        </el-header>
        <el-container>
            <!-- 侧边栏 -->
            <el-aside width="200px">
                <el-menu
                    background-color="#0184ff"
                    text-color="#fff"
                    active-text-color="#ffd04b"
                    :default-active="AdminActivePath"
                    :router="true"
                > 
                    <el-menu-item
                        index="/AdminProjectQuota"
                        @click="SaveNavState('/AdminProjectQuota')"
                    >
                        <i class="el-icon-menu" style="height:20px;width:20px;font-size:20px"></i>
                        <span slot="title" style="font-size:18px">项目额度</span>
                    </el-menu-item>
                    <el-menu-item
                        index="/AdminDeviceManage"
                        @click="SaveNavState('/AdminDeviceManage')"
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
            AdminInformation: [],
            // 被激活的链接地址
            AdminActivePath: "",
        };
    },
    created() {
        this.GetUserInformation();
        this.AdminActivePath = window.sessionStorage.getItem("AdminActivePath");
    },
    methods: {
        async GetUserInformation() {
            const { data: result } = await this.$http.get(
                "/api/user/getUserInfo"
            );
            
            if (result.success && result.code == 200) {
                this.AdminInformation = result.data.userInfo;
                window.sessionStorage.setItem('AdminId', result.data.userInfo.userId);
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
            this.$router.push({ path: "/AdminLogin" });
        },
        SaveNavState(AdminActivePath) {
            window.sessionStorage.setItem("AdminActivePath", AdminActivePath);
            this.AdminActivePath = AdminActivePath;
        },
    },
}
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