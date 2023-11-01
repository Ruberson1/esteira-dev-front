import { defineStore } from 'pinia';

export const useAuthStore = defineStore({

    id: 'auth',
    state: () => ({
        showNameInput: false,
        isRegistering: false,
        buttonLabel: 'Entrar',
        questionLabel: 'Não tem uma conta?',
        buttonRegisterLabel: 'Cadastre-se',
    }),

    actions: {

        toggleRegistration() {
            this.isRegistering = !this.isRegistering;
            this.showNameInput = this.isRegistering;
            this.buttonLabel = this.isRegistering ? 'Cadastrar' : 'Entrar';
            this.questionLabel = this.isRegistering ? 'Já tem uma conta?' : 'Não tem uma conta?';
            this.buttonRegisterLabel = this.isRegistering ? 'Entrar' : 'Cadastre-se';
        },
    }
});
