<template>
    <div>
        <nav-header></nav-header>
        <menu-banner></menu-banner>
        <router-view></router-view>
    </div>
</template>

<script>

    import NavHeader from './../components/NavHeader'
    import MenuBanner from './../components/index/MenuBanner'

    export default {

        name: 'nav-home',

        components: {
            NavHeader,
            MenuBanner
        }
    }
</script>