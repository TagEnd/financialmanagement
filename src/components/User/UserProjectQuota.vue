<template>
    <div style="height: 100%; width: 100%;  ">
        <!-- <h1>设备管理</h1> -->
        <div style="
                height: 30px;
                display: flex;
                justify-content: flex-start;
            ">
            <input type="text" name="" id="" class="InputStyle" placeholder="项目名称" v-model="InputProjectTitle" />
            <button class="el-icon-search SearchButtonStyle" v-on:click="SearchButtonClick"></button>
        </div>
        <!-- <div></div> -->
            <div style="
            margin-top: 10px;
            overflow-x: auto;
            background-color: #fff;
            box-sizing: border-box;
        ">
                <table class="DeviceTableStyle">
                    <thead>
                        <th style="min-width: 100px;">项目名称</th>
                        <th style="width: 200px;">项目编号</th>
                        <th style="width: 150px;">项目总金额</th>
                        <th style="width: 150px;">项目份额</th>
                        <th style="width: 150px;">已使用项目份额</th>
                        <th style="width: 150px;">剩余份额</th>
                    </thead>
                    <tbody>
                        <tr v-for="item in tableData.slice(tableDataStart,tableDataEnd)">
                            <td>{{item.projectName}}</td>
                            <td>{{item.projectId}}</td>
                            <td>{{item.totalAmount}}</td>
                            <td>{{item.projectShare}}</td>
                            <td>{{item.projectUseShare}}</td>
                            <td>{{item.projectRemainShare}}</td>
                        </tr>
                        <tr v-for="item in FillData">
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>

            </div>


        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page.sync="currentPage" :page-size="PageSize" layout="prev, pager, next, jumper"
            :total="tableData.length" style="text-align: right; margin-top: 3px;">
        </el-pagination>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                w1: '',
                tableDataStart: 0,
                tableDataEnd: 12, // tableDataEnd PageSize同步修改
                PageSize: 12,
                currentPage: 1,
                needNewComputer: 1,
                tableLength: 0,
                FillData: 0,
                CopyTableData: [],
                InputProjectTitle: '',
                // 需要修改的项目信息
                tableData: [],
            };
        },
        async created() {
            const { data: result } = await this.$http.get("/api/project/getProjectShare");
            console.log("UserProjectQuota");
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
                this.needNewComputer++;
                return this.$message({ message: '数据获取成功', type: "success", duration: 1000, });
            } else {
                return this.$message({ message: '数据获取失败', type: "error", duration: 1000, });
            }
            // this.tableData = result.data.data.list;
        },
        methods: {
            SearchButtonClick() {
                // console.log(this.CopyTableData);
                console.log(this.tableData);
                console.log(this.InputProjectTitle);
                // this.$set(this.currentPage, 1);
                if (this.InputProjectTitle == '') {
                    this.currentPage = 1;
                    this.needNewComputer++;
                    this.tableData = JSON.parse(JSON.stringify(this.CopyTableData));
                    return;
                }
                this.tableData.splice(0, this.tableData.length)
                // console.log(this.tableData);
                for (let i = 0; i < this.CopyTableData.length; i++) {
                    if (this.CopyTableData[i].projectName.indexOf(this.InputProjectTitle, 0) != -1) {
                        this.tableData.push(this.CopyTableData[i]);
                        console.log(this.CopyTableData[i]);
                    }
                }
                this.currentPage = 1;
                this.needNewComputer++;
            },
            handleCurrentChange(value) {
                console.log(value);
                this.tableDataStart = (value - 1) * this.PageSize;
                this.tableDataEnd = value * this.PageSize;
            },
            handleSizeChange(value) {
                console.log(value);
            }
        },
        watch: {
            'currentPage': function (NewValue) {
                // console.log('currentPage');
                this.tableDataStart = (NewValue - 1) * this.PageSize;
                this.tableDataEnd = NewValue * this.PageSize;
                console.log(this.tableData.length);
                if (this.tableData.length < this.tableDataEnd) {
                    this.FillData = this.tableDataEnd - this.tableData.length;
                }
                else {
                    this.FillData = 0;
                }
            },
            'needNewComputer': function (value) {
                console.log('needNewComputer');
                this.tableDataStart = (this.currentPage - 1) * this.PageSize;
                this.tableDataEnd = this.currentPage * this.PageSize;
                // 填充行数
                console.log(this.tableData.length);
                if (this.tableData.length < this.tableDataEnd) {
                    this.FillData = this.tableDataEnd - this.tableData.length;
                }
                else {
                    this.FillData = 0;
                }
            },
            'tableDataEnd': function (val) {
                console.log('监听');
                console.log(val);
            }

        }
    };
