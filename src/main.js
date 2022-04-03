import {Form,Input,FormItem,Button,Divider,Avatar,Dropdown,DropdownItem,DropdownMenu,Tabs,TabPane,Upload,Message,MessageBox,Popover} from 'element-ui';
Vue.config.productionTip = false
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.use(less)
Vue.use(Form)
Vue.use(Input) 
Vue.use(FormItem) 
Vue.use(Button) 
Vue.use(Divider) 
Vue.use(Avatar)
Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Upload)
Vue.use(Popover)

// element-ui所提供的css样式
import 'element-ui/lib/theme-chalk/form.css'
import 'element-ui/lib/theme-chalk/form-item.css'
import 'element-ui/lib/theme-chalk/input.css'
import 'element-ui/lib/theme-chalk/button.css'
import 'element-ui/lib/theme-chalk/divider.css'
import 'element-ui/lib/theme-chalk/avatar.css'
import 'element-ui/lib/theme-chalk/dropdown.css'
import 'element-ui/lib/theme-chalk/dropdown-item.css'
import 'element-ui/lib/theme-chalk/dropdown-menu.css'
import 'element-ui/lib/theme-chalk/tabs.css'
import 'element-ui/lib/theme-chalk/tab-pane.css'
import 'element-ui/lib/theme-chalk/upload.css'
import 'element-ui/lib/theme-chalk/popover.css'
import 'element-ui/lib/theme-chalk/message.css'
import 'element-ui/lib/theme-chalk/message-box.css'

import Vue from 'vue'
import App from './App.vue'
import less from 'less'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)
import api from './request/api/index'
Vue.prototype.$api = api
import store from '../store'
import router from './router/index'

new Vue({
  beforeCreate(){
    Vue.prototype.$bus = this
  },
  render: h => h(App),
  router,
  store
}).$mount('#app')
