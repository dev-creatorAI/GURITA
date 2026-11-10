import { ModulAjarFormInput, ModulAjarDocument, LearningStepRow } from '../types';
import { classifySubject, SubjectAwareAnalysis } from './subjectClassifier';
import { buildDynamicIdentifikasiPesertaDidik } from './identifikasiPesertaDidikGenerator';

/**
 * Dynamic selector for Profil Lulusan dimensions based on the 8 official dimensions:
 * 1. Keimanan dan ketakwaan terhadap Tuhan Yang Maha Esa
 * 2. Kewargaan
 * 3. Penalaran kritis
 * 4. Kreativitas
 * 5. Kolaborasi
 * 6. Kemandirian
 * 7. Kesehatan
 * 8. Komunikasi
 */
function selectRelevantProfilLulusan(
  subject: string,
  topic: string,
  analysis: SubjectAwareAnalysis
): Array<{ dimensi: string; alasanRelevansi: string; perilakuTeramati: string }> {
  const combined = `${subject} ${topic}`.toLowerCase();
  const selected: Array<{ dimensi: string; alasanRelevansi: string; perilakuTeramati: string }> = [];

  // 1. Keimanan dan ketakwaan terhadap Tuhan Yang Maha Esa
  if (
    combined.includes('agama') ||
    combined.includes('budi pekerti') ||
    combined.includes('akhlak') ||
    combined.includes('moral') ||
    combined.includes('pancasila')
  ) {
    selected.push({
      dimensi: 'Keimanan dan ketakwaan terhadap Tuhan Yang Maha Esa',
      alasanRelevansi:
        'Membimbing peserta didik menghayati nilai ketuhanan, mensyukuri keteraturan alam semesta, dan menginternalisasi integritas moral.',
      perilakuTeramati:
        'Mengawali dan mengakhiri kegiatan belajar dengan doa, menunjukkan kejujuran akademik, dan memperlakukan sesama dengan welas asih.'
    });
  }

  // 2. Kewargaan
  if (
    combined.includes('pancasila') ||
    combined.includes('ppkn') ||
    combined.includes('kewarganegaraan') ||
    combined.includes('sejarah') ||
    combined.includes('sosiologi') ||
    combined.includes('hukum') ||
    combined.includes('sosial')
  ) {
    selected.push({
      dimensi: 'Kewargaan',
      alasanRelevansi:
        'Membangun kesadaran hak dan kewajiban warga negara yang demokratis, menghargai keberagaman, dan berkontribusi bagi masyarakat.',
      perilakuTeramati:
        'Berpartisipasi aktif dalam dialog musyawarah, menghormati perbedaan pendapat kelompok, dan mematuhi kesepakatan bersama.'
    });
  }

  // 3. Penalaran Kritis
  if (
    analysis.isQuantitative ||
    combined.includes('matematika') ||
    combined.includes('fisika') ||
    combined.includes('kimia') ||
    combined.includes('ekonomi') ||
    combined.includes('informatika') ||
    combined.includes('analisis') ||
    combined.includes('kritis')
  ) {
    selected.push({
      dimensi: 'Penalaran kritis',
      alasanRelevansi: analysis.isQuantitative
        ? 'Peserta didik mengolah data numerik, menerapkan rumus matematis/ilmiah secara presisi, serta memverifikasi pembuktian logis.'
        : 'Peserta didik menganalisis struktur wacana, mengevaluasi pilihan solusi, serta membedakan fakta dan asumsi secara objektif.',
      perilakuTeramati:
        'Mengajukan pertanyaan mendalam, memvalidasi sumber data atau langkah perhitungan, dan merumuskan kesimpulan berbasis bukti empiris.'
    });
  }

  // 4. Kreativitas
  if (
    combined.includes('dkv') ||
    combined.includes('tipografi') ||
    combined.includes('seni') ||
    combined.includes('desain') ||
    combined.includes('karya') ||
    combined.includes('menulis') ||
    combined.includes('proyek') ||
    combined.includes('kreatif')
  ) {
    selected.push({
      dimensi: 'Kreativitas',
      alasanRelevansi:
        'Mendorong peserta didik memunculkan gagasan orisinal, mengeksplorasi media ekspresi visual/verbal, dan menghasilkan karya inovatif.',
      perilakuTeramati:
        'Merancang karya unik dengan sentuhan estetis yang komunikatif dan berani mencoba alternatif solusi yang belum umum.'
    });
  }

  // 5. Kesehatan
  if (
    combined.includes('pjok') ||
    combined.includes('olahraga') ||
    combined.includes('jasmani') ||
    combined.includes('kesehatan') ||
    combined.includes('biologi') ||
    combined.includes('gizi')
  ) {
    selected.push({
      dimensi: 'Kesehatan',
      alasanRelevansi:
        'Menanamkan kesadaran pentingnya menjaga kebugaran jasmani, kesehatan mental, dan gaya hidup aktif seimbang.',
      perilakuTeramati:
        'Mempraktikkan gerak dan postur yang aman, menjaga keselamatan diri saat beraktivitas, serta mengelola stres belajar.'
    });
  }

  // 6. Komunikasi
  if (
    combined.includes('bahasa') ||
    combined.includes('sastra') ||
    combined.includes('inggris') ||
    combined.includes('indonesia') ||
    combined.includes('presentasi') ||
    combined.includes('komunikasi') ||
    combined.includes('teks')
  ) {
    selected.push({
      dimensi: 'Komunikasi',
      alasanRelevansi:
        'Mengasah kemahiran menyimak, berbicara, membaca, dan menulis secara terstruktur, santun, dan efektif di hadapan publik.',
      perilakuTeramati:
        'Menyampaikan ide dengan intonasi jelas dan kosakata baku, mendengarkan secara aktif, serta merespons tanggapan audiens dengan santun.'
    });
  }

  // Fallbacks: Ensure 2 to 3 dimensions from the 8 official dimensions
  if (selected.length < 2) {
    selected.push({
      dimensi: 'Kolaborasi',
      alasanRelevansi:
        'Aktivitas pembelajaran mendalam dirancang berbasis kerja tim untuk membangun sinergi dan kemampuan saling melengkapi peran.',
      perilakuTeramati:
        'Berbagi tugas secara adil dalam kelompok, menghargai kontribusi rekan, dan bekerja sama menyelesaikan lembar kerja bersama.'
    });
  }

  if (selected.length < 3) {
    selected.push({
      dimensi: 'Kemandirian',
      alasanRelevansi:
        'Peserta didik memiliki prakarsa belajar mandiri dan bertanggung jawab penuh atas perencanaan waktu serta kualitas hasil belajarnya.',
      perilakuTeramati:
        'Menuntaskan tugas tepat waktu tanpa bergantung terus-menerus pada guru dan melakukan evaluasi diri secara berkesadaran.'
    });
  }

  return selected.slice(0, 3);
}

