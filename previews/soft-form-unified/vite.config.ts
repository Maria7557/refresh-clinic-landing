import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({base:'/clinic-soft-form-unified/',plugins:[react()],build:{outDir:'dist',emptyOutDir:true}});
