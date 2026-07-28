'use strict';

// ─── FIREBASE SYNC CONFIG ────────────────────────────────────────────────────
// Setup (free, ~2 minutes):
//   1. https://console.firebase.google.com → create project → add web app
//   2. In the project: Build → Realtime Database → Create database → "Start in test mode"
//   3. Paste the firebaseConfig object below
//   4. That's it — all visitors share the same labels in real-time
//
// Leave as null to run offline (labels stored in localStorage only).
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyCheoDVBhQL9zyKwSyrQyZ8-dBp_oPN2qk",
  authDomain: "seige-maps.firebaseapp.com",
  databaseURL: "https://seige-maps-default-rtdb.firebaseio.com",
  projectId: "seige-maps",
  storageBucket: "seige-maps.firebasestorage.app",
  messagingSenderId: "1063507738692",
  appId: "1:1063507738692:web:4d55f32ea37d4d7a067c11"
};

// const FIREBASE_CONFIG = {
//   apiKey:            "AIzaSy...",
//   authDomain:        "your-app.firebaseapp.com",
//   databaseURL:       "https://your-app-default-rtdb.firebaseio.com",
//   projectId:         "your-app",
//   storageBucket:     "your-app.appspot.com",
//   messagingSenderId: "123456789",
//   appId:             "1:123456789:web:abc123",
// };

// ─── MAP DATA ────────────────────────────────────────────────────────────────

