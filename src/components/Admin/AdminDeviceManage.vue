<template>
    <div style="height: 100%; width: 100%;  ">
        <!-- <h1>设备管理</h1> -->
        <div style="
                height: 30px;
                display: flex;
                justify-content: flex-start;
            ">
            <input type="text" name="" id="" class="InputStyle" placeholder="设备名称" />
            <input type="text" name="" id="" class="InputStyle" placeholder="规格" />
            <input type="text" name="" id="" class="InputStyle" placeholder="使用人" />
            <button class="el-icon-search SearchButtonStyle"></button>
        </div>
        <!-- <div></div> -->
        <div style="width: 100%; position: relative; background-color: #fff;">
            <div style="
            margin-top: 10px;
            overflow-x: auto;
            background-color: #fff;
            box-sizing: border-box;
            margin-right: 100px;
        ">
                <table class="DeviceTableStyle">
                    <thead>
                        <th style="min-width: 100px;">设备名称</th>
                        <th style="width: 150px;">规格</th>
                        <th style="width: 150px;">单价</th>
                        <th style="width: 150px;">购买日期</th>
                        <th style="width: 150px;">报废日期</th>
                        <th style="width: 150px;">使用人</th>
                        <th style="width: 150px;">是否入账</th>
                        <th style="width: 150px;">是否公开</th>
                    </thead>
                    <tbody>
                        <tr v-for="item in tableData.slice(tableDataStart,tableDataEnd)">
                            <td>{{item.deviceName}}</td>
                            <td>{{item.deviceSize}}</td>
                            <td>{{item.deviceprice}}</td>
                            <td>{{item.devicePurchaseData}}</td>
                            <td>{{item.devicePremiumData}}</td>
                            <td>{{item.deviceUser}}</td>
                            <td>{{item.deviceAmount}}</td>
                            <td>{{item.devicePublic}}</td>
                        </tr>
                        <tr v-for="item in FillData">
                            <td></td>
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
                    <tr tr v-for="item,index in tableData.slice(tableDataStart,tableDataEnd)">
                        <td v-bind:data-index = "tableDataStart+index">  
                            <el-button type="text" size="small" >编辑
                            </el-button>
                            <el-button type="text" size="small" >删除
                            </el-button>
                        </td>
                    </tr>
                    <tr v-for="item in FillData">
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
                tableLength: 0,
                FillData: 0,
                tableData: [
                    {
                        deviceName: "3D打印机",
                        deviceSize: "800*1000",
                        deviceprice: 8000,
                        devicePurchaseData: "2020-01-30",
                        devicePremiumData: "2025-11-30",
                        deviceUser: "Dreamtech",
                        deviceAmount: "是",
                        devicePublic: "是",
                    },
                    {
                        deviceName: "3D打印机",
                        deviceSize: "800*1000",
                        deviceprice: 8000,
                        devicePurchaseData: "2020-02-30",
                        devicePremiumData: "2025-10-30",
                        deviceUser: "Dreamtech",
                        deviceAmount: "是",
                        devicePublic: "是",
                    },
                    {
                        deviceName: "3D打印机",
                        deviceSize: "800*1000",
                        deviceprice: 8000,
                        devicePurchaseData: "2020-12-30",
                        devicePremiumData: "2025-12-30",
                        deviceUser: "Dreamtech",
                        deviceAmount: "是",
                        devicePublic: "是",
                    },
                    {
                        deviceName: "3D打印机",
                        deviceSize: "800*1000",
                        deviceprice: 8000,
                        devicePurchaseData: "2020-12-30",
                        devicePremiumData: "2025-12-30",
                        deviceUser: "Dreamtech",
                        deviceAmount: "是",
                        devicePublic: "是",
                    },
                    {
                        deviceName: "3D打印机",
                        deviceSize: "800*1000",
                        deviceprice: 8000,
                        devicePurchaseData: "2020-12-30",
                        devicePremiumData: "2025-12-30",
                        deviceUser: "Dreamtech",
                        deviceAmount: "是",
                        devicePublic: "是",
                    },
                    {
                        deviceName: "3D打印机",
                        deviceSize: "800*1000",
                        deviceprice: 8000,
                        devicePurchaseData: "2020-12-30",
                        devicePremiumData: "2025-12-30",
                        deviceUser: "Dreamtech",
                        deviceAmount: "是",
                        devicePublic: "是",
                    },
                    {
                        deviceName: "3D打印机",
                        deviceSize: "800*1000",
                        deviceprice: 8000,
                        devicePurchaseData: "2020-12-30",
                        devicePremiumData: "2025-12-30",
                        deviceUser: "Dreamtech",
                        deviceAmount: "是",
                        devicePublic: "是",
                    },
                    {
                        deviceName: "3D打印机",
                        deviceSize: "800*1000",
                        deviceprice: 8000,
                        devicePurchaseData: "2020-12-30",
                        devicePremiumData: "2025-12-30",
                        deviceUser: "Dreamtech",
                        deviceAmount: "是",
                        devicePublic: "是",
                    },
                    {
                        deviceName: "3D打印机",
                        deviceSize: "800*1000",
                        deviceprice: 8000,
                        devicePurchaseData: "2020-12-30",
                        devicePremiumData: "2025-12-30",
                        deviceUser: "Dreamtech",
                        deviceAmount: "是",
                        devicePublic: "是",
                    },
                    {
                        deviceName: "3D打印机",
                        deviceSize: "800*1000",
                        deviceprice: 8000,
                        devicePurchaseData: "2020-12-30",
                        devicePremiumData: "2025-12-30",
                        deviceUser: "Dreamtech",
                        deviceAmount: "是",
                        devicePublic: "是",
                    },
                    {
                        deviceName: "3D打印机",
                        deviceSize: "800*1000",
                        deviceprice: 8000,
                        devicePurchaseData: "2020-12-30",
                        devicePremiumData: "2025-12-30",
                        deviceUser: "Dreamtech",
                        deviceAmount: "是",
                        devicePublic: "是",
                    },
                    {
                        deviceName: "3D打印机",
                        deviceSize: "800*1000",
                        deviceprice: 8000,
                        devicePurchaseData: "2020-12-30",
                        devicePremiumData: "2025-12-30",
                        deviceUser: "Dreamtech",
                        deviceAmount: "是",
                        devicePublic: "是",
                    },
                    {
                        deviceName: "3D打印机",
                        deviceSize: "800*1000",
                        deviceprice: 8000,
                        devicePurchaseData: "2020-12-30",
                        devicePremiumData: "2025-12-30",
                        deviceUser: "Dreamtech",
                        deviceAmount: "是",
                        devicePublic: "是",
                    },
                    {
                        deviceName: "3D打印机",
                        deviceSize: "800*1000",
                        deviceprice: 8000,
                        devicePurchaseData: "2020-12-30",
                        devicePremiumData: "2025-12-30",
                        deviceUser: "Dreamtech",
                        deviceAmount: "是",
                        devicePublic: "是",
                    },
                    {
                        deviceName: "3D打印机",
                        deviceSize: "800*1000",
                        deviceprice: 8000,
                        devicePurchaseData: "2020-12-30",
                        devicePremiumData: "2025-12-30",
                        deviceUser: "Dreamtech",
                        deviceAmount: "是",
                        devicePublic: "是",
                    },
                    {
                        deviceName: "3D打印机",
                        deviceSize: "800*1000",
                        deviceprice: 8000,
                        devicePurchaseData: "2020-12-30",
                        devicePremiumData: "2025-12-30",
                        deviceUser: "Dreamtech",
                        deviceAmount: "是",
                        devicePublic: "是",
                    },
                ],
            };
        },
        methods: {
            handleCurrentChange(value) {
                console.log(value);
                this.tableDataStart = (value - 1) * this.PageSize;
                this.tableDataEnd = value * this.PageSize;
                if (this.tableData.length < this.tableDataEnd) {
                    this.FillData = this.tableDataEnd - this.tableData.length;
                }
                else {
                    this.FillData = 0;
                }
            },
            handleSizeChange(value) {
                console.log(value);
            }
        }
    };
</script>
<style scoped>
    *{
        padding: 0;
    }
    .InputStyle {
        /* float: left; */
        /* flex-wrap: wrap; */
        /* flex-grow: 1; */
        box-sizing: border-box;
        border: 1px solid #ebeef5;
        height: 30px;
        width: 200px;
        min-width: 100px;
        border-radius: 5px;
        padding-left: 20px;
        padding-right: 20px;
        font-size: 14px;
        line-height: 30px;
        outline: none;
        margin-right: 20px;
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
</style>