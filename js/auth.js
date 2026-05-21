// ============================================
// SIKAMBA MABAR - Fungsi Login & Daftar
// ============================================

// LOGIN
async function login(email, password) {
  const { data, error } = await db.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

// DAFTAR AKUN BARU
async function daftar(email, password, namaLengkap, peran) {
  const { data, error } = await db.auth.signUp({ email, password });
  if (error) throw error;

  // Simpan profil pengguna ke tabel profiles
  if (data.user) {
    await db.from('profiles').insert({
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
async function lupaPasword(email) {
  const { error } = await db.auth.resetPasswordForEmail(email, {
    redirectTo: window.location.origin + '/pages/reset-password.html'
  });
  if (error) throw error;
}
