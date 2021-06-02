<template>
    <el-row class="tac">
        <el-col :span="4">
            <el-menu :default-active="activeNum" class="el-menu-vertical-demo" unique-opened active-text-color="#409EFF">

                <el-menu-item index="1" @click="clickBtn(1)">
                    <div slot="title">写</div>
                </el-menu-item>

                <el-menu-item index="2" @click="clickBtn(2)">
                    <span slot="title">收</span>
                </el-menu-item>

                <el-menu-item index="3" @click="clickBtn(3)">
                    <span slot="title">稿</span>
                </el-menu-item>

                <el-menu-item index="4" @click="clickBtn(4)">
                    <span slot="title">发</span>
                </el-menu-item>

            </el-menu>
        </el-col>
        <el-col :span="16">
            <div>
                <Write v-if="activeNum ==='1'"></Write>
                <Receive v-if="activeNum ==='2'"></Receive>
                <Manual v-if="activeNum ==='3'"></Manual>
                <Send v-if="activeNum ==='4'"></Send>
            </div>
        </el-col>

    </el-row>

</template>

<script>

    import Write from './Write'
    import Receive from './Receive'
    import Send from './Send'
    import Manual from './Manual'

    export default {

        components: {
            Write,Receive,Send,Manual
        },

        data() {
            return {
                activeNum:'1',
            }
        },

        methods: {
            clickBtn(num){
                let s = num.toString();
                this.activeNum = s;
            }
        }
    }
</script>

<style lang="less">
    .tac {
        height: 50px;
        line-height: 80px;

        .el-row {
            height: 80px;
        }
    }

    .el-menu-item {
        // min-height: 120px!important;
        // height:calc(100vh - 0px);
        text-align: center;
        min-height: 200px;
        _height: auto !important;
        height: 200px;
        font-size: 30px;
        line-height: 200px;
    }
</style>
