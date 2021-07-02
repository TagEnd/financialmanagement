<template>
    <div style="height: 100%; width: 100%">
        <!-- <h1>设备管理</h1> -->
        <div style="height: 30px; display: flex; justify-content: flex-start">
            <input
                type="text"
                name=""
                id=""
                class="InputStyle"
                placeholder="项目名称"
                v-model="InputProjectTitle"
            />
            <button
                class="el-icon-search SearchButtonStyle"
                v-on:click="SearchButtonClick"
            ></button>
            <button
                class="SearchButtonStyle"
                style="
                    width: auto;
                    font-size: 15px;
                    padding: 0 10px;
                    background-color: #409eff;
                    color: #fff;
                "
                @click="SubProjectInformation()"
            >
                新建项目
            </button>
        </div>
        <!-- <div></div> -->
        <div style="width: 100%; position: relative; background-color: #fff">
            <div
                style="
                    margin-top: 10px;
                    overflow-x: auto;
                    background-color: #fff;
                    box-sizing: border-box;
                    margin-right: 100px;
                "
            >
                <table class="DeviceTableStyle">
                    <thead>
                        <th style="min-width: 100px">项目名称</th>
                        <th style="width: 200px">项目编号</th>
                        <th style="width: 200px">所属用户工号</th>
                        <th style="width: 150px">项目总金额</th>
                        <th style="width: 150px">项目份额</th>
                        <th style="width: 150px">已使用项目份额</th>
                        <th style="width: 150px">剩余份额</th>
                    </thead>
                    <tbody>
                        <tr
                            v-for="item in tableData.slice(
                                tableDataStart,
                                tableDataEnd
                            )"
                        >
                            <td>{{ item.projectName }}</td>
                            <td>{{ item.projectId }}</td>
                            <td>{{ item.userId }}</td>
                            <td>{{ item.totalAmount }}</td>
                            <td>{{ item.projectShare }}</td>
                            <td>{{ item.projectUseShare }}</td>
                            <td>{{ item.projectRemainShare }}</td>
                        </tr>
                        <tr v-for="item in FillData">
                            <td></td>
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
            <table class="OptionTableStyle">
                <thead>
                    <th>操作</th>
                </thead>
                <tbody>
                    <tr
                        tr
                        v-for="(item, index) in tableData.slice(
                            tableDataStart,
                            tableDataEnd
                        )"
                    >
                        <td v-bind:data-index="tableDataStart + index">
                            <!-- <el-button type="text" size="small"  v-bind:data-index = "tableDataStart+index" @click="EditProjectInformation(data-index, tableData)">编辑
                            </el-button> -->
                            <a
                                href="javascript:;"
                                v-bind:data-index="tableDataStart + index"
                                style="margin-right: 15px"
                                @click="
                                    EditProjectInformation(
                                        tableDataStart + index,
                                        tableData
                                    )
                                "
                                >编辑</a
                            >
                            <a
                                href="javascript:;"
                                v-bind:data-index="tableDataStart + index"
                                @click="
                                    RemoveProjectInformation(
                                        tableDataStart + index,
                                        tableData
                                    )
                                "
                                >删除</a
                            >
                        </td>
                    </tr>
                    <tr v-for="item in FillData">
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>

        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="PageSize"
            layout="prev, pager, next, jumper"
            :total="tableData.length"
            style="text-align: right; margin-top: 3px"
        >
        </el-pagination>
        <el-dialog
            title="修改项目信息"
            :visible.sync="ChangeFormVisible"
            width="600px"
            lock-scroll
            top="40px"
        >
            <div class="ChangeProject">
                <span class="ChangeProjectItem" style="margin-top: 0px"
                    >项目编号</span
                >
                <input
                    type="text"
                    class="ChangeProjectInputStyle"
                    readonly="readonly"
                    v-model:value="ChangeProjectInformation.projectId"
                />
                <span class="ChangeProjectItem">所属用户工号</span>
                <input
                    type="text"
                    class="ChangeProjectInputStyle"
                    readonly="readonly"
                    v-model:value="ChangeProjectInformation.userId"
                />
                <span class="ChangeProjectItem">项目名称</span>
                <input
                    type="text"
                    class="ChangeProjectInputStyle"
                    v-model:value="ChangeProjectInformation.projectName"
                />
                <span class="ChangeProjectItem">项目总金额</span>
                <input
                    type="text"
                    class="ChangeProjectInputStyle"
                    v-model:value="ChangeProjectInformation.totalAmount"
                />
                <span class="ChangeProjectItem">项目份额</span>
                <input
                    type="text"
                    class="ChangeProjectInputStyle"
                    v-model:value="ChangeProjectInformation.projectShare"
                />
                <span class="ChangeProjectItem">已使用项目份额</span>
                <input
                    type="text"
                    class="ChangeProjectInputStyle"
                    v-model:value="ChangeProjectInformation.projectUseShare"
                />
                <span class="ChangeProjectItem">剩余份额</span>
                <input
                    type="text"
                    class="ChangeProjectInputStyle"
                    v-model:value="ChangeProjectInformation.projectRemainShare"
                />
            </div>
            <div slot="footer" class="dialog-footer">
                <!-- ChangeFormVisible = false -->
                <el-button style="padding: 5px" @click="CanacelProjectChange()"
                    >取 消</el-button
                >
                <el-button
                    type="primary"
                    style="padding: 5px"
                    @click="DetermineProjectChange()"
                    >确 定</el-button
                >
            </div>
        </el-dialog>
        <el-dialog
            title="新建项目"
            :visible.sync="AddFormVisible"
            width="600px"
            lock-scroll
            top="40px"
        >
            <div class="ChangeProject">
                <!-- <span class="ChangeProjectItem" style="margin-top: 0px;">项目编号</span>
                <input type="text" class="ChangeProjectInputStyle" 
                    v-model:value="AddProjectInformation.projectId"> -->
                <span class="ChangeProjectItem" style="margin-top: 0px"
                    >所属用户工号</span
                >
                <input
                    type="text"
                    class="ChangeProjectInputStyle"
                    v-model:value="AddProjectInformation.userId"
                />
                <span class="ChangeProjectItem">项目名称</span>
                <input
                    type="text"
                    class="ChangeProjectInputStyle"
                    v-model:value="AddProjectInformation.projectName"
                />
                <span class="ChangeProjectItem">项目总金额</span>
                <input
                    type="text"
                    class="ChangeProjectInputStyle"
                    v-model:value="AddProjectInformation.totalAmount"
                />
                <span class="ChangeProjectItem">项目份额</span>
                <input
                    type="text"
                    class="ChangeProjectInputStyle"
                    v-model:value="AddProjectInformation.projectShare"
                />
                <span class="ChangeProjectItem">已使用项目份额</span>
                <input
                    type="text"
                    class="ChangeProjectInputStyle"
                    v-model:value="AddProjectInformation.projectUseShare"
                />
                <span class="ChangeProjectItem">剩余份额</span>
                <input
                    type="text"
                    class="ChangeProjectInputStyle"
                    v-model:value="AddProjectInformation.projectRemainShare"
                />
            </div>
            <div slot="footer" class="dialog-footer">
                <!-- ChangeFormVisible = false -->
                <el-button style="padding: 5px" @click="CanacelProjectAdd()"
                    >取 消</el-button
                >
                <el-button
                    type="primary"
                    style="padding: 5px"
                    @click="DetermineProjectAdd()"
                    >确 定</el-button
                >
            </div>
        </el-dialog>
        <el-dialog
            title="删除项目"
            :visible.sync="DelFormVisible"
            width="600px"
            lock-scroll
            top="40px"
        >
            <div
                style="
                    margin-top: 0px;
                    line-height: 20px;
                    height: 20px;
                    font-size: 15px;
                "
            >
                确定要删除该项目吗？
            </div>
            <div class="ChangeProject">
                <span
                    style="
                        padding-left: 20px;
                        margin-top: 10px;
                        line-height: 20px;
                        height: 20px;
                        font-size: 15px;
                    "
                    >项目编号：{{ DelProjectInformation.projectId }}</span
                >
                <span
                    style="
                        padding-left: 20px;
                        margin-top: 10px;
                        line-height: 20px;
                        height: 20px;
                        font-size: 15px;
                    "
                    >项目名称：{{ DelProjectInformation.projectName }}</span
                >
            </div>
            <div slot="footer" class="dialog-footer">
                <!-- ChangeFormVisible = false -->
                <el-button style="padding: 5px" @click="CanacelProjectDel()"
                    >取 消</el-button
                >
                <el-button
                    type="primary"
                    style="padding: 5px"
                    @click="DetermineProjectDel()"
                    >确 定</el-button
                >
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data() {
        return {
            w1: "",
            tableDataStart: 0,
            tableDataEnd: 12, // tableDataEnd PageSize同步修改
            PageSize: 12,
            currentPage: 1,
            needNewComputer: 1,
            tableLength: 0,
            FillData: 0,
            CopyTableData: [],
            InputProjectTitle: "",
            // 需要修改的项目信息
            ChangeProjectInformation: {
                projectName: "",
                projectShare: "",
                projectUseShare: "",
                totalAmount: "",
                projectRemainShare: "",
                projectId: "",
                userId: "",
            },
            // 需要增加的项目信息
            AddProjectInformation: {
                projectName: "",
                projectShare: "",
                projectUseShare: "",
                totalAmount: "",
                projectRemainShare: "",
                projectId: "",
                userId: "",
            },
            DelProjectInformation: {
                projectName: "",
                projectShare: "",
                projectUseShare: "",
                totalAmount: "",
                projectRemainShare: "",
                projectId: "",
                userId: "",
            },
            ChangeFormVisible: false, // 修改弹窗
            AddFormVisible: false, // 新增弹窗
            DelFormVisible: false,
            formLabelWidth: "120px",
            tableData: [],
        };
    },
    async created() {
        const { data: result } = await this.$http.get(
            "/api/project/getProjectShare"
        );
        console.log("AdminProjectQuota");
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
            return this.$message({
                message: "数据获取成功",
                type: "success",
                duration: 1000,
            });
        } else {
            return this.$message({
                message: "数据获取失败",
                type: "error",
                duration: 1000,
            });
        }
        // this.tableData = result.data.data.list;
    },
    methods: {
        CheckInputContent(obj) {
            if (obj.projectId == "") {
                alert("项目编号不能为空");
                return false;
            } else if (obj.userId == "") {
                alert("项目所属工号不能为空");
                return false;
            } else if (obj.projectName == "") {
                alert("项目名称不能为空");
                return false;
            } else if (obj.projectShare == "") {
                alert("项目份额不能为空");
                return false;
            } else if (obj.totalAmount == "") {
                alert("项目总金额不能为空");
                return false;
            } else if (obj.projectUseShare == "") {
                alert("已使用项目份额不能为空");
                return false;
            } else if (obj.projectRemainShare == "") {
                alert("剩余份额不能为空");
                return false;
            } else {
                return true;
            }
        },
        CheckInputContent2(obj) {
            if (obj.projectName == "") {
                alert("项目名称不能为空");
                return false;
            } else if (obj.userId == "") {
                alert("项目所属工号不能为空");
                return false;
            } else if (obj.projectShare == "") {
                alert("项目份额不能为空");
                return false;
            } else if (obj.totalAmount == "") {
                alert("项目总金额不能为空");
                return false;
            } else if (obj.projectUseShare == "") {
                alert("已使用项目份额不能为空");
                return false;
            } else if (obj.projectRemainShare == "") {
                alert("剩余份额不能为空");
                return false;
            } else {
                return true;
            }
        },
        EditProjectInformation(index, rows) {
            this.ChangeProjectInformation = JSON.parse(
                JSON.stringify(rows[index])
            );
            this.ChangeFormVisible = true;
        },
        RemoveProjectInformation(index, rows) {
            this.DelProjectInformation = JSON.parse(
                JSON.stringify(rows[index])
            );
            this.DelFormVisible = true;
        },
        SubProjectInformation() {
            this.AddFormVisible = true;
        },
        CanacelProjectChange() {
            this.ChangeFormVisible = false;
            this.ChangeProjectInformation = JSON.parse(JSON.stringify({}));
        },
        CanacelProjectAdd() {
            this.AddFormVisible = false;
            this.AddProjectInformation = JSON.parse(JSON.stringify({}));
        },
        CanacelProjectDel() {
            this.DelFormVisible = false;
            this.DelProjectInformation = JSON.parse(JSON.stringify({}));
        },
        async DetermineProjectChange() {
            if (!this.CheckInputContent(this.ChangeProjectInformation)) {
                return;
            }
            const { data: result } = await this.$http.post(
                "/api/project/alterProjectShare/" +
                    this.ChangeProjectInformation.projectId,
                this.ChangeProjectInformation
            );
            console.log("修改信息");
            console.log(result);
            if (result.code == 200) {
                this.GetProjectInformation();
                this.ChangeProjectInformation = JSON.parse(JSON.stringify({}));
            } else {
                this.$message({
                    message: "修改信息失败",
                    type: "error",
                    duration: 1000,
                });
            }
            this.ChangeFormVisible = false;
        },
        async DetermineProjectAdd() {
            if (!this.CheckInputContent2(this.AddProjectInformation)) {
                console.log("同步");
                return;
            } else {
                const { data: CheckRes } = await this.$http.get(
                    "/api/user/getUserInfoById",
                    {
                        params: {
                            userId: this.AddProjectInformation.userId,
                        },
                    }
                );
                console.log("检查信息");
                console.log(CheckRes);
                if (CheckRes.code == 200) {
                    const { data: result } = await this.$http.post(
                        "/api/project/addProjectShare",
                        this.AddProjectInformation
                    );
                    console.log("添加信息");
                    console.log(result);
                    if (result.code == 200) {
                        this.GetProjectInformation();
                        this.AddProjectInformation = JSON.parse(
                            JSON.stringify({})
                        );
                    } else {
                        this.AddProjectInformation = JSON.parse(
                            JSON.stringify({})
                        );
                        this.$message({
                            message: "添加信息失败",
                            type: "error",
                            duration: 1000,
                        });
                    }
                    this.AddFormVisible = false;
                } else {
                    this.$message({
                        message: "所属用户工号不存在",
                        type: "error",
                        duration: 1000,
                    })
                }

                
            }
        },
        async DetermineProjectDel() {
            const { data: result } = await this.$http.delete(
                "/api/project/deleteProjectShare/" +
                    this.DelProjectInformation.projectId
            );
            console.log("删除信息");
            console.log(result);
            if (result.code == 200) {
                this.GetProjectInformation();
                this.DelProjectInformation = JSON.parse(JSON.stringify({}));
            } else {
                this.$message({
                    message: "删除信息失败",
                    type: "error",
                    duration: 1000,
                });
            }
            this.DelFormVisible = false;
        },
        async GetProjectInformation() {
            const { data: result } = await this.$http.get(
                "/api/project/getProjectShare"
            );
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
                return this.$message({
                    message: "数据更新成功",
                    type: "success",
                    duration: 1000,
                });
            } else {
                return this.$message({
                    message: "数据获取失败",
                    type: "error",
                    duration: 1000,
                });
            }
        },
        SearchButtonClick() {
            // console.log(this.CopyTableData);
            console.log(this.tableData);
            console.log(this.InputProjectTitle);
            // this.$set(this.currentPage, 1);
            if (this.InputProjectTitle == "") {
                this.currentPage = 1;
                this.needNewComputer++;
                this.tableData = JSON.parse(JSON.stringify(this.CopyTableData));
                return;
            }
            this.tableData.splice(0, this.tableData.length);
            // console.log(this.tableData);
            for (let i = 0; i < this.CopyTableData.length; i++) {
                if (
                    this.CopyTableData[i].projectName.indexOf(
                        this.InputProjectTitle,
                        0
                    ) != -1
                ) {
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
        },
    },
    watch: {
        currentPage: function (NewValue) {
            // console.log('currentPage');
            this.tableDataStart = (NewValue - 1) * this.PageSize;
            this.tableDataEnd = NewValue * this.PageSize;
            console.log(this.tableData.length);
            if (this.tableData.length < this.tableDataEnd) {
                this.FillData = this.tableDataEnd - this.tableData.length;
            } else {
                this.FillData = 0;
            }
        },
        needNewComputer: function (value) {
            console.log("needNewComputer");
            this.tableDataStart = (this.currentPage - 1) * this.PageSize;
            this.tableDataEnd = this.currentPage * this.PageSize;
            // 填充行数
            console.log(this.tableData.length);
            if (this.tableData.length < this.tableDataEnd) {
                this.FillData = this.tableDataEnd - this.tableData.length;
            } else {
                this.FillData = 0;
            }
        },
        tableDataEnd: function (val) {
            console.log("监听");
            console.log(val);
        },
    },
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
    border: 2px solid #ebeef5;
    font-size: 14px;
    white-space: nowrap;
}

.DeviceTableStyle thead:hover {
    background-color: #f5f7fa;
}

.DeviceTableStyle tbody td {
    /* padding: 12px 0; */
    box-sizing: border-box;
    padding: 0 12px;
    height: 47px;
    color: #606266;
    white-space: nowrap;
    border: 2px solid #ebeef5;
    white-space: nowrap;
}

.DeviceTableStyle tbody tr:hover {
    background-color: #f5f7fa;
}

.OptionTableStyle {
    position: absolute;
    right: -1px;
    top: 0;
    height: 100%;
    width: 100px;
    background-color: #fff;
    border-collapse: collapse;
    box-shadow: -1px 0px 5px #ebeef5;
}

.OptionTableStyle thead th {
    box-sizing: border-box;
    padding: 0 12px;
    height: 47px;
    color: #909399;
    text-align: left;
    white-space: nowrap;
    border: 2px solid #ebeef5;
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
    border: 2px solid #ebeef5;
    border-left: 0px;
}
.OptionTableStyle tbody td a {
    text-decoration: none;
    color: #0184ff;
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
    border: 1px solid #76acfe;
}
</style>