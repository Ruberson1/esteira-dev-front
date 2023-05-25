import { useAuthStore } from '@/./store/auth/authStore';
import {decrypt} from "@/utils/utils";
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const authMiddleware = (to, from, next) => {

    const user = decrypt(sessionStorage.getItem('user'), process.env.VUE_APP_ENCRYPT_KEY);

    if ( user.active == process.env.VUE_APP_INACTIVE_USER ) {
        // Se o usuário não estiver autenticado ou estiver inativo, redirecione para a página de login
        next({ name: 'login' });
    } else {
        // Se o usuário estiver autenticado, permita o acesso à rota
        next();
    }
};

export default authMiddleware;