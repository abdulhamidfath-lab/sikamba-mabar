// ============================================
// SIKAMBA MABAR - Sitemap Dinamis
//
// Dibuka lewat alamat /sitemap.xml (diarahkan oleh vercel.json).
// Isinya dibuat otomatis dari database setiap kali diminta:
//   - halaman tetap (beranda, marketplace, dst.)
//   - halaman detail IKM yang berstatus aktif
//   - halaman detail produk yang aktif
//   - halaman detail informasi yang sudah published
//
// Kalau database gagal dihubungi, sitemap tetap dikirim
// berisi halaman tetap saja, supaya Google tidak menerima
// file kosong atau error.
// ============================================

export default async function handler(req, res) {
  const SUPABASE_URL = 'https://bmseepdxszauqzdiygnb.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_Ue4jnv_wM8p4zPtNzVX8Gw_B6iWhlAo';

  // Alamat dasar situs. Kalau nanti pindah domain (misal .go.id),
  // cukup ubah baris ini saja.
  const BASE_URL = 'https://sikamba-mabar.vercel.app';

  // Halaman tetap. login, daftar, dan cari sengaja tidak dimasukkan
  // karena tidak perlu ditemukan lewat Google.
  const halamanTetap = [
    { path: '/',                        freq: 'daily',   prio: '1.0' },
    { path: '/pages/marketplace.html',  freq: 'daily',   prio: '0.9' },
    { path: '/pages/data-ikm.html',     freq: 'daily',   prio: '0.9' },
    { path: '/pages/peta.html',         freq: 'weekly',  prio: '0.8' },
    { path: '/pages/informasi.html',    freq: 'daily',   prio: '0.8' },
    { path: '/pages/tentang.html',      freq: 'monthly', prio: '0.6' },
  ];

  // Mengganti karakter khusus agar XML tidak rusak
  function escapeXml(str) {
    return String(str).replace(/[&<>"']/g, m => (
      { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' }[m]
    ));
  }

  // Mengambil data dari Supabase
  async function ambil(query) {
    const resp = await fetch(`${SUPABASE_URL}/rest/v1/${query}`, {
      headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` }
    });
    if (!resp.ok) throw new Error('Supabase ' + resp.status);
    return resp.json();
  }

  // Menyusun satu blok <url>
  function buatUrl(alamat, freq, prio, lastmod) {
    return '  <url>\n' +
      `    <loc>${escapeXml(alamat)}</loc>\n` +
      (lastmod ? `    <lastmod>${lastmod}</lastmod>\n` : '') +
      `    <changefreq>${freq}</changefreq>\n` +
      `    <priority>${prio}</priority>\n` +
      '  </url>';
  }

  const daftarUrl = halamanTetap.map(h => buatUrl(BASE_URL + h.path, h.freq, h.prio));

  try {
    // Tiga permintaan dijalankan bersamaan supaya lebih cepat
    const [ikm, produk, informasi] = await Promise.all([
      ambil('ikm?status=eq.aktif&select=id'),
      ambil('produk?aktif=eq.true&select=id'),
      ambil('informasi?status=eq.published&select=id,published_at'),
    ]);

    ikm.forEach(i => daftarUrl.push(
      buatUrl(`${BASE_URL}/pages/detail-ikm.html?id=${encodeURIComponent(i.id)}`, 'weekly', '0.7')
    ));

    produk.forEach(p => daftarUrl.push(
      buatUrl(`${BASE_URL}/pages/detail-produk.html?id=${encodeURIComponent(p.id)}`, 'weekly', '0.7')
    ));

    informasi.forEach(a => daftarUrl.push(
      buatUrl(
        `${BASE_URL}/pages/detail-informasi.html?id=${encodeURIComponent(a.id)}`,
        'monthly',
        '0.6',
        a.published_at ? a.published_at.slice(0, 10) : null
      )
    ));
  } catch (e) {
    // Database gagal: lanjut dengan halaman tetap saja
    console.error('Sitemap: gagal ambil data dinamis:', e.message);
  }

  const xml =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    daftarUrl.join('\n') + '\n' +
    '</urlset>';

  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  // Simpan di cache 1 jam; boleh pakai versi lama sampai 1 hari kalau sedang diperbarui
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
  res.status(200).send(xml);
}
