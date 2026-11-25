const benchmarks = {
  "short": {
    "title": "WorldBridge-Short",
    "desc": "Overall RGB fidelity across 100 real clips, with two endpoint references per clip.",
    "cols": [
      "PSNR ↑",
      "SSIM ↑",
      "LPIPS ↓"
    ],
    "rows": [
      [
        "SEVA",
        "15.66",
        "0.471",
        "0.421"
      ],
      [
        "GAE",
        "15.29",
        "0.464",
        "0.450"
      ],
      [
        "GLD",
        "16.13",
        "0.492",
        "0.428"
      ],
      [
        "Gen3R",
        "14.72",
        "0.429",
        "0.499"
      ],
      [
        "AnyRecon",
        "14.76",
        "0.431",
        "0.464"
      ],
      [
        "3DRAE",
        "15.34",
        "0.447",
        "0.471"
      ],
      [
        "WorldBridge",
        "18.35",
        "0.604",
        "0.333"
      ]
    ]
  },
  "long": {
    "title": "WorldBridge-Long",
    "desc": "20 real sequences, each with six references and 50 target views. Dashes indicate unavailable native geometry.",
    "cols": [
      "PSNR ↑",
      "SSIM ↑",
      "LPIPS ↓",
      "AbsRel ↓",
      "δ₁ ↑",
      "ATE ↓",
      "RPE rotation ↓",
      "RPE translation ↓",
      "Feature reproj. ↓",
      "Geometry reproj. ↓",
      "Reference error ↓",
      "Aesthetic ↑"
    ],
    "rows": [
      [
        "SEVA",
        "15.41",
        "0.499",
        "0.459",
        "—",
        "—",
        "2.810",
        "9.270",
        "1.378",
        "0.220",
        "0.127",
        "0.257",
        "5.228"
      ],
      [
        "GAE",
        "12.86",
        "0.405",
        "0.573",
        "0.599",
        "44.9",
        "1.508",
        "10.382",
        "0.717",
        "0.200",
        "0.110",
        "0.415",
        "5.143"
      ],
      [
        "GLD",
        "16.43",
        "0.524",
        "0.436",
        "0.454",
        "59.4",
        "1.748",
        "9.324",
        "1.039",
        "0.217",
        "0.123",
        "0.252",
        "4.920"
      ],
      [
        "Gen3R",
        "15.47",
        "0.487",
        "0.481",
        "0.507",
        "41.6",
        "1.675",
        "8.199",
        "0.559",
        "0.196",
        "0.110",
        "0.305",
        "4.900"
      ],
      [
        "AnyRecon",
        "15.87",
        "0.508",
        "0.444",
        "—",
        "—",
        "4.539",
        "11.244",
        "1.439",
        "0.211",
        "0.128",
        "0.277",
        "4.949"
      ],
      [
        "3DRAE",
        "15.38",
        "0.469",
        "0.489",
        "0.475",
        "53.1",
        "2.427",
        "11.772",
        "0.995",
        "0.176",
        "0.106",
        "0.332",
        "4.736"
      ],
      [
        "WorldBridge",
        "17.68",
        "0.587",
        "0.384",
        "0.345",
        "71.0",
        "0.657",
        "3.456",
        "0.397",
        "0.173",
        "0.099",
        "0.200",
        "5.248"
      ]
    ]
  },
  "agent": {
    "title": "WorldBridge-Agent",
    "desc": "20 synthetic worlds with six references each. Cells show on-path / off-path scores for the same target trajectory, averaged across worlds.",
    "cols": [
      "ATE ↓",
      "RPE rotation ↓",
      "RPE translation ↓",
      "Feature reproj. ↓",
      "Geometry reproj. ↓",
      "Reference error ↓",
      "Aesthetic ↑"
    ],
    "rows": [
      [
        "SEVA",
        "5.705 / 5.091",
        "10.467 / 7.556",
        "3.144 / 3.529",
        "0.176 / 0.237",
        "0.077 / 0.110",
        "0.298 / 0.348",
        "5.561 / 5.557"
      ],
      [
        "GAE",
        "5.935 / 5.928",
        "14.948 / 18.726",
        "2.974 / 2.485",
        "0.217 / 0.257",
        "0.108 / 0.134",
        "0.441 / 0.475",
        "5.345 / 5.100"
      ],
      [
        "GLD",
        "5.680 / 6.257",
        "11.264 / 15.224",
        "2.759 / 3.534",
        "0.194 / 0.258",
        "0.085 / 0.133",
        "0.282 / 0.325",
        "5.488 / 5.338"
      ],
      [
        "Gen3R",
        "7.786 / 9.520",
        "19.293 / 25.855",
        "3.217 / 2.849",
        "0.225 / 0.331",
        "0.100 / 0.151",
        "0.377 / 0.435",
        "4.976 / 4.747"
      ],
      [
        "AnyRecon",
        "3.711 / 4.680",
        "7.428 / 12.919",
        "2.105 / 3.665",
        "0.154 / 0.201",
        "0.066 / 0.094",
        "0.342 / 0.365",
        "5.422 / 5.349"
      ],
      [
        "3DRAE",
        "4.194 / 4.576",
        "6.253 / 4.944",
        "2.117 / 2.091",
        "0.145 / 0.162",
        "0.067 / 0.078",
        "0.376 / 0.394",
        "5.169 / 5.018"
      ],
      [
        "WorldBridge",
        "3.278 / 3.303",
        "6.093 / 4.643",
        "1.416 / 1.331",
        "0.143 / 0.149",
        "0.057 / 0.061",
        "0.239 / 0.344",
        "5.648 / 5.675"
      ]
    ]
  }
};
(() => {
  const $ = selector => document.querySelector(selector);
  const feature = $('#feature-video'), featurePlay = $('#feature-play');
  featurePlay.onclick = async () => {
    try { await feature.play(); } catch { feature.controls = true; }
  };
  feature.onplay = () => {
    feature.controls = true;
    feature.parentElement.classList.add('playing'); featurePlay.hidden = true;
  };
  feature.onended = () => {
    feature.controls = false; featurePlay.hidden = false;
    feature.parentElement.classList.remove('playing');
    feature.load();
  };
  const capabilities = $('#capabilities');
  const capabilityButtons = capabilities.querySelectorAll('[data-cap]');
  const sceneGroups = capabilities.querySelectorAll('.cap-scenes');
  function showCapabilityScene(button) {
    const group = button.closest('.cap-scenes');
    const scene = button.querySelector('span').textContent;
    for (const option of group.querySelectorAll('button')) {
      option.setAttribute('aria-pressed', String(option === button));
    }
    $('#cap-image').src = button.dataset.figure;
    $('#cap-image').alt = scene + '. ' + group.dataset.alt;
    $('#cap-large').href = button.dataset.figure;
    $('#cap-large').setAttribute('aria-label', 'Open full-size figure for ' + scene);
    $('#cap-description').textContent = button.dataset.caption;
  }
  for (const button of capabilityButtons) {
    button.addEventListener('click', () => {
      const current = document.getElementById(button.getAttribute('aria-controls'));
      for (const option of capabilityButtons) option.setAttribute('aria-pressed', String(option === button));
      for (const group of sceneGroups) group.hidden = group !== current;
      showCapabilityScene(current.querySelector('[aria-pressed="true"]'));
    });
  }
  for (const button of capabilities.querySelectorAll('[data-figure]')) {
    button.addEventListener('click', () => showCapabilityScene(button));
  }
  for (const card of document.querySelectorAll('[data-sample-set]')) {
    const subset = card.dataset.sampleSet;
    const controls = card.querySelector('.sample-controls');
    const scene = controls.querySelector('select');
    const placement = controls.querySelector('.sample-pose');
    const image = card.querySelector('img');
    function showSample() {
      const number = String(scene.selectedIndex + 1).padStart(2,'0');
      const prefix = placement ? subset + '-' + placement.value : subset;
      const references = placement ? 'six ' + placement.value + '-path reference views' :
        subset === 'short' ? 'two endpoint views' : 'six on-path reference views';
      image.src = 'assets/benchmark/' + prefix + '-' + number + '.webp';
      image.alt = scene.value + ', with ' + references + ' and the target camera path';
    }
    controls.addEventListener('change',showSample);
    showSample();
    controls.hidden = false;
  }
  const cloudScene = $('#cloud-scene');
  const cloudPose = $('#cloud-pose');
  const cloudBaseline = $('#cloud-baseline');
  function setCloudInput(link, filename, description) {
    const url = 'assets/cloud-inputs/' + filename + '.webp';
    const image = link.querySelector('img');
    link.href = url;
    image.src = url;
    image.alt = description;
  }
  function showCloudInputs(scene, sample, hasWhitebox) {
    const inputs = $('.cloud-inputs');
    if (inputs.dataset.sample === sample) return;
    inputs.dataset.sample = sample;
    inputs.classList.toggle('with-whitebox', hasWhitebox);
    const setting = scene.textContent + (hasWhitebox ? ' (' + cloudPose.value + '-path)' : '');
    inputs.querySelectorAll('.cloud-ref-strip a').forEach((link, index) => {
      const number = index + 1;
      setCloudInput(link, sample + '-r' + number, setting + ', reference frame ' + number);
    });
    $('#cloud-whitebox').hidden = !hasWhitebox;
    if (hasWhitebox) setCloudInput($('#cloud-whitebox a'), scene.value + '-whitebox', scene.textContent + ', authored scene whitebox');
    setCloudInput($('#cloud-trajectory a'), sample + '-path', setting + ', target camera trajectory and six reference poses');
  }
  function showClouds() {
    const scene = cloudScene.selectedOptions[0];
    const pairedPoses = scene.parentElement.hasAttribute('data-placement');
    const sample = pairedPoses ? scene.value + '-' + cloudPose.value : scene.value;
    const baseline = cloudBaseline.selectedOptions[0];
    $('#cloud-pose-field').hidden = !pairedPoses;
    showCloudInputs(scene, sample, pairedPoses);
    $('.cloud-grid').classList.toggle('paired', pairedPoses);
    for (const panel of document.querySelectorAll('[data-cloud]')) {
      const role = panel.dataset.cloud;
      panel.hidden = role === 'da3' && pairedPoses;
      if (panel.hidden) continue;
      const method = role === 'baseline' ? baseline.value : role;
      const caption = panel.querySelector('figcaption');
      if (role === 'baseline') caption.textContent = baseline.textContent;
      const src = 'assets/point-clouds/' + sample + '-' + method + '.webp';
      const img = panel.querySelector('img');
      img.alt = scene.textContent + (pairedPoses ? ' (' + cloudPose.value + '-path references)' : '') +
        ', ' + caption.textContent + ' point cloud and enlarged local view';
      img.src = src;
      panel.querySelector('a').href = src;
    }
    $('.cloud-note').textContent = pairedPoses ? 'The lower views enlarge the boxed regions.' :
      'The lower views enlarge the boxed regions. DA3 reconstructs the captured views for reference.';
  }
  $('.cloud-controls').addEventListener('change', showClouds);
  showClouds();
  $('.cloud-controls').hidden = false;
  function showBenchmark(key) {
    const data = benchmarks[key];
    document.querySelectorAll('[data-bench]').forEach(button => button.setAttribute('aria-pressed',String(button.dataset.bench===key)));
    $('#benchmark-title').textContent=data.title; $('#benchmark-description').textContent=data.desc;
    const table=$('#scores'); table.replaceChildren();
    const header=table.createTHead().insertRow();
    ['Method',...data.cols].forEach(value => { const cell=document.createElement('th'); cell.scope='col'; cell.textContent=value; header.append(cell); });
    const body=table.createTBody();
    data.rows.forEach(([name,...scores]) => {
      const row=body.insertRow(), label=document.createElement('th');
      if (name==='WorldBridge') row.className='ours';
      label.scope='row'; label.textContent=name; row.append(label);
      scores.forEach(score => {row.insertCell().textContent=score;});
    });
  }
  document.querySelectorAll('[data-bench]').forEach(button => button.onclick=() => showBenchmark(button.dataset.bench));
  showBenchmark('short');
})();
