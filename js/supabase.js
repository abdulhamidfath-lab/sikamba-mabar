// ============================================
// SIKAMBA MABAR - Koneksi Supabase
// Ganti SUPABASE_URL dan SUPABASE_ANON_KEY
// dengan nilai dari project Supabase Anda
// ============================================

const SUPABASE_URL = 'https://bmseepdxszauqzdiygnb.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_Ue4jnv_wM8p4zPtNzVX8Gw_B6iWhlAo';

const { createClient } = supabase;
const db = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Cek sesi login saat halaman dibuka
async function getUser() {
  const { data: { user } } = await db.auth.getUser();
  return user;
}

// Ambil profil pengguna (peran: admin/ikm/konsumen)
async function getProfil(userId) {
  const { data, error } = await db
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  if (error) return null;
  return data;
}

// Redirect jika belum login
async function requireLogin() {
  const user = await getUser();
  if (!user) {
    window.location.href = '/login.html';
  }
  return user;
}

// Redirect jika sudah login (untuk halaman login/daftar)
async function redirectIfLoggedIn() {
  const user = await getUser();
  if (user) {
    window.location.href = '/pages/dashboard.html';
  }
}
