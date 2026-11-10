import { ModulAjarFormInput } from '../types';
import { SubjectAwareAnalysis } from './subjectClassifier';

export interface IdentifikasiPesertaDidikResult {
  karakteristikPesertaDidik: string;
  pengetahuanAwal: string;
  minatDanMotivasi: string;
  minatDanKebutuhanBelajar: string;
  kesiapanBelajar: string;
  kebutuhanBelajar: string;
  karakteristikMateri: string;
  potensiMiskonsepsi: string;
  dukunganDanDiferensiasi: string;
  catatanAsumsi: string;
}

/**
 * Checks if the provided text is a stale leftover from default/preset math inputs
 * when the current subject is NOT mathematics.
 */
function isStaleMathInput(text: string | undefined, subject: string): boolean {
  if (!text || text.trim().length === 0) return true;
  const subLower = (subject || '').toLowerCase();
  const isMathSubject =
    subLower.includes('matematika') ||
    subLower.includes('aljabar') ||
    subLower.includes('kalkulus') ||
    subLower.includes('geometri') ||
    subLower.includes('trigonometri') ||
    subLower.includes('statistika');

  if (isMathSubject) return false;

  const textLower = text.toLowerCase();
  const mathMarkers = [
    'aritmatika',
    'aritmetika',
    'penalaran simbolik aljabar',
    'timbangan peraga aljabar',
    'algebra balance',
    'persamaan linear satu variabel',
    'splsv',
    'spldv',
    'penjumlahan, pengurangan, perkalian, dan pembagian bilangan bulat',
    'keseimbangan kedua ruas',
    'isolasi variabel x',
    'persamaan linear'
  ];
  return mathMarkers.some((m) => textLower.includes(m));
}

/**
 * Builds dynamic, subject-and-topic-aware Identifikasi Peserta Didik
 * adhering strictly to the subject, learning outcome, grade level, and actual topic.
 */
