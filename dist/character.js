import {outfitPalette,itemPalette} from './customization.js';
export const hairNames=['Crop','Long','Mohawk','Side sweep','Messy','Shaved','Twin tails','Spikes','Bun','Bob','Undercut','Braids','Flat top','Ponytail','Curly','Center part','Asymmetric','Topknot','Buzz fade','Curtain bob','Double buns','Low braid','Windswept','Liberty spikes','High fade','Wave','Pixie','Locs','Side pony','Crown braid','Soft fringe','Layered','Twin loops','Swept crest','Choppy','Cropped curls'];
export const clothesNames=['Tech shirt','Long coat','Armored vest','Hoodie','Flight suit','Tunic','Harness','Street jacket','Lab coat','Bomber','Overalls','Kimono','Poncho','Tracksuit','Striped tee','Waistcoat','Long dress','Utility suit'];
export const itemNames=['None','Visor','Headset','Mask','Goggles','Cap','Antenna','Earpiece','Scarf','Shoulder drone','Backpack','Halo','Headphones','Beanie','Bandana','Ear studs','Neck chain','Eyepatch'];
// Original 24×32 sprite. Every exposed part has a corresponding painted region.
export function sprite(c){let rects='';const r=(x,y,w,h,fill)=>{rects+=`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}"/>`};const ink=c.outline||'#101522',o=outfitPalette(c),a=itemPalette(c),cloth=c.clothes||0;
 r(6,29,12,2,'#00000055');r(7,20,4,8,o.pants||o.fabric);r(13,20,4,8,o.pants||o.fabric);r(6,27,5,2,o.boots);r(13,27,6,2,o.boots);
 r(6,14,12,8,ink);r(7,15,10,6,cloth===8?o.trim:o.fabric);r(4,15,3,8,ink);r(17,15,3,8,ink);r(5,19,2,3,c.skin);r(17,19,2,3,c.skin);r(9,12,6,3,c.skin);r(7,5,10,8,ink);r(6,7,12,5,c.skin);r(8,6,8,7,c.skin);
 if(c.bodyType===1){r(4,15,3,5,o.fabric);r(17,15,3,5,o.fabric);}if(c.bodyType===2){r(8,15,8,7,o.fabric);r(7,15,1,6,ink);r(16,15,1,6,ink);}
 if(c.faceType){const widths=[10,12,8,9,11,14,8,12],w=widths[c.faceType],x=Math.floor((24-w)/2);r(6,5,12,8,ink);r(x,7,w,5,c.skin);r(x+1,6,w-2,7,c.skin);if(c.faceType===2){r(7,11,2,2,c.skin);r(15,11,2,2,c.skin);}if(c.faceType===3)r(9,12,6,2,c.skin);if(c.faceType===7)r(7,12,10,1,c.skin);}
 const iris=c.eyes,white=c.eyeWhite||'#eef4f7',pupil=c.pupilColor||'#101522';
 switch(c.eyeStyle||0){
 case 0:for(const x of [9,14]){r(x,9,2,2,iris);r(x+1,10,1,1,pupil);r(x,9,1,1,white);}break;
 case 1:for(const x of [8,14]){r(x,8,3,3,white);r(x+1,8,2,3,iris);r(x+1,9,1,2,pupil);}break;
 case 2:for(const x of [8,14]){r(x,10,3,1,iris);r(x+1,10,1,1,pupil);r(x,9,1,1,white);}break;
 case 3:for(const x of [8,14]){r(x,9,3,2,white);r(x+1,8,1,4,iris);r(x+1,9,1,2,pupil);}break;
 case 4:for(const x of [8,14]){r(x,8,3,3,iris);r(x+1,9,1,1,pupil);r(x,8,1,1,white);}r(11,9,3,1,iris);break;
 case 5:for(const x of [8,14]){r(x,10,3,1,iris);r(x,9,3,1,pupil);r(x,10,1,1,white);}break;
 }
 const lip=c.lipColor||'#86574d';switch(c.mouthStyle||0){case 0:r(11,12,3,1,lip);break;case 1:r(10,11,1,1,lip);r(11,12,3,1,lip);r(14,11,1,1,lip);break;case 2:r(10,11,5,2,lip);r(11,11,3,1,white);break;case 3:r(12,12,1,1,lip);break;case 4:r(11,11,3,1,lip);r(10,12,1,1,lip);r(14,12,1,1,lip);break;case 5:r(10,11,5,1,lip);r(11,12,1,1,white);r(14,12,1,1,white);break;}
 const brow=c.browColor||c.hairColor;for(const x of [8,14])switch(c.browStyle||0){case 1:r(x,7,3,1,brow);break;case 2:r(x,6,3,1,brow);break;case 3:r(x,7,2,1,brow);r(x+1,8,2,1,brow);break;case 4:r(x,7,3,2,brow);break;case 5:r(x,7,1,1,brow);r(x+2,7,1,1,brow);break;}
 const beard=c.beardColor||c.hairColor;switch(c.beardStyle||0){case 1:for(let x=8;x<17;x+=2)r(x,12,1,1,beard);break;case 2:r(11,13,3,2,beard);break;case 3:r(10,11,5,1,beard);break;case 4:r(7,11,2,3,beard);r(15,11,2,3,beard);r(9,13,6,2,beard);break;case 5:r(12,12,1,3,beard);break;}

 const h=c.hairColor;switch(c.hair){case 0:r(7,4,10,3,h);r(6,6,3,3,h);r(8,3,3,2,h);break;case 1:r(6,4,12,3,h);r(5,6,3,9,h);r(16,6,3,9,h);r(6,13,2,4,h);break;case 2:r(10,1,4,6,h);r(9,2,2,3,h);r(12,0,2,2,h);break;case 3:r(6,4,12,3,h);r(6,6,10,2,h);r(6,8,7,2,h);r(5,6,2,7,h);break;case 4:r(6,3,12,4,h);r(5,5,14,3,h);r(7,2,3,2,h);r(14,2,3,2,h);break;case 5:r(7,5,10,1,h);break;
case 6:r(7,4,10,3,h);r(3,6,3,11,h);r(18,6,3,11,h);break;
case 7:r(6,4,12,3,h);r(7,1,2,4,h);r(11,0,2,5,h);r(15,1,2,4,h);break;
case 8:r(7,4,10,3,h);r(9,1,6,4,h);break;
case 9:r(5,4,14,3,h);r(5,7,3,7,h);r(16,7,3,7,h);r(8,6,8,2,h);break;
case 10:r(7,4,10,2,h);r(10,2,8,3,h);r(15,6,3,2,h);break;
case 11:r(6,4,12,3,h);for(let y=7;y<19;y+=3){r(5,y,2,2,h);r(17,y,2,2,h);}break;
case 12:r(6,2,12,5,h);r(6,7,2,2,h);break;
case 13:r(7,4,10,3,h);r(17,6,4,3,h);r(19,9,2,9,h);break;
case 14:for(let x=5;x<19;x+=3){r(x,3,3,5,h);r(x,2+(x%2),2,2,h);}r(5,7,2,4,h);r(17,7,2,4,h);break;
case 15:r(6,3,5,4,h);r(13,3,5,4,h);r(5,6,3,6,h);r(16,6,3,6,h);break;
case 16:r(6,2,12,5,h);r(6,7,7,3,h);r(5,8,3,8,h);break;
case 17:r(7,4,10,3,h);r(11,0,4,4,h);r(10,1,6,2,h);break;
 case 18:r(7,4,10,2,h);r(6,6,2,2,h);r(16,6,2,2,h);break;
 case 19:r(6,4,5,3,h);r(13,4,5,3,h);r(5,6,3,7,h);r(16,6,3,7,h);break;
 case 20:r(7,4,10,3,h);r(3,1,5,5,h);r(16,1,5,5,h);break;
 case 21:r(6,4,12,3,h);r(17,7,3,3,h);for(let y=10;y<22;y+=3)r(18-(y%2),y,2,2,h);break;
 case 22:r(7,4,12,3,h);r(10,2,10,2,h);r(14,1,7,2,h);r(5,6,3,5,h);break;
 case 23:r(7,4,10,3,h);for(const x of [5,9,13,17])r(x,0,2,6,h);break;
 case 24:r(7,2,10,4,h);r(8,1,8,1,h);r(8,6,8,1,h);break;
 case 25:r(6,4,12,3,h);r(8,2,5,2,h);r(12,3,5,2,h);r(5,6,3,4,h);r(16,6,2,2,h);break;
 case 26:r(7,3,10,3,h);r(6,5,7,3,h);r(5,6,3,4,h);r(15,5,3,2,h);break;
 case 27:r(6,3,12,3,h);for(let y=6;y<17;y+=3){r(4,y,2,2,h);r(7,y,1,2,h);r(17,y,2,2,h);}break;
 case 28:r(7,4,10,3,h);r(17,4,5,4,h);r(20,8,2,8,h);r(19,15,2,3,h);break;
 case 29:r(5,4,14,3,h);r(6,3,12,1,h);r(5,7,2,5,h);r(17,7,2,5,h);for(let x=6;x<18;x+=3)r(x,4,1,1,c.hairAccent);break;
 case 30:r(6,4,12,3,h);r(7,7,2,1,h);r(10,7,2,2,h);r(14,7,2,1,h);break;
 case 31:r(6,3,12,4,h);r(5,7,3,5,h);r(16,7,3,5,h);r(4,11,3,3,h);r(17,11,3,3,h);break;
 case 32:r(7,4,10,3,h);for(const x of [2,18]){r(x,4,4,1,h);r(x,5,1,5,h);r(x+3,5,1,5,h);r(x,10,4,1,h);}break;
 case 33:r(7,4,10,3,h);r(9,2,8,3,h);r(12,0,7,2,h);r(16,1,4,1,h);break;
 case 34:r(6,4,12,3,h);for(const x of [6,10,14]){r(x,2,2,2,h);r(x+1,7,2,2,h);}r(17,5,2,4,h);break;
 case 35:for(let x=6;x<18;x+=3){r(x,3,3,3,h);r(x+1,2,2,1,h);}r(5,6,3,3,h);r(16,6,3,3,h);break;
 }
 if(c.hair>=18)r(9+(c.hair%4),4,2,1,c.hairAccent||h);




 switch(cloth){
 case 0:r(10,16,4,2,o.trim);r(11,16,2,1,o.detail);break;
 case 1:r(5,15,3,12,o.fabric);r(16,15,3,12,o.fabric);r(8,15,2,8,o.trim);r(14,15,2,8,o.trim);r(10,17,1,1,o.detail);r(13,20,1,1,o.detail);break;
 case 2:r(7,15,10,7,o.trim);r(8,16,8,2,o.fabric);r(8,19,8,2,o.fabric);r(4,14,4,3,o.fabric);r(16,14,4,3,o.fabric);r(11,16,2,1,o.detail);break;
 case 3:r(6,13,3,5,o.fabric);r(15,13,3,5,o.fabric);r(9,19,6,2,o.trim);r(10,15,1,4,o.detail);r(14,15,1,4,o.detail);break;
 case 4:r(7,20,10,6,o.fabric);r(11,15,2,11,o.trim);r(8,18,2,2,o.detail);break;
 case 5:r(6,20,12,5,o.fabric);r(5,24,14,2,o.fabric);r(6,20,12,1,o.trim);break;
 case 6:r(7,15,3,7,o.trim);r(14,15,3,7,o.trim);r(7,18,10,2,o.trim);r(11,18,2,2,o.detail);break;
 case 7:r(4,15,4,6,o.fabric);r(16,15,4,6,o.fabric);r(11,15,2,7,o.trim);r(6,17,2,1,o.detail);break;
 case 8:r(5,15,4,12,o.fabric);r(15,15,4,12,o.fabric);r(4,16,3,5,o.fabric);r(17,16,3,5,o.fabric);r(15,18,3,2,o.detail);break;
 }
 if(cloth>=9){switch(cloth){
 case 9:r(4,15,4,6,o.fabric);r(16,15,4,6,o.fabric);r(5,20,3,2,o.trim);r(16,20,3,2,o.trim);r(11,15,2,7,o.trim);r(7,17,2,2,o.detail);break;
 case 10:r(8,16,8,8,o.fabric);r(7,14,2,7,o.trim);r(15,14,2,7,o.trim);r(9,17,1,1,o.detail);r(14,17,1,1,o.detail);break;
 case 11:r(5,15,14,8,o.fabric);r(8,15,2,2,o.trim);r(10,17,2,2,o.trim);r(12,15,2,2,o.trim);r(10,20,6,2,o.trim);r(12,20,2,1,o.detail);break;
 case 12:r(3,15,18,3,o.fabric);r(4,18,16,3,o.fabric);r(5,21,14,2,o.trim);r(11,15,2,3,o.detail);break;
 case 13:r(5,15,14,7,o.fabric);r(6,15,1,7,o.trim);r(17,15,1,7,o.trim);r(7,23,1,4,o.trim);r(15,23,1,4,o.trim);r(10,17,3,1,o.detail);break;
 case 14:r(5,15,14,7,o.fabric);for(const y of [16,18,20])r(5,y,14,1,o.trim);r(11,15,2,1,o.detail);break;
 case 15:r(7,15,10,7,o.trim);r(7,15,4,7,o.fabric);r(13,15,4,7,o.fabric);for(const y of [16,18,20])r(12,y,1,1,o.detail);break;
 case 16:r(7,15,10,7,o.fabric);r(6,21,12,3,o.fabric);r(5,24,14,2,o.fabric);r(7,20,10,1,o.trim);r(10,16,4,1,o.detail);break;
 case 17:r(5,15,14,7,o.fabric);r(8,17,3,2,o.trim);r(13,17,3,2,o.trim);r(7,24,4,2,o.trim);r(13,24,4,2,o.trim);r(11,15,2,6,o.detail);break;
 }r(7,26,4,1,o.pants);r(13,26,4,1,o.pants);r(6,27,5,2,o.boots);r(13,27,6,2,o.boots);}

 switch(c.accessory){
 case 1:r(6,8,12,4,a.frame);r(7,9,10,2,a.lens);r(7,9,4,1,a.light);break;
 case 2:r(5,7,2,5,a.pad);r(17,7,2,5,a.pad);r(6,4,12,1,a.shell);r(5,7,1,5,a.shell);r(18,7,1,5,a.shell);r(18,11,2,2,a.light);break;
 case 3:r(6,11,12,2,a.fabric);r(8,12,8,1,a.fabric);r(9,11,2,1,a.light);break;
 case 4:r(6,8,12,3,a.frame);r(7,9,4,1,a.lens);r(13,9,4,1,a.lens);break;
 case 5:r(5,3,13,4,a.fabric);r(3,6,16,1,a.trim);break;
 case 6:r(18,5,2,6,a.shell);r(19,1,1,5,a.wire);r(18,0,3,2,a.light);break;
 case 7:r(17,9,2,4,a.shell);r(18,12,3,1,a.light);break;
 case 8:r(6,13,12,3,a.fabric);r(16,15,3,9,a.fabric);break;
 case 9:r(0,12,4,4,a.shell);r(1,13,2,1,a.lens);r(0,11,1,1,a.light);break;
 case 10:r(2,14,3,10,a.fabric);r(19,14,3,10,a.fabric);r(7,15,2,7,a.straps);r(15,15,2,7,a.straps);break;
 case 11:r(6,0,12,1,a.light);r(5,1,2,1,a.light);r(17,1,2,1,a.light);break;
 }
 if(c.accessory>=12){switch(c.accessory){case 12:r(4,5,16,2,a.shell);r(3,7,3,6,a.trim);r(18,7,3,6,a.trim);r(4,9,1,2,a.light);break;case 13:r(6,2,12,5,a.shell);r(5,6,14,2,a.trim);r(11,3,3,2,a.light);break;case 14:r(6,5,12,2,a.shell);r(17,6,3,4,a.trim);r(7,5,2,1,a.light);break;case 15:r(6,10,1,2,a.shell);r(17,10,1,2,a.trim);r(6,10,1,1,a.light);break;case 16:r(8,14,8,1,a.shell);r(10,15,4,1,a.trim);r(11,16,2,2,a.light);break;case 17:r(7,8,5,3,a.shell);r(6,7,12,1,a.trim);r(8,9,2,1,a.light);break;}}
 return `<svg viewBox="0 0 24 32" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges" role="img" aria-label="Pixel operator">${rects}</svg>`;
}
