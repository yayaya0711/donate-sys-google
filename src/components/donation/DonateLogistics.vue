<template>
  <div>
    <el-header>
      <MainTop :header_info="header_info"></MainTop>
    </el-header>
    <!--如果有物流信息则显示当前物流情况，如无，则输入物流信息-->
    <el-main style="width:1440px;background:#F1F1F1">
      <ProjectCard :project_detail="project_info"></ProjectCard>
      <el-row style="margin-top: 5%">
        <el-col :span="18" :offset="3">
          <div style="background: white;text-align: left">
            <div style="padding: 5%">
              <div v-if="if_logistics">
                <div>
                  <p class="demander_detail">物流进度</p>
                  <p class="demander_info">物流公司&nbsp;&nbsp;&nbsp;{{logistics.company}}</p>
                  <p class="demander_info">物流单号&nbsp;&nbsp;&nbsp;{{logistics.id}}</p>
                  <div class="block" style="padding: 5%">
                    <el-timeline>
<!--                      <el-timeline-item-->
<!--                        v-for="(activity, index) in logistics_info"-->
<!--                        :key="index"-->
<!--                        :icon="activity.icon"-->
<!--                        :type="activity.type"-->
<!--                        :color="activity.color"-->
<!--                        :size="activity.size"-->
<!--                        :timestamp="activity.AcceptTime">-->
                      <el-timeline-item v-for="(activity, index) in logistics_info"
                        :key="index" :timestamp="activity.AcceptTime">
                        {{activity.AcceptStation}}
                      </el-timeline-item>
                    </el-timeline>
                  </div>
                </div>

                <div style="margin-bottom: 3%;text-align: center">
                  <el-button type="danger" round @click="gotoPresonalCenter">进入个人中心</el-button>
                </div>
              </div>

              <div v-else="">
                <el-row style="text-align: center">
                  <div style="text-align: left;padding-bottom: 5%">
                    <p class="demander_detail">物流信息录入</p>
                  </div>
                  <p class="demander_info" >物流公司</p>
                  <el-autocomplete
                    class="inline-input"
                    v-model="logistics.company"
                    :fetch-suggestions="querySearch"
                    placeholder="请输入内容"
                    @select="handleSelect"
                  ></el-autocomplete>
                  <p class="demander_info">物流单号</p>
                  <el-input
                    placeholder="请输入物流单号"
                    v-model="logistics.id"
                    clearable style="width: auto">
                  </el-input>
                </el-row>

                <div style="padding: 3%;text-align: center">
                  <el-button type="danger" round @click="submitLogistics">提交物流信息</el-button>
                </div>
              </div>

            </div>
          </div>
        </el-col>
      </el-row>
    </el-main>
    <el-footer>
      <MainBottom></MainBottom>
    </el-footer>
  </div>
</template>

<script>
import MainTop from "../MainTop";
import MainBottom from "../MainBottom";
import SearchBar from "../SearchBar";
import ProjectCard from "../project/ProjectCard"

