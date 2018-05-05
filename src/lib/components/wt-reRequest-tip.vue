<template>
    <div  class="tip" :style="styles">
        <div class="wapper">
            <div class="message">
                {{message}}
            </div>
			<el-button class="reLoadBtn" size="small" @click="clickHandler">{{reLoadBtnText}}</el-button>
        </div>
    </div>
</template>

<script>
    /*
     列表请求错误提示组件
     用法：
     <wt-re-request-tip
     :reLoad="function"
     :message="..."
     reLoadBtnText="..."
     :styles="'top:0;left:0;right:0;bottom:40px;'“>
     </wt-re-request-tip>
     */
    import Vue from 'vue'
    import ElementUI from 'element-ui'

    Vue.use(ElementUI);

    export default {
        name: 'wt-reRequest-tip',
        props:{
            // ajax接口用于查询数据的url
            message: {
                type: String,
                default:'获取失败！'
            },
            reLoadBtnText: {
                type: String,
                default:'点击重试'
            },
            reLoad:{
                type:Function,
                default:function(){}
            },
            styles:{
                type:String,
                default:"top:0;left:0;right:0;bottom:0px;"
            }
        },
        data() {
            return {

            }
        },
        methods:{
            clickHandler:function() {
                console.log(this.reLoad)
                this.reLoad && this.reLoad()
            }
        }
    }
</script>
<style scoped>
    .tip{
        position:absolute;
        z-index:999;
        background-color:rgba(255,255,255,0.9);
        text-align:center;
        display:inline-block;
        vertical-align:middle;
        font-size:18px;
    }
    .tip:before{
        content:'';
        display:inline-block;
        width:0;
        height:100%;
        vertical-align:middle;
    }
    .wapper{
        display:inline-block;
    }
    .message,.reLoadBtn{
        float:left;
    }
    .reLoadBtn{
        margin-left:14px;
        cursor:pointer;
    }
</style>