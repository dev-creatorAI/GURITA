export interface SlideItem {
  id: number;
  slideNumber: number;
  title: string;
  subtitle?: string;
  category: string;
  keyIdea: string;
  points?: string[];
  cards?: {
    title: string;
    description: string;
    icon?: string;
    tag?: string;
  }[];
  diagram?: {
    steps: {
      number: string;
      title: string;
      desc: string;
      isHuman?: boolean;
    }[];
    note?: string;
  };
  comparison?: {
    titleLeft: string;
    itemsLeft: string[];
    titleRight: string;
    itemsRight: string[];
  };
  quote?: {
    text: string;
    author: string;
  };
  accentColor: string; // 'cyan' | 'blue' | 'purple' | 'yellow'
}

export interface PresentationDeck {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  totalSlides: number;
  estimatedTime: string;
  iconName: string;
  accent: string;
  slides: SlideItem[];
}

export const PRESENTATION_DECKS: PresentationDeck[] = [
  {
    id: 'materi-1',
    title: 'Mengenal Artificial Intelligence',
    subtitle: 'Memahami, Memanfaatkan, dan Menggunakan AI secara Bertanggung Jawab',
    description: 'Panduan fundamental kecerdasan artifisial bagi guru dan pendidik di semua jenjang (PAUD/TK, SD, SMP, SMA, SMK, dan Pendidikan Khusus): prinsip kerja, ragam penerapan, peluang, risiko halusinasi, verifikasi 5 langkah, dan etika profesi.',
    totalSlides: 19,
    estimatedTime: '25 Menit',
    iconName: 'Compass',
    accent: 'cyan',
    slides: [
      {
        id: 1,
        slideNumber: 1,
        title: 'Mengenal Artificial Intelligence (AI)',
        subtitle: 'Memahami, Memanfaatkan, dan Menggunakan AI secara Bertanggung Jawab',
        category: 'Sampul Presentasi',
        keyIdea: 'AI adalah mitra cerdas untuk memperkaya daya kreasi pendidik, bukan pengganti peran luhur guru.',
        cards: [
          {
            title: 'Kreatif',
            description: 'Melahirkan ide media & skenario pembelajaran aktif lintas jenjang.',
            tag: 'Pilar 1'
          },
          {
            title: 'Adaptif',
            description: 'Menjawab keberagaman kebutuhan peserta didik di era digital.',
            tag: 'Pilar 2'
          },
          {
            title: 'Bertanggung Jawab',
            description: 'Menegakkan etika, privasi, dan validasi kebenaran fakta.',
            tag: 'Pilar 3'
          }
        ],
        accentColor: 'cyan'
      },
      {
        id: 2,
        slideNumber: 2,
        title: 'Tujuan Pembelajaran Sesi Ini',
        subtitle: 'Kompetensi Literasi AI untuk Guru di Semua Jenjang Pendidikan',
        category: 'Tujuan Belajar',
        keyIdea: 'Guru memiliki pemahaman konseptual, kepekaan kritis, dan kecakapan praktis dalam mengadopsi AI di lingkungan satuan pendidikan.',
        points: [
          'Memahami konsep dasar AI dan perbedaannya dengan sistem komputer konvensional.',
          'Mengenali aneka penerapan AI dalam administrasi, materi ajar, dan asesmen di berbagai jenjang.',
          'Mengetahui keterbatasan alami AI (halusinasi, bias data, dan kesalahan konteks).',
          'Mampu memverifikasi keakuratan informasi sebelum disajikan kepada peserta didik.',
          'Menerapkan etika integritas akademik, perlindungan data pribadi, dan hak cipta.'
        ],
        accentColor: 'blue'
      },
      {
        id: 3,
        slideNumber: 3,
        title: 'Apa Itu Artificial Intelligence?',
        subtitle: 'Definisi Sederhana & Dekat dengan Keseharian',
        category: 'Konsep Dasar',
        keyIdea: 'AI adalah bidang ilmu komputer yang merancang sistem agar mampu meniru kemampuan kognitif manusia seperti mengenali pola, memecahkan masalah, dan belajar dari pengalaman.',
        cards: [
          {
            title: 'Analogi Sederhana',
            description: 'AI ibarat asisten magang yang telah membaca jutaan buku: sangat terampil menyusun kata dan pola, namun tidak memiliki kesadaran emosional dan penalaran moral.',
            tag: 'Analogi'
          },
          {
            title: 'Inti Kemampuan',
            description: 'Bukan "berpikir" seperti otak biologis, melainkan mengenali keteraturan data statistik dalam skala raksasa dengan kecepatan luar biasa.',
            tag: 'Mekanisme'
          }
        ],
        accentColor: 'purple'
      },
      {
        id: 4,
        slideNumber: 4,
        title: 'AI di Sekitar Kita',
        subtitle: 'Teknologi yang Tanpa Disadari Telah Kita Gunakan',
        category: 'Penerapan Sehari-hari',
        keyIdea: 'AI telah lama terintegrasi dalam gawai dan aplikasi yang mendampingi aktivitas harian kita.',
        cards: [
          {
            title: 'Mesin Pencari Informasi',
            description: 'Pencarian Google memprediksi kata kunci dan menyaring artikel relevan.',
            tag: 'Search'
          },
          {
            title: 'Rekomendasi Video',
            description: 'Algoritma YouTube & TikTok mempersonalisasi konten sesuai minat tontonan.',
            tag: 'Streaming'
          },
          {
            title: 'Penerjemah Bahasa',
            description: 'Google Translate memahami tata bahasa konteks antarbangsa secara instan.',
            tag: 'Bahasa'
          },
          {
            title: 'Asisten Virtual & Keyboard',
            description: 'Siri, Google Assistant, dan fitur predictive text di smartphone.',
            tag: 'Harian'
          },
          {
            title: 'Pengenalan Wajah & Objek',
            description: 'Face unlock kamera ponsel dan Google Lens untuk mengenali tanaman/buku.',
            tag: 'Vision'
          },
          {
            title: 'Pembuatan Konten Otomatis',
            description: 'Generator teks, ilustrasi grafis, dan pembuat ringkasan otomatis.',
            tag: 'Generatif'
          }
        ],
        accentColor: 'yellow'
      },
      {
        id: 5,
        slideNumber: 5,
        title: 'Mengenal Jenis-Jenis AI',
        subtitle: 'Klasifikasi Sederhana Berdasarkan Fungsinya',
        category: 'Klasifikasi AI',
        keyIdea: 'Membedakan AI analitis tradisional dengan AI generatif modern membantu guru menentukan alat yang tepat.',
        cards: [
          {
            title: 'AI Prediktif & Klasifikasi',
            description: 'Menganalisis data lampau untuk mengelompokkan atau menebak tren. Contoh: filter spam email, deteksi presensi wajah murid, prediksi cuaca.',
            tag: 'AI Tradisional'
          },
          {
            title: 'Generative AI (AI Generatif)',
            description: 'Menciptakan karya atau konten baru yang belum pernah ada sebelumnya berdasarkan prompt. Contoh: teks modul ajar, poster, kuis, kode pemrograman.',
            tag: 'AI Generatif'
          },
          {
            title: 'AI Berbasis Aturan (Rule-Based)',
            description: 'Bekerja mengikuti alur logika baku IF-THEN yang telah diprogram manusia. Contoh: kalkulator otomatis dan sistem penentu kelulusan administrasi.',
            tag: 'Sistem Pakar'
          }
        ],
        accentColor: 'cyan'
      },
      {
        id: 6,
        slideNumber: 6,
        title: 'Bagaimana AI Bekerja?',
        subtitle: 'Alur Pemrosesan dari Masukan hingga Validasi Manusia',
        category: 'Arsitektur Kerja',
        keyIdea: 'AI memproses masukan melalui jaringan bobot matematis, tetapi keputusan akhir selalu berada di tangan guru.',
        diagram: {
          steps: [
            {
              number: '01',
              title: 'Masukan (Input/Prompt)',
              desc: 'Guru memberikan instruksi, konteks, materi ajar satuan pendidikan, batasan, dan format yang diinginkan.'
            },
            {
              number: '02',
              title: 'Pemrosesan Model AI',
              desc: 'Model AI memecah teks menjadi token, mencocokkan pola bahasa statistik, dan merangkai probabilitas kata.'
            },
            {
              number: '03',
              title: 'Keluaran (Output)',
              desc: 'Sistem menghasilkan draf teks, butir soal, ide permainan, atau kode tampilan.'
            },
            {
              number: '04',
              title: 'Pemeriksaan Guru (Human-in-the-Loop)',
              desc: 'Guru membaca kritis, memverifikasi fakta kurikulum, dan menyesuaikan dengan psikologi peserta didik.',
              isHuman: true
            }
          ],
          note: 'Catatan: Diagram ini merupakan gambaran fungsional pembelajaran mesin dan bukan satu-satunya arsitektur seluruh ragam AI.'
        },
        accentColor: 'blue'
      },
      {
        id: 7,
        slideNumber: 7,
        title: 'Apa Itu AI Generatif?',
        subtitle: 'Kekuatan Menciptakan Beragam Format Konten Baru',
        category: 'Generative AI',
        keyIdea: 'AI Generatif mampu mengombinasikan konsep-konsep pengetahuan menjadi wujud baru sesuai gaya dan nada yang diminta.',
        cards: [
          {
            title: 'Teks Pendidikan',
            description: 'Menulis draf narasi studi kasus, analogi sains sederhana, cerita edukatif anak, dan rubrik asesmen.',
            tag: 'Text Generation'
          },
          {
            title: 'Visual & Infografis',
            description: 'Merancang tata letak poster, tata warna edukasi, diagram alur, dan inspirasi ilustrasi belajar.',
            tag: 'Visual Assets'
          },
          {
            title: 'Struktur Permainan & Kode',
            description: 'Menyusun bank soal terstruktur, aturan kuis, dan formula interaktif untuk web game.',
            tag: 'Logic & Code'
          },
          {
            title: 'Audio & Penuturan Narasi',
            description: 'Mengonversi naskah menjadi rekaman suara penjelasan materi yang ramah bagi peserta didik.',
            tag: 'Voice & Speech'
          }
        ],
        accentColor: 'purple'
      },
      {
        id: 8,
        slideNumber: 8,
        title: 'AI untuk Membantu Pekerjaan Guru',
        subtitle: 'Katalog Dokumen & Media yang Dapat Didampingi AI',
        category: 'Penerapan Praktis',
        keyIdea: 'AI memangkas waktu kerja administratif rutin agar guru memiliki lebih banyak energi untuk mendampingi peserta didik secara personal.',
        cards: [
          { title: 'Modul Ajar / RPP', description: 'Menyusun rancangan pembelajaran berbasis Capaian Pembelajaran lintas fase.', tag: 'Administrasi' },
          { title: 'Bahan Ajar Bertingkat', description: 'Membuat bacaan dengan variasi kosakata untuk murid cepat dan yang butuh bimbingan.', tag: 'Diferensiasi' },
          { title: 'LKPD Interaktif', description: 'Lembar kerja observasi, penyelidikan sains, atau lembar diskusi kelompok.', tag: 'Aktivitas' },
          { title: 'Slide Presentasi', description: 'Rangkuman poin inti materi yang terstruktur dengan hierarki jelas.', tag: 'Media' },
          { title: 'Asesmen & Kisi-Kisi', description: 'Membuat butir soal bergradasi dari pemahaman dasar (LOTS) ke penalaran (HOTS).', tag: 'Evaluasi' },
          { title: 'Rubrik Penilaian 1-4', description: 'Kriteria deskripsi performa autentik yang obyektif dan mudah dipahami murid.', tag: 'Asesmen' },
          { title: 'Poster Edukasi', description: 'Media visual pesan motivasi belajar atau ringkasan materi pelajaran.', tag: 'Visual' },
          { title: 'Permainan Edukasi', description: 'Kuis tebak kata, petualangan cerita, hingga turnamen kelas.', tag: 'Gamifikasi' }
        ],
        accentColor: 'cyan'
      },
      {
        id: 9,
        slideNumber: 9,
        title: 'AI dalam Perencanaan Pembelajaran',
        subtitle: 'Brainstorming Ide & Strategi Pembelajaran Aktif',
        category: 'Perencanaan',
        keyIdea: 'Gunakan AI sebagai mitra curah pendapat (*brainstorming partner*) untuk menemukan ide apersepsi dan analogi segar.',
        points: [
          'Mengembangkan pertanyaan pemantik yang memicu rasa penasaran peserta didik di awal kelas.',
          'Menghubungkan topik abstrak dengan peristiwa nyata di sekitar lingkungan kehidupan siswa.',
          'Merumuskan variasi skenario berbasis masalah (PBL) atau proyek (PjBL) yang realistis dan kontekstual.',
          'Menyiapkan rencana cadangan (*Plan B*) jika fasilitas laboratorium atau gawai sedang terkendala.'
        ],
        accentColor: 'blue'
      },
      {
        id: 10,
        slideNumber: 10,
        title: 'AI untuk Media Pembelajaran',
        subtitle: 'Menghidupkan Ruang Kelas dengan Format Visual & Naratif',
        category: 'Media Pembelajaran',
        keyIdea: 'Mengubah konsep buku teks yang kaku menjadi infografis, komik narasi, dan tantangan teka-teki yang menyenangkan.',
        cards: [
          {
            title: 'Infografis Ringkas',
            description: 'Merangkum rantai makanan, siklus alam, atau garis waktu sejarah dalam bagan alur yang bersih.',
            tag: 'Infografis'
          },
          {
            title: 'Cerita Edukasi & Roleplay',
            description: 'Membuat cerita pendek kontekstual di mana murid berperan sebagai pemecah masalah.',
            tag: 'Storytelling'
          },
          {
            title: 'Game & Kuis Interaktif',
            description: 'Merancang format roda keberuntungan, ular tangga konsep, dan teka-teki logika kelompok.',
            tag: 'Game Builder'
          }
        ],
        accentColor: 'yellow'
      },
      {
        id: 11,
        slideNumber: 11,
        title: 'Peluang Besar AI dalam Pendidikan',
        subtitle: 'Mengapa Guru Abad ke-21 Perlu Menguasai AI?',
        category: 'Peluang & Manfaat',
        keyIdea: 'AI bukan sekadar alat otomatisasi, melainkan akselerator pedagogis yang memperluas jangkauan kreativitas pendidik.',
        points: [
          'Efisiensi Waktu: Mengurangi beban pengetikan format perangkat ajar hingga 60%.',
          'Kreativitas Tak Terbatas: Menemukan ratusan ide ice breaking dan analogi dalam hitungan menit.',
          'Personalisasi Belajar: Membantu menyiapkan bahan remedi dan pengayaan secara spesifik.',
          'Mendorong Kelas Aktif: Menghadirkan gamifikasi dan simulasi yang disukai generasi digital.',
          'Penguatan Literasi Kritis: Menjadi bahan diskusi kelas tentang cara membedakan fakta vs opini buatan mesin.'
        ],
        accentColor: 'cyan'
      },
      {
        id: 12,
        slideNumber: 12,
        title: 'AI Bukan Pengganti Guru!',
        subtitle: 'Sentuhan Kemanusiaan yang Tak Tergantikan',
        category: 'Refleksi Filosofis',
        keyIdea: 'Pendidikan sejatinya adalah proses pembentukan karakter, empati, dan teladan kemanusiaan yang hanya bisa dilakukan oleh guru sejati.',
        comparison: {
          titleLeft: 'Apa yang Bisa Dilakukan AI',
          itemsLeft: [
            'Memproses ribuan teks referensi seketika',
            'Menghasilkan draf materi dan butir pertanyaan',
            'Memberikan alternatif ide secara cepat',
            'Menjalankan logika pemformatan dokumen baku'
          ],
          titleRight: 'Kekuatan Mutlak Guru Manusia',
          itemsRight: [
            'Membaca tatapan mata murid yang sedang bersedih',
            'Memberikan pelukan semangat dan motivasi moral',
            'Menilai kejujuran dan kematangan sikap anak didik',
            'Mengambil keputusan etis & kebijaksanaan pedagogis'
          ]
        },
        accentColor: 'purple'
      },
      {
        id: 13,
        slideNumber: 13,
        title: 'Keterbatasan & Risiko AI',
        subtitle: 'Waspadai Jebakan Algoritma di Balik Jawaban Meyakinkan',
        category: 'Keterbatasan AI',
        keyIdea: 'AI tidak memiliki pemahaman makna sesungguhnya, melainkan memprediksi kata berdasarkan probabilitas statistik.',
        cards: [
          {
            title: 'Halusinasi AI',
            description: 'AI dapat mengarang fakta, tokoh sejarah, rumus, atau pasal hukum dengan nada kalimat yang sangat meyakinkan.',
            tag: 'Halusinasi'
          },
          {
            title: 'Bias Data & Stereotip',
            description: 'Keluaran AI merefleksikan prasangka data internet masa lalu yang mungkin tidak adil bagi kelompok tertentu.',
            tag: 'Bias'
          },
          {
            title: 'Informasi Kedaluwarsa',
            description: 'Model memiliki batas pemotongan data pelatihan sehingga belum tentu mengetahui regulasi kurikulum terbaru.',
            tag: 'Outdated'
          },
          {
            title: 'Kelemahan Konteks Lokal',
            description: 'AI global terkadang kurang peka terhadap kearifan budaya daerah dan kurikulum nasional Indonesia.',
            tag: 'Konteks'
          }
        ],
        accentColor: 'yellow'
      },
      {
        id: 14,
        slideNumber: 14,
        title: 'Mengapa Hasil AI Wajib Diverifikasi?',
        subtitle: 'Prinsip Kritis Sebelum Membagikan Konten ke Murid',
        category: 'Verifikasi Fakta',
        keyIdea: 'Kredibilitas profesional guru dipertaruhkan setiap kali membagikan lembar belajar di ruang kelas.',
        cards: [
          {
            title: 'Risiko Fatal Jika Lalai',
            description: 'Peserta didik menyerap miskonsepsi sains atau fakta sejarah yang salah, yang sulit diperbaiki di kemudian hari.',
            tag: 'Dampak Murid'
          },
          {
            title: 'Prinsip Kehati-hatian',
            description: 'Perlakukan setiap hasil AI sebagai "draf mentah pertama" yang selalu memerlukan kurasi dan pemeriksaan ulang oleh guru.',
            tag: 'Sikap Guru'
          }
        ],
        accentColor: 'blue'
      },
      {
        id: 15,
        slideNumber: 15,
        title: '5 Langkah Praktis Verifikasi Hasil AI',
        subtitle: 'Prosedur Cepat Memastikan Keabsahan Materi Ajar',
        category: 'Metode Verifikasi',
        keyIdea: 'Gunakan alur 5 langkah sistematis sebelum lembar belajar dicetak atau ditayangkan.',
        points: [
          '1. Periksa Klaim Utama: Garis bawahi angka, nama tokoh, tanggal, dan istilah teknis.',
          '2. Cari Sumber Primer: Cek buku teks resmi Kemendikbudristek, jurnal ilmiah, atau ensiklopedia resmi.',
          '3. Bandingkan Sumber: Konfirmasi minimal pada satu sumber tepercaya lain yang independen.',
          '4. Periksa Tanggal & Konteks: Pastikan regulasi atau kurikulum masih berlaku pada jenjang yang diampu.',
          '5. Koreksi atau Hapus: Jika sebuah klaim tidak dapat dibuktikan kebenarannya, buang segera.'
        ],
        accentColor: 'cyan'
      },
      {
        id: 16,
        slideNumber: 16,
        title: 'Etika Penggunaan AI dalam Pendidikan',
        subtitle: 'Menjaga Integritas, Privasi, dan Tanggung Jawab',
        category: 'Etika & Kebijakan',
        keyIdea: 'Pemanfaatan teknologi harus senantiasa berpijak pada prinsip etis yang melindungi martabat peserta didik.',
        cards: [
          {
            title: 'Kejujuran & Transparansi',
            description: 'Terbuka saat memanfaatkan AI sebagai alat bantu perancang dan ajarkan murid etika atribusi.',
            tag: 'Integritas'
          },
          {
            title: 'Perlindungan Data Pribadi',
            description: 'DILARANG keras mengunggah NIK, foto wajah murid, rekam medis, atau nilai pribadi ke prompt AI publik.',
            tag: 'Privasi Murid'
          },
          {
            title: 'Hak Cipta & Orisinalitas',
            description: 'Hormati karya pencipta asli dan sertakan kredit sumber rujukan utama.',
            tag: 'Hak Cipta'
          },
          {
            title: 'Pengawasan Manusia (Accountability)',
            description: 'Guru adalah penanggung jawab penuh materi ajar di kelas, bukan aplikasi AI.',
            tag: 'Tanggung Jawab'
          }
        ],
        accentColor: 'purple'
      },
      {
        id: 17,
        slideNumber: 17,
        title: 'Contoh Praktik yang Aman vs Berisiko',
        subtitle: 'Panduan Praktis di Lingkungan Satuan Pendidikan',
        category: 'Studi Komparasi',
        keyIdea: 'Kenali batasan jelas antara pemanfaatan yang produktif dengan tindakan yang membahayakan privasi dan kualitas belajar.',
        comparison: {
          titleLeft: 'Praktik Aman & Bertanggung Jawab',
          itemsLeft: [
            'Meminta ide variasi kegiatan eksperimen sains atau proyek',
            'Menyusun draf soal dengan Capaian Pembelajaran umum',
            'Menggunakan data anonim tanpa identitas siswa',
            'Memeriksa kembali kesesuaian jawaban dengan buku teks resmi'
          ],
          titleRight: 'Praktik Berisiko (Hindari)',
          itemsRight: [
            'Mengunggah data pribadi dan rapor murid ke layanan AI publik',
            'Menyalin-menempel mentah soal tanpa membaca isinya',
            'Menjadikan AI sebagai penilai mutlak karakter murid',
            'Membiarkan murid menggunakan AI tanpa panduan etika'
          ]
        },
        accentColor: 'yellow'
      },
      {
        id: 18,
        slideNumber: 18,
        title: 'Ringkasan: 5 Pesan Utama Mengenal AI',
        subtitle: 'Rangkuman Esensial Modul 1',
        category: 'Rangkuman',
        keyIdea: 'Pegang lima prinsip ini sebagai panduan melangkah bersama kecerdasan artifisial di sekolah.',
        points: [
          '1. AI adalah alat pengungkit produktivitas dan kreativitas guru, bukan pengambil keputusan pedagogis.',
          '2. Kualitas masukan menentukan kualitas keluaran (Garbage In, Garbage Out).',
          '3. Verifikasi fakta adalah kewajiban mutlak sebelum menyebarkan materi ajar.',
          '4. Jaga kerahasiaan dan privasi data murid dengan tidak memasukkan data sensitif.',
          '5. Keriangan belajar murid lahir dari interaksi manusiawi yang tulus bersama guru yang inspiratif.'
        ],
        accentColor: 'cyan'
      },
      {
        id: 19,
        slideNumber: 19,
        title: 'Penutup: Kompas Guru Riang',
        subtitle: 'Melangkah Bersama Menghidupkan Pembelajaran',
        category: 'Inspirasi Penutup',
        keyIdea: '"Gunakan AI untuk memperkuat kreativitas dan profesionalisme guru, bukan untuk menggantikan tanggung jawab manusia."',
        quote: {
          text: 'Teknologi akan terus berevolusi dengan kecepatan tinggi. Namun hangatnya senyum guru, empati bimbingan, dan nyala semangat belajar yang ditularkan di ruang kelas akan selalu menjadi lentera sejati bagi generasi penerus bangsa.',
          author: 'GURITA — Guru Kreatif, Teknologi Adaptif, Siswa Inspiratif.'
        },
        accentColor: 'cyan'
      }
    ]
  },
  {
    id: 'materi-2',
    title: 'Prompt Engineering',
    subtitle: 'Seni Memberikan Instruksi yang Efektif kepada AI',
    description: 'Kuasai teknik merancang prompt presisi untuk guru dan pendidik di semua jenjang: anatomi 7 komponen, rumus 7P, studi kasus perbaikan prompt, hingga teknik iterasi bertahap.',
    totalSlides: 15,
    estimatedTime: '20 Menit',
    iconName: 'Terminal',
    accent: 'yellow',
    slides: [
      {
        id: 1,
        slideNumber: 1,
        title: 'Prompt Engineering untuk Pendidik',
        subtitle: 'Seni Memberikan Instruksi yang Efektif kepada AI',
        category: 'Sampul Presentasi',
        keyIdea: 'Kecakapan menyusun prompt adalah keterampilan abad ke-21 yang membedakan guru biasa dengan guru yang mampu memaksimalkan potensi AI.',
        cards: [
          {
            title: 'Presisi',
            description: 'Instruksi spesifik menghasilkan keluaran yang langsung dapat digunakan.',
            tag: 'Prinsip 1'
          },
          {
            title: 'Konteks Kaya',
            description: 'Menyertakan profil peserta didik dan batasan materi yang jelas.',
            tag: 'Prinsip 2'
          },
          {
            title: 'Iteratif',
            description: 'Menyempurnakan hasil melalui dialog umpan balik bertahap.',
            tag: 'Prinsip 3'
          }
        ],
        accentColor: 'yellow'
      },
      {
        id: 2,
        slideNumber: 2,
        title: 'Apa Itu Prompt?',
        subtitle: 'Jembatan Komunikasi antara Ide Guru dan Mesin AI',
        category: 'Konsep Dasar',
        keyIdea: 'Prompt adalah teks instruksi atau pertanyaan yang diberikan pengguna agar model AI memahami konteks, tujuan, dan format keluaran yang diinginkan.',
        cards: [
          {
            title: 'Bukan Sekadar Pertanyaan',
            description: 'Prompt yang baik bukan seperti mengetik kata kunci singkat di Google, melainkan seperti memberikan arahan kerja detail kepada asisten terlatih.',
            tag: 'Mindset'
          },
          {
            title: 'Hukum Kualitas AI',
            description: '"Kualitas jawaban AI adalah cerminan dari kejelasan instruksi yang Anda berikan." Instruksi kabur menghasilkan jawaban umum yang membosankan.',
            tag: 'Hukum Prompt'
          }
        ],
        accentColor: 'cyan'
      },
      {
        id: 3,
        slideNumber: 3,
        title: 'Mengapa Kualitas Prompt Sangat Penting?',
        subtitle: 'Perbedaan Nyata Hasil Umum vs Hasil Terarah',
        category: 'Komparasi Efek',
        keyIdea: 'Prompt yang terarah menghemat 90% waktu revisi guru dibanding instruksi yang terlalu umum.',
        comparison: {
          titleLeft: 'Instruksi Terlalu Umum',
          itemsLeft: [
            '"Buatkan kuis pembelajaran."',
            'Hasil: Soal hafalan umum, tidak sesuai fase/usia, tingkat kesulitan acak, dan tanpa rubrik pembahasan.',
            'Guru harus merombak hampir seluruh isi soal.'
          ],
          titleRight: 'Instruksi Terarah & Berkonteks',
          itemsRight: [
            '"Bertindaklah sebagai guru ahli. Buat 5 soal HOTS pilihan ganda topik Rantai Makanan untuk jenjang peserta didik yang ditentukan, sertakan stimulus cerita singkat dan pembahasan."',
            'Hasil: Soal kontekstual, memicu nalar kritis, dan siap diuji coba.'
          ]
        },
        accentColor: 'blue'
      },
      {
        id: 4,
        slideNumber: 4,
        title: 'Anatomi Prompt yang Baik',
        subtitle: '7 Komponen Utama Pembentuk Instruksi Berkualitas',
        category: 'Anatomi Prompt',
        keyIdea: 'Prompt yang komprehensif mengunci variabel agar keluaran AI tidak menyimpang ke luar topik.',
        cards: [
          { title: '1. Peran (Persona)', description: 'Identitas keahlian AI (misal: "Guru IPA berpengalaman" / "Pendidik PAUD ramah").', tag: 'Peran' },
          { title: '2. Konteks', description: 'Latar belakang situasi (misal: "Peserta didik kelas 4 SD di daerah pesisir").', tag: 'Konteks' },
          { title: '3. Tugas Utama', description: 'Perintah kerja eksplisit (misal: "Susun 3 skenario studi kasus").', tag: 'Tugas' },
          { title: '4. Data / Materi', description: 'Bahan ajar, teks CP, atau daftar konsep yang harus disertakan.', tag: 'Data' },
          { title: '5. Batasan (Constraints)', description: 'Hal yang boleh dan dilarang (misal: "Maksimal 150 kata per soal").', tag: 'Batasan' },
          { title: '6. Format Output', description: 'Bentuk tampilan (misal: tabel 5 kolom, daftar poin, atau kartu dialog).', tag: 'Format' },
          { title: '7. Kriteria Kualitas', description: 'Standar mutu (misal: "Gunakan bahasa ramah dan pemicu nalar kritis").', tag: 'Kualitas' }
        ],
        accentColor: 'purple'
      },
      {
        id: 5,
        slideNumber: 5,
        title: 'Rumus Prompt Efektif GURITA (7P)',
        subtitle: 'Formula Praktis yang Mudah Diingat',
        category: 'Formula Prompt',
        keyIdea: 'PERAN + KONTEKS + TUGAS + DATA + BATASAN + FORMAT OUTPUT + KRITERIA KUALITAS.',
        diagram: {
          steps: [
            { number: 'P', title: 'Peran', desc: 'Siapa AI bertindak (Pakar materi / Pendidik inspiratif)' },
            { number: 'K', title: 'Konteks', desc: 'Fase/jenjang kelas, profil peserta didik, dan alokasi waktu' },
            { number: 'T', title: 'Tugas', desc: 'Tindakan spesifik yang harus dibuat' },
            { number: 'D', title: 'Data', desc: 'Materi acuan dan teks Capaian Pembelajaran' },
            { number: 'B', title: 'Batasan', desc: 'Pagar pembatas agar tidak keluar jalur' },
            { number: 'F', title: 'Format', desc: 'Struktur tampilan akhir (tabel, poin, draf)' },
            { number: 'Q', title: 'Kualitas', desc: 'Nada bahasa, daya nalar, dan daya tarik visual' }
          ],
          note: 'Catatan: Tidak semua prompt membutuhkan ketujuh elemen sekaligus. Sesuaikan kelengkapan dengan tingkat kompleksitas tugas.'
        },
        accentColor: 'yellow'
      },
      {
        id: 6,
        slideNumber: 6,
        title: 'Menentukan Peran dan Konteks',
        subtitle: 'Fondasi Nada Suara dan Sudut Pandang AI',
        category: 'Komponen 1 & 2',
        keyIdea: 'Menetapkan peran membantu model AI mengaktifkan domain keahlian yang paling relevan.',
        cards: [
          {
            title: 'Contoh Menentukan Peran',
            description: '"Bertindaklah sebagai Guru Bahasa berjiwa kreatif yang ahli merancang pembelajaran berbasis literasi narasi kontekstual."',
            tag: 'Peran'
          },
          {
            title: 'Contoh Menentukan Konteks',
            description: '"Peserta didik adalah siswa semester ganjil yang memiliki minat tinggi pada gawai, namun butuh bimbingan membedakan fakta dan opini pada media digital."',
            tag: 'Konteks'
          }
        ],
        accentColor: 'cyan'
      },
      {
        id: 7,
        slideNumber: 7,
        title: 'Menentukan Tugas dan Data Masukan',
        subtitle: 'Inti Instruksi dan Bahan Baku Pembelajaran',
        category: 'Komponen 3 & 4',
        keyIdea: 'Berikan data spesifik agar AI tidak mengarang bebas di luar silabus kurikulum satuan pendidikan Anda.',
        points: [
          'Tugas Spesifik: Gunakan kata kerja operasional seperti "Analisis", "Rancanglah", "Susun draf", bukan sekadar "Bahas tentang...".',
          'Sertakan Teks Capaian Pembelajaran (CP) asli agar tujuan tetap selaras dengan regulasi nasional.',
          'Berikan contoh istilah atau konsep kunci yang wajib termuat di dalam keluaran.',
          'Jika menganalisis teks bacaan, tempelkan teks tersebut secara utuh ke dalam prompt.'
        ],
        accentColor: 'blue'
      },
      {
        id: 8,
        slideNumber: 8,
        title: 'Menentukan Format Keluaran (Output)',
        subtitle: 'Mengarahkan Tata Letak Hasil yang Siap Pakai',
        category: 'Komponen 5',
        keyIdea: 'Keluaran yang terstruktur rapi memudahkan guru langsung menyalin atau mencetak dokumen.',
        cards: [
          { title: 'Format Tabel Terstruktur', description: 'Meminta tabel 5 kolom untuk langkah pembelajaran: Aktivitas, Waktu, Prinsip, Pengalaman, Sumber.', tag: 'Tabel' },
          { title: 'Daftar Butir & Nomor', description: 'Sangat cocok untuk panduan instruksi tugas kelompok atau rubrik tahapan langkah.', tag: 'Daftar' },
          { title: 'Format Dialog & Cerita', description: 'Naskah roleplay percakapan dua tokoh sejarah atau analogi ilmiah.', tag: 'Naskah' },
          { title: 'Format JSON / Data Terstruktur', description: 'Untuk langsung diintegrasikan ke dalam game kuis digital atau generator kuis.', tag: 'Teknis' }
        ],
        accentColor: 'purple'
      },
      {
        id: 9,
        slideNumber: 9,
        title: 'Menambahkan Batasan & Kriteria Mutu',
        subtitle: 'Mencegah AI Bertele-tele dan Menjaga Standar Edukasi',
        category: 'Komponen 6 & 7',
        keyIdea: 'Batasan yang tegas menghindarkan hasil dari bahasa yang terlalu rumit bagi usia peserta didik yang dituju.',
        points: [
          'Batasan Kosakata: "Gunakan bahasa santun, lugas, dan sesuai tahap perkembangan kognitif peserta didik."',
          'Batasan Jumlah: "Tepat buatkan 5 butir soal, jangan lebih dan jangan kurang."',
          'Batasan Format: "Hindari pilihan jawaban Semua Benar atau Semua Salah."',
          'Kriteria Mutu: "Pastikan opsi pengecoh (distractor) bersifat masuk akal dan berdasarkan miskonsepsi umum murid."'
        ],
        accentColor: 'yellow'
      },
      {
        id: 10,
        slideNumber: 10,
        title: 'Contoh Prompt Kurang Efektif',
        subtitle: 'Kelemahan Instruksi Singkat Tanpa Pagar Pembatas',
        category: 'Studi Kasus 1',
        keyIdea: 'Instruksi minimalis memaksa AI membuat asumsi sendiri yang sering kali meleset dari tujuan kelas.',
        cards: [
          {
            title: 'Prompt: "Buatkan modul ajar IPA."',
            description: 'Kelemahan: Kelas berapa? Topik apa? Alokasi waktu berapa JP? Model pembelajarannya apa? Hasilnya akan berupa teks ringkas generik yang tidak bisa langsung dipakai mengajar.',
            tag: 'Terlalu Umum'
          },
          {
            title: 'Prompt: "Buat soal matematika yang seru."',
            description: 'Kelemahan: Tidak ada materi, tidak ada batasan rumus, tidak ada jumlah soal, tidak ada panduan penilaian.',
            tag: 'Tanpa Kriteria'
          }
        ],
        accentColor: 'cyan'
      },
      {
        id: 11,
        slideNumber: 11,
        title: 'Contoh Prompt yang Diperbaiki',
        subtitle: 'Penerapan Formula 7P dalam Pembuatan Modul Ajar',
        category: 'Studi Kasus 2',
        keyIdea: 'Bandingkan bagaimana penambahan peran, konteks, dan batasan melahirkan dokumen berkualitas tinggi.',
        cards: [
          {
            title: 'Prompt Hasil Perbaikan (7P)',
            description: '"Sebagai guru pendidik profesional (Peran), bantu saya merancang modul ajar topik Rantai Makanan ekosistem darat (Konteks & Data) dengan pendekatan Problem Based Learning untuk alokasi 2 JP. Sajikan langkah pembelajaran dalam tabel 5 kolom (Format): Aktivitas, Alokasi Waktu, Prinsip Pembelajaran (Bermakna/Menggembirakan), Pengalaman Belajar (Memahami/Mengaplikasi/Merefleksi), dan Sumber Belajar. Gunakan bahasa Indonesia profesional dan sertakan rubrik asesmen skala 1-4 (Kriteria & Batasan)."',
            tag: 'Presisi Tinggi'
          }
        ],
        accentColor: 'blue'
      },
      {
        id: 12,
        slideNumber: 12,
        title: 'Prompt untuk Media & Game Edukasi',
        subtitle: 'Menginstruksikan Visual dan Mekanika Permainan',
        category: 'Prompt Khusus Media',
        keyIdea: 'Untuk media visual dan game, jelaskan interaksi pengguna, aturan menang, dan gaya artistik yang diinginkan.',
        cards: [
          {
            title: 'Prompt Poster Edukasi',
            description: '"Rancang tata letak dan pesan teks poster A4 tentang 5 Langkah Bijak Menggunakan Media Sosial untuk mading satuan pendidikan. Judul harus berhuruf besar dan memikat, sertakan 5 poin aksi konkret dengan ikon representatif, dan beri ruang aman margin cetak."',
            tag: 'Poster'
          },
          {
            title: 'Prompt Game Kuis Gemini Canvas',
            description: '"Buatkan kode game interaktif Ular Tangga Edukasi topik Pahlawan Nasional untuk 4 tim. Setiap mendarat di tangga atau ular, munculkan pertanyaan sejarah bergambar. Sediakan dadu animasi, giliran tim bergantian, dan papan skor real-time."',
            tag: 'Game Builder'
          }
        ],
        accentColor: 'purple'
      },
      {
        id: 13,
        slideNumber: 13,
        title: 'Teknik Iterasi & Penyempurnaan Bertahap',
        subtitle: 'Jangan Berhenti di Respons Pertama AI',
        category: 'Teknik Lanjutan',
        keyIdea: 'Prompting adalah percakapan berkelanjutan. Bimbing AI seperti melatih asisten kerja Anda.',
        points: [
          'Evaluasi Hasil Awal: Baca cepat apakah keluaran sudah sesuai harapan atau ada bagian yang melenceng.',
          'Beri Umpan Balik Korektif: "Jawaban bagian kegiatan inti terlalu abstrak. Mohon ubah aktivitas nomor 2 menjadi kerja kelompok menyusun kartu jaring makanan."',
          'Minta AI Berpikir Kritis: "Tinjau kembali butir soal nomor 3, apakah opsi C terlalu jelas sebagai jawaban benar? Buatkan opsi pengecoh yang lebih menantang."',
          'Kombinasikan Gaya: "Ubah nada bahasa penjelasan teori menjadi analogi cerita dongeng sains yang menyenangkan."'
        ],
        accentColor: 'yellow'
      },
      {
        id: 14,
        slideNumber: 14,
        title: '4 Kesalahan Umum Saat Menulis Prompt',
        subtitle: 'Jebakan yang Sering Dialami Pemula',
        category: 'Perangkap Umum',
        keyIdea: 'Hindari empat kebiasaan ini agar waktu Anda tidak terbuang sia-sia.',
        cards: [
          {
            title: '1. Instruksi Ambigu',
            description: 'Menggunakan kata yang multitafsir seperti "buat yang bagus" tanpa kriteria parameter yang jelas.',
            tag: 'Ambigu'
          },
          {
            title: '2. Minim Konteks',
            description: 'Lupa menyebutkan jenjang usia peserta didik sehingga penjelasan yang dihasilkan terlalu rumit atau terlalu sederhana.',
            tag: 'Tanpa Konteks'
          },
          {
            title: '3. Meminta Terlalu Banyak Sekaligus',
            description: 'Meminta 1 semester penuh modul ajar dalam 1 prompt pendek. Sebaiknya pecah per pertemuan / per bab.',
            tag: 'Overload'
          },
          {
            title: '4. Percaya Buta Tanpa Verifikasi',
            description: 'Menganggap semua fakta yang ditulis AI otomatis akurat tanpa mengecek sumber resmi kurikulum.',
            tag: 'Tanpa Cek'
          }
        ],
        accentColor: 'cyan'
      },
      {
        id: 15,
        slideNumber: 15,
        title: 'Penutup: Kekuatan Instruksi Presisi',
        subtitle: 'Menjadi Arsitek Pembelajaran Cerdas',
        category: 'Inspirasi Penutup',
        keyIdea: '"Prompt yang baik membuat proses bekerja dengan AI lebih terarah, tetapi hasilnya tetap perlu diperiksa manusia."',
        quote: {
          text: 'AI hanyalah kanvas kosong dan kuas canggih. Anda, wahai bapak dan ibu guru serta tenaga pendidik, adalah seniman yang menentukan lukisan pembelajaran apa yang akan membekas indah di sanubari anak-anak didik kita.',
          author: 'GURITA — Prompt Engineering Lab for Educators'
        },
        accentColor: 'yellow'
      }
    ]
  }
];
