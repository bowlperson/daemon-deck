// Original item emblems and creature/robot silhouettes, drawn on a centered 24×24 grid.
// Existing IDs are preserved so saved icon selections automatically use the replacements.
import {enemies} from './dungeon-enemies.js';
const emblems=[
 ['Rusted hatchet','M7 21 16 3m-3 1 7 3-3 7-7-3zM5 19l4 2M14 7l3 1'],
 ['Atom pendant','M8 2q4 6 8 0M12 6v3M12 10c-7-6-11 1-3 6s13-1 3-6zm0 0c7-6 11 1 3 6s-13-1-3-6zM12 11v.01'],
 ['Brass knuckles','M3 10V7a2 2 0 0 1 4 0v3m0-2V6a2 2 0 0 1 4 0v4m0-4a2 2 0 0 1 4 0v4m0-2a2 2 0 0 1 4 0v3l2 3-3 6H6l-3-4zM7 14h9m-8 3h6'],
 ['Scrap bundle','M3 7l8-4 10 4-8 4zM3 7v10l10 4 8-4V7M13 11v10M7 5l10 4v10M3 12l10 4 8-4'],
 ['Raider megaphone','M3 10h5l12-6v16L8 14H3zM7 14l2 7h4l-2-6M17 7v10M3 11v2'],
 ['Caravan scrip','M3 5h15v14H3zM6 8h7M6 11h4m-4 5h3M18 12h3v9H8v-2M13 13l2 2-2 2-2-2z'],
 ['Gunner magazine','M7 3h10l1 13-3 5H6l2-6zM8 6h7m-7 4h7m-7 4h7m-6 4h5M10 3v2m4-2v2'],
 ['Chemistry flask','M9 3h6m-5 0v7l-6 9q-1 2 2 2h12q3 0 2-2l-6-9V3M7 16h10M9 13h1m4 5h1M4 7h2m-1-1v2M19 5h1'],
 ['Tunnel lantern','M8 6V4q4-4 8 0v2M6 6h12l-1 3v10l2 2H5l2-2V9zM7 9h10M10 18v-5l2-3 2 3v5z'],
 ['Jet inhaler · cook','M8 3h9v10H8zM7 13h11v5H7zM7 16H3v5h6v-3M10 6h5m-5 3h5M18 5h3m-2 4h2M11 15h3'],
 ['Scout binoculars','M4 7h5l2 7H2zm11 0h5l2 7h-9zM9 9h6M3 14v5h7v-5m4 0v5h7v-5M5 4h3v3m8-3h3v3'],
 ['Chain muzzle','M4 6l4-3 4 2 4-2 4 3-2 10-6 5-6-5zM4 9h16M7 9l1 6h8l1-6M8 12h8M12 9v6M9 19l-2 3m8-3 2 3'],
 ['Wire spool & cutters','M9 4a6 6 0 1 0 0 12 6 6 0 1 0 0-12zm0 3a3 3 0 1 0 0 6 3 3 0 1 0 0-6M9 16v5h8M16 3l5 8m0-8-5 8m2-4v6m-2 0h5'],
 ['Lookout whistle','M3 10h10l5-6 3 3-5 7v3l-4 4H7l-4-4zM6 10V7h5v3M7 14h5v3H7zm10-6 2 2'],
 ['Salvaged radiation tin','M5 5h14v15H5zM4 5h16M8 2h8v3M11 12l-3-4m5 4 3-4m-4 6v4M10 13h4M7 16l2-2m6 0 2 2'],
 ['Mirelurk harpoon','M5 21 16 5m-3 1 5-4 2 6-4-1-1 5-3-2M3 19l5 3M7 18l3 2'],
 ['Spiked hound collar','M4 8l3-4 3 2 4-1 4 2 3 4-2 8-5 2-6-1-4-5zM4 8l5 4 6 1 6-2M9 12l-1 8m7-7-1 8M7 4l-1-2m8 3 1-3m4 6 3-1M4 15l-2 2'],
 ['Coded informant note','M5 3h10l5 5v13H5zM15 3v6h5M8 8h3m-3 4h7m-7 3h3m3 0h3m-9 3h7'],
 ['Welding mask','M6 3h12l2 5-2 11-6 3-6-3L4 8zM7 7h10v6H7zM10 16h4m-4 3h4M2 8h2m16 0h2'],
 ['Jet inhaler · cracked','M8 3h8v10H8zM7 13h10v5H7zM7 16H3v5h6v-3M12 4l-2 4 4 1-2 3M19 9l2 2v6h-2zm0 4h2'],
 ['Raider hacksaw','M4 18V6l3-3h13v12h-4V7H8v11zM8 16h12m-10 0 1 2 2-2 1 2 2-2M3 18h5v3H3z'],
 ['Skinning knife','M6 21l-3-3 7-7 4 4zM9 10l6 6M11 10 20 2q2 8-6 11M5 17l2 2'],
 ['Incendiary bottle','M10 4h4v5l4 5v7H6v-7l4-5zM9 4h6M7 15h10M11 2l3-1 3 3M12 17l-2 2h4'],
 ['Glowing containment cage','M6 4h12v17H6zM4 4h16M9 4v17m6-17v17M6 9h12m-12 7h12M10 2h4M11 11l-1 3h4l-1-3'],
 ['Atom prayer beads','M7 3q-5 8 1 12m9-12q5 8-1 12M7 3h.01M5 7h.01M5 11h.01M19 7h.01M19 11h.01M10 15h4l2 5-4 2-4-2zM12 16v4m-2-2h4'],
 ['Loaded dice & chips','M4 3h11v11H4zM7 6h.01m5 5h.01m-5 0h.01m5-5h.01M17 8h4v11H10v-3M4 18h4m-5 3h5m9-10h.01m0 5h.01'],
 ['Raider sprocket','M10 2h4l1 3 3-1 3 3-1 3 2 1v4l-3 1 1 3-3 3-3-1-1 1h-4l-1-3-3 1-2-3 1-3-2-1v-4l3-1-1-3 3-2 3 1zM12 8a4 4 0 1 0 0 8 4 4 0 1 0 0-8'],
 ['Sniper scope','M3 9h18v7H3zM7 9V6h10v3M5 9v7m14-7v7M10 16v4h4v-4M10 6V3h4v3M10 12h4m-2-2v4'],
 ['Butcher cleaver','M6 21l-3-3 6-6 4 4zM9 12 16 3l6 5-7 9zM17 7h.01M6 17l2 2'],
 ['Sewer valve key','M12 3a6 6 0 1 0 0 12 6 6 0 1 0 0-12m0 0v12m-6-6h12M12 9l-4-4m4 4 4-4M10 15v6h7v-3h-3v-3'],
 ['Sentry turret','M7 6h10v8H7zM7 9H2v3h5m10-4h5v5h-5M10 3h4v3M10 9h4v2h-4zM9 14l-4 7m10-7 4 7M8 18h8'],
 ['Infected sample vial','M8 3h8v4l-1 2v10q-3 4-6 0V9L8 7zM8 6h8M9 13h6M11 15h.01m2 3h.01M4 9h.01m15 3h.01M3 15h2m-1-1v2'],
 ['Dockside hook','M12 3v10m-3-10h6M7 13v3a5 5 0 0 0 10 0v-5l-3 3M5 6l4 3m10-3-4 3M9 18h.01'],
 ['Breaching charge','M4 7h16v14H4zM8 7V3h8v4M8 10h8v5H8zM10 12h4M7 18h2m6 0h2M20 10h2V4h-3V2'],
 ['Lit powder keg','M6 5h12l2 4v10l-2 2H6l-2-2V9zM5 9h14M4 17h16M9 5v16m6-16v16M12 5V3l4-1M17 2l3 1m-2 0 1 3']
];
const creatures=[
 ['Radroach','M8 7l-3-4m11 4 3-4M12 5c-7 0-8 15 0 16 8-1 7-16 0-16zm0 0v16M7 9l-4-2m4 6H2m6 4-4 4M17 9l4-2m-4 6h5m-6 4 4 4M9 8h6'],
 ['Mole Rat','M3 15l2-3c0-9 13-10 16-2l1 5-3 3H7zM5 12l-2-2v5M8 7l1-3 3 2M17 10h.01M18 14h4M9 18v3h3v-3m0 0v3h3v-3M3 15H2'],
 ['Mongrel','M4 9 3 2l6 4 5-1 5-3 1 8 2 5-5 6H8l-6-6zM5 11l4 1m6 0 4-1M8 16l4-2 4 2-4 3zM12 19v3M5 7l2 2m11-3-2 3M4 16l3 1'],
 ['Yao Guai','M6 7C0 6 4 0 8 4l4-1 4 1c4-4 8 2 2 3l2 5-1 7-7 3-7-3-1-7zM7 11h2m6 0h2M8 16q4-5 8 0v3H8zm2-1h4M6 6l3 3m-4-1 3 3M10 19v2m4-2v2'],
 ['Mister Gutsy','M12 5a6 6 0 1 0 0 12 6 6 0 1 0 0-12M12 2v3M6 9l-3-2m15 2 3-2M9 9h.01m6 0h.01m-3 3h.01M6 13H3v6l-1 2m16-8h3v6l1 2M10 17l-2 5 4-2 4 2-2-5M3 19l3 2m15-2-3 2'],
 ['Protectron','M7 7V5a5 5 0 0 1 10 0v2M6 7h12l1 10H5zM8 9h8v4H8zM9 15h6M5 9H2v8h3m14-8h3v8h-3M8 17v4H5m11-4v4h3M10 10h4'],
 ['Assaultron','M9 3h6l2 3-2 4H9L7 6zM9 6h6M12 3V1M8 11h8l-1 6H9zM10 13h4M8 11l-4 4-2-1m14-3 4 4 2-1M9 17l-2 5m8-5 2 5M5 15l-1 4m15-4 1 4'],
 ['Deathclaw','M7 8 3 2l6 3 3-1 3 1 6-3-4 6 3 5-3 7-5 2-5-2-3-7zM6 11l4 1m4 0 4-1M8 16l4-3 4 3-1 4H9zM9 17h6M10 17v3m4-3v3M3 14l-1 5 3-2m16-3 1 5-3-2']
];
export const enemyIcons=[...emblems,...creatures].map(([motif,path],i)=>({id:'dd:enemy-'+i,label:enemies[i].name+' · '+motif,markup:`<path d="${path}"/>`}));
export const shadesIcon={id:'dd:shades',label:'Shades · COOL',markup:'<g transform="translate(0 2)"><path d="m2 8 2-3h16l2 3M2 9h8l-1 6H4zm12 0h8l-2 6h-5zM10 10h4"/><path d="m5 10 2 3m10-3 2 3"/></g>'};