</script>
<style scoped>
    * {
        padding: 0;
    }

    .InputStyle {
        /* float: left; */
        /* flex-wrap: wrap; */
        /* flex-grow: 1; */
        box-sizing: border-box;
        border: 1px solid #ebeef5;
        height: 30px;
        width: 300px;
        min-width: 100px;
        border-radius: 5px;
        padding-left: 20px;
        padding-right: 20px;
        font-size: 14px;
        line-height: 30px;
        outline: none;
    }

    .InputStyle:focus {
        border: 1px solid #76acfe;
    }

    .SearchButtonStyle {
        border: 1px solid #ebeef5;
        float: left;
        box-sizing: border-box;
        height: 30px;
        width: 30px;
        min-width: 30px;
        font-size: 20px;
        border-radius: 5px;
        background-color: #fff;
        /* -moz-outline-radius: 5px; */
        margin-left: 10px;
        outline: none;
    }

    .SearchButtonStyle:focus {
        border: 1px solid #76acfe;
    }

    .DeviceTableStyle {
        /* display: inline-block; */
        width: 100%;
        /* height: 100%; */
        font-size: 14px;
        position: relative;
        /* margin: auto 0; */
        empty-cells: show;
        /* overflow: auto; */
        /* overflow-x: auto; */
        /* background-color: lemonchiffon; */
        border-collapse: collapse;
    }

    .DeviceTableStyle thead th {
        box-sizing: border-box;
        padding: 0 12px;
        height: 47px;
        color: #909399;
        text-align: left;
        white-space: nowrap;
        border: 2px solid #EBEEF5;
        font-size: 14px;
        white-space: nowrap;
    }

    .DeviceTableStyle thead:hover {
        background-color: #F5F7FA;
    }

    .DeviceTableStyle tbody td {
        /* padding: 12px 0; */
        box-sizing: border-box;
        padding: 0 12px;
        height: 47px;
        color: #606266;
        white-space: nowrap;
        border: 2px solid #EBEEF5;
        white-space: nowrap;
    }

    .DeviceTableStyle tbody tr:hover {
        background-color: #F5F7FA;
    }

    .OptionTableStyle {
        position: absolute;
        right: -1px;
        top: 0;
        height: 100%;
        width: 100px;
        background-color: #fff;
        border-collapse: collapse;
        box-shadow: -1px 0px 5px #EBEEF5;
    }

    .OptionTableStyle thead th {
        box-sizing: border-box;
        padding: 0 12px;
        height: 47px;
        color: #909399;
        text-align: left;
        white-space: nowrap;
        border: 2px solid #EBEEF5;
        border-left: 0px;
    }

    .OptionTableStyle tbody td {
        /* padding: 12px 0; */
        box-sizing: border-box;
        padding: 0 12px;
        height: 47px;
        color: #606266;
        white-space: nowrap;
        font-size: 12px;
        border: 2px solid #EBEEF5;
        border-left: 0px;
    }
    .OptionTableStyle tbody td a {
        text-decoration: none;
        color: #0184FF;
    }

    .ChangeProject {
        /* height: 200px; */
        display: flex;
        flex-direction: column;
    }

    .ChangeProjectItem {
        height: 20px;
        line-height: 20px;
        font-size: 20px;
        margin-left: 20px;
        margin-top: 20px;
        color: #909399;
    }

    .ChangeProjectInputStyle {
        border: 1px solid #909399;
        height: 25px;
        margin-left: 20px;
        margin-right: 20px;
        margin-top: 10px;
        font-size: 15px;
        border-radius: 5px;
        outline: none;
        color: #757575;
        padding-left: 10px;
        padding-right: 10px;
    }

    .ChangeProjectInputStyle:focus {
        border: 1px solid #76ACFE;
    }
</style>