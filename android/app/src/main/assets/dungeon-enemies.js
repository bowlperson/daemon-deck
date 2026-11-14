const rows=[
['Rusty Jack','Jack Mulligan','Raider scaver','body,os'],['Sister Agnes','Agnes Chu','Children of Atom preacher','cool,intelligence'],['Brick','Bruno Kessel','Raider enforcer','intelligence,tech'],['Tin Can','Sena Adeyemi','Scrap broker','tech,cool'],['Hollywood','Cassius Wren','Raider mouthpiece','os,body'],['Two-Step','Toma Ilie','Skimming caravan fixer','cool,intelligence'],['Splint','Rea Marchetti','Gunner merc','body,os'],['Bittercup','Marisol Vega','Raider chemist','intelligence,body'],['Ratline','Pete Harker','Tunnel scavver','os,cool'],['Fizz','Nadia Okonkwo','Jet cook','body,tech'],['Half-Pint','Ellis Ward','Raider scout','tech,cool'],['Dogpile','Marek Skala','Feral wrangler','os,intelligence'],['Copperhead','June Salazar','Wire thief','tech,body'],['Whistle','Oskar Lindqvist','Caravan lookout','cool,os'],['Grub','Tibor Nagy','Ghoul scavver','intelligence,tech'],['Salt Lick','Delphine Roux','Mirelurk poacher','body,cool'],['Blue Tick','Harlan Moss','Radhound handler','os,tech'],['Needy','Sasha Petrov','Raider informant','intelligence,body'],['Wrench','Odell Pryce','Makeshift armorer','tech,cool'],['Slow Sam','Samuel Adjei','Chem-addled guard','intelligence,os'],['Hacksaw','Vera Kovács','Dismemberment hobbyist','body,intelligence'],['Peel','Delroy Simmons','Skin trader','cool,tech'],['Tinderbox','Anja Brandt','Incendiary specialist','os,body'],['Blister','Corey Nakamura','Glowing one handler','tech,intelligence'],['Mother Mary','Maryam Aziz','Cult matron','cool,os'],['Scratch','Lonnie Pierce','Bookie','intelligence,cool'],['Spoke','Dmitri Volkov','Bike raider','body,tech'],['Tin Whistle','Esme Calloway','Sniper spotter','os,cool'],['Coldcuts','Wesley Boone','Butcher-raider','intelligence,body'],['Gutter','Rina Takahashi','Sewer guide','tech,os'],['Lampy','Arlo Fenwick','Sentry-bot tinkerer','tech,cool'],['Pox','Bianca Moretti','Disease vector','body,intelligence'],['Scupper','Ned Okafor','Dockside extortionist','cool,tech'],['Halligan','Britt Sørensen','Breacher','os,intelligence'],['Candle','Yusra Haddad','Powder monkey','body,cool']];

// A distinct, named loadout for each Mid/High opponent. No enemy can heal.
const kits=[
 [['os','Hound signal','attack']], [['tech','Live-wire snare','drain']], [['cool','False opening','shield']],
 [['tech','Scrap ambush','attack']], [['body','Shell guard','shield']], [['os','Pack command','attack']],
 [['intelligence','False intel','drain']], [['tech','Rivet armor','shield']], [['intelligence','Chemical haze','drain']],
 [['body','Saw rush','attack']], [['cool','Cold bargain','drain']], [['os','Flash trap','attack']],
 [['tech','Radiant arc','attack'],['intelligence','Static cloud','drain']],
 [['cool','Zealot ward','shield'],['os','Sermon surge','attack']],
 [['intelligence','House advantage','drain'],['cool','Loaded deck','forge']],
 [['body','Ramming speed','attack'],['tech','Chrome guard','shield']],
 [['os','Marked shot','attack'],['cool','Smoke screen','shield']],
 [['body','Cleaver strike','attack'],['intelligence','Pressure point','drain']],
 [['tech','Floodgate','line'],['os','Tunnel trap','attack']],
 [['tech','Sentry burst','attack'],['cool','Decoy shell','shield']],
 [['intelligence','Spore cloud','drain'],['body','Toxic impact','attack']],
 [['cool','Dockside toll','drain'],['tech','Harpoon burst','attack']],
 [['os','Breach charge','line'],['intelligence','Demolition plan','forge']],
 [['body','Powder blast','attack'],['cool','Ember veil','shield']]
];
const humanEnemies=rows.map(([,name,designation,weakness],i)=>({
 id:'boss-'+i,name,designation,weakness:weakness.split(','),level:i+1,hp:335+i*35,
 reward:500+Math.floor(i*7500/34),tier:i<11?'low':i<23?'mid':'high',icon:'dd:enemy-'+i,
 abilities:(i<11?[]:kits[i-11]).map(([key,name,effect],j)=>({id:'enemy-'+i+'-'+j,key,name,effect,cost:effect==='forge'?18:effect==='attack'?12:10,description:effect==='attack'?'Deal '+(i<23?56:84)+' damage.':effect==='drain'?'Halve your largest stored mana pool.':effect==='shield'?'Block 75% of your next damaging action.':effect==='forge'?'Create a wildcard and keep the turn.':'Clear a row, collecting usable mana and Strike damage.'}))
}));
// Additional encounters reuse the existing level/HP/reward scale and tier odds.
const creatureRows=[
 ['Radroach','Irradiated insect',2,'low','intelligence,cool',[]],
 ['Mole Rat','Burrowing mutant',5,'low','os,body',[]],
 ['Mongrel','Feral wasteland dog',8,'low','cool,intelligence',[]],
 ['Yao Guai','Mutated bear',19,'mid','os,intelligence',[['body','Maul','attack']]],
 ['Mister Gutsy','Military hover robot',21,'mid','tech,intelligence',[['os','Suppressing fire','attack']]],
 ['Protectron','Utility security robot',14,'mid','tech,cool',[['tech','Laser pulse','attack']]],
 ['Assaultron','Assault robot',31,'high','tech,os',[['tech','Head laser','attack'],['cool','Optical cloak','shield']]],
 ['Deathclaw','Apex wasteland predator',35,'high','intelligence,cool',[['body','Savage lunge','attack'],['os','Rending sweep','line']]]
];
const creatureEnemies=creatureRows.map(([name,designation,level,tier,weakness,loadout],offset)=>{
 const i=35+offset;return {id:'boss-'+i,name,designation,level,tier,weakness:weakness.split(','),hp:335+(level-1)*35,reward:500+Math.floor((level-1)*7500/34),icon:'dd:enemy-'+i,
 abilities:loadout.map(([key,name,effect],j)=>({id:'enemy-'+i+'-'+j,key,name,effect,cost:effect==='attack'?12:10,description:effect==='attack'?'Deal '+(tier==='mid'?56:84)+' damage.':effect==='shield'?'Block 75% of your next damaging action.':'Clear a row, collecting usable mana and Strike damage.'}))};
});
export const enemies=[...humanEnemies,...creatureEnemies];
// Used only to migrate old saved logs and reward history; never displayed.
export const legacyNames=rows.map(([alias,name])=>[alias,name]);
