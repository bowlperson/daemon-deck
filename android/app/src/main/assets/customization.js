// Parts correspond to actual regions drawn by the 24×32 sprite renderer.
const p=(key,label,color)=>({key,label,color});
const pants=p('pants','Trousers','#101522'),boots=p('boots','Footwear','#273348');
export const outfitParts=[
 [p('fabric','Shirt','outfit'),p('trim','Chest panel','#273348'),p('detail','Badge','#f4e9a8'),pants,boots],
 [p('fabric','Coat','outfit'),p('trim','Lining','#273348'),p('detail','Fasteners','#f4e9a8'),pants,boots],
 [p('fabric','Armor plates','outfit'),p('trim','Undersuit','#273348'),p('detail','Emblem','#f4e9a8'),pants,boots],
 [p('fabric','Hoodie','outfit'),p('trim','Pocket','#273348'),p('detail','Drawstrings','#dde6ef'),pants,boots],
 [p('fabric','Flight suit','outfit'),p('trim','Seams','#273348'),p('detail','Insignia','#dde6ef'),boots],
 [p('fabric','Tunic','outfit'),p('trim','Belt','#273348'),pants,boots],
 [p('fabric','Shirt','outfit'),p('trim','Harness','#273348'),p('detail','Buckle','#e8ba5d'),pants,boots],
 [p('fabric','Jacket','outfit'),p('trim','Zipper','#273348'),p('detail','Patch','#e8ba5d'),pants,boots],
 [p('fabric','Lab coat','#d6e4e9'),p('trim','Inner shirt','outfit'),p('detail','Pocket','outfit'),pants,boots]
];
export const itemParts=[[],
 [p('frame','Frame','#273348'),p('lens','Lens','#60fae0'),p('light','Reflection','#e5ffff')],
 [p('shell','Headband','#9eacf5'),p('pad','Ear pads','#273348'),p('light','Mic light','#fc5caa')],
 [p('fabric','Mask','#273348'),p('light','Filter','#60fae0')],
 [p('frame','Frame','#273348'),p('lens','Lenses','#ffbb50')],
 [p('fabric','Cap','#596b99'),p('trim','Brim','#7589ba')],
 [p('shell','Mount','#273348'),p('wire','Antenna','#50f4d4'),p('light','Beacon','#fc5caa')],
 [p('shell','Shell','#91d4ff'),p('light','Indicator','#50f4d4')],
 [p('fabric','Scarf','#fc5caa')],
 [p('shell','Body','#273348'),p('lens','Lens','#50f4d4'),p('light','Status light','#fc5caa')],
 [p('fabric','Pack','#7b6656'),p('straps','Straps','#273348')],
 [p('light','Halo','#ffdc80')]
];
for(let i=0;i<9;i++)outfitParts.push([p('fabric','Main fabric','outfit'),p('trim','Secondary fabric','#273348'),p('detail','Accent','#f4e9a8'),p('pants','Trousers','#101522'),p('boots','Footwear','#273348')]);
for(let i=0;i<6;i++)itemParts.push([p('shell','Body','#273348'),p('trim','Trim','#91d4ff'),p('light','Accent','#50f4d4')]);
export const faceNames=['Classic','Round','Angular','Long','Soft','Wide','Narrow','Squared'];
export const mouthNames=['Neutral','Smile','Grin','Quiet','Pout','Pixel fangs'];
export const browNames=['None','Straight','Raised','Angled','Thick','Split'];
export const beardNames=['None','Stubble','Goatee','Moustache','Full beard','Chin stripe'];
export const eyeNames=['Pixel','Wide','Narrow','Round','Cyber optics','Sleepy'];
function palette(parts,saved,c){return Object.fromEntries(parts.map(p=>[p.key,saved?.[p.key]||(p.color==='outfit'?c.outfit:p.color)]));}
export const outfitPalette=(c,index=c.clothes||0)=>palette(outfitParts[index],c.outfitColors?.[index],c);
export const itemPalette=(c,index=c.accessory||0)=>palette(itemParts[index],c.itemColors?.[index],c);
export function validPalettes(c){const color=n=>typeof n==='string'&&/^#[a-f\d]{6}$/i.test(n);for(const [maps,parts] of [[c.outfitColors,outfitParts],[c.itemColors,itemParts]]){if(!maps||typeof maps!=='object'||Array.isArray(maps))return false;for(const [index,values] of Object.entries(maps)){if(!/^(0|[1-9]\d*)$/.test(index)||!parts[index]||!values||typeof values!=='object'||Array.isArray(values))return false;for(const [key,value] of Object.entries(values))if(!parts[index].some(p=>p.key===key)||!color(value))return false;}}return ['faceType','mouthStyle','browStyle','beardStyle','bodyType'].every((k,i)=>Number.isInteger(c[k])&&c[k]>=0&&c[k]<[8,6,6,6,3][i])&&['outline','lipColor','browColor','beardColor','hairAccent'].every(k=>color(c[k]))&&Number.isInteger(c.eyeStyle)&&c.eyeStyle>=0&&c.eyeStyle<eyeNames.length&&color(c.eyeWhite)&&color(c.pupilColor);}