export default {
  components: {MainTop, MainBottom, SearchBar, ProjectCard},
  name: "DonateLogistics",
  data() {
    return {
      header_info:{
        height_line:-1,
        if_logo: false,
        user_type: '0', // 0 is donator, 1 is reciver
        if_show_navi:false
      },
      if_logistics: false,
      logistics: {
        company: '',
        id: ''
      },
      logistics_info: [
        {
          content: '支持使用图标',
          timestamp: '2018-04-12 20:46',
          size: 'large',
          type: 'primary',
          icon: 'el-icon-more'
        }, {
          content: '支持自定义颜色',
          timestamp: '2018-04-03 20:46',
          color: '#0bbd87'
        }, {
          content: '支持自定义尺寸',
          timestamp: '2018-04-03 20:46',
          size: 'large'
        }, {
          content: '默认样式的节点',
          timestamp: '2018-04-03 20:46'
        }],
      restaurants: [],
      state1: '',
      state2: ''
    }
  },
  created() {
    // this.getParams()
    // console.log(this.donater_info)
    this.get_logistics_info_test()
  },
  methods: {
    get_logistics_info_test(){
      var res = {
        "Traces": [
          {
            "AcceptStation": "深圳市横岗速递营销部已收件，（揽投员姓名：钟定基;联系电话：）",
            "AcceptTime": "2015-03-06 21:16:58"
          },
          {
            "AcceptStation": "离开深圳市 发往广州市",
            "AcceptTime": "2015-03-07 14:25:00"
          },
          {
            "AcceptStation": "到达广东速递物流公司广航中心处理中心（经转）",
            "AcceptTime": "2015-03-08 00:17:00"
          },
          {
            "AcceptStation": "离开广州市 发往北京市（经转）",
            "AcceptTime": "2015-03-08 01:15:00"
          },
          {
            "AcceptStation": "到达北京黄村转运站处理中心（经转）",
            "AcceptTime": "2015-03-09 09:01:00"
          },
          {
            "AcceptStation": "离开北京市 发往呼和浩特市（经转）",
            "AcceptTime": "2015-03-09 18:39:00"
          },
          {
            "AcceptStation": "到达  呼和浩特市 处理中心",
            "AcceptTime": "2015-03-10 18:06:00"
          },
          {
            "AcceptStation": "呼和浩特市邮政速递物流分公司金川揽投部安排投递（投递员姓名：安长虹;联系电话：18047140142）",
            "AcceptTime": "2015-03-11 09:53:48"
          }
        ],
        "msg": "查询成功",
        "state": "2",
        "status": 200
      }
      this.logistics_info = res.Traces
    },
    get_logistics_info(){
      var res = {
        "Traces": [
          {
            "AcceptStation": "深圳市横岗速递营销部已收件，（揽投员姓名：钟定基;联系电话：）",
            "AcceptTime": "2015-03-06 21:16:58"
          },
          {
            "AcceptStation": "离开深圳市 发往广州市",
            "AcceptTime": "2015-03-07 14:25:00"
          },
          {
            "AcceptStation": "到达广东速递物流公司广航中心处理中心（经转）",
            "AcceptTime": "2015-03-08 00:17:00"
          },
          {
            "AcceptStation": "离开广州市 发往北京市（经转）",
            "AcceptTime": "2015-03-08 01:15:00"
          },
          {
            "AcceptStation": "到达北京黄村转运站处理中心（经转）",
            "AcceptTime": "2015-03-09 09:01:00"
          },
          {
            "AcceptStation": "离开北京市 发往呼和浩特市（经转）",
            "AcceptTime": "2015-03-09 18:39:00"
          },
          {
            "AcceptStation": "到达  呼和浩特市 处理中心",
            "AcceptTime": "2015-03-10 18:06:00"
          },
          {
            "AcceptStation": "呼和浩特市邮政速递物流分公司金川揽投部安排投递（投递员姓名：安长虹;联系电话：18047140142）",
            "AcceptTime": "2015-03-11 09:53:48"
          }
        ],
        "msg": "查询成功",
        "state": "2",
        "status": 200
      }
      this.logistics_info = res.Traces
    },
    getParams() {
      // 取到路由带过来的参数
      console.log(this.$route.params)
      const routerParams = this.$route.params.jum
      console.log('准备数据中。。。。。')
      // 将数据放在当前组件的数据内
      this.donater_info = routerParams.donater_info;
      this.project_info = routerParams.project_info;
      this.header_info = routerParams.header_info
      console.log('数据已准备好！')
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    loadAll() {
      return [
        {"value": "邮政EMS", "address": "长宁区新渔路144号"},
        {"value": "申通快递", "address": "上海市长宁区淞虹路661号"},
        {"value": "中通速递", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113"},
        {"value": "圆通速递", "address": "天山西路438号"},
        {"value": "联通快递", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101"},
        {"value": "顺丰快递", "address": "上海市长宁区金钟路633号"},
        {"value": "联邦快递", "address": "上海市嘉定区曹安公路曹安路1685号"},
        {"value": "韵达快递", "address": "上海市普陀区同普路1435号"},
        {"value": "天天快递", "address": "上海市北翟路1444弄81号B幢-107"},
      ];
    },
    handleSelect(item) {
      console.log(item);
    },
    gotoPresonalCenter() {
      var test = window.sessionStorage.getItem('donor_info')
      var user_id = JSON.parse(test).donor_id
      this.$router.push("/Maincontrol/" + user_id);
    },
    submitLogistics(){
      console.log(this.logistics);
      // 如果提交成功则修改if_logistics
      this.if_logistics = true
    }
  },
  mounted() {
    this.restaurants = this.loadAll();
  }
}
</script>

<style scoped>
  .project_info > span {
    margin-right: 10px;
    text-align: center;
  }

  .demander_detail {
    font-size: 20px;
    line-height: 23px;
  }

</style>
