window.__assign=async()=>{const sleep=ms=>new Promise(r=>setTimeout(r,ms)); const vis=t=>[...document.querySelectorAll('a,button,span,div,label')].filter(e=>e.offsetParent&&e.children.length<3&&e.textContent.trim()===t);
let sa=null; for(let t=0;t<30&&!(sa=vis('Set Assignment')[0]);t++) await sleep(300);
sa.click(); let lab=[]; for(let t=0;t<30&&!(lab=vis('Leaderboard')).length;t++) await sleep(300);
const box=lab.map(e=>(e.closest('label')||e.parentElement).querySelector('input[type=checkbox]')).find(x=>x); if(!box.checked) box.click(); await sleep(300); const ok=box.checked;
const s=vis('Start')[0]; (s.closest('button,a')||s).click(); let link=null; for(let t=0;t<30&&!link;t++){ await sleep(400); link=[...document.querySelectorAll('input')].map(i=>i.value).find(v=>/wordwall\.net\/play/.test(v)); }
return document.title.replace(' - Find the match','')+' | LB='+ok+' | '+link;};
