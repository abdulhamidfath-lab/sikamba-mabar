export default async function handler(req, res) {
  const { id } = req.query;
  const SUPABASE_URL = 'https://bmseepdxszauqzdiygnb.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_Ue4jnv_wM8p4zPtNzVX8Gw_B6iWhlAo';
  const BASE_URL = 'https://sikamba-mabar.vercel.app';

  function escapeHtml(str) {
    return String(str || '').replace(/[&<>"']/g, m => (
      { '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[m]
    ));
  }

  if (!id) {
    res.writeHead(302, { Location: `${BASE_URL}/pages/marketplace.html` });
    res.end();
    return;
  }

  try {
    const resp = await fetch(
      `${SUPABASE_URL}/rest/v1/produk?id=eq.${id}&select=*,ikm:ikm_id(nama_usaha,kecamatan)`,
      { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }
    );
    const data = await resp.json();
    const p = data[0];

    if (!p) {
      res.writeHead(302, { Location: `${BASE_URL}/pages/marketplace.html` });
      res.end();
      return;
    }

    const judul = `${p.nama_produk} — SIKAMBA MABAR`;
    const harga = 'Rp ' + parseInt(p.harga).toLocaleString('id-ID');
    const deskripsi = `${harga} — dari ${p.ikm?.nama_usaha || 'IKM Manggarai Barat'}, ${p.ikm?.kecamatan || ''}`;
    const gambar = p.foto_url || `${BASE_URL}/images/logo-mabar.png`;
    const urlAsli = `${BASE_URL}/pages/detail-produk.html?id=${id}`;

    const html = `<!DOCTYPE html>
<html lang="id"><head>
<meta charset="UTF-8">
<title>${escapeHtml(judul)}</title>
<meta property="og:type" content="product">
<meta property="og:title" content="${escapeHtml(judul)}">
<meta property="og:description" content="${escapeHtml(deskripsi)}">
<meta property="og:image" content="${gambar}">
<meta property="og:url" content="${urlAsli}">
<meta property="og:site_name" content="SIKAMBA MABAR">
<meta name="twitter:card" content="summary_large_image">
<meta http-equiv="refresh" content="0; url=${urlAsli}">
</head><body>
<p>Mengalihkan ke <a href="${urlAsli}">${escapeHtml(judul)}</a>...</p>
</body></html>`;

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.status(200).send(html);
  } catch (e) {
    res.writeHead(302, { Location: `${BASE_URL}/pages/marketplace.html` });
    res.end();
  }
}
