<template>
  <div>
    个人中心
		    
    <van-nav-bar
      title="标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题"
      left-text="返回"
      right-text="按钮"
      left-arrow
    />

    <van-nav-bar title="标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题" left-text="返回" left-arrow>
      <van-icon name="ellipsis" slot="right" />
    </van-nav-bar>
    <div style="height: 200px">
    	<a href="http://www.baidu.com">测试跳转</a>
    </div>
    <van-cell-group style="margin-bottom: 2rem">
      <van-cell title="单元格" value="内容" is-link url="http://www.baidu.com" />
      <van-cell title="单元格" value="内容" label="描述信息" />
      <van-cell value="内容" icon="shop-o" is-link>
        <template slot="title">
          <span class="custom-text">单元格</span>
          <van-tag plain color="#7232dd" round type="danger">标签</van-tag>
        </template>
      </van-cell>
      <van-cell title="单元格" icon="location-o" is-link />
      <van-cell title="单元格">
        <van-icon slot="right-icon" name="search" class="custom-icon" />
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  data () {
    return {
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
