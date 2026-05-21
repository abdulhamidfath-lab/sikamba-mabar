// ============================================
// SIKAMBA MABAR - Fungsi Data IKM
// ============================================

// AMBIL SEMUA IKM (untuk peta & daftar publik)
async function getAllIKM(filter = {}) {
  let query = db.from('ikm').select('*').eq('status', 'aktif');
  if (filter.kategori) query = query.eq('kategori', filter.kategori);
  if (filter.kecamatan) query = query.eq('kecamatan', filter.kecamatan);
  const { data, error } = await query.order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

// AMBIL DETAIL SATU IKM
async function getIKMById(id) {
  const { data, error } = await db
    .from('ikm').select('*, produk(*)').eq('id', id).single();
  if (error) throw error;
  return data;
}

// AMBIL IKM MILIK PENGGUNA YANG LOGIN
async function getMyIKM(userId) {
  const profil = await getProfil(userId);
  if (!profil?.ikm_id) return null;
  return getIKMById(profil.ikm_id);
}

// SIMPAN IKM BARU
async function simpanIKM(data) {
  const { data: ikm, error } = await db.from('ikm').insert(data).select().single();
  if (error) throw error;
  // Hubungkan IKM ke profil pengguna
  const user = await getUser();
  await db.from('profiles').update({ ikm_id: ikm.id }).eq('id', user.id);
  return ikm;
}

// UPDATE DATA IKM
async function updateIKM(id, data) {
  const { error } = await db.from('ikm').update(data).eq('id', id);
  if (error) throw error;
}

// UPLOAD FOTO IKM
async function uploadFotoIKM(file, ikmId) {
  const ext = file.name.split('.').pop();
  const path = `${ikmId}/foto.${ext}`;
  const { error } = await db.storage.from('foto-ikm').upload(path, file, { upsert: true });
  if (error) throw error;
  const { data } = db.storage.from('foto-ikm').getPublicUrl(path);
  return data.publicUrl;
}

// AMBIL SEMUA PRODUK MILIK IKM
async function getProdukByIKM(ikmId) {
  const { data, error } = await db
    .from('produk').select('*').eq('ikm_id', ikmId).eq('aktif', true);
  if (error) throw error;
  return data;
}

// SIMPAN PRODUK BARU
async function simpanProduk(data) {
  const { data: produk, error } = await db.from('produk').insert(data).select().single();
  if (error) throw error;
  return produk;
}

// STATISTIK RINGKASAN (untuk dashboard)
async function getStatistik() {
  const [ikm, produk] = await Promise.all([
    db.from('ikm').select('id', { count: 'exact' }).eq('status', 'aktif'),
    db.from('produk').select('id', { count: 'exact' }).eq('aktif', true)
  ]);
  return {
    totalIKM: ikm.count || 0,
    totalProduk: produk.count || 0
  };
}
