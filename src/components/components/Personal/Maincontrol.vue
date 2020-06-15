<template>
<div>
    <el-header>
      <div id="top">
        <MainTop v-bind:if_logo="true" v-bind:user_type="'0'"></MainTop>
      </div>
    </el-header>
    <el-main>
  <div class= "maincontrol">
	<div style="width: 2000px; height: 70px; background-color: white">
		<div style="float: left; width: 800px; height: 70px; padding-left: 60px; padding-top: 200px">
			<h2>个人中心</h2>
		</div>
		<div style="float: left; padding-top: 25px;">
			<a href="#" style="color:red; text-decoration: none; height: 70px; width: 200px; padding-left: 1000px">退出登陆</a>
		</div>
	</div>
	</div>	
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
	*{margin: 0;padding: 0;position: absolute},
	.findpassword{
				background-color: #F1F1F1;
	}
</style>
