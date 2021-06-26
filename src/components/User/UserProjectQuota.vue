<template>
    <div style="height: 100%;display:flex;flex-direction: column;">
        <div style="height: 30px; margin-bottom: 10px;">
            <!-- <span style="height: 30px; line-height: 30px; font-size: 15px;">项目名称</span>     -->
            <!-- <input type="text" style="border: 1px solid black; height: 20px;width: 170px;"> -->
            <input type="text" placeholder="项目名称" class="InputStyle"  v-model="InputProjectTitle">

            <!-- <el-input placeholder="项目名称"  size="small ">
            </el-input> -->
            <button class="el-icon-search SearchButtonStyle" v-on:click="SearchButtonClick"></button>
            <!-- <el-button icon="el-icon-search" round plain size="small"></el-button> -->
        </div>
        <el-table :data="tableData" height=95% border style="width: 100%;">
            <el-table-column prop="projectName" label="项目名称">
            </el-table-column>
            <el-table-column prop="totalAmount" label="项目总金额" width="200">
            </el-table-column>
            <el-table-column prop="projectShare" label="项目份额" width="200">
            </el-table-column>
            <el-table-column prop="projectUseShare" label="已使用项目份额" width="200">
            </el-table-column>
            <el-table-column prop="projectRemainShare" label="剩余份额" width="200">
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
                //         ProjectName: "3D数据建模",
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
                InputProjectTitle: '',
                CopyTableData:[],
            };
        },
        async created() {
            const { data: result } = await this.$http.get("/api/project/getProjectShare");
            console.log("userProjectQuota");
            console.log(result);
            if (result.success && result.code == 200) {
                this.tableData = result.data.list;
                // projectId: "1408056618427375617"
                // projectName: "百验气格引事制"
                // projectRemainShare: -93530892
                // projectShare: -19675544
                // projectUseShare: -71735573
                // totalAmount: 23193948
                // console.log(result.data.list);
                this.CopyTableData = JSON.parse(JSON.stringify(this.tableData));
                return this.$message({ message: '数据获取成功', type: "success", duration: 1000, });
            } else {
                return this.$message({ message: '数据获取失败', type: "error", duration: 1000, });
            }
            // this.tableData = result.data.data.list;
        },
        methods: {
            SearchButtonClick() {
                console.log(this.CopyTableData);
                // console.log(this.InputProjectTitle);
                if(this.InputProjectTitle==''){
                    this.tableData = JSON.parse(JSON.stringify(this.CopyTableData));
                    return;
                }
                this.tableData.splice(0, this.tableData.length)
                // console.log(this.tableData);
                for(let i=0;i<this.CopyTableData.length;i++){
                    if(this.CopyTableData[i].projectName.indexOf(this.InputProjectTitle,0) != -1 ){
                        this.tableData.push(this.CopyTableData[i]);
                    }
                    // console.log(this.tableData[i].projectName == this.InputProjectTitle );
                }
            }
        },
        watch: {
            InputProjectTitle(newValue,oldValue){
                console.log(newValue);
                if(newValue==''){
                    this.tableData = JSON.parse(JSON.stringify(this.CopyTableData));
                    return;
                }
                else{
                    this.SearchButtonClick();
                }
            }
        }
    };
</script>
<style scoped>
    * {
        padding: 0px;
    }
    .InputStyle {
        float: left;
        box-sizing: border-box;
        border: 1px solid #EBEEF5;
        height: 30px;
        width: 300px;
        border-radius: 5px;
        padding-left: 20px;
        padding-right: 20px;
        font-size: 14px;
        line-height: 30px;
        outline: none;
    }
    .InputStyle:focus {
        border: 1px solid #76ACFE;
    }
    .SearchButtonStyle {
        border: 1px solid #EBEEF5;
        float: left;
        box-sizing: border-box;
        height: 30px;
        width: 30px; 
        font-size: 20px;
        border-radius: 5px;
        margin-left: 10px;
        background-color: #fff;
        /* -moz-outline-radius: 5px; */
        outline: none;
        
    }
    .SearchButtonStyle:focus {
        border: 1px solid #76ACFE;
    }

</style>