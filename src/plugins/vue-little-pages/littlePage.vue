<template>
    <div class="little-page-container" 
        ref="pagebox"
        @touchstart="handleTouchStart"
        @touchend="handleTouchEnd"
        @touchmove="handleTouchMove"
    >
        <div class="page-list"
            :style="listStyle"
        >
            <slot>
            </slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'little-page',
    props:{
        time: {
            type: Number,
            default: 600,
        }
    },
    data () {
        return {
                pageNum: 1,  //页数
                itemHeight: 0,  //每页、视窗高度
                position: 1,  //显示滑动到的第几页
                pointChange: 0,  //touchmove滑动的
            }
    },
    provide(){  //provide也可以作为一个对象进行使用.
        return {
            "littlePage" : this.$data
        }
    },
    mounted(){
        this.initPages();
        window.addEventListener('resize',()=> {
            setTimeout(()=>{
                this.setHeight();
            })
        });
        this.$nextTick(()=>{
            this.setHeight();
        })
    },
    computed:{
        //长列表位置控制
        listStyle(){
            let style = {
                height: this.itemHeight*this.pageNum+'px',
            }
            if(this.pointChange != 0 ){
                //拖动效果
                style.top = this.pageNum == this.position && this.pointChange < 0 || this.position == 1 && this.pointChange > 0 ? 
                            -this.itemHeight*(this.position-1)+'px' 
                            : -this.itemHeight*(this.position-1)+ this.pointChange +'px';
                style.transition = "top 0ms ease";
            }else{
                //滚动翻页效果
                style.top = -this.itemHeight*(this.position-1)+'px';
                style.transition = `top ${this.time}ms ease`;
            }
            return style
        },
        itemStyle(){
            return {
                height: this.itemHeight + "px"
            }
        }
    },
    methods: {
        initPages(){
            this.getItem();
            this.setHeight();
        },
        //设置每页高度
        setHeight(){
            this.itemHeight = this.$refs.pagebox.offsetHeight;
        },
         //获取page个数
        getItem() {
            let get = this.$slots.default.filter(item => {
                return item.tag != undefined;
            });
            this.pageNum = get.length;
        },
        //滑动开始 获取开始位置
        handleTouchStart: function(e){
            this.startPoint = e.touches[0].pageY;
        },
        //滑动中 页面跟随滑动
        handleTouchMove: function(e){
            let poChange = e.changedTouches[0].pageY - this.startPoint;
            this.pointChange = poChange
        },
        //滑动结束 获取结束位置
        handleTouchEnd: function(e){
            let end = e.changedTouches[0].pageY;
            let start = this.startPoint;
            let delta = start - end;
            let goDown = 0;
            if(delta > 10){
                goDown = 1;
            }else if(delta < -10){
                goDown = -1;
            }
            this.changeItem(goDown);
        },
        //页面滑动 down 正 往下 负 往上
        changeItem: function(down){
            const { position, pageNum } = this;
            this.pointChange = 0;
            if(down > 0 && position >= 1 && position < pageNum ){ //往下滑
                this.position = position + 1;
            }else if(down < 0 && position > 1 && position <= pageNum ){  //往上滑
                this.position = position - 1;
            }
        },
    },
}
</script>
<style type="text/css" scoped> 
.little-page-container{
    height: 100%;
    width: 100%;
    background: transparent;
    overflow: hidden;
    position: relative;
    
}
.little-page-container .page-list{
    position: absolute;
    width: 100%;
}
</style>