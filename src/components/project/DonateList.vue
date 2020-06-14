<template>
  <div>
    <el-header>
      <MainTop v-bind:if_logo="true" v-bind:user_type="'0'"></MainTop>
    </el-header>
    <SearchBar></SearchBar>
    <el-main style="width:1440px;background:#F1F1F1">
      <el-row>
        <el-col :span="12" :offset="3">
          <div style="background: white;height: 270px">
            <el-row>
              <el-col :span="12">
                <div style="width: 90%;margin: 5%;text-align:center;vertical-align:middle;">
                  <img src='https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg' class="image" style="width: 100%;height:60%">
                </div>
              </el-col>
              <el-col :span="12">
                <div style="margin: 5%;">
                  <div class="need_staff" style="text-align: left">
                    <p class="project_name">{{project_detail.name}}</p>
                    <p class="project_info">
                      <span>
                        <i class="el-icon-location" style="color: red"></i>
                        {{project_detail.place}}
                      </span>
                    </p>
                    <p class="project_info">
                      <span>{{'发起方： '+project_detail.demander.name}}</span>
                    </p>
                    <p class="project_info">
                      <span>
                        紧急度：
                        <i v-for="i in project_detail.emergency" :key="i" class="el-icon-star-on" style="color: red"></i>
                      </span>
                    </p>
                    <p class="project_info">
                      <span>{{"参与度： "+project_detail.receive_times +" 人次"}}</span>
                    </p>
                    <li v-for="(item,idx) in needy_list" style="color: crimson;line-height: 20px">
                      <span>{{item[0]+': '+ item[1]+' '+ item[2]}}</span>
                    </li>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="6">
          <div style="background: white;height: 270px"></div>
        </el-col>
      </el-row>
      <el-row  style="margin-top: 5%">
        <el-col :span="18" :offset="3">
          <div style="background: white;text-align: left">
            <div style="padding: 5%">
              <div class="donate_block">
                <p class="demander_detail" >受赠方信息</p>
                <p class="demander_info">捐赠项目&nbsp;&nbsp;&nbsp;{{project_detail.name}}</p>
                <p class="demander_info">受赠机构&nbsp;&nbsp;&nbsp;{{project_detail.demander.name}}</p>
                <p class="demander_info">负责人姓名&nbsp;&nbsp;&nbsp;{{project_detail.demander.contace_name}}</p>
                <p class="demander_info">联系方式&nbsp;&nbsp;&nbsp;{{project_detail.demander.contact_tel}}</p>
                <p class="demander_info">联系地址&nbsp;&nbsp;&nbsp;{{project_detail.place}}</p>
              </div>

              <div class="donate_block">
                <p class="demander_detail" >捐赠方信息</p>
                <p class="demander_info">捐赠方姓名&nbsp;&nbsp;&nbsp;{{project_detail.demander.contace_name}}</p>
                <p class="demander_info">联系方式&nbsp;&nbsp;&nbsp;{{project_detail.demander.contact_tel}}</p>
                <p class="demander_info">身份证号&nbsp;&nbsp;&nbsp;{{project_detail.place}}</p>
                <p class="demander_info">是否匿名捐赠&nbsp;&nbsp;
                  <el-switch
                    v-model="if_anonymous"
                    active-color="#ff4949"
                    inactive-color="#C0CCDA">
                  </el-switch>
                </p>
              </div>

              <div class="donate_block">
                <p class="demander_detail">
                  捐赠物资信息
                  <i class="el-icon-plus" style="color: crimson" @click="donateSuppliesFormVisible = true"></i>
                </p>

<!--                弹窗-->
                <el-dialog title="添加捐赠物资" :visible.sync="donateSuppliesFormVisible">
                  <el-form :model="form">

                    <el-form-item label="物资名称" :label-width="formLabelWidth">
                      <el-select v-model="form.supply_id" placeholder="请选择" @change="selectSupply">
                        <el-option v-for="i in project_detail.demande_list.medical" :key="i.id" :label="i.name" :value="i.id"></el-option>
                        <el-option v-for="i in project_detail.demande_list.daliy" :key="i.id" :label="i.name" :value="i.id"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="厂家信息" :label-width="formLabelWidth">
                      <el-input v-model="form.product" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="规格信息" :label-width="formLabelWidth">
                      <el-input v-model="form.rules" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="捐赠数量" :label-width="formLabelWidth">
                      <el-input-number v-model="form.amount" @change="handleChange" :min="1" :max="form.supply.needy_amount" label="描述文字"></el-input-number>
                    </el-form-item>
                    <el-form-item v-if="form.supply.if_need_identify">
                      <el-upload
                        class="upload-demo"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :file-list="form.img_info"
                        list-type="picture">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                      </el-upload>
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="close1">不验证只添加</el-button>
                    <el-button type="primary" @click="close2">验证并添加</el-button>
                  </div>
                </el-dialog>
              </div>

              <div>
                <p class="demander_detail">爱心寄语</p>
                <p class="demander_info">
                  <el-input
                    type="textarea"
                    :rows="4"
                    placeholder="请输入内容"
                    v-model="donate_msg">
                  </el-input>
                </p>
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

export default {
  components: {MainTop, MainBottom,SearchBar},
    name: "DonateList",
  data () {
    return {
      project_detail: {
        id: '0100001',
        name: '武汉体育中心',
        place: '湖北省武汉市XXX区EEE街道',
        demander: {
          name: '湖北红十字',
          contace_name:"谷小红",
          contact_tel:"123456789",
          description: '湖北红十字会致力于公益事业，巴拉巴拉巴拉巴拉，湖北红十字会致力于公益事业',
        },
        receive_times: '1975',
        emergency: 4,
        needy_group: '新冠医护人员基本需求',
        demande_list: {
          medical: [
            {
              name: '口罩',
              id: '0200001',
              type: 'CN95',
              needy_amount: 2000,
              demander_amount: 10000,
              scal: '个',
              rules: 'WWWWWWWWWWWWWWWWWWW',
              img_url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
              if_need_identify:1,
            }
          ],
          daliy: [
            {
              name: '帐篷',
              id: '0200002',
              type: '----',
              needy_amount: 200,
              demander_amount: 500,
              scal: '顶',
              if_need_identify:0,
            },
            {
              name: '被子',
              id: '0200003',
              type: '1.5m',
              needy_amount: 200,
              demander_amount: 500,
              scal: '床',
              if_need_identify:0,
            }
          ]
        },
        donate_footprint: [{
          user: "user1",
          id: '0300001',
          time: "2020年2月20日",
          message: "今生无悔如华夏，来生还做中华家。因为你们，支撑起万千中华儿女的信念。加油，同时也要保护好自己~",
          things: "被子4床，口罩20个"
        },
          {
            user: "user2",
            id: '0300002',
            time: "2020年2月7日",
            message: "",
            things: "口罩40个"
          },
          {
            user: "user3",
            id: '0300003',
            time: "2020年2月8日",
            message: "",
            things: "口罩100个"
          }
        ]

      },
      needy_list: [
        ['口罩', '1000', '个'],
        ['帐篷', '200', '顶'],
        ['被子', '200', '床']
      ],
      user_info:{
        name:'李粒粒',
        tel:"987654321",
        id:"433333333333333333"
      },
      if_anonymous:false,
      donate_msg:'',
      donateSuppliesFormVisible: false,
      supplies_info: [],
      form: {
        supply: {},
        supply_id:'',
        product: '',
        rules: '',
        amount: 0,
        img_info:[{
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        },
          {
            name: 'food2.jpeg',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          }]
      },
      formLabelWidth: '120px',
      add_identitfy:0,
    }
    },
  methods: {
    handleChange(value) {
      console.log(value);
      console.log(this._data)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(fileList);
    },
    selectSupply(value){
      var i;
      // console.log(this.project_detail.demande_list.medical[0]);
      for(i of this.project_detail.demande_list.medical){
        if(i.id === value){
          this.form.supply = i;
        }
      }
      for(i of this.project_detail.demande_list.daliy){
        if(i.id === value){
          this.form.supply = i;
        }
      }
    },
    close1(){
      this.donateSuppliesFormVisible = false;
      this.add_identitfy = 1
    },
    close2(){
      this.donateSuppliesFormVisible = false;
      this.add_identitfy = 2
    }
  }
}
</script>

<style scoped>
  .project_name{
    font-size: 20px;
    line-height: 26px;
    color: crimson;
  }
  .project_info{
    font-size: 12px;
    line-height: 12px;
    color: gray;
  }
  .project_info > span{
    margin-right: 10px;
  }
  .demander_detail{
    font-size: 20px;
    line-height: 23px;
  }
  .donate_block{
    border-bottom: 1px solid gray;
  }
</style>
