<template>
    <div class="swiper-item" :style="itemStyle">
        {{attr}}
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: "little-swiper-item",
    data() {
        return {
          itemStyle: ""
        };
    },
    props: ['color','attr'],
    inheritAttrs: false,
    mounted() {
        this.$nextTick(()=>{
            this.getItemStyle()
        })
        window.onresize = () =>{
            this.getItemStyle()
        }

        // console.log(this.$attrs)
    },
    methods: {
        getItemStyle(){
            this.itemStyle = {
                height: this.$options.parent.itemHeight + "px",
                background: this.color,
            }
        }
    },
    watch: {
        
    }
};
</script>

<style lang="css" type="text/css" scoped>
.swiper-item{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    
}
.swiper-item > div{
    width: 100%;
}
</style>