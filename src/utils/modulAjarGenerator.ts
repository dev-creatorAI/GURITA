import { ModulAjarFormInput, ModulAjarDocument, LearningStepRow } from '../types';
import { classifySubject, SubjectAwareAnalysis } from './subjectClassifier';

export function generateCompleteModulAjar(input: ModulAjarFormInput): ModulAjarDocument {
  const chosenPedagogy =
    input.pedagogicalPractice === 'Lainnya' && input.customPedagogicalPractice
      ? input.customPedagogicalPractice
      : input.pedagogicalPractice;

  // Run Subject-Aware Analysis
  const analysis: SubjectAwareAnalysis = classifySubject(
    input.subject,
    input.materi,
    input.topic,
    `${input.learningOutcomeCP} ${input.element} ${input.studentCharacteristics || ''}`
  );

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
    if (input.timeAllocation.toLowerCase().includes('jp')) {
      parsedMinutes = rawVal * 40;
    } else {
      parsedMinutes = rawVal >= 30 ? rawVal : rawVal * 40;
    }
  }

  const initialMinutes = Math.round(parsedMinutes * 0.15);
  const closingMinutes = Math.round(parsedMinutes * 0.15);
  const coreMinutes = parsedMinutes - initialMinutes - closingMinutes;

  // Build Table Rows for Langkah Pembelajaran with Subject-Aware Depth
  const apersepsiFocus = analysis.isQuantitative
    ? `Apersepsi Numerasi & Motivasi Kontekstual: Guru menghubungkan fenomena nyata dengan kebutuhan kalkulasi atau pemodelan simbolis "${input.topic}". Menampilkan pertanyaan pemantik pemodelan: "Bagaimana besaran atau pola ini dapat kita hitung dan buktikan secara terukur?". Guru menyampaikan tujuan pembelajaran dan alur aktivitas perhitungan.`
    : `Apersepsi Konseptual & Motivasi: Guru menghubungkan materi sebelumnya dengan topik "${input.topic}". Menampilkan pertanyaan pemantik eksploratif: "Bagaimana prinsip ini memengaruhi kehidupan atau karya kreatif kita?". Menyampaikan tujuan pembelajaran yang akan dicapai.`;

  const stepsAwal: LearningStepRow[] = [
    {
      activity: 'Orientasi & Pengondisian Kelas: Guru menyapa peserta didik dengan hangat, memimpin doa bersama, memeriksa presensi kehadiran, serta membangun suasana kelas yang riang dan siap belajar.',
      timeAllocation: `${Math.round(initialMinutes * 0.4)} Menit`,
      principle: 'Berkesadaran',
      learningExperience: 'Memahami',
      learningResources: 'Buku Jurnal Guru, Tata Tertib Kelas'
    },
    {
      activity: apersepsiFocus,
      timeAllocation: `${Math.round(initialMinutes * 0.6)} Menit`,
      principle: 'Bermakna',
      learningExperience: 'Memahami',
      learningResources: analysis.isQuantitative
        ? 'Media Presentasi Rumus / Lembar Data Apersepsi Numerasi'
        : 'Media Visual Presentasi / Gambar Pemantik Konseptual'
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

    let specificActivity = `${stx.tahapan}: ${stx.deskripsi}`;

    if (analysis.isQuantitative) {
      if (idx === 0) {
        specificActivity += ` Guru memaparkan pemaknaan simbol, variabel, dan rumus dasar materi ${input.topic}. Siswa mengidentifikasi besaran yang diketahui dan ditanyakan.`;
      } else if (idx === 1) {
        specificActivity += ` Siswa berdiskusi dalam kelompok merancang strategi perhitungan bertahap, membagi peran pencatatan data pada tabel kerja, dan memilih rumus yang tepat.`;
      } else if (idx === 2) {
        specificActivity += ` Siswa melakukan substitusi angka ke dalam persamaan, mengeksekusi perhitungan matematika/data secara teliti, serta saling memverifikasi hasil kalkulasi antarteman sekelompok.`;
      } else if (idx === 3) {
        specificActivity += ` Kelompok menyajikan lembar penyelesaian masalah, memaparkan langkah kalkulasi di depan kelas, dan membuktikan konsistensi satuan atau hasil hitungan.`;
      } else {
        specificActivity += ` Guru dan siswa mengevaluasi ketepatan alur perhitungan, memvalidasi hasil akhir, dan merangkum prinsip matematis/ilmiah yang mendasarinya.`;
      }
    } else if (analysis.domain === 'HUMANITIES_ARTS_LANGUAGE') {
      if (idx === 0) {
        specificActivity += ` Guru menampilkan studi visual materi ${input.topic} (contoh karya, anatomi desain, atau teks sastra) untuk membedah prinsip estetika dan pesan komunikasi.`;
      } else if (idx === 1) {
        specificActivity += ` Siswa mengorganisasikan eksplorasi kreatif, memetakan hierarki elemen (focal point, kontras, ritme), dan merancang sketsa/draf karya.`;
      } else if (idx === 2) {
        specificActivity += ` Siswa mengeksekusi pembuatan karya/analisis teks secara kolaboratif dengan memperhatikan keselarasan komposisi dan keterbacaan pesan.`;
      } else if (idx === 3) {
        specificActivity += ` Pameran karya mini (Gallery Walk) atau presentasi apresiasi, di mana siswa mengomunikasikan makna estetik dan gagasan di balik karya mereka.`;
      } else {
        specificActivity += ` Evaluasi bersama terhadap nilai rasa, kesesuaian pesan, dan refleksi pengalaman berkreasi tanpa dipaksakan menjadi hitungan numerik.`;
      }
    } else {
      specificActivity += ` Guru memfasilitasi aktivitas kelompok, membagikan LKPD, serta memberikan scaffolding bagi peserta didik yang memerlukan bimbingan tambahan. Peserta didik berdiskusi aktif menyelesaikan lembar kerja.`;
    }

    return {
      activity: specificActivity,
      timeAllocation: `${corePerPhase} Menit`,
      principle: idx % 2 === 0 ? 'Bermakna' : 'Menggembirakan',
      learningExperience: exp,
      learningResources: analysis.isQuantitative
        ? 'LKPD Berbasis Kasus Numerik, Kalkulator / Lembar Kerja Data, Papan Tulis Rumus'
        : 'LKPD Eksploratif, Alat Peraga / Media Visual Kreatif'
    };
  });

  const stepsPenutup: LearningStepRow[] = [
    {
      activity: analysis.isQuantitative
        ? 'Penyimpulan Bersama & Refleksi Perhitungan: Guru bersama peserta didik merangkum rumus kunci, langkah penyelesaian esensial, dan jebakan miskonsepsi perhitungan yang perlu dihindari.'
        : 'Penyimpulan Bersama & Refleksi Belajar: Guru bersama peserta didik merangkum poin-poin kunci materi yang telah dipelajari. Peserta didik menyampaikan refleksi singkat: apa hal baru yang dipahami dan bagian mana yang paling menarik.',
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

  // Subject-aware learning goals
  const goalsMemahami = analysis.isQuantitative
    ? [
        `Peserta didik dapat mengidentifikasi konsep dasar, notasi simbol, dan variabel matematis/ilmiah pada topik "${input.topic}" secara tepat.`,
        `Peserta didik dapat menjelaskan hubungan antarrumus dan makna fisis/ekonomis/logika dari persamaan yang digunakan.`
      ]
    : [
        `Peserta didik dapat mengidentifikasi dan menjelaskan konsep inti materi "${input.topic}" dengan bahasa sendiri secara tepat.`
      ];

  const goalsMengaplikasi = analysis.isQuantitative
    ? [
        `Peserta didik dapat menerapkan rumus yang relevan untuk menyelesaikan masalah kontekstual bertahap, melakukan substitusi angka, dan menghasilkan kalkulasi yang akurat.`,
        `Peserta didik dapat menyusun dan membaca representasi data dalam bentuk tabel, grafik, atau diagram numerik yang terstruktur.`
      ]
    : [
        `Peserta didik dapat menerapkan prinsip "${input.topic}" untuk merancang karya kreatif, menganalisis studi kasus nyata, dan menyusun laporan kelompok secara komunikatif.`
      ];

  const goalsMerefleksi = analysis.isQuantitative
    ? [
        `Peserta didik dapat memverifikasi kembali ketepatan hasil perhitungan, memeriksa konsistensi satuan, serta merefleksikan efektivitas strategi penyelesaian masalah.`
      ]
    : [
        `Peserta didik dapat merefleksikan proses belajar, mengapresiasi keberagaman sudut pandang karya, dan merumuskan komitmen perbaikan mutu karya berikutnya.`
      ];

  // Subject-aware assessment details
  const sumatifDescription = analysis.workedExample
    ? `Tes Tertulis Penilaian Numerik & HOTS: Peserta didik menyelesaikan soal pemecahan masalah (contoh: "${analysis.workedExample.problemTitle}"), mencakup identifikasi besaran diketahui, perumusan langkah kalkulasi, penentuan jawaban akhir dengan satuan yang tepat.`
    : `Tes Tertulis / Penilaian Unjuk Kerja: Peserta didik menyelesaikan evaluasi pemahaman konsep dan penerapan materi ${input.topic}.`;

  const sumatifKunci = analysis.workedExample
    ? `Kunci Jawaban Objektif: Terlampir langkah penyelesaian matematis runtut (${analysis.workedExample.steps.length} langkah) dengan hasil akhir yang tervalidasi: ${analysis.workedExample.finalAnswer}`
    : 'Kunci jawaban objektif disertai rubrik penilaian komprehensif untuk soal uraian/kasus.';

  const miskonsepsiText = analysis.isQuantitative
    ? `Potensi kesalahan substitusi variabel rumus, kelalaian konversi satuan (misal km/jam ke m/s atau gram ke mol), serta kesalahan operasi tanda pada aljabar. Guru memberikan penekanan khusus pada verifikasi bertahap.`
    : analysis.domain === 'HUMANITIES_ARTS_LANGUAGE'
    ? `Potensi menyamakan tipografi hanya sebagai pemilihan jenis huruf tanpa memperhatikan hierarki legibilitas, jarak spasi (kerning/tracking), dan kontras warna latar.`
    : `Potensi menyamakan pemahaman konsep ${input.topic} dengan asumsi intuitif yang keliru. Guru meluruskan pemahaman melalui bukti penyelidikan nyata.`;

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
        pengetahuanAwal: input.priorKnowledge || `Sebagian besar peserta didik telah mengenal konsep dasar terkait topik ${input.topic} dalam kehidupan sehari-hari, namun memerlukan bimbingan dalam memformalkan konsep ke dalam bentuk representasi terstruktur.`,
        minatDanMotivasi: 'Memiliki antusiasme tinggi terhadap aktivitas pembelajaran interaktif berbasis visual, media digital, dan kerja kelompok kolaboratif.',
        kesiapanBelajar: 'Terdapat variasi kesiapan belajar: 30% membutuhkan bimbingan bertahap (scaffolding konseptual/numerik), 50% mampu bekerja mandiri secara reguler, dan 20% siap untuk tantangan pengayaan.',
        kebutuhanBelajar: input.specialLearningNeeds || (analysis.isQuantitative
          ? 'Memerlukan lembar kerja bertahap (step-by-step math scaffolding), contoh soal terbimbing, dan manipulasi alat peraga / visualisasi grafik.'
          : 'Memerlukan lembar kerja visual dan analogi konkret yang mengaitkan teori dengan realitas lingkungan siswa.'),
        potensiMiskonsepsi: miskonsepsiText,
        dukunganDanDiferensiasi: 'Diferensiasi konten disajikan melalui variasi tingkat kesulitan soal/teks; diferensiasi proses melalui bimbingan intensif bagi kelompok yang membutuhkan.',
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
        relevansiKehidupanNyata: `Pemahaman materi ${input.topic} sangat penting bagi peserta didik untuk memecahkan masalah praktis sehari-hari, menumbuhkan nalar kritis, dan memahami fenomena nyata di sekitar mereka.`
      },
      dimensiProfilLulusan: [
        {
          dimensi: 'Penalaran Kritis',
          alasanRelevansi: analysis.isQuantitative
            ? 'Peserta didik menganalisis data numerik, menerapkan rumus matematis/ilmiah, dan memverifikasi kebenaran perhitungan logis.'
            : 'Peserta didik dituntut untuk menganalisis data, membedakan fakta dan opini, serta memecahkan masalah kontekstual.',
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
      lintasDisiplinIlmu: analysis.isQuantitative
        ? `Topik ${input.topic} memadukan literasi numerasi tingkat tinggi (pengolahan rumus, statistika, satuan pengukuran) dengan literasi sains/teknologi serta kemampuan komunikasi verbal.`
        : `Topik ${input.topic} memiliki keterkaitan erat dengan literasi Bahasa Indonesia, estetika seni rupa/desain, dan wawasan sosial budaya.`,
      tujuanPembelajaran: {
        memahami: goalsMemahami,
        mengaplikasi: goalsMengaplikasi,
        merefleksi: goalsMerefleksi
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
        teknik: analysis.isQuantitative
          ? 'Kuis diagnostik singkat 3 soal prasyarat hitung / Polling konsep rumus awal.'
          : 'Tanya jawab interaktif / Pertanyaan pemantik lisan / Polling cepat kartu respons.',
        contohSoalTugas: analysis.isQuantitative
          ? `"Sebutkan rumus atau variabel yang kalian ketahui untuk menghitung ${input.topic}!" dan "Bagaimana cara menentukan satuannya?"`
          : `"Apa yang terlintas di pikiran kalian ketika mendengar istilah ${input.topic}?" dan "Sebutkan satu contoh peristiwa terkait di sekitar lingkungan sekolah!"`,
        penyesuaianPembelajaran: 'Hasil asesmen awal digunakan untuk mengelompokkan siswa secara heterogen dan menentukan kadar bimbingan guru.'
      },
      asesmenFormatif: {
        teknik: 'Observasi keaktifan diskusi, penilaian kinerja LKPD kelompok, dan penilaian diri antarteman.',
        waktuPelaksanaan: 'Dilaksanakan sepanjang proses kegiatan inti saat penyelidikan kelompok berlangsung.',
        indikator: analysis.isQuantitative
          ? 'Ketepatan identifikasi variabel rumus, ketelitian substitusi angka, dan konsistensi penulisan satuan.'
          : 'Keterlibatan aktif dalam tim, ketepatan data investigasi, dan kemampuan berargumentasi logis.',
        instrumen: 'Lembar observasi lembar kerja kelompok dan rubrik unjuk kerja.',
        kriteriaKeberhasilan: 'Minimal 80% kelompok mampu menyelesaikan seluruh tahapan tugas pada LKPD dengan tepat waktu.',
        bentukUmpanBalik: 'Umpan balik langsung lisan (*immediate actionable feedback*) dari guru saat berkeliling ke meja kelompok.'
      },
      asesmenSumatif: {
        bentuk: 'Tes Tertulis Soal HOTS Pilihan Ganda & Analisis Studi Kasus Singkat.',
        deskripsiTugasSoal: sumatifDescription,
        kunciAtauKriteria: sumatifKunci
      },
      rubrikPenilaian: [
        {
          aspek: analysis.isQuantitative ? 'Pemahaman Konsep & Rumus' : 'Pemahaman Konsep',
          indikator: analysis.isQuantitative
            ? `Kemampuan menjelaskan variabel, prinsip, dan korelasi matematis materi ${input.topic}.`
            : `Kemampuan menjelaskan fakta dan prinsip materi ${input.topic}.`,
          skala1: 'Belum mampu menjelaskan konsep, terdapat banyak miskonsepsi mendasar.',
          skala2: 'Mampu menjelaskan sebagian kecil konsep dasar namun belum terstruktur.',
          skala3: 'Mampu menjelaskan konsep dan rumus secara tepat dan lengkap.',
          skala4: 'Sangat menguasai konsep, mampu mengaitkannya dengan fenomena baru secara analitis.'
        },
        {
          aspek: analysis.isQuantitative ? 'Keterampilan Kalkulasi & Notasi' : 'Keterampilan Menyelidiki',
          indikator: analysis.isQuantitative
            ? 'Ketepatan substitusi angka ke rumus, langkah penyelesaian bertahap, dan konsistensi satuan.'
            : 'Ketepatan mengumpulkan data dan menjawab persoalan pada LKPD.',
          skala1: 'Perhitungan tidak tepat, langkah acak, dan satuan tidak dituliskan.',
          skala2: 'Mengetahui rumus tetapi sering keliru dalam eksekusi perhitungan angka.',
          skala3: 'Langkah perhitungan runtut, hasil hitungan tepat, dan satuan konsisten.',
          skala4: 'Kalkulasi sangat cepat dan akurat, mampu memeriksa ulang (self-check), serta menyajikan pembuktian alternatif.'
        },
        {
          aspek: 'Kolaborasi & Komunikasi',
          indikator: 'Kemampuan berdiskusi aktif dan mempresentasikan karya/solusi kelompok.',
          skala1: 'Pasif dalam kelompok dan enggan berkontribusi pada penyelesaian tugas.',
          skala2: 'Kurang aktif berbagi tugas, hanya mengikuti arahan teman tanpa inisiatif.',
          skala3: 'Bekerja sama dengan baik, menghargai pendapat rekan, dan aktif berbicara.',
          skala4: 'Menjadi teladan kolaborasi, memfasilitasi dialog positif, dan presentasi sangat artikulatif.'
        }
      ],
      pengolahanDanTindakLanjut: {
        remedial: analysis.isQuantitative
          ? 'Bagi peserta didik yang belum tuntas, diberikan lembar latihan terbimbing (scaffolded worksheet) dengan panduan substitusi angka langkah demi langkah.'
          : 'Bagi peserta didik yang belum mencapai kriteria ketuntasan tujuan, diberikan bimbingan perorangan atau tutor sebaya menggunakan rangkuman infografis sederhana.',
        pengayaan: analysis.isQuantitative
          ? 'Bagi peserta didik yang telah mencapai nilai maksimal, diberikan soal HOTS tingkat lanjut (multi-step problem solving) atau proyek kalkulasi data nyata.'
          : 'Bagi peserta didik dengan capaian tinggi, diberikan tantangan analisis studi kasus lanjutan atau perancangan game kuis edukasi untuk rekan sekelas.',
        umpanBalik: 'Umpan balik tertulis disampaikan pada lembar LKPD yang dikumpulkan dengan catatan penguatan motivasi positif.',
        refleksiGuru: 'Guru mencatat apakah alokasi waktu mencukupi dan apakah pendekatan pedagogis yang dipilih berhasil meningkatkan keterlibatan siswa.'
      }
    },
    alatDanSumberBelajar: {
      alatDanBahan: [
        'Papan tulis dan spidol warna',
        'Lembar Kerja Peserta Didik (LKPD)',
        analysis.isQuantitative
          ? 'Kalkulator / Alat Ukur / Tabel Referensi Rumus'
          : 'Alat tulis dan kertas plano / sticky notes untuk presentasi kelompok'
      ],
      mediaPembelajaran: [
        `Slide presentasi visual materi ${input.topic}`,
        analysis.isQuantitative
          ? 'Grafik animasi interaktif / Simulasi model numerik digital'
          : 'Video animasi / demonstrasi fenomena kontekstual',
        'Kuis interaktif digital GURITA'
      ],
      bukuReferensi: [
        `Buku Panduan Guru & Siswa ${input.subject} - Kemendikbudristek`,
        'Bahan ajar pengayaan yang relevan dan telah diverifikasi guru'
      ],
      sumberDigital: [
        'Platform Rumah Belajar / PMM Kemendikbudristek',
        analysis.isQuantitative
          ? 'Simulasi Sains & Matematika (PhET Interactive Simulations / GeoGebra)'
          : 'Google Arts & Culture / Simulasi Sains Edukatif'
      ],
      perangkatDibutuhkan: ['Laptop / Proyektor Kelas', 'Perangkat smartphone / tablet siswa (opsional)'],
      alternatifLuring: 'Jika fasilitas digital terbatas, LKPD dan tabel data disediakan dalam format lembar cetak dengan manipulasi alat peraga nyata.',
      catatanVerifikasi: 'Modul ini telah diverifikasi memenuhi kaidah Kurikulum Merdeka dan kaidah keilmuan yang akurat.'
    },
    refleksi: {
      refleksiPesertaDidik: analysis.isQuantitative
        ? [
            'Apakah saya sudah memahami makna setiap simbol dan variabel dalam rumus yang dipelajari?',
            'Langkah perhitungan mana yang paling menantang dan bagaimana cara saya memastikannya benar?',
            'Bagaimana rumus atau konsep ini dapat saya manfaatkan dalam memecahkan masalah sehari-hari?'
          ]
        : [
            'Apa hal paling berharga dan menarik yang saya pelajari hari ini?',
            'Tantangan apa yang saya hadapi saat bekerja dalam kelompok dan bagaimana kami mengatasinya?',
            'Apa ide kreatif yang ingin saya kembangkan lebih lanjut dari materi ini?'
          ],
      refleksiGuru: [
        'Apakah pendekatan pembelajaran yang dipilih memicu keaktifan seluruh peserta didik?',
        'Apakah terdapat miskonsepsi atau kendala perhitungan yang perlu ditekankan ulang pada pertemuan berikutnya?',
        'Bagaimana saya dapat meningkatkan diferensiasi bimbingan agar seluruh peserta didik mencapai tujuan pembelajaran?'
      ]
    },
    pengesahan: {
      kotaDanTanggal: `Jakarta, ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}`,
      namaKepalaSekolah: input.principalName,
      namaPenyusun: input.teacherName
    },
    // Attach deep Subject-Aware Knowledge
    subjectAwareAnalysis: analysis
  };
}
