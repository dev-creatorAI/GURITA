import { MediaGeneratorConfig, MediaType, CharacterChoice } from '../types/mediaGenerator';
import { classifySubject } from './subjectClassifier';

export interface GeneratedMediaContent {
  headline: string;
  subheadline: string;
  conceptualIntro: string;
  corePoints: Array<{
    heading: string;
    description: string;
    detailOrExample?: string;
  }>;
  concreteExample: string;
  interactiveElement: string;
  summaryTakeaway: string;
  visualCharactersGuidance: string;
  layoutBlueprint: string;
  logoIntegrationGuidance: string;
}

/**
 * Helper to determine student age level & school uniform context
 */
const getGradeContext = (gradeLevel: string) => {
  const g = (gradeLevel || '').toLowerCase();
  if (
    g.includes('sd') ||
    g.includes('fase a') ||
    g.includes('fase b') ||
    g.includes('fase c') ||
    g.includes('kelas 1') ||
    g.includes('kelas 2') ||
    g.includes('kelas 3') ||
    g.includes('kelas 4') ||
    g.includes('kelas 5') ||
    g.includes('kelas 6')
  ) {
    return {
      level: 'SD',
      ageDescription: 'Anak-anak usia 7-12 tahun (Sekolah Dasar)',
      tone: 'Ceria, hangat, ramah anak, mudah dipahami, kosakata sederhana, dan menyemangati',
      uniformDetail: 'Seragam SD nasional (kemeja putih rapi dengan rok/celana merah hati) atau seragam pramuka siaga/penggalang rapi',
      hijabModel: 'Hijab anak-anak sekolah yang simpel, rapi, bersih, berwarna putih atau senada dengan seragam, nyaman dipakai beraktivitas'
    };
  }
  if (
    g.includes('smp') ||
    g.includes('fase d') ||
    g.includes('kelas 7') ||
    g.includes('kelas 8') ||
    g.includes('kelas 9')
  ) {
    return {
      level: 'SMP',
      ageDescription: 'Remaja awal usia 12-15 tahun (SMP / MTs)',
      tone: 'Komunikatif, eksploratif, menumbuhkan nalar kritis dan rasa ingin tahu sains/sosial',
      uniformDetail: 'Seragam SMP nasional (kemeja putih rapi dengan rok/celana biru tua) atau seragam pramuka penggalang rapi',
      hijabModel: 'Hijab sekolah remaja yang rapi, modern, sopan, berwarna putih atau warna seragam madrasah/sekolah, tidak berlebihan'
    };
  }
  if (
    g.includes('sma') ||
    g.includes('smk') ||
    g.includes('fase e') ||
    g.includes('fase f') ||
    g.includes('kelas 10') ||
    g.includes('kelas 11') ||
    g.includes('kelas 12')
  ) {
    return {
      level: 'SMA/SMK',
      ageDescription: 'Remaja akhir usia 15-18 tahun (SMA / SMK / MA)',
      tone: 'Konseptual, analitis, profesional, mengedepankan pemecahan masalah autentik dan wawasan masa depan',
      uniformDetail: 'Seragam SMA (putih abu-abu) atau seragam kejuruan SMK / almamater sekolah yang formal dan santun',
      hijabModel: 'Hijab modern elegan, tertata rapi, profesional, dipadukan seragam atau jas lab/almamater sekolah yang sopan'
    };
  }
  // Default general / educator / adaptif
  return {
    level: 'Adaptif',
    ageDescription: 'Peserta didik dan komunitas pembelajar',
    tone: 'Edukatif, inspiratif, profesional, dan menyenangkan',
    uniformDetail: 'Pakaian atau seragam pendidikan yang santun, tertib, dan mencerminkan lingkungan belajar yang kondusif',
    hijabModel: 'Hijab yang rapi, anggun, menutup aurat secara sopan, modern, dan nyaman untuk lingkungan pendidikan'
  };
};

/**
 * Builds explicit character guidance text according to the teacher's selected CharacterChoice.
 */
