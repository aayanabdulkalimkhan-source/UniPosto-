// UniPosto – Zero-Coding Mobile Build
const platforms = [
  {name:'YouTube',icon:'📺',hasPrivacy:true,types:['Video','Reel','Post']},
  {name:'Instagram',icon:'📸',hasPrivacy:false,types:['Post','Reel'],story:true},
  {name:'Facebook',icon:'👤',hasPrivacy:false,types:['Post','Reel'],story:true},
  {name:'Moj',icon:'🎵',hasPrivacy:false,types:['Reel']},
  {name:'Snapchat',icon:'👻',hasPrivacy:false,types:['Reel'],story:true},
  {name:'Pinterest',icon:'📌',hasPrivacy:true,types:[],link:true,maxDays:29}
];

let selectedFile = null;
let activePlatforms = {};

// ===== MODAL TOGGLES =====
const uploadBtn = document.getElementById('uploadBtn');
const uploadModal = document.getElementById('uploadModal');
const closeModal = document.getElementById('closeModal');
const notifBtn = document.getElementById('notifBtn');
const notifModal = document.getElementById('notifModal');
const closeNotif = document.getElementById('closeNotif');
const helpBtn = document.getElementById('helpBtn');
const helpModal = document.getElementById('helpModal');
const closeHelp = document.getElementById('closeHelp');
const selectAllBtn = document.getElementById('selectAll');
const uploadAllBtn = document.getElementById('uploadAll');
const platformGrid = document.getElementById('platformGrid');
const fileInput = document.getElementById('fileInput');
const preview = document.getElementById('preview');
const caption = document.getElementById('caption');
const notifList = document.getElementById('notifList');
const clearNotifBtn = document.getElementById('clearNotif');
const helpSearch = document.getElementById('helpSearch');
const helpList = document.getElementById('helpList');

[uploadBtn,closeModal,notifBtn,closeNotif,helpBtn,closeHelp,selectAllBtn,clearNotifBtn].forEach(btn=>btn.addEventListener('click',toggleModal));

function toggleModal(e){
  const id={uploadBtn:'uploadModal',closeModal:'uploadModal',notifBtn:'notifModal',closeNotif:'notifModal',helpBtn:'helpModal',closeHelp:'helpModal',selectAllBtn:'uploadModal',clearNotifBtn:'notifModal'}[e.target.id];
  if(id) document.getElementById(id).classList.toggle('hidden');
}

// ===== PLATFORM GRID =====
function renderPlatforms(){
  platformGrid.innerHTML='';
  platforms.forEach(p=>{
    const card=document.createElement('div');
    card.className='border rounded p-2 bg-white text-black';
    card.innerHTML=`
      <div class="flex items-center mb-1">
        <input type="checkbox" class="platform-tick mr-2" data-platform="${p.name}">
        <span>${p.icon} ${p.name}</span>
      </div>
      <input type="text" placeholder="Name" class="name-inp w-full border rounded p-1 mb-1" maxlength="100">
      ${p.hasPrivacy?`<select class="privacy-select w-full border rounded p-1 mb-1"><option>Public</option><option>Private</option><option>Schedule</option></select>`:''}
      ${p.types.length?`<select class="type-select w-full border rounded p-1 mb-1"><option>${p.types.join('</option><option>')}</option></select>`:''}
      ${p.story?`<label class="flex items-center text-xs"><input type="checkbox" class="story-checkbox mr-1">Add to Story</label>`:''}
      ${p.link?`<input type="url" placeholder="Link" class="link-inp w-full border rounded p-1 mb-1">`:''}
      <textarea placeholder="Description" class="desc-inp w-full border rounded p-1 mb-1" rows="2" maxlength="${p.name==='Pinterest'?800:5000}"></textarea>
      <div class="text-xs text-gray-500 mb-1">0/100</div>
    `;
    platformGrid.appendChild(card);
  });
  document.querySelectorAll('.platform-tick').forEach(tick=>{
    tick.addEventListener('change',e=>{
      const card=e.target.closest('div');
      const platform=e.target.dataset.platform;
      if(e.target.checked){
        activePlatforms[platform]={name:'',desc:'',privacy:'Public',type:'',story:false,link:''};
        card.classList.add('border-green-500');
      }else{
        delete activePlatforms[platform];
        card.classList.remove('border-green-500');
      }
    });
  });
}

// ===== FILE + PREVIEW =====
fileInput.addEventListener('change',e=>{
  selectedFile=e.target.files[0];
  if(!selectedFile)return;
  const url=URL.createObjectURL(selectedFile);
  preview.innerHTML=selectedFile.type.startsWith('image/')?`<img src="${url}" class="w-full curve">`:`<video src="${url}" controls class="w-full curve"></video>`;
  if(selectedFile.type.startsWith('video/')){
    const video=document.createElement('video');
    video.src=url;
    video.addEventListener('loadedmetadata',()=>{
      const dur=video.duration;
      if(dur>180&&platforms.find(p=>p.name==='Pinterest')){
        const pTick=document.querySelector('[data-platform="Pinterest"]');
        if(pTick)pTick.checked=false;pTick.dispatchEvent(new Event('change'));
        alert('Pinterest skipped – video > 3 min');
      }
    });
  }
});

// ===== UPLOAD ALL =====
uploadAllBtn.addEventListener('click',async()=>{
  if(!selectedFile){alert('Choose file first');return;}
  if(Object.keys(activePlatforms).length===0){alert('Select at least one platform');return;}
  const captionText=caption.value.trim();
  for(const[name,obj] of Object.entries(activePlatforms)){
    obj.name=obj.name||captionText.slice(0,100);
    obj.desc=obj.desc||captionText;
    await uploadToPlatform(name,obj);
  }
  alert('Upload queued – check platform!');
});

async function uploadToPlatform(name,data){
  // Placeholder – real API calls will be added after backend deploy
  console.log('Upload to',name,data);
  // Simulate success
  setTimeout(()=>addNotification(`${name} upload scheduled`),1000);
}

// ===== NOTIFICATIONS =====
function addNotification(text){
  const li=document.createElement('li');
  li.className='p-2 border-b cursor-pointer';
  li.textContent=text;
  li.addEventListener('click',()=>li.style.opacity='0.5');
  notifList.appendChild(li);
}
// Dummy notifications
addNotification('Post scheduled on YouTube');
addNotification('Instagram token expired');

// ===== HELP FAQ =====
const faq=[
  {q:'How to use website?',a:'Sign in → upload → select platforms → post.'},
  {q:'View or delete notification history',a:'Click bell → long press → delete.'},
  {q:'Connect social accounts',a:'Settings → Connected Accounts → toggle.'},
  {q:'Schedule posts',a:'Select platform → choose schedule → set date/time.'},
  {q:'Report issues',a:'Bottom-left → Report Issue → fill form → submit.'}
];
helpSearch.addEventListener('input',e=>{
  const val=e.target.value.toLowerCase();
  helpList.innerHTML='';
  faq.filter(item=>item.q.toLowerCase().includes(val)||item.a.toLowerCase().includes(val)).forEach(item=>{
    const div=document.createElement('div');
    div.className='mb-2';
    div.innerHTML=`<div class="font-bold">${item.q}</div><div class="text-sm text-gray-600">${item.a}</div>`;
    helpList.appendChild(div);
  });
});
helpSearch.dispatchEvent(new Event('input'));

// ===== INIT =====
renderPlatforms();
                    
