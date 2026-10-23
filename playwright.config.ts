import { defineConfig } from '@playwright/test';
export default defineConfig({testDir:'./tests',fullyParallel:false,use:{baseURL:'http://localhost:3000',browserName:'chromium',headless:true},reporter:'list'});