const buildCharacterGuidance = (
  choice: CharacterChoice,
  gradeCtx: ReturnType<typeof getGradeContext>,
  designStyle: string,
  illustrationStyle: string
): string => {
  switch (choice) {
    case 'Karakter Muslimah Berhijab':
      return `PILIHAN KARAKTER: KARAKTER MUSLIMAH BERHIJAB (WAJIB HIJAB BAGI SELURUH PEREMPUAN)
- Guru / Pendidik Perempuan: Wajib mengenakan hijab yang rapi, modern, anggun, dan menutup aurat dengan sopan. Mengenakan pakaian pendidik yang formal, bersih, dan profesional (misal: blazer santun, kemeja panjang rapi, atau busana guru beretika).
- Siswa / Pelajar Perempuan: Wajib mengenakan hijab yang rapi, bersih, dan manis sesuai usia (${gradeCtx.ageDescription}). Model hijab simpel (${gradeCtx.hijabModel}) dipadukan dengan seragam sekolah yang sopan dan tertib (${gradeCtx.uniformDetail}).
- Karakter Perempuan Lainnya: Setiap tokoh wanita, siswi, narasumber, atau figur pendukung yang muncul di dalam ilustrasi, infografis, poster, komik, atau slide wajib mengenakan hijab rapi dan busana yang santun.
- Karakter Laki-laki: Siswa dan guru laki-laki TIDAK mengenakan hijab. Mereka mengenakan pakaian/seragam sekolah (${gradeCtx.uniformDetail}) yang sopan, rapi, dengan gaya rambut tertata rapi dan ekspresi bersahabat.
- Interaksi Edukatif: Tampilkan interaksi belajar yang hangat, ramah, dan kolaboratif di lingkungan pendidikan.
- Keselarasan Gaya Visual: Aturan hijab ini wajib diwujudkan secara konsisten dalam gaya desain "${designStyle}" dan gaya ilustrasi "${illustrationStyle}" (3D Pixar, Kartun 2D, Anime, Flat, Semi-realistis, Realistis, Clay, dsb.) tanpa mengurangi estetika visual gaya tersebut.`.trim();

    case 'Karakter Umum (Tanpa Ketentuan Hijab)':
      return `PILIHAN KARAKTER: KARAKTER UMUM (TANPA KETENTUAN HIJAB)
- Karakter Siswa & Pendidik: Menampilkan karakter perempuan dan laki-laki yang berbusana rapi, sopan, bersih, dan pantas untuk lingkungan pendidikan formal (${gradeCtx.uniformDetail}).
- Fleksibilitas Penampilan: Mengikuti konteks, gaya visual, serta kebutuhan materi tanpa mewajibkan penggunaan hijab bagi karakter perempuan. Karakter perempuan dan laki-laki tampil alami, santun, bersahabat, dan mencerminkan semangat belajar generasi muda.
- Bebas dari Aturan Khusus Hijab: JANGAN memaksakan aturan hijab secara otomatis.
- Keselarasan Gaya Visual: Tampilkan karakter dengan ekspresi antusias dalam gaya desain "${designStyle}" dan gaya ilustrasi "${illustrationStyle}".`.trim();

    case 'Karakter Tanpa Manusia':
      return `PILIHAN KARAKTER: KARAKTER TANPA MANUSIA (FOKUS PADA OBJEK, SIMBOL & DIAGRAM)
- DILARANG menampilkan karakter manusia (guru, siswa, atau figur orang) dalam bentuk apa pun di seluruh media pembelajaran ini.
- Fokus Visual: Pusatkan seluruh ilustrasi pada objek materi, bagan alur konsep, diagram skematis, simbol edukatif, instrumen/alat laboratorium, atau ilustrasi benda/gejala alam yang relevan langsung dengan topik materi.
- Estetika & Kejelasan: Sajikan infografis/visual yang kaya akan ikon, bentuk geometris rapi, tipografi berkualitas tinggi, dan analogi visual non-manusia yang menarik.`.trim();

    case 'Karakter Bebas Sesuai Materi':
    default:
      return `PILIHAN KARAKTER: BEBAS & ADAPTIF SESUAI KEBUTUHAN MATERI
- AI diberikan kebebasan penuh untuk menentukan karakter yang paling sesuai dengan topik dan jenjang pendidikan (${gradeCtx.ageDescription}).
- AI dapat menggunakan karakter manusia, hewan representatif, maskot edukatif, atau objek terpersonifikasi sesuai kebutuhan materi.
- Karakter Manusia (jika dimunculkan): Tampil sopan, santun, ramah, dan mengenakan pakaian edukatif tanpa memaksakan aturan hijab khusus.
- Relevansi: Karakter atau elemen visual yang dipilih harus mendukung langsung pemahaman konsep materi, bukan sekadar dekorasi.`.trim();
  }
};

/**
 * Intelligent generator to build complete, structured learning media content
 * automatically without requiring manual "Poin-Poin Konten Utama" input.
 */
