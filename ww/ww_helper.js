window.__sleep=ms=>new Promise(r=>setTimeout(r,ms));
window.__base='https://raw.githubusercontent.com/everleaf-studio/cashquest/main/ww/b1l2/';
window.__vis=sel=>[...document.querySelectorAll(sel)].filter(e=>e.offsetParent);
window.__byText=(t)=>[...document.querySelectorAll('a,button,span,div')].filter(e=>e.offsetParent&&e.children.length<3&&e.textContent.trim()===t);
window.__rows=()=>[...document.querySelectorAll('.editor-child-items.double-item')];
if(!window.__patched){const orig=HTMLInputElement.prototype.click; HTMLInputElement.prototype.click=function(){ if(this.type==='file') return; return orig.call(this)}; window.__patched=1;}
window.__put=async(id,url,name,type)=>{const r=await fetch(url);const b=await r.blob();const f=new File([b],name,{type});const dt=new DataTransfer();dt.items.add(f);const inp=document.getElementById(id);inp.files=dt.files;inp.dispatchEvent(new Event('change',{bubbles:true}));return r.status;};
window.__fillRow=async(i,key,word)=>{
  let rows=__rows();
  while(rows.length<=i){ document.querySelector('.js-editor-add-item').click(); await __sleep(400); rows=__rows(); }
  const [kw,df]=rows[i].querySelectorAll(':scope > .double-inner'); const log=[];
  if(kw.querySelector('.js-item-image-holder.empty')){
    kw.querySelector('.js-item-image-holder').click(); await __sleep(700);
    const lab=__vis('.upload-label')[0]; (lab.closest('a,button,div')||lab).click(); await __sleep(300);
    await __put('image_uploader',__base+key+'.jpg',key+'.jpg','image/jpeg');
    for(let t=0;t<30&&kw.querySelector('.js-item-image-holder.empty');t++) await __sleep(300);
    log.push(kw.querySelector('.js-item-image-holder.empty')?'NOIMG':'img');
  }
  const ed=df.querySelector('[contenteditable=true]'); ed.focus(); document.getSelection().selectAllChildren(ed); document.execCommand('insertText',false,word); ed.blur(); await __sleep(200);
  const sh=df.querySelector('.js-item-sound-holder');
  if(sh.classList.contains('empty')){
    sh.click(); await __sleep(700);
    __byText('Upload sound')[0].click(); await __sleep(300);
    await __put('audio_uploader',__base+key+'.mp3',key+'.mp3','audio/mpeg');
    let ok=null; for(let t=0;t<30&&!(ok=__byText('OK')[0]);t++) await __sleep(300);
    if(ok){ ok.click(); await __sleep(500);}
    log.push(df.querySelector('.js-item-sound-holder.empty')?'NOSND':'snd');
  }
  return word+':'+log.join('/');
};
window.__make=async(title,list)=>{const out=[]; for(let j=0;j<list.length;j++) out.push(await __fillRow(j,list[j][0],list[j][1]));
  const t=document.querySelector('textarea.js-activity-title'); t.focus(); t.select(); document.execCommand('insertText',false,title); t.dispatchEvent(new Event('change',{bubbles:true})); t.blur();
  return out.join(' ')+' | '+t.value+' rows='+__rows().length;};