const MAPS = [
  {
    id: 'bank', name: 'Bank',
    floors: [
      { label: 'Basement', file: 'Bank/Siege_Bank_Layout_1.jpg.png' },
      { label: '1F', file: 'Bank/Siege_Bank_Layout_2.jpg.png' },
      { label: '2F', file: 'Bank/Siege_Bank_Layout_3.jpg.png' },
      { label: '3F', file: 'Bank/Siege_Bank_Layout_4.jpg.png' },
    ]
  },
  {
    id: 'border', name: 'Border',
    floors: [
      { label: '1F', file: 'Border/R6-maps-border-blueprint-1.jpg.png' },
      { label: '2F', file: 'Border/R6-maps-border-blueprint-2.jpg.png' },
      { label: 'Roof', file: 'Border/R6-maps-border-blueprint-3.jpg.png' },
    ]
  },
  {
    id: 'calypso', name: 'Calypso Casino',
    floors: [
      { label: 'Basement', file: 'Calypso_Casino/R6S_Maps_CalypsoCasino_Basement.png' },
      { label: '1F', file: 'Calypso_Casino/R6S_Maps_CalypsoCasino_1F.png' },
      { label: '2F', file: 'Calypso_Casino/R6S_Maps_CalypsoCasino_2F.png' },
      { label: 'Roof', file: 'Calypso_Casino/R6S_Maps_CalypsoCasino_Roof.png' },
    ]
  },
  {
    id: 'chalet', name: 'Chalet',
    floors: [
      { label: 'Basement', file: 'Chalet/Siege_Chalet_Layout_1.jpg.png' },
      { label: '1F', file: 'Chalet/Siege_Chalet_Layout_2.jpg.png' },
      { label: '2F', file: 'Chalet/Siege_Chalet_Layout_3.jpg.png' },
      { label: '3F', file: 'Chalet/Siege_Chalet_Layout_4.jpg.png' },
    ]
  },
  {
    id: 'clubhouse', name: 'Clubhouse',
    floors: [
      { label: 'B1', file: 'Clubhouse/Club_B1.png' },
      { label: '1F', file: 'Clubhouse/Club_Floor_1.png' },
      { label: '2F', file: 'Clubhouse/Club_Floor_2.png' },
      { label: 'Roof', file: 'Clubhouse/Club_roof.png' },
    ]
  },
  {
    id: 'coastline', name: 'Coastline',
    floors: [
      { label: '1F', file: 'Coastline/Coastline_Floor_1.png' },
      { label: '2F', file: 'Coastline/Coastline_Floor_2.png' },
      { label: 'Roof', file: 'Coastline/Coastline_Roof.png' },
    ]
  },
  {
    id: 'consulate', name: 'Consulate',
    floors: [
      { label: 'B1', file: 'Consulate/Siege_Consulate_Layout_1.jpg.png' },
      { label: '1F', file: 'Consulate/Siege_Consulate_Layout_2.jpg.png' },
      { label: '2F', file: 'Consulate/Siege_Consulate_Layout_3.jpg.png' },
      { label: '3F', file: 'Consulate/Siege_Consulate_Layout_4.jpg.png' },
    ]
  },
  {
    id: 'emerald', name: 'Emerald Plains',
    floors: [
      { label: '1F', file: 'Emerald_Plains/Emerald-plains-blueprint-floor-1.webp.png' },
      { label: '2F', file: 'Emerald_Plains/Emerald-plains-blueprint-floor-2.webp.png' },
      { label: 'Roof', file: 'Emerald_Plains/Emerald-plains-blueprint-roof.webp.png' },
    ]
  },
  {
    id: 'favela', name: 'Favela',
    floors: [
      { label: '1F', file: 'Favela/R6S_Live_Y6S2_IMG_Favela_1stFloor.jpg.png' },
      { label: '2F', file: 'Favela/R6S_Live_Y6S2_IMG_Favela_2ndFloor.jpg.png' },
      { label: '3F', file: 'Favela/R6S_Live_Y6S2_IMG_Favela_3rdFloor.jpg.png' },
      { label: 'Roof', file: 'Favela/R6S_Live_Y6S2_IMG_Favela_Roof.jpg.png' },
    ]
  },
  {
    id: 'fortress', name: 'Fortress',
    floors: [
      { label: '1F', file: 'Fortress/Fortress_0.webp' },
      { label: '2F', file: 'Fortress/Fortress_1.webp' },
      { label: '3F', file: 'Fortress/Fortress_2.webp' },
    ]
  },
  {
    id: 'house', name: 'House',
    floors: [
      { label: 'B1', file: 'House/Siege_House_Layout_1.jpg.png' },
      { label: '1F', file: 'House/Siege_House_Layout_2.jpg.png' },
      { label: '2F', file: 'House/Siege_House_Layout_3.jpg.png' },
      { label: 'Roof', file: 'House/Siege_House_Layout_4.jpg.png' },
    ]
  },
  {
    id: 'kafe', name: 'Kafe Dostoyevsky',
    floors: [
      { label: '1F', file: 'Kafe_Dostoyevsky/Siege_Kafe_Map_Layout_1.jpg.png' },
      { label: '2F', file: 'Kafe_Dostoyevsky/Siege_Kafe_Map_Layout_2.jpg.png' },
      { label: '3F', file: 'Kafe_Dostoyevsky/Siege_Kafe_Map_Layout_3.jpg.png' },
      { label: 'Roof', file: 'Kafe_Dostoyevsky/Siege_Kafe_Map_Layout_4.jpg.png' },
    ]
  },
  {
    id: 'kanal', name: 'Kanal',
    floors: [
      { label: 'B1', file: 'Kanal/Siege_Kanal_Blueprint_1.jpg.png' },
      { label: '1F', file: 'Kanal/Siege_Kanal_Blueprint_2.jpg.png' },
      { label: '2F', file: 'Kanal/Siege_Kanal_Blueprint_3.jpg.png' },
      { label: '3F', file: 'Kanal/Siege_Kanal_Blueprint_4.jpg.png' },
      { label: 'Roof', file: 'Kanal/Siege_Kanal_Blueprint_5.jpg.png' },
    ]
  },
  {
    id: 'lair', name: 'Lair',
    floors: [
      { label: 'Basement', file: 'Lair/R6Map_Lair_Blueprint_Basement.jpg.png' },
      { label: '1F', file: 'Lair/R6Map_Lair_Blueprint_1st-Floor.jpg.png' },
      { label: '2F', file: 'Lair/R6Map_Lair_Blueprint_2nd-Floor.jpg.png' },
      { label: 'Roof', file: 'Lair/R6Map_Lair_Blueprint_Roof.jpg.png' },
    ]
  },
  {
    id: 'nighthaven', name: 'Nighthaven Labs',
    floors: [
      { label: '1F', file: 'Nighthaven_Labs/R6-maps-nighthavenlabs-blueprint-1.jpg.png' },
      { label: '2F', file: 'Nighthaven_Labs/R6-maps-nighthavenlabs-floor2.jpg.png' },
      { label: 'Roof', file: 'Nighthaven_Labs/R6-maps-nighthavenlabs-blueprint-4-thumb.webp.png' },
    ]
  },
  {
    id: 'oregon', name: 'Oregon',
    floors: [
      { label: 'B1', file: 'Oregon/Siege_Oregon_Layout_1.jpg.png' },
      { label: '1F', file: 'Oregon/Siege_Oregon_Layout_2.jpg.png' },
      { label: '2F', file: 'Oregon/Siege_Oregon_Layout_3.jpg.png' },
      { label: '3F', file: 'Oregon/Siege_Oregon_Layout_4.jpg.png' },
      { label: 'Roof', file: 'Oregon/Siege_Oregon_Layout_5.jpg.png' },
    ]
  },
  {
    id: 'outback', name: 'Outback',
    floors: [
      { label: 'B1', file: 'Outback/Siege_Outback_Layout_1.jpg.png' },
      { label: '1F', file: 'Outback/Siege_Outback_Layout_2.jpg.png' },
      { label: '2F', file: 'Outback/Siege_Outback_Layout_3.jpg.png' },
      { label: 'Roof', file: 'Outback/Siege_Outback_Layout_4.jpg.png' },
    ]
  },
  {
    id: 'plane', name: 'Presidential Plane',
    floors: [
      { label: 'Cargo', file: 'Presidential_Plane/Siege_Plane_Layout_1.jpg.png' },
      { label: 'Main', file: 'Presidential_Plane/Siege_Plane_Layout_2.jpg.png' },
      { label: 'Upper', file: 'Presidential_Plane/Siege_Plane_Layout_3.jpg.png' },
      { label: 'Exterior', file: 'Presidential_Plane/Siege_Plane_Layout_4.jpg.png' },
    ]
  },
  {
    id: 'skyscraper', name: 'Skyscraper',
    floors: [
      { label: '1F', file: 'Skyscraper/R6-maps-skyscraper-blueprint-1.jpg.png' },
      { label: '2F', file: 'Skyscraper/R6-maps-skyscraper-blueprint-2.jpg.png' },
      { label: 'Roof', file: 'Skyscraper/R6-maps-skyscraper-blueprint-3.jpg.png' },
    ]
  },
  {
    id: 'stadium', name: 'Stadium',
    floors: [
      { label: '1F', file: 'Stadium/Stadium_Rework_1st_Floor.jpeg.png' },
      { label: '2F', file: 'Stadium/Stadium_Rework_2nd_Floor.jpeg.png' },
    ]
  },
  {
    id: 'theme_park', name: 'Theme Park',
    floors: [
      { label: '1F', file: 'Theme_Park/Theme_Park_floor_1.png' },
      { label: '2F', file: 'Theme_Park/Theme_Park_floor_2.png' },
      { label: 'Roof', file: 'Theme_Park/Theme_Park_roof.png' },
    ]
  },
  {
    id: 'tower', name: 'Tower',
    floors: [
      { label: '1F', file: 'Tower/Map_-_Tower_-_1st_floor.png' },
      { label: '2F', file: 'Tower/Map_-_Tower_-_2nd_floor.png' },
      { label: 'Roof', file: 'Tower/Siege_Tower_Layout_Roof.PNG.png' },
    ]
  },
  {
    id: 'villa', name: 'Villa',
    floors: [
      { label: 'B1', file: 'Villa/Villa_Bottom_Floor.jpg.png' },
      { label: '1F', file: 'Villa/Villa_1st_Floor.jpg.png' },
      { label: '2F', file: 'Villa/Villa_2nd_Floor.jpg.png' },
    ]
  },
  {
    id: 'yacht', name: 'Yacht',
    floors: [
      { label: 'B1', file: 'Yacht/Siege_Yacht_Layout_1.jpg.png' },
      { label: '1F', file: 'Yacht/Siege_Yacht_Layout_2.jpg.png' },
      { label: '2F', file: 'Yacht/Siege_Yacht_Layout_3.jpg.png' },
      { label: '3F', file: 'Yacht/Siege_Yacht_Layout_4.jpg.png' },
      { label: 'Roof', file: 'Yacht/Siege_Yacht_Layout_5.jpg.png' },
    ]
  },
];

// ─── CONSTANTS ───────────────────────────────────────────────────────────────

const COLORS = [
  { id: 'white', hex: '#ffffff' },
  { id: 'yellow', hex: '#f0c84a' },
  { id: 'orange', hex: '#f0854a' },
  { id: 'red', hex: '#f07070' },
  { id: 'green', hex: '#50e090' },
  { id: 'blue', hex: '#6090f0' },
  { id: 'purple', hex: '#b070f0' },
];

const LANGUAGES = [
  { id: 'en', name: 'English (Default)' },
  { id: 'fr', name: 'Français' },
  { id: 'de', name: 'Deutsch' },
  { id: 'es', name: 'Español' },
  { id: 'pt', name: 'Português' },
  { id: 'ru', name: 'Русский' },
  { id: 'pl', name: 'Polski' },
  { id: 'nb', name: 'Norsk (Bokmål)' },
  { id: 'ja', name: '日本語' },
  { id: 'ko', name: '한국어' },
  { id: 'zh', name: '中文' },
  { id: 'ar', name: 'العربية' },
  { id: 'tr', name: 'Türkçe' },
];

// ─── STATE ───────────────────────────────────────────────────────────────────

const S = {
  mapId: null,
  floorIdx: 0,
  selectedColor: 'white',
  selectedLabelId: null,
  lang: localStorage.getItem('r6_lang') || 'en',
};

const VP = { scale: 1, ox: 0, oy: 0, minScale: 0.1 };
let isPanning    = false;
let panOrigin    = null;
let panStart     = null; // tracks initial mousedown position to distinguish click vs drag
let didPan       = false;
let activePopup  = null;
let cleanupFns   = [];
let clickTimer          = null; // used to distinguish single-click (edit) from double-click (arrow)
let clickPending        = null;
let suppressNextMapClick = false; // set by arrow-draw onUp to stop the placement click opening add-popup

// ─── FIREBASE SYNC ───────────────────────────────────────────────────────────

// Initialise Firebase once (guard against hot-reload double-init)
let _db = null;
if (FIREBASE_CONFIG) {
  try {
    if (!firebase.apps.length) firebase.initializeApp(FIREBASE_CONFIG);
    _db = firebase.database();
  } catch (e) {
    console.warn('Firebase init failed — running offline:', e);
  }
}

let _fbRef = null; // active onValue listener reference

function syncConnect(mapId, floorIdx) {
  syncDisconnect();
  if (!_db) return;

  setConnStatus('wait');
  _fbRef = _db.ref(`r6/${mapId}/${floorIdx}`);

  _fbRef.on('value',
    (snapshot) => {
      // Guard: ignore if user already navigated away
      if (S.mapId !== mapId || S.floorIdx !== floorIdx) return;
      setConnStatus('live');
      const val = snapshot.val();
      const labels = val ? Object.values(val) : [];
      saveLabels(mapId, floorIdx, labels);
      renderLabels();
    },
    () => setConnStatus('offline'),
  );
}

function syncDisconnect() {
  if (_fbRef) { _fbRef.off(); _fbRef = null; }
  setConnStatus('offline');
}

// Central write function — mirrors syncSend from the WebSocket version
function syncSend(msg) {
  if (!_db) return;
  const base = `r6/${S.mapId}/${S.floorIdx}`;
  switch (msg.type) {
    case 'add':
    case 'update':
      _db.ref(`${base}/${msg.label.id}`).set(msg.label);
      break;
    case 'move':
      _db.ref(`${base}/${msg.id}`).update({ x: msg.x, y: msg.y });
      break;
    case 'delete':
      _db.ref(`${base}/${msg.id}`).remove();
      break;
    case 'clear':
      _db.ref(base).remove();
      break;
  }
}

function setConnStatus(state) {
  const dot = document.getElementById('conn-dot');
  const text = document.getElementById('conn-text');
  if (!dot || !text) return;
  dot.className = `conn-dot ${state}`;
  text.textContent = state === 'live' ? 'Live' : state === 'wait' ? 'Connecting…' : 'Offline';
}

// ─── UTILS ───────────────────────────────────────────────────────────────────

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function uid() { return Math.random().toString(36).slice(2, 9); }
function storageKey(mapId, fi) { return `r6_lbl_${mapId}_${fi}`; }

function getLabels(mapId, fi) {
  try { return JSON.parse(localStorage.getItem(storageKey(mapId, fi)) || '[]'); }
  catch { return []; }
}
function saveLabels(mapId, fi, labels) {
  localStorage.setItem(storageKey(mapId, fi), JSON.stringify(labels));
}

function getLabelDisplay(lbl) {
  if (S.lang === 'en') return lbl.text;
  return lbl.translations?.[S.lang] || lbl.text;
}

function getMapNames() {
  try { return JSON.parse(localStorage.getItem('r6_mapnames') || '{}'); }
  catch { return {}; }
}
function saveMapNames(names) { localStorage.setItem('r6_mapnames', JSON.stringify(names)); }
function getMapDisplayName(mapId) {
  const map = MAPS.find(m => m.id === mapId);
  if (!map) return mapId;
  if (S.lang === 'en') return map.name;
  return getMapNames()[mapId]?.[S.lang] || map.name;
}

function saveMapNameTranslation() {
  const input = document.getElementById('mn-input');
  if (!input) return;
  const val = input.value.trim();
  const names = getMapNames();
  if (!names[S.mapId]) names[S.mapId] = {};
  if (val) names[S.mapId][S.lang] = val;
  else delete names[S.mapId][S.lang];
  if (!Object.keys(names[S.mapId]).length) delete names[S.mapId];
  saveMapNames(names);
  const el = document.getElementById('sb-mapname-display');
  if (el) el.textContent = getMapDisplayName(S.mapId);
}

function cleanup() {
  cleanupFns.forEach(fn => fn());
  cleanupFns = [];
  closePopup();
  syncDisconnect();
}

function addListener(target, event, fn, opts) {
  target.addEventListener(event, fn, opts);
  cleanupFns.push(() => target.removeEventListener(event, fn, opts));
}

