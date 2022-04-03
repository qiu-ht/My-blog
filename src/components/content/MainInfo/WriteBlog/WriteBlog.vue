<template>
  <div ref="blog" class="blogWrap">
      <center>
            <input type="text" placeholder="题目" class="blogtitle" v-model="blogTitle" ref="blogTitle">
            <select name="blogType" class="blogType" ref="blogType">
                <option value="artical">随笔</option>
                <option value="note">笔记</option>
            </select>
            <mavon-editor  
                class="blog"    
                v-model="blogContent" 
                :toolbars="toolbars" 
                ref="md"
                @save="saveContext" 
                @imgAdd="$imgAdd" 
                @imgDel="$imgDel"
            />
            
      </center>
        <span>{{tip}}</span>
      <div class="CoverImg">
          <input type="file" @change="uploadImg($event)">
          <span v-show="!imageSrc">添加封面图片</span>
          <i class="iconfont icon-tianjia" v-show="!imageSrc"></i>
          <img :src="imageSrc" alt="" v-show="imageSrc">
      </div>
      <span class="copyUrlTip">或者复制图片链接：</span>
      <input type="text" class="inputURL" v-model="imageSrc">
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
    name:'Blog',
    props:['title','content','type','isEdit','coverImg'],
    data() {
        return {
            blogTitle:'',
            blogContent:'',
            toolbars: {
              bold: true, // 粗体
              italic: true, // 斜体
              header: true, // 标题
              underline: true, // 下划线
              mark: true, // 标记
              superscript: true, // 上角标
              quote: true, // 引用
              ol: true, // 有序列表
              link: true, // 链接
              imagelink: true, // 图片链接
              help: true, // 帮助
              code: true, // code
              subfield: true, // 是否需要分栏
              fullscreen: true, // 全屏编辑
              readmodel: true, // 沉浸式阅读
              /* 1.3.5 */
              undo: true, // 上一步
              trash: true, // 清空
              save: true, // 保存（触发events中的save事件）
              /* 1.4.2 */
              navigation: true // 导航目录
            },
            imageSrc:'',
            tip:'',

        }
    },
    mounted(){
        if(this.isEdit){
            this.blogTitle = this.title
            this.blogContent = this.content
            this.imageSrc = this.coverImg
            setTimeout(()=>{
                const blogType = this.$refs.blogType
                const blogTitle = this.$refs.blogTitle
                blogType.value = this.type
                blogType.disabled = 'disabled'
                blogTitle.disabled = 'disabled'
                blogType.title = "不可修改"
                blogTitle.title = "不可修改"
            },0)
        }
    },
    methods:{
        async saveContext(){
            const success = (res,resMes)=>{
                if(res.data===resMes){
                    this.$message({
                        type:'success',
                        message:res.data
                    })
                    this.$router.push({path:'/'})
                }
            }
            
            if(this.isEdit){
                const data = {
                    blogTitle:this.blogTitle,
                    blogContent:this.blogContent,
                    type:this.blogType,
                    coverImg:this.imageSrc,
                    lastUpdateTime:this.publishDate
                }
                const res = await this.$api.artical.updateArtical(data)
                success(res,'修改成功！')
            }else{
                const data = {
                    blogTitle:this.blogTitle,
                    blogContent:this.blogContent,
                    publishDate:this.publishDate,
                    type:this.blogType,
                    coverImg:this.imageSrc
                }
                const res = await this.$api.artical.saveArtical(data)
                if(res.data==="保存成功！"){
                    success(res,'保存成功！')
                }else if(res.data==="文章标题不能为空！"){
                    this.$message.error('文章标题不能为空！')
                }else if(res.data==="封面不能为空！"){
                    this.$message.error("封面不能为空！")
                }
                
            }
        },
        $imgAdd(pos, $file){
           this.$api.file.uploadImage($file,'blogImage').then((res) => {
               this.$refs.md.$img2Url(pos, res.data.url);
           })
        },
        async $imgDel(pos){
            const url = pos[0].split('url=')[1].split('&')[0]
            const res = await this.$api.file.deleteImage({url:url})
            if(res.data==='删除成功！'){
                this.$message.success('删除成功！')
            }
        },
        async uploadImg(e){
            const files = e.target.files;
            if(files && files[0]) {
                if(this.imageSrc){
                    const url = this.imageSrc.split('url=')[1].split('&')[0]
                    const res = await this.$api.file.deleteImage({url:url})
                }
                const res = await this.$api.file.uploadImage(files[0],'blogImage')
                this.imageSrc = res.data.url
                
            }   
            
        }
    },
    computed:{
        publishDate(){
            return dayjs().format('YYYY-MM-DD HH:mm')
        },
        blogType(){
            return this.$refs.blogType.value
        }
    }
}
</script>

<style scoped lang="less">
    .blogWrap{
        width: 95%;
        margin: 0 auto;
        
        .blogtitle{
            width: 850px;
            height: 30px;
            border: none;
            border-radius: 3px;
            box-shadow: 0 0 5px rgb(228, 228, 228);
            margin-bottom: 15px;
            text-indent: 1em;
            float: left;
            &:focus{
                outline: none;
            }
        }
        .blogType{
            width: 100px;
            height: 30px;
            border-radius: 3px;
            border: none;
            text-align: center;
            float: right;
            margin-right: 10px;
            &:focus{
                outline: none;
            }
            option{
                border-radius: 0;
            }
        }
        .blog{
            min-width: 1000px !important; 
            min-height: 800px !important;
            
        }
        .CoverImg{
            height: 200px;
            width: 300px;
            background-color: #fff;
            color: rgb(187, 187, 187);
            text-align: center;
            margin-top: 30px;
            border-radius: 5px;
            position: relative;
            input{
                height: 200px;
                width: 300px;
                position: absolute;
                left: 0;
                opacity: 0;
                cursor: pointer;
            }
            img{
                height: 200px;
                width: 300px;
                
            }
            .icon-tianjia{
                line-height: 200px;
                
            }
        }
        .copyUrlTip{
            color: rgb(77, 77, 77);
            display: inline-block;
            margin-top: 10px;
            margin-bottom: 10px;
        }
        .inputURL{
            display: block;
            width: 300px;
            border: none;
            height: 30px;
            border-radius: 5px;
            &:focus{
                outline: none;
            }
        }
    }

    @media only screen and (min-width: 280px) and (max-width: 912px) {
        .blogWrap{
            left: 0;
            .blogtitle{
                width: 75%;
                margin-left: 2%;
                margin-right: 0;
                padding: 0;
            }
            .blogType{
                width: 20%;
                margin-right: 2%;
            }
            .blog{
                min-width: 100% !important; 
                min-height: 800px !important;
                
            }

        }
    }
</style>