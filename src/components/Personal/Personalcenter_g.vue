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
<!--        <el-form ref="form" :model="form" label-width="100px">-->
<!--          <el-form-item label="用户账号：">-->
<!--            <el-col :span="6"><el-input v-model="form.id"></el-input></el-col>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="法定代表人：">-->
<!--            <el-col :span="6"><el-input v-model="form.name"></el-input></el-col>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="身份证号：">-->
<!--            <el-col :span="6"><el-input v-model="form.ID"></el-input></el-col>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="所属区域：">-->
<!--            <el-col :span="6"><el-cascader-->
<!--							style="width:240px"-->
<!--							:options="options"-->
<!--							v-model="form.selectedOptions"-->
<!--							@change="handleChange2">-->
<!--					  </el-cascader></el-col>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="详细地址">-->
<!--            <el-col :span="6"><el-input type="textarea" v-model="form.address"></el-input></el-col>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="单位名称：">-->
<!--            <el-col :span="6"><el-input v-model="form.id"></el-input></el-col>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="单位类别：">-->
<!--            <el-col :span="6"><el-input v-model="form.id"></el-input></el-col>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="统一信用代码：">-->
<!--            <el-col :span="6"><el-input v-model="form.id"></el-input></el-col>-->
<!--          </el-form-item>-->
<!--          <el-form-item>-->
<!--            <el-button type="primary" @click="onSubmit">确认修改</el-button>-->
<!--            <el-button>取消</el-button>-->
<!--          </el-form-item>-->
<!--        </el-form>-->
<!--    </el-tab-pane>-->
  </el-tabs>

</template>

<script>
import { provinceAndCityData,CodeToText,TextToCode } from 'element-china-area-data';
import axios from 'axios'
var root_url = 'http://localhost:9090'
export default {
  name: 'Personalcenter_g',
  data() {
    return {
        options: provinceAndCityData,
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
    console.log(this.donor_info)
  },
  methods: {
    get_presonal_info_test() {
      var res = {
          "info": {
            "RecipientId": 2,
            "Account": "",
            "Password": "",
            "Name": "养老院a",
            "IdNumber": "123457",
            "Company": "养老院a",
            "ComCategory": "养老院",
            "CreditCode": "2",
            "ComAddress": "广州",
            "ComProfile": "good",
            "RecipientNum": 0
          },
          "msg": "查询成功",
          "proList": [
            {
              "RecAddress": "广州",
              "demandId": "2",
              "intro": "养老院a现需要电热毯，热水袋若干，为老人的冬天带来温暖",
              "materials": "电热毯：50；热水袋：50；保暖衣：100",
              "proName": "为老人献爱心"
            }
          ],
          "recipientInfo": {
            "category": "养老院",
            "com_address": "广州",
            "company": "养老院a",
            "creditCode": "2",
            "profile": "good",
            "recipientId": "2"
          },
          "status": 200
        }
      // this.proList = res.data.proList
      this.donor_info = res.info
      // this.donorHistory = res.data.donorHistory
    },
    get_personal_info() {
      //api请求方法
      let data = {"donor_id ": this.user_id};
      // axios.post(`${this.$url}/test/testRequest`,data)
      axios.post(root_url + `/donor/personalCenter`, data)
        .then(res => {
          console.log('res=>', res);
          if (res.status === 200) {
            //登陆成功，直接跳转到个人中心
            this.proList = res.proList
            this.donorInfo = res.donorInfo
            this.donorHistory = res.donorHistory
          } else {
            this.$message.error('获取信息失败~');
          }
        })
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
