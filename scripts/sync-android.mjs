import {cp,mkdir,rm} from 'node:fs/promises';
const dest=new URL('../android/app/src/main/assets/',import.meta.url);await rm(dest,{recursive:true,force:true});await mkdir(dest,{recursive:true});await cp(new URL('../dist/',import.meta.url),dest,{recursive:true,filter:source=>!String(source).includes('/downloads')});console.log('Web assets copied to Android.');
