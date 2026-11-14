// Health-driven surface damage: low-opacity glass sits below every label and control.
export function glassDamage(hp,max,marks=[],shield=false){
 const severity=Math.max(0,Math.min(1,1-hp/max)),count=Math.min(12,Math.ceil(severity*12));
 const points=marks.slice(-count);while(points.length<count)points.unshift({x:18+(points.length*29)%65,y:18+(points.length*37)%65});
 return `<svg class="damage-glass ${shield?'cloak-glass':''}" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><g class="glass-cracks">${points.map((p,i)=>{const x=p.x,y=p.y,length=5+severity*13;return `<path d="M${x} ${y}l${-length} ${-length*.4} 2 -4m${length-2} ${length*.4+4}l${length*.5} ${length} 5 2m${-length*.5-5} ${-length-2}l${length} ${-length*.6}"/><ellipse cx="${x}" cy="${y}" rx="1.6" ry="1.1" class="glass-hole"/>`;}).join('')}</g></svg>${shield?'<span class="cloak-shell" aria-hidden="true"></span>':''}`;
}
export function encounterCountdown(deadline,now=Date.now()){const seconds=Math.max(0,Math.ceil((deadline-now)/1000)),days=Math.floor(seconds/86400),hours=Math.floor(seconds%86400/3600),minutes=Math.floor(seconds%3600/60);return seconds===0?'Encounter expired':seconds<60?seconds+'s remaining':`${days}d ${hours}h ${minutes}m remaining`;}
