<template>
  <div class="index-page"> 
    <menu-banner></menu-banner>
  </div>
</template>

<script> 
import MenuBanner from '../components/index/MenuBanner' 

export default {
  data () {
    return {}
  },
  components: { 
    'MenuBanner': MenuBanner, 
  }
}
</script>

<style lang="less">
  .index-page {
    .gray-page {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: auto;
      background-color: #f5f5f5;
    }
  }
</style>