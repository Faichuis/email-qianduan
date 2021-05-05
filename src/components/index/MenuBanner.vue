<template>
    <el-row class="tac">
        <el-col :span="12">
            <h5>默认颜色</h5>
            <el-menu
                    default-active="2"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose">
                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>导航一</span>
                    </template>
                    <el-menu-item-group>
                        <template slot="title">分组一</template>
                        <el-menu-item index="1-1">选项1</el-menu-item>
                        <el-menu-item index="1-2">选项2</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="分组2">
                        <el-menu-item index="1-3">选项3</el-menu-item>
                    </el-menu-item-group>
                    <el-submenu index="1-4">
                        <template slot="title">选项4</template>
                        <el-menu-item index="1-4-1">选项1</el-menu-item>
                    </el-submenu>
                </el-submenu>
                <el-menu-item index="2">
                    <i class="el-icon-menu"></i>
                    <span slot="title">导航二</span>
                </el-menu-item>
                <el-menu-item index="3" disabled>
                    <i class="el-icon-document"></i>
                    <span slot="title">导航三</span>
                </el-menu-item>
                <el-menu-item index="4">
                    <i class="el-icon-setting"></i>
                    <span slot="title">导航四</span>
                </el-menu-item>
            </el-menu>
        </el-col>
        <el-col :span="12">
            <h5>自定义颜色</h5>
            <el-menu
                    default-active="2"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b">
                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>导航一</span>
                    </template>
                    <el-menu-item-group>
                        <template slot="title">分组一</template>
                        <el-menu-item index="1-1">选项1</el-menu-item>
                        <el-menu-item index="1-2">选项2</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="分组2">
                        <el-menu-item index="1-3">选项3</el-menu-item>
                    </el-menu-item-group>
                    <el-submenu index="1-4">
                        <template slot="title">选项4</template>
                        <el-menu-item index="1-4-1">选项1</el-menu-item>
                    </el-submenu>
                </el-submenu>
                <el-menu-item index="2">
                    <i class="el-icon-menu"></i>
                    <span slot="title">导航二</span>
                </el-menu-item>
                <el-menu-item index="3" disabled>
                    <i class="el-icon-document"></i>
                    <span slot="title">导航三</span>
                </el-menu-item>
                <el-menu-item index="4">
                    <i class="el-icon-setting"></i>
                    <span slot="title">导航四</span>
                </el-menu-item>
            </el-menu>
        </el-col>
    </el-row>
</template>

<script>

    import Banner from './Banner'

    export default {
        data() {
            return {
                bannerMenuFlag: false,
                menuTimer: '',
                listInfoData: [],
                menus: [
                    {value: '写', url: 'https://www.mi.com/p/1915.html', type: 'phone'},
                    {value: '收', url: 'https://www.mi.com/a/h/9819.html', type: 'tv'},
                    {value: '搞', url: 'https://www.mi.com/a/h/7529.html', type: 'laptop'},
                    {value: '发', url: 'https://www.mi.com/p/9285.html', type: 'household'}
                ],
                banners: [
                    {
                        src: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/cefed8336bae62768afeeb6a3b8f55c8.jpg?w=2452&h=920',
                        url: 'https://www.mi.com/redminote7/'
                    },
                ],
                phone: [
                    {
                        name: 'Redmi Note 8 Pro',
                        src: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/e99f7f32923b2ef482338c08544000bb.png',
                        url: 'http://www.mi.com/redminote8pro'
                    }
                ],
                tv: [
                    {
                        name: '小米盒子',
                        src: 'https://cdn.cnbj0.fds.api.mi-img.com/b2c-mimall-media/554a4f8ea0c2c3ed19d843bea7321203.jpg',
                        url: 'https://search.mi.com/search_%E5%B0%8F%E7%B1%B3%E7%9B%92%E5%AD%90'
                    }
                ],
                laptop: [
                    {
                        name: '小米笔记本 15.6"',
                        src: 'https://cdn.cnbj0.fds.api.mi-img.com/b2c-mimall-media/d28f298362ba20046db1dbb0c8eb5e70.jpg',
                        url: 'https://search.mi.com/search_%E5%B0%8F%E7%B1%B3%E7%AC%94%E8%AE%B0%E6%9C%AC%2015.6'
                    }
                ],
                household: [
                    {
                        name: '米家立式空调',
                        src: 'https://cdn.cnbj0.fds.api.mi-img.com/b2c-mimall-media/96de94415b860f3de95b2d6294f0d0fd.png',
                        url: 'https://www.mi.com/aircondition-f/f3c1/'
                    }
                ]
            }
        },
        methods: {

            handleOpen(key, keyPath) {
            },
            handleClose(key, keyPath) {
            },

            xie() {
                window.console.log("123")
            },
            bannerMenuHide() {
                this.menuTimer = setTimeout(() => {
                    this.bannerMenuFlag = false;
                }, 300);
            },
            bannerMenuShow(type) {
                if (type) {
                    this.listInfoData = this[type];
                }

                this.bannerMenuFlag = true;
                clearTimeout(this.menuTimer);
            }
        },
        computed: {
            menuListMatch() {
                const matchData = [];
                if (this.listInfoData && this.listInfoData.length) {
                    for (let i = 0; i < this.listInfoData.length; i += 6) {
                        matchData.push(this.listInfoData.slice(i, i + 6));
                    }
                }
                return matchData;
            }
        },
        components: {
            // 'Banner': Banner
        }
    }
</script>

<style lang="less">
    .menu-banner {
        position: relative;
        width: 1226px;
        height: auto;
        margin: 0 auto;

        .menu-container {
            position: absolute;
            left: 0;
            top: 0;
            width: 235px;
            height: auto;
            background: rgba(0, 0, 0, 0.3);
            z-index: 10;
        }
    }

    .a-btn {
        display: inline;
        float: left;
    }

    .menu-list {
        padding: 20px 0;
        height: 420px;

        .list-item {
            display: flex;
            padding-left: 30px;

            &:hover {
                background-color: #ff6700;
            }

            a {
                position: relative;
                display: inline-block;
                width: 170px;
                height: 42px;
                line-height: 42px;
                color: #fff;
                text-align: left;
                background-color: transparent;
            }

            i {
                font-size: 22px;
                color: #e0e0e0;
                line-height: 42px;
            }
        }
    }

    .menu-info {
        position: absolute;
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        left: 235px;
        top: 0;
        z-index: 11;
        border: 1px solid #e0e0e0;
        box-shadow: 3px 8px 16px rgba(0, 0, 0, 0.18);

        .menu-info-list {
            width: 248px;
            height: 458px;
            margin: 0;
            padding: 0;
            list-style: none;
            background: #fff;

            a {
                display: flex;
                padding: 18px 20px;
                line-height: 40px;
                color: #333;

                img {
                    width: 40px;
                    height: 40px;
                    margin-right: 12px;
                    vertical-align: middle;
                }

                span {
                    width: 172px;
                    line-height: 40px;
                    font-size: 14px;
                    text-align: start;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                }

                &:hover {
                    span {
                        color: #ff6700;
                    }
                }
            }
        }
    }
</style>