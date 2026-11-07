export const hairNames=['Crop','Long','Mohawk','Side sweep','Messy','Shaved','Twin tails','Spikes','Bun','Bob','Undercut','Braids','Flat top','Ponytail','Curly','Center part','Asymmetric','Topknot'];
export const clothesNames=['Tech shirt','Long coat','Armored vest','Hoodie','Flight suit','Tunic','Harness','Street jacket','Lab coat'];
export const itemNames=['None','Visor','Headset','Mask','Goggles','Cap','Antenna','Earpiece','Scarf','Shoulder drone','Backpack','Halo'];
// Original 24×32 sprite, drawn on an integer grid. No external sprite assets.
export function sprite(c){let rects='';const r=(x,y,w,h,fill)=>{rects+=`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}"/>`};const ink='#101522',shade='#273348';r(6,29,12,2,'#00000055');r(7,20,4,8,ink);r(13,20,4,8,ink);r(6,27,5,2,shade);r(13,27,6,2,shade);r(6,14,12,8,ink);r(7,15,10,6,c.outfit);r(4,15,3,8,ink);r(17,15,3,8,ink);r(5,19,2,3,c.skin);r(17,19,2,3,c.skin);r(9,12,6,3,c.skin);r(7,5,10,8,ink);r(6,7,12,5,c.skin);r(8,6,8,7,c.skin);r(9,9,2,2,c.eyes);r(14,9,2,2,c.eyes);r(11,12,3,1,'#86574d');r(10,16,4,2,shade);r(11,16,2,1,'#f4e9a8');
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
case 17:r(7,4,10,3,h);r(11,0,4,4,h);r(10,1,6,2,h);break;}

 if(c.accessory===1){r(7,9,10,2,'#60fae0');r(7,9,4,1,'#e5ffff');}if(c.accessory===2){r(5,7,2,5,'#9eacf5');r(17,7,2,5,'#9eacf5');r(6,4,12,1,'#9eacf5');r(18,11,2,2,'#fc5caa');}if(c.accessory===3){r(6,11,12,2,shade);r(8,12,8,1,shade);r(9,11,2,1,'#60fae0');}
 // Clothing silhouettes and equipment use the same integer pixel grid.
 const o=c.outfit;
 switch(c.clothes||0){
 case 1:r(5,15,3,12,o);r(16,15,3,12,o);r(8,15,2,8,shade);r(14,15,2,8,shade);break;
 case 2:r(7,15,10,7,shade);r(8,16,8,2,o);r(8,19,8,2,o);r(4,14,4,3,o);r(16,14,4,3,o);break;
 case 3:r(6,13,3,5,o);r(15,13,3,5,o);r(9,19,6,2,shade);r(11,15,1,4,'#dde6ef');break;
 case 4:r(7,20,10,6,o);r(11,15,2,11,shade);r(8,18,2,2,'#dde6ef');break;
 case 5:r(6,20,12,5,o);r(5,24,14,2,o);r(6,20,12,1,shade);break;
 case 6:r(7,15,3,7,shade);r(14,15,3,7,shade);r(7,18,10,2,shade);r(11,18,2,2,'#e8ba5d');break;
 case 7:r(4,15,4,6,o);r(16,15,4,6,o);r(11,15,2,7,shade);r(6,17,2,1,'#e8ba5d');break;
 case 8:r(5,15,4,12,'#d6e4e9');r(15,15,4,12,'#d6e4e9');r(4,16,3,5,'#d6e4e9');r(17,16,3,5,'#d6e4e9');r(15,18,3,2,o);break;
 }
 switch(c.accessory){
 case 4:r(6,8,12,3,shade);r(7,9,4,1,'#ffbb50');r(13,9,4,1,'#ffbb50');break;
 case 5:r(5,3,13,4,'#596b99');r(3,6,16,1,'#7589ba');break;
 case 6:r(18,5,2,6,shade);r(19,1,1,5,'#50f4d4');r(18,0,3,2,'#fc5caa');break;
 case 7:r(17,9,2,4,'#91d4ff');r(18,12,3,1,'#91d4ff');break;
 case 8:r(6,13,12,3,'#fc5caa');r(16,15,3,9,'#fc5caa');break;
 case 9:r(0,12,4,4,shade);r(1,13,2,1,'#50f4d4');r(0,11,1,1,'#fc5caa');break;
 case 10:r(2,14,3,10,'#7b6656');r(19,14,3,10,'#7b6656');r(7,15,2,7,shade);r(15,15,2,7,shade);break;
 case 11:r(6,0,12,1,'#ffdc80');r(5,1,2,1,'#ffdc80');r(17,1,2,1,'#ffdc80');break;
 }
 return `<svg viewBox="0 0 24 32" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges" role="img" aria-label="Pixel operator">${rects}</svg>`;
}
