<template>
    <div style="height: 100%">
        <el-table :data="tableData" height="100%" border style="width: 100%">
            <el-table-column prop="projectName" label="项目名称">
            </el-table-column>
            <el-table-column prop="totalAmount" label="项目总金额" width="180">
            </el-table-column>
            <el-table-column prop="projectShare" label="项目份额" width="180">
            </el-table-column>
            <el-table-column
                prop="projectUseShare"
                label="已使用项目份额"
                width="180"
            >
            </el-table-column>
            <el-table-column prop="projectRemainShare" label="剩余份额" width="180">
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    data() {
        return {
            tableData: [],
            // tableData: [
            //     {
            //         ProjectName: "3D游戏开发",
            //         AmountMoney: 15000,
            //         ProjectShare: 10,
            //         ShareUsed: 5,
            //         RemainShare: 5,
            //     },
            //     {
            //         ProjectName: "计算机超频",
            //         AmountMoney: 15000,
            //         ProjectShare: 10,
            //         ShareUsed: 7,
            //         RemainShare: 3,
            //     },
            //     {
            //         ProjectName: "人工智能大赛",
            //         AmountMoney: 15000,
            //         ProjectShare: 10,
            //         ShareUsed: 3,
            //         RemainShare: 7,
            //     },
            //     {
            //         ProjectName: "数据建模",
            //         AmountMoney: 15000,
            //         ProjectShare: 10,
            //         ShareUsed: 5,
            //         RemainShare: 5,
            //     },
            //     {
            //         ProjectName: "3D游戏开发",
            //         AmountMoney: 15000,
            //         ProjectShare: 10,
            //         ShareUsed: 5,
            //         RemainShare: 5,
            //     },
            //     {
            //         ProjectName: "3D游戏开发",
            //         AmountMoney: 15000,
            //         ProjectShare: 10,
            //         ShareUsed: 5,
            //         RemainShare: 5,
            //     },
            //     {
            //         ProjectName: "3D游戏开发",
            //         AmountMoney: 15000,
            //         ProjectShare: 10,
            //         ShareUsed: 5,
            //         RemainShare: 5,
            //     },
            //     {
            //         ProjectName: "3D游戏开发",
            //         AmountMoney: 15000,
            //         ProjectShare: 10,
            //         ShareUsed: 5,
            //         RemainShare: 5,
            //     },
            //     {
            //         ProjectName: "3D游戏开发",
            //         AmountMoney: 15000,
            //         ProjectShare: 10,
            //         ShareUsed: 5,
            //         RemainShare: 5,
            //     },
            //     {
            //         ProjectName: "3D游戏开发",
            //         AmountMoney: 15000,
            //         ProjectShare: 10,
            //         ShareUsed: 5,
            //         RemainShare: 5,
            //     },
            //     {
            //         ProjectName: "3D游戏开发",
            //         AmountMoney: 15000,
            //         ProjectShare: 10,
            //         ShareUsed: 5,
            //         RemainShare: 5,
            //     },
            //     {
            //         ProjectName: "3D游戏开发",
            //         AmountMoney: 15000,
            //         ProjectShare: 10,
            //         ShareUsed: 5,
            //         RemainShare: 5,
            //     },
            //     {
            //         ProjectName: "3D游戏开发",
            //         AmountMoney: 15000,
            //         ProjectShare: 10,
            //         ShareUsed: 5,
            //         RemainShare: 5,
            //     },
            //     {
            //         ProjectName: "3D游戏开发",
            //         AmountMoney: 15000,
            //         ProjectShare: 10,
            //         ShareUsed: 5,
            //         RemainShare: 5,
            //     },
            //     {
            //         ProjectName: "3D游戏开发",
            //         AmountMoney: 15000,
            //         ProjectShare: 10,
            //         ShareUsed: 5,
            //         RemainShare: 5,
            //     },
            // ],
        };
    },
    async created() {
        const  {data: result} = await this.$http.get("/api/project/getProjectShare");
        console.log("userProjectQuota");
        console.log(result);
        if(result.success&&result.code == 200){
            this.tableData = result.data.list;
            return this.$message({ message: '数据获取成功', type: "success", duration: 1000,});
        }else{
            return this.$message({ message: '数据获取失败', type: "error", duration: 1000,});
        }
        // this.tableData = result.data.data.list;
    }
};
</script>