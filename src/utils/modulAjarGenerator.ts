import { ModulAjarFormInput, ModulAjarDocument, LearningStepRow } from '../types';

export function generateCompleteModulAjar(input: ModulAjarFormInput): ModulAjarDocument {
  const chosenPedagogy =
    input.pedagogicalPractice === 'Lainnya' && input.customPedagogicalPractice
      ? input.customPedagogicalPractice
      : input.pedagogicalPractice;

  // Derive syntax based on pedagogy
  let syntaxList: Array<{ tahapan: string; deskripsi: string }> = [];
  if (chosenPedagogy.includes('PBL') || chosenPedagogy.includes('Problem Based')) {
    syntaxList = [
      { tahapan: 'Fase 1: Orientasi Masalah', deskripsi: 'Guru menyajikan fenomena atau masalah kontekstual nyata untuk memancing rasa ingin tahu peserta didik.' },
      { tahapan: 'Fase 2: Mengorganisasikan Peserta Didik', deskripsi: 'Peserta didik dibagi menjadi kelompok heterogen (3-4 orang) dan mendefinisikan tugas investigasi.' },
      { tahapan: 'Fase 3: Membimbing Penyelidikan', deskripsi: 'Guru memfasilitasi pengumpulan data, eksperimen, dan eksplorasi sumber belajar.' },
      { tahapan: 'Fase 4: Mengembangkan & Menyajikan Karya', deskripsi: 'Peserta didik menyusun laporan/produk pemecahan masalah dan mempresentasikannya.' },
      { tahapan: 'Fase 5: Menganalisis & Mengevaluasi', deskripsi: 'Guru dan peserta didik mengevaluasi proses pemecahan masalah serta menarik kesimpulan konsep.' }
    ];
  } else if (chosenPedagogy.includes('PjBL') || chosenPedagogy.includes('Project Based')) {
    syntaxList = [
      { tahapan: 'Fase 1: Pertanyaan Mendasar', deskripsi: 'Menentukan tema karya dan mengajukan pertanyaan pemantik kontekstual.' },
      { tahapan: 'Fase 2: Mendesain Perencanaan Proyek', deskripsi: 'Menyusun aturan main, pembagian peran, dan instrumen kebutuhan proyek.' },
      { tahapan: 'Fase 3: Menyusun Jadwal Pembuatan', deskripsi: 'Membuat batas waktu pengerjaan (milestone) dan rencana uji coba.' },
      { tahapan: 'Fase 4: Memonitor Keaktifan & Progres', deskripsi: 'Guru mengamati proses, membimbing kendala, dan mencatat rubrik formatif.' },
      { tahapan: 'Fase 5: Menguji Hasil / Produk', deskripsi: 'Uji coba kelayakan produk dan pameran karya mini (Gallery Walk).' },
      { tahapan: 'Fase 6: Evaluasi Pengalaman Belajar', deskripsi: 'Refleksi bersama mengenai kekuatan dan tantangan selama pengerjaan proyek.' }
    ];
  } else if (chosenPedagogy.includes('Discovery')) {
    syntaxList = [
      { tahapan: 'Stimulation (Stimulasi)', deskripsi: 'Memberikan rangsangan visual atau demonstrasi konsep tanpa memberi kesimpulan langsung.' },
      { tahapan: 'Problem Statement (Identifikasi Masalah)', deskripsi: 'Peserta didik merumuskan hipotesis terkait fenomena yang diamati.' },
      { tahapan: 'Data Collection (Pengumpulan Data)', deskripsi: 'Eksplorasi literatur, manipulasi alat peraga, atau pengamatan data.' },
      { tahapan: 'Data Processing (Pengolahan Data)', deskripsi: 'Menghubungkan data hasil pengamatan dengan konsep teori.' },
      { tahapan: 'Verification (Pembuktian)', deskripsi: 'Memvalidasi hipotesis awal dengan fakta yang ditemukan.' },
      { tahapan: 'Generalization (Menarik Kesimpulan)', deskripsi: 'Merumuskan prinsip umum atau konsep inti pembelajaran.' }
    ];
  } else {
    // Default syntax for other pedagogical practices
    syntaxList = [
      { tahapan: 'Tahap 1: Eksplorasi Konseptual', deskripsi: 'Membangun pemahaman awal melalui pengamatan dan diskusi terarah.' },
      { tahapan: 'Tahap 2: Kolaborasi & Investigasi', deskripsi: 'Bekerja secara aktif dalam tim untuk menganalisis dan mengaplikasikan pengetahuan.' },
      { tahapan: 'Tahap 3: Konstruksi Pengetahuan', deskripsi: 'Menyusun sintesis pemahaman dan memvalidasi alternatif solusi.' },
      { tahapan: 'Tahap 4: Refleksi & Umpan Balik', deskripsi: 'Menilai kebermaknaan proses dan menyimpulkan esensi materi.' }
    ];
  }

  // Time parsing assumption: e.g. "2 JP (80 Menit)" or "80 Menit"
  let parsedMinutes = 80;
  const matchNum = input.timeAllocation.match(/\d+/);
  if (matchNum) {
    const rawVal = parseInt(matchNum[0], 10);
    // If input like "2 JP", convert to 80 minutes (40 mins/JP for SMP)
    if (input.timeAllocation.toLowerCase().includes('jp')) {
      parsedMinutes = rawVal * 40;
    } else {
      parsedMinutes = rawVal >= 30 ? rawVal : rawVal * 40;
    }
  }

  const initialMinutes = Math.round(parsedMinutes * 0.15); // 10-15%
  const closingMinutes = Math.round(parsedMinutes * 0.15); // 10-15%
  const coreMinutes = parsedMinutes - initialMinutes - closingMinutes; // 70-80%

  // Build Table Rows for Langkah Pembelajaran
  const stepsAwal: LearningStepRow[] = [
    {
      activity: 'Orientasi & Pengondisian Kelas: Guru menyapa peserta didik dengan hangat, memimpin doa bersama, memeriksa presensi kehadiran, serta membangun suasana kelas yang riang dan siap belajar.',
      timeAllocation: `${Math.round(initialMinutes * 0.4)} Menit`,
      principle: 'Berkesadaran',
      learningExperience: 'Memahami',
      learningResources: 'Buku Jurnal Guru, Tata Tertib Kelas'
    },
    {
      activity: `Apersepsi & Motivasi Kontekstual: Guru menghubungkan materi sebelumnya dengan topik "${input.topic}". Menampilkan pertanyaan pemantik: "Bagaimana fenomena ini dapat kita temukan di lingkungan sekitar kita sehari-hari?". Menyampaikan tujuan pembelajaran yang akan dicapai.`,
      timeAllocation: `${Math.round(initialMinutes * 0.6)} Menit`,
      principle: 'Bermakna',
      learningExperience: 'Memahami',
      learningResources: 'Media Visual Presentasi / Gambar Pemantik'
    }
  ];

  // Distribute core time across syntax phases
  const corePerPhase = Math.floor(coreMinutes / syntaxList.length);
  const stepsInti: LearningStepRow[] = syntaxList.map((stx, idx) => {
    const isFirst = idx === 0;
    const isLast = idx === syntaxList.length - 1;
    const exp: 'Memahami' | 'Mengaplikasi' | 'Merefleksi' = isFirst
      ? 'Memahami'
      : isLast
      ? 'Merefleksi'
      : 'Mengaplikasi';

    return {
      activity: `${stx.tahapan}: ${stx.deskripsi} Guru memfasilitasi aktivitas kelompok, membagikan LKPD, serta memberikan scaffolding bagi peserta didik yang memerlukan bimbingan tambahan. Peserta didik berdiskusi aktif menyelesaikan lembar kerja.`,
      timeAllocation: `${corePerPhase} Menit`,
      principle: idx % 2 === 0 ? 'Bermakna' : 'Menggembirakan',
      learningExperience: exp,
      learningResources: 'LKPD Interaktif, Bahan Ajar Siswa, Alat Peraga / Media Digital'
    };
  });

  const stepsPenutup: LearningStepRow[] = [
    {
      activity: 'Penyimpulan Bersama & Refleksi Belajar: Guru bersama peserta didik merangkum poin-poin kunci materi yang telah dipelajari. Peserta didik menyampaikan refleksi singkat: apa hal baru yang dipahami dan bagian mana yang paling menarik.',
      timeAllocation: `${Math.round(closingMinutes * 0.6)} Menit`,
      principle: 'Berkesadaran',
      learningExperience: 'Merefleksi',
      learningResources: 'Lembar Refleksi Diri / Exit Ticket'
    },
    {
      activity: 'Umpan Balik, Tindak Lanjut & Doa Penutup: Guru memberikan apresiasi atas partisipasi seluruh kelompok, menyampaikan arahan tugas tindak lanjut untuk pertemuan berikutnya, serta menutup sesi dengan doa.',
      timeAllocation: `${Math.round(closingMinutes * 0.4)} Menit`,
      principle: 'Menggembirakan',
      learningExperience: 'Merefleksi',
      learningResources: 'Agenda Belajar Pertemuan Berikutnya'
    }
  ];

  const todayStr = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return {
    informasiUmum: {
      namaSekolah: input.schoolName,
      mataPelajaran: input.subject,
      materi: input.materi,
      topikPembelajaran: input.topic,
      faseAtauKelas: input.gradeLevel,
      semester: input.semester,
      alokasiWaktu: input.timeAllocation,
      namaPenyusun: input.teacherName
    },
    identifikasiDanDesain: {
      identifikasiPesertaDidik: {
        pengetahuanAwal: input.priorKnowledge || `Sebagian besar peserta didik telah mengenal konsep dasar terkait topik ${input.topic} dalam kehidupan sehari-hari, namun belum memahami istilah ilmiah dan keterkaitannya secara terstruktur.`,
        minatDanMotivasi: 'Memiliki antusiasme tinggi terhadap aktivitas pembelajaran interaktif berbasis visual, media digital, dan kerja kelompok kolaboratif.',
        kesiapanBelajar: 'Terdapat variasi kesiapan belajar: 30% membutuhkan bimbingan bertahap (scaffolding konseptual), 50% mampu bekerja mandiri secara reguler, dan 20% siap untuk tantangan pengayaan.',
        kebutuhanBelajar: input.specialLearningNeeds || 'Memerlukan lembar kerja visual dan analogi konkret yang mengaitkan teori dengan realitas lingkungan siswa.',
        potensiMiskonsepsi: `Potensi menyamakan pemahaman konsep ${input.topic} dengan asumsi intuitif yang keliru. Guru perlu meluruskan pemahaman melalui bukti penyelidikan nyata.`,
        dukunganDanDiferensiasi: 'Diferensiasi konten disajikan melalui variasi tingkat kesulitan teks bacaan; diferensiasi proses melalui bimbingan intensif bagi kelompok yang membutuhkan.',
        catatanAsumsi: 'Catatan: Analisis karakteristik ini disusun berdasarkan profil umum jenjang terkait dan perlu dikonfirmasi/disesuaikan kembali oleh guru di kelas nyata.'
      },
      identifikasiMataPelajaran: {
        mataPelajaran: input.subject,
        materi: input.materi,
        topik: input.topic,
        elemen: input.element,
        faseAtauKelas: input.gradeLevel,
        semester: input.semester,
        alokasiWaktu: input.timeAllocation,
        relevansiKehidupanNyata: `Pemahaman materi ${input.topic} sangat penting bagi peserta didik untuk memecahkan masalah praktis sehari-hari, menumbuhkan nalar kritis, dan memahami fenomena alam/sosial di sekitar mereka.`
      },
      dimensiProfilLulusan: [
        {
          dimensi: 'Penalaran Kritis',
          alasanRelevansi: 'Peserta didik dituntut untuk menganalisis data, membedakan fakta dan opini, serta memecahkan masalah kontekstual.',
          perilakuTeramati: 'Mengajukan pertanyaan mendalam, memvalidasi informasi, dan menyusun kesimpulan berbasis bukti penyelidikan.'
        },
        {
          dimensi: 'Kolaborasi',
          alasanRelevansi: 'Aktivitas pembelajaran dirancang dalam kelompok heterogen untuk menyelesaikan tugas investigasi bersama.',
          perilakuTeramati: 'Mendengarkan pendapat teman kelompok, berbagi peran secara adil, dan bekerja sama mencapai tujuan tim.'
        },
        {
          dimensi: 'Kreativitas',
          alasanRelevansi: 'Peserta didik diajak merancang solusi inovatif atau media presentasi hasil telaah kelompok.',
          perilakuTeramati: 'Menghasilkan gagasan alternatif pemecahan masalah dan menyajikan karya dengan estetika yang komunikatif.'
        }
      ],
      capaianPembelajaran: input.learningOutcomeCP,
      lintasDisiplinIlmu: `Topik ${input.topic} memiliki keterkaitan erat dengan literasi Bahasa Indonesia (kemampuan menyusun laporan investigasi ilmiah) dan Matematika/Numerasi (pengolahan data tabel dan estimasi besaran).`,
      tujuanPembelajaran: {
        memahami: [
          `Peserta didik dapat mengidentifikasi dan menjelaskan konsep inti materi "${input.topic}" dengan bahasa sendiri secara tepat.`
        ],
        mengaplikasi: [
          `Peserta didik dapat menerapkan pengetahuan tentang "${input.topic}" untuk menyelidiki studi kasus nyata dan menyusun laporan/solusi kelompok.`
        ],
        merefleksi: [
          `Peserta didik dapat merefleksikan proses belajar, mengidentifikasi kesulitan yang dialami, dan merumuskan komitmen perbaikan pada pembelajaran berikutnya.`
        ]
      },
      praktikPedagogis: {
        namaPendekatan: chosenPedagogy,
        alasanPemilihan: `Pendekatan ${chosenPedagogy} dipilih karena sangat efektif mengaktifkan nalar kritis peserta didik, mendorong kolaborasi aktif, dan menghadirkan pengalaman belajar bermakna yang berpusat pada murid.`,
        karakteristik: 'Berorientasi pada penyelidikan peserta didik, berbasis masalah nyata, serta mengutamakan pembentukan pemahaman mandiri melalui bimbingan guru.',
        peranGuru: 'Bertindak sebagai fasilitator, motivator, penyedia scaffolding belajar, dan pengelola iklim kelas yang aman serta inklusif.',
        peranPesertaDidik: 'Bertindak sebagai penyelidik aktif, kolaborator dalam tim, serta komunikator hasil temuan penyelidikan.',
        sintaksTahapan: syntaxList,
        hubunganDenganTujuan: `Tahapan sintaks ${chosenPedagogy} secara langsung mengantarkan peserta didik dari tahap memahami konsep dasar, mengaplikasikan dalam studi kasus, hingga merefleksikan keberhasilan proses pemecahan masalah.`
      },
      mitraPembelajaran: 'Kerja sama antarguru mata pelajaran serumpun (MGMP Sekolah), wali kelas, serta peran orang tua dalam mendampingi kebiasaan belajar dan literasi mandiri di rumah.',
      lingkunganPembelajaran: {
        fisik: 'Ruang kelas dengan penataan meja kursi fleksibel (berkelompok 4-5 siswa), ventilasi nyaman, serta pencahayaan memadai untuk aktivitas diskusi.',
        sosial: 'Iklim kelas yang saling menghargai pendapat, bebas dari rasa takut salah, serta mengedepankan budaya apresiasi positif.',
        digital: 'Pemanfaatan layar proyektor / proyektor kelas atau gawai siswa/guru untuk menampilkan stimulus media visual interaktif dan kuis digital.'
      },
      pemanfaatanDigital: 'Media presentasi digital, kuis gamifikasi interaktif GURITA, serta video pembelajaran kontekstual yang dapat diakses secara luring maupun daring.'
    },
    langkahPembelajaran: {
      kegiatanAwal: stepsAwal,
      kegiatanInti: stepsInti,
      kegiatanPenutup: stepsPenutup,
      totalWaktuMenit: parsedMinutes,
      asumsiWaktuText: `Total alokasi waktu pembelajaran adalah ${parsedMinutes} Menit (${input.timeAllocation}).`
    },
    asesmen: {
      asesmenAwal: {
        tujuan: 'Mengukur pemahaman prasyarat dan memetakan kesiapan awal peserta didik sebelum memasuki materi baru.',
        teknik: 'Tanya jawab interaktif / Pertanyaan pemantik lisan / Polling cepat kartu respons.',
        contohSoalTugas: `"Apa yang terlintas di pikiran kalian ketika mendengar istilah ${input.topic}?" dan "Sebutkan satu contoh peristiwa terkait di sekitar lingkungan sekolah!"`,
        penyesuaianPembelajaran: 'Hasil asesmen awal digunakan untuk mengelompokkan siswa secara heterogen dan menentukan kadar bimbingan guru.'
      },
      asesmenFormatif: {
        teknik: 'Observasi keaktifan diskusi, penilaian kinerja LKPD kelompok, dan penilaian diri antarteman.',
        waktuPelaksanaan: 'Dilaksanakan sepanjang proses kegiatan inti saat penyelidikan kelompok berlangsung.',
        indikator: 'Keterlibatan aktif dalam tim, ketepatan data investigasi, dan kemampuan berargumentasi logis.',
        instrumen: 'Lembar observasi lembar kerja kelompok dan rubrik unjuk kerja.',
        kriteriaKeberhasilan: 'Minimal 80% kelompok mampu menyelesaikan seluruh tahapan tugas pada LKPD dengan tepat waktu.',
        bentukUmpanBalik: 'Umpan balik langsung lisan (*immediate actionable feedback*) dari guru saat berkeliling ke meja kelompok.'
      },
      asesmenSumatif: {
        bentuk: 'Tes Tertulis Soal HOTS Pilihan Ganda & Analisis Studi Kasus Singkat.',
        deskripsiTugasSoal: `Peserta didik mengerjakan 5 butir soal pemahaman dan analisis masalah kontekstual materi ${input.topic}.`,
        kunciAtauKriteria: 'Kunci jawaban objektif disertai rubrik penilaian pemikiran kritis untuk soal uraian/kasus.'
      },
      rubrikPenilaian: [
        {
          aspek: 'Pemahaman Konsep',
          indikator: `Kemampuan menjelaskan fakta dan prinsip materi ${input.topic}.`,
          skala1: 'Belum mampu menjelaskan konsep, terdapat banyak miskonsepsi mendasar.',
          skala2: 'Mampu menjelaskan sebagian kecil konsep dasar namun belum terstruktur.',
          skala3: 'Mampu menjelaskan konsep secara tepat dan lengkap sesuai indikator materi.',
          skala4: 'Sangat menguasai konsep, mampu mengaitkannya dengan fenomena baru secara analitis.'
        },
        {
          aspek: 'Keterampilan Menyelidiki',
          indikator: 'Ketepatan mengumpulkan data dan menjawab persoalan pada LKPD.',
          skala1: 'Tidak mengumpulkan data atau data yang dicatat tidak relevan dengan tugas.',
          skala2: 'Mengumpulkan data namun analisis data kurang lengkap dan terburu-buru.',
          skala3: 'Mengumpulkan dan mengolah data LKPD secara runtut dan sistematis.',
          skala4: 'Data sangat akurat, analisis mendalam, serta mampu menyajikan alternatif solusi orisinal.'
        },
        {
          aspek: 'Kolaborasi & Komunikasi',
          indikator: 'Kemampuan berdiskusi aktif dan mempresentasikan karya kelompok.',
          skala1: 'Pasif dalam kelompok dan enggan berkontribusi pada penyelesaian tugas.',
          skala2: 'Kurang aktif berbagi tugas, hanya mengikuti arahan teman tanpa inisiatif.',
          skala3: 'Bekerja sama dengan baik, menghargai pendapat rekan, dan aktif berbicara.',
          skala4: 'Menjadi teladan kolaborasi, memfasilitasi dialog positif, dan presentasi sangat artikulatif.'
        }
      ],
      pengolahanDanTindakLanjut: {
        remedial: 'Bagi peserta didik yang belum mencapai kriteria ketuntasan tujuan, diberikan bimbingan perorangan atau tutor sebaya menggunakan rangkuman infografis sederhana.',
        pengayaan: 'Bagi peserta didik dengan capaian tinggi, diberikan tantangan analisis studi kasus lanjutan atau perancangan game kuis edukasi untuk rekan sekelas.',
        umpanBalik: 'Umpan balik tertulis disampaikan pada lembar LKPD yang dikumpulkan dengan catatan penguatan motivasi positif.',
        refleksiGuru: 'Guru mencatat apakah alokasi waktu mencukupi dan apakah pendekatan pedagogis yang dipilih berhasil meningkatkan keterlibatan siswa.'
      }
    },
    alatDanSumberBelajar: {
      alatDanBahan: [
        'Papan tulis dan spidol warna',
        'Lembar Kerja Peserta Didik (LKPD)',
        'Alat tulis dan kertas plano / sticky notes untuk presentasi kelompok'
      ],
      mediaPembelajaran: [
        `Slide presentasi visual materi ${input.topic}`,
        'Video animasi / demonstrasi fenomena kontekstual',
        'Kuis interaktif digital GURITA'
      ],
      bukuReferensi: [
        `Buku Panduan Guru & Siswa ${input.subject} SMP Kelas 7/8/9 - Kemendikbudristek`,
        'Bahan ajar pengayaan yang relevan dan telah diverifikasi guru'
      ],
      sumberDigital: [
        'Platform Rumah Belajar / PMM Kemendikbudristek',
        'Google Arts & Culture / Simulasi Sains Edukatif'
      ],
      perangkatDibutuhkan: [
        'Laptop guru dan proyektor kelas',
        'Gawai peserta didik (opsional untuk aktivitas kuis interaktif)'
      ],
      alternatifLuring: 'Jika fasilitas proyektor atau internet terkendala, seluruh materi visual disajikan melalui kartu gambar cetak dan lembar kerja fisik tanpa mengurangi esensi pembelajaran.',
      catatanVerifikasi: 'Seluruh tautan dan referensi buku wajib diverifikasi kembali ketersediaannya di perpustakaan sekolah sebelum kelas dimulai.'
    },
    refleksi: {
      refleksiPesertaDidik: [
        'Bagian mana dari pembelajaran hari ini yang paling menyenangkan dan mudah dipahami?',
        'Konsep apa yang masih terasa membingungkan atau membutuhkan penjelasan lebih lanjut?',
        'Apa langkah nyata yang akan saya lakukan untuk menerapkan pemahaman ini di kehidupan sehari-hari?'
      ],
      refleksiGuru: [
        `Apakah tujuan pembelajaran topik ${input.topic} tercapai oleh minimal 85% peserta didik?`,
        `Bagian sintaks ${chosenPedagogy} manakah yang berjalan paling efektif dan bagian mana yang membutuhkan perbaikan waktu?`,
        'Apakah peserta didik yang memerlukan perhatian khusus (scaffolding) sudah terfasilitasi dengan baik?'
      ]
    },
    pengesahan: {
      kotaDanTanggal: `Ditetapkan di sekolah, ${todayStr}`,
      namaKepalaSekolah: input.principalName,
      namaPenyusun: input.teacherName
    }
  };
}
