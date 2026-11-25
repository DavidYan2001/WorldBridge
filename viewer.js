(() => {
  const $ = (selector) => document.querySelector(selector);
  const {entries, realWorld, methods, colors} = comparisonData;
  const media = (path) => 'comparisons/' + path;
  const titles = {
    '01_living_palace':'Painted palace', '02_bakery_ink_atrium':'Botanical atrium',
    '03_rain_city_scifi':'Star chamber', '04_study_chicken':'Fried-chicken shop',
    N01_record:'Amphitheater', N03_geology:'Crystal cavern',
    N05_clock:'Orbital platform', G02_fantasy:'Sky station'
  };
  const imaginary = new Map(entries.map(row => [row.id, row]));
  const realScenes = new Map(realWorld.map(row => [row.sequence, row]));
  const worldSelect = $('#scene'), baseline = $('#baseline'), strip = $('#scene-strip');
  const play = $('#play'), timeline = $('#timeline'), count = $('#frame-count');
  const ours = $('#ours'), other = $('#other'), mosaic = $('#mosaic');
  const canvases = [...document.querySelectorAll('#real-outputs canvas')];
  const allVideos = [ours, other, mosaic];
  const route = $('#route'), poseDetails = $('#pose-details');
  const baselineIds = Object.keys(methods).filter(key => key !== 'ours');
  baselineIds.forEach(id => baseline.add(new Option(methods[id], id)));
  const selected = { imaginary:'01_living_palace', real:'2024-03-14-blenheim-palace-01' };
  let category = 'imaginary', placement = 'on', row, frame = 0, frameTotal = 0;
  let playing = false, loading = false, animation = 0, generation = 0, action = 0;
  let controller, poster, paintedFrame = -1;

  function realTitle(id) {
    if (id.startsWith('scene')) return 'ScanNet · ' + id.slice(5).replace('_','–');
    const words = id.replace(/^\d{4}-\d{2}-\d{2}-/, '').split('-');
    return words.map(word => word[0].toUpperCase() + word.slice(1)).join(' ');
  }
  function choices() {
    if (category === 'imaginary') return Object.entries(titles).map(([id,name]) =>
      ({id,name,image:imaginary.get(id+'-on').refs[2]}));
    return realWorld.map(item => ({id:item.sequence,name:realTitle(item.sequence),image:item.refs[0]}));
  }
  function buildScenes() {
    worldSelect.replaceChildren();
    strip.replaceChildren();
    for (const {id,name,image} of choices()) {
      worldSelect.add(new Option(name, id));
      const button = document.createElement('button');
      button.type = 'button'; button.className = 'scene-choice'; button.dataset.scene = id;
      const thumb = new Image(); thumb.src = media(image); thumb.alt = ''; thumb.loading = 'lazy';
      const text = document.createElement('span'); text.textContent = name;
      button.append(thumb, text);
      button.addEventListener('click', () => selectScene(id));
      strip.append(button);
    }
  }
  function markScene() {
    worldSelect.value = selected[category];
    for (const button of strip.children) {
      button.setAttribute('aria-pressed', String(button.dataset.scene === selected[category]));
    }
    const chosen = strip.querySelector('[aria-pressed=true]');
    if (chosen) {
      const bounds = strip.getBoundingClientRect(), item = chosen.getBoundingClientRect();
      if (item.left < bounds.left || item.right > bounds.right) strip.scrollLeft += item.left - bounds.left - 15;
    }
  }
  function svgLine(points, stroke, attributes = {}) {
    const line = document.createElementNS('http://www.w3.org/2000/svg','polyline');
    line.setAttribute('points', points.map(point => point.join(',')).join(' '));
    line.setAttribute('stroke', stroke); line.setAttribute('fill','none');
    for (const [name,value] of Object.entries(attributes)) line.setAttribute(name,value);
    route.append(line);
  }
  function frustum(points, color, fill) {
    const [center, ...plane] = points, corners = plane.slice(0,4);
    svgLine([...corners,corners[0]],color,{fill,'stroke-width':1.5});
    for (const corner of corners) svgLine([center,corner],color,{'stroke-width':1.3});
  }
  function drawRoute() {
    if (!poseDetails.open || !row) return;
    const t = row.trajectory, index = category === 'real' ? t.targetIndices[frame] : frame;
    route.replaceChildren();
    t.faces.forEach((face,i) => svgLine([...face,face[0]],'#aebfcf',{fill:['#f8fafc','#f1f5f9','#edf3f8'][i],'stroke-width':1}));
    t.grid.forEach(line => svgLine(line,'#c6d2df',{'stroke-width':.8}));
    svgLine(t.footprint,'#a5b5c5',{'stroke-dasharray':'3 4'});
    svgLine(t.route,'#8196a9',{'stroke-dasharray':'4 4'});
    svgLine(t.route.slice(0,index+1),'#4156af',{'stroke-width':2});
    t.refs.forEach((points,i) => frustum(points,colors[i],'none'));
    frustum(t.cameras[index],'#a85206','#ffc879');
    svgLine([t.route[index],t.cameras[index][5]],'#a85206',{'stroke-width':1.2});
  }
  const zeroPad = number => String(number).padStart(2,'0');
  function indicateFrame(index) {
    frame = Math.max(0,Math.min(frameTotal-1,index));
    timeline.value = frame;
    timeline.setAttribute('aria-valuetext','Frame '+(frame+1)+' of '+frameTotal);
    count.value = zeroPad(frame+1)+' / '+frameTotal;
    if (paintedFrame !== frame) { paintedFrame = frame; drawRoute(); }
  }
  function showRefs() {
    const names = category === 'imaginary' ? row.title.replace(/-(on|off)$/,'').split(', ') : [];
    const refs = row.refs.map((src,i) => {
      const figure = document.createElement('figure'); figure.className = 'ref-frame';
      figure.style.setProperty('--marker',colors[i]);
      const caption = document.createElement('figcaption');
      caption.textContent = names[i] ? names[i][0].toUpperCase()+names[i].slice(1) : 'Reference '+(i+1);
      const image = new Image(); image.src = media(src); image.alt = caption.textContent;
      figure.append(image,caption); return figure;
    });
    $('#references').replaceChildren(...refs);
    route.setAttribute('viewBox', category === 'imaginary' ? '22 163 596 176' : '18 36 604 299');
    $('#pose-caption').textContent = category === 'imaginary' ? 'Reference cameras '+placement+' the target path' :
      {scannet:'ScanNet v2 · dataset poses', tls:'Oxford Spires · TLS-aligned poses', vilens:'Oxford Spires · VILENS-SLAM poses'}[row.pose_kind];
  }
  function paintMosaic() {
    if (category !== 'real' || !row) return;
    const source = mosaic.readyState >= 2 ? mosaic : poster;
    if (!source || (source === poster && !poster.naturalWidth)) return;
    const [width,height,header,gap] = row.cell, [fullWidth,fullHeight] = row.canvas;
    const sx = (source === mosaic ? mosaic.videoWidth : source.naturalWidth)/fullWidth;
    const sy = (source === mosaic ? mosaic.videoHeight : source.naturalHeight)/fullHeight;
    const slot = baselineIds.indexOf(baseline.value)+2;
    [[0,1],[1,1],[slot%4,1+Math.floor(slot/4)]].forEach(([col,line],i) => {
      const canvas = canvases[i];
      canvas.getContext('2d').drawImage(source,col*(width+gap)*sx,(line*(height+header+gap)+header)*sy,
        width*sx,height*sy,0,0,canvas.width,canvas.height);
    });
  }
  function setMessage(message) {
    const status = $('#media-status'); status.textContent = message; status.hidden = !message;
  }
  function pause() {
    action++;
    playing = false; cancelAnimationFrame(animation);
    allVideos.forEach(video => video.pause());
    $('#play-label').textContent = 'Play together'; play.classList.remove('is-playing');
  }
  const activeMedia = () => category === 'imaginary' ? [ours,other] : [mosaic];
  const rate = () => category === 'imaginary' ? 10 : frameTotal * row.fps / row.frames;
  function seekTo(index) {
    indicateFrame(index);
    const time = (frame+.25) / rate();
    for (const video of activeMedia()) if (video.readyState >= 1) video.currentTime = Math.min(time, video.duration);
    paintMosaic();
  }
  function refresh() {
    if (!playing) return;
    const clock = activeMedia()[0];
    if (!clock.seeking) {
      indicateFrame(Math.floor((clock.currentTime+.0001)*rate()));
      if (category === 'real') paintMosaic();
      else if (!other.seeking && Math.abs(other.currentTime-clock.currentTime) > .07) other.currentTime = clock.currentTime;
    }
    animation = requestAnimationFrame(refresh);
  }
  async function start() {
    if (loading) return;
    if (frame >= frameTotal-1 || activeMedia()[0].ended) seekTo(0);
    const attempt = ++action;
    $('#feature-video').pause(); setMessage('');
    try {
      await Promise.all(activeMedia().map(video => video.play()));
      if (attempt !== action) return;
      playing = true; play.classList.add('is-playing'); $('#play-label').textContent = 'Pause'; refresh();
    } catch {
      if (attempt === action) { pause(); setMessage('Playback was interrupted. Press Play together to retry.'); }
    }
  }
  function loadVideo(video, path, signal) {
    const src = media(path);
    if (video.getAttribute('src') === src && video.readyState >= 2 && !video.error) return Promise.resolve();
    return new Promise((resolve,reject) => {
      const events = ['loadeddata','canplay','seeked'];
      const cleanup = () => {
        events.forEach(event => video.removeEventListener(event,ready));
        video.removeEventListener('error',failed); signal.removeEventListener('abort',failed);
      };
      const ready = () => { if (video.readyState >= 2) { cleanup(); resolve(); } };
      const failed = () => { cleanup(); reject(); };
      events.forEach(event => video.addEventListener(event,ready));
      video.addEventListener('error',failed);
      signal.addEventListener('abort',failed,{once:true});
      video.preload='auto';
      if (video.getAttribute('src') !== src || video.error) { video.src = src; video.load(); }
    });
  }
  function methodLabels() {
    const name=methods[baseline.value];
    document.querySelectorAll('[data-method-label]').forEach(label => label.textContent=name);
    other.setAttribute('aria-label',name+' output');
    canvases[2].setAttribute('aria-label',name+' output');
  }
  async function loadOutputs(at = 0, resume = false) {
    controller?.abort(); controller = new AbortController();
    const signal=controller.signal, ticket=++generation;
    pause(); loading = true; play.disabled = timeline.disabled = true; setMessage('');
    methodLabels();
    const jobs = category === 'imaginary' ? [loadVideo(ours,row.videos.ours,signal),loadVideo(other,row.videos[baseline.value],signal)] : [loadVideo(mosaic,row.video,signal)];
    if (category === 'real') {
      canvases.forEach(c => c.getContext('2d').clearRect(0,0,c.width,c.height));
      poster = new Image(); poster.onload = () => { if (ticket === generation) paintMosaic(); }; poster.src=media(row.poster);
    }
    indicateFrame(at);
    try {
      await Promise.all(jobs);
      if (signal.aborted) return;
      loading = false; play.disabled = timeline.disabled = false; seekTo(at); if (resume) start();
    } catch {
      if (!signal.aborted) setMessage('This video could not be loaded. Choose another scene or open the supplementary viewer below.');
    }
  }
  function selectScene(id) {
    selected[category] = id; markScene();
    row = category === 'imaginary' ? imaginary.get(id+'-'+placement) : realScenes.get(id);
    frameTotal = category === 'imaginary' ? row.frames : row.target_dataset_source_frame_ids.length;
    timeline.max = frameTotal-1; paintedFrame=-1; showRefs(); loadOutputs();
  }
  function setCategory(name) {
    category = name;
    document.querySelectorAll('[data-category]').forEach(b => b.setAttribute('aria-pressed',String(b.dataset.category===category)));
    const real = name === 'real';
    $('#placement-field').hidden=real; $('#imaginary-outputs').hidden=real; $('#real-outputs').hidden=!real;
    $('#collection-summary').textContent=real ? '13 sequences · ScanNet v2 + Oxford Spires' : '8 worlds';
    buildScenes(); selectScene(selected[name]);
  }
  document.querySelectorAll('[data-category]').forEach(button => button.onclick=() => { if (category!==button.dataset.category) setCategory(button.dataset.category); });
  document.querySelectorAll('[data-placement]').forEach(button => button.onclick=() => {
    if (placement === button.dataset.placement) return;
    placement = button.dataset.placement;
    document.querySelectorAll('[data-placement]').forEach(b => b.setAttribute('aria-pressed',String(b.dataset.placement===placement)));
    selectScene(selected.imaginary);
  });
  worldSelect.onchange=() => selectScene(worldSelect.value);
  baseline.onchange=() => { methodLabels(); if (category==='real') paintMosaic(); else loadOutputs(frame,playing); };
  play.onclick=() => playing ? pause() : start();
  timeline.oninput=() => { pause(); seekTo(Number(timeline.value)); };
  poseDetails.ontoggle=drawRoute;
  mosaic.onseeked=paintMosaic;
  for (const movie of [ours,mosaic]) movie.onended=() => { if (movie===activeMedia()[0]) { pause(); indicateFrame(frameTotal-1); paintMosaic(); } };
  $('#feature-video').addEventListener('play',pause);
  document.addEventListener('visibilitychange',() => { if (document.hidden) pause(); });
  setCategory('imaginary');
})();
