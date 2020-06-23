<template>
<div style="width=100%">

    <el-divider></el-divider>
    <span>新增项目</span>
    <el-divider></el-divider>

	<div class="donate_block">
                
                <div>
					<el-row>
					<el-col :span="8"><p>项目名称:</p></el-col>
					<el-col :span="12"><el-input
                    placeholder="项目名称"
                    v-model="donate_msg">
                  	</el-input></el-col>
				  </el-row>

				  <el-divider></el-divider>

				<p class="demander_detail">
                  物资需求信息
                  <i class="el-icon-plus" style="color: crimson" @click="donateSuppliesFormVisible = true"></i>
                </p>
				<el-divider></el-divider>

					<el-row>
						<el-col :span="6"><p>物资</p></el-col>
						<el-col :span="6"><p>参数</p></el-col>
						<el-col :span="8"><p>数量</p></el-col>
						<el-col :span="4"><p>删除</p></el-col>
					</el-row>

                  <el-row v-for="(item,index) in supplies_list" :key="item.supply_id" class="supply_info">
                    <el-col :span="6" class="supply_item" style="line-height: 30px;text-align: center">
                      <p class="demander_detail">{{item.supply.name}}</p>
                    </el-col>
					<el-col :span="6" class="supply_item" style="line-height: 30px;text-align: center">
                      <p>{{item.rules}}</p>
                    </el-col>
                    <el-col :span="8" class="supply_item">
                      <el-input-number v-model="item.amount" @change="handleChange"
                                       :min="1" :max="item.supply.needy_amount" label="描述文字"
                                       :value="item.amount"></el-input-number>
                    </el-col>
                    <el-col :span="4" class="supply_item">
                      <i class="el-icon-delete" style="color: red" @click="openDelete(index)"></i>
                    </el-col>
                  </el-row>

				<el-divider></el-divider>
					<el-row>
				    <el-col :span="5"><p>详细地址</p></el-col>
				  	<el-cascader
							style="width:400px"
							:options="options"
							v-model="form.selectedOptions"
							@change="handleChange2">
					</el-cascader>
					</el-row>
					<el-row>
					<el-col :span="6":offset="9"><el-input
                    type="textarea"
                    :rows="4"
                    placeholder="详细地址"
                    v-model="donate_msg" style="width:400px">
                  </el-input></el-col></el-row>

				<el-divider></el-divider>

				<p>单位缩略图：</p>
				<el-upload
					ref="upload"
					action="#"
					accept="image/png,image/gif,image/jpg,image/jpeg"
					list-type="picture-card"
					:limit=limitNum
					:auto-upload="false"
					:on-exceed="handleExceed"
					:before-upload="handleBeforeUpload"
					:on-preview="handlePictureCardPreview"
					:on-remove="handleRemove">
					<i class="el-icon-plus"></i>
				</el-upload>
				<el-dialog :visible.sync="dialogVisible">
					<img width="100%" :src="dialogImageUrl" alt="">
				</el-dialog>
				<!--<el-button size="small" type="primary" @click="uploadFile">立即上传</el-button>
				<el-button size="small">取消</el-button>-->

				<el-divider></el-divider>

				<div style="margin-bottom: 3%;text-align: center">
                <el-button type="danger" round @click="gotoDonateFinished">确认提交</el-button>
              	</div>

                </div>

	<!--                弹窗-->
                <el-dialog title="添加捐赠物资" :visible.sync="donateSuppliesFormVisible">
                  <el-form :model="form">
                    <el-form-item label="物资名称" :label-width="formLabelWidth">
                      <el-select v-model="form.supply_id" placeholder="请选择" @change="selectSupply">
                        <el-option v-for="i in project_detail.demande_list.medical" :key="i.id" :label="i.name" :value="i.id"></el-option>
                        <el-option v-for="i in project_detail.demande_list.daliy" :key="i.id" :label="i.name" :value="i.id"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="规格信息" :label-width="formLabelWidth">
                      <el-input v-model="form.rules" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="捐赠数量" :label-width="formLabelWidth">
                      <el-input-number v-model="form.amount" @change="handleChange" :min="1" :max="form.supply.needy_amount" label="描述文字"></el-input-number>
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="close2">添加</el-button>
                  </div>
                </el-dialog>
              </div>

</div>
</template>

<script>
import { provinceAndCityData,CodeToText,TextToCode } from 'element-china-area-data';

export default {
  name: 'Setproject',
  data() {
    return {
		dialogImageUrl: '',
      dialogVisible: false,
      formLabelWidth: '80px',
      limitNum: 3,
		options: provinceAndCityData,
		project_detail: {
        demande_list: {
          medical: [
            {
              name: '口罩',
              id: '0200001',
            }
          ],
          daliy: [
            {
              name: '帐篷',
              id: '0200002',
            },
            {
              name: '被子',
              id: '0200003',
            }
          ]
        },
		},
      donate_msg:'',
      donateSuppliesFormVisible: false,
      supplies_list: [],
      form: {
        supply: {},
        supply_id:'',
        product: '',
        rules: '',
        amount: 0,
        add_identitfy:0,
      },
      formLabelWidth: '120px',
    }
},
created(){
    this.getParams()
    console.log(this.header_info)
},
methods:{
    getParams(){

    },
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
      this.form.add_identitfy = 1;
      this.addSupply();
    },
    close2(){
      this.form.add_identitfy = 2
      this.addSupply();
    },
    addSupply(){
      this.donateSuppliesFormVisible = false;
      this.supplies_list.push(this.form);
      // 初始化
      console.log(this.form);
      this.form = {
        supply: {},
        supply_id:'',
        product: '',
        rules: '',
        amount: 0,
        add_identitfy:0,
      }
      console.log(this.form);
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
        this.supplies_list.splice(index,1)
        console.log(this.supplies_list)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    gotoDonateFinished(){
    },
	handleChange2 (value) {
        console.log(value);
      },
	handleBeforeUpload(file){
      console.log('before')
      if(!(file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/jpg' || file.type === 'image/jpeg')) {
        this.$notify.warning({
          title: '警告',
          message: '请上传格式为image/png, image/gif, image/jpg, image/jpeg的图片'
        })
      }
      let size = file.size / 1024 / 1024 / 2
      if(size > 2) {
        this.$notify.warning({
          title: '警告',
          message: '图片大小必须小于2M'
        })
      }
    },
    // 文件超出个数限制时的钩子
    handleExceed(files, fileList) {

    },
    // 文件列表移除文件时的钩子
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    // 点击文件列表中已上传的文件时的钩子
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    uploadFile() {
      this.$refs.upload.submit()
    }
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
