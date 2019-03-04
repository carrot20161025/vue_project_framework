<template>
  <div class="login-wrap flex-center">
    <div class="login-box flex flex-column">
    	<div class="logo mb50 flex-center">
    		<img src="http://placehold.it/200x200">
    	</div>
    	<div class="account flex flex-align-center mb50">
    		<img class="icon account-icon" src="@/assets/icons/loginIcons/shouji@2x.png">
    		<input type="tel" class="flex-1 ml20" name="tel" placeholder="手机号">
    	</div>
    	<div class="password flex flex-align-center mb50">
    		<img class="icon password-icon" src="@/assets/icons/loginIcons/mima@2x.png">
    		<input type="password" class="flex-1 ml20" name="pwd" placeholder="密码">
    	</div>
    	<div class="yanzhengma flex flex-align-center mb50">
    		<img class="icon yanzhengma-icon" src="@/assets/icons/loginIcons/yanzhengma@2x.png">
    		<input type="tel" class="flex-1 ml20" name="yzm" placeholder="验证码">
    		<img class="yanzhengma-pic ml20" src="http://placehold.it/52x40">
    	</div>
    	<div class="login flex-align-center mb10">
    		<button class="primary">登录</button>
    	</div>
    	<div class="other space-between">
    		<span>忘记密码？</span>
    		<span>点击注册</span>
    	</div>
    </div>
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
