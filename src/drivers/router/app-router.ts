import {createRouter, createWebHistory} from "vue-router";
import TaskListView from '../../view/TaskListView.vue';
import TaskFormView from '../../view/TaskFormView.vue';
import SettingsFormView from '../../view/SettingsFormView.vue';
import DashboardView from '../../view/DashboardView.vue';
import UsersView from '../../view/UsersView.vue';
import BugFormView from "../../view/BugFormView.vue";
import LoginView from "../../view/LoginView.vue";
import NotFoundView from "../../view/NotFoundView.vue";


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/tasks',
            name: 'tasks',
            component: TaskListView
        },
        {
            path: '/',
            name: 'dashboard',
            component: DashboardView
        },
        {
            path: '/users',
            name: 'users',
            component: UsersView
        },
        {
            path: '/task/:taskId?',
            name: 'task',
            component: TaskFormView
        },
        {
            path: '/bug/:taskId?/:bugId?',
            name: 'bug',
            component: BugFormView
        },
        {
            path: '/settings',
            name: 'settings',
            component: SettingsFormView
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView
        },
        {
            path: '/404',
            name: 'not-found',
            component: NotFoundView
        },
        {
            path: '/:catchAll(.*)',
            redirect: '/404',
        },
    ]
})
const token = sessionStorage.getItem('token');
router.beforeEach((to, from, next) => {
    // Verifica se o usuário está autenticado e se a rota atual é diferente da página de login
    if (!token
        && to.name !== 'login'
        && to.name !== 'social'
        && to.name !== 'not-found'
        && to.name !== 'register-confirmation'
    ) {
        // Se o usuário não estiver autenticado, redirecione-o para a página de login
        next({ name: 'login' });
    } else {
        // Caso contrário, permita o acesso à rota
        next();
    }
});
export default router