const rows=[
['Rusty Jack','Jack Mulligan','Raider scaver','body,os'],['Sister Agnes','Agnes Chu','Children of Atom preacher','cool,intelligence'],['Brick','Bruno Kessel','Raider enforcer','intelligence,tech'],['Tin Can','Sena Adeyemi','Scrap broker','tech,cool'],['Hollywood','Cassius Wren','Raider mouthpiece','os,body'],['Two-Step','Toma Ilie','Skimming caravan fixer','cool,intelligence'],['Splint','Rea Marchetti','Gunner merc','body,os'],['Bittercup','Marisol Vega','Raider chemist','intelligence,body'],['Ratline','Pete Harker','Tunnel scavver','os,cool'],['Fizz','Nadia Okonkwo','Jet cook','body,tech'],['Half-Pint','Ellis Ward','Raider scout','tech,cool'],['Dogpile','Marek Skala','Feral wrangler','os,intelligence'],['Copperhead','June Salazar','Wire thief','tech,body'],['Whistle','Oskar Lindqvist','Caravan lookout','cool,os'],['Grub','Tibor Nagy','Ghoul scavver','intelligence,tech'],['Salt Lick','Delphine Roux','Mirelurk poacher','body,cool'],['Blue Tick','Harlan Moss','Radhound handler','os,tech'],['Needy','Sasha Petrov','Raider informant','intelligence,body'],['Wrench','Odell Pryce','Makeshift armorer','tech,cool'],['Slow Sam','Samuel Adjei','Chem-addled guard','intelligence,os'],['Hacksaw','Vera Kovács','Dismemberment hobbyist','body,intelligence'],['Peel','Delroy Simmons','Skin trader','cool,tech'],['Tinderbox','Anja Brandt','Incendiary specialist','os,body'],['Blister','Corey Nakamura','Glowing one handler','tech,intelligence'],['Mother Mary','Maryam Aziz','Cult matron','cool,os'],['Scratch','Lonnie Pierce','Bookie','intelligence,cool'],['Spoke','Dmitri Volkov','Bike raider','body,tech'],['Tin Whistle','Esme Calloway','Sniper spotter','os,cool'],['Coldcuts','Wesley Boone','Butcher-raider','intelligence,body'],['Gutter','Rina Takahashi','Sewer guide','tech,os'],['Lampy','Arlo Fenwick','Sentry-bot tinkerer','tech,cool'],['Pox','Bianca Moretti','Disease vector','body,intelligence'],['Scupper','Ned Okafor','Dockside extortionist','cool,tech'],['Halligan','Britt Sørensen','Breacher','os,intelligence'],['Candle','Yusra Haddad','Powder monkey','body,cool']];