function svgIcon(path, size = 12) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`;
}

// ─── ROUTER ──────────────────────────────────────────────────────────────────

function route() {
  const hash = location.hash.replace(/^#\/?/, '');
  const parts = hash.split('/');
  if (parts[0] === 'map' && parts[1]) {
    renderMap(parts[1], parseInt(parts[2]) || 0);
  } else {
    renderHome();
  }
}

window.addEventListener('hashchange', () => { cleanup(); route(); });
document.addEventListener('DOMContentLoaded', route);

// ─── HOME ─────────────────────────────────────────────────────────────────────

function renderHome() {
  S.mapId = null;
  document.title = 'R6 Blueprints';

  const langOpts = LANGUAGES.map(l =>
    `<option value="${l.id}"${l.id === S.lang ? ' selected' : ''}>${esc(l.name)}</option>`
  ).join('');

  document.getElementById('app').innerHTML = `
    <nav class="nav">
      <a class="nav-logo" href="#/">R6 <span>BLUEPRINTS</span></a>
      <select class="lang-select nav-lang" onchange="changeLang(this.value)">${langOpts}</select>
    </nav>
    <div class="home">
      <div class="home-inner">
        <h1 class="home-title">Rainbow Six <span>Siege</span> Maps</h1>
        <div class="search-wrap">
          ${svgIcon('<circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>', 14)}
          <input id="search" class="search-box" type="text" placeholder="Search maps…" autocomplete="off" spellcheck="false">
        </div>
        <div id="count" class="map-count"></div>
        <div id="grid" class="map-grid"></div>
      </div>
    </div>
  `;

  const grid   = document.getElementById('grid');
  const count  = document.getElementById('count');
  const search = document.getElementById('search');

  function draw(q) {
    const ql = q.toLowerCase();
    const filtered = MAPS.filter(m =>
      m.name.toLowerCase().includes(ql) || getMapDisplayName(m.id).toLowerCase().includes(ql)
    );
    count.textContent = `${filtered.length} map${filtered.length !== 1 ? 's' : ''}`;
    if (!filtered.length) { grid.innerHTML = '<p class="no-results">No maps found</p>'; return; }
    grid.innerHTML = filtered.map(m => {
      const displayName = getMapDisplayName(m.id);
      const n = m.floors.reduce((t, _, i) => t + getLabels(m.id, i).length, 0);
      return `
        <a class="map-card" href="#/map/${m.id}/0">
          <img class="map-card-thumb" src="${m.floors[0].file}" alt="${esc(m.name)}" loading="lazy">
          <div class="map-card-info">
            <div class="map-card-names">
              <span class="map-card-name">${esc(displayName)}</span>
              ${displayName !== m.name ? `<span class="map-card-orig">${esc(m.name)}</span>` : ''}
            </div>
            <span class="map-card-badge">${m.floors.length}F${n ? ` · ${n}` : ''}</span>
          </div>
        </a>`;
    }).join('');
  }

  draw('');
  search.addEventListener('input', e => draw(e.target.value));
  search.focus();
}

// ─── MAP VIEW ─────────────────────────────────────────────────────────────────

function renderMap(mapId, floorIdx) {
  const map = MAPS.find(m => m.id === mapId);
  if (!map) { location.hash = '#/'; return; }
  floorIdx = Math.max(0, Math.min(floorIdx, map.floors.length - 1));

  S.mapId = mapId; S.floorIdx = floorIdx;
  S.selectedLabelId = null;
  VP.scale = 1; VP.ox = 0; VP.oy = 0; VP.minScale = 0.1;

  document.title = `${map.name} — R6 Blueprints`;

  const floorBtns = map.floors.map((f, i) => {
    const n = getLabels(mapId, i).length;
    return `
      <button class="floor-btn${i === floorIdx ? ' active' : ''}" onclick="goFloor(${i})">
        ${esc(f.label)}
        ${n ? `<span class="floor-lbl-count">${n}</span>` : ''}
      </button>`;
  }).join('');

  const langOpts   = LANGUAGES.map(l =>
    `<option value="${l.id}"${l.id === S.lang ? ' selected' : ''}>${esc(l.name)}</option>`
  ).join('');
  const curLangName = LANGUAGES.find(l => l.id === S.lang)?.name || S.lang;
  const existingMapTr = S.lang !== 'en' ? (getMapNames()[mapId]?.[S.lang] || '') : '';

  const syncSection = FIREBASE_CONFIG ? `
    <div class="conn-status">
      <span class="conn-dot wait" id="conn-dot"></span>
      <span id="conn-text">Connecting…</span>
    </div>` : `
    <div class="conn-status">
      <span class="conn-dot offline" id="conn-dot"></span>
      <span id="conn-text">Offline (no sync)</span>
    </div>`;

  document.getElementById('app').innerHTML = `
    <div class="map-layout">
      <aside class="sidebar">
        <div class="sb-brand">
          <a class="sb-logo" href="#/">R6 <span>BLUEPRINTS</span></a>
          <button class="sb-back" onclick="location.hash='#/'">
            ${svgIcon('<polyline points="15 18 9 12 15 6"/>')} All Maps
          </button>
          ${syncSection}
        </div>

        <div class="sb-section">
          <div class="sb-title">Language</div>
          <select class="lang-select" id="lang-select" onchange="changeLang(this.value)">
            ${langOpts}
          </select>
        </div>

        <div class="sb-section">
          <div class="sb-title">Map</div>
          <div class="sb-map-name" id="sb-mapname-display">${esc(getMapDisplayName(mapId))}</div>
          <div id="mn-tr-sec" style="display:${S.lang !== 'en' ? '' : 'none'}">
            <div class="sb-title" style="margin-top:8px">Name in <span id="mn-lang-label">${esc(curLangName)}</span></div>
            <div class="mn-tr-row">
              <input class="sb-text-input" id="mn-input"
                value="${esc(existingMapTr)}"
                placeholder="${esc(map.name)}…"
                onkeydown="if(event.key==='Enter')saveMapNameTranslation()">
              <button class="sb-btn mn-save-btn" onclick="saveMapNameTranslation()">Save</button>
            </div>
          </div>
        </div>

        <div class="sb-section">
          <div class="sb-title">Floors</div>
          ${floorBtns}
        </div>

        <div class="sb-section">
          <div class="sb-title">View</div>
          <button class="sb-btn" onclick="resetView()">
            ${svgIcon('<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>')}
            Reset View
          </button>
          <div class="sb-zoom" id="zoom-pct">Zoom: 100%</div>
        </div>

        <div class="sb-section">
          <div class="sb-title">Labels</div>
          <div class="sb-hint">Click anywhere on the map to add a label</div>
          <div class="sb-count" id="lbl-count"></div>
          <button class="sb-btn danger" onclick="clearLabels()" style="margin-top:4px">
            ${svgIcon('<polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/>')}
            Clear Floor
          </button>
          <button class="sb-btn" onclick="exportAll()">
            ${svgIcon('<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>')}
            Export JSON
          </button>
        </div>
      </aside>

      <div class="vp-area" id="vp">
        <div class="canvas" id="canvas">
          <div class="img-wrap" id="img-wrap">
            <img class="blueprint" id="bp"
              src="${map.floors[floorIdx].file}"
              alt="${esc(map.name)} ${esc(map.floors[floorIdx].label)}"
              draggable="false">
            <svg id="arrow-svg" xmlns="http://www.w3.org/2000/svg"
              style="position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;overflow:visible">
              <defs>
                <marker id="ahd" markerWidth="8" markerHeight="6" refX="8" refY="3"
                  orient="auto" markerUnits="strokeWidth">
                  <polygon points="0 0,8 3,0 6" fill="context-stroke"/>
                </marker>
              </defs>
            </svg>
            <div id="lbl-layer"></div>
          </div>
        </div>
      </div>
    </div>
  `;

  setupViewport();
  updateLabelCount();

  const img = document.getElementById('bp');
  img.addEventListener('load', fitImage, { once: true });
  if (img.complete) fitImage();

  syncConnect(mapId, floorIdx);
}

function goFloor(idx) {
  if (idx === S.floorIdx) return;
  cleanup();
  location.hash = `#/map/${S.mapId}/${idx}`;
}

