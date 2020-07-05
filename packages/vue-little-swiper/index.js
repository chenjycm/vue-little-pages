import littleSwiper from './littleSwiper.vue'
import littleSwiperItem from './littleSwiperItem.vue'

let _littleSwiper = {}
_littleSwiper.install = function (Vue){
    Vue.component(littleSwiper.name, littleSwiper)
    Vue.component(littleSwiperItem.name, littleSwiperItem)
}

export default _littleSwiper