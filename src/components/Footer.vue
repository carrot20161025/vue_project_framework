<template>
  <div class="wj-footer">
     <mt-tabbar v-model="selected" :fixed="true">
      <mt-tab-item :key="'footer' + index" :id="index" v-for="(item,index) in footerList">
        <img slot="icon" :src="selected == index ? item.activeIcon : item.defaultIcon">
        {{item.title}}
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<script>
export default {
  // props:['footerList'],
  props: {
    //底部列表
    footerList: {
      type: Array,
      default: []
    },
    //当前索引
    currentTab: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      selected: 0,
    }
  },
  methods:{
    
  },
  created() {
    this.selected = this.currentTab;
  },
  mounted() {
    
  },
  watch:{
    selected(val) {
      let { footerList , $router } = this;
      
      let find = footerList[val];
      if(find) {
        $router.push({
          path:find.path,
          query:find.query
        })
      }
    },
    currentTab(val) {
      this.selected = val;
    }
  }
}

</script>
<style lang='less'>
   .wj-footer .is-selected {
      background: transparent !important;
   }
</style>