function changeLang(lang) {
  S.lang = lang;
  localStorage.setItem('r6_lang', lang);
  // Keep all selects in sync (nav + sidebar may both be present)
  document.querySelectorAll('.lang-select').forEach(sel => { sel.value = lang; });

  if (S.mapId) {
    // Update map name display
    const nameEl = document.getElementById('sb-mapname-display');
    if (nameEl) nameEl.textContent = getMapDisplayName(S.mapId);

    // Show/hide and update the map-name translation input
    const trSec = document.getElementById('mn-tr-sec');
    if (trSec) {
      if (lang !== 'en') {
        const lbl = document.getElementById('mn-lang-label');
        if (lbl) lbl.textContent = LANGUAGES.find(l => l.id === lang)?.name || lang;
        const inp = document.getElementById('mn-input');
        if (inp) {
          inp.value = getMapNames()[S.mapId]?.[lang] || '';
          inp.placeholder = MAPS.find(m => m.id === S.mapId)?.name || '';
        }
        trSec.style.display = '';
      } else {
        trSec.style.display = 'none';
      }
    }

    renderLabels();
  } else {
    // Home view — re-render so map card names update
    renderHome();
  }
}

// ─── VIEWPORT ────────────────────────────────────────────────────────────────

function applyTransform() {
  const canvas = document.getElementById('canvas');
  if (!canvas) return;
  canvas.style.transform = `translate(${VP.ox}px,${VP.oy}px) scale(${VP.scale})`;
  const z = document.getElementById('zoom-pct');
  if (z) z.textContent = `Zoom: ${Math.round(VP.scale * 100)}%`;
}

function fitImage() {
  const vp = document.getElementById('vp');
  const img = document.getElementById('bp');
  if (!vp || !img) return;
  const iw = img.naturalWidth || img.width;
  const ih = img.naturalHeight || img.height;
  if (!iw || !ih) return;
  const s = Math.min(1, Math.min((vp.clientWidth * 0.94) / iw, (vp.clientHeight * 0.94) / ih));
  VP.scale = s;
  VP.minScale = s;
  VP.ox = (vp.clientWidth - iw * s) / 2;
  VP.oy = (vp.clientHeight - ih * s) / 2;
  applyTransform();
  renderLabels();
}

function resetView() { fitImage(); }

function setupViewport() {
  const vp = document.getElementById('vp');
  if (!vp) return;

  // Scroll-wheel zoom — clamped at minScale so you can't shrink past the fit view
  const onWheel = (e) => {
    e.preventDefault();
    const rect = vp.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    const factor = e.deltaY < 0 ? 1.12 : 1 / 1.12;
    const canX = (cx - VP.ox) / VP.scale;
    const canY = (cy - VP.oy) / VP.scale;
    VP.scale = Math.max(VP.minScale, Math.min(10, VP.scale * factor));
    VP.ox = cx - canX * VP.scale;
    VP.oy = cy - canY * VP.scale;
    applyTransform();
  };
  vp.addEventListener('wheel', onWheel, { passive: false });
  cleanupFns.push(() => vp.removeEventListener('wheel', onWheel));

  // Click-drag pan — track whether the mouse actually moved so we can tell
  // a click from a drag and only add a label on a true click
  const onMousedown = (e) => {
    if (e.target.closest('.lbl') || e.button !== 0) return;
    isPanning = true;
    didPan    = false;
    panStart  = { x: e.clientX, y: e.clientY };
    panOrigin = { x: e.clientX - VP.ox, y: e.clientY - VP.oy };
  };
  vp.addEventListener('mousedown', onMousedown);
  cleanupFns.push(() => vp.removeEventListener('mousedown', onMousedown));

  addListener(window, 'mousemove', (e) => {
    if (!isPanning) return;
    if (!didPan && Math.hypot(e.clientX - panStart.x, e.clientY - panStart.y) > 4) {
      didPan = true;
      document.getElementById('vp')?.classList.add('panning');
    }
    VP.ox = e.clientX - panOrigin.x;
    VP.oy = e.clientY - panOrigin.y;
    applyTransform();
  });
  addListener(window, 'mouseup', () => {
    if (!isPanning) return;
    isPanning = false;
    document.getElementById('vp')?.classList.remove('panning');
  });

  // Left-click on empty map area → add label
  vp.addEventListener('click', (e) => {
    if (suppressNextMapClick) { suppressNextMapClick = false; return; } // arrow placement click
    if (didPan) { didPan = false; return; }         // was a pan drag, not a click
    if (e.target.closest('.lbl') || e.target.closest('.popup')) return;
    const wrap = document.getElementById('img-wrap');
    if (!wrap) return;
    const rect = vp.getBoundingClientRect();
    const canX = (e.clientX - rect.left - VP.ox) / VP.scale;
    const canY = (e.clientY - rect.top  - VP.oy) / VP.scale;
    const xPct = canX / wrap.offsetWidth  * 100;
    const yPct = canY / wrap.offsetHeight * 100;
    if (xPct < 0 || xPct > 100 || yPct < 0 || yPct > 100) return;
    showAddPopup(e.clientX, e.clientY, xPct, yPct);
  });

  // Keyboard shortcuts
  addListener(document, 'keydown', (e) => {
    if (e.key === 'Escape' && activePopup) closePopup();
    const map = MAPS.find(m => m.id === S.mapId);
    if (e.key === 'ArrowRight' || e.key === ']') {
      if (map && S.floorIdx < map.floors.length - 1) goFloor(S.floorIdx + 1);
    }
    if (e.key === 'ArrowLeft' || e.key === '[') {
      if (S.floorIdx > 0) goFloor(S.floorIdx - 1);
    }
  });

  // Close popup on outside click
  addListener(document, 'mousedown', (e) => {
    if (!activePopup || activePopup.contains(e.target) || e.target.closest('.lbl')) return;
    closePopup();
    S.selectedLabelId = null;
    renderLabels();
  }, true);
}

// ─── LABELS ───────────────────────────────────────────────────────────────────

function renderLabels() {
  const layer = document.getElementById('lbl-layer');
  if (!layer) return;
  const labels = getLabels(S.mapId, S.floorIdx);

  layer.innerHTML = labels.map(l => {
    const display = getLabelDisplay(l);
    const showSub = S.lang !== 'en' && display !== l.text;
    const s = l.size || 1;
    return `
      <div class="lbl${l.id === S.selectedLabelId ? ' selected' : ''}${l.arrow ? ' has-arrow' : ''}"
        data-id="${l.id}" data-c="${esc(l.color || 'white')}"
        style="left:${l.x}%;top:${l.y}%;--s:${s}"
      >${esc(display)}${showSub ? `<span class="lbl-sub">${esc(l.text)}</span>` : ''}</div>`;
  }).join('');

  layer.querySelectorAll('.lbl').forEach(el => {
    makeDraggable(el);

    // Single click → edit popup (delayed to let double-click cancel it)
    el.addEventListener('click', (e) => {
      if (el.dataset.wasDragged) { delete el.dataset.wasDragged; return; }
      e.stopPropagation();
      clearTimeout(clickTimer);
      clickPending = { e, id: el.dataset.id };
      clickTimer = setTimeout(() => {
        if (clickPending) onLabelClick(clickPending.e, clickPending.id);
        clickPending = null;
      }, 220);
    });

    // Double-click → draw / replace arrow
    el.addEventListener('dblclick', (e) => {
      e.stopPropagation();
      clearTimeout(clickTimer);
      clickPending = null;
      startArrowDraw(el.dataset.id, e);
    });
  });

  updateLabelCount();
  renderArrows();
}

