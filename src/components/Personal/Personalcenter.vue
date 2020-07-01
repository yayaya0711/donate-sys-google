<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="信息查看" name="first">
      <table class="quickTable" id="rtable" width="500px" height="600px">
        <tr class="dataRow">
          <td width="250px" style="margin-top: 50px">用户账号：</td>
          <td width="250px" style="margin-top: 50px; margin-left: 200px">{{donor_info.Account}}</td>
        </tr>
        <tr class="dataRow">
          <td width="500px" style="margin-top: 100px">姓名：</td>
          <td width="500px" style="margin-top: 100px; margin-left: 200px">{{donor_info.Nickname}}</td>
        </tr>
        <tr class="dataRow">
          <td width="500px" style="margin-top: 150px">身份证号：</td>
          <td width="500px" style="margin-top: 150px; margin-left: 200px">{{donor_info.IdNumber}}</td>
        </tr>
        <tr class="dataRow">
          <td width="500px" style="margin-top: 200px">地址：</td>
          <td width="500px" style="margin-top: 200px; margin-left: 200px">{{donor_info.City}}</td>
        </tr>
        <tr class="dataRow">
          <td width="500px" style="margin-top: 250px">详细地址：</td>
          <td width="500px" style="margin-top: 250px; margin-left: 200px">
            <p>{{donor_info.CurResidence}}</p>
          </td>
        </tr>
        <tr class="dataRow">
          <td width="500px" style="margin-top: 250px">个人简介：</td>
          <td width="500px" style="margin-top: 250px; margin-left: 200px">
            <p>{{donor_info.Profile}}</p>
          </td>
        </tr>
      </table>
    </el-tab-pane>
<!--    <el-tab-pane label="信息修改" name="second">-->
<!--      <el-form ref="form" :model="form" label-width="100px">-->
<!--        <el-form-item label="用户账号：">-->
<!--          <el-col :span="6">-->
<!--            <el-input v-model="form.id"></el-input>-->
<!--          </el-col>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="姓名：">-->
<!--          <el-col :span="6">-->
<!--            <el-input v-model="form.name"></el-input>-->
<!--          </el-col>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="身份证号：">-->
<!--          <el-col :span="6">-->
<!--            <el-input v-model="form.ID"></el-input>-->
<!--          </el-col>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="地址：">-->
<!--          <el-col :span="6">-->
<!--            <el-select v-model="form.province" placeholder="请选择省份">-->
<!--              <el-option label="区域一" value="shanghai"></el-option>-->
<!--              <el-option label="区域二" value="beijing"></el-option>-->
<!--            </el-select>-->
<!--          </el-col>-->
<!--          <el-col :span="6" :offset="3">-->
<!--            <el-select v-model="form.city" placeholder="请选择城市">-->
<!--              <el-option label="区域一" value="shanghai"></el-option>-->
<!--              <el-option label="区域二" value="beijing"></el-option>-->
<!--            </el-select>-->
<!--          </el-col>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="详细地址">-->
<!--          <el-col :span="6">-->
<!--            <el-input type="textarea" v-model="form.address"></el-input>-->
<!--          </el-col>-->
<!--        </el-form-item>-->
<!--        <el-form-item>-->
<!--          <el-button type="primary" @click="onSubmit">立即创建</el-button>-->
<!--          <el-button>取消</el-button>-->
<!--        </el-form-item>-->
<!--      </el-form>-->
<!--    </el-tab-pane>-->
  </el-tabs>

</template>

<script>

import axios from "axios";

export default {
  name: 'Personalcenter',
  data() {
    return {
      form: {
        id: '',
        name: '',
        ID: '',
        province: '',
        city: '',
        address: '',
      },
      activeName: 'first',
      donor_info:{}
    };
  },
  created() {
    this.user_id = this.$route.params.user_id
    console.log('donor_info!',this.user_id)
    this.get_presonal_info_test()
    // this.getParams()
    console.log(this.donor_info)
  },
  methods: {
    get_presonal_info_test() {
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
      // this.proList = res.data.proList
      this.donor_info = res.data.donorInfo
      // this.donorHistory = res.data.donorHistory
    },
    get_personal_info() {
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
    getParams() {
      // 取到路由带过来的参数
      console.log('presonal center 准备数据中。。。。。',this.$route.params.jum)
      // 将数据放在当前组件的数据内
      this.donor_info = this.$route.params.jum
      console.log('数据已准备好！')
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    onSubmit() {
      console.log('submit!');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
