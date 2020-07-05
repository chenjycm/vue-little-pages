<template>
    <div class="swiper-container" 
        ref="swiperbox"
        @touchstart="handleTouchStart"
        @touchend="handleTouchEnd"
        @touchmove="handleTouchMove"
    >
        <div class="swiper-list"
            :style="listStyle"
        >
            <slot :itemHeight="itemHeight">
            </slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'little-swiper',
    data () {
        return {
                pageNum: 1,  //页数
                itemHeight: 0,  //每页、视窗高度
                position: 1,  //显示滑动到的第几页
                pointChange: 0,  //touchmove滑动的
            }
    },
    inheritAttrs: false,
    mounted(){
        this.getItem();
        this.itemHeight = this.$refs.swiperbox.offsetHeight;  //设置每页高度
        window.onresize =  ()=> {
            this.getHeight();
        };
        this.$nextTick(()=>{
            this.getHeight();
        })
    },
    computed:{
        listStyle(){
            let style = {
                height: this.itemHeight*this.pageNum+'px',
            }
            if(this.pointChange != 0 ){
                //拖动效果
                style.top = this.pageNum == this.position && this.pointChange < 0 || this.position == 1 && this.pointChange > 0 ? 
                            -this.itemHeight*(this.position-1)+'px' 
                            : -this.itemHeight*(this.position-1)+ this.pointChange +'px';
                style.transition = "top 0s";
            }else{
                //滚动翻页效果
                style.top = -this.itemHeight*(this.position-1)+'px';
                style.transition = "top 1s";
            }
            return style
        }
    },
    methods: {
        getHeight(){
            this.itemHeight = this.$refs.swiperbox.offsetHeight;
        },
        getItem() {
            let get = this.$slots.default.filter(item => {
                return item.tag != undefined;
            });
            this.pageNum = get.length;
        },
        handleTouchStart: function(e){
            this.startPoint = e.touches[0].pageY;
        },
        handleTouchMove: function(e){
            let poChange = e.changedTouches[0].pageY - this.startPoint;
            this.pointChange = poChange
        },
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
        changeItem: function(down){  //down 大于0 往下滑，小于0 往上滑
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

<style lang="css" type="text/css" scoped> 
.swiper-container{
    height: 100%;
    width: 100%;
    background: transparent;
    overflow: hidden;
    position: relative;
    
}
.swiper-container.swiper-list{
    position: absolute;
    width: 100%;
}
</style>