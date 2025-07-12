import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import './style.css';

import App from './App.vue';
import { setupRouter } from './router';
import { setupStore } from './store';
const app = createApp(App);

app.use(ElementPlus);

setupRouter(app);
setupStore(app);

app.mount('#app');
