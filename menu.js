// UniPosto Menu – F G H I J K Buttons
const menuData = [
  {id:'F',name:'Content',icon:'📁',action:'content'},
  {id:'G',name:'Analytics',icon:'📊',action:'analytics'},
  {id:'H',name:'Comments',icon:'💬',action:'comments'},
  {id:'I',name:'Messages',icon:'✉️',action:'messages'},
  {id:'J',name:'Settings',icon:'⚙️',action:'settings'},
  {id:'K',name:'Report',icon:'🐞',action:'report'}
];

function renderMenu(){
  const menu = document.getElementById('menuBar');
  if(!menu)return;
  menu.innerHTML='';
  menuData.forEach(item=>{
    const btn=document.createElement('button');
    btn.className='bg-gray-700 text-white px-3 py-1 curve text-sm';
    btn.innerHTML=`${item.icon} ${item.name}`;
    btn.onclick=()=>openMenuModal(item.action);
    menu.appendChild(btn);
  });
}

function openMenuModal(action){
  const actions={
    content:()=>openContentModal(),
    analytics:()=>openAnalyticsModal(),
    comments:()=>openCommentsModal(),
    messages:()=>openMessagesModal(),
    settings:()=>openSettingsModal(),
    report:()=>openReportModal()
  };
  if(actions[action])actions[action]();
}

// ===== CONTENT MODAL (G) =====
function openContentModal(){
  const html=`
    <div class="modal-content">
      <h2>Content</h2>
      <div class="grid grid-cols-2 gap-2 text-sm">
        <button onclick="selectPlatform('YouTube')">📺 YouTube</button>
        <button onclick="selectPlatform('Instagram')">📸 Instagram</button>
        <button onclick="selectPlatform('Facebook')">👤 Facebook</button>
        <button onclick="selectPlatform('Moj')">🎵 Moj</button>
        <button onclick="selectPlatform('Snapchat')">👻 Snapchat</button>
        <button onclick="selectPlatform('Pinterest')">📌 Pinterest</button>
      </div>
      <div id="contentPanel"></div>
    </div>
  `;
  showModal(html);
}

function selectPlatform(name){
  const panel=document.getElementById('contentPanel');
  panel.innerHTML=`<p class="mt-2">Loading ${name} content…</p>`;
  // Real content load after backend – placeholder now
}

// ===== ANALYTICS MODAL (H) =====
function openAnalyticsModal(){
  const html=`
    <div class="modal-content">
      <h2>Analytics</h2>
      <div class="grid grid-cols-2 gap-2 text-sm">
        <button onclick="showAnalytics('YouTube')">📺 YouTube</button>
        <button onclick="showAnalytics('Instagram')">📸 Instagram</button>
        <button onclick="showAnalytics('Facebook')">👤 Facebook</button>
        <button onclick="showAnalytics('Moj')">🎵 Moj</button>
        <button onclick="showAnalytics('Snapchat')">👻 Snapchat</button>
        <button onclick="showAnalytics('Pinterest')">📌 Pinterest</button>
      </div>
      <div id="analyticsPanel"></div>
    </div>
  `;
  showModal(html);
}

function showAnalytics(name){
  const panel=document.getElementById('analyticsPanel');
  panel.innerHTML=`<p class="mt-2">Loading ${name} analytics…</p>`;
  // Real analytics after backend – placeholder now
}

// ===== COMMENTS MODAL (I) =====
function openCommentsModal(){
  const html=`
    <div class="modal-content">
      <h2>Comments</h2>
      <div class="flex space-x-2 mb-2">
        <button onclick="showComments('YouTube')">📺 YouTube</button>
        <button onclick="showComments('Instagram')">📸 Instagram</button>
        <button onclick="showComments('Facebook')">👤 Facebook</button>
        <button onclick="showComments('Snapchat')">👻 Snapchat</button>
        <button onclick="showComments('Pinterest')">📌 Pinterest</button>
      </div>
      <div id="commentsPanel"></div>
    </div>
  `;
  showModal(html);
}

function showComments(name){
  const panel=document.getElementById('commentsPanel');
  panel.innerHTML=`<p class="mt-2">Loading ${name} comments…</p>`;
  // Real comments after backend – placeholder now
}

// ===== MESSAGES MODAL (I) =====
function openMessagesModal(){
  const html=`
    <div class="modal-content">
      <h2>Messages</h2>
      <div class="flex space-x-2 mb-2">
        <button onclick="showMessages('Instagram')">📸 Instagram</button>
        <button onclick="showMessages('Facebook')">👤 Facebook</button>
      </div>
      <div id="messagesPanel"></div>
    </div>
  `;
  showModal(html);
}

function showMessages(name){
  const panel=document.getElementById('messagesPanel');
  panel.innerHTML=`<p class="mt-2">Loading ${name} messages…</p>`;
  // Real messages after backend – placeholder now
}

// ===== SETTINGS MODAL (J) =====
function openSettingsModal(){
  const html=`
    <div class="modal-content">
      <h2>Settings</h2>
      <label class="block mb-2">Dark Mode <input type="checkbox" id="darkToggle"></label>
      <label class="block mb-2">Language
        <select id="langSelect">
          <option>English</option><option>Hindi</option><option>Urdu</option>
        </select>
      </label>
      <button onclick="saveSettings()" class="bg-green-500 text-white px-3 py-1 curve">Save</button>
    </div>
  `;
  showModal(html);
}

function saveSettings(){
  const dark=document.getElementById('darkToggle').checked;
  const lang=document.getElementById('langSelect').value;
  localStorage.setItem('darkMode',dark);
  localStorage.setItem('language',lang);
  alert('Settings saved!');
  closeModal();
}

// ===== REPORT MODAL (K) =====
function openReportModal(){
  const html=`
    <div class="modal-content">
      <h2>Report Issue</h2>
      <select class="w-full border rounded p-1 mb-2"><option>Bug</option><option>Feature</option></select>
      <textarea class="w-full border rounded p-1 mb-2" rows="3" placeholder="Describe issue…"></textarea>
      <button onclick="submitReport()" class="bg-red-500 text-white px-3 py-1 curve">Submit</button>
    </div>
  `;
  showModal(html);
}

function submitReport(){
  alert('Ticket #123 created – we’ll reply within 24 hrs');
  closeModal();
}

// ===== HELPER =====
function showModal(html){
  const modal=document.createElement('div');
  modal.className='modal';
  modal.innerHTML=`<div class="modal-content">${html}<button onclick="closeModal()" class="mt-2">Close</button></div>`;
  document.body.appendChild(modal);
  modal.addEventListener('click',e=>{if(e.target===modal)closeModal();});
}
function closeModal(){
  const m=document.querySelector('.modal:not(#uploadModal):not(#notifModal):not(#helpModal)');
  if(m) m.remove();
}

// ===== INIT =====
renderMenu();
