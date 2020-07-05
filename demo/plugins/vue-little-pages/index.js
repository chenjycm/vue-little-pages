import littlePage from './littlePage.vue'
import littlePageItem from './littlePageItem.vue'

let _littlePage = {}
_littlePage.install = function (Vue){
    Vue.component(littlePage.name, littlePage)
    Vue.component(littlePageItem.name, littlePageItem)
}

export default _littlePage