// ============================================
// SIKAMBA MABAR - Fungsi Login & Daftar
// ============================================

// LOGIN
async function login(email, password) {
  const { data, error } = await db.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

// DAFTAR AKUN BARU — peran tersimpan lewat metadata
async function daftar(email, password, namaLengkap, peran) {
  const { data, error } = await db.auth.signUp({
    email,
    password,
    options: {
      data: {
        nama_lengkap: namaLengkap,
        peran: peran
      }
    }
  });
  if (error) throw error;

  // Simpan juga langsung ke tabel profiles sebagai backup
  if (data.user) {
    await db.from('profiles').upsert({
      id: data.user.id,
      nama_lengkap: namaLengkap,
      peran: peran
    });
  }
  return data;
}

// LOGOUT
async function logout() {
  await db.auth.signOut();
  window.location.href = '/login.html';
}

// LUPA PASSWORD
async function lupaPassword(email) {
  const { error } = await db.auth.resetPasswordForEmail(email, {
    redirectTo: window.location.origin + '/pages/reset-password.html'
  });
  if (error) throw error;
}

// ============================================
// SETUP NAV ADMIN
//
// Fungsi ini menampilkan menu Laporan & Pengguna
// di navbar kalau user yang login adalah admin.
//
// Cara pakai — cukup panggil 1 baris di tiap halaman:
//   setupNavAdmin();
//
// Tidak perlu lagi copy-paste blok IIFE di setiap halaman.
// ============================================
async function setupNavAdmin() {
  try {
    const user = await getUser();
    if (!user) return;
    const profil = await getProfil(user.id);
    if (profil?.peran !== 'admin') return;

    // Tampilkan link Laporan & Pengguna kalau ada di navbar
    const navLaporan  = document.getElementById('navLaporan');
    const navPengguna = document.getElementById('navPengguna');
    if (navLaporan)  navLaporan.style.display  = 'block';
    if (navPengguna) navPengguna.style.display = 'block';
  } catch(e) {
    // Gagal cek user — tidak apa-apa, menu admin tidak ditampilkan
  }
}