/**
 * Generate a complete, highly contextual Rencana Pembelajaran Mendalam (Modul Ajar Deep Learning)
 */
export function generateCompleteModulAjar(input: ModulAjarFormInput): ModulAjarDocument {
  const chosenPedagogy =
    input.pedagogicalPractice === 'Lainnya' && input.customPedagogicalPractice
      ? input.customPedagogicalPractice
      : input.pedagogicalPractice;

  // Run Context-Aware Subject Classifier
  const analysis: SubjectAwareAnalysis = classifySubject(
    input.subject,
    input.materi,
    input.topic,
    `${input.learningOutcomeCP} ${input.element} ${input.studentCharacteristics || ''}`
  );

  // Time parsing: ensure total minutes sum accurately
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

  // Derive model syntax based on chosen pedagogical practice
  let syntaxList: Array<{
    tahapan: string;
    tindakanGuru: string;
    aktivitasSiswa: string;
    pengalaman: 'Memahami' | 'Mengaplikasi' | 'Merefleksi';
    prinsip: 'Berkesadaran' | 'Bermakna' | 'Menggembirakan';
  }> = [];

  if (chosenPedagogy.includes('PBL') || chosenPedagogy.includes('Problem Based')) {
    syntaxList = [
      {
        tahapan: 'Fase 1: Orientasi Siswa pada Masalah',
        tindakanGuru: `Guru menampilkan stimulus kontekstual materi ${input.topic} (studi fenomena nyata / kasus otentik) dan memantik rasa ingin tahu siswa dengan pertanyaan mendalam.`,
        aktivitasSiswa: `Siswa mengamati tayangan stimulus, mencatat fakta-fakta kunci, dan mengidentifikasi rumusan masalah utama yang harus dipecahkan.`,
        pengalaman: 'Memahami',
        prinsip: 'Bermakna'
      },
      {
        tahapan: 'Fase 2: Mengorganisasi Siswa untuk Belajar',
        tindakanGuru: `Guru membagi siswa ke dalam kelompok heterogen (3–4 orang), membagikan LKPD terstruktur, dan memastikan setiap anggota memahami peran kolaboratifnya.`,
        aktivitasSiswa: `Siswa bergabung dalam kelompok, menentukan pembagian peran, dan menyusun rencana pembagian kerja eksplorasi data.`,
        pengalaman: 'Memahami',
        prinsip: 'Berkesadaran'
      },
      {
        tahapan: 'Fase 3: Membimbing Penyelidikan Mandiri & Kelompok',
        tindakanGuru: analysis.isQuantitative
          ? `Guru memfasilitasi substitusi rumus ke lembar kerja numerik, berkeliling memberikan scaffolding bagi siswa yang kesulitan kalkulasi, dan mengingatkan konsistensi satuan SI.`
          : `Guru memfasilitasi eksplorasi referensi konseptual/visual, berkeliling mengamati dinamika diskusi, dan memancing penalaran kritis tanpa memberi jawaban langsung.`,
        aktivitasSiswa: analysis.isQuantitative
          ? `Siswa mengumpulkan data besaran yang diketahui, menerapkan rumus relevan, melakukan perhitungan bertahap, dan saling memverifikasi akurasi hasil hitungan rekan sekelompok.`
          : `Siswa menganalisis wacana/kasus/anatomi desain pada LKPD, menyusun argumen atau draf karya, dan mendiskusikan alternatif solusi pemecahan masalah.`,
        pengalaman: 'Mengaplikasi',
        prinsip: 'Bermakna'
      },
      {
        tahapan: 'Fase 4: Mengembangkan & Menyajikan Hasil Karya',
        tindakanGuru: `Guru mengelola sesi presentasi kelas yang suportif, meminta kelompok lain menyimak aktif, dan memberikan apresiasi positif pada setiap kelompok.`,
        aktivitasSiswa: `Perwakilan kelompok mempresentasikan hasil pemecahan masalah / draf karya di depan kelas, menjelaskan alasan logis di balik temuan mereka, dan menjawab pertanyaan audiens.`,
        pengalaman: 'Mengaplikasi',
        prinsip: 'Menggembirakan'
      },
      {
        tahapan: 'Fase 5: Menganalisis & Mengevaluasi Proses Pemecahan Masalah',
        tindakanGuru: `Guru bersama siswa mengkaji efektivitas strategi yang digunakan, meluruskan potensi miskonsepsi, dan menguatkan konsep kunci pembelajaran.`,
        aktivitasSiswa: `Siswa mengevaluasi kelebihan dan kelemahan proses pemecahan masalah kelompoknya, mencatat umpan balik perbaikan, dan merumuskan kesimpulan akhir.`,
        pengalaman: 'Merefleksi',
        prinsip: 'Berkesadaran'
      }
    ];
  } else if (chosenPedagogy.includes('PjBL') || chosenPedagogy.includes('Project Based')) {
    syntaxList = [
      {
        tahapan: 'Fase 1: Penentuan Pertanyaan Mendasar',
        tindakanGuru: `Guru mengajukan pertanyaan pemantik kontekstual materi ${input.topic} yang menantang siswa untuk menghasilkan produk atau solusi nyata.`,
        aktivitasSiswa: `Siswa berdiskusi menanggapi pertanyaan pemantik dan menyepakati tema karya proyek yang akan dirancang.`,
        pengalaman: 'Memahami',
        prinsip: 'Bermakna'
      },
      {
        tahapan: 'Fase 2: Mendesain Perencanaan Proyek',
        tindakanGuru: `Guru memfasilitasi penyusunan proposal mini proyek, pembagian peran anggota, dan pemilihan alat/sumber belajar yang tepat.`,
        aktivitasSiswa: `Kelompok merancang langkah kerja proyek, menentukan alat bahan, dan membagi tanggung jawab tiap anggota secara adil.`,
        pengalaman: 'Memahami',
        prinsip: 'Berkesadaran'
      },
      {
        tahapan: 'Fase 3: Menyusun Jadwal Pembuatan (Timeline)',
        tindakanGuru: `Guru memvalidasi timeline pengerjaan agar alokasi waktu realistis dan terukur.`,
        aktivitasSiswa: `Siswa menetapkan batas waktu (milestone) penyelesaian tiap tahapan proyek.`,
        pengalaman: 'Mengaplikasi',
        prinsip: 'Berkesadaran'
      },
      {
        tahapan: 'Fase 4: Memonitor Keaktifan & Progres Proyek',
        tindakanGuru: `Guru memantau keterlibatan setiap siswa, membimbing kendala teknis, dan mencatat rubrik penilaian proses formatif.`,
        aktivitasSiswa: `Siswa mengeksekusi pembuatan produk/analisis secara tekun, mencatat progres, dan berkonsultasi jika ada kendala.`,
        pengalaman: 'Mengaplikasi',
        prinsip: 'Menggembirakan'
      },
      {
        tahapan: 'Fase 5: Menguji Hasil / Gelar Karya',
        tindakanGuru: `Guru memfasilitasi pameran mini karya (Gallery Walk) atau uji fungsi produk dengan rubrik objektif.`,
        aktivitasSiswa: `Siswa memamerkan produk karya kelompok, mendemonstrasikan fungsi atau pesan estetisnya, dan mengumpulkan umpan balik teman.`,
        pengalaman: 'Mengaplikasi',
        prinsip: 'Menggembirakan'
      },
      {
        tahapan: 'Fase 6: Evaluasi Pengalaman Belajar',
        tindakanGuru: `Guru membimbing refleksi bersama mengenai kebermaknaan proses proyek dan hal yang dapat ditingkatkan pada proyek mendatang.`,
        aktivitasSiswa: `Siswa mengungkapkan perasaan selama berkarya, mengidentifikasi pembelajaran paling berharga, dan menyusun komitmen perbaikan.`,
        pengalaman: 'Merefleksi',
        prinsip: 'Berkesadaran'
      }
    ];
  } else if (chosenPedagogy.includes('Discovery')) {
    syntaxList = [
      {
        tahapan: 'Tahap 1: Stimulation (Stimulasi & Pengamatan)',
        tindakanGuru: `Guru menyajikan media peraga atau contoh fenomena materi ${input.topic} tanpa memberikan kesimpulan materi secara langsung.`,
        aktivitasSiswa: `Siswa mengamati fenomena dengan penuh perhatian, mencatat keanehan atau pola menarik yang ditemukan.`,
        pengalaman: 'Memahami',
        prinsip: 'Menggembirakan'
      },
      {
        tahapan: 'Tahap 2: Problem Statement (Identifikasi Masalah)',
        tindakanGuru: `Guru memandu siswa merumuskan hipotesis atau dugaan sementara atas fenomena yang diobservasi.`,
        aktivitasSiswa: `Siswa merumuskan hipotesis pertanyaan penyelidikan dalam lembar kerja kelompok.`,
        pengalaman: 'Memahami',
        prinsip: 'Bermakna'
      },
      {
        tahapan: 'Tahap 3: Data Collection (Pengumpulan Data)',
        tindakanGuru: `Guru menyediakan sumber belajar dan membimbing teknik pengumpulan data yang valid dan sistematis.`,
        aktivitasSiswa: `Siswa mengumpulkan informasi, melakukan manipulasi peraga/data, dan mencatat temuan dalam tabel kerja.`,
        pengalaman: 'Mengaplikasi',
        prinsip: 'Berkesadaran'
      },
      {
        tahapan: 'Tahap 4: Data Processing (Pengolahan Data)',
        tindakanGuru: `Guru mendampingi siswa menghubungkan data hasil temuan dengan konsep materi inti.`,
        aktivitasSiswa: `Siswa mengklasifikasikan data, mengolah korelasi antarvariabel, dan menyusun pembuktian hipotesis.`,
        pengalaman: 'Mengaplikasi',
        prinsip: 'Bermakna'
      },
      {
        tahapan: 'Tahap 5: Verification (Pembuktian)',
        tindakanGuru: `Guru memfasilitasi konfrontasi hasil pengolahan data dengan teori rujukan yang sah.`,
        aktivitasSiswa: `Siswa memeriksa kembali kebenaran hipotesis awal berdasarkan data empiris yang telah diolah.`,
        pengalaman: 'Mengaplikasi',
        prinsip: 'Berkesadaran'
      },
      {
        tahapan: 'Tahap 6: Generalization (Menarik Kesimpulan)',
        tindakanGuru: `Guru memvalidasi rumusan konsep umum yang dihasilkan peserta didik serta merumuskan simpulan prinsip umum materi ${input.topic}.`,
        aktivitasSiswa: `Siswa merangkum prinsip umum materi dan menyampaikannya secara lisan di depan kelas.`,
        pengalaman: 'Merefleksi',
        prinsip: 'Bermakna'
      }
    ];
  } else if (chosenPedagogy.includes('Inquiry')) {
    syntaxList = [
      {
        tahapan: 'Tahap 1: Orientasi Penyelidikan',
        tindakanGuru: `Guru menciptakan iklim kelas yang responsif dan mengajukan masalah eksploratif terkait ${input.topic}.`,
        aktivitasSiswa: `Siswa menyimak masalah dan menetapkan fokus rasa ingin tahunya.`,
        pengalaman: 'Memahami',
        prinsip: 'Menggembirakan'
      },
      {
        tahapan: 'Tahap 2: Merumuskan Masalah',
        tindakanGuru: `Guru membimbing siswa menyusun pertanyaan penyelidikan yang terukur dan dapat diuji.`,
        aktivitasSiswa: `Siswa merumuskan pertanyaan penyelidikan mandiri dalam kelompok.`,
        pengalaman: 'Memahami',
        prinsip: 'Bermakna'
      },
      {
        tahapan: 'Tahap 3: Merumuskan Hipotesis',
        tindakanGuru: `Guru memvalidasi logika dugaan sementara siswa dan mengarahkan cara pengujian.`,
        aktivitasSiswa: `Siswa menyusun hipotesis logis berlandaskan pengetahuan awal yang dimiliki.`,
        pengalaman: 'Memahami',
        prinsip: 'Berkesadaran'
      },
      {
        tahapan: 'Tahap 4: Mengumpulkan & Menguji Data',
        tindakanGuru: `Guru memfasilitasi proses investigasi, memastikan keamanan dan objektivitas data.`,
        aktivitasSiswa: `Siswa melakukan eksperimen atau telaah pustaka serta mencatat bukti-bukti pengujian.`,
        pengalaman: 'Mengaplikasi',
        prinsip: 'Bermakna'
      },
      {
        tahapan: 'Tahap 5: Merumuskan Kesimpulan & Refleksi',
        tindakanGuru: `Guru memandu siswa menarik simpulan objektif dan merefleksikan nilai kejujuran ilmiah.`,
        aktivitasSiswa: `Siswa menyimpulkan temuan dan merefleksikan keakuratan langkah penyelidikan yang telah ditempuh.`,
        pengalaman: 'Merefleksi',
        prinsip: 'Berkesadaran'
      }
    ];
  } else {
    // Direct Instruction / Case Study / General Cooperative
    syntaxList = [
      {
        tahapan: 'Tahap 1: Orientasi Konsep & Pemodelan Terbimbing',
        tindakanGuru: `Guru memaparkan konsep esensial materi ${input.topic}, mendemonstrasikan contoh analisis/pemecahan masalah, dan mengecek pemahaman awal siswa.`,
        aktivitasSiswa: `Siswa menyimak pemodelan guru secara fokus, mengajukan pertanyaan klarifikasi, dan mencatat poin-poin kunci.`,
        pengalaman: 'Memahami',
        prinsip: 'Berkesadaran'
      },
      {
        tahapan: 'Tahap 2: Latihan Terbimbing (Guided Practice)',
        tindakanGuru: `Guru memberikan tugas latihan bertahap pada LKPD dan mendampingi kelompok saat mencoba memecahkan kasus pertama.`,
        aktivitasSiswa: `Siswa berdiskusi dalam kelompok menyelesaikan latihan kasus terbimbing dan mengonfirmasi langkah penyelesaian kepada guru.`,
        pengalaman: 'Mengaplikasi',
        prinsip: 'Bermakna'
      },
      {
        tahapan: 'Tahap 3: Praktik Mandiri & Kolaborasi Kasus Nyata',
        tindakanGuru: `Guru mengamati kemandirian siswa, memberikan tantangan kasus yang lebih bervariasi, dan mencatat rubrik unjuk kerja.`,
        aktivitasSiswa: `Siswa secara kolaboratif menyelesaikan tantangan kasus lanjutan dengan percaya diri dan mendokumentasikan hasilnya.`,
        pengalaman: 'Mengaplikasi',
        prinsip: 'Menggembirakan'
      },
      {
        tahapan: 'Tahap 4: Umpan Balik, Refleksi & Sintesis Konsep',
        tindakanGuru: `Guru memberikan umpan balik langsung (*actionable feedback*), merangkum benang merah materi, dan memimpin refleksi kelas.`,
        aktivitasSiswa: `Siswa menyimpulkan pembelajaran, mencatat hal baru yang telah dikuasai, dan merencanakan langkah tindak lanjut perbaikan diri.`,
        pengalaman: 'Merefleksi',
        prinsip: 'Berkesadaran'
      }
    ];
  }

  // Exact time budgeting: Pendahuluan (~15%), Penutup (~15%), Inti (sisanya)
  const pendahuluanMinutes = Math.max(10, Math.round(parsedMinutes * 0.15));
  const penutupMinutes = Math.max(10, Math.round(parsedMinutes * 0.15));
  const intiTotalMinutes = parsedMinutes - pendahuluanMinutes - penutupMinutes;

  // Split pendahuluan into 2 sub-activities
  const pend1Min = Math.round(pendahuluanMinutes * 0.4);
  const pend2Min = pendahuluanMinutes - pend1Min;

  // Split penutup into 2 sub-activities
  const pen1Min = Math.round(penutupMinutes * 0.5);
  const pen2Min = penutupMinutes - pen1Min;

  // Split inti across syntax phases with exact sum matching intiTotalMinutes
  const phaseBaseMin = Math.floor(intiTotalMinutes / syntaxList.length);
  const remainder = intiTotalMinutes - phaseBaseMin * syntaxList.length;

  const stepsAwal: LearningStepRow[] = [
    {
      activity: `Orientasi Berkesadaran & Pengondisian Kelas: Guru menyapa peserta didik dengan hangat, memimpin doa bersama dengan khidmat, memeriksa presensi kehadiran, serta mengajak siswa melakukan latihan hening sejenak (mindful breathing) untuk membangun kesiapan mental dan fokus belajar.`,
      timeAllocation: `${pend1Min} Menit`,
      principle: 'Berkesadaran',
      learningExperience: 'Memahami',
      learningResources: 'Buku Jurnal Guru, Tata Tertib Kelas'
    },
    {
      activity: analysis.isQuantitative
        ? `Apersepsi Numerasi & Pertanyaan Pemantik: Guru menghubungkan materi sebelumnya dengan kebutuhan pemodelan angka topik "${input.topic}". Guru mengajukan pertanyaan pemantik: "Bagaimana besaran ini dapat kita hitung dan buktikan secara akurat dalam kehidupan nyata?". Guru menyampaikan tujuan pembelajaran dan manfaat perhitungannya.`
        : `Apersepsi Kontekstual & Pertanyaan Pemantik: Guru menampilkan contoh fenomena nyata terkait topik "${input.topic}". Guru memantik diskusi dengan pertanyaan terbuka: "Bagaimana konsep ini memengaruhi keputusan atau karya kita sehari-hari?". Guru menyampaikan tujuan pembelajaran dan alur aktivitas yang akan ditempuh.`,
      timeAllocation: `${pend2Min} Menit`,
      principle: 'Bermakna',
      learningExperience: 'Memahami',
      learningResources: analysis.isQuantitative
        ? 'Media Presentasi Rumus / Lembar Data Apersepsi Numerasi'
        : 'Media Visual Presentasi / Gambar Pemantik Konseptual'
    }
  ];

  const stepsInti: LearningStepRow[] = syntaxList.map((stx, idx) => {
    const allocatedMin = phaseBaseMin + (idx === 0 ? remainder : 0);
    return {
      activity: `${stx.tahapan}\n• Tindakan Guru: ${stx.tindakanGuru}\n• Aktivitas Peserta Didik: ${stx.aktivitasSiswa}`,
      timeAllocation: `${allocatedMin} Menit`,
      principle: stx.prinsip,
      learningExperience: stx.pengalaman,
      learningResources: analysis.isQuantitative
        ? 'LKPD Berbasis Soal Numerik Bertahap, Alat Ukur / Kalkulator, Papan Tulis Rumus'
        : 'LKPD Kasus Eksploratif, Teks Wacana / Contoh Visual Desain, Kertas Plano & Sticky Notes'
    };
  });

  const stepsPenutup: LearningStepRow[] = [
    {
      activity: analysis.isQuantitative
        ? `Menyimpulkan Pembelajaran & Refleksi Perhitungan: Guru bersama siswa merangkum rumus kunci, langkah kalkulasi bertahap, dan cara menghindari kesalahan substitusi angka. Peserta didik menuliskan satu refleksi singkat pada lembar catatan.`
        : `Menyimpulkan Pembelajaran & Refleksi Bermakna: Guru bersama siswa merangkum intisari konsep materi "${input.topic}". Peserta didik mengutarakan hal baru yang paling bermakna dan berharga yang mereka peroleh dari aktivitas hari ini.`,
      timeAllocation: `${pen1Min} Menit`,
      principle: 'Bermakna',
      learningExperience: 'Merefleksi',
      learningResources: 'Lembar Catatan Refleksi Diri / Exit Ticket'
    },
    {
      activity: `Umpan Balik Positif, Tindak Lanjut & Doa Penutup: Guru memberikan apresiasi atas dedikasi dan kerja sama seluruh kelompok, menyampaikan arahan tugas tindak lanjut pertemuan berikutnya, serta menutup sesi pembelajaran dengan doa penuh syukur.`,
      timeAllocation: `${pen2Min} Menit`,
      principle: 'Menggembirakan',
      learningExperience: 'Merefleksi',
      learningResources: 'Agenda Belajar Pertemuan Berikutnya'
    }
  ];

  // Dynamic learning goals under 3 Deep Learning experiences (Memahami, Mengaplikasi, Merefleksi)
  let goalsMemahami: string[] = [];
  let goalsMengaplikasi: string[] = [];
  let goalsMerefleksi: string[] = [];

  if (analysis.isQuantitative) {
    goalsMemahami = [
      `Peserta didik dapat mengidentifikasi konsep dasar, lambang variabel, dan notasi rumus matematis/ilmiah pada topik "${input.topic}" secara tepat.`,
      `Peserta didik dapat menjelaskan hubungan logis antarrumus serta makna satuan internasional (SI) yang digunakan.`
    ];
    goalsMengaplikasi = [
      `Peserta didik dapat menerapkan rumus yang relevan untuk menyelesaikan masalah kontekstual bertahap, melakukan substitusi angka, dan menghasilkan kalkulasi yang akurat.`,
      `Peserta didik dapat menyusun dan membaca representasi data dalam bentuk tabel atau grafik numerik yang terstruktur.`
    ];
    goalsMerefleksi = [
      `Peserta didik dapat memverifikasi kembali ketepatan hasil perhitungan, memeriksa konsistensi satuan, dan merefleksikan efektivitas strategi hitungan yang digunakan.`
    ];
  } else if (analysis.domainNameId.includes('Bahasa')) {
    goalsMemahami = [
      `Peserta didik dapat mengidentifikasi struktur isi, ide pokok, dan ciri kebahasaan teks materi "${input.topic}" secara teliti.`,
      `Peserta didik dapat menjelaskan fungsi sosial dan pesan komunikasi wacana yang dipelajari.`
    ];
    goalsMengaplikasi = [
      `Peserta didik dapat menyusun draf karya tulis teks "${input.topic}" secara runtut, kohesif, dan memperhatikan kaidah ejaan baku.`,
      `Peserta didik dapat mempresentasikan teks hasil karya kelompok secara artikulatif dan percaya diri.`
    ];
    goalsMerefleksi = [
      `Peserta didik dapat merefleksikan nilai pesan dalam teks terhadap kehidupan nyata dan menilai kualitas tulisan secara objektif.`
    ];
  } else if (analysis.domainNameId.includes('Tipografi') || analysis.domainNameId.includes('Desain')) {
    goalsMemahami = [
      `Peserta didik dapat mengenali anatomi huruf, klasifikasi jenis typeface, dan hierarki visual pada materi "${input.topic}".`,
      `Peserta didik dapat menjelaskan prinsip keterbacaan (readability & legibility) dan kesesuaian mood desain.`
    ];
    goalsMengaplikasi = [
      `Peserta didik dapat merancang komposisi tata letak tipografi yang komunikatif, seimbang, dan memiliki kontras yang jelas.`,
      `Peserta didik dapat membedah studi kasus desain media visual dalam diskusi kelompok.`
    ];
    goalsMerefleksi = [
      `Peserta didik dapat mengapresiasi keberagaman gaya desain rekan sejawat dan merumuskan komitmen perbaikan kualitas karya visual.`
    ];
  } else if (analysis.domainNameId.includes('Ekonomi')) {
    goalsMemahami = [
      `Peserta didik dapat menguraikan konsep kebutuhan manusia, faktor yang memengaruhinya, serta realitas kelangkaan alat pemuas kebutuhan.`,
      `Peserta didik dapat membedakan antara kebutuhan esensial dan keinginan sesaat secara rasional.`
    ];
    goalsMengaplikasi = [
      `Peserta didik dapat menyusun tabel skala prioritas pemenuhan kebutuhan berdasarkan skenario anggaran terbatas.`,
      `Peserta didik dapat menganalisis studi kasus keputusan ekonomi rumah tangga dan mempresentasikannya secara logis.`
    ];
    goalsMerefleksi = [
      `Peserta didik dapat merefleksikan pola konsumsi pribadi dan berkomitmen menerapkan gaya hidup hemat serta bijak dalam mengelola sumber daya.`
    ];
  } else if (analysis.domainNameId.includes('Berpikir Komputasional')) {
    goalsMemahami = [
      `Peserta didik dapat menjelaskan 4 pilar Berpikir Komputasional (Dekomposisi, Pengenalan Pola, Abstraksi, dan Algoritma) pada materi "${input.topic}".`
    ];
    goalsMengaplikasi = [
      `Peserta didik dapat merancang representasi diagram alir (flowchart) atau langkah algoritma untuk memecahkan persoalan sehari-hari secara terstruktur.`
    ];
    goalsMerefleksi = [
      `Peserta didik dapat menguji kehandalan langkah algoritma yang dirancang, mengidentifikasi kesalahan logika (debugging), dan menyimpulkan solusi yang paling efisien.`
    ];
  } else {
    goalsMemahami = [
      `Peserta didik dapat memahami konsep esensial dan prinsip inti materi "${input.topic}" dengan bahasa sendiri secara tepat.`
    ];
    goalsMengaplikasi = [
      `Peserta didik dapat mengaplikasikan konsep materi untuk menganalisis studi kasus nyata dan menghasilkan karya/laporan kelompok yang solutif.`
    ];
    goalsMerefleksi = [
      `Peserta didik dapat merefleksikan proses belajar, mengevaluasi peran diri dalam tim, dan mengaitkan wawasan baru dengan tindakan nyata.`
    ];
  }

  // Profil Lulusan selection
  const profilLulusan = selectRelevantProfilLulusan(input.subject, input.topic, analysis);

  // Assessment descriptions
  let sumatifDescription = '';
  let sumatifKunci = '';
  if (analysis.isQuantitative && analysis.workedExample) {
    sumatifDescription = `Tes Tertulis Penilaian Numerik HOTS: Peserta didik menyelesaikan soal pemecahan masalah (contoh: "${analysis.workedExample.problemTitle}"), mencakup identifikasi besaran diketahui, perumusan langkah kalkulasi, penentuan jawaban akhir dengan satuan yang tepat.`;
    sumatifKunci = `Kunci Jawaban Objektif: Terlampir langkah penyelesaian matematis runtut (${analysis.workedExample.steps.length} langkah) dengan hasil akhir yang tervalidasi: ${analysis.workedExample.finalAnswer}`;
  } else {
    sumatifDescription = `Penilaian Unjuk Kerja / Studi Kasus / Produk Otentik: Peserta didik menyelesaikan tugas evaluasi penerapan konsep materi "${input.topic}" melalui telaah kasus nyata atau perancangan karya kelompok disertai presentasi kelas.`;
    sumatifKunci = `Rubrik Penilaian Unjuk Kerja: Menilai ketepatan analisis konsep, kualitas argumen/produk, keterpaduan struktur kerja, dan kejelasan komunikasi presentasi.`;
  }

  // Identifikasi Karakteristik & Kebutuhan Peserta Didik (Dynamic & Subject-Aware)
  const identifikasiPesertaDidik = buildDynamicIdentifikasiPesertaDidik(input, analysis);

  return {
    informasiUmum: {
      namaSekolah: input.schoolName,
      namaPenyusun: input.teacherName,
      mataPelajaran: input.subject,
      faseAtauKelas: input.gradeLevel,
      semester: input.semester,
      materi: input.materi,
      topikPembelajaran: input.topic,
      alokasiWaktu: input.timeAllocation,
      saranaDanPrasarana: input.facilitiesAndTools || 'Ruang kelas nyaman, proyektor/layar digital, papan tulis, LKPD cetak, dan gawai untuk referensi belajar.',
      sasaranPesertaDidik:
        identifikasiPesertaDidik.karakteristikPesertaDidik ||
        'Peserta didik reguler dengan keberagaman kesiapan belajar (variasi kecepatan pemahaman) yang antusias terhadap kerja kolaboratif.'
    },
    identifikasiDanDesain: {
      identifikasiPesertaDidik,
      identifikasiMataPelajaran: {
        mataPelajaran: input.subject,
        materi: input.materi,
        topik: input.topic,
        elemen: input.element,
        faseAtauKelas: input.gradeLevel,
        semester: input.semester,
        alokasiWaktu: input.timeAllocation,
        relevansiKehidupanNyata: `Penguasaan materi "${input.topic}" membekali peserta didik dengan kecakapan berpikir kritis dan pemecahan masalah nyata yang langsung dapat diterapkan dalam kehidupan sehari-hari.`
      },
      dimensiProfilLulusan: profilLulusan,
      capaianPembelajaran: input.learningOutcomeCP,
      lintasDisiplinIlmu: analysis.isQuantitative
        ? `Topik "${input.topic}" mengintegrasikan literasi numerasi tingkat tinggi (kalkulasi, pemodelan rumus) dengan nalar sains/teknologi dan keterampilan komunikasi hasil temuan.`
        : `Topik "${input.topic}" memiliki keterkaitan erat dengan literasi bahasa, wawasan sosial budaya, etika bermasyarakat, dan estetika seni/desain.`,
      tujuanPembelajaran: {
        memahami: goalsMemahami,
        mengaplikasi: goalsMengaplikasi,
        merefleksi: goalsMerefleksi
      },
      praktikPedagogis: {
        namaPendekatan: chosenPedagogy,
        alasanPemilihan: `Pendekatan ${chosenPedagogy} dipilih karena terbukti mampu mewujudkan prinsip Pembelajaran Mendalam (Berkesadaran, Bermakna, Menggembirakan) serta mengantarkan siswa melalui 3 pengalaman belajar esensial: Memahami, Mengaplikasi, dan Merefleksi.`,
        karakteristik: 'Berpusat pada keaktifan peserta didik, mengutamakan penyelidikan berbasis masalah nyata, serta kolaborasi suportif.',
        peranGuru: 'Sebagai fasilitator, penyedia scaffolding belajar, perancang iklim kelas yang aman, dan pengarah refleksi.',
        peranPesertaDidik: 'Sebagai pembelajar aktif, penyelidik masalah, kolaborator yang bertanggung jawab, dan komunikator gagasan.',
        sintaksTahapan: syntaxList.map((s) => ({
          tahapan: s.tahapan,
          deskripsi: `Guru: ${s.tindakanGuru} | Siswa: ${s.aktivitasSiswa}`
        })),
        hubunganDenganTujuan: `Setiap fase sintaks ${chosenPedagogy} secara terencana memfasilitasi pencapaian tujuan pembelajaran mulai dari pemahaman konsep, aplikasi pemecahan masalah, hingga refleksi diri.`
      },
      mitraPembelajaran: 'Kolaborasi antarguru mata pelajaran serumpun (MGMP Sekolah), pendampingan wali kelas, serta peran orang tua dalam mendukung literasi mandiri di rumah.',
      kemitraanPembelajaran: 'Kerja sama komunitas belajar guru sekolah, orang tua siswa, dan narasumber praktisi/lingkungan sekitar bila relevan.',
      lingkunganPembelajaran: {
        fisik: 'Ruang kelas dengan susunan meja kursi fleksibel untuk diskusi kelompok (4–5 orang), pencahayaan alami memadai, dan sirkulasi udara nyaman.',
        sosial: 'Iklim belajar yang saling menghargai pendapat, bebas dari perundungan, dan merayakan proses belajar tanpa rasa takut salah.',
        digital: 'Pemanfaatan layar proyektor untuk stimulus visual kontekstual dan perangkat digital untuk kuis interaktif GURITA.'
      },
      pemanfaatanDigital: 'Media presentasi interaktif, kuis gamifikasi pembelajaran GURITA, serta bahan ajar digital kontekstual.'
    },
    langkahPembelajaran: {
      kegiatanAwal: stepsAwal,
      kegiatanInti: stepsInti,
      kegiatanPenutup: stepsPenutup,
      totalWaktuMenit: parsedMinutes,
      asumsiWaktuText: `Total alokasi waktu pembelajaran adalah ${parsedMinutes} Menit (${input.timeAllocation}), terdistribusi tepat pada Pendahuluan (${pendahuluanMinutes} Menit), Inti (${intiTotalMinutes} Menit), dan Penutup (${penutupMinutes} Menit).`
    },
    asesmen: {
      asesmenAwal: {
        tujuan: 'Mengidentifikasi kesiapan belajar dan memetakan pemahaman awal peserta didik sebelum masuk materi inti.',
        teknik: analysis.isQuantitative
          ? 'Kuis diagnostik singkat 3 soal prasyarat hitung / Polling cepat konsep rumus.'
          : 'Tanya jawab interaktif / Pertanyaan pemantik lisan / Pemetaan curah gagasan (Brainstorming).',
        contohSoalTugas: analysis.isQuantitative
          ? `"Sebutkan besaran atau rumus yang kalian ketahui terkait ${input.topic}!" dan "Bagaimana cara menentukan satuannya?"`
          : `"Apa yang kalian pahami saat mendengar topik ${input.topic}?" dan "Sebutkan satu contoh penerapannya di sekitar kita!"`,
        penyesuaianPembelajaran: 'Hasil asesmen awal digunakan untuk membentuk kelompok belajar heterogen dan menentukan kadar bimbingan guru.'
      },
      asesmenFormatif: {
        teknik: 'Observasi keaktifan diskusi kelompok, penilaian kinerja LKPD, dan penilaian antaranggota tim.',
        waktuPelaksanaan: 'Dilakukan berkelanjutan sepanjang proses kegiatan inti saat siswa bekerja dalam kelompok.',
        indikator: analysis.isQuantitative
          ? 'Ketepatan menentukan rumus, ketelitian substitusi angka, dan konsistensi penulisan satuan.'
          : 'Keaktifan berpendapat, ketepatan analisis konsep, dan kualitas kerja sama tim pada LKPD.',
        instrumen: 'Lembar observasi keterlibatan diskusi dan rubrik ceklis unjuk kerja kelompok.',
        kriteriaKeberhasilan: 'Minimal 80% kelompok mampu menyelesaikan seluruh tahapan tugas pada LKPD dengan tuntas dan tepat waktu.',
        bentukUmpanBalik: 'Umpan balik langsung lisan (*immediate actionable feedback*) dari guru saat berkeliling mendampingi kelompok.'
      },
      asesmenSumatif: {
        bentuk: analysis.isQuantitative
          ? 'Tes Tertulis Soal HOTS Pemecahan Masalah Kuantitatif.'
          : 'Tugas Analisis Kasus Kontekstual / Penilaian Produk Karya / Presentasi Kelompok.',
        deskripsiTugasSoal: sumatifDescription,
        kunciAtauKriteria: sumatifKunci
      },
      rubrikPenilaian: [
        {
          aspek: analysis.isQuantitative ? 'Pemahaman Konsep & Rumus' : 'Penguasaan Konsep Esensial',
          indikator: analysis.isQuantitative
            ? `Kemampuan menjelaskan makna variabel, korelasi matematis, dan rumus materi ${input.topic}.`
            : `Kemampuan menjelaskan struktur, prinsip, dan konsep materi ${input.topic} secara utuh.`,
          skala1: 'Belum mampu menjelaskan konsep, masih terdapat miskonsepsi mendasar.',
          skala2: 'Mampu menjelaskan sebagian kecil konsep dasar namun belum terstruktur rapi.',
          skala3: 'Mampu menjelaskan konsep dan prinsip materi secara tepat, runtut, dan lengkap.',
          skala4: 'Sangat menguasai konsep, mampu mengaitkannya dengan fenomena baru secara analitis dan orisinal.'
        },
        {
          aspek: analysis.isQuantitative ? 'Keterampilan Kalkulasi & Notasi' : 'Keterampilan Aplikasi & Pemecahan Masalah',
          indikator: analysis.isQuantitative
            ? 'Ketepatan substitusi angka ke rumus, langkah hitungan bertahap, dan konsistensi satuan.'
            : 'Ketepatan menganalisis kasus, merancang karya/solusi, dan menyelesaikan tugas LKPD.',
          skala1: 'Penyelesaian acak, hasil tidak tepat, atau belum mampu menyelesaikan tugas.',
          skala2: 'Mampu menyelesaikan sebagian tugas tetapi masih ada langkah yang terlewat.',
          skala3: 'Langkah penyelesaian runtut, hasil tepat, dan sesuai kriteria tugas.',
          skala4: 'Penyelesaian sangat sistematis, kreatif, mampu memeriksa ulang (self-check), dan memberikan wawasan solutif.'
        },
        {
          aspek: 'Komunikasi & Kolaborasi',
          indikator: 'Kemampuan menyampaikan gagasan secara santun dan bekerja sama secara harmonis dalam tim.',
          skala1: 'Pasif dalam kelompok dan enggan berkontribusi pada dialog tim.',
          skala2: 'Cukup aktif tetapi masih membutuhkan dorongan untuk berbagi peran tugas.',
          skala3: 'Bekerja sama dengan baik, menghargai pendapat rekan, dan presentasi jelas.',
          skala4: 'Menjadi teladan kerja sama, memfasilitasi dialog positif, dan presentasi sangat komunikatif serta meyakinkan.'
        }
      ],
      pengolahanDanTindakLanjut: {
        remedial: analysis.isQuantitative
          ? 'Bagi peserta didik yang belum tuntas, diberikan lembar latihan terbimbing (scaffolded worksheet) dengan bimbingan tutor sebaya pada langkah substitusi angka.'
          : 'Bagi peserta didik yang belum mencapai kriteria ketuntasan, diberikan bimbingan perorangan atau ulasan rangkuman konsep menggunakan analogi konkret.',
        pengayaan: analysis.isQuantitative
          ? 'Bagi peserta didik yang telah mencapai nilai maksimal, diberikan tantangan soal HOTS tingkat lanjut (multi-step problem solving) berbasis data nyata.'
          : 'Bagi peserta didik dengan capaian tinggi, diberikan tantangan studi kasus komparatif lanjutan atau perancangan proyek media edukasi mandiri.',
        umpanBalik: 'Umpan balik tertulis diberikan pada lembar kerja siswa dengan catatan penguatan motivasi dan rekomendasi perbaikan spesifik.',
        refleksiGuru: 'Guru mencatat apakah alokasi waktu dan strategi diferensiasi berhasil memfasilitasi keberagaman kebutuhan belajar siswa.'
      }
    },
    alatDanSumberBelajar: {
      alatDanBahan: [
        'Papan tulis dan spidol warna',
        'Lembar Kerja Peserta Didik (LKPD) Cetak',
        analysis.isQuantitative
          ? 'Kalkulator / Alat Ukur / Tabel Rumus dan Satuan'
          : 'Alat tulis, kertas plano / sticky notes untuk presentasi kelompok'
      ],
      mediaPembelajaran: [
        `Slide presentasi visual materi ${input.topic}`,
        analysis.isQuantitative
          ? 'Animasi grafik / Simulasi model numerik digital'
          : 'Video fenomena kontekstual / Contoh karya otentik',
        'Kuis interaktif digital GURITA'
      ],
      bukuReferensi: [
        `Buku Panduan Guru & Siswa ${input.subject} - Kemendikbudristek`,
        'Bahan ajar pengayaan dan modul terverifikasi'
      ],
      sumberDigital: [
        'Platform Rumah Belajar / PMM Kemendikbudristek',
        analysis.isQuantitative
          ? 'Simulasi Sains & Matematika (PhET / GeoGebra)'
          : 'Portal edukasi terpercaya / Media wacana pembelajaran digital'
      ],
      perangkatDibutuhkan: ['Laptop / Proyektor Kelas', 'Gawai smartphone / tablet siswa (opsional)'],
      alternatifLuring: 'Jika fasilitas digital terbatas, seluruh stimulus media dan lembar tugas disediakan dalam bentuk lembar cetak atau kartu kerja nyata.',
      catatanVerifikasi: 'Modul ini telah diverifikasi memenuhi kaidah Kurikulum Pembelajaran Mendalam (Deep Learning) dan kaidah keilmuan yang akurat.'
    },
    refleksi: {
      refleksiPesertaDidik: analysis.isQuantitative
        ? [
            'Apakah saya sudah memahami makna setiap lambang dan rumus yang dipelajari hari ini?',
            'Langkah perhitungan mana yang paling menantang dan bagaimana cara saya memastikannya benar?',
            'Bagaimana rumus atau konsep ini dapat saya manfaatkan dalam memecahkan masalah sehari-hari?'
          ]
        : [
            'Apa wawasan paling bermakna dan berharga yang saya dapatkan dari pembelajaran hari ini?',
            'Bagaimana pengalaman saya saat berdiskusi dalam kelompok dan apa kontribusi terbaik saya?',
            'Apa ide atau karya kreatif yang ingin saya kembangkan lebih lanjut setelah mempelajari topik ini?'
          ],
      refleksiGuru: [
        'Apakah pendekatan pedagogis yang diterapkan berhasil membangkitkan keaktifan seluruh peserta didik?',
        'Bagian mana dari kegiatan pembelajaran yang paling efektif dan bagian mana yang memerlukan perbaikan waktu?',
        'Bagaimana saya dapat memperkuat diferensiasi pembelajaran agar semua peserta didik mencapai tujuan secara optimal?'
      ]
    },
    pengesahan: {
      kotaDanTanggal: `Jakarta, ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}`,
      namaKepalaSekolah: input.principalName,
      namaPenyusun: input.teacherName
    },
    subjectAwareAnalysis: analysis
  };
}
