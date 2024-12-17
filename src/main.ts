import { createApp } from 'vue';
import './style.less';
import App from './App.vue';
import router from '../src/router';
import Icon from '@yike-design/ui/es/components/svg-icon';
import '@yike-design/ui/es/index.less';
import * as echarts from 'echarts';

// 引入全局方法
import { YkMessage, YkNotification } from '@yike-design/ui';

const app = createApp(App);
app.use(router);
app.use(Icon);
app.mount('#app');
app.config.globalProperties.$echarts = echarts;
app.config.globalProperties.$notification = YkNotification;
app.config.globalProperties.$message = YkMessage;