function updateLabelCount() {
  const el = document.getElementById('lbl-count');
  if (!el) return;
  const n = getLabels(S.mapId, S.floorIdx).length;
  el.textContent = n ? `${n} label${n !== 1 ? 's' : ''} on this floor` : 'No labels yet';
}

function onLabelClick(e, id) {
  e.stopPropagation();
  const labels = getLabels(S.mapId, S.floorIdx);
  const lbl = labels.find(l => l.id === id);
  if (!lbl) return;
  S.selectedLabelId = id;
  S.selectedColor = lbl.color || 'white';
  renderLabels();
  showEditPopup(e.clientX, e.clientY, lbl);
}

function makeDraggable(el) {
  let dragging = false;
  let moved = false;
  let sx, sy, sl, st;

  el.addEventListener('mousedown', (e) => {
    e.stopPropagation();
    e.preventDefault();
    dragging = true; moved = false;
    sx = e.clientX; sy = e.clientY;
    sl = parseFloat(el.style.left);
    st = parseFloat(el.style.top);

    const onMove = (e) => {
      if (!dragging) return;
      const dx = e.clientX - sx, dy = e.clientY - sy;
      if (!moved && Math.hypot(dx, dy) < 4) return;
      moved = true;
      el.classList.add('dragging');
      const wrap = document.getElementById('img-wrap');
      if (!wrap) return;
      el.style.left = (sl + dx / (wrap.offsetWidth * VP.scale) * 100) + '%';
      el.style.top = (st + dy / (wrap.offsetHeight * VP.scale) * 100) + '%';
    };

    const onUp = () => {
      if (!dragging) return;
      dragging = false;
      el.classList.remove('dragging');
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);

      if (moved) {
        el.dataset.wasDragged = '1';
        const x = parseFloat(el.style.left);
        const y = parseFloat(el.style.top);
        // Persist locally
        const labels = getLabels(S.mapId, S.floorIdx);
        const lbl = labels.find(l => l.id === el.dataset.id);
        if (lbl) { lbl.x = x; lbl.y = y; saveLabels(S.mapId, S.floorIdx, labels); }
        // Sync
        syncSend({ type: 'move', id: el.dataset.id, x, y });
        renderArrows(); // keep arrow start anchored to new label position
      }
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  });
}

// ─── POPUPS ───────────────────────────────────────────────────────────────────

function closePopup() {
  if (activePopup) { activePopup.remove(); activePopup = null; }
}

function colorSwatches(selectedId) {
  return COLORS.map(c =>
    `<div class="color-swatch${c.id === selectedId ? ' sel' : ''}"
      data-cid="${c.id}" style="background:${c.hex}" title="${c.id}"></div>`
  ).join('');
}

function attachSwatchListeners(popup) {
  popup.querySelectorAll('.color-swatch').forEach(sw => {
    sw.addEventListener('click', () => {
      S.selectedColor = sw.dataset.cid;
      popup.querySelectorAll('.color-swatch').forEach(s =>
        s.classList.toggle('sel', s.dataset.cid === S.selectedColor));
    });
  });
}

function placePopup(popup, cx, cy) {
  popup.style.left = (cx + 14) + 'px';
  popup.style.top = (cy + 14) + 'px';
  document.body.appendChild(popup);
  activePopup = popup;
  requestAnimationFrame(() => {
    const r = popup.getBoundingClientRect();
    if (r.right > window.innerWidth - 8) popup.style.left = (cx - r.width - 14) + 'px';
    if (r.bottom > window.innerHeight - 8) popup.style.top = (cy - r.height - 14) + 'px';
  });
}

function showAddPopup(cx, cy, xPct, yPct) {
  closePopup();
  const isTranslating = S.lang !== 'en';
  const langName = LANGUAGES.find(l => l.id === S.lang)?.name || S.lang;

  const popup = document.createElement('div');
  popup.className = 'popup';
  popup.innerHTML = `
    <div class="popup-title">New Label</div>
    <div class="popup-label">Name (English)</div>
    <input class="popup-input" id="pi-en" type="text" placeholder="Room / callout name…" maxlength="40" autocomplete="off">
    ${isTranslating ? `
      <div class="popup-label">${esc(langName)} <span style="opacity:.5">(optional)</span></div>
      <input class="popup-input" id="pi-tr" type="text" placeholder="Translation…" maxlength="40" autocomplete="off">
    ` : ''}
    <div class="popup-label">Color</div>
    <div class="color-picker">${colorSwatches(S.selectedColor)}</div>
    <div class="popup-label">Size <span id="pi-size-val" style="color:var(--text);margin-left:4px">1.0×</span></div>
    <div class="size-row">
      <input class="size-range" type="range" id="pi-size" min="0.7" max="3" step="0.1" value="1">
    </div>
    <div class="popup-row">
      <button class="popup-btn" id="pb-cancel">Cancel</button>
      <button class="popup-btn primary" id="pb-add">Place</button>
    </div>
  `;
  placePopup(popup, cx, cy);
  attachSwatchListeners(popup);

  const enInput = popup.querySelector('#pi-en');
  const trInput = popup.querySelector('#pi-tr');
  const sizeInput = popup.querySelector('#pi-size');
  const sizeVal = popup.querySelector('#pi-size-val');

  sizeInput.addEventListener('input', () => {
    sizeVal.textContent = parseFloat(sizeInput.value).toFixed(1) + '×';
  });

  enInput.focus();

  const confirm = () => {
    const text = enInput.value.trim();
    if (!text) { enInput.focus(); return; }
    const lbl = {
      id: uid(), x: xPct, y: yPct, text,
      color: S.selectedColor,
      size: parseFloat(sizeInput.value),
    };
    if (isTranslating && trInput?.value.trim()) {
      lbl.translations = { [S.lang]: trInput.value.trim() };
    }
    const labels = getLabels(S.mapId, S.floorIdx);
    labels.push(lbl);
    saveLabels(S.mapId, S.floorIdx, labels);
    syncSend({ type: 'add', label: lbl });
    closePopup();
    renderLabels();
  };

  popup.querySelector('#pb-add').addEventListener('click', confirm);
  popup.querySelector('#pb-cancel').addEventListener('click', closePopup);
  enInput.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closePopup(); return; }
    if (e.key === 'Enter') { trInput ? trInput.focus() : confirm(); }
    e.stopPropagation();
  });
  if (trInput) trInput.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closePopup(); return; }
    if (e.key === 'Enter') confirm();
    e.stopPropagation();
  });
}