export function buildDynamicIdentifikasiPesertaDidik(
  input: ModulAjarFormInput,
  analysis: SubjectAwareAnalysis
): IdentifikasiPesertaDidikResult {
  const subject = input.subject || '';
  const materi = input.materi || '';
  const topic = input.topic || '';
  const gradeLevel = input.gradeLevel || 'Fase D (SMP Kelas 7-9)';
  const subLower = subject.toLowerCase();
  const topicLower = `${materi} ${topic}`.toLowerCase();
  const combined = `${subject} ${materi} ${topic}`.toLowerCase();

  // Validate user provided input to avoid leftover math text on other subjects
  const rawChar = input.studentCharacteristics?.trim();
  const rawPrior = input.priorKnowledge?.trim();
  const rawNeeds = input.specialLearningNeeds?.trim();

  const hasValidUserChar = Boolean(rawChar && !isStaleMathInput(rawChar, subject));
  const hasValidUserPrior = Boolean(rawPrior && !isStaleMathInput(rawPrior, subject));
  const hasValidUserNeeds = Boolean(rawNeeds && !isStaleMathInput(rawNeeds, subject));

  // Base assumptions note
  const assumptionNote = `(Asumsi Awal Pedagogis): Profil dan kesiapan peserta didik dirumuskan sebagai kerangka awal berbasis karakteristik mata pelajaran ${subject}, fase/kelas ${gradeLevel}, dan topik "${topic}". Deskripsi ini merupakan estimasi awal yang perlu dikonfirmasi guru melalui observasi kelas dan asesmen diagnostik nyata.`;

  // =========================================================================
  // 1. BAHASA INDONESIA & BAHASA / SASTRA (Strictly Non-Numeric)
  // =========================================================================
  const isLanguage = [
    'bahasa indonesia',
    'bahasa inggris',
    'bahasa daerah',
    'bahasa arab',
    'bahasa jepang',
    'bahasa mandarin',
    'bahasa jerman',
    'sastra',
    'linguistik'
  ].some((k) => subLower.includes(k) || topicLower.includes(k));

  if (isLanguage) {
    const isEksplanasi = combined.includes('eksplanasi');
    const isProsedur = combined.includes('prosedur');
    const isLaporanObservasi = combined.includes('observasi') || combined.includes('lho');
    const isPuisiCerpen = combined.includes('puisi') || combined.includes('cerpen') || combined.includes('narasi');

    let karakteristik = hasValidUserChar
      ? rawChar!
      : isEksplanasi
      ? `(Asumsi Awal Pedagogis): Peserta didik pada jenjang ${gradeLevel} memiliki rasa ingin tahu yang tinggi terhadap fenomena alam, sosial, dan budaya di lingkungan sekitarnya. Peserta didik memerlukan bimbingan terstruktur dalam menyusun penjelasan ilmiah secara objektif, logis, dan runtut berdasarkan fakta nyata tanpa memasukkan opini pribadi yang tidak berdasar.`
      : isProsedur
      ? `(Asumsi Awal Pedagogis): Peserta didik pada jenjang ${gradeLevel} terbiasa mengikuti petunjuk instruksional (misal panduan aplikasi atau langkah kegiatan), namun membutuhkan bimbingan menyusun teks instruksi yang runtut, operasional, dan menggunakan kalimat imperatif komunikatif.`
      : `(Asumsi Awal Pedagogis): Peserta didik pada jenjang ${gradeLevel} memiliki kemampuan membaca wacana yang sedang berkembang, memerlukan stimulasi teks kontekstual autentik, dan bimbingan terstruktur dalam mengonstruksi pemikiran kritis ke dalam bentuk wacana tertulis maupun lisan.`;

    let pengetahuanAwal = hasValidUserPrior
      ? rawPrior!
      : isEksplanasi
      ? `Kemampuan membaca dan memahami teks informatif, pengetahuan awal tentang struktur umum teks (pengantar, uraian penjelas, simpulan), kemampuan mengidentifikasi informasi penting serta mengenali hubungan sebab-akibat sederhana.`
      : isProsedur
      ? `Mampu membedakan kalimat perintah (imperatif) dari kalimat berita, memahami urutan langkah logis, dan membaca petunjuk teknis sederhana.`
      : `Memahami gagasan utama bacaan sederhana, mengenali kaidah ejaan bahasa baku (EYD), dan terbiasa berdialog santun dalam diskusi kelas.`;

    let minatKebutuhan = hasValidUserNeeds
      ? rawNeeds!
      : isEksplanasi
      ? `Kemampuan mengidentifikasi informasi dan hubungan sebab-akibat; keterampilan menyampaikan gagasan secara lisan maupun tulisan dengan kaidah kebahasaan baku (konjungsi kausalitas dan temporal). Tidak melibatkan kemampuan berhitung atau penalaran numerik.`
      : isProsedur
      ? `Kebutuhan latihan menyusun langkah-langkah kerja bertahap yang operasional, penggunaan kata kerja aksi dan konjungsi kronologis tanpa melibatkan rumus matematika.`
      : `Kebutuhan penguatan kemahiran literasi membaca dan menulis kritis, pengayaan kosakata bermakna, serta latihan menyampaikan argumen secara tertata. Tidak melibatkan kalkulasi angka.`;

    let kesiapanBelajar = isEksplanasi
      ? `Rentang kesiapan belajar mencakup peserta didik yang membutuhkan kerangka teks terpandu (scaffolded writing outline), peserta didik yang siap menyusun draf eksplanasi mandiri berdasarkan artikel sumber, dan peserta didik yang siap mengkritisi keabsahan bukti ilmiah secara kritis.`
      : `Keragaman kesiapan belajar terbagi antara peserta didik yang membutuhkan panduan bertahap (scaffolding kosakata/struktur), peserta didik reguler yang mampu menulis mandiri, dan peserta didik yang siap untuk analisis wacana komparatif tingkat lanjut.`;

    let kebutuhanBelajar = isEksplanasi
      ? `Memerlukan lembar kerja berbasis telaah wacana fenomena autentik, kartu panduan konjungsi kausalitas (sebab, karena, akibatnya, sehingga, memicu), serta latihan membedakan fakta ilmiah objektif dengan opini subjektif.`
      : `Memerlukan contoh pemodelan teks autentik, panduan analisis struktur wacana, serta kesempatan berdialog aktif dalam kelompok.`;

    let karakteristikMateri = isEksplanasi
      ? `Materi Teks Eksplanasi berfokus pada pemahaman proses terjadinya fenomena alam, sosial, atau budaya secara ilmiah melalui struktur pernyataan umum, rangkaian sebab-akibat, dan ulasan interpretatif tanpa melibatkan angka atau rumus perhitungan matematis.`
      : `Materi pembelajaran bahasa berfokus pada penguasaan struktur wacana, kaidah kebahasaan komunikatif, dan ekspresi gagasan secara santun dan terstruktur.`;

    let potensiMiskonsepsi = isEksplanasi
      ? `Potensi menyamakan teks eksplanasi dengan teks narasi fiksi atau sekadar teks deskripsi statis, serta kekeliruan membedakan antara faktor penyebab utama (cause) dengan dampak penyerta (effect).`
      : isProsedur
      ? `Menyusun langkah yang meloncat-loncat tidak berurutan atau menggunakan kalimat yang ambigu sehingga membingungkan pembaca.`
      : `Potensi menyederhanakan makna wacana secara sepihak atau keliru membedakan fakta objektif dengan opini penulis.`;

    let dukunganDiferensiasi = isEksplanasi
      ? `Diferensiasi konten melalui variasi kompleksitas topik fenomena (alam, bencana, sosial); diferensiasi proses melalui kartu panduan konjungsi kausalitas dan latihan telaah struktur 3 bagian teks secara kolaboratif.`
      : `Diferensiasi konten melalui tingkat kesulitan teks bacaan dan diferensiasi proses melalui pendampingan intensif bagi kelompok yang memerlukan penguatan kosakata.`;

    return {
      karakteristikPesertaDidik: karakteristik,
      pengetahuanAwal,
      minatDanMotivasi: 'Memiliki motivasi tinggi ketika pembelajaran menghadirkan wacana isu aktual, tayangan video fenomena nyata, dan kesempatan berdialog lisan.',
      minatDanKebutuhanBelajar: minatKebutuhan,
      kesiapanBelajar,
      kebutuhanBelajar,
      karakteristikMateri,
      potensiMiskonsepsi,
      dukunganDanDiferensiasi: dukunganDiferensiasi,
      catatanAsumsi: assumptionNote
    };
  }

  // =========================================================================
  // 2. DESAIN KOMUNIKASI VISUAL (DKV) & SENI BUDAYA (Strictly Non-Numeric)
  // =========================================================================
  const isDkvOrArt = [
    'dkv',
    'desain komunikasi visual',
    'seni rupa',
    'seni budaya',
    'seni musik',
    'seni tari',
    'seni teater',
    'tipografi',
    'desain grafis'
  ].some((k) => subLower.includes(k) || topicLower.includes(k));

  if (isDkvOrArt) {
    const isTipografi = combined.includes('tipografi') || combined.includes('huruf') || combined.includes('font');

    let karakteristik = hasValidUserChar
      ? rawChar!
      : `(Asumsi Awal Pedagogis): Peserta didik pada jenjang ${gradeLevel} memiliki pengalaman empiris dalam mengamati berbagai bentuk huruf dan komunikasi visual dari media digital, kemasan produk, dan ruang publik. Latar belakang penguasaan perangkat lunak desain sangat beragam sehingga pembelajaran harus dirancang inklusif baik bagi pemula maupun yang sudah terbiasa dengan aplikasi desain.`;

    let pengetahuanAwal = hasValidUserPrior
      ? rawPrior!
      : isTipografi
      ? `Pengalaman peserta didik dalam mengamati dan menggunakan huruf dalam kehidupan sehari-hari, pengetahuan awal tentang jenis dan karakter huruf dasar (misal huruf formal/tegak dan huruf santai/dekoratif), serta pemahaman fungsi teks dalam poster atau media visual.`
      : `Mengenal unsur-unsur rupa dasar (titik, garis, bidang, warna, dan tekstur) serta apresiasi sederhana terhadap karya visual di sekitar.`;

    let minatKebutuhan = hasValidUserNeeds
      ? rawNeeds!
      : isTipografi
      ? `Kepekaan terhadap keterbacaan (readability dan legibility) dan hierarki visual; kemampuan mengamati serta membandingkan efektivitas karya desain; pengalaman menggunakan perangkat atau aplikasi desain jika relevan (tanpa menganggap semua peserta didik sudah menguasai software desain). Tidak memaksakan rumus matematika atau kalkulasi angka.`
      : `Kebutuhan eksplorasi media visual kreatif, pemahaman prinsip keseimbangan dan harmoni rupa, serta apresiasi karya tanpa rumus matematis.`;

    let kesiapanBelajar = isTipografi
      ? `Rentang kesiapan berkarya mencakup peserta didik yang membutuhkan eksplorasi sketsa manual pada kertas kisi (grid), peserta didik yang siap merancang tata letak dua keluarga font (font pairing), dan peserta didik yang siap bereksperimen dengan perangkat lunak desain grafis.`
      : `Kesiapan beragam antara peserta didik yang membutuhkan bimbingan teknik dasar rupa, peserta didik yang siap berkreasi mandiri, dan peserta didik yang siap untuk proyek desain terpadu.`;

    let kebutuhanBelajar = isTipografi
      ? `Memerlukan panduan visual anatomi huruf (baseline, x-height, ascender, descender), contoh komparasi poster nyata, serta latihan menata hierarki ukuran teks agar pesan terpenting mudah ditangkap oleh pembaca.`
      : `Memerlukan lembar panduan komposisi visual, contoh karya otentik, dan ruang apresiasi karya (gallery walk).`;

    let karakteristikMateri = isTipografi
      ? `Materi Prinsip Dasar Tipografi dan Komunikasi Visual berfokus pada nilai keterbacaan (readability), kejelasan karakter (legibility), hierarki informasi, dan estetika rupa tanpa melibatkan rumus perhitungan matematis.`
      : `Materi seni dan komunikasi visual menekankan kepekaan estetika, ekspresi kreatif, dan penyampaian pesan yang komunikatif.`;

    let potensiMiskonsepsi = isTipografi
      ? `Potensi beranggapan bahwa karya desain yang baik harus menggunakan banyak jenis font dekoratif sekaligus, atau menomorduakan keterbacaan teks (legibility) demi mengejar keindahan visual semata.`
      : `Anggapan keliru bahwa kemampuan merancang hanya ditentukan oleh bakat alami dan bukan keterampilan yang dapat dilatih melalui pengamatan prinsip desain.`;

    let dukunganDiferensiasi = isTipografi
      ? `Diferensiasi media berkarya berupa pilihan media sketsa manual pada kertas atau kanvas digital bagi yang memiliki perangkat; penyediaan panduan visual hierarki tipografi dan kartu komparasi font.`
      : `Penyediaan pilihan alat berkarya (manual/digital) dan pendampingan bertahap sesuai minat ekspresi siswa.`;

    return {
      karakteristikPesertaDidik: karakteristik,
      pengetahuanAwal,
      minatDanMotivasi: 'Memiliki antusiasme tinggi saat diajak mengamati contoh poster nyata, mengeksplorasi pilihan font, dan memamerkan karya visual di kelas.',
      minatDanKebutuhanBelajar: minatKebutuhan,
      kesiapanBelajar,
      kebutuhanBelajar,
      karakteristikMateri,
      potensiMiskonsepsi,
      dukunganDanDiferensiasi: dukunganDiferensiasi,
      catatanAsumsi: assumptionNote
    };
  }

  // =========================================================================
  // 3. PENDIDIKAN PANCASILA, SEJARAH, SOSIAL & KEWARGAAN (Strictly Non-Numeric)
  // =========================================================================
  const isCivicsSocialSubject = [
    'pancasila',
    'ppkn',
    'kewarganegaraan',
    'sejarah',
    'sosiologi',
    'antropologi',
    'filsafat',
    'agama',
    'budi pekerti',
    'bimbingan konseling',
    'bk'
  ].some((k) => subLower.includes(k));

  if (isCivicsSocialSubject) {
    const isPancasila = combined.includes('pancasila');

    let karakteristik = hasValidUserChar
      ? rawChar!
      : isPancasila
      ? `(Asumsi Awal Pedagogis): Peserta didik pada jenjang ${gradeLevel} hidup dan berinteraksi dalam lingkungan sosial masyarakat yang heterogen (keluarga, sekolah, dan lingkungan tempat tinggal). Peserta didik membutuhkan ruang dialog reflektif untuk mentransformasikan pemahaman nilai moral luhur menjadi kebiasaan perilaku nyata dalam kehidupan sehari-hari.`
      : `(Asumsi Awal Pedagogis): Peserta didik pada jenjang ${gradeLevel} sedang mengembangkan kesadaran sosial dan identitas diri, memerlukan studi kasus kontekstual untuk menghubungkan peristiwa sejarah atau norma sosial dengan dinamika kehidupan masa kini.`;

    let pengetahuanAwal = hasValidUserPrior
      ? rawPrior!
      : isPancasila
      ? `Pemahaman awal tentang nilai-nilai Pancasila (bunyi dan makna lambang 5 sila), pengenalan norma sosial serta aturan yang berlaku di sekolah dan masyarakat, serta kemampuan mengenali contoh-contoh perilaku jujur, adil, dan gotong royong.`
      : `Mengenal konsep dasar keteraturan sosial, hak dan kewajiban warga negara, serta peristiwa historis penting dalam pembentukan bangsa.`;

    let minatKebutuhan = hasValidUserNeeds
      ? rawNeeds!
      : isPancasila
      ? `Kemampuan mengenali contoh perilaku yang selaras dengan nilai-nilai Pancasila; kemampuan berdiskusi dan menganalisis permasalahan sosial sederhana secara santun, empatik, dan toleran terhadap keberagaman. Tidak memasukkan kemampuan numerik yang tidak berhubungan dengan topik.`
      : `Kebutuhan ruang musyawarah dan diskusi reflektif untuk memecahkan persoalan sosial secara damai dan adil tanpa rumus hitungan matematis.`;

    let kesiapanBelajar = isPancasila
      ? `Rentang kesiapan mencakup peserta didik yang membutuhkan stimulasi studi kasus konkret bergambar, peserta didik yang siap berdialog analitis dalam kelompok, dan peserta didik yang siap merancang komitmen aksi nyata di lingkungan sekolah.`
      : `Kesiapan beragam antara kelompok yang membutuhkan penguatan pemahaman norma dasar dan kelompok yang siap untuk analisis kritis fenomena sosial.`;

    let kebutuhanBelajar = isPancasila
      ? `Memerlukan ruang dialog musyawarah yang aman dan suportif, studi kasus dilema etika kontekstual di lingkungan remaja, serta lembar refleksi diri untuk mengevaluasi komitmen penerapan kebajikan dalam interaksi harian.`
      : `Memerlukan studi kasus kontekstual, artikel fenomena sosial terkini, dan panduan simulasi musyawarah mufakat.`;

    let karakteristikMateri = isPancasila
      ? `Materi Penerapan Nilai-Nilai Pancasila berorientasi pada pembinaan karakter luhur, etika kewargaan demokratis, keadilan sosial, dan kesadaran hukum tanpa melibatkan operasi hitung atau data kuantitatif yang tidak relevan.`
      : `Materi pembelajaran sosial-kewargaan menekankan penalaran kritis atas fenomena kemasyarakatan, penanaman empati, dan penguatan persatuan dalam kebinekaan.`;

    let potensiMiskonsepsi = isPancasila
      ? `Potensi menganggap nilai-nilai Pancasila sekadar hafalan butir sila untuk kebutuhan tes atau kegiatan seremonial semata, bukan pedoman moral yang dihidupi dalam pergaulan sehari-hari.`
      : `Miskonsepsi bahwa norma sosial bersifat kaku dan membatasi, bukan kesepakatan bersama demi ketertiban dan kesejahteraan warga.`;

    let dukunganDiferensiasi = isPancasila
      ? `Diferensiasi proses melalui variasi peran dalam simulasi musyawarah dan penyediaan studi kasus kontekstual berjenjang dari lingkungan terdekat peserta didik.`
      : `Pemberian alternatif bentuk unjuk karya refleksi (poster nilai, esai singkat, atau sosiodrama mini).`;

    return {
      karakteristikPesertaDidik: karakteristik,
      pengetahuanAwal,
      minatDanMotivasi: 'Memiliki motivasi tinggi saat diajak mendiskusikan peristiwa nyata di sekitar mereka, bermain peran (role playing), dan berbagi cerita pengalaman pribadi.',
      minatDanKebutuhanBelajar: minatKebutuhan,
      kesiapanBelajar,
      kebutuhanBelajar,
      karakteristikMateri,
      potensiMiskonsepsi,
      dukunganDanDiferensiasi: dukunganDiferensiasi,
      catatanAsumsi: assumptionNote
    };
  }

  // =========================================================================
  // 4. FISIKA (Kecepatan dan Percepatan & Kinematika Gerak)
  // =========================================================================
  if (subLower.includes('fisika')) {
    const isGerak = combined.includes('kecepatan') || combined.includes('percepatan') || combined.includes('gerak') || combined.includes('kinematika');

    let karakteristik = hasValidUserChar
      ? rawChar!
      : isGerak
      ? `(Asumsi Awal Pedagogis): Peserta didik pada jenjang ${gradeLevel} memiliki pengalaman inderawi mengamati fenomena gerak benda dalam keseharian (kendaraan melaju di jalan, orang berlari, benda jatuh bebas), namun memerlukan bimbingan dalam menghubungkan pengamatan kualitatif tersebut dengan besaran fisis yang terukur secara sistematis.`
      : `(Asumsi Awal Pedagogis): Peserta didik pada jenjang ${gradeLevel} tertarik pada fenomena alam nyata dan penyelidikan sains, namun memerlukan panduan menghubungkan pengamatan fisik dengan besaran ilmiah terukur.`;

    let pengetahuanAwal = hasValidUserPrior
      ? rawPrior!
      : isGerak
      ? `Pemahaman tentang gerak dalam kehidupan sehari-hari, pengetahuan awal tentang jarak dan waktu, pemahaman satuan pengukuran yang diperlukan (meter, sekon, km/jam), serta kemampuan operasi perkalian dan pembagian dasar.`
      : `Mengenal besaran pokok dan turunan, penggunaan alat ukur sederhana, serta prosedur keselamatan dasar di laboratorium sains.`;

    let minatKebutuhan = hasValidUserNeeds
      ? rawNeeds!
      : isGerak
      ? `Kemampuan menghubungkan konsep gerak dengan perhitungan apabila sesuai topik (kecepatan v = s/t dan percepatan a = Δv/Δt); kebutuhan eksperimen sederhana atau simulasi gerak untuk membedakan gerak lurus beraturan (kecepatan konstan) dengan gerak lurus berubah beraturan (mengalami percepatan).`
      : `Kebutuhan pengamatan fenomena sains langsung melalui praktikum terbimbing dan pemodelan matematis proporsional terstruktur.`;

    let kesiapanBelajar = isGerak
      ? `Rentang kesiapan mencakup peserta didik yang membutuhkan panduan membaca alat ukur dan substitusi besaran, peserta didik yang siap mengolah data eksperimen gerak secara mandiri, dan peserta didik yang siap menganalisis grafik kinematika hubungan jarak-waktu atau kecepatan-waktu.`
      : `Kesiapan beragam antara peserta didik yang membutuhkan bimbingan langsung pengukuran dan peserta didik yang siap menganalisis data observasi.`;

    let kebutuhanBelajar = isGerak
      ? `Memerlukan panduan eksperimen penyelidikan gerak langsung (stopwatch dan lintasan gerak), lembar observasi data terstruktur, serta latihan kalkulasi bertahap yang menekankan konsistensi satuan internasional (SI).`
      : `Memerlukan lembar kerja praktikum sains berbasis inkuiri dan latihan penerapan rumus fisika kontekstual.`;

    let karakteristikMateri = isGerak
      ? `Materi Kecepatan dan Percepatan (Kinematika Gerak) memadukan konsep fisis empiris dengan pemodelan matematis proporsional yang membutuhkan ketepatan penulisan satuan dan analisis data observasi.`
      : `Materi fisika memadukan penyelidikan fenomena fisis dengan perumusan matematis besaran alam secara terukur.`;

    let potensiMiskonsepsi = isGerak
      ? `Potensi menyamakan pengertian kecepatan dengan percepatan, anggapan keliru bahwa benda berkecepatan nol tidak dapat memiliki percepatan, atau kelalaian dalam mengonversi satuan waktu/jarak sebelum menghitung.`
      : `Potensi kekeliruan dalam memaknai hubungan antarvariabel rumus fisika atau kelalaian penulisan satuan besaran.`;

    let dukunganDiferensiasi = isGerak
      ? `Diferensiasi proses melalui pembagian peran eksperimen (pencatat waktu, pengukur jarak, pengolah data) dan penyediaan tabel data dengan panduan konversi satuan SI.`
      : `Penyediaan panduan praktikum berjenjang dan pendampingan bertahap pada langkah pengolahan data.`;

    return {
      karakteristikPesertaDidik: karakteristik,
      pengetahuanAwal,
      minatDanMotivasi: 'Memiliki antusiasme tinggi saat diajak melakukan percobaan langsung dengan alat ukur (stopwatch/meteran), melihat demonstrasi gerak, dan simulasi digital.',
      minatDanKebutuhanBelajar: minatKebutuhan,
      kesiapanBelajar,
      kebutuhanBelajar,
      karakteristikMateri,
      potensiMiskonsepsi,
      dukunganDanDiferensiasi: dukunganDiferensiasi,
      catatanAsumsi: assumptionNote
    };
  }

  // =========================================================================
  // 5. KIMIA (Konseptual vs Kuantitatif)
  // =========================================================================
  if (subLower.includes('kimia')) {
    const isStoikiometri = analysis.isQuantitative;

    let karakteristik = hasValidUserChar
      ? rawChar!
      : isStoikiometri
      ? `(Asumsi Awal Pedagogis): Peserta didik pada jenjang ${gradeLevel} membutuhkan jembatan analogi konkret (misal analogi lusin/kodi) untuk menghubungkan massa makroskopis zat yang ditimbang di laboratorium dengan jumlah partikel mikroskopis yang bereaksi.`
      : `(Asumsi Awal Pedagogis): Peserta didik pada jenjang ${gradeLevel} memiliki rasa ingin tahu tentang materi di sekitarnya, namun membutuhkan model representasi visual untuk memahami partikel submikroskopis (atom, molekul, ion) yang tidak kasat mata.`;

    let pengetahuanAwal = hasValidUserPrior
      ? rawPrior!
      : isStoikiometri
      ? `Mengenal massa atom relatif (Ar), rumus kimia senyawa sederhana, serta operasi perkalian dan pembagian desimal dasar.`
      : `Mengenal wujud zat (padat, cair, gas), lambang unsur kimia sederhana, serta konsep perubahan fisika dan kimia.`;

    let minatKebutuhan = hasValidUserNeeds
      ? rawNeeds!
      : isStoikiometri
      ? `Kebutuhan latihan konversi bertahap gram-mol-partikel melalui diagram jembatan mol terstruktur dan penulisan satuan yang presisi.`
      : `Kebutuhan visualisasi model partikel dan diagram konfigurasi elektron tanpa beban perhitungan matematis stoikiometri yang belum relevan.`;

    let kesiapanBelajar = isStoikiometri
      ? `Rentang kesiapan mencakup peserta didik yang membutuhkan panduan jembatan mol bergambar, peserta didik yang siap menghitung mol zat reguler, dan peserta didik yang siap memecahkan stoikiometri reaksi berlebih.`
      : `Kesiapan beragam antara peserta didik yang membutuhkan analogi visual model atom dan peserta didik yang siap menganalisis susunan tabel periodik unsur.`;

    return {
      karakteristikPesertaDidik: karakteristik,
      pengetahuanAwal,
      minatDanMotivasi: 'Antusias saat mengamati demonstrasi perubahan materi, eksperimen laboratorium kimia, dan animasi interaktif 3D molekul.',
      minatDanKebutuhanBelajar: minatKebutuhan,
      kesiapanBelajar,
      kebutuhanBelajar: isStoikiometri
        ? 'Memerlukan diagram alir konversi satuan mol dan latihan perhitungan stoikiometri bertahap.'
        : 'Memerlukan alat peraga pemodelan partikel dan video simulasi struktur mikroskopis materi.',
      karakteristikMateri: isStoikiometri
        ? 'Materi Stoikiometri dan Konsep Mol memadukan konsep partikel kimia dengan kalkulasi kuantitatif massa dan jumlah zat.'
        : 'Materi Struktur Materi bersifat konseptual-visual yang menekankan pemahaman susunan materi tanpa beban hitungan kuantitatif.',
      potensiMiskonsepsi: isStoikiometri
        ? 'Kekeliruan membedakan antara koefisien reaksi dengan indeks rumus kimia saat menghitung mol zat.'
        : 'Menganggap atom sebagai benda padat pejal statis atau tertukar antara konsep molekul unsur dengan molekul senyawa.',
      dukunganDanDiferensiasi: isStoikiometri
        ? 'Penyediaan bagan jembatan mol dan kartu bantuan konversi rumus.'
        : 'Penyediaan media visual pemodelan partikel ramah pemula.',
      catatanAsumsi: assumptionNote
    };
  }

  // =========================================================================
  // 6. INFORMATIKA (Konseptual Logika vs Sistem Bilangan)
  // =========================================================================
  if (subLower.includes('informatika') || subLower.includes('komputer')) {
    const isBiner = analysis.isQuantitative;

    let karakteristik = hasValidUserChar
      ? rawChar!
      : isBiner
      ? `(Asumsi Awal Pedagogis): Peserta didik pada jenjang ${gradeLevel} antusias dengan cara kerja internal komputer dan representasi data biner (0 dan 1), memerlukan simulasi konkret sebelum abstraksi sistem bilangan.`
      : `(Asumsi Awal Pedagogis): Peserta didik pada jenjang ${gradeLevel} terbiasa menggunakan gawai dan aplikasi digital, namun membutuhkan latihan penalaran sistematis untuk memecahkan masalah kompleks secara logis dan runtut.`;

    let pengetahuanAwal = hasValidUserPrior
      ? rawPrior!
      : isBiner
      ? `Mengenal sistem bilangan desimal (basis 10), perpangkatan dua dasar (2^0, 2^1, 2^2, 2^3, dst), dan operasi pembagian bersisa.`
      : `Mampu mengoperasikan perangkat digital dasar dan memahami konsep urutan instruksi langkah demi langkah.`;

    return {
      karakteristikPesertaDidik: karakteristik,
      pengetahuanAwal,
      minatDanMotivasi: 'Sangat menyukai eksplorasi teknologi, permainan logika teka-teki, dan simulasi interaktif.',
      minatDanKebutuhanBelajar: isBiner
        ? 'Kebutuhan simulasi kartu biner unplugged dan latihan konversi basis bilangan secara terstruktur.'
        : 'Latihan berpikir komputasional (dekomposisi, pengenalan pola, abstraksi, algoritma) melalui simulasi logika sehari-hari tanpa rumus matematika numerik.',
      kesiapanBelajar: isBiner
        ? 'Rentang kesiapan antara peserta didik yang membutuhkan kartu titik visual biner dan peserta didik yang siap mengonversi oktal/heksadesimal.'
        : 'Kesiapan beragam antara peserta didik yang membutuhkan panduan simbol diagram alir dan peserta didik yang siap merancang algoritma multi-cabang.',
      kebutuhanBelajar: isBiner
        ? 'Memerlukan kartu simulasi bit fisik dan tabel nilai posisi perpangkatan dua.'
        : 'Memerlukan studi kasus algoritma kehidupan nyata dan panduan diagram alir (flowchart).',
      karakteristikMateri: isBiner
        ? 'Materi Sistem Bilangan Biner memadukan representasi logika digital dengan konsep nilai tempat bilangan berpangkat dua.'
        : 'Materi Berpikir Komputasional berfokus pada metodologi pemecahan masalah secara runtut tanpa rumus hitungan matematis.',
      potensiMiskonsepsi: isBiner
        ? 'Menganggap bilangan biner 10 bernilai sepuluh dalam desimal (bukan dua).'
        : 'Anggapan keliru bahwa informatika semata-mata tentang mengetik di komputer bukan cara berpikir logis.',
      dukunganDanDiferensiasi: isBiner
        ? 'Penyediaan kartu biner unplugged untuk visualisasi konversi bilangan.'
        : 'Penyediaan templat diagram alir bertahap bagi kelompok pemula.',
      catatanAsumsi: assumptionNote
    };
  }

  // =========================================================================
  // 7. EKONOMI & AKUNTANSI (Konseptual vs Kuantitatif)
  // =========================================================================
  if (subLower.includes('ekonomi') || subLower.includes('akuntansi')) {
    const isAkuntansi = analysis.isQuantitative;

    let karakteristik = hasValidUserChar
      ? rawChar!
      : isAkuntansi
      ? `(Asumsi Awal Pedagogis): Peserta didik pada jenjang ${gradeLevel} membutuhkan latihan ketelitian dan keteraturan tinggi dalam menganalisis bukti transaksi berpasangan dan pembukuan angka keuangan.`
      : `(Asumsi Awal Pedagogis): Peserta didik pada jenjang ${gradeLevel} berinteraksi dengan transaksi jual-beli dan pengelolaan uang saku harian, membutuhkan pembimbingan dalam menyusun skala prioritas konsumsi rasional.`;

    return {
      karakteristikPesertaDidik: karakteristik,
      pengetahuanAwal: hasValidUserPrior
        ? rawPrior!
        : isAkuntansi
        ? 'Memahami saldo normal akun (Harta, Utang, Modal, Pendapatan, Beban) dan operasi hitung penjumlahan/pengurangan dasar.'
        : 'Mengenal konsep nilai uang, kebutuhan primer-sekunder, dan aktivitas belanja sehari-hari.',
      minatDanMotivasi: 'Antusias saat materi dihubungkan dengan pengelolaan uang saku pribadi, simulasi wirausaha, dan transaksi bisnis riil.',
      minatDanKebutuhanBelajar: isAkuntansi
        ? 'Latihan analisis bukti transaksi ke kolom Debit dan Kredit dengan penegakan prinsip keseimbangan mutlak.'
        : 'Studi kasus pengambilan keputusan konsumsi bijak membedakan kebutuhan (needs) dan keinginan (wants) tanpa rumus matematis.',
      kesiapanBelajar: isAkuntansi
        ? 'Rentang kesiapan antara peserta didik yang membutuhkan panduan kode akun dan peserta didik yang siap menyusun neraca lajur mandiri.'
        : 'Kesiapan beragam antara peserta didik yang membutuhkan matriks prioritas dan peserta didik yang siap menganalisis anggaran belanja mandiri.',
      kebutuhanBelajar: isAkuntansi
        ? 'Memerlukan format jurnal umum 5 kolom bergaris dan lembar bukti transaksi otentik.'
        : 'Memerlukan lembar studi kasus anggaran belanja dan simulasi skala prioritas 4 kuadran.',
      karakteristikMateri: isAkuntansi
        ? 'Materi Siklus Akuntansi menekankan ketelitian pencatatan transaksi berpasangan sesuai aturan debit-kredit.'
        : 'Materi Kebutuhan dan Kelangkaan berfokus pada literasi keuangan rasional dan pengambilan keputusan konsumsi tanpa rumus hitungan.',
      potensiMiskonsepsi: isAkuntansi
        ? 'Kekeliruan menempatkan akun bertambah atau berkurang pada kolom debit atau kredit.'
        : 'Menganggap semua keinginan adalah kebutuhan mendesak yang harus segera dipenuhi.',
      dukunganDanDiferensiasi: isAkuntansi
        ? 'Penyediaan tabel pengingat saldo normal akun dan bimbingan telaah bukti transaksi.'
        : 'Penyediaan simulasi belanja berjenjang sesuai anggaran uang saku siswa.',
      catatanAsumsi: assumptionNote
    };
  }

  // =========================================================================
  // 8. MATEMATIKA (Default Aljabar & Topik Matematika Lainnya)
  // =========================================================================
  if (
    subLower.includes('matematika') ||
    ['aljabar', 'persamaan linear', 'bangun datar', 'bangun ruang', 'geometri', 'statistika', 'splsv', 'spldv'].some((k) =>
      combined.includes(k)
    )
  ) {
    const isGeometry = combined.includes('bangun') || combined.includes('ruang') || combined.includes('geometri');

    let karakteristik = hasValidUserChar
      ? rawChar!
      : isGeometry
      ? `(Asumsi Awal Pedagogis): Peserta didik pada jenjang ${gradeLevel} memiliki kemampuan spasial yang sedang berkembang, memerlukan media visual tiga dimensi atau perakitan jaring-jaring karton untuk menghubungkan representasi fisik dengan rumus luas dan volume.`
      : `(Asumsi Awal Pedagogis): Peserta didik pada jenjang ${gradeLevel} berada pada fase transisi kognitif dari operasi aritmetika konkret menuju penalaran aljabar simbolik. Peserta didik antusias menyelesaikan teka-teki logika namun memerlukan jembatan pemodelan nyata untuk memahami konsep variabel dan keseimbangan ruas.`;

    let pengetahuanAwal = hasValidUserPrior
      ? rawPrior!
      : isGeometry
      ? `Mengenal bangun datar prasyarat (persegi, persegi panjang, segitiga), konsep keliling dan luas, serta operasi perkalian dan pembagian bilangan real.`
      : `Memahami operasi hitung dasar bilangan bulat (penjumlahan, pengurangan, perkalian, pembagian), konsep nilai tempat, serta pengenalan awal lambang pengganti bilangan (variabel).`;

    let minatKebutuhan = hasValidUserNeeds
      ? rawNeeds!
      : isGeometry
      ? `Kebutuhan eksplorasi taktil manipulasi objek tiga dimensi, pengamatan jaring-jaring bangun ruang, serta pemahaman membedakan dimensi luas permukaan dan kapasitas volume.`
      : `Kemampuan memahami hubungan antara nilai yang diketahui dan belum diketahui; kebutuhan latihan bertahap terstruktur (scaffolding) dalam menyelesaikan persamaan linear secara sistematis.`;

    return {
      karakteristikPesertaDidik: karakteristik,
      pengetahuanAwal,
      minatDanMotivasi: 'Memiliki motivasi tinggi ketika pembelajaran menghadirkan alat peraga konkret (misal timbangan aljabar atau kubus satuan), teka-teki logika, dan kuis gamifikasi interaktif.',
      minatDanKebutuhanBelajar: minatKebutuhan,
      kesiapanBelajar: isGeometry
        ? 'Rentang kesiapan mencakup peserta didik yang membutuhkan peraga taktil kubus satuan, peserta didik yang siap menghitung luas dan volume reguler, dan peserta didik yang siap memecahkan persoalan kontekstual bertingkat.'
        : 'Rentang kesiapan belajar mencakup peserta didik yang membutuhkan pemodelan konkret (misal analogi timbangan), peserta didik yang siap memanipulasi persamaan simbolik secara mandiri, dan peserta didik yang siap memecahkan masalah kontekstual bertingkat.',
      kebutuhanBelajar: isGeometry
        ? 'Memerlukan model bangun ruang transparan, jaring-jaring karton, serta latihan membedakan konsep luas selimut dan kapasitas isi.'
        : 'Memerlukan latihan bertahap terstruktur (scaffolding) mulai dari peragaan konkret atau grafis menuju manipulasi simbolik aljabar, serta penguatan pemahaman makna relasi tanda sama dengan.',
      karakteristikMateri: isGeometry
        ? 'Materi Geometri Bangun Ruang memadukan penalaran visual-spasial dengan kalkulasi luas permukaan dan volume terukur.'
        : 'Materi Aljabar dan Persamaan Linear Satu Variabel (SPLSV) bersifat logis-simbolik dan menuntut pemahaman relasional tentang keseimbangan ruas serta ketelitian operasi variabel.',
      potensiMiskonsepsi: isGeometry
        ? 'Potensi tertukar antara konsep luas permukaan (dimensi dua) dengan volume kapasitas (dimensi tiga), atau keliru menentukan tinggi tegak bangun ruang.'
        : 'Potensi menganggap tanda sama dengan (=) semata-mata sebagai perintah hitung dan bukan hubungan keseimbangan relasional ruas kiri dan kanan, serta kekeliruan tanda operasi saat memindahkan suku ke ruas lain.',
      dukunganDanDiferensiasi: isGeometry
        ? 'Penyediaan model bangun ruang transparan dan kubus satuan kayu untuk memfasilitasi visualisasi bentuk.'
        : 'Diferensiasi proses melalui lembar kerja berjenjang (konkret-visual-simbolik) dan pendampingan bertahap bagi peserta didik yang membutuhkan bimbingan intensif.',
      catatanAsumsi: assumptionNote
    };
  }

  // =========================================================================
  // 9. GENERAL CONTEXTUAL FALLBACK (UNTUK TOPIK / MAPEL APA PUN LAINNYA)
  // =========================================================================
  return {
    karakteristikPesertaDidik: hasValidUserChar
      ? rawChar!
      : `(Asumsi Awal Pedagogis): Peserta didik pada jenjang ${gradeLevel} antusias terhadap pembelajaran yang menghadirkan aktivitas penyelidikan bermakna, studi kasus kontekstual di lingkungan sekitar, serta kesempatan berkolaborasi dalam kelompok yang aman dan suportif.`,
    pengetahuanAwal: hasValidUserPrior
      ? rawPrior!
      : `Peserta didik telah mengenal konsep dasar prasyarat terkait "${topic}" dari materi pada jenjang sebelumnya serta memiliki pengalaman relevan dalam kehidupan sehari-hari.`,
    minatDanMotivasi: `Memiliki motivasi tinggi ketika topik "${topic}" dikaitkan langsung dengan fenomena nyata, media visual interaktif, dan dialog reflektif yang merangsang daya nalar.`,
    minatDanKebutuhanBelajar: hasValidUserNeeds
      ? rawNeeds!
      : `Kebutuhan bimbingan terstruktur dalam mengonseptualisasikan materi "${topic}", memperkuat penalaran analitis, serta mengaplikasikan pengetahuan ke dalam pemecahan masalah otentik tanpa rumus kuantitatif jika materi bukan bidang hitung.`,
    kesiapanBelajar: `Rentang kesiapan belajar mencakup peserta didik yang membutuhkan pendampingan terbimbing dengan analogi konkret, peserta didik yang mampu belajar mandiri secara reguler, dan peserta didik yang siap mengeksplorasi tantangan pengayaan kontekstual lanjutan.`,
    kebutuhanBelajar: `Memerlukan lembar kerja berbasis penyelidikan terarah, panduan diskusi kelompok yang terstruktur, serta umpan balik berkala dari guru sepanjang proses kegiatan belajar.`,
    karakteristikMateri: analysis.isQuantitative
      ? `Materi "${topic}" bersifat kuantitatif dan membutuhkan ketelitian pemahaman konsep besaran terukur serta langkah kalkulasi yang runtut.`
      : `Materi "${topic}" bersifat konseptual dan analitis, mengutamakan penalaran kritis, pemahaman esensi materi, serta kecakapan komunikasi tanpa melibatkan rumus matematika paksaan.`,
    potensiMiskonsepsi: analysis.isQuantitative
      ? `Potensi kekeliruan dalam memaknai korelasi antarbesaran atau kelalaian penulisan satuan pengukuran.`
      : `Potensi menyederhanakan konsep tanpa melihat konteks fenomena secara utuh atau keliru membedakan gagasan utama dengan detail pendukung.`,
    dukunganDanDiferensiasi: `Diferensiasi konten disediakan lewat variasi tingkat kompleksitas bahan ajar; diferensiasi proses melalui pendampingan terbimbing bagi kelompok yang membutuhkan penguatan konsep.`,
    catatanAsumsi: assumptionNote
  };
}
