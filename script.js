const projects = [
  { title: 'Lusi Store', type: 'web', label: 'E-commerce', year: '2025', art: 'one', description: 'Tampilan toko online yang dirancang untuk memudahkan pelanggan menemukan produk dan menyelesaikan pembelian dengan nyaman.', tags: ['HTML', 'CSS', 'JavaScript'] },
  { title: 'KasirKu', type: 'app', label: 'Web App', year: '2025', art: 'two', description: 'Aplikasi kasir sederhana untuk membantu pencatatan transaksi, produk, dan ringkasan penjualan secara efisien.', tags: ['PHP', 'MySQL', 'Bootstrap'] },
  { title: 'Explore Indonesia', type: 'ui', label: 'UI/UX Design', year: '2024', art: 'three', description: 'Eksplorasi desain landing page wisata yang memadukan visual destinasi dan alur informasi yang mudah dipahami.', tags: ['Figma', 'UI Design', 'Prototype'] },
  { title: 'Portfolio Personal', type: 'web', label: 'Website', year: '2024', art: 'one', description: 'Website personal yang menjadi ruang untuk menampilkan karya, cerita, dan perjalanan sebagai web developer.', tags: ['Responsive', 'CSS', 'JavaScript'] }
];
const grid = document.querySelector('#projects-grid');
const modal = document.querySelector('#project-modal');
const modalContent = document.querySelector('#modal-content');
function render(filter = 'all') {
  const shown = projects.filter(p => filter === 'all' || p.type === filter);
  grid.innerHTML = shown.map((p, i) => `<article class="project-card reveal visible" data-id="${projects.indexOf(p)}" style="transition-delay:${i * 80}ms"><div class="art ${p.art}"></div><div class="project-meta"><span>${p.label}</span><span>${p.year}</span></div><h3 class="project-title">${p.title}</h3><span class="card-arrow">↗</span></article>`).join('');
}
render();
document.querySelector('.filters').addEventListener('click', e => { if (!e.target.matches('button')) return; document.querySelectorAll('.filters button').forEach(b => b.classList.remove('active')); e.target.classList.add('active'); render(e.target.dataset.filter); });
grid.addEventListener('click', e => { const card = e.target.closest('.project-card'); if (!card) return; const p = projects[card.dataset.id]; modalContent.innerHTML = `<p class="modal-type">${p.label.toUpperCase()} / ${p.year}</p><h3 class="modal-title">${p.title}</h3><p>${p.description}</p><div class="modal-tags">${p.tags.map(t => `<span>${t}</span>`).join('')}</div>`; modal.showModal(); });
document.querySelector('.modal-close').addEventListener('click', () => modal.close());
modal.addEventListener('click', e => { if(e.target === modal) modal.close(); });
const themeButton = document.querySelector('.theme-toggle');
if (localStorage.theme === 'dark') document.body.classList.add('dark');
themeButton.addEventListener('click', () => { document.body.classList.toggle('dark'); localStorage.theme = document.body.classList.contains('dark') ? 'dark' : 'light'; themeButton.firstElementChild.textContent = document.body.classList.contains('dark') ? '◐' : '☼'; });
document.querySelector('.menu-toggle').addEventListener('click', () => document.querySelector('.site-header').classList.toggle('open'));
document.querySelectorAll('nav a').forEach(a => a.addEventListener('click', () => document.querySelector('.site-header').classList.remove('open')));
new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); }), {threshold:.12}).observe(document.querySelector('.about-copy'));
document.querySelectorAll('.reveal').forEach(el => new IntersectionObserver(entries => entries.forEach(e => {if(e.isIntersecting) e.target.classList.add('visible')}), {threshold:.1}).observe(el));
document.querySelector('#year').textContent = new Date().getFullYear();