function showEditPopup(cx, cy, lbl) {
  closePopup();
  const isTranslating = S.lang !== 'en';
  const langName = LANGUAGES.find(l => l.id === S.lang)?.name || S.lang;
  const existingTr = lbl.translations?.[S.lang] || '';
  const currentSize = lbl.size || 1;

  const popup = document.createElement('div');
  popup.className = 'popup';

  if (isTranslating) {
    popup.innerHTML = `
      <div class="popup-title">Edit — ${esc(langName)}</div>
      <div class="popup-label">English (Default)</div>
      <div class="popup-static">${esc(lbl.text)}</div>
      <div class="popup-label">${esc(langName)} translation</div>
      <input class="popup-input" id="pi-tr" type="text" value="${esc(existingTr)}" placeholder="Translation…" maxlength="40" autocomplete="off">
      <div class="popup-row">
        <button class="popup-btn del" id="pb-del">Delete Label</button>
        <button class="popup-btn primary" id="pb-save">Save</button>
      </div>
    `;
  } else {
    popup.innerHTML = `
      <div class="popup-title">Edit Label</div>
      <div class="popup-label">Name</div>
      <input class="popup-input" id="pi-en" type="text" value="${esc(lbl.text)}" maxlength="40" autocomplete="off">
      <div class="popup-label">Color</div>
      <div class="color-picker">${colorSwatches(lbl.color || 'white')}</div>
      <div class="popup-label">Size <span id="pi-size-val" style="color:var(--text);margin-left:4px">${currentSize.toFixed(1)}×</span></div>
      <div class="size-row">
        <input class="size-range" type="range" id="pi-size" min="0.7" max="3" step="0.1" value="${currentSize}">
      </div>
      ${lbl.arrow ? `<button class="popup-btn" id="pb-rm-arrow" style="width:100%;margin-bottom:6px">Remove arrow</button>` : ''}
      <div class="popup-row">
        <button class="popup-btn del" id="pb-del">Delete</button>
        <button class="popup-btn primary" id="pb-save">Save</button>
      </div>
    `;
  }

  placePopup(popup, cx, cy);
  if (!isTranslating) attachSwatchListeners(popup);

  const enInput = popup.querySelector('#pi-en');
  const trInput = popup.querySelector('#pi-tr');
  const sizeInput = popup.querySelector('#pi-size');
  const sizeVal = popup.querySelector('#pi-size-val');
  const first = enInput || trInput;
  first?.focus(); first?.select();

  sizeInput?.addEventListener('input', () => {
    sizeVal.textContent = parseFloat(sizeInput.value).toFixed(1) + '×';
  });

  const save = () => {
    const labels = getLabels(S.mapId, S.floorIdx);
    const l = labels.find(l => l.id === lbl.id);
    if (!l) { closePopup(); return; }

    if (isTranslating) {
      const tr = trInput.value.trim();
      if (!l.translations) l.translations = {};
      if (tr) l.translations[S.lang] = tr;
      else delete l.translations[S.lang];
    } else {
      const text = enInput.value.trim();
      if (!text) { enInput.focus(); return; }
      l.text = text;
      l.color = S.selectedColor;
      l.size = parseFloat(sizeInput.value);
    }

    saveLabels(S.mapId, S.floorIdx, labels);
    syncSend({ type: 'update', label: l });
    S.selectedLabelId = null;
    closePopup();
    renderLabels();
  };

  const del = () => {
    if (!confirm(`Delete "${lbl.text}"?`)) return;
    const labels = getLabels(S.mapId, S.floorIdx).filter(l => l.id !== lbl.id);
    saveLabels(S.mapId, S.floorIdx, labels);
    syncSend({ type: 'delete', id: lbl.id });
    S.selectedLabelId = null;
    closePopup();
    renderLabels();
  };

  popup.querySelector('#pb-save').addEventListener('click', save);
  popup.querySelector('#pb-del').addEventListener('click', del);
  popup.querySelector('#pb-rm-arrow')?.addEventListener('click', () => {
    const labels = getLabels(S.mapId, S.floorIdx);
    const l = labels.find(l => l.id === lbl.id);
    if (l) { delete l.arrow; saveLabels(S.mapId, S.floorIdx, labels); syncSend({ type: 'update', label: l }); }
    S.selectedLabelId = null;
    closePopup();
    renderLabels();
  });
  first?.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closePopup(); return; }
    if (e.key === 'Enter') save();
    e.stopPropagation();
  });
}

// ─── ARROWS ──────────────────────────────────────────────────────────────────

function labelStrokeColor(color) {
  const map = {
    white:  'rgba(255,255,255,0.75)',
    yellow: 'rgba(240,200,74,0.8)',
    orange: 'rgba(240,133,74,0.8)',
    red:    'rgba(240,112,112,0.8)',
    green:  'rgba(80,224,144,0.8)',
    blue:   'rgba(96,144,240,0.8)',
    purple: 'rgba(176,112,240,0.8)',
  };
  return map[color] || map.white;
}

function renderArrows() {
  const svg = document.getElementById('arrow-svg');
  if (!svg) return;

  // Remove everything except <defs>
  [...svg.children].forEach(el => { if (el.tagName.toLowerCase() !== 'defs') el.remove(); });

  const labels = getLabels(S.mapId, S.floorIdx).filter(l => l.arrow);
  const w = svg.clientWidth;
  const h = svg.clientHeight;
  if (!w || !h) return;

  const ns      = 'http://www.w3.org/2000/svg';
  const svgRect = svg.getBoundingClientRect();

  labels.forEach(l => {
    const sz     = l.size || 1;
    const stroke = labelStrokeColor(l.color || 'white');

    // Arrow base: bottom-center of the label pill (read from live DOM)
    let x1, y1;
    const lblEl = document.querySelector(`.lbl[data-id="${l.id}"]`);
    if (lblEl) {
      const r = lblEl.getBoundingClientRect();
      x1 = ((r.left + r.right) / 2 - svgRect.left) / svgRect.width  * w;
      y1 = (r.bottom             - svgRect.top)  / svgRect.height * h;
    } else {
      x1 = l.x / 100 * w;
      y1 = l.y / 100 * h;
    }

    const x2 = l.arrow.x / 100 * w;
    const y2 = l.arrow.y / 100 * h;

    const sw = sz * 2.5;

    const line = document.createElementNS(ns, 'line');
    line.setAttribute('x1', x1); line.setAttribute('y1', y1);
    line.setAttribute('x2', x2); line.setAttribute('y2', y2);
    line.setAttribute('stroke', stroke);
    line.setAttribute('stroke-width', sw);
    line.setAttribute('marker-end', 'url(#ahd)');
    line.dataset.id = l.id;
    svg.appendChild(line);

    const r = sz * 5;
    const ep = document.createElementNS(ns, 'circle');
    ep.setAttribute('cx', x2); ep.setAttribute('cy', y2); ep.setAttribute('r', r);
    ep.setAttribute('fill', 'rgba(0,0,0,0.25)');
    ep.setAttribute('stroke', stroke);
    ep.setAttribute('stroke-width', sz * 2);
    ep.dataset.id = l.id;
    ep.classList.add('arrow-ep');
    ep.style.cursor = 'move';
    ep.style.pointerEvents = 'all';
    svg.appendChild(ep);

    makeDraggableArrowEndpoint(ep);
  });
}

