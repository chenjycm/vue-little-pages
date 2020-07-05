
<template>
    <div class="little-page-item" :style="pageBoxStyle">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: "little-page-item",
    props: ['color'],
    inject: ['littlePage'],
    inheritAttrs: false,
    computed:{
        pageBoxStyle(){
            return {
                background: this.color,
                height: this.littlePage.itemHeight + "px"
            }
        }
    },
};
</script>

<style lang="css" type="text/css" scoped>
.little-page-item{
    height: 100%;
    width: 100%;
}
.little-page-item > div{
    width: 100%;
}
</style>