<template>
  <div>
    <el-header>
      <MainTop :header_info="header_info"></MainTop>
    </el-header>
    <SearchBar :navi_info="navi_info"></SearchBar>
    <el-main style="width:1440px;background:#F1F1F1">
      <ProjectCard :project_detail="project_detail"></ProjectCard>
      <el-row style="margin-top: 5%">
        <el-col :span="18" :offset="3">
          <div style="background: white;text-align: left">
            <div style="padding: 5%">
              <div class="donate_block">
                <p class="demander_detail">受赠方信息</p>
                <p class="demander_info">捐赠项目&nbsp;&nbsp;&nbsp;{{project_detail.proName}}</p>
                <p class="demander_info">受赠机构&nbsp;&nbsp;&nbsp;{{recipient.company}}</p>
                <p class="demander_info">负责人姓名&nbsp;&nbsp;&nbsp;{{recipient.name}}</p>
                <p class="demander_info">联系方式&nbsp;&nbsp;&nbsp;{{recipient.phone}}</p>
                <p class="demander_info">联系地址&nbsp;&nbsp;&nbsp;{{recipient.com_address}}</p>
              </div>

              <div class="donate_block">
                <p class="demander_detail">捐赠方信息</p>
                <p class="demander_info">捐赠方姓名&nbsp;&nbsp;&nbsp;{{donor.name}}</p>
                <p class="demander_info">联系方式&nbsp;&nbsp;&nbsp;{{donor.phone}}</p>
                <p class="demander_info">身份证号&nbsp;&nbsp;&nbsp;{{donor.id_number}}</p>
                <p class="demander_info">是否匿名捐赠&nbsp;&nbsp;
                  <span v-if="if_anonymous">是，我是雷锋&nbsp;</span>
                  <span v-else>实名捐赠&nbsp;</span>
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
                <div>
                  <el-row v-for="(item,index) in supplies_list" :key="item.supply_id" class="supply_info">
                    <el-col :span="4" class="supply_item" style="line-height: normal">
                      <img :src="item.img_info[0].url" style="width: 100%">
                    </el-col>
                    <el-col :span="8" class="supply_item" style="line-height: 30px;text-align: left">
                      <p class="demander_detail">{{item.supply.name}}</p>
                      <p>{{item.rules}}</p>
                    </el-col>
                    <el-col :span="6" class="supply_item">
                      <el-input-number v-model="item.amount" @change="handleChange"
                                       :min="1" :max="item.supply.needy_amount" label="描述文字"
                                       :value="item.amount"></el-input-number>
                    </el-col>
                    <el-col :span="3" class="supply_item">
                      <i v-if="item.identitfy" class="el-icon-check" style="color: green">已验证</i>
                      <i v-else class="el-icon-close" style="color: red">未验证</i>
                    </el-col>
                    <el-col :span="3" class="supply_item">
                      <i class="el-icon-edit" @click="editSupplyInfo(index)" style="margin-right: 10%"></i>
                      <i class="el-icon-delete" style="color: red" @click="openDelete(index)"></i>

                    </el-col>
                  </el-row>
                </div>

                <!--                弹窗-->
                <el-dialog title="添加捐赠物资" :visible.sync="donateSuppliesFormVisible">
                  <el-form :model="form" :rules="from_rules" ref="form">
                    <el-form-item label="物资名称" :label-width="formLabelWidth" prop="name">
                      <el-select v-model="form.supply_id" placeholder="请选择" @change="selectSupply">
                        <el-option v-for="(i,index) in project_detail.materials" :key="index" :label="i.split('：')[0]"
                                   :value="i.split('：')[0]"
                                   :disabled="typeof i.if_select!='undefined' && i.if_select"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item v-if="project_detail.category==='0'" prop="rules"
                                  label="规格标准" :label-width="formLabelWidth">
                      <el-input v-model="form.rules" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="捐赠数量" :label-width="formLabelWidth">
                      <el-input-number v-model="form.amount" @change="handleChange" :min="1" :max="form.max_amount"
                                       label="描述文字"></el-input-number>
                    </el-form-item>
                    <el-form-item label="" :label-width="formLabelWidth">
                      <el-upload
                        class="upload-demo"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :on-preview="handlePreview"
                        :on-success="handleUploadSuccess"
                        :on-remove="handleRemove"
                        :file-list="form.img_info"
                        list-type="picture">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                      </el-upload>
                    </el-form-item>
                    <el-form-item label="" :label-width="formLabelWidth">
                      <el-button type="primary" @click="identifySupply('form')">物资验证</el-button>
                      <i v-if="form.identitfy" class="el-icon-check" style="color: green"></i>
                      <i v-else class="el-icon-close" style="color: red"></i>
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="closeNoAdd">取消</el-button>
                    <el-button type="primary" @click="closeAdd">添加</el-button>
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
              <div style="margin-bottom: 3%;text-align: center">
                <el-button type="danger" round @click="gotoDonateFinished">捐赠单</el-button>
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
import axios from "axios";

export default {
  components: {MainTop, MainBottom, SearchBar, ProjectCard},
  name: "DonateList",
  data() {
    return {
      header_info: {
        height_line: -1,
        if_logo: false,
        user_type: '0', // 0 is donator, 1 is reciver
        if_show_navi: false
      },
      navi_info: {
        if_searchBar: false,
        navi_list: [
          {name: '首页', path: '/'},
          {name: '项目列表', path: '/projectList'},
          {name: '项目详情', path: '/projectList/projectDetail'}
        ],
        now_place: '定向捐赠单填写'
      },
      // donateList_info_response:{},
      recipient: {},
      donor: {},
      if_anonymous: false,
      donate_msg: '',
      donateSuppliesFormVisible: false,
      supplies_list: [],
      form: {
        supply: {},
        supply_id: '',
        supply_type: '',
        rules: '',
        amount: 0,
        img_info: [{
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        },],
        identitfy: false,
      },
      from_rules: {
        name: [
          {required: true, message: '请选择物资', trigger: 'change'},
        ],
        rules: [
          {required: true, message: '请输入物资规格', trigger: 'blur'},
          {min: 5, message: '长度在 大于 5 个字符', trigger: 'blur'}
        ],
      },
      formLabelWidth: '120px',
      uploadDisabled: false,
      project_detail: {}
    }
  },
  created() {
    this.user_id = this.$route.params.user_id
    this.pro_id = this.$route.params.pro_id
    var test = window.sessionStorage.getItem('donor_info')
    console.log('donate list this.donor_info', test)

    this.project_detail = JSON.parse(window.sessionStorage.getItem('pro_detail'))

    this.get_donate_list_test()
    var test = this.project_detail.materials.split('；')
    this.project_detail.materials = test
    // this.donor.if_anonymous=false

    this.navi_info.navi_list.pop()
    this.navi_info.navi_list.push({
      name: this.project_detail.proName,
      path: '/projectList/projectDetail/' + this.pro_id
    })
    console.log('donate list this.navi_info', this.navi_info)


  },
  methods: {
    get_donate_list_test() {
      var res = {
        "donor": {
          "id_number": "123456",
          "name": "alice",
          "phone": "123456"
        },
        "msg": "返回成功",
        "recipient": {
          "com_address": "北京",
          "company": "医院a",
          "name": "医院a",
          "phone": "123456"
        },
        "status": 200
      }

      this.donor = res.donor
      this.recipient = res.recipient

    },
    get_donate_list() {
      //api请求方法
      let data = {"donor_id ": this.user_id, "recipient_id": this.project_detail.demander_id};
      axios.post(root_url + `/donor/donateList`, data)
        .then(res => {
          console.log('res=>', res);
          if (res.status === 200) {
            //登陆成功，直接跳转到个人中心
            this.donor = res.donor
            this.recipient = res.recipient
          } else {
            this.$message.error('获取信息失败~');
          }
        })
    },
    handleChange(value) {
      console.log(value);
      console.log(this._data)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
      this.uploadDisabled = false;
    },
    handlePreview(file) {
      this.form.img_info.push({name: 'test', url: file.url})
      console.log('this.form.img_info', this.form.img_info);
      // this.dialogVisible = true;
      this.uploadDisabled = true;
      console.log(fileList);
    },
    //上传成功
    handleUploadSuccess(file) {
      var dialogImageUrl = file.result; //专区logoId
      this.uploadDisabled = true;
      console.log('this.form.dialogImageUrl', dialogImageUrl);

    },
    selectSupply(value) {
      var i;
      // console.log(this.project_detail.demande_list.medical[0]);
      for (i of this.project_detail.materials) {
        if (i.split('：')[0] === value) {
          this.form.supply = i;
        }
      }
    },
    closeNoAdd() {
      this.donateSuppliesFormVisible = false;
    },
    closeAdd(formName) {

      this.donateSuppliesFormVisible = false;
      this.supplies_list.push(this.form);
      this.noteSelect(this.form.supply.id, true)
      // 初始化
      console.log(this.form);
      this.form = {
        supply: {},
        supply_id: '',
        product: '',
        rules: '',
        amount: 0,
        img_info: [{
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }],
        identitfy: false,
      }


    },
    noteSelect(value, t) {
      var i;
      for (i of this.project_detail.materials) {
        if (i.split('：')[0] === value) {
          i.if_select = t
        }
      }
      // for(i of this.project_detail.demande_list.daliy){
      //   if(i.id === value){
      //     i.if_select = t
      //   }
      // }
    },
    editSupplyInfo(index) {
      // 修改添加的物资信息
      console.log('this is edit supply function~')
      console.log(this.supplies_list[index])
      this.donateSuppliesFormVisible = true
      this.form = this.supplies_list[index]
      // this.noteSelect(this.supplies_list[index].id,false)
      // this.supplies_list.splice(index,1)
      console.log(this.supplies_list)
    },
    openDelete(index) {
      this.$confirm('此操作将永久删除该物资, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        console.log(this.supplies_list[index])
        this.noteSelect(this.supplies_list[index].id, false)
        this.supplies_list.splice(index, 1)
        console.log(this.supplies_list)

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    identifySupply(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
          console.log('This is identify supply fuction')
          this.form.identitfy = true
          console.log(this.form);
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    gotoDonateFinished() {
      // 验证：
      var finished = false
      //登陆验证
      // 1.是否未添加物资
      if (this.supplies_list.length === 0) {
        finished = false
        this.$message.error('请先添加物资~');
      }
      // 2.是否有未验证的信息
      else {
        for (var i of this.supplies_list) {
          if (i.identitfy) {
            finished = true
          } else {
            finished = false
            this.$message.error('请先完成验证~');
            break
          }
        }
      }
      // 所有验证判断通过
      if (finished) {
        // 合并数据
        var request_data = {}
        this.$set(request_data, 'donater_info', this.user_info)
        this.$set(request_data, 'demander_info', this.project_detail.demander)
        this.$set(request_data, 'project_info', this.project_detail)
        this.$set(request_data, 'supplies_info', this.supplies_list)
        this.$set(request_data, 'donate_msg', this.donate_msg)
        this.$set(request_data, 'header_info', this.header_info)
        console.log(request_data)
        // 跳转
        this.$router.push({
          name: '定向捐赠单填写完成',
          // name: 'mallList',
          params: {jum: request_data}
        });
      }

    },
    post_donate_list_test(){

    },
    post_donate_list(){
      //api请求方法
      let data = {
        "donor_id ": this.user_id,
        "recipient_id": this.project_detail.demander_id
      };
      axios.post(root_url + `/donor/donateList`, data)
        .then(res => {
          console.log('res=>', res);
          if (res.status === 200) {
            //登陆成功，直接跳转到个人中心
            this.donor = res.donor
            this.recipient = res.recipient
          } else {
            this.$message.error('获取信息失败~');
          }
        })
    },
  }
}
</script>

<style scoped>
  .project_info > span {
    margin-right: 10px;
  }

  .demander_detail {
    font-size: 20px;
    line-height: 23px;
  }

  .donate_block {
    border-bottom: 1px solid gray;
  }

  .supply_info {
    background: #F1F1F1;
    margin: 2%;
  }

  .supply_item {
    padding: 1%;
    line-height: 100px;
    text-align: center;
  }
</style>