// Double-click a label to draw/replace its arrow
function startArrowDraw(labelId, e) {
  closePopup();
  const svg = document.getElementById('arrow-svg');
  if (!svg) return;
  const lbl = getLabels(S.mapId, S.floorIdx).find(l => l.id === labelId);
  if (!lbl) return;

  const ns      = 'http://www.w3.org/2000/svg';
  const stroke  = labelStrokeColor(lbl.color || 'white');
  const sz      = lbl.size || 1;
  const w = svg.clientWidth, h = svg.clientHeight;
  const svgRect = svg.getBoundingClientRect();

  // Start from bottom-center of the label pill
  let x1, y1;
  const lblEl = document.querySelector(`.lbl[data-id="${labelId}"]`);
  if (lblEl) {
    const r = lblEl.getBoundingClientRect();
    x1 = ((r.left + r.right) / 2 - svgRect.left) / svgRect.width  * w;
    y1 = (r.bottom             - svgRect.top)  / svgRect.height * h;
  } else {
    x1 = lbl.x / 100 * w;
    y1 = lbl.y / 100 * h;
  }

  // Dashed preview line
  const draft = document.createElementNS(ns, 'line');
  draft.setAttribute('x1', x1); draft.setAttribute('y1', y1);
  draft.setAttribute('x2', x1); draft.setAttribute('y2', y1);
  draft.setAttribute('stroke', stroke);
  draft.setAttribute('stroke-width', sz * 2.5);
  draft.setAttribute('stroke-dasharray', `${sz * 7} ${sz * 4}`);
  draft.setAttribute('marker-end', 'url(#ahd)');
  draft.setAttribute('pointer-events', 'none');
  svg.appendChild(draft);

  const cleanup = () => {
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseup',   onUp);
    document.removeEventListener('keydown',   onKey);
    draft.remove();
  };

  const onMove = (ev) => {
    const r = svg.getBoundingClientRect();
    draft.setAttribute('x2', (ev.clientX - r.left) / r.width  * w);
    draft.setAttribute('y2', (ev.clientY - r.top)  / r.height * h);
  };

  const onKey = (ev) => { if (ev.key === 'Escape') cleanup(); };

  const onUp = (ev) => {
    cleanup();
    suppressNextMapClick = true; // stop the placement click from opening add-label popup

    const r = svg.getBoundingClientRect();
    const xPct = Math.max(0, Math.min(100, (ev.clientX - r.left) / r.width  * 100));
    const yPct = Math.max(0, Math.min(100, (ev.clientY - r.top)  / r.height * 100));

    const labels = getLabels(S.mapId, S.floorIdx);
    const l = labels.find(l => l.id === labelId);
    if (!l) return;
    l.arrow = { x: xPct, y: yPct };
    saveLabels(S.mapId, S.floorIdx, labels);
    syncSend({ type: 'update', label: l });
    renderLabels();
  };

  document.addEventListener('mousemove', onMove);
  document.addEventListener('mouseup',   onUp);
  document.addEventListener('keydown',   onKey);
}

// Drag the endpoint circle to reposition an existing arrow
function makeDraggableArrowEndpoint(ep) {
  ep.addEventListener('mousedown', (e) => {
    e.stopPropagation();
    e.preventDefault();

    const svg = document.getElementById('arrow-svg');
    if (!svg) return;
    const labelId = ep.dataset.id;
    const w = svg.clientWidth, h = svg.clientHeight;
    const line = svg.querySelector(`line[data-id="${labelId}"]`);

    const onMove = (ev) => {
      const rect = svg.getBoundingClientRect();
      const mx = (ev.clientX - rect.left) / rect.width  * w;
      const my = (ev.clientY - rect.top)  / rect.height * h;
      ep.setAttribute('cx', mx);
      ep.setAttribute('cy', my);
      line?.setAttribute('x2', mx);
      line?.setAttribute('y2', my);
    };

    const onUp = (ev) => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup',   onUp);

      const rect = svg.getBoundingClientRect();
      const xPct = Math.max(0, Math.min(100, (ev.clientX - rect.left) / rect.width  * 100));
      const yPct = Math.max(0, Math.min(100, (ev.clientY - rect.top)  / rect.height * 100));

      const labels = getLabels(S.mapId, S.floorIdx);
      const lbl = labels.find(l => l.id === labelId);
      if (!lbl) return;

      // Dragging endpoint back near the label removes the arrow
      if (Math.hypot(xPct - lbl.x, yPct - lbl.y) < 4) {
        delete lbl.arrow;
      } else {
        lbl.arrow = { x: xPct, y: yPct };
      }
      saveLabels(S.mapId, S.floorIdx, labels);
      syncSend({ type: 'update', label: lbl });
      renderLabels();
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup',   onUp);
  });
}

// ─── ACTIONS ─────────────────────────────────────────────────────────────────

function clearLabels() {
  const n = getLabels(S.mapId, S.floorIdx).length;
  if (!n) return;
  if (!confirm(`Remove all ${n} label${n !== 1 ? 's' : ''} from this floor?`)) return;
  saveLabels(S.mapId, S.floorIdx, []);
  syncSend({ type: 'clear' });
  renderLabels();
}

function exportAll() {
  const out = {};
  MAPS.forEach(m => {
    m.floors.forEach((f, i) => {
      const lbls = getLabels(m.id, i);
      if (!lbls.length) return;
      if (!out[m.name]) out[m.name] = {};
      out[m.name][f.label] = lbls.map(l => ({
        text: l.text,
        x: +l.x.toFixed(2),
        y: +l.y.toFixed(2),
        color: l.color,
        size: l.size || 1,
        ...(l.translations && Object.keys(l.translations).length ? { translations: l.translations } : {}),
      }));
    });
  });
  const blob = new Blob([JSON.stringify(out, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'r6_callouts.json';
  a.click();
  URL.revokeObjectURL(a.href);
}