const humanEnemies=rows.map(([,name,designation,weakness],i)=>({
 id:'boss-'+i,name,designation,weakness:weakness.split(','),level:i+1,hp:335+i*35,
 reward:500+Math.floor(i*7500/34),tier:i<11?'low':i<23?'mid':'high',icon:'dd:enemy-'+i
}));
// Additional encounters reuse the existing level/HP/reward scale and tier odds.
const creatureRows=[
 ['Radroach','Irradiated insect',2,'low','intelligence,cool'],
 ['Mole Rat','Burrowing mutant',5,'low','os,body'],
 ['Mongrel','Feral wasteland dog',8,'low','cool,intelligence'],
 ['Yao Guai','Mutated bear',19,'mid','os,intelligence'],
 ['Mister Gutsy','Military hover robot',21,'mid','tech,intelligence'],
 ['Protectron','Utility security robot',14,'mid','tech,cool'],
 ['Assaultron','Assault robot',31,'high','tech,os'],
 ['Deathclaw','Apex wasteland predator',35,'high','intelligence,cool']
];
const creatureEnemies=creatureRows.map(([name,designation,level,tier,weakness],offset)=>{
 const i=35+offset;return {id:'boss-'+i,name,designation,level,tier,weakness:weakness.split(','),hp:335+(level-1)*35,reward:500+Math.floor((level-1)*7500/34),icon:'dd:enemy-'+i};
});
const abilityNames=[["Scavenger sweep"],["Atom tithe"],["Breach pattern"],["Scrap tax"],["Rally signal"],["Caravan feint"],["Suppressing lane"],["Catalyst"],["Tunnel sabotage"],["Chemical conversion"],["Scout signal"],["Hound signal"],["Live-wire snare"],["False opening"],["Scrap ambush"],["Shell breaker"],["Pack command"],["False intel"],["Rivet armor"],["Chemical haze"],["Saw rush"],["Cold bargain"],["Flash trap"],["Radiant arc","Static cloud"],["Zealot ward","Sermon surge"],["House advantage","Loaded deck"],["Ramming speed","Chrome shrapnel"],["Marked shot","Smoke screen"],["Cleaver strike","Pressure point"],["Floodgate","Tunnel trap"],["Sentry burst","Decoy shell"],["Spore cloud","Toxic impact"],["Dockside toll","Harpoon burst"],["Breach charge","Demolition plan"],["Powder blast","Ember veil"],["Scuttle guard"],["Burrow"],["Pack rush"],["Maul"],["Suppressing fire"],["Security protocol"],["Head laser","Optical jammer"],["Savage lunge","Rending sweep"]];
const baseEnemies=[...humanEnemies,...creatureEnemies];
// Curated strategic loadouts. The first key is the single Low/Mid attack circuit;
// both keys are attack circuits for High opponents. No enemy ability heals.
const plans=[
 ['body','line','overdrive'],['intelligence','drain','lock'],['body','convert','plating'],['tech','drain','siphon'],['cool','forge','lock'],['cool','shield','siphon'],['os','line','counter'],['intelligence','convert','veil'],['os','disrupt','mines'],['tech','convert','siphon'],['os','forge','veil'],
 ['os','convert','counter'],['tech','disrupt','mines'],['cool','shield','lock'],['tech','convert','siphon'],['body','line','counter'],['os','convert','overdrive'],['intelligence','drain','veil'],['tech','shield','plating'],['intelligence','disrupt','veil'],['body','line','overdrive'],['cool','disrupt','siphon'],['os','convert','mines'],
 ['tech','convert','veil','intelligence','disrupt'],['cool','shield','lock','os','convert'],['intelligence','drain','reboot','cool','forge'],['body','line','overdrive','tech','convert'],['os','convert','counter','cool','shield'],['body','line','counter','intelligence','disrupt'],['tech','line','mines','os','drain'],['tech','convert','reboot','cool','shield'],['intelligence','disrupt','lock','body','convert'],['cool','drain','siphon','tech','line'],['os','line','mines','intelligence','forge'],['body','convert','overdrive','cool','shield'],
 ['body','shield','plating'],['body','line','mines'],['cool','convert','overdrive'],['body','line','counter'],['os','convert','mines'],['tech','shield','plating'],['tech','line','veil','cool','disrupt'],['body','line','counter','os','convert']
];
export const enemies=baseEnemies.map((enemy,i)=>{
 const [key,effect,talent,key2,effect2]=plans[i],rank=enemy.tier==='high'?2:enemy.tier==='mid'?1:0;
 const make=(key,effect,j)=>{const axis=(i+j)%2?'column':'row',name=abilityNames[i][j];
 const descriptions={line:`Clear a selected ${axis}, collecting usable mana and dealing damage from Strike and attack circuits. Four-matches can grant another action.`,convert:`Convert up to ${rank+1} circuits into Strikes, resolve any matches and collect usable mana.`,drain:`Steal up to ${[1,2,3][rank]} mana from your largest pool, then convert one circuit into the enemy attack type.`,disrupt:`Remove up to ${rank+1} Wildcards by converting them to the enemy attack type, and drain up to ${[1,2,3][rank]} of your strongest mana.`,shield:'Block 75% of the next damaging player action and gain two mana in this channel.',forge:'Create a Wildcard next to a valuable circuit and keep the turn.'};
 return {id:'enemy-'+i+'-'+j,key,name,effect,axis,cost:effect==='forge'?[8,12,18][rank]:[8,10,12][rank],description:descriptions[effect]};};
 return {...enemy,baseHP:enemy.hp,hp:enemy.hp*(rank>0?2:1),talent,attackCircuits:key2?[key,key2]:[key],abilities:[make(key,effect,0),...(key2?[make(key2,effect2,1)]:[])]};
});
// Used only to migrate old saved logs and reward history; never displayed.
export const legacyNames=rows.map(([alias,name])=>[alias,name]);
