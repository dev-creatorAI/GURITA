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
  content?: string;
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
    subtitle: 'Peluang, Tantangan, dan Etika Pemanfaatan AI untuk Pendidik Masa Kini',
    description: 'Panduan komprehensif kecerdasan artifisial bagi pendidik: mitos vs fakta pergeseran peran guru, 4 alur peluang dan ragam alat AI, mitigasi halusinasi, perlindungan data, hingga prinsip Human-in-the-Loop.',
    totalSlides: 10,
    estimatedTime: '25 Menit',
    iconName: 'Compass',
    accent: 'cyan',
    slides: [
      {
            id: 1,
        slideNumber: 1,
        title: 'Benarkah AI Akan Mengubah Cara Guru Mengajar? Peluang dan Tantangannya',
        subtitle: 'Membedah Peluang, Transformasi Pedagogis, dan Tantangan Etika di Ruang Kelas',
        category: 'Judul & Pertanyaan Pemantik',
        keyIdea: 'Teknologi berkembang pesat, tetapi apakah cara kita mengajar akan tetap sama lima tahun dari sekarang? AI berpotensi mengubah cara guru merancang, melaksanakan, dan mengevaluasi pembelajaran.',
        points: [
          'Pengertian dan Cara Kerja AI',
          'Peluang pemanfaatan AI dalam dunia pendidikan.',
          'Tantangan etika dalam penggunaan AI di ruang kelas.'
        ],
        accentColor: 'cyan'
      },
      {
        id: 2,
        slideNumber: 2,
        title: 'Pengertian Artificial Intelligence (AI)',
        subtitle: 'Definisi dan Perbedaan Karakteristiknya',
        category: 'Konsep Dasar AI',
        keyIdea: 'Artificial Intelligence adalah sistem cerdas peniru kemampuan kognitif manusia yang menggunakan algoritma komputasi untuk memproses data menjadi prediksi, rekomendasi, hingga kreasi konten baru orisinal.',
        accentColor: 'blue',
        comparison: {
          titleLeft: 'AI Tradisional (Diskriminatif)',
          itemsLeft: [
            'Membandingkan dan mengelompokkan data yang sudah ada',
            'Pendeteksi pola klasifikasi dan probabilitas',
            'Contoh: Filter spam email & deteksi wajah smartphone',
            'Contoh: Rekomendasi tayangan video YouTube'
          ],
          titleRight: 'AI Generatif (Pencipta Baru)',
          itemsRight: [
            'Menghasilkan karya baru yang orisinal dari nol',
            'Bekerja berdasarkan instruksi bahasa alami guru (prompt)',
            'Contoh: Menulis draf modul ajar & skenario kelas',
            'Contoh: Media edukasi, materi diferensiasi & kuis'
          ]
        },
        points: [
          'Secara sederhana: program komputer cerdas peniru kemampuan kognitif manusia (belajar dari pengalaman, pola, dan pemecahan masalah).',
          'Penerapan guru sehari-hari: Google Gemini (modul & bahan ajar berdiferensiasi), Canva Magic Studio (poster edukasi), dan speech-to-text (evaluasi kelas).'
        ],
        content: `**Apa itu Artificial Intelligence?**
Secara bahasa sederhana, Artificial Intelligence (Kecerdasan Artifisial / AI) adalah program komputer cerdas yang dirancang untuk meniru kemampuan kognitif manusia, seperti belajar dari pengalaman, mengenali pola, memecahkan masalah, dan mengambil kesimpulan.

Secara teknis, AI adalah cabang ilmu komputer (*computer science*) yang menggunakan algoritma matematika dan komputasi statistik untuk memproses data masukan (*input*), mengekstraksi bobot probabilitas, dan menghasilkan luaran (*output*) berupa prediksi, klasifikasi, rekomendasi, atau konten baru.

**Perbedaan Tingkatan AI:**
1. **Artificial Intelligence (AI):** Payung besar teknologi komputer yang mampu melakukan tugas yang biasanya membutuhkan kecerdasan manusia.
2. **Machine Learning (ML):** Bagian dari AI di mana sistem belajar otomatis dari kumpulan data tanpa harus diprogram secara kaku aturan demi aturan (*rule-based*).
3. **Generative AI (Gen-AI):** Bagian mutakhir dari ML (sering menggunakan arsitektur *Transformer* seperti LLM Gemini, GPT, atau Claude) yang tidak hanya menganalisis data, melainkan *mampu menciptakan konten baru* orisinal (teks, gambar, audio, kode, dan skenario pembelajaran) berdasarkan instruksi (*prompt*) yang diberikan pengguna.

**AI Tradisional vs AI Generatif:**
- *AI Tradisional (Diskriminatif):* Membandingkan dan mengelompokkan data. Contoh: Filter spam email, rekomendasi video YouTube, atau fitur pendeteksi wajah di smartphone.
- *AI Generatif:* Menghasilkan karya baru dari nol. Contoh: Menulis draf modul ajar, membuat cerita dongeng sejarah interaktif, atau merancang skrip permainan kuis.

**Contoh AI dalam Kehidupan Sehari-hari & Profesi Guru:**
- *Sehari-hari:* Google Maps (memprediksi rute tercepat), Siri/Google Assistant, dan terjemahan otomatis Google Translate.
- *Profesi Guru:* Google Gemini / Gemini Canvas (menyusun rencana pembelajaran dan bahan ajar berdiferensiasi), Canva Magic Studio (membuat poster edukasi), dan speech-to-text saat mencatat evaluasi kelas.`
      },
      {
        id: 3,
        slideNumber: 3,
        title: 'Mitos vs. Realita Peran Guru',
        subtitle: 'AI Bukan Pengganti Guru, Melainkan Teknologi Pendukung Pendidikan',
        category: 'Transformasi Peran Guru',
        keyIdea: 'AI hadir untuk memberdayakan guru dan meringankan pekerjaan rutin. Mesin dapat mengolah pola data, tetapi tidak memiliki kesadaran, empati, atau pemahaman emosional sejati.',
        comparison: {
          titleLeft: 'Keterbatasan AI',
          itemsLeft: [
            'AI memprediksi kata dan pola berdasarkan data yang dipelajari.',
            'AI tidak memiliki kesadaran dan empati manusia.',
            'AI tidak mempunyai pemahaman emosional sejati.',
            'AI tidak dapat menggantikan keteladanan dan hubungan manusiawi.'
          ],
          titleRight: 'Keunggulan Manusia',
          itemsRight: [
            'Guru membangun hubungan emosional dengan siswa.',
            'Guru membimbing karakter dan nilai moral.',
            'Guru memahami kondisi dan kebutuhan peserta didik.',
            'Guru menjadi fasilitator dan desainer pengalaman belajar.'
          ]
        },
        points: [
          'AI membantu meringankan beban kerja rutin bagi lebih dari 3,36 juta guru di Indonesia.',
          'Pergeseran peran: dari penyampai materi satu arah menjadi fasilitator belajar.',
          'Guru bertransformasi menjadi mentor karakter dan desainer pengalaman kelas.'
        ],
        accentColor: 'blue'
      },
     
{
  id: 4,
  slideNumber: 4,
  title: 'Cara Kerja AI: Bagaimana AI Bisa Menjawab Pertanyaan?',
  subtitle: 'Mengenal Cara AI Belajar dan Menghasilkan Jawaban',
  category: 'Mengenal Kecerdasan Buatan',
  keyIdea: 'AI belajar dari banyak contoh informasi, mengenali pola, kemudian menggunakan pola tersebut untuk menghasilkan jawaban sesuai perintah atau pertanyaan pengguna.',
  cards: [
    {
      title: 'Belajar dari Data',
      description: 'AI mempelajari banyak informasi dari buku, artikel, gambar, dan berbagai sumber digital sebagai bahan latihan.',
      tag: 'Belajar'
    },
    {
      title: 'Mengenali Pola',
      description: 'AI mempelajari hubungan antara kata, gambar, dan informasi sehingga dapat memahami pola dari pertanyaan yang diberikan.',
      tag: 'Mengenali'
    },
    {
      title: 'Menghasilkan Jawaban',
      description: 'Ketika guru memberikan pertanyaan, AI menyusun jawaban berdasarkan pola dan informasi yang telah dipelajarinya.',
      tag: 'Menjawab'
    }
  ],
  accentColor: 'yellow'
},
{
  id: 5,
  slideNumber: 5,
  title: 'Peluang 1 – AI Membantu Memahami Kebutuhan Siswa',
  subtitle: 'Mengenali Perbedaan Kemampuan dan Kesulitan Belajar',
  category: 'Pembelajaran Berpusat pada Siswa',
  keyIdea: 'Setiap siswa memiliki kemampuan dan kesulitan belajar yang berbeda. AI dapat membantu guru mengenali kebutuhan tersebut dan menyiapkan pendampingan yang lebih sesuai.',
  cards: [
    {
      title: 'Mengenali Kesulitan Siswa',
      description: 'Membantu guru menemukan materi yang sering belum dipahami siswa berdasarkan hasil latihan dan jawaban mereka.',
      tag: 'Deteksi Kesulitan'
    },
    {
      title: 'Latihan Sesuai Kemampuan',
      description: 'Membantu membuat latihan dengan tingkat kesulitan berbeda, mulai dari soal mudah hingga soal yang lebih menantang.',
      tag: 'Latihan Bertahap'
    },
    {
      title: 'Pendamping Belajar',
      description: 'AI dapat membantu siswa mendapatkan penjelasan tambahan ketika mereka belum memahami materi pelajaran.',
      tag: 'Belajar Mandiri'
    }
  ],
  accentColor: 'cyan'
},
{
  id: 6,
  slideNumber: 6,
  title: 'Peluang 2 – AI Membuat Pembelajaran Lebih Menarik',
  subtitle: 'Menghadirkan Pengalaman Belajar yang Lebih Kreatif dan Interaktif',
  category: 'Kreativitas Pembelajaran',
  keyIdea: 'AI dapat membantu guru menghadirkan pengalaman belajar yang berbeda melalui cerita, simulasi, permainan, dan contoh nyata sehingga siswa lebih tertarik mengikuti pembelajaran.',
  points: [
    'Materi yang sulit dapat disampaikan melalui cerita sederhana.',
    'Siswa dapat belajar melalui contoh dan situasi kehidupan nyata.',
    'Permainan dan tantangan dapat meningkatkan keterlibatan siswa.',
    'Guru tetap mengarahkan kegiatan agar sesuai tujuan pembelajaran.'
  ],
  accentColor: 'purple'
},
{
  id: 7,
  slideNumber: 7,
  title: 'Peluang 3 – AI Membantu Guru Mengembangkan Ide dan Inovasi',
  subtitle: 'Mengubah Ide Sederhana Menjadi Kegiatan Pembelajaran Bermakna',
  category: 'Inovasi Pembelajaran',
  keyIdea: 'AI dapat menjadi teman bertukar pikiran bagi guru untuk menemukan ide baru, mengembangkan kegiatan proyek, dan menghubungkan materi pelajaran dengan kehidupan sehari-hari.',
  points: [
    'AI membantu guru menemukan inspirasi pembelajaran baru.',
    'Materi pelajaran dapat dikembangkan menjadi kegiatan proyek.',
    'Siswa diajak belajar dari masalah yang ada di lingkungan sekitar.',
    'Guru memilih dan menyesuaikan ide AI dengan kondisi sekolah.'
  ],
  accentColor: 'blue'
},
{
        id: 7,
        slideNumber: 7,
        title: 'Tantangan 1 – Kesenjangan Digital & Etika Informasi',
        subtitle: 'Memahami Risiko Akses Teknologi, Halusinasi, dan Bias AI',
        category: 'Tantangan Pemanfaatan AI',
        keyIdea: 'Pemanfaatan AI perlu memperhatikan ketimpangan akses teknologi dan risiko informasi yang salah atau bias. Guru harus melakukan verifikasi sebelum menggunakan hasil AI dalam pembelajaran.',
        cards: [
          {
            title: 'Kesenjangan Akses (Digital Divide)',
            description: 'Ketimpangan fasilitas perangkat teknologi dan konektivitas internet antarsekolah maupun antardaerah dapat membatasi kesempatan belajar.',
            tag: 'Akses Digital'
          },
          {
            title: 'Halusinasi AI',
            description: 'AI generatif dapat menghasilkan informasi yang salah, tidak akurat, atau menyesatkan meskipun disampaikan dengan bahasa yang meyakinkan.',
            tag: 'Verifikasi Fakta'
          },
          {
            title: 'Bias Data Pelatihan',
            description: 'Keluaran AI berpotensi merefleksikan prasangka atau ketidakadilan yang terdapat dalam data historis yang digunakan untuk melatih sistem.',
            tag: 'Etika Informasi'
          }
        ],
        points: [
          'Periksa kembali fakta dan informasi yang dihasilkan AI.',
          'Bandingkan informasi dengan sumber yang tepercaya.',
          'Waspadai bias dan ketidakadilan dalam keluaran AI.',
          'Sesuaikan pemanfaatan AI dengan kondisi fasilitas dan akses teknologi sekolah.'
        ],
        accentColor: 'purple'
      },
      {
        id: 8,
        slideNumber: 8,
        title: 'Tantangan 2 – Ketergantungan Berlebih & Integritas Akademik',
        subtitle: 'Menjaga Kejujuran Akademik dan Kemampuan Berpikir Kritis Siswa',
        category: 'Integritas Akademik',
        keyIdea: 'Penggunaan AI tanpa pendampingan dapat mendorong perilaku menyalin jawaban, mengurangi proses berpikir mandiri, dan menimbulkan risiko terhadap privasi data siswa.',
        cards: [
          {
            title: 'Penyalahgunaan Tugas & Plagiarisme',
            description: 'Siswa berisiko sekadar menyalin atau copy-paste jawaban yang dibuat AI tanpa memahami konsep dan proses penyelesaian tugas.',
            tag: 'Integritas'
          },
          {
            title: 'Pengikisan Berpikir Kritis',
            description: 'Ketergantungan terhadap jawaban instan dapat mengurangi daya analisis mandiri dan kemampuan pemecahan masalah siswa.',
            tag: 'Critical Thinking'
          },
          {
            title: 'Privasi Data Siswa',
            description: 'Guru dan siswa perlu berhati-hati agar tidak mengunggah data pribadi maupun informasi sensitif peserta didik ke platform AI publik.',
            tag: 'Perlindungan Data'
          }
        ],
        accentColor: 'yellow'
      },
      {
        id: 9,
        slideNumber: 9,
        title: 'Solusi – Pengawasan Pendidik (Human-in-the-Loop) & Literasi AI',
        subtitle: 'AI Membantu, Guru Tetap Menentukan',
        category: 'Solusi & Strategi',
        keyIdea: 'AI adalah alat bantu, bukan pengambil keputusan akhir. Guru harus mengkurasi hasil AI, membangun literasi AI siswa, dan menjaga hubungan sosial-emosional dalam pembelajaran.',
        diagram: {
          steps: [
            {
              number: '1',
              title: 'Input Prompt',
              desc: 'Guru memberikan instruksi dan konteks pembelajaran kepada AI.',
              isHuman: true
            },
            {
              number: '2',
              title: 'Output AI',
              desc: 'AI menghasilkan draf materi, ide, informasi, atau aktivitas pembelajaran.',
              isHuman: false
            },
            {
              number: '3',
              title: 'Validasi Guru',
              desc: 'Guru memeriksa akurasi, menyesuaikan konteks, dan menyaring hasil AI secara etis.',
              isHuman: true
            },
            {
              number: '4',
              title: 'Pembelajaran Kelas',
              desc: 'Hasil yang telah dikurasi digunakan untuk mendukung pembelajaran yang bermakna dan manusiawi.',
              isHuman: true
            }
          ],
          note: 'Human-in-the-Loop: Guru tetap menjadi pengawas, kurator, dan penentu keputusan akhir dalam pemanfaatan AI.'
        },
        cards: [
          {
            title: 'Guru sebagai Penentu',
            description: 'Seluruh hasil AI wajib dikurasi, diperiksa akurasinya, dan disaring oleh pendidik sebelum diberikan kepada siswa.',
            tag: 'Human-in-the-Loop'
          },
          {
            title: 'Membangun Literasi AI',
            description: 'Siswa perlu memahami cara kerja AI, keterbatasannya, dan etika penggunaan teknologi secara bertanggung jawab untuk persiapan karier masa depan.',
            tag: 'Literasi AI'
          },
          {
            title: 'Hubungan Sosial-Emosional',
            description: 'Interaksi manusiawi, empati, bimbingan, dan diskusi tatap muka tetap menjadi fondasi utama ruang kelas.',
            tag: 'Sentuhan Manusia'
          }
        ],
        accentColor: 'cyan'
      },
      {
        id: 10,
        slideNumber: 10,
        title: 'Penutup & Refleksi Aksi Nyata',
        subtitle: 'Teknologi Berkembang, Sentuhan Guru Tetap Menjadi Cahaya Pendidikan',
        category: 'Penutup & Refleksi',
        keyIdea: 'Teknologi dapat membantu memperkuat proses pendidikan, tetapi empati, keteladanan, dan semangat belajar yang ditularkan guru tetap menjadi bagian penting yang tidak tergantikan.',
        quote: {
          text: 'Teknologi akan terus berevolusi dengan kecepatan tinggi. Namun hangatnya senyum guru, empati bimbingan, dan nyala semangat belajar yang ditularkan di ruang kelas akan selalu menjadi lentera sejati bagi generasi penerus bangsa.',
          author: 'Pesan untuk Pendidik'
        },
        points: [
          'Mulai memanfaatkan AI dari satu kebutuhan pembelajaran yang sederhana.',
          'Periksa dan evaluasi hasil AI sebelum digunakan.',
          'Gunakan teknologi untuk memperkuat kreativitas dan kualitas pembelajaran.',
          'Tetap utamakan empati, karakter, dan hubungan manusiawi antara guru dan siswa.'
        ],
        accentColor: 'cyan'
      }
    ],
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
        title: 'Rumus Prompt Efektif',
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
