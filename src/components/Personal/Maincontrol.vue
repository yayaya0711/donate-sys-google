<template>
<div>
    <el-header>
      <div id="top">
        <MainTop v-bind:if_logo="true" v-bind:user_type="'0'"></MainTop>
      </div>
    </el-header>
	<el-aside width="30%">
	<el-menu v-on:select="handleSelect" :default-active="$route.path" router
                background-color="rgba(70, 76, 91, 1)" text-color="#ccc">
        <el-menu-item-group>
          <el-menu-item index="1-1">
		  	<router-link :to="{name: 'Love'}">爱心值</router-link>
		  </el-menu-item>
          <el-menu-item index="1-2">历史信息查询</el-menu-item>
		  <el-menu-item index="1-1">个人信息</el-menu-item>
          <el-menu-item index="1-2">捐赠意向提交</el-menu-item>
		  <el-menu-item index="1-1">消息列表</el-menu-item>
        </el-menu-item-group>
    </el-menu>
	</el-aside>
	<el-main>
	<router-view></router-view>
	</el-main>	
	<el-footer>
      <MainBottom></MainBottom>
    </el-footer>
</div>
</template>

<script>
import '../../assets/baseStyle.css'
import MainTop from "../MainTop";
import MainBottom from "../MainBottom";

export default {
  name: 'Maincontrol',
  components: {MainTop, MainBottom},
  data() {
	return{
	}
  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.findpassword{
				background-color: #F1F1F1;
	}
</style>
