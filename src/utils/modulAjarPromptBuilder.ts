import { ModulAjarDocument } from '../types';

/**
 * GENERATE PROMPT DARI OUTPUT MODUL AJAR AKTIF
 * 
 * Menyusun prompt AI komprehensif, terstruktur, dan presisi tinggi berdasarkan
 * dokumen modul ajar aktif (tanpa data mock / modul lain).
 * 
 * Prompt ini menginstruksikan model AI (ChatGPT / Gemini / Claude) untuk:
 * 1. Memahami seluruh isi modul ajar sebagai acuan tunggal.
 * 2. Mempertahankan Capaian Pembelajaran (CP) dan Tujuan Pembelajaran (TP) asli.
 * 3. Mengembangkan konten turunan berbasis materi pokok yang sudah ditetapkan.
 * 4. Menjaga keselarasan instruksional antara tujuan, kegiatan, dan asesmen.
 * 5. Mengikuti prinsip Pembelajaran Mendalam (Berkesadaran, Bermakna, Menggembirakan).
 * 6. Mempertahankan alokasi waktu dan jenjang/fase pendidikan.
 * 7. Tidak mengarang/berhalusinasi informasi baru yang tidak selaras.
 * 8. Menghasilkan output kontekstual sesuai kebutuhan pengembangan guru.
 */