export const generateAutoMediaContent = (config: MediaGeneratorConfig): GeneratedMediaContent => {
  const gradeCtx = getGradeContext(config.gradeLevel || '');
  const subjectLower = (config.subject || '').toLowerCase();
  const topicLower = (config.topic || '').toLowerCase();
  const titleText = config.title?.trim() || `${config.topic || 'Materi Pembelajaran'} Interaktif`;
  const characterChoice: CharacterChoice = config.characterChoice || 'Karakter Muslimah Berhijab';

  // 1. Headline & Subheadline
  const headline = titleText;
  let subheadline = config.posterSubtitle?.trim() || '';
  if (!subheadline) {
    if (gradeCtx.level === 'SD') {
      subheadline = `Petualangan Seru Memahami ${config.topic || config.subject} untuk Generasi Cerdas & Kreatif`;
    } else if (gradeCtx.level === 'SMP') {
      subheadline = `Eksplorasi Konsep, Fakta Penting, dan Penerapan Nyata Seputar ${config.topic || config.subject}`;
    } else {
      subheadline = `Panduan Komprehensif & Analisis Terstruktur Memahami Esensi ${config.topic || config.subject}`;
    }
  }

  // 2. Conceptual Intro
  const conceptualIntro = config.learningGoal?.trim()
    ? `Tujuan Inti: ${config.learningGoal}. Media ini dirancang khusus untuk memvisualisasikan materi "${config.topic}" agar konsep abstrak menjadi nyata, mudah dipahami, dan menyenangkan bagi peserta didik.`
    : `Memahami konsep "${config.topic}" dalam mata pelajaran ${config.subject} melalui penyajian visual yang terstruktur, kontekstual, dan relevan dengan kehidupan sehari-hari peserta didik.`;

  // 3. Core Points generation based on subject context & media type
  let corePoints: Array<{ heading: string; description: string; detailOrExample?: string }> = [];
  let concreteExample = '';
  let interactiveElement = '';
  let summaryTakeaway = '';

  // DOMAIN 1: DKV / SENI BUDAYA
  if (
    subjectLower.includes('dkv') ||
    subjectLower.includes('desain komunikasi visual') ||
    subjectLower.includes('seni rupa') ||
    subjectLower.includes('desain grafis') ||
    topicLower.includes('tipografi')
  ) {
    corePoints = [
      {
        heading: '1. Prinsip Hierarki Visual & Fokus Pesan',
        description:
          'Menyusun urutan elemen mata memandang (Headline, Subhead, Body Copy) menggunakan kontras ukuran, ketebalan bobot font, dan ruang bernapas (white space).',
        detailOrExample:
          'Penerapan: Judul utama berukuran besar dengan jenis huruf display, diikuti subjudul yang melengkapi informasi pendukung.'
      },
      {
        heading: '2. Anatomi Tipografi & Keterbacaan (Legibility)',
        description:
          'Memahami garis dasar (baseline), tinggi huruf kecil (x-height), tangkai atas (ascender), dan tangkai bawah (descender) untuk memilih jenis font yang ramah dibaca.',
        detailOrExample:
          'Penerapan: Gunakan kombinasi maksimal 2 rumpun font (misal Sans-Serif modern untuk judul dan Serif humanis untuk teks bacaan panjang).'
      },
      {
        heading: '3. Harmoni Warna & Psikologi Visual',
        description:
          'Menerapkan aturan proporsi palet 60-30-10 (warna dominan, pendukung, dan aksen sorotan) guna membangkitkan emosi serta memperjelas pesan estetis karya.',
        detailOrExample:
          'Penerapan: Warna kontras tinggi antara teks dan latar belakang guna menjamin kenyamanan aksesibilitas seluruh audiens.'
      },
      {
        heading: '4. Keseimbangan Komposisi & Tata Letak Grid',
        description:
          'Memanfaatkan sistem kisi-kisi (grid system) untuk menyeimbangkan bidang simetris maupun asimetris agar desain tampak rapi, profesional, dan dinamis.',
        detailOrExample:
          'Penerapan: Penjajaran (alignment) yang konsisten pada tepi kiri atau kanan kartu visual.'
      }
    ];
    concreteExample = `Contoh Portofolio Nyata: Siswa merancang identitas visual poster festival seni sekolah dengan hierarki tipografi tegas, perpaduan kontras warna yang memukau, dan tata letak grid yang proporsional.`;
    interactiveElement = `Tantangan Kreatif: Amati sebuah karya desain di sekitarmu, lalu identifikasi rumpun huruf apa yang digunakan dan apakah hierarki visualnya sudah memandu mata pembaca secara efektif?`;
    summaryTakeaway = `Desain Komunikasi Visual yang hebat bukan sekadar indah dipandang, melainkan berhasil menyampaikan pesan secara efektif, cepat dimengerti, dan menggerakkan audiens.`;
  }
  // DOMAIN 2: IPA / SAINS (Fisika, Kimia, Biologi)
  else if (
    subjectLower.includes('ipa') ||
    subjectLower.includes('sains') ||
    subjectLower.includes('fisika') ||
    subjectLower.includes('biologi') ||
    subjectLower.includes('kimia') ||
    topicLower.includes('fotosintesis') ||
    topicLower.includes('ekosistem') ||
    topicLower.includes('energi') ||
    topicLower.includes('gerak')
  ) {
    if (topicLower.includes('fotosintesis') || topicLower.includes('tumbuhan')) {
      corePoints = [
        {
          heading: '1. Masukan Bahan Fotosintesis',
          description:
            'Klorofil daun menyerap energi foton cahaya matahari, sementara stomata menyerap karbon dioksida (CO₂) dari udara dan akar menyerap air (H₂O) dari dalam tanah.',
          detailOrExample: 'Fakta: Tanpa klorofil dan cahaya matahari, reaksi biokimia fotosintesis tidak dapat berlangsung.'
        },
        {
          heading: '2. Proses Transformasi Energi di Kloroplas',
          description:
            'Terjadi reaksi terang (fotolisis air menghasilkan energi kimia dan gas oksigen) serta reaksi gelap (siklus Calvin mereduksi CO₂ menjadi glukosa).',
          detailOrExample: 'Kloroplas berperan sebagai pabrik mikroskopis penghasil makanan bagi produsen bumi.'
        },
        {
          heading: '3. Hasil Produk Fotosintesis',
          description:
            'Menghasilkan karbohidrat/glukosa (C₆H₁₂O₆) sebagai sumber energi pertumbuhan tanaman dan melepaskan gas oksigen (O₂) murni ke atmosfer.',
          detailOrExample:
            'Manfaat: Gas oksigen hasil fotosintesis menjadi napas kehidupan bagi manusia dan seluruh hewan di biosfer.'
        },
        {
          heading: '4. Faktor yang Mempengaruhi Kecepatan Reaksi',
          description:
            'Laju fotosintesis dipengaruhi oleh intensitas cahaya, ketersediaan air tanah, konsentrasi gas CO₂, dan suhu lingkungan yang optimal.',
          detailOrExample:
            'Pengamatan: Gelembung udara pada tanaman air Hydrilla bertambah cepat saat diletakkan di tempat terang.'
        }
      ];
      concreteExample = `Eksperimen Sederhana: Meletakkan tanaman Hydrilla verticillata di bawah corong kaca terkena sinar matahari akan memperlihatkan butir-butir gelembung oksigen naik ke tabung reaksi.`;
      interactiveElement = `Pertanyaan Investigasi: Menurutmu, apa yang akan terjadi pada kadar oksigen bumi jika tutupan hutan hujan tropis berkurang drastis? Diskusikan solusi pelestariannya!`;
      summaryTakeaway = `Fotosintesis adalah jembatan kehidupan teragung di bumi yang mengubah energi cahaya matahari menjadi energi kimia penyangga seluruh rantai makanan.`;
    } else if (topicLower.includes('gerak') || topicLower.includes('kecepatan') || subjectLower.includes('fisika')) {
      corePoints = [
        {
          heading: '1. Pengertian Gerak & Titik Acuan',
          description:
            'Suatu benda dikatakan bergerak jika posisinya mengalami perubahan terhadap suatu titik acuan tertentu seiring berjalannya waktu.',
          detailOrExample: 'Konsep: Gerak bersifat relatif tergantung titik pengamatan yang dipilih.'
        },
        {
          heading: '2. Jarak Tempuh vs Perpindahan',
          description:
            'Jarak adalah panjang lintasan total yang dilalui benda (besaran skalar), sedangkan perpindahan adalah perubahan posisi dari titik awal ke titik akhir (besaran vektor).',
          detailOrExample: 'Satuan Standar Internasional (SI) untuk panjang dan posisi adalah meter (m).'
        },
        {
          heading: '3. Hubungan Kecepatan, Jarak, dan Waktu',
          description:
            'Pada Gerak Lurus Beraturan (GLB), kecepatan benda bernilai konstan tanpa adanya percepatan. Hubungan dirumuskan dengan v = s / t.',
          detailOrExample: 'Satuan: Kecepatan dinyatakan dalam meter per sekon (m/s) atau kilometer per jam (km/jam).'
        },
        {
          heading: '4. Analisis Grafik GLB (Jarak terhadap Waktu)',
          description:
            'Grafik hubungan jarak (s) terhadap waktu (t) membentuk garis lurus miring ke atas dengan gradien kemiringan yang mencerminkan nilai kecepatan benda.',
          detailOrExample: 'Semakin curam garis grafik, semakin besar kelajuan benda bergerak.'
        }
      ];
      concreteExample = `Penerapan Kehidupan Sehari-hari: Kereta api cepat yang melaju konstan di lintasan lurus bebas hambatan menempuh jarak 300 meter setiap 10 sekon (kecepatan tetap 30 m/s).`;
      interactiveElement = `Aktivitas Mandiri: Gunakan stopwatch dan meteran untuk mengukur waktu lari temanmu sejauh 20 meter, lalu hitung berapa kecepatan rata-ratanya!`;
      summaryTakeaway = `Memahami konsep gerak dan hukum fisika membantu manusia merancang teknologi transportasi yang aman, efisien, dan presisi.`;
    } else {
      corePoints = [
        {
          heading: '1. Konsep Dasar & Pengamatan Gejala Alam',
          description: `Mengidentifikasi fenomena penting materi ${config.topic} melalui pengamatan indrawi dan fakta ilmiah yang dapat dibuktikan secara empiris.`,
          detailOrExample: 'Karakteristik sains: Berlandaskan bukti nyata, terukur, dan logis.'
        },
        {
          heading: '2. Mekanisme & Alur Kerja Proses Sains',
          description:
            'Menganalisis bagaimana setiap komponen saling berinteraksi, bertukar materi/energi, dan menjaga keseimbangan sistem alami.',
          detailOrExample: 'Interaksi yang harmonis menjamin kelangsungan fungsi sistem secara berkelanjutan.'
        },
        {
          heading: '3. Data, Pengukuran & Bukti Eksperimental',
          description:
            'Mengumpulkan data hasil pengamatan, mengelompokkan variabel, dan menyajikan hasil penyelidikan dalam bentuk visual informatif.',
          detailOrExample: 'Gunakan alat ukur dan satuan internasional yang konsisten.'
        },
        {
          heading: '4. Dampak & Hubungan dengan Lingkungan Sekitar',
          description:
            'Menghubungkan prinsip sains yang dipelajari dengan kelestarian alam, kesehatan manusia, serta kemajuan teknologi ramah lingkungan.',
          detailOrExample: 'Pemanfaatan sains yang bijak membawa kesejahteraan bagi masyarakat luas.'
        }
      ];
      concreteExample = `Contoh Pembelajaran: Mengamati fenomena lingkungan sekitar sekolah dan mencatat perubahan parameter secara berkala di lembar observasi.`;
      interactiveElement = `Uji Pemahaman: Analisis hubungan sebab-akibat apa yang terjadi pada topik ini dan bagaimana kamu dapat menerapkannya dalam keseharian?`;
      summaryTakeaway = `Sains membuka tabir misteri alam semesta melalui rasa ingin tahu, pengamatan teliti, dan kejujuran ilmiah.`;
    }
  }
  // DOMAIN 3: MATEMATIKA
  else if (
    subjectLower.includes('matematika') ||
    subjectLower.includes('aljabar') ||
    subjectLower.includes('geometri') ||
    topicLower.includes('persamaan') ||
    topicLower.includes('pecahan')
  ) {
    corePoints = [
      {
        heading: '1. Pemahaman Definisi & Notasi Simbolik',
        description: `Mengenali simbol, variabel, koefisien, dan konstanta pada materi ${config.topic} sebagai bahasa universal pemodelan logika.`,
        detailOrExample:
          'Simbol matematika berfungsi mempermudah penulisan masalah panjang menjadi bentuk persamaan yang ringkas.'
      },
      {
        heading: '2. Prinsip Keseimbangan & Aturan Operasi',
        description:
          'Menerapkan operasi hitung yang adil pada kedua ruas persamaan atau menerapkan rumus bangun ruang secara konsisten dan sistematis.',
        detailOrExample:
          'Prinsip keadilan: Perlakuan operasi hitung pada ruas kiri harus sama persis dengan ruas kanan.'
      },
      {
        heading: '3. Langkah Penyelesaian Bertahap (Algoritmik)',
        description:
          'Menyelesaikan permasalahan langkah demi langkah: menyederhanakan suku sejenis, mengisolasi variabel, hingga menemukan nilai penyelesaian tunggal.',
        detailOrExample: 'Setiap baris perhitungan dituliskan berurutan ke bawah secara rapi.'
      },
      {
        heading: '4. Pembuktian & Verifikasi Hasil',
        description:
          'Mensubstitusikan kembali nilai penyelesaian yang diperoleh ke dalam persamaan awal untuk memastikan kebenaran mutlak.',
        detailOrExample: 'Jika kedua ruas bernilai identik (sama), maka solusi terbukti benar.'
      }
    ];
    concreteExample = `Aplikasi Nyata: Menghitung anggaran belanja kebutuhan sekolah di koperasi dengan menyusun model persamaan linear sederhana untuk menentukan harga satuan barang.`;
    interactiveElement = `Tantangan Berhitung: Cobalah selesaikan soal latihan ini dengan langkah terstruktur, lalu buktikan apakah ruas kiri sama dengan ruas kanan!`;
    summaryTakeaway = `Matematika melatih ketelitian, ketajaman logika berpikir, dan kemampuan memecahkan masalah kompleks secara sistematis.`;
  }
  // DOMAIN 4: BAHASA INDONESIA / BAHASA INGGRIS (Teks Prosedur, Narasi, dsb.)
  else if (
    subjectLower.includes('bahasa') ||
    topicLower.includes('teks') ||
    topicLower.includes('prosedur') ||
    topicLower.includes('puisi') ||
    topicLower.includes('cerpen')
  ) {
    corePoints = [
      {
        heading: '1. Tujuan & Fungsi Sosial Teks',
        description: `Memberikan petunjuk atau gambaran utuh tentang materi ${config.topic} agar pembaca dapat memahami atau melakukan sesuatu secara runtut dan berhasil.`,
        detailOrExample: 'Fungsi: Memandu pembaca mencapai hasil yang tepat tanpa kebingungan.'
      },
      {
        heading: '2. Struktur Runtut Pembentuk Teks',
        description:
          'Memuat bagian pembuka/tujuan, daftar bahan atau perlengkapan yang dibutuhkan, serta urutan langkah kerja yang logis dari awal hingga selesai.',
        detailOrExample: 'Setiap langkah diawali dengan nomor urut atau penanda tahapan yang tegas.'
      },
      {
        heading: '3. Kaidah Kebahasaan & Pilihan Kata (Diksi)',
        description:
          'Menggunakan kalimat perintah yang santun (verba imperatif), kata hubung urutan waktu (konjungsi temporal seperti pertama, kemudian, lalu), dan petunjuk ukuran yang jelas.',
        detailOrExample: 'Contoh verba: Siapkan, campurkan, periksa, pastikan, amati.'
      },
      {
        heading: '4. Kiat Praktis & Catatan Keselamatan/Keberhasilan',
        description:
          'Menyertakan tips pendukung, saran pencegahan kesalahan, dan rekomendasi agar hasil yang diperoleh pembaca optimal.',
        detailOrExample: 'Sertakan tanda pengingat penting atau peringatan khusus jika diperlukan.'
      }
    ];
    concreteExample = `Contoh Teks Otentik: Panduan langkah-langkah membuat pupuk kompos organik dari limbah daun kering di lingkungan sekolah yang ditulis secara jelas, runtut, dan komunikatif.`;
    interactiveElement = `Aktivitas Literasi: Tuliskan kembali satu resep atau panduan favoritmu menggunakan 3 kata kerja perintah dan 3 kata hubung urutan waktu yang baku!`;
    summaryTakeaway = `Kemahiran berbahasa yang terstruktur mencerminkan keteraturan berpikir dan memudahkan kita berbagi ilmu bermanfaat kepada sesama.`;
  }
  // DOMAIN 5: IPS / EKONOMI / SEJARAH / PPKN
  else if (
    subjectLower.includes('ekonomi') ||
    subjectLower.includes('ips') ||
    subjectLower.includes('sejarah') ||
    subjectLower.includes('ppkn') ||
    topicLower.includes('kebutuhan') ||
    topicLower.includes('kelangkaan')
  ) {
    corePoints = [
      {
        heading: '1. Hakikat Konsep & Latar Belakang Nyata',
        description: `Memahami kondisi dasar seputar ${config.topic}, seperti keterbatasan sumber daya manusia berhadapan dengan kebutuhan hidup yang beragam.`,
        detailOrExample: 'Kelangkaan terjadi saat kebutuhan tidak terbatas sedangkan alat pemuasnya terbatas.'
      },
      {
        heading: '2. Klasifikasi & Skala Prioritas Rasional',
        description:
          'Membedakan kebutuhan primer (mutlak untuk bertahan hidup), sekunder (pelengkap kenyamanan), dan tersier (penunjang prestise/kemewahan).',
        detailOrExample: 'Menyusun daftar prioritas membantu individu membuat keputusan konsumsi yang bijak.'
      },
      {
        heading: '3. Faktor Penentu & Dampak Keputusan',
        description:
          'Menganalisis faktor pendapatan, lingkungan sosial, nilai moral, dan masa depan yang memengaruhi setiap pilihan yang diambil.',
        detailOrExample: 'Pilihan yang bijak mengutamakan manfaat jangka panjang daripada kesenangan sesaat.'
      },
      {
        heading: '4. Nilai Karakter, Integritas & Kepedulian Sosial',
        description:
          'Menumbuhkan sikap hidup hemat, bersyukur, gemar menabung, serta berempati terhadap sesama yang membutuhkan.',
        detailOrExample: 'Membiasakan menyisihkan sebagian uang saku untuk tabungan masa depan dan aksi sosial.'
      }
    ];
    concreteExample = `Studi Kasus Pelajar: Siswa menyusun anggaran uang saku mingguan dengan memprioritaskan biaya transportasi dan alat tulis sebelum membeli jajanan santai.`;
    interactiveElement = `Refleksi Diri: Tuliskan 3 hal yang baru saja kamu beli minggu ini. Manakah yang tergolong kebutuhan mendesak dan manakah yang sekadar keinginan?`;
    summaryTakeaway = `Kecerdasan finansial dan kepekaan sosial dimulai dari kemampuan membedakan antara kebutuhan hakiki dan keinginan sesaat secara bijaksana.`;
  }
  // DOMAIN DEFAULT: ADAPTIF UMUM
  else {
    corePoints = [
      {
        heading: `1. Fondasi & Konsep Inti ${config.topic || config.subject}`,
        description: `Mengenalkan pengertian esensial materi ${config.topic || config.subject} secara ringkas, jelas, dan relevan dengan pengalaman belajar peserta didik.`,
        detailOrExample: 'Konsep dasar yang kokoh memudahkan pemahaman materi pada tahap selanjutnya.'
      },
      {
        heading: '2. Komponen Kunci & Karakteristik Utama',
        description:
          'Mengurai unsur-unsur pembentuk, sifat karakteristik, dan relasi antarelemen materi ke dalam poin-poin yang mudah diingat.',
        detailOrExample: 'Visualisasi pendukung membantu daya ingat visual siswa bekerja optimal.'
      },
      {
        heading: '3. Penerapan Kontekstual di Dunia Nyata',
        description:
          'Menunjukkan bagaimana materi ini digunakan dalam kehidupan sehari-hari, masyarakat, dan perkembangan ilmu pengetahuan modern.',
        detailOrExample: 'Menghubungkan teori buku dengan realitas kehidupan konkret.'
      },
      {
        heading: '4. Refleksi & Pembiasaan Karakter Positif',
        description:
          'Menarik nilai-nilai budi pekerti, etika, dan kebiasaan positif yang dapat dipraktikkan langsung oleh siswa di sekolah dan rumah.',
        detailOrExample: 'Menumbuhkan Profil Pelajar yang bernalar kritis, mandiri, dan berakhlak mulia.'
      }
    ];
    concreteExample = `Aplikasi Konkret: Menerapkan pemahaman materi ${config.topic || config.subject} dalam diskusi kelompok kolaboratif di kelas dan pembuatan karya sederhana.`;
    interactiveElement = `Mari Berdiskusi: Bagaimana kamu dapat memanfaatkan konsep ${config.topic || 'materi ini'} untuk memecahkan persoalan yang ada di sekitarmu?`;
    summaryTakeaway = `Belajar bermakna adalah ketika ilmu yang kita peroleh mampu memperluas wawasan dan memberi manfaat nyata bagi sesama.`;
  }

  // 4. Character Visual Guidance based on teacher's dropdown choice
  const visualCharactersGuidance = buildCharacterGuidance(
    characterChoice,
    gradeCtx,
    config.designStyle,
    config.illustrationStyle
  );

  // Helper description of character in layout
  const characterLayoutSnippet = (() => {
    switch (characterChoice) {
      case 'Karakter Muslimah Berhijab':
        return 'menampilkan karakter guru perempuan berhijab rapi dan siswa-siswi (siswi berhijab sopan sesuai jenjang)';
      case 'Karakter Umum (Tanpa Ketentuan Hijab)':
        return 'menampilkan karakter guru dan siswa-siswi berbusana sekolah/pendidikan yang rapi dan santun tanpa kewajiban hijab';
      case 'Karakter Tanpa Manusia':
        return 'murni menampilkan objek materi, diagram skematis, alat peraga, dan simbol visual ilmiah (tanpa figur manusia)';
      case 'Karakter Bebas Sesuai Materi':
      default:
        return 'menampilkan karakter atau visualisasi adaptif (manusia sopan, maskot edukatif, hewan, atau objek) yang paling relevan dengan materi';
    }
  })();

  // 5. Layout Blueprint based on media type & character choice
  let layoutBlueprint = '';
  switch (config.mediaType) {
    case 'poster':
      layoutBlueprint = `
- Tata Letak Poster Edukasi:
  1. Area Atas (Header 25%): Judul utama berukuran besar, berani, sangat mudah dibaca dari kejauhan, didampingi subjudul motivatif.
  2. Area Tengah (Visual & Konsep 55%): Ilustrasi sentral memikat yang ${characterLayoutSnippet} seputar konsep "${config.topic}". Disekeliling visual terdapat 3-4 kartu sorotan materi penting yang ringkas dan padat.
  3. Area Bawah (Call-to-Action & Footer 20%): Banner ajakan aksi edukatif yang inspiratif, identitas "${config.authorOrSchool || 'Sekolah'}", dan catatan motivasi belajar.`;
      break;

    case 'infografis':
      layoutBlueprint = `
- Tata Letak Infografis Pembelajaran Terstruktur:
  1. Header Infografis: Judul topik dengan tipografi kuat dan ikon representatif bidang ${config.subject}.
  2. Alur / Diagram Konsep (4-5 Langkah): Blok informasi bernomor urut atau diagram alur proses yang memuat penjelasan setiap tahap materi secara hierarkis.
  3. Komparasi / Fakta Kunci: Kartu visual berisi contoh konkret, data/grafik relasi, atau analogi pemahaman.
  4. Ilustrasi Pendukung: Visual pendukung yang ${characterLayoutSnippet} dalam mengamati atau menjelaskan bagan infografis dengan antusias.
  5. Footer & Sumber Rujukan: Ringkasan simpulan penting dan rujukan bahan belajar Kurikulum Merdeka.`;
      break;

    case 'lkpd':
      layoutBlueprint = `
- Tata Letak Lembar Kerja Peserta Didik (LKPD):
  1. Kop Formal Dokumen: Header LKPD resmi memuat Nama Sekolah, Mata Pelajaran (${config.subject}), Fase/Kelas (${config.gradeLevel}), serta kolom isian identitas siswa (Nama Kelompok/Siswa, Kelas, Tanggal).
  2. Bagian A - Pengantar & Tujuan: Ringkasan apersepsi dan tujuan penyelidikan materi.
  3. Bagian B - Alat, Bahan & Langkah Kerja: Instruksi bernomor praktis yang jelas dan mudah diikuti siswa.
  4. Bagian C - Lembar Aktivitas & Soal Penyelidikan: Sediakan 3-4 pertanyaan terstruktur dengan kotak/tabel isian jawaban yang lapang dan siap ditulis tangan oleh siswa.
  5. Bagian D - Refleksi Mandiri & Rubrik: Format penilaian diri dan umpan balik guru.`;
      break;

    case 'sampul':
      layoutBlueprint = `
- Tata Letak Sampul Buku / Modul Ajar:
  1. Komposisi Sepertiga Atas: Label jenjang ("${config.gradeLevel}"), mata pelajaran ("${config.subject}"), dan Judul Modul utama yang tampil megah, elegan, dan profesional.
  2. Sepertiga Tengah: Ilustrasi utama berkualitas tinggi beresolusi tajam yang mencerminkan materi "${config.topic}", ${characterLayoutSnippet}.
  3. Sepertiga Bawah: Garis ornamen penunjang, nama penyusun ("${config.authorOrSchool || 'Pendidik Kreatif'}"), identitas satuan pendidikan, dan tahun ajar.`;
      break;

    case 'presentasi':
      layoutBlueprint = `
- Tata Letak Slide Deck Presentasi Kelas (Layar Lebar 16:9):
  1. Slide 1 (Cover Slide): Judul presentasi memikat, nama penyusun, dan ilustrasi pembuka materi.
  2. Slide 2 (Konsep Dasar & Pemantik): Pengantar konsep inti dengan diagram analogi sederhana dan pertanyaan pemantik rasa ingin tahu.
  3. Slide 3 (Pembahasan Mendalam & Contoh): 3 poin kunci yang dipadukan dengan visualisasi contoh nyata di dunia sehari-hari.
  4. Slide 4 (Aktivitas Kolaborasi Siswa): Panduan tugas diskusi kelompok dengan visual yang ${characterLayoutSnippet}.
  5. Slide 5 (Rangkuman & Refleksi): Kesimpulan besar, kutipan inspiratif, dan sesi tanya jawab penutup.`;
      break;

    case 'ilustrasi':
      layoutBlueprint = `
- Tata Letak Ilustrasi Konsep & Diagram Analogi:
  1. Objek Sentral Utama: Visualisasi mendalam mengenai fenomena/konsep "${config.topic}" yang diletakkan di titik fokal gambar.
  2. Garis Penunjuk Callout: Keterangan bagian-bagian elemen kunci yang diberi label teks bersih, font modern, dan garis penunjuk rapi.
  3. Figur / Elemen Interaktif: Ilustrasi yang ${characterLayoutSnippet} sedang mendemonstrasikan atau mengamati alur kerja konsep.
  4. Kartu Legenda / Keterangan: Kotak ringkas di sudut bawah yang menjelaskan makna simbol, warna, dan cara kerja konsep.`;
      break;

    case 'komik':
    default:
      layoutBlueprint = `
- Tata Letak Komik Edukasi (Comic Strip 4-6 Panel Terstruktur):
  1. Panel 1 (Pengenalan Situasi): Di ruang kelas yang nyaman, Guru menyapa siswa dan mengajukan pertanyaan pemantik seputar "${config.topic}" (${characterLayoutSnippet}).
  2. Panel 2 (Miskonsepsi & Rasa Ingin Tahu): Tokoh siswa berdiskusi dengan raut wajah penasaran dan mengemukakan dugaan awal.
  3. Panel 3 (Eksplorasi & Percobaan): Guru memperlihatkan contoh konkret atau alat peraga materi; siswa menemukan fakta menarik secara langsung.
  4. Panel 4 (Penemuan Konsep & Solusi): Siswa tersenyum gembira karena memahami konsep materi dan menjelaskannya dengan antusias.
  5. Panel 5/6 (Refleksi & Pesan Moral): Seluruh tokoh tersenyum bersama, menampilkan kesimpulan materi yang bermanfaat bagi kehidupan mereka sehari-hari.
  * Balon Kata & Efek Suara: Teks dialog bersih, ukuran mudah dibaca, balon ucapan rapi, dan ekspresi karakter yang hidup.`;
      break;
  }

  // 6. School Logo Integration Guidance
  let logoIntegrationGuidance = '';
  if (config.schoolLogo) {
    logoIntegrationGuidance = `
==================================================
PANDUAN PENGGUNAAN LOGO SEKOLAH (REFERENSI GAMBAR TERLAMPIR)
==================================================
Guru telah mengunggah file logo resmi sekolah/institusi: "${config.schoolLogo.fileName}".
Instruksi Penggunaan Logo Resmi Sekolah:
1. Gunakan file logo terlampir sebagai referensi visual mutlak untuk logo sekolah pada media ini.
2. PERTAHANKAN bentuk, warna, simbol, lambang, tipografi tulisan, dan rasio proporsi logo asli secara 100% presisi.
3. DILARANG KERAS menggambar ulang, mengubah bentuk, memodifikasi palet warna, atau membuat logo sekolah versi baru/fiktif.
4. DILARANG menambahkan logo lain atau logo sembarangan sebagai pengganti.
5. Tempatkan logo sekolah secara proporsional dan elegan pada area identitas (misalnya di sudut kiri atas / kanan atas header media atau berdampingan dengan identitas nama sekolah).
6. Pastikan posisi logo tidak menutupi judul materi, teks penjelasan, ilustrasi sentral, atau informasi penting lainnya.
7. Pastikan logo tampil jernih, tajam, utuh, tidak terdistorsi (tidak gepeng/tertarik), dan tidak terpotong tepi bidang.`.trim();
  } else {
    logoIntegrationGuidance = `
- Logo Sekolah: Tidak ada logo yang diunggah oleh pengguna. JANGAN membuat logo fiktif, JANGAN menyisipkan placeholder logo kosong, dan JANGAN menambahkan logo institusi secara otomatis. Cukup tampilkan teks identitas sekolah/lembaga secara elegan jika tersedia.`.trim();
  }

  return {
    headline,
    subheadline,
    conceptualIntro,
    corePoints,
    concreteExample,
    interactiveElement,
    summaryTakeaway,
    visualCharactersGuidance,
    layoutBlueprint,
    logoIntegrationGuidance
  };
};

