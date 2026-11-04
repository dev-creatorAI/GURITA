export interface MateriTopic {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  summary: string;
  estimatedTime: string;
  sections: Array<{
    id: string;
    letter: string;
    title: string;
    content: string;
    highlightCards?: Array<{
      title: string;
      desc: string;
      tag?: string;
    }>;
    tableData?: {
      headers: string[];
      rows: string[][];
    };
    caseStudies?: Array<{
      title: string;
      problem: string;
      solution: string;
    }>;
  }>;
  quiz: Array<{
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }>;
  practicalExercise?: {
    title: string;
    instruction: string;
    rawPrompt: string;
    flaws: string[];
    improvedPrompt: string;
    reflectionQuestion: string;
  };
}

export const MATERI_WORKSHOP_DATA: MateriTopic[] = [
  {
    id: 'materi-1-ai',
    number: 'Materi 01',
    title: 'Mengenal Artificial Intelligence (AI)',
    subtitle: 'Konsep Dasar, Cara Kerja, Peluang, dan Etika untuk Pendidik SMP',
    summary: 'Membongkar hakikat kecerdasan artifisial, mekanisme generatif, 12 penerapan konkret di SMP, prosedur verifikasi 7 langkah, mitigasi halusinasi, serta kompas etika perlindungan murid.',
    estimatedTime: '45 Menit Belajar + Kuis',
    sections: [
      {
        id: '1a-pengertian',
        letter: 'A',
        title: 'Pengertian Artificial Intelligence (AI)',
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
        id: '1b-cara-kerja',
        letter: 'B',
        title: 'Cara Kerja AI & Mengapa AI Dapat Keliru',
        content: `**Bagaimana AI Sebenarnya Bekerja?**
Model AI generatif tidak "berpikir" atau memiliki kesadaran seperti manusia. Cara kerjanya didasarkan pada prinsip probabilitas bahasa matematis:

1. **Bahan Bakar Data (*Training Data*):** AI dilatih menggunakan miliaran teks dari buku ilmiah, ensiklopedia, jurnal, artikel, dan situs web.
2. **Pengenalan Pola (*Pattern Recognition*):** AI mempelajari bagaimana kata, kalimat, dan konsep saling berhubungan. AI mengenali bahwa kata "Fotosintesis" sangat erat kaitannya dengan "Cahaya Matahari", "Klorofil", dan "Oksigen".
3. **Prediksi Kata Berikutnya (*Next-Token Prediction*):** Ketika guru mengetik instruksi, AI memprediksi urutan kata yang paling masuk akal dan relevan secara statistik untuk melanjutkan kalimat tersebut.

**Mengapa Hasil AI Bisa Keliru Padahal Terdengar Sangat Meyakinkan? (Halusinasi AI)**
- AI adalah mesin asosiasi pola, **bukan mesin verifikasi fakta**.
- AI dirancang untuk selalu memberikan jawaban yang mengalir lancar (*fluent*). Jika AI tidak menemukan fakta pasti dalam data pelatihannya, model probabilitasnya dapat mengarang nama tokoh, angka statistik, atau kutipan buku yang terdengar ilmiah namun sama sekali tidak nyata.
- Inilah mengapa peran guru sebagai kurator humanis (*human-in-the-loop*) mutlak diperlukan: guru memeriksa kebenaran substansi konsep sebelum materi diajarkan kepada murid.`
      },
      {
        id: '1c-penerapan-smp',
        letter: 'C',
        title: 'Penerapan AI dalam Kegiatan Pembelajaran SMP',
        content: `Berikut adalah 12 penerapan konkret AI untuk mendukung guru jenjang SMP (Fase D Kurikulum Merdeka) beserta panduan pemeriksaannya:`,
        tableData: {
          headers: ['Bidang Penerapan', 'Masalah Guru', 'Cara Pemanfaatan AI', 'Contoh Prompt', 'Hal Wajib Diperiksa Guru'],
          rows: [
            ['1. Menyusun Modul Ajar', 'Butuh waktu berjam-jam merancang sintaks & alokasi waktu.', 'Minta AI membuat draf modul Kurikulum Merdeka berlandaskan CP.', '"Susun draf modul IPA SMP Fase D topik Tata Surya model PBL alokasi 2 JP..."', 'Kesesuaian alokasi waktu nyata & fasilitas laboratorium sekolah.'],
            ['2. Menyusun Tujuan Pembelajaran (TP)', 'Kesulitan menurunkan CP menjadi TP yang terukur ABCD.', 'Gunakan AI untuk membedah CP menjadi pengalaman Memahami, Mengaplikasi, Merefleksi.', '"Turunkan CP Informatika Bab Berpikir Komputasional menjadi 3 TP terukur..."', 'Kata kerja operasional (KKO) sesuai tingkat kognitif siswa SMP.'],
            ['3. Mengembangkan Bahan Ajar', 'Buku paket teksnya terlalu padat & membosankan murid.', 'AI merangkum materi menjadi analogi kontekstual remaja.', '"Jelaskan konsep hukum Newton 1 dengan analogi naik angkot yang direm mendadak..."', 'Ketepatan konsep fisika jangan sampai terdistorsi oleh analogi.'],
            ['4. Membuat Presentasi Visual', 'Membuat slide visual dari nol memakan banyak waktu.', 'AI menyusun outline slide, poin kunci, dan ide visual slide.', '"Buat outline presentasi 7 slide tentang Perang Diponegoro kelas 8..."', 'Keringkasan teks slide (hindari dinding teks) dan kesesuaian gambar.'],
            ['5. Poster & Infografis Edukasi', 'Kesulitan merumuskan pesan ringkas untuk mading kelas.', 'AI merancang copywriting infografis edukasi 5 langkah.', '"Buat teks infografis 5 langkah cegah perundungan (bullying) di SMP..."', 'Bahasa santun, tegas, dan mudah dipahami siswa usia 12-15 tahun.'],
            ['6. Mengembangkan Soal & Asesmen', 'Membuat soal HOTS yang kontekstual dan orisinal cukup sulit.', 'AI menyusun stimulus studi kasus nyata disertai pertanyaan bertingkat.', '"Buat 3 soal HOTS pilihan ganda IPA tentang pencemaran air sungai dekat pasar..."', 'Kunci jawaban & kualitas pengecoh (distractor) jangan konyol/ambigu.'],
            ['7. Membuat Rubrik Penilaian', 'Kriteria penilaian proyek seringkali subjektif.', 'AI menyusun rubrik analitik skala 1-4 dengan deskriptor operasional.', '"Buat rubrik penilaian presentasi Bahasa Indonesia skala 1-4 untuk aspek artikulasi..."', 'Kejelasan deskriptor agar murid tahu ekspektasi pencapaian tugas.'],
            ['8. Menyusun LKPD Interaktif', 'LKPD hanya berisi pertanyaan teori kering.', 'AI menyusun panduan observasi, tabel data penyelidikan, dan refleksi.', '"Rancang LKPD penyelidikan struktur sel bawang merah dengan mikroskop..."', 'Ketersediaan alat/bahan riil di laboratorium sekolah Bapak/Ibu.'],
            ['9. Cerita, Simulasi & Game Edukasi', 'Murid jenuh dengan metode ceramah konvensional.', 'AI menyusun skenario petualangan, teka-teki kata, atau kuis berantai.', '"Buat skenario game petualangan detektif sejarah masa Rengasdengklok..."', 'Fakta kronologi sejarah tidak boleh melenceng demi dramatisasi.'],
            ['10. Pembelajaran Berdiferensiasi', 'Kemampuan baca dan pemahaman murid di kelas sangat heterogen.', 'AI membuat 3 versi teks bacaan materi sama dengan tingkat kompleksitas berbeda.', '"Sajikan materi fotosintesis dalam 3 versi: pemula (banyak analogi), sedang, mahir..."', 'Pastikan pesan kunci materi tetap tersampaikan di ketiga tingkat.'],
            ['11. Alternatif Penjelasan Konsep', 'Ada murid yang belum paham meski sudah dijelaskan 2 kali.', 'Minta AI memberikan sudut pandang penjelasan berbeda (misal gaya kinestetik/audio).', '"Berikan 3 cara menjelaskan pecahan senilai tanpa menggunakan gambar lingkaran kue..."', 'Kebenaran logika matematika yang digunakan.'],
            ['12. Refleksi & Evaluasi Pembelajaran', 'Guru kesulitan menyusun instrumen evaluasi diri bermakna.', 'AI merancang pertanyaan refleksi terbuka untuk guru dan peserta didik.', '"Buat 4 pertanyaan refleksi kelas 7 setelah pembelajaran proyek selesai..."', 'Relevansi pertanyaan dengan dinamika interaksi yang terjadi di kelas.']
          ]
        }
      },
      {
        id: '1d-peluang',
        letter: 'D',
        title: 'Peluang Pemanfaatan AI untuk Transformasi Pembelajaran',
        content: `**Mengapa Guru Perlu Menguasai AI?**
Pemanfaatan AI yang tepat bukan untuk mengurangi interaksi manusia, melainkan mengembalikan waktu guru yang sebelumnya tersita untuk urusan administratif:

- **Efisiensi Kerja:** Menghemat hingga 70% waktu menyusun draf administrasi dan asesmen formatif.
- **Kreativitas Tanpa Batas:** Memungkinkan guru mencoba format baru seperti skenario *Escape Room* edukatif, cerita bersambung, dan komik pembelajaran.
- **Personalisasi Belajar:** Menyediakan materi tambahan bagi siswa yang membutuhkan remedial maupun pengayaan dalam hitungan detik.
- **Guru sebagai Sutradara Belajar:** AI membebaskan guru dari rutinitas teknis sehingga guru memiliki lebih banyak energi untuk memberikan perhatian emosional, membimbing karakter, dan berdialog dengan murid.

> **Prinsip Utama:** AI adalah asisten cerdas, namun guru adalah pengemudi pedagogis yang memegang kendali arah dan nilai-nilai moral pembelajaran.`
      },
      {
        id: '1e-risiko',
        letter: 'E',
        title: 'Keterbatasan dan Risiko AI yang Wajib Diwaspadai',
        content: `Guru harus bersikap kritis dan objektif terhadap hasil AI:

1. **Halusinasi Fakta:** AI dapat mengarang referensi ayat, undang-undang, atau rumus ilmiah palsu.
2. **Bias Data & Budaya:** Mayoritas data pelatihan berasal dari literatur global yang mungkin kurang sensitif terhadap konteks kearifan lokal Indonesia.
3. **Informasi Usang (*Knowledge Cutoff*):** Model AI mungkin belum mencakup regulasi kurikulum terbaru atau peristiwa aktual terkini.
4. **Risiko Privasi Data:** Dilarang memasukkan data pribadi sensitif siswa (seperti NISN, rekam medis, alamat rumah, atau nilai rapor lengkap) ke dalam platform AI publik.
5. **Ketergantungan Murid:** Jika tidak dibimbing, siswa dapat menyalin jawaban AI secara pasif tanpa melalui proses berpikir kritis (*copy-paste syndrome*).`
      },
      {
        id: '1f-verifikasi',
        letter: 'F',
        title: 'Prosedur Praktis 7-Langkah Verifikasi Hasil AI',
        content: `Sebelum menyebarkan materi hasil AI kepada peserta didik, terapkan **Prosedur Verifikasi 7-Langkah Gurita**:

1. **Identifikasi Klaim Kunci:** Tandai angka, tahun, nama tokoh, dan rumus penting dalam teks AI.
2. **Periksa Sumber Primer:** Cek apakah teori tersebut ada di buku teks resmi Kemendikbudristek atau jurnal kredibel.
3. **Bandingkan Sumber Lain:** Konfirmasi minimal pada 1 sumber sekunder tepercaya.
4. **Uji Konteks & Tanggal:** Pastikan istilah yang digunakan sesuai dengan kurikulum yang berlaku di Indonesia.
5. **Uji Kesesuaian Jenjang:** Apakah tingkat kerumitan bahasa pas untuk psikologi anak SMP (usia 12-15 tahun)?
6. **Koreksi atau Eliminasi:** Jika ada fakta meragukan yang tidak ditemukan buktinya di buku resmi, hapus atau ganti.
7. **Dokumentasikan Catatan:** Berikan catatan refleksi mengapa bagian tersebut disesuaikan guru.`
      },
      {
        id: '1g-etika',
        letter: 'G',
        title: 'Etika Penggunaan AI dalam Dunia Pendidikan',
        content: `Pedoman etika bagi komunitas pendidik:
- **Kejujuran Akademik & Transparansi:** Jika bahan ajar atau skenario game dibantu AI, akui secara terbuka sebagai wujud literasi digital teladan bagi siswa.
- **Perlindungan Data Pribadi:** Jangan pernah mengunggah biodata privat siswa atau dokumen rahasia sekolah ke sistem AI umum.
- **Keadilan & Inklusivitas:** Pastikan materi ajar yang dihasilkan tidak diskriminatif terhadap suku, agama, ras, dan kelompok rentan.
- **Kedaulatan Pedagogis:** Nilai rapor, evaluasi kepribadian murid, dan keputusan kelulusan mutlak berada di tangan guru manusia, bukan rekomendasi algoritma mesin.`
      }
    ],
    quiz: [
      {
        id: 'q1-1',
        question: 'Apakah perbedaan mendasar antara AI Tradisional dengan Generative AI?',
        options: [
          'AI Tradisional memerlukan internet, sedangkan Generative AI tidak membutuhkan internet.',
          'AI Tradisional hanya mengelompokkan/menganalisis data, sedangkan Generative AI mampu menciptakan konten baru seperti teks dan gambar.',
          'AI Tradisional selalu benar faktanya, sedangkan Generative AI tidak pernah salah.',
          'AI Tradisional dirancang untuk guru, sedangkan Generative AI hanya untuk programmer.'
        ],
        correctIndex: 1,
        explanation: 'Benar! Generative AI (seperti Gemini) memiliki arsitektur yang mampu memproduksi konten orisinal baru berdasarkan pola data, sedangkan AI tradisional umumnya hanya mengklasifikasikan atau memfilter data yang ada.'
      },
      {
        id: 'q1-2',
        question: 'Fenomena di mana model AI menghasilkan jawaban yang terdengar sangat meyakinkan tetapi faktanya salah atau dikarang disebut...',
        options: [
          'Overclocking AI',
          'Halusinasi AI (AI Hallucination)',
          'Algoritma Rekursif',
          'Deep Learning Crash'
        ],
        correctIndex: 1,
        explanation: 'Tepat! Halusinasi AI terjadi karena AI bekerja berdasarkan prediksi probabilitas kata berikutnya, bukan melalui verifikasi fakta riil di dunia nyata.'
      },
      {
        id: 'q1-3',
        question: 'Manakah tindakan yang melanggar etika privasi data saat guru menggunakan platform AI publik?',
        options: [
          'Meminta AI membuat ide analogi hukum Archimedes.',
          'Mengunggah nama lengkap, NISN, nilai rapor, dan catatan konseling siswa ke kolom prompt AI.',
          'Meminta AI menyusun rubrik penilaian membaca puisi.',
          'Membuat draf skenario kuis interaktif tentang tata surya.'
        ],
        correctIndex: 1,
        explanation: 'Benar! Mengunggah identitas pribadi siswa dan catatan sensitif ke platform AI publik berisiko membocorkan privasi peserta didik dan melanggar etika perlindungan data anak.'
      }
    ]
  },
  {
    id: 'materi-2-prompting',
    number: 'Materi 02',
    title: 'Prompt Engineering: Seni Memberikan Instruksi Efektif',
    subtitle: 'Formula 7P Gurita, Anatomi Instruksi, dan Studi Kasus Praktik Guru SMP',
    summary: 'Menguasai keterampilan inti guru modern: menyusun prompt terstruktur dengan Rumus 7P, membandingkan 5 pasang studi kasus prompt buruk vs diperbaiki, teknik iterasi bertahap, dan simulasi hands-on.',
    estimatedTime: '45 Menit Belajar + Praktik',
    sections: [
      {
        id: '2a-pengertian-prompt',
        letter: 'A',
        title: 'Pengertian Prompt & Prompt Engineering',
        content: `**Apa itu Prompt?**
Prompt adalah teks masukan, pertanyaan, atau rangkaian instruksi yang diberikan pengguna kepada model AI untuk memicu keluaran yang diinginkan.

**Apa itu Prompt Engineering?**
Prompt Engineering adalah seni, metode, dan teknik terstruktur dalam merancang instruksi masukan agar sistem AI menghasilkan tanggapan yang akurat, relevan, bermakna, dan tepat sasaran sesuai kebutuhan pengguna.

> **Hukum Utama:** *"Garbage In, Garbage Out."* Jika instruksi guru terlalu samar dan umum, AI akan memberikan jawaban klise yang dangkal. Sebaliknya, jika instruksi memiliki peran, konteks, dan kriteria yang jelas, AI akan menjadi mitra kerja pedagogis yang luar biasa produktif.`
      },
      {
        id: '2b-anatomi',
        letter: 'B',
        title: 'Anatomi Prompt yang Baik (8 Komponen)',
        content: `Sebuah prompt yang matang tersusun dari 8 komponen utama:

1. **Peran / Persona AI:** Menetapkan identitas profesional AI (contoh: *"Bertindaklah sebagai Guru Ahli IPA SMP dan Pengembang Kurikulum Merdeka"*).
2. **Konteks:** Situasi pembelajaran, karakteristik murid, sarana sekolah, atau latar belakang topik.
3. **Tugas Utama:** Tindakan spesifik yang harus dilakukan (contoh: *"Susunlah 3 soal HOTS pilihan ganda"*).
4. **Data / Bahan Masukan:** Materi ajar, teks bacaan, atau kutipan Capaian Pembelajaran yang menjadi acuan.
5. **Batasan (*Constraints*):** Hal-hal yang tidak boleh dilakukan (contoh: *"Jangan gunakan istilah teknis perguruan tinggi, batasi maksimal 150 kata per nomor"*).
6. **Format Output:** Pola penyajian yang diinginkan (contoh: tabel 4 kolom, file JSON, poin bernomor, atau kartu dialog).
7. **Kriteria Kualitas:** Standar keberhasilan (contoh: *"Wajib memiliki stimulus masalah nyata dan 4 opsi jawaban dengan daya beda seimbang"*).
8. **Contoh / Referensi (*Few-Shot*):** Menampilkan 1 contoh hasil ideal agar AI memahami gaya bahasa yang diinginkan.`
      },
      {
        id: '2c-rumus',
        letter: 'C',
        title: 'Rumus Praktis Prompt Gurita (7-Elemen)',
        content: `Gunakan formula baku yang terbukti menghasilkan materi ajar berkualitas tinggi:

$$\\mathbf{PERAN} + \\mathbf{KONTEKS} + \\mathbf{TUGAS} + \\mathbf{DATA} + \\mathbf{BATASAN} + \\mathbf{FORMAT\\ OUTPUT} + \\mathbf{KRITERIA\\ KUALITAS}$$

*Catatan Pedagogis:* Tidak semua prompt harus selalu memakai ketujuh komponen secara kaku. Namun untuk tugas kompleks seperti menyusun Modul Ajar atau Game Interaktif, kelengkapan formula ini menentukan 90% mutu hasil AI.`
      },
      {
        id: '2d-perbandingan-prompt',
        letter: 'D',
        title: '5 Pasang Studi Kasus: Prompt Kurang Efektif vs Prompt Diperbaiki',
        content: `Perhatikan perbedaan nyata antara instruksi umum dengan instruksi terstruktur dalam pekerjaan guru SMP:`,
        tableData: {
          headers: ['Konteks Tugas', 'Prompt Kurang Efektif (❌)', 'Prompt Diperbaiki Gurita (✅)', 'Mengapa Prompt Diperbaiki Lebih Unggul?'],
          rows: [
            [
              '1. Membuat Modul Ajar',
              '"Buatkan modul ajar IPA materi fotosintesis."',
              '"Bertindaklah sebagai Pengembang Kurikulum IPA SMP. Rancang draf Modul Ajar Kurikulum Merdeka topik Fotosintesis untuk kelas 7 (alokasi 2 JP). Gunakan model Discovery Learning. Sertakan: tujuan pemahaman & aplikasi, langkah apersepsi kontekstual, tabel investigasi daun dengan lugol, dan rubrik asesmen."',
              'Prompt kedua memberikan batasan kurikulum, model pembelajaran, aktivitas spesifik, dan rubrik sehingga menghasilkan draf operasional yang siap disesuaikan di kelas.'
            ],
            [
              '2. Membuat Soal HOTS',
              '"Buatkan 5 soal pilihan ganda tentang ekosistem."',
              '"Bertindaklah sebagai pembuat soal asesmen sumatif SMP. Buatkan 3 soal pilihan ganda HOTS (level kognitif C4-C5) materi Ekosistem Rantai Makanan untuk siswa kelas 7. Berikan stimulus berupa narasi studi kasus berkurangnya populasi ular di persawahan. Sertakan 4 pilihan jawaban yang masuk akal, kunci jawaban, dan pembahasan edukatif."',
              'Prompt pertama hanya menghasilkan soal hafalan LOTS ("Apa definisi produsen?"). Prompt kedua memicu penalaran analisis sebab-akibat dengan studi kasus nyata.'
            ],
            [
              '3. Membuat Presentasi Visual',
              '"Buat slide materi teks proklamasi kemerdekaan."',
              '"Bertindaklah sebagai desainer media ajar sejarah. Susun outline presentasi 6 slide materi Detik-Detik Proklamasi 1945 untuk siswa SMP kelas 8. Format: Setiap slide memuat judul, 2-3 poin ringkas (maks 15 kata per poin), dan deskripsi ide ilustrasi visual yang membangkitkan nasionalisme."',
              'Menghindari slide yang penuh dinding teks (*text-heavy*), menghasilkan panduan visual yang menarik bagi murid usia remaja.'
            ],
            [
              '4. Media Poster / Infografis',
              '"Buat poster hemat energi."',
              '"Rancang copywriting poster edukasi hemat energi listrik untuk mading sekolah SMP. Nada bahasa persuasif ceria ala Si Gurita AI. Struktur teks: 1 slogan utama yang berima, 4 tips hemat listrik konkret di kamar tidur murid, dan 1 kalimat ajakan aksi bersama."',
              'Memiliki target audiens yang jelas (siswa SMP) dan struktur pesan yang rapi dengan slogan yang mudah diingat.'
            ],
            [
              '5. Permainan Edukasi',
              '"Buat game kuis matematika."',
              '"Bertindaklah sebagai Game Designer Edukasi. Rancang kuis interaktif bertema Petualangan Antariksa materi Aljabar Sederhana kelas 7. Buat 4 tantangan soal cerita berantai di mana siswa harus menghitung bahan bakar roket untuk menyelamatkan satelit. Sertakan skor, pesan kemenangan, dan fakta unik antariksa di setiap soal."',
              'Mengubah matematika dari rumus kering menjadi narasi petualangan bermakna dengan mekanika gamifikasi yang terarah.'
            ]
          ]
        }
      },
      {
        id: '2e-teknik-penyusunan',
        letter: 'E',
        title: 'Teknik Lanjutan Menyusun Prompt untuk Guru',
        content: `9 Teknik penting untuk memaksimalkan hasil prompt:
1. **Tetapkan Tujuan Sebelum Mengetik:** Tentukan bukti capaian apa yang ingin dilihat dari murid.
2. **Berikan Konteks Siswa:** Jelaskan apakah murid bertipe visual, sedang belajar di wilayah pesisir, atau memiliki keterbatasan sarana digital.
3. **Instruksi Operasional:** Gunakan kata kerja aktif: *Identifikasi, Bandingkan, Klasifikasikan, Rancanglah*.
4. **Format Spesifik:** Tentukan tabel markdown, format JSON, atau pembagian bab.
5. **Beri Batasan Negatif:** *"Jangan gunakan istilah kedokteran yang terlalu rumit untuk siswa kelas 7."*
6. **Pecah Tugas Kompleks (*Chain-of-Thought*):** Mulai dengan menyusun peta konsep $\\to$ lalu buat langkah belajar $\\to$ lalu susun instrumen soal.
7. **Lakukan Iterasi (*Refining*):** Jika hasil pertama kurang tepat, jangan hapus semuanya; beri instruksi perbaikan: *"Tolong sederhanakan bahasa pada poin nomor 2."*
8. **Minta AI Melakukan *Self-Correction*:** *"Periksa kembali kunci jawaban di atas, pastikan tidak ada opsi yang ambigu."*
9. **Verifikasi Manual:** Guru tetap memegang otoritas akhir kebenaran materi.`
      }
    ],
    quiz: [
      {
        id: 'q2-1',
        question: 'Komponen apakah dalam rumus prompt yang menentukan gaya bahasa dan sudut pandang respon AI?',
        options: [
          'Batasan (Constraints)',
          'Peran / Persona AI (Role)',
          'Alokasi Waktu',
          'Format Output'
        ],
        correctIndex: 1,
        explanation: 'Benar! Menetapkan Peran/Persona AI (seperti "Bertindaklah sebagai Guru Ahli IPA SMP") mengarahkan gaya bahasa, kosakata, dan pendekatan pedagogis yang digunakan AI.'
      },
      {
        id: 'q2-2',
        question: 'Jika hasil prompt AI pertama kali terasa terlalu umum dan membosankan, tindakan terbaik yang harus dilakukan guru adalah...',
        options: [
          'Langsung menutup aplikasi dan menyimpulkan AI tidak berguna.',
          'Melakukan iterasi prompt dengan menambahkan konteks profil siswa, batasan, dan format output yang spesifik.',
          'Mengulang prompt yang sama persis sebanyak 10 kali.',
          'Menyalin jawaban apa adanya ke buku tugas murid.'
        ],
        correctIndex: 1,
        explanation: 'Tepat! Kunci dari prompt engineering adalah iterasi bertahap: mempersempit konteks, memberikan batasan negatif, atau meminta variasi sudut pandang lain.'
      }
    ],
    practicalExercise: {
      title: 'Tantangan Praktik: Bedah & Perbaiki Prompt Guru',
      instruction: 'Analisis prompt mentah di bawah ini, temukan kelemahannya, dan pelajari bagaimana rumus 7P mengubahnya menjadi instruksi yang sangat presisi.',
      rawPrompt: '"Buatkan kuis biologi SMP kelas 8 tentang pencernaan manusia."',
      flaws: [
        'Tidak ada penetapan peran ahli (guru/asesor kompeten).',
        'Tidak ada spesifikasi tingkat kognitif (apakah LOTS, MOTS, atau HOTS).',
        'Tidak disebutkan format kuis (pilihan ganda, esai, tebak gambar) dan jumlah soal.',
        'Tidak ada instruksi penyertaan fakta seru atau umpan balik edukatif.'
      ],
      improvedPrompt: `Bertindaklah sebagai Guru IPA SMP dan Pengembang Game Edukasi Berbasis Gamifikasi.

Konteks:
Siswa kelas 8 SMP sedang mempelajari Sistem Pencernaan Manusia. Mereka menyukai tantangan detektif medis.

Tugas:
Rancang 3 pertanyaan kuis interaktif bergradasi:
1. Soal C2 (Uji Konsep Organ & Enzim)
2. Soal C3 (Aplikasi: Menu Makanan Seimbang Remaja)
3. Soal C4 HOTS (Analisis Masalah: Mengapa telat makan menyebabkan asam lambung naik)

Batasan & Format:
- Setiap soal memiliki 4 opsi pilihan jawaban (A, B, C, D).
- Cantumkan kunci jawaban yang tepat dan penjelasan ringkas mengapa opsi lain keliru.
- Tambahkan 1 "Fakta Unik Tubuh Kita" di setiap nomor agar siswa belajar dengan riang.`,
      reflectionQuestion: 'Bagaimana perbedaan kualitas respons AI ketika Anda memberikan rincian peran, konteks, dan kriteria di atas?'
    }
  }
];