export function buildPromptFromModulAjar(doc: ModulAjarDocument): string {
  const info = doc.informasiUmum;
  const ident = doc.identifikasiDanDesain;
  const langkah = doc.langkahPembelajaran;
  const asesmen = doc.asesmen;
  const refleksi = doc.refleksi;
  const subjek = doc.subjectAwareAnalysis;

  // 1. Format Tujuan Pembelajaran
  const tpMemahami = ident?.tujuanPembelajaran?.memahami?.map((t: string, i: number) => `   ${i + 1}. [Memahami] ${t}`).join('\n') || '   -';
  const tpMengaplikasi = ident?.tujuanPembelajaran?.mengaplikasi?.map((t: string, i: number) => `   ${i + 1}. [Mengaplikasi] ${t}`).join('\n') || '   -';
  const tpMerefleksi = ident?.tujuanPembelajaran?.merefleksi?.map((t: string, i: number) => `   ${i + 1}. [Merefleksi] ${t}`).join('\n') || '   -';

  // 2. Format Dimensi Profil Pelajar Pancasila / Profil Lulusan
  const dimensiProfil = ident?.dimensiProfilLulusan?.map((p: any, i: number) => `   ${i + 1}. ${p.dimensi} -> Perilaku Teramati: ${p.perilakuTeramati} (Relevansi: ${p.alasanRelevansi})`).join('\n') || '   - Bernalar Kritis, Kreatif, Mandiri';

  // 3. Format Praktik Pedagogis & Sintaks
  const sintaksGuru = ident?.praktikPedagogis?.sintaksTahapan?.map((s: any, i: number) => `   ${i + 1}. [${s.tahapan}] ${s.deskripsi}`).join('\n') || '   -';

  // 4. Format Langkah-Langkah Pembelajaran (5 Kolom)
  const formatRows = (rows: any[] | undefined, label: string) => {
    if (!rows || rows.length === 0) return `   (Tidak ada data ${label})`;
    return rows.map((r: any, i: number) => 
      `   ${i + 1}. Aktivitas: ${r.activity}\n` +
      `      • Alokasi Waktu: ${r.timeAllocation}\n` +
      `      • Prinsip: ${r.principle}\n` +
      `      • Pengalaman Belajar: ${r.learningExperience}\n` +
      `      • Sumber & Media: ${r.learningResources}`
    ).join('\n\n');
  };

  const stepsAwal = formatRows(langkah?.kegiatanAwal, 'Kegiatan Pendahuluan');
  const stepsInti = formatRows(langkah?.kegiatanInti, 'Kegiatan Inti');
  const stepsPenutup = formatRows(langkah?.kegiatanPenutup, 'Kegiatan Penutup');

  // 5. Format Rubrik Asesmen
  const rubrikRows = asesmen?.rubrikPenilaian?.map((r: any, i: number) => 
    `   ${i + 1}. Aspek: ${r.aspek} | Indikator: ${r.indikator}\n` +
    `      - Skala 1 (Perlu Bimbingan): ${r.skala1}\n` +
    `      - Skala 2 (Cukup): ${r.skala2}\n` +
    `      - Skala 3 (Baik): ${r.skala3}\n` +
    `      - Skala 4 (Sangat Baik): ${r.skala4}`
  ).join('\n\n') || '   -';

  // 6. Format Refleksi Guru & Peserta Didik
  const refleksiGuru = refleksi?.refleksiGuru?.map((g: string, i: number) => `   ${i + 1}. ${g}`).join('\n') || '   -';
  const refleksiSiswa = refleksi?.refleksiPesertaDidik?.map((s: string, i: number) => `   ${i + 1}. ${s}`).join('\n') || '   -';

  // 7. Format Subject-Aware / Lampiran (jika ada)
  let lampiranSection = '';
  if (subjek && subjek.isQuantitative) {
    lampiranSection = `\n======================================================================
LAMPIRAN KHUSUS SUBJECT-AWARE (MATEMATIKA / SAINS / NUMERIK)
======================================================================
Karakteristik Subjek: ${subjek.domainNameId || 'Numerik & Sains'}
Ciri Terdeteksi: ${(subjek.detectedCharacteristics || []).join(', ')}

1. Rumus & Notasi Utama:
${(subjek.coreFormulas || []).map((f: any, i: number) => `   ${i + 1}. ${f.name}: ${f.formula} (Keterangan: ${f.textFallback})`).join('\n') || '   -'}

2. Contoh Soal & Langkah Penyelesaian (Worked Example):
   Judul: ${subjek.workedExample?.problemTitle || '-'}
   Deskripsi Soal: ${subjek.workedExample?.problemStatement || '-'}
   Langkah Pengerjaan Runtut:
${(subjek.workedExample?.steps || []).map((st: any, i: number) => `      Langkah ${st.stepNumber || (i + 1)}: ${st.stepTitle} -> ${st.mathExpression} (${st.explanation})`).join('\n') || '      -'}
   Jawaban Akhir Tervalidasi: ${subjek.workedExample?.finalAnswer || '-'}
   Catatan Verifikasi: ${subjek.workedExample?.verificationOrNote || '-'}

3. Tabel Analisis Khusus:
   Judul Tabel: ${subjek.specializedTable?.title || '-'}
   Kolom: ${(subjek.specializedTable?.headers || []).join(' | ')}
${(subjek.specializedTable?.rows || []).map((r: string[]) => `   Data: ${r.join(' | ')}`).join('\n')}
   Wawasan: ${subjek.specializedTable?.summaryOrInsight || '-'}
`;
    if (subjek.codeOrPseudocode) {
      lampiranSection += `\n4. Blok Algoritma / Kode Program:\n   Judul: ${subjek.codeOrPseudocode.title}\n   Bahasa: ${subjek.codeOrPseudocode.language}\n\`\`\`${subjek.codeOrPseudocode.language}\n${subjek.codeOrPseudocode.code}\n\`\`\`\n   Penjelasan: ${subjek.codeOrPseudocode.explanation}\n`;
    }
  }

  // SUSUN PROMPT UTUH
  return `### PERAN DAN IDENTITAS AI:
Anda adalah Asisten Pakar Kurikulum, Desainer Instruksional Senior, dan Spesialis Pembelajaran Mendalam (Deep Learning Pedagogy) Kementerian Pendidikan. Tugas Anda adalah memahami dokumen modul ajar di bawah ini secara menyeluruh, lalu mengembangkan perangkat pembelajaran lanjutan yang diminta oleh guru dengan standar kualitas tertinggi.

======================================================================
PANDUAN & ATURAN KERJA UTAMA (STRICT DIRECTIVES):
======================================================================
1. MEMAHAMI SUMBER UTUH: Jadikan seluruh isi modul ajar di bawah ini sebagai sumber kebenaran tunggal (single source of truth).
2. PERTAHANKAN CP & TUJUAN: Jangan pernah mengubah, mereduksi, atau mengganti Capaian Pembelajaran (CP) dan Tujuan Pembelajaran (TP) yang sudah dirumuskan.
3. KESELARASAN KONSTRUKTIF: Pastikan setiap materi, soal, LKPD, tugas, atau media yang Anda kembangkan memiliki keselarasan mutlak (constructive alignment) dengan tujuan pembelajaran, alur pengalaman belajar (Memahami, Mengaplikasi, Merefleksi), dan rubrik asesmen.
4. PRINSIP PEMBELAJARAN MENDALAM: Wajib menerapkan 3 prinsip utama:
   - Berkesadaran (Mindful): Mengajak siswa memahami makna, tujuan, dan kesadaran diri dalam belajar.
   - Bermakna (Meaningful): Menghubungkan konsep dengan konteks nyata, relevansi kehidupan, dan pemecahan masalah otentik.
   - Menggembirakan (Joyful): Menciptakan iklim belajar yang membangkitkan rasa ingin tahu, kolaboratif, dan menyenangkan.
5. KETEPATAN WAKTU & FASE: Sesuaikan tingkat kedalaman materi dan bahasa dengan karakteristik fase/kelas (${info.faseAtauKelas}) serta batasan alokasi waktu (${info.alokasiWaktu}).
6. TIDAK MENGARANG BEBAS: Jangan mengarang fakta ilmiah, rumus fiktif, angka tanpa dasar, atau data sembarangan. Gunakan konsep dan rumus materi yang valid.
7. KELUARAN SIAP PAKAI: Buat hasil yang terstruktur rapi, profesional, praktis, dan dapat langsung digunakan oleh guru di kelas.

======================================================================
DOKUMEN SUMBER ACUAN: MODUL AJAR AKTIF
======================================================================

[A. IDENTITAS MODUL]
• Satuan Pendidikan    : ${info.namaSekolah}
• Guru / Penyusun      : ${info.namaPenyusun}
• Mata Pelajaran       : ${info.mataPelajaran}
• Fase / Kelas         : ${info.faseAtauKelas}
• Semester             : ${info.semester}
• Alokasi Waktu        : ${info.alokasiWaktu}
• Materi Pokok         : ${info.materi}
• Topik Pembelajaran   : ${info.topikPembelajaran}
• Sasaran Peserta Didik: ${info.sasaranPesertaDidik || 'Peserta didik reguler dengan keberagaman kesiapan belajar.'}
• Sarana & Prasarana   : ${info.saranaDanPrasarana || 'Papan tulis, proyektor, LKPD, gawai referensi.'}

[B. CAPAIAN & TUJUAN PEMBELAJARAN]
• Capaian Pembelajaran (CP):
  "${ident?.capaianPembelajaran || '-'}"

• Tujuan Pembelajaran (3 Pilar Pengalaman Belajar):
  - Ranah Memahami (Knowing):
${tpMemahami}
  - Ranah Mengaplikasi (Doing/Applying):
${tpMengaplikasi}
  - Ranah Merefleksi (Reflecting):
${tpMerefleksi}

• Profil Pelajar Pancasila (Dimensi Profil Lulusan):
${dimensiProfil}

[C. DESAIN & PRAKTIK PEDAGOGIS]
• Pendekatan & Model   : ${ident?.praktikPedagogis?.namaPendekatan || 'Problem Based Learning (PBL)'}
• Kemitraan Belajar    : ${ident?.kemitraanPembelajaran || ident?.mitraPembelajaran || 'Kolaborasi antar siswa, bimbingan guru, dan referensi kontekstual.'}
• Lingkungan Belajar   : Ruang fisik aktif (${ident?.lingkunganPembelajaran?.fisik || 'Kelas interaktif'}), iklim kelas sosial inklusif (${ident?.lingkunganPembelajaran?.sosial || 'Aman dan suportif'}), pemanfaatan digital (${ident?.lingkunganPembelajaran?.digital || 'Media presentasi & LKPD digital'}).
• Sintaks Pembelajaran :
${sintaksGuru}

[D. LANGKAH-LANGKAH PEMBELAJARAN LENGKAP (5 KOLOM)]
1. KEGIATAN PENDAHULUAN:
${stepsAwal}

2. KEGIATAN INTI:
${stepsInti}

3. KEGIATAN PENUTUP:
${stepsPenutup}

[E. ASESMEN & RUBRIK PENILAIAN]
1. Asesmen Awal (Diagnostik):
   • Tujuan   : ${asesmen?.asesmenAwal?.tujuan || '-'}
   • Teknik   : ${asesmen?.asesmenAwal?.teknik || '-'}
   • Instrumen: ${asesmen?.asesmenAwal?.contohSoalTugas || '-'}

2. Asesmen Formatif (Proses):
   • Teknik     : ${asesmen?.asesmenFormatif?.teknik || '-'}
   • Waktu      : ${asesmen?.asesmenFormatif?.waktuPelaksanaan || '-'}
   • Kriteria   : ${asesmen?.asesmenFormatif?.kriteriaKeberhasilan || '-'}
   • Umpan Balik: ${asesmen?.asesmenFormatif?.bentukUmpanBalik || '-'}

3. Asesmen Sumatif (Akhir):
   • Bentuk              : ${asesmen?.asesmenSumatif?.bentuk || '-'}
   • Deskripsi Soal/Tugas: ${asesmen?.asesmenSumatif?.deskripsiTugasSoal || '-'}
   • Kunci / Kriteria    : ${asesmen?.asesmenSumatif?.kunciAtauKriteria || '-'}

4. Rubrik Penilaian Bertingkat (Skala 1 - 4):
${rubrikRows}

[F. REFLEKSI, PENGAYAAN, & REMEDIAL]
• Refleksi Guru:
${refleksiGuru}

• Refleksi Peserta Didik:
${refleksiSiswa}

• Rencana Pengayaan:
  ${asesmen?.pengolahanDanTindakLanjut?.pengayaan || 'Diberikan tantangan pengayaan berbasis proyek kontekstual tingkat lanjut atau soal pemecahan masalah HOTS bagi peserta didik yang telah melampaui tujuan pembelajaran.'}

• Rencana Remedial:
  ${asesmen?.pengolahanDanTindakLanjut?.remedial || 'Bimbingan individual/tutor sebaya terfokus pada indikator yang belum dikuasai peserta didik dengan contoh sederhana dan pendampingan bertahap.'}${lampiranSection}
======================================================================
[INSTRUKSI PENGEMBANGAN GURU]:
Berdasarkan seluruh dokumen modul ajar di atas, silakan kembangkan:
1. Lembar Kerja Peserta Didik (LKPD) kontekstual dan interaktif untuk Kegiatan Inti.
2. 5 butir Soal Asesmen Pilihan Ganda HOTS beserta kunci jawaban dan pembahasan pedagogis.
3. Panduan diskusi kelompok dan pertanyaan pemantik untuk pengalaman Merefleksi.
*(Guru dapat menyesuaikan atau menambahkan instruksi spesifik lainnya di sini sebelum mengirimkan ke AI)*
======================================================================`;
}
