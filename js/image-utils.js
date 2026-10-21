// ============================================
// SIKAMBA MABAR - Kompres Foto Sebelum Upload
//
// Fungsi ini mengecilkan foto di browser SEBELUM
// dikirim ke Supabase Storage, supaya:
//   - Storage (batas gratis 1 GB) tidak cepat penuh
//   - Egress / data keluar (batas gratis 5 GB) lebih hemat
//   - Halaman lebih cepat dibuka di sinyal lemah
//
// Cara pakai:
//   const fotoKecil = await kompresFoto(fileAsli);
//   // lalu upload fotoKecil, bukan fileAsli
//
// Parameter (semua opsional):
//   lebarMax — lebar maksimal dalam piksel (default 1280)
//   kualitas — 0 sampai 1, makin kecil makin ringan (default 0.8)
//
// Aman dipakai: kalau terjadi masalah apa pun,
// fungsi ini mengembalikan file ASLI, jadi upload
// tidak akan gagal gara-gara kompresi.
// ============================================

function kompresFoto(file, lebarMax = 1280, kualitas = 0.85) {
  return new Promise((resolve) => {
    // Bukan gambar? Kembalikan apa adanya.
    if (!file || !file.type || !file.type.startsWith('image/')) {
      resolve(file);
      return;
    }

    // Foto sudah kecil (di bawah 300 KB)? Tidak perlu diapa-apakan.
    // Dikompres ulang justru bisa menurunkan kualitasnya.
    if (file.size <= 300 * 1024) {
      resolve(file);
      return;
    }

    const url = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      URL.revokeObjectURL(url);

      // Hitung ukuran baru, perbandingan lebar:tinggi dijaga
      let lebar = img.naturalWidth;
      let tinggi = img.naturalHeight;

      // Ukuran pikselnya sudah wajar DAN berat file masih sedang (di bawah 500 KB)?
      // Tidak ada yang perlu dihemat, pakai file asli.
      if (lebar <= lebarMax && file.size <= 500 * 1024) {
        resolve(file);
        return;
      }

      if (lebar > lebarMax) {
        tinggi = Math.round(tinggi * lebarMax / lebar);
        lebar = lebarMax;
      }

      // Gambar ulang di kanvas dengan ukuran baru
      const kanvas = document.createElement('canvas');
      kanvas.width = lebar;
      kanvas.height = tinggi;
      const ctx = kanvas.getContext('2d');

      // Latar putih, supaya PNG transparan tidak jadi hitam saat jadi JPG
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, lebar, tinggi);
      ctx.drawImage(img, 0, 0, lebar, tinggi);

      // Simpan sebagai JPG berkualitas 80%
      kanvas.toBlob((blob) => {
        // Gagal, atau hasilnya tidak lebih kecil? Pakai file asli.
        if (!blob || blob.size >= file.size) {
          resolve(file);
          return;
        }
        const namaBaru = file.name.replace(/\.[^.]+$/, '') + '.jpg';
        resolve(new File([blob], namaBaru, { type: 'image/jpeg' }));
      }, 'image/jpeg', kualitas);
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(file); // gambar tidak bisa dibaca, biarkan file asli
    };

    img.src = url;
  });
}
