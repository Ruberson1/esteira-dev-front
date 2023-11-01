/// <reference types="vitest" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
	test: {
		globals: true
	},
	plugins: [
		vue(),
		VitePWA({ registerType: 'autoUpdate' })
	]
})
