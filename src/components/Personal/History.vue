<template>
<div style="width:100%">
    <el-divider></el-divider>
    <span>搜索条件</span>
    <el-divider></el-divider>
    <el-row :gutter="30">
    <el-col :span="4"><el-input v-model="input_project_name" placeholder="请输入项目名称"></el-input></el-col>
    <el-col :span="4"><el-input v-model="input_supply_type" placeholder="请输入物资类型"></el-input></el-col>
    <el-col :span="3">审核状态：</el-col>
    <el-col :span="4">
      <el-select v-model="audit_status" placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
      </el-select>
    </el-col>
    <el-col :span="3">物流状态：</el-col>
    <el-col :span="4">
      <el-select v-model="logistics_status" placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
      </el-select>
    </el-col>
    </el-row>

    <el-divider></el-divider>
    <span>历史捐赠信息</span>
    <el-divider></el-divider>

    <table class="quickTable" style="width: 100%;font-size: 14px">
			<tr class="dataRow">
				<td width="10%"><p><b>编号</b></p></td>
				<td width="20%"><p><b>项目名称</b></p></td>
				<td width="20%"><p><b>项目缩略图</b></p></td>
				<td width="20%"><p><b>物资类型</b></p></td>
				<td width="10%"><p><b>审核状态</b></p></td>
				<td width="10%"><p><b>物流状态</b></p></td>
				<td width="10%"><p><b>操作</b></p></td>
			</tr>
      <tr>
        <td colspan="7"><el-divider></el-divider><td/>
      </tr>
			<tr class="dataRow" v-for="i in donor_history" :key="i">
				<td width="10%"><p>{{i.TargetId}}</p></td>
				<td width="20%"><p>{{i.MatchPro}}</p></td>
				<td width="20%"><img src="../../assets/hospital.jpg" width="100px" height="100px"/></td>
				<td width="20%"><p>{{i.DonateMaterials}}</p></td>
				<td width="10%">
          <p v-if="i.IfAudit===1">审核通过</p>
          <p v-else-if="i.IfAudit===0">待审核</p>
          <p v-else-if="i.IfAudit===2">审核未通过</p>
        </td>
				<td width="10%"><p>已发出</p></td>
				<td width="10%">
        <a href="#" style="margin-top: -30px;text-decoration: none;color:green;">
								填写物流编号</a>
        <p></p>
        <p style="text-decoration: none;color:green;" @click="gotoFindpassword()">
								查看项目进度</p></td>
			</tr>
		</table>
</div>

</template>

<script>

import axios from "axios";

export default {
  name: 'History',
  data() {
	return{
    input_project_name:'',
    input_supply_type:'',
    audit_status:'',
    logistics_status:''
	}
  },created() {
    this.user_id = this.$route.params.user_id
    console.log('loading histroy center', this.user_id)
    // this.getParams()
    this.get_history_info_test()

  },
  methods: {
    get_history_info_test() {
      var res = {
        donor_id: 2,
        data: {
          "donorHistory": [
            {
              "TargetId": 2,
              "DonorId": 2,
              "Category": 2,
              "DonateMaterials": "电热毯：20",
              "IfStandard": 1,
              "IfAudit": 1,
              "DonateTime": "2020-06-29T16:20:58.177748+08:00",
              "MatchPro": 2,
              "IfAnonymous": 0,
              "Message": "要开心"
            },
            {
              "TargetId": 3,
              "DonorId": 2,
              "Category": 3,
              "DonateMaterials": "蜡笔：10",
              "IfStandard": 1,
              "IfAudit": 1,
              "DonateTime": "2020-06-29T16:21:02.502261+08:00",
              "MatchPro": 3,
              "IfAnonymous": 0,
              "Message": "快快乐乐！"
            }
          ],
          "donorInfo": {
            "DonorID": 2,
            "Account": "123457",
            "Password": "111",
            "Nickname": "bob",
            "Name": "bob",
            "IdNumber": "123457",
            "CurResidence": "湖南长沙",
            "City": "长沙",
            "Avatar": "",
            "LoveValue": "100",
            "Profile": ""
          },
          "msg": "查询成功",
          "proList": [
            {
              "materials": "电热毯：50；热水袋：50；保暖衣：100",
              "proId": "2",
              "proIntro": "养老院a现需要电热毯，热水袋若干，为老人的冬天带来温暖",
              "proName": "为老人献爱心",
              "rec_donation_num": "2"
            },
            {
              "materials": "水彩笔：30套；蜡笔：30套；画本：100本",
              "proId": "3",
              "proIntro": "给自闭症儿童一只展现自己的画笔",
              "proName": "孩子们的是艺术道路",
              "rec_donation_num": "1"
            }
          ],
          "status": 200
        }
      }
      this.proList = res.data.proList
      // this.donorInfo = res.data.donorInfo
      this.donor_history = res.data.donorHistory
    },
    get_history_info() {
      //api请求方法
      let data = {"donor_id ": this.user_id};
      // axios.post(`${this.$url}/test/testRequest`,data)
      axios.post(root_url + `/donor/personalCenter`, data)
        .then(res => {
          console.log('res=>', res);
          if (res.status === '200') {
            //登陆成功，直接跳转到个人中心
            this.proList = res.proList
            this.donorInfo = res.donorInfo
            this.donorHistory = res.donorHistory
          } else {
            this.$message.error('获取信息失败~');
          }
        })
    },
    gotoFindpassword() {
      //直接跳转到找回密码
      this.$router.push('/checkproject');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