/**
 * Builds the complete ChatGPT design prompt automatically based on user inputs,
 * intelligent auto-generated content, selected character rules, and uploaded logo reference.
 */
export const buildCompleteChatGPTMediaPrompt = (config: MediaGeneratorConfig): string => {
  const content = generateAutoMediaContent(config);

  const mediaNameMap: Record<MediaType, string> = {
    poster: 'POSTER EDUKASI VISUAL',
    infografis: 'INFOGRAFIS PEMBELAJARAN TERSTRUKTUR',
    lkpd: 'LEMBAR KERJA PESERTA DIDIK (LKPD) KREATIF',
    sampul: 'SAMPUL BUKU / MODUL AJAR RESMI',
    presentasi: 'SLIDE / DECK PRESENTASI KELAS INTERAKTIF',
    ilustrasi: 'ILUSTRASI KONSEP EDUKASI & ANALOGI VISUAL',
    komik: 'KOMIK PEMBELAJARAN EDUKATIF (COMIC STRIP)'
  };

  const ratioMap = {
    potret: 'Potret (Vertikal)',
    lanskap: 'Lanskap (Horizontal - Layar Lebar)'
  };

  // Check if user specifically mentioned octopus
  const combinedText = `
    ${config.title || ''}
    ${config.topic || ''}
    ${config.learningGoal || ''}
    ${config.authorOrSchool || ''}
    ${config.posterSubtitle || ''}
  `.toLowerCase();
  const isOctopusExplicitlyRequested = combinedText.includes('gurita') || combinedText.includes('octopus');

  const subjectAnalysis = classifySubject(
    config.subject || '',
    config.title || '',
    config.topic || '',
    config.learningGoal || ''
  );

  return `Bertindaklah sebagai Senior Graphic Designer, Art Director, dan Ahli Desain Media Pembelajaran Profesional.

Saya ingin Anda merancang media pembelajaran berkualitas tinggi yang sepenuhnya mengikuti spesifikasi kurikulum, konten materi yang telah disusun otomatis, panduan gaya visual, pilihan karakter pendidik/siswa, dan referensi logo sekolah di bawah ini.

==================================================
1. IDENTITAS & SPESIFIKASI MEDIA
==================================================
- Jenis Media: ${mediaNameMap[config.mediaType] || 'MEDIA PEMBELAJARAN'}
- Judul Media: "${content.headline}"
- Subjudul / Tagline: "${content.subheadline}"
- Mata Pelajaran: ${config.subject || 'Pembelajaran Terpadu'}
- Sasaran / Jenjang: ${config.gradeLevel || 'Lintas Jenjang'}
- Topik / Materi Pembelajaran: ${config.topic || 'Materi Pokok'}
- Lembaga / Penyusun: ${config.authorOrSchool || 'Tim Pendidik Inspiratif'}
- Format & Ukuran: ${config.pageSize} (${ratioMap[config.orientation] || 'Potret'})

==================================================
2. ATURAN PANDUAN KARAKTER VISUAL (${(config.characterChoice || 'Karakter Muslimah Berhijab').toUpperCase()})
==================================================
${content.visualCharactersGuidance}

${
  config.schoolLogo
    ? `${content.logoIntegrationGuidance}\n`
    : ''
}==================================================
3. KONTEN & STRUKTUR MATERI (DISUSUN OTOMATIS)
==================================================
Judul: ${content.headline}
Subjudul: ${content.subheadline}

Pengantar Konsep:
${content.conceptualIntro}

Poin-Poin Materi Utama:
${content.corePoints
  .map(
    (cp, idx) => `[${idx + 1}] ${cp.heading}
   - Penjelasan: ${cp.description}
   ${cp.detailOrExample ? `- Contoh / Penerapan: ${cp.detailOrExample}` : ''}`
  )
  .join('\n\n')}

Contoh Konkret / Kontekstual Sesuai Usia Siswa:
${content.concreteExample}

Aktivitas / Pertanyaan Interaktif:
${content.interactiveElement}

Kesimpulan / Rangkuman Kunci:
${content.summaryTakeaway}

==================================================
4. PANDUAN GAYA VISUAL, WARNA & TATA LETAK
==================================================
- Gaya Desain yang Dipilih:
  ${config.designStyle} (Tampilan bersih, modern, profesional, dan nyaman untuk pembelajaran peserta didik).

- Gaya Ilustrasi:
  ${config.illustrationStyle}

- Palet Warna yang Dipilih:
  ${config.colorTheme} (Pencahayaan seimbang, kontras tinggi yang ramah mata pembaca, dan warna teks terbaca jelas di atas latar belakang).

- Tata Letak & Komposisi Media:
${content.layoutBlueprint}

- Tipografi & Keterbacaan Visual:
  * Gaya Huruf: ${config.typography || 'Modern Sans-Serif Edukatif'}
  * Judul: Menonjol, tebal, proporsional, dan terbaca tegas.
  * Teks Materi: Terstruktur dengan penomoran yang rapi, spasi antarbaris longgar, dan bebas dari kalimat yang bertumpuk.

${
  !config.schoolLogo
    ? `${content.logoIntegrationGuidance}\n`
    : ''
}- Identitas Visual & Anti-Mascot GURITA:
  ${
    isOctopusExplicitlyRequested
      ? 'Sertakan karakter/maskot gurita edukasi yang ramah dan inspiratif sesuai permintaan spesifik pengguna.'
      : `Fokuskan ilustrasi dan aset visual murni pada konteks materi "${config.topic}". PENTING: JANGAN menambahkan maskot gurita, karakter hewan kartun fiktif, atau logo website yang tidak diminta pengguna.`
  }

${(() => {
  if (subjectAnalysis.isQuantitative) {
    return `==================================================
5. AKURASI MATA PELAJARAN KHUSUS (${subjectAnalysis.domainNameId.toUpperCase()})
==================================================
- Ketepatan Rumus & Notasi:
  * Wajib menuliskan simbol ilmiah, rumus, dan satuan internasional (SI) secara 100% akurat.
${subjectAnalysis.coreFormulas ? subjectAnalysis.coreFormulas.map((f) => `  * Rumus Acuan: ${f.name} -> ${f.textFallback}`).join('\n') : ''}
- Kejelasan Visual Angka:
  * Seluruh angka, eksponen, subskrip, dan grafik koordinat harus terbaca tajam dan tidak mengarang data fiktif.`;
  }

  if (subjectAnalysis.domain === 'HUMANITIES_ARTS_LANGUAGE') {
    return `==================================================
5. PANDUAN TIPOGRAFI & EKSPLORASI ESTETIKA KHUSUS (${subjectAnalysis.domainNameId.toUpperCase()})
==================================================
- Pendekatan Non-Numerik:
  * Materi ini berfokus pada kekuatan komunikasi visual, pesan estetika, dan ekspresi kreatif. JANGAN memaksakan rumus atau angka hitungan buatan yang tidak relevan.
- Anatomi Tipografi & Komposisi:
  * Terapkan prinsip hierarki visual, kontras warna, legibilitas, dan ruang kosong (negative space) untuk menonjolkan pesan utama secara elegan.`;
  }

  return '';
})()}

==================================================
6. INSTRUKSI EKSEKUSI UNTUK CHATGPT
==================================================
1. JIKA ANDA MEMILIKI FITUR PEMBUATAN GAMBAR (DALL-E / IMAGE GENERATION TOOL):
   Hasilkan gambar desain utama sekarang juga sesuai rasio ${config.pageSize} (${ratioMap[config.orientation] || 'Potret'}), memadukan gaya visual "${config.designStyle}" dengan palet warna "${config.colorTheme}", dengan komposisi seimbang antara teks materi di atas dan ilustrasi pendukung.
${
  config.schoolLogo
    ? `   * PENTING: Gunakan gambar logo sekolah terlampir sebagai referensi visual asli tanpa modifikasi bentuk atau warna, letakkan di sudut atas/identitas sekolah secara proporsional.\n`
    : ''
}   * PENTING: Terapkan aturan karakter "${config.characterChoice}" secara konsisten.

2. JIKA ANDA MEMBERIKAN PANDUAN BLUEPRINT / WIREFRAME DESAIN:
   - Berikan susunan tata letak dari atas ke bawah secara terperinci.
   - Cantumkan penempatan teks materi otomatis di atas pada kotak/kartu informasi yang sesuai.
${
  config.schoolLogo
    ? `   - Tempatkan logo sekolah terlampir ("${config.schoolLogo.fileName}") pada posisi header/sudut atas yang proporsional tanpa terdistorsi.\n`
    : ''
}   - Sertakan rekomendasi palet warna HEX dan tip penataan pada aplikasi desain grafis (seperti Canva, Figma, atau Corel).
   - Pastikan seluruh bahasa Indonesia yang digunakan baku, komunikatif, dan mendidik.`.trim();
};
