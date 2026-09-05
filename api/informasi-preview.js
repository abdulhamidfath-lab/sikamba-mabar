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
    res.writeHead(302, { Location: `${BASE_URL}/pages/informasi.html` });
    res.end();
    return;
  }

  try {
    const resp = await fetch(
      `${SUPABASE_URL}/rest/v1/informasi?id=eq.${id}&status=eq.published&select=*`,
      { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }
    );
    const data = await resp.json();
    const info = data[0];

    if (!info) {
      res.writeHead(302, { Location: `${BASE_URL}/pages/informasi.html` });
      res.end();
      return;
    }

    const judul = `${info.judul} — SIKAMBA MABAR`;
    const deskripsi = info.ringkasan || 'Informasi dari Dinas Perdagangan dan Perindustrian Manggarai Barat';
    const gambar = info.foto_url || `${BASE_URL}/images/logo-mabar.png`;
    const urlAsli = `${BASE_URL}/pages/detail-informasi.html?id=${id}`;

    const html = `<!DOCTYPE html>
<html lang="id"><head>
<meta charset="UTF-8">
<title>${escapeHtml(judul)}</title>
<meta property="og:type" content="article">
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
    res.writeHead(302, { Location: `${BASE_URL}/pages/informasi.html` });
    res.end();
  }
}
