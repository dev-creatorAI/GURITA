import React, { useState } from 'react';
import {
  GameStudioConfig,
  GameDifficulty,
  GameMode,
  GameTypeOption,
  GameColorTheme,
  GameDesignTheme,
  QuizQuestion
} from '../types';
import { INITIAL_SAMPLE_QUESTIONS } from '../data/mockData';
import {
  Gamepad2,
  Sparkles,
  Copy,
  Check,
  ExternalLink,
  RotateCcw,
  Sliders,
  Layers,
  Clock,
  Users,
  Trophy,
  History,
  FileCode,
  Play,
  ArrowRight,
  Info,
  Shield,
  Palette,
  Volume2,
  Monitor,
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  Lightbulb
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface PromptHistoryItem {
  id: string;
  timestamp: string;
  gameName: string;
  gameType: string;
  prompt: string;
}

export const GameStudioSection: React.FC = () => {
  // Active sub-tab: 'generator' | 'playtest'
  const [activeTab, setActiveTab] = useState<'generator' | 'playtest'>('generator');

  // Form Configuration State
  const [config, setConfig] = useState<GameStudioConfig>({
    gameName: 'Misi Penjelajah Samudra: Misteri Ekosistem Laut',
    subject: 'IPA & Literasi Sains',
    gradeLevel: 'Semua Jenjang (Dapat Disesuaikan: PAUD, SD, SMP, SMA, SMK)',
    topic: 'Rantai Makanan & Pelestarian Terumbu Karang',
    learningGoal: 'Peserta didik dapat menganalisis peran produsen, konsumen, dan dekomposer dalam ekosistem laut serta mengidentifikasi ancaman pemutihan karang.',
    questionCount: 5,
    difficulty: 'Sedang',
    gameType: 'Kuis Interaktif',
    customGameTypeDescription: '',
    mode: 'Individu',
    individualPlayerCount: 1,
    individualScoreSystem: '+100 poin per jawaban tepat, bonus kecepatan +20 poin',
    individualRecapDetails: 'Tampilkan persentase ketepatan, predikat gelar peneliti, dan rekomendasi materi yang perlu dipelajari kembali.',
    teamCount: 4,
    teamNames: 'Tim Lumba-Lumba, Tim Hiu Cepat, Tim Penyu Bijak, Tim Paus Perkasa',
    membersPerTeam: 4,
    turnMechanism: 'Bergantian menjawab per soal secara melingkar (Round Robin)',
    teamScoreboardFormat: 'Papan peringkat real-time dengan animasi trofi emas, perak, dan perunggu',
    winnerDetermination: 'Tim dengan akumulasi poin tertinggi di akhir sesi',
    durationMinutes: 10,
    scoreSystem: '+100 poin per jawaban tepat, bonus combo kecepatan +20 poin',
    winLoseRule: 'Mencapai minimal 400 poin untuk memenangkan lencana Peneliti Laut Kehormatan',
    colorTheme: 'Biru dan cyan futuristik',
    customColorHex: '#00E5FF',
    designTheme: 'Cyber Arena',
    customDesignDescription: '',
    characterStyle: 'Karakter penjelajah ilmiah adaptif ramah anak',
    backgroundStyle: 'Ruang kendali kapal selam eksplorasi laut dengan aksen grid digital',
    buttonShape: 'Rounded Modern dengan efek Glow',
    visualEffects: 'Partikel gelembung bio-luminescence neon cyan',
    animationStyle: 'Halus dan Responsif (Motion 60 FPS)',
    soundEffects: 'Modern Synth Nada Edukatif Halus',
    language: 'Bahasa Indonesia',
    enableTimer: true,
    enableScoreboard: true,
    enableLivesOrEnergy: true,
    enableSoundEffects: true,
    enableAnimations: true,
    enableInstantFeedback: true,
    enableRestartButton: true,
    enableHints: true,
    enableResultsRecap: true,
    memoryPairCount: 8,
    wheelSegments: 'Rantai Makanan (+100), Pemutihan Karang (+150), Zona Palung (+200), Putar Ulang, Zonasi Ikan (+120), Teka-Teki Plankton (+80)',
    boardGridSize: '8x8 (64 Kotak)',
    dragDropItems: 'Fitoplankton -> Produsen, Zooplankton -> Konsumen I, Ikan Badut -> Konsumen II, Hiu Karang -> Konsumen Puncak'
  });

  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [isEditingPrompt, setIsEditingPrompt] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [copyFeedback, setCopyFeedback] = useState<string>('');
  const [promptHistory, setPromptHistory] = useState<PromptHistoryItem[]>([]);

  // Playtest Arena Interactive State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);
  const [lives, setLives] = useState<number>(3);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [gameFinished, setGameFinished] = useState<boolean>(false);

  // GENERATOR LOGIC: Synthesizes full tailored prompt for Gemini Canvas and Canva AI
  const handleGeneratePrompt = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    // Specific game logic instructions based on gameType
    let specificGameInstructions = '';

    switch (config.gameType) {
      case 'Memory Game':
      case 'Matching Game':
        specificGameInstructions = `
[MEKANIKA SPESIFIK MEMORY GAME & MATCHING]:
1. Kartu Interaktif: Tampilkan ${config.memoryPairCount || 8} pasang kartu (total ${(config.memoryPairCount || 8) * 2} kartu) dalam susunan grid rapi dengan animasi flip kartu 3D halus saat diklik.
2. Logika Pasangan: Setiap pasang kartu menghubungkan "Konsep Materi" dengan "Definisi / Gambar / Contoh" yang relevan dengan topik ${config.topic}.
3. Pemrosesan Hasil:
   - Jika 2 kartu cocok: beri efek visual hijau bercahaya, suara sukses, kunci kartu tetap terbuka, dan tambah skor +100.
   - Jika tidak cocok: tampilkan pesan singkat, tunggu 1 detik, lalu balikkan kembali kartu secara otomatis dengan efek goyangan lembut.
4. Mode Permainan: ${config.mode === 'Tim' ? `Terapkan giliran antar tim (${config.teamNames}). Jika tebakan tim benar, tim berhak memilih lagi. Jika salah, giliran beralih ke tim berikutnya. Catat papan skor masing-masing tim.` : `Pemain tunggal berlomba menyelesaikan seluruh pasangan sebelum waktu habis dengan counter jumlah percobaan (moves count).`}
5. Selesai Permainan: Tampilkan rekap bintang 1-3 berdasarkan kecepatan waktu dan efisiensi langkah.`;
        break;

      case 'Who Wants to Be a Millionaire':
        specificGameInstructions = `
[MEKANIKA SPESIFIK WHO WANTS TO BE A MILLIONAIRE]:
1. Struktur Tangga Hadiah: Sediakan 15 tingkatan pertanyaan dengan nilai virtual dari Rp 50.000 hingga Rp 1.000.000.000 (atau Poin Ilmu 50 s.d. 1.000.000).
2. Tingkat Kesulitan Bertingkat: Pertanyaan 1-5 (Dasar/LOTS), 6-10 (Menengah/Aplikasi), 11-15 (Tinggi/HOTS & Penalaran Kritis).
3. Titik Aman (Safety Net): Tingkat 5 dan Tingkat 10 menjadi titik aman di mana poin tidak akan hilang jika gagal di tingkatan berikutnya.
4. 3 Bantuan Klasik (Lifelines):
   - 50:50 (Fifty-Fifty): Mengeliminasi 2 opsi salah secara acak dan menyisakan 1 jawaban benar + 1 pengecoh.
   - Tanya Audiens / Poling Kelas: Menampilkan simulasi grafik persentase pilihan suara siswa/penonton.
   - Bantuan Petunjuk Ahli / Clue: Memberikan petunjuk penalaran kontekstual yang membimbing siswa tanpa langsung membocorkan jawaban.
5. Konfirmasi Jawaban: Tombol harus meminta konfirmasi "Kunci jawaban ini?" dengan efek audio tegang sebelum memunculkan warna hijau (benar) atau merah (salah).
6. Kondisi Berakhir: Jika salah menjawab, tampilkan evaluasi dan hadiah aman yang berhasil diraih.`;
        break;

      case 'Clash of Champions':
        specificGameInstructions = `
[MEKANIKA SPESIFIK ARENA CLASH OF CHAMPIONS EDUKASI (ORIGINAL)]:
1. Konsep Arena: Kompetisi adu nalar ilmiah dan kecepatan berpikir orisinal antar tim/peserta didik tanpa melanggar hak cipta nama atau logo pihak luar.
2. Format Babak Berantai (3 Round System):
   - Round 1 - Extreme Recall: Soal visual cepat mengenai terminologi kunci ${config.topic} dengan timer ketat 15 detik per soal.
   - Round 2 - Logic Puzzle & Number Duel: Pemecahan teka-teki logika materi yang menguji daya komputasional dan penalaran relasional.
   - Round 3 - Ultimate Championship Duel: Soal analisis kasus HOTS penentu peringkat akhir.
3. Mode Peserta: ${config.mode === 'Tim' ? `Setiap tim (${config.teamNames}) memiliki bel cepat (buzzer), sistem rebutan poin, dan penalti minus jika salah menjawab pada sesi rebutan.` : `Setiap pemain berlomba mencetak akumulasi poin tertinggi dalam leaderboard langsung.`}
4. Estetika Visual: Suasana stadium esports profesional dengan pencahayaan dinamis, papan skor digital raksasa, dan perayaan gelar juara nalar.`;
        break;

      case 'RPG Edukasi':
      case 'Adventure Game':
        specificGameInstructions = `
[MEKANIKA SPESIFIK RPG EDUKASI / ADVENTURE]:
1. Karakter Pemain: Pemain memilih avatar penjelajah (misal: Ahli Biologi, Mekanik Sains, Navigator Alam).
2. Alur Narasi Misi: Pemain menjelajahi peta wilayah (misal: Laboratorium Bawah Laut, Hutan Bakau, Ruang Antariksa) untuk memecahkan krisis ekosistem.
3. Sistem Dialog & NPC: Bertemu dengan NPC (tokoh ramah) yang memberikan petunjuk materi, potongan petunjuk, dan misi sampingan.
4. Pertarungan Konsep (Knowledge Battles): Mengalahkan monster miskonsepsi sains bukan dengan kekerasan, melainkan dengan menjawab pertanyaan fakta ilmiah dengan tepat.
5. Inventori Pengetahuan: Mendapatkan "Lencana Ilmu" setiap kali menyelesaikan tantangan materi, yang tersimpan dalam inventori pemain selama sesi.`;
        break;

      case 'Ular Tangga':
      case 'Board Game':
        specificGameInstructions = `
[MEKANIKA SPESIFIK ULAR TANGGA & BOARD GAME]:
1. Papan Interaktif: Grid papan ${config.boardGridSize || '8x8 (64 Kotak)'} dengan visual tema ${config.designTheme}.
2. Dadu Digital: Dadu acak (1-6) animasi 3D bergulir dengan tombol "Kocok Dadu".
3. Pion Pemain/Tim: Pion bergerak otomatis kotak demi kotak sesuai angka dadu yang muncul.
4. Kotak Tangga: Melompat ke kotak atas setelah pemain berhasil menjawab 1 pertanyaan materi singkat.
5. Kotak Ular: Meluncur ke bawah jika gagal menjawab pertanyaan tantangan penyelematan.
6. Giliran & Kemenangan: ${config.mode === 'Tim' ? `Giliran bergantian antar tim (${config.teamNames}). Tim pertama yang mencapai kotak terakhir tepat dinobatkan sebagai pemenang.` : `Pemain mencapai kotak akhir dengan rekap waktu tercepat.`}`;
        break;

      case 'Spin the Wheel':
        specificGameInstructions = `
[MEKANIKA SPESIFIK SPIN THE WHEEL]:
1. Roda Keberuntungan Visual: Roda warna-warni yang berputar dengan efek deselerasi fisika realistis.
2. Segmen Roda: Berisi sektor ${config.wheelSegments || 'Tantangan Materi, Skor Bonus, Zona Kritis'}.
3. Logika Putaran: Saat roda berhenti, tunjukkan jarum penunjuk ke segmen terpilih dan buka pop-up soal yang terhubung dengan segmen tersebut.
4. Mode Giliran: ${config.mode === 'Tim' ? `Setiap tim (${config.teamNames}) memutar roda secara bergantian. Poin dari jawaban tepat langsung masuk ke brankas skor tim.` : `Pemain memutar roda untuk mengumpulkan skor target.`}`;
        break;

      case 'Drag and Drop':
        specificGameInstructions = `
[MEKANIKA SPESIFIK DRAG AND DROP]:
1. Item Dapat Dipindahkan: Elemen berupa kartu konsep (${config.dragDropItems || 'Item materi'}) yang dapat diseret dengan mouse pada desktop atau digeser dengan sentuhan jari pada layar ponsel/tablet.
2. Zona Target Drop: Kotak target kategori yang membesar dan bercahaya (highlight) saat item diarahkan ke atasnya.
3. Validasi Langsung: Jika diletakkan di zona yang benar, item terkunci dengan efek denting emas. Jika salah, item membal kembali ke posisi semula disertai petunjuk.
4. Alternatif Interaksi: Selain drag, sediakan opsi klik item lalu klik zona tujuan untuk perangkat dengan layar sentuh terbatas.`;
        break;

      default:
        specificGameInstructions = `
[MEKANIKA SPESIFIK GAME (${config.gameType})]:
1. Logika Permainan: Sediakan alur permainan ${config.gameType} yang interaktif dan responsif sesuai materi ${config.topic}.
2. Soal & Aktivitas: Susun ${config.questionCount} tantangan bergradasi dari pemahaman dasar ke penalaran kritis dengan umpan balik langsung.
3. Kemenangan & Skor: Terapkan sistem skor ${config.scoreSystem} dan aturan kemenangan ${config.winLoseRule}.`;
    }

    // Helper: Dynamic color palette detail
    const getColorPaletteDetail = (theme: GameColorTheme, hex?: string) => {
      switch (theme) {
        case 'Biru dan cyan futuristik':
          return 'Dominan Biru Gelap (Deep Navy) dengan aksen Neon Cyan dan Electric Blue untuk nuansa teknologi modern yang bersih.';
        case 'Ungu neon':
          return 'Dominan Deep Violet dengan aksen Neon Purple, Magenta, dan Lavender yang artistik dan elegan.';
        case 'Hijau digital':
          return 'Dominan Hijau Hutan (Forest Green) dengan aksen Cyber Emerald dan Mint Green yang segar dan ilmiah.';
        case 'Oranye kompetitif':
          return 'Dominan Oranye berenergi tinggi dengan aksen Amber, Kuning Hangat, dan Putih Kontras yang membakar semangat.';
        case 'Merah dan hitam':
          return 'Dominan Hitam Arang (Charcoal Black) dengan aksen Crimson Red dan Putih Kontras yang tegas dan dramatis.';
        case 'Pastel':
          return 'Palet pastel lembut ramah anak (Soft Pastel Blue, Mint, Peach, dan Putih Krem) dengan latar bersih dan keterbacaan tinggi.';
        case 'Warna kustom':
          return hex ? `Kombinasi warna utama kustom ${hex} dengan warna pendukung yang serasi, bersih, dan kontras sempurna.` : 'Kombinasi palet warna kustom yang harmonis dan nyaman di mata.';
        default:
          return `${theme} dengan kontras tinggi yang ramah untuk peserta didik.`;
      }
    };

    // Helper: Dynamic design theme detail
    const getDesignThemeDetail = (theme: GameDesignTheme, customDesc?: string) => {
      if (customDesc) return customDesc;
      switch (theme) {
        case 'Cyber Arena':
          return 'Nuansa arena digital dengan garis batas berpendar halus, tata letak futuristik, dan grid modern.';
        case 'Kerajaan Fantasi':
          return 'Nuansa kerajaan fantasi dengan ornamen klasik dongeng, perkamen, dan warna-warna magis lembut.';
        case 'Game Show':
          return 'Nuansa panggung kuis televisi spektakuler dengan lampu panggung, podium peserta, dan papan skor dinamis.';
        case 'Esports':
          return 'Estetika kompetisi esports profesional dengan tipografi tegas, sudut dinamis, dan visual kompetitif.';
        case 'Pixel Art':
          return 'Gaya retro pixel art 8-bit / 16-bit yang ikonik, berjiwa permainan klasik, dan ramah anak.';
        case 'Kartun 3D':
          return 'Gaya kartun 3D penuh warna, ramah anak, ekspresif, dan menyenangkan.';
        case 'Petualangan':
          return 'Gaya petualangan penjelajah alam dengan peta ekspedisi, kompas, dan elemen alam hidup.';
        case 'Misteri':
          return 'Gaya investigasi detektif dengan berkas kasus, petunjuk misteri, dan atmosfer rasa ingin tahu.';
        case 'Minimalis':
          return 'Gaya minimalis bersih, ruang putih lapang, tipografi rapi, tanpa ornamen berlebihan.';
        default:
          return `${theme} yang proporsional dan mendukung fokus belajar.`;
      }
    };

    // Check if user explicitly requested octopus mascot
    const isOctopusExplicitlyRequested =
      config.characterStyle.toLowerCase().includes('gurita') ||
      config.characterStyle.toLowerCase().includes('octopus') ||
      config.gameName.toLowerCase().includes('gurita') ||
      config.topic.toLowerCase().includes('gurita');

    const characterGuidance = isOctopusExplicitlyRequested
      ? `Gaya Karakter: ${config.characterStyle} (Sertakan karakter/maskot gurita edukatif sesuai permintaan pengguna)`
      : `Gaya Karakter / Avatar: ${config.characterStyle || 'Avatar penjelajah edukasi'} (PENTING: JANGAN menambahkan maskot gurita, karakter kartun gurita, atau elemen logo gurita yang tidak diminta secara eksplisit oleh pengguna. Gunakan hanya karakter yang relevan dengan topik "${config.topic}")`;

    // Build master prompt for Gemini Canvas & Canva AI strictly following user choices
    const masterPrompt = `Bertindaklah sebagai Senior Creative Educational Game Designer dan Full-Stack Web Game Developer ahli HTML5, CSS3, dan modern Vanilla JavaScript.

Saya ingin membuat game edukasi berbasis web yang BENAR-BENAR INTERAKTIF dan DAPAT DIMAINKAN LANGSUNG di Gemini Canvas atau dikembangkan aset visualnya di Canva AI (bukan sekadar mockup statis atau potongan gambar).

Pastikan seluruh kode HTML, CSS, dan JavaScript dibuat dalam SATU FILE LENGKAP yang mandiri (self-contained), responsif di layar komputer maupun smartphone, dan bebas dari error eksternal.

==================================================
1. IDENTITAS & TUJUAN PEMBELAJARAN
==================================================
- Nama Game: "${config.gameName}"
- Mata Pelajaran: ${config.subject}
- Sasaran / Jenjang Pendidikan: ${config.gradeLevel}
- Topik / Materi Pembelajaran: ${config.topic}
- Tujuan Pembelajaran: ${config.learningGoal}
- Bahasa Antarmuka: ${config.language}

==================================================
2. FORMAT & MEKANISME GAME
==================================================
- Jenis Permainan: ${config.gameType} ${config.customGameTypeDescription ? `(${config.customGameTypeDescription})` : ''}
- Mode Permainan: ${config.mode}
${config.mode === 'Tim' ? `- Jumlah Tim: ${config.teamCount || 4} Tim
- Nama Tim: ${config.teamNames || 'Tim A, Tim B, Tim C, Tim D'}
- Anggota per Tim: ${config.membersPerTeam || 4} Peserta Didik
- Mekanisme Giliran: ${config.turnMechanism || 'Bergantian menjawab'}
- Papan Skor Tim: ${config.teamScoreboardFormat || 'Papan skor bersama dengan indikator tim yang sedang aktif'}
- Penentuan Pemenang: ${config.winnerDetermination || 'Skor tertinggi saat permainan berakhir'}` : `- Jumlah Pemain: ${config.individualPlayerCount || 1} Pemain
- Sistem Skor Individu: ${config.individualScoreSystem || config.scoreSystem}
- Rekap Hasil Individu: ${config.individualRecapDetails || 'Statistik skor dan akurasi per pemain'}`}
- Jumlah Soal / Tantangan: ${config.questionCount} Butir Soal Bertingkat
- Tingkat Kesulitan: ${config.difficulty}
- Estimasi Durasi: ${config.durationMinutes} Menit

${specificGameInstructions}

==================================================
3. TEMA VISUAL & DESAIN ANTARMUKA
==================================================
- Palet Warna yang Dipilih Pengguna: ${config.colorTheme}
  * Panduan Palet Warna: ${getColorPaletteDetail(config.colorTheme, config.customColorHex)}
- Gaya Desain Visual yang Dipilih Pengguna: ${config.designTheme} ${config.customDesignDescription ? `(${config.customDesignDescription})` : ''}
  * Panduan Gaya Desain: ${getDesignThemeDetail(config.designTheme, config.customDesignDescription)}
- ${characterGuidance}
- Gaya Latar Belakang: ${config.backgroundStyle || 'Latar belakang tematik sesuai materi yang tidak mengaburkan teks permainan'}
- Bentuk Tombol: ${config.buttonShape}
- Efek Visual: ${config.visualEffects}
- Gaya Animasi: ${config.animationStyle}
- Efek Suara: ${config.soundEffects} (Gunakan Web Audio API sintetis browser agar berbunyi tanpa butuh file audio eksternal)

==================================================
4. FITUR TAMBAHAN YANG WAJIB BERFUNGSI
==================================================
- Timer: ${config.enableTimer ? `Ya, timer hitung mundur ${config.durationMinutes} menit dengan animasi lingkaran atau bilah progress bar.` : 'Tidak'}
- Papan Skor (Scoreboard): ${config.enableScoreboard ? 'Ya, skor terbarui secara otomatis secara real-time.' : 'Tidak'}
- Nyawa / Energi: ${config.enableLivesOrEnergy ? 'Ya, sediakan 3 ikon hati (nyawa) yang berkurang jika jawaban salah.' : 'Tidak'}
- Efek Suara: ${config.enableSoundEffects ? 'Ya, gunakan Web Audio API (denting ceria saat benar, nada lembut saat salah).' : 'Tidak'}
- Animasi Transisi: ${config.enableAnimations ? 'Ya, transisi halus saat berganti pertanyaan atau giliran.' : 'Tidak'}
- Umpan Balik Langsung: ${config.enableInstantFeedback ? 'Ya, munculkan pop-up penjelasan konsep singkat dan fakta seru saat jawaban dipilih.' : 'Tidak'}
- Tombol Mulai Ulang (Restart): ${config.enableRestartButton ? 'Ya, tombol untuk mengulang permainan dari awal kapan saja.' : 'Tidak'}
- Bantuan / Petunjuk: ${config.enableHints ? 'Ya, tombol petunjuk yang memberikan kata kunci penalaran.' : 'Tidak'}
- Rekap Hasil Akhir: ${config.enableResultsRecap ? 'Ya, layar game-over menampilkan total skor, persentase kebenaran, bintang apresiasi (1-3), dan tombol main lagi.' : 'Tidak'}

==================================================
5. STANDAR KUALITAS KODE (GEMINI CANVAS & CANVA AI)
==================================================
1. Tulis seluruh kode dalam format satu kesatuan:
   - Bagian HTML: Elemen game, layar awal (start screen), kanvas permainan (game arena), dan layar rekap (game over).
   - Bagian CSS: Desain responsif, font terbaca jelas, gaya visual sesuai tema yang dipilih, warna kontras tinggi, dan tata letak flexbox/grid.
   - Bagian JavaScript: State management permainan (skor, nyawa, giliran, timer), event listener sentuhan dan klik mouse, logika validasi jawaban, dan render dinamis.
2. Pastikan SEMUA TOMBOL BERFUNGSI dengan respons klik yang nyata.
3. Berikan bank data minimal ${config.questionCount} soal/tantangan contoh topik "${config.topic}" yang realistis, akurat, dan sesuai jenjang ${config.gradeLevel}.
4. Sediakan penanganan kondisi selesai permainan (Game Over atau Victory) yang memuaskan dan mendidik.

Mohon hasilkan sekarang kode lengkap yang dapat saya jalankan dan mainkan di Gemini Canvas atau kembangkan di Canva AI!`;

    setGeneratedPrompt(masterPrompt);
    setIsEditingPrompt(false);

    // Save to session history
    const historyItem: PromptHistoryItem = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      gameName: config.gameName,
      gameType: config.gameType,
      prompt: masterPrompt
    };
    setPromptHistory((prev) => [historyItem, ...prev.slice(0, 4)]);

    confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
  };

  // Robust Copy prompt handler with notification and fallback
  const handleCopyPrompt = () => {
    if (!generatedPrompt) return;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(generatedPrompt)
        .then(() => {
          setCopied(true);
          setCopyFeedback('Prompt berhasil disalin ke clipboard!');
          setTimeout(() => {
            setCopied(false);
            setCopyFeedback('');
          }, 3500);
        })
        .catch(() => {
          fallbackCopyText(generatedPrompt);
        });
    } else {
      fallbackCopyText(generatedPrompt);
    }
  };

  const fallbackCopyText = (text: string) => {
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      textArea.remove();
      setCopied(true);
      setCopyFeedback('Prompt berhasil disalin!');
      setTimeout(() => {
        setCopied(false);
        setCopyFeedback('');
      }, 3500);
    } catch (err) {
      alert('Silakan pilih dan salin teks prompt di dalam kotak secara manual (Ctrl+C / Cmd+C).');
    }
  };

  // Preset sample configuration loaders across levels
  const handleLoadPreset = (presetName: 'ular-tangga' | 'millionaire' | 'clash') => {
    if (presetName === 'ular-tangga') {
      setConfig({
        ...config,
        gameName: 'Ular Tangga Ekosistem: Misi Penyelamat Bumi',
        subject: 'IPA & Lingkungan Hidup',
        gradeLevel: 'Fase B & C (SD) atau Fase D (SMP)',
        topic: 'Interaksi Ekosistem & Konservasi Sumber Daya Alam',
        gameType: 'Ular Tangga',
        mode: 'Tim',
        teamCount: 4,
        teamNames: 'Tim Elang Jawa, Tim Harimau Sumatra, Tim Badak Jawa, Tim Orangutan',
        colorTheme: 'Hijau digital',
        designTheme: 'Petualangan',
        boardGridSize: '8x8 (64 Kotak)'
      });
    } else if (presetName === 'millionaire') {
      setConfig({
        ...config,
        gameName: 'Cendekia Nusantara: Menuju 1 Miliar Poin',
        subject: 'IPS & Sejarah Indonesia',
        gradeLevel: 'Fase D (SMP) atau Fase E (SMA)',
        topic: 'Pergerakan Nasional & Peristiwa Rengasdengklok',
        gameType: 'Who Wants to Be a Millionaire',
        mode: 'Individu',
        questionCount: 15,
        difficulty: 'Sedang',
        colorTheme: 'Ungu neon',
        designTheme: 'Game Show'
      });
    } else {
      setConfig({
        ...config,
        gameName: 'Clash of Science & Tech Champions',
        subject: 'Matematika Terapan & Sains Kejuruan',
        gradeLevel: 'Fase E & F (SMA/SMK) atau Lintas Jenjang',
        topic: 'Penalaran Aljabar, Sains Terapan, dan Logika Komputasi',
        gameType: 'Clash of Champions',
        mode: 'Tim',
        teamCount: 4,
        teamNames: 'Tim Galileo, Tim Einstein, Tim Newton, Tim Curie',
        colorTheme: 'Oranye kompetitif',
        designTheme: 'Esports'
      });
    }
    setTimeout(() => {
      handleGeneratePrompt();
    }, 50);
  };

  // Playtest Arena logic
  const sampleQuestions = INITIAL_SAMPLE_QUESTIONS;
  const currentQ = sampleQuestions[currentQuestionIndex] || sampleQuestions[0];

  const handleSelectOption = (index: number) => {
    if (showFeedback || gameFinished) return;
    setSelectedOption(index);
    setShowFeedback(true);

    const isCorrect = index === currentQ.correctIndex;
    if (isCorrect) {
      setScore((prev) => prev + 100);
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
    } else {
      setLives((prev) => {
        const next = prev - 1;
        if (next <= 0) {
          setGameFinished(true);
        }
        return next;
      });
    }
  };

  const handleNextPlaytest = () => {
    setShowFeedback(false);
    setSelectedOption(null);
    if (currentQuestionIndex < sampleQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setGameFinished(true);
      confetti({ particleCount: 60, spread: 80, origin: { y: 0.5 } });
    }
  };

  const handleRestartPlaytest = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setScore(0);
    setLives(3);
    setShowFeedback(false);
    setGameFinished(false);
  };

  return (
    <section id="game-studio" className="py-20 md:py-28 relative bg-[#071426] border-t border-[#2979FF]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#FFD166]">
              <Gamepad2 className="w-4 h-4 text-[#FFD166]" />
              <span>Studio Pembuat Game Edukasi Interaktif</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Generator Prompt Game Gemini Canvas & Canva AI
            </h2>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed text-balance">
              Rancang game edukasi berbasis web untuk peserta didik di semua jenjang dengan 22 pilihan mekanisme permainan. Salin prompt lengkap yang dihasilkan dan gunakan langsung di <strong>Gemini Canvas</strong> atau <strong>Canva AI</strong>.
            </p>
          </div>

          {/* Quick Sub-Tab Toggle */}
          <div className="flex items-center p-1 rounded-2xl bg-[#0B1B31] border border-slate-800 shrink-0">
            <button
              onClick={() => setActiveTab('generator')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'generator'
                  ? 'bg-gradient-to-r from-[#2979FF] to-[#00E5FF] text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>Generator Prompt</span>
            </button>
            <button
              onClick={() => setActiveTab('playtest')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'playtest'
                  ? 'bg-gradient-to-r from-[#2979FF] to-[#00E5FF] text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Play className="w-3.5 h-3.5 text-[#FFD166]" />
              <span>Uji Coba Cepat (Playtest)</span>
            </button>
          </div>
        </div>

        {/* SUB-TAB 1: PROMPT GENERATOR */}
        {activeTab === 'generator' && (
          <div className="space-y-8 animate-fade-in">
            {/* Quick Presets Bar */}
            <div className="p-4 rounded-2xl bg-[#0B1B31] border border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#FFD166]" />
                <span className="text-xs font-bold text-slate-200">Preset Contoh Lintas Jenjang:</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => handleLoadPreset('ular-tangga')}
                  className="px-3 py-1.5 rounded-xl bg-[#071426] hover:bg-[#122A4E] border border-emerald-500/40 text-xs font-medium text-emerald-300 transition-colors cursor-pointer"
                >
                  🎲 Ular Tangga IPA (SD/SMP)
                </button>
                <button
                  onClick={() => handleLoadPreset('millionaire')}
                  className="px-3 py-1.5 rounded-xl bg-[#071426] hover:bg-[#122A4E] border border-purple-500/40 text-xs font-medium text-purple-300 transition-colors cursor-pointer"
                >
                  🏆 Millionaire IPS (SMP/SMA)
                </button>
                <button
                  onClick={() => handleLoadPreset('clash')}
                  className="px-3 py-1.5 rounded-xl bg-[#071426] hover:bg-[#122A4E] border border-amber-500/40 text-xs font-medium text-amber-300 transition-colors cursor-pointer"
                >
                  ⚡ Clash of Champions (SMA/SMK/Umum)
                </button>
              </div>
            </div>

            {/* 2-Zone Workspace: 17 Parameters Form vs Output Prompt Canvas */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Form Parameters (5 cols) */}
              <div className="lg:col-span-5 p-6 sm:p-7 rounded-3xl bg-[#0B1B31] border border-[#2979FF]/25 shadow-xl space-y-6">
                <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-[#00E5FF]" />
                      <span>Parameter Game Edukasi</span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Pilih dari 22 jenis game dan sesuaikan aturan pembelajaran
                    </p>
                  </div>
                </div>

                <form onSubmit={handleGeneratePrompt} className="space-y-4 text-xs">
                  {/* 1. Nama Game */}
                  <div className="space-y-1">
                    <label className="text-slate-300 font-medium">1. Nama Game</label>
                    <input
                      type="text"
                      value={config.gameName}
                      onChange={(e) => setConfig({ ...config, gameName: e.target.value })}
                      required
                      className="w-full px-3 py-2 rounded-xl bg-[#071426] border border-slate-700 text-slate-200 focus:border-[#00E5FF] focus:outline-none"
                    />
                  </div>

                  {/* 2 & 3. Mapel & Jenjang */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-slate-300 font-medium">2. Mata Pelajaran</label>
                      <input
                        type="text"
                        value={config.subject}
                        onChange={(e) => setConfig({ ...config, subject: e.target.value })}
                        required
                        className="w-full px-3 py-2 rounded-xl bg-[#071426] border border-slate-700 text-slate-200 focus:border-[#00E5FF] focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-slate-300 font-medium">3. Jenjang / Fase / Kelas</label>
                      <input
                        type="text"
                        value={config.gradeLevel}
                        onChange={(e) => setConfig({ ...config, gradeLevel: e.target.value })}
                        placeholder="Contoh: PAUD, SD Kelas 4, SMP Kelas 7, SMA/SMK"
                        required
                        className="w-full px-3 py-2 rounded-xl bg-[#071426] border border-slate-700 text-slate-200 focus:border-[#00E5FF] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* 4 & 5. Topik & Tujuan */}
                  <div className="space-y-1">
                    <label className="text-slate-300 font-medium">4. Topik / Materi</label>
                    <input
                      type="text"
                      value={config.topic}
                      onChange={(e) => setConfig({ ...config, topic: e.target.value })}
                      required
                      className="w-full px-3 py-2 rounded-xl bg-[#071426] border border-slate-700 text-slate-200 focus:border-[#00E5FF] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-300 font-medium">5. Tujuan Pembelajaran</label>
                    <textarea
                      rows={2}
                      value={config.learningGoal}
                      onChange={(e) => setConfig({ ...config, learningGoal: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#071426] border border-slate-700 text-slate-200 focus:border-[#00E5FF] focus:outline-none"
                    />
                  </div>

                  {/* 6 & 7. Jumlah Soal & Tingkat Kesulitan */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-slate-300 font-medium">6. Jumlah Soal</label>
                      <input
                        type="number"
                        min={3}
                        max={25}
                        value={config.questionCount}
                        onChange={(e) => setConfig({ ...config, questionCount: Number(e.target.value) })}
                        className="w-full px-3 py-2 rounded-xl bg-[#071426] border border-slate-700 text-slate-200 focus:border-[#00E5FF] focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-slate-300 font-medium">7. Tingkat Kesulitan</label>
                      <select
                        value={config.difficulty}
                        onChange={(e: any) => setConfig({ ...config, difficulty: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#071426] border border-slate-700 text-slate-200 focus:border-[#00E5FF] focus:outline-none"
                      >
                        <option value="Mudah">Mudah (Dasar/LOTS)</option>
                        <option value="Sedang">Sedang (Aplikasi)</option>
                        <option value="Sulit">Sulit (Penalaran/HOTS)</option>
                      </select>
                    </div>
                  </div>

                  {/* 8. Jenis Permainan (22 Options) */}
                  <div className="space-y-1">
                    <label className="text-slate-300 font-medium text-[#FFD166]">
                      8. Jenis Permainan (22 Pilihan)
                    </label>
                    <select
                      value={config.gameType}
                      onChange={(e: any) => setConfig({ ...config, gameType: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#071426] border border-[#FFD166]/40 text-slate-200 font-semibold focus:border-[#FFD166] focus:outline-none"
                    >
                      <option value="Kuis Interaktif">1. Kuis Interaktif</option>
                      <option value="Spin the Wheel">2. Spin the Wheel (Roda Keberuntungan)</option>
                      <option value="Ular Tangga">3. Ular Tangga</option>
                      <option value="Drag and Drop">4. Drag and Drop</option>
                      <option value="Memory Game">5. Memory Game (Pembalik Kartu Pasangan)</option>
                      <option value="Who Wants to Be a Millionaire">6. Who Wants to Be a Millionaire</option>
                      <option value="Clash of Champions">7. Clash of Champions (Adu Nalar Edukasi)</option>
                      <option value="RPG Edukasi">8. RPG Edukasi (Petualangan Karakter)</option>
                      <option value="Adventure Game">9. Adventure Game</option>
                      <option value="Escape Room">10. Escape Room (Pecahkan Petunjuk)</option>
                      <option value="Trivia Battle">11. Trivia Battle</option>
                      <option value="Board Game">12. Board Game</option>
                      <option value="Puzzle">13. Puzzle</option>
                      <option value="Tebak Gambar">14. Tebak Gambar</option>
                      <option value="Susun Kata">15. Susun Kata</option>
                      <option value="Word Search">16. Word Search (Cari Kata)</option>
                      <option value="Matching Game">17. Matching Game</option>
                      <option value="Tower Defense Edukasi">18. Tower Defense Edukasi</option>
                      <option value="Simulation Game">19. Simulation Game</option>
                      <option value="Game Berbasis Cerita">20. Game Berbasis Cerita</option>
                      <option value="Platformer Edukasi">21. Platformer Edukasi</option>
                      <option value="Pilihan jenis lainnya">22. Pilihan jenis lainnya...</option>
                    </select>
                  </div>

                  {/* Conditional: Custom game type input */}
                  {config.gameType === 'Pilihan jenis lainnya' && (
                    <div className="p-3.5 rounded-xl bg-[#071426] border border-[#FFD166]/40 space-y-1.5 animate-fade-in">
                      <label className="text-slate-200 font-semibold text-xs text-[#FFD166]">
                        Jelaskan Mekanisme Permainan yang Diinginkan
                      </label>
                      <textarea
                        rows={2}
                        value={config.customGameTypeDescription || ''}
                        onChange={(e) => setConfig({ ...config, customGameTypeDescription: e.target.value })}
                        placeholder="Contoh: Game balap sains di mana kendaraan bergerak lebih cepat saat menjawab benar..."
                        className="w-full px-3 py-2 rounded-lg bg-[#0A182B] border border-slate-700 text-xs text-slate-200"
                      />
                    </div>
                  )}

                  {/* 9 & 10. Mode Permainan (Individu vs Tim) */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-slate-300 font-medium">9. Mode Permainan</label>
                      <select
                        value={config.mode}
                        onChange={(e: any) => setConfig({ ...config, mode: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#071426] border border-slate-700 text-slate-200 focus:border-[#00E5FF] focus:outline-none"
                      >
                        <option value="Individu">Individu (Pemain Tunggal)</option>
                        <option value="Tim">Tim (Kelompok)</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-slate-300 font-medium">10. Durasi (Menit)</label>
                      <input
                        type="number"
                        min={3}
                        max={60}
                        value={config.durationMinutes}
                        onChange={(e) => setConfig({ ...config, durationMinutes: Number(e.target.value) })}
                        className="w-full px-3 py-2 rounded-xl bg-[#071426] border border-slate-700 text-slate-200 focus:border-[#00E5FF] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Conditional: Mode Tim Details */}
                  {config.mode === 'Tim' && (
                    <div className="p-3.5 rounded-xl bg-[#071426] border border-[#2979FF]/40 space-y-3 animate-fade-in">
                      <span className="text-[11px] font-mono font-bold text-[#00E5FF] uppercase block">
                        Pengaturan Mode Tim
                      </span>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                          <label className="text-slate-300">Jumlah Tim</label>
                          <input
                            type="number"
                            min={2}
                            max={8}
                            value={config.teamCount || 4}
                            onChange={(e) => setConfig({ ...config, teamCount: Number(e.target.value) })}
                            className="w-full px-2.5 py-1.5 rounded-lg bg-[#0A182B] border border-slate-700 text-slate-200"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-slate-300">Anggota per Tim (Opsional)</label>
                          <input
                            type="number"
                            min={1}
                            max={10}
                            value={config.membersPerTeam || 4}
                            onChange={(e) => setConfig({ ...config, membersPerTeam: Number(e.target.value) })}
                            className="w-full px-2.5 py-1.5 rounded-lg bg-[#0A182B] border border-slate-700 text-slate-200"
                          />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-slate-300">Nama-Nama Tim</label>
                        <input
                          type="text"
                          value={config.teamNames || ''}
                          onChange={(e) => setConfig({ ...config, teamNames: e.target.value })}
                          className="w-full px-2.5 py-1.5 rounded-lg bg-[#0A182B] border border-slate-700 text-slate-200"
                        />
                      </div>
                    </div>
                  )}

                  {/* 11 & 12. Pilihan Warna & Tema Desain */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-slate-300 font-medium">Pilihan Warna</label>
                      <select
                        value={config.colorTheme}
                        onChange={(e: any) => setConfig({ ...config, colorTheme: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#071426] border border-slate-700 text-slate-200 focus:border-[#00E5FF] focus:outline-none"
                      >
                        <option value="Biru dan cyan futuristik">Biru & Cyan Futuristik</option>
                        <option value="Ungu neon">Ungu Neon</option>
                        <option value="Hijau digital">Hijau Digital</option>
                        <option value="Oranye kompetitif">Oranye Kompetitif</option>
                        <option value="Merah dan hitam">Merah & Hitam</option>
                        <option value="Pastel">Pastel</option>
                        <option value="Warna kustom">Warna Kustom</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-slate-300 font-medium">Pilihan Desain</label>
                      <select
                        value={config.designTheme}
                        onChange={(e: any) => setConfig({ ...config, designTheme: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#071426] border border-slate-700 text-slate-200 focus:border-[#00E5FF] focus:outline-none"
                      >
                        <option value="Cyber Arena">Cyber Arena</option>
                        <option value="Kerajaan Fantasi">Kerajaan Fantasi</option>
                        <option value="Game Show">Game Show Televisi</option>
                        <option value="Esports">Esports Stadium</option>
                        <option value="Pixel Art">Pixel Art Retro</option>
                        <option value="Kartun 3D">Kartun 3D</option>
                        <option value="Petualangan">Petualangan Alam</option>
                        <option value="Misteri">Misteri & Detektif</option>
                        <option value="Minimalis">Minimalis Elegan</option>
                        <option value="Science Fiction">Science Fiction</option>
                      </select>
                    </div>
                  </div>

                  {/* 13 & 14. Sistem Skor & Aturan Menang/Kalah */}
                  <div className="space-y-1">
                    <label className="text-slate-300 font-medium">13. Sistem Skor</label>
                    <input
                      type="text"
                      value={config.scoreSystem}
                      onChange={(e) => setConfig({ ...config, scoreSystem: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#071426] border border-slate-700 text-slate-200 focus:border-[#00E5FF] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-300 font-medium">14. Aturan Menang & Kalah</label>
                    <input
                      type="text"
                      value={config.winLoseRule}
                      onChange={(e) => setConfig({ ...config, winLoseRule: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#071426] border border-slate-700 text-slate-200 focus:border-[#00E5FF] focus:outline-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#2979FF] to-[#00E5FF] text-white font-bold text-sm hover:shadow-lg hover:shadow-[#2979FF]/30 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-[#FFD166]" />
                      <span>Buat Prompt Game Sekarang</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Right Column: Output Prompt Canvas & Actions (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                {/* Configuration Summary Card */}
                <div className="p-6 rounded-3xl bg-[#0B1B31] border border-[#2979FF]/20 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <span className="text-xs font-mono font-bold text-[#00E5FF] uppercase">
                      Ringkasan Konfigurasi Game
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-[#FFD166]/15 text-[#FFD166] border border-[#FFD166]/30">
                      {config.gameType} · {config.mode}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-slate-300">
                    <div>
                      <span className="text-slate-500 block text-[10px] font-mono">Nama Game:</span>
                      <strong className="text-white truncate block">{config.gameName}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px] font-mono">Mapel & Jenjang:</span>
                      <strong className="text-white truncate block">{config.subject} ({config.gradeLevel})</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px] font-mono">Tema & Visual:</span>
                      <strong className="text-white truncate block">{config.colorTheme} · {config.designTheme}</strong>
                    </div>
                  </div>
                </div>

                {/* Generated Prompt Box */}
                <div className="p-6 rounded-3xl bg-[#0B1B31] border border-[#00E5FF]/40 shadow-2xl space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <FileCode className="w-4 h-4 text-[#00E5FF]" />
                      <span className="text-xs font-bold text-white uppercase font-mono tracking-wider">
                        Prompt Siap Salin ke Gemini Canvas / Canva AI
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsEditingPrompt(!isEditingPrompt)}
                        className="px-3 py-1.5 rounded-xl bg-[#071426] hover:bg-[#122A4E] border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
                      >
                        {isEditingPrompt ? 'Selesai Edit' : 'Edit Prompt'}
                      </button>

                      <button
                        onClick={handleCopyPrompt}
                        disabled={!generatedPrompt}
                        className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#2979FF] to-[#00E5FF] text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer disabled:opacity-40"
                      >
                        {copied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-300" />
                            <span>Prompt Berhasil Disalin!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-[#FFD166]" />
                            <span>Salin Prompt</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Copy Feedback notification */}
                  {copyFeedback && (
                    <div className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-500/50 flex items-center gap-2 text-emerald-200 text-xs animate-fade-in font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{copyFeedback}</span>
                    </div>
                  )}

                  {/* Prompt Textarea */}
                  {generatedPrompt ? (
                    isEditingPrompt ? (
                      <textarea
                        rows={16}
                        value={generatedPrompt}
                        onChange={(e) => setGeneratedPrompt(e.target.value)}
                        className="w-full p-4 rounded-2xl bg-[#071426] border border-[#00E5FF]/40 text-slate-100 font-mono text-xs leading-relaxed focus:outline-none"
                      />
                    ) : (
                      <div className="max-h-[460px] overflow-y-auto p-4 rounded-2xl bg-[#071426] border border-slate-800 text-slate-200 font-mono text-xs leading-relaxed whitespace-pre-wrap select-all">
                        {generatedPrompt}
                      </div>
                    )
                  ) : (
                    <div className="p-12 text-center space-y-3 border-2 border-dashed border-slate-800 rounded-2xl">
                      <Sparkles className="w-8 h-8 text-[#00E5FF] mx-auto animate-pulse" />
                      <p className="text-xs sm:text-sm text-slate-400">
                        Klik tombol <strong>"Buat Prompt Game Sekarang"</strong> atau pilih salah satu <strong>Preset Contoh Lintas Jenjang</strong> di atas untuk menghasilkan instruksi game lengkap.
                      </p>
                    </div>
                  )}

                  {/* Bottom Action Strip: Gemini Canvas & Canva AI Buttons */}
                  <div className="pt-3 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800/80">
                    <button
                      onClick={() => handleGeneratePrompt()}
                      className="px-3.5 py-2 rounded-xl bg-[#071426] hover:bg-[#122A4E] border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-[#00E5FF]" />
                      <span>Buat Ulang Prompt</span>
                    </button>

                    <div className="flex flex-wrap items-center gap-2.5 ml-auto">
                      {/* Buka Canva AI */}
                      <a
                        href="https://www.canva.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2.5 rounded-xl bg-[#1C1236] hover:bg-[#2A1852] border border-[#8B5CF6]/40 text-[#C084FC] hover:text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
                      >
                        <span>Buka Canva AI</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>

                      {/* Buka Gemini Canvas */}
                      <a
                        href="https://gemini.google.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#2979FF] via-[#00E5FF] to-[#8B5CF6] text-white font-bold text-xs flex items-center gap-2 hover:shadow-lg hover:shadow-[#00E5FF]/30 active:scale-95 transition-all cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-[#FFD166]" />
                        <span>Buka Gemini Canvas</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* DUA PANEL PANDUAN PENGGUNAAN PROMPT (GEMINI CANVAS & CANVA AI) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  {/* Panel B: Panduan Menggunakan Prompt di Gemini Canvas */}
                  <div className="p-6 rounded-3xl bg-[#0B1B31] border border-[#00E5FF]/30 space-y-4 shadow-xl">
                    <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
                      <div className="w-7 h-7 rounded-lg bg-[#0E223D] flex items-center justify-center border border-[#00E5FF]/40">
                        <Sparkles className="w-4 h-4 text-[#00E5FF]" />
                      </div>
                      <h4 className="text-sm font-bold text-white">
                        Cara Membuat Game di Gemini Canvas
                      </h4>
                    </div>

                    <ol className="space-y-2 text-xs text-slate-300 list-decimal list-inside leading-relaxed">
                      <li>Isi seluruh pengaturan game di Game Studio GURITA.</li>
                      <li>Klik tombol <strong>"Buat Prompt Game"</strong>.</li>
                      <li>Periksa kembali prompt yang dihasilkan.</li>
                      <li>Klik tombol <strong>"Salin Prompt"</strong>.</li>
                      <li>Klik tombol <strong>"Buka Gemini Canvas"</strong>.</li>
                      <li>Setelah halaman Gemini terbuka, masuk ke fitur Canvas atau lingkungan pembuatan aplikasi yang tersedia pada akun pengguna.</li>
                      <li>Buat percakapan atau proyek baru jika diperlukan.</li>
                      <li>Tempelkan prompt yang sudah disalin ke kolom instruksi Gemini.</li>
                      <li>Kirim prompt dan tunggu hingga Gemini membuat game.</li>
                      <li>Jalankan game yang dihasilkan untuk menguji mekanismenya.</li>
                      <li>Jika ada tombol atau fitur yang tidak berfungsi, berikan instruksi perbaikan kepada Gemini.</li>
                      <li>Periksa kebenaran soal dan kunci jawaban sebelum game digunakan dalam pembelajaran.</li>
                    </ol>

                    <div className="p-3.5 rounded-2xl bg-[#071426] border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
                      <span className="font-semibold text-[#00E5FF] block mb-1">Catatan Penting:</span>
                      Game Studio GURITA menghasilkan prompt yang siap digunakan. Pengguna perlu menyalin prompt dan menempelkannya secara manual ke Gemini. Hasil akhir bergantung pada kemampuan platform AI dan perlu diuji sebelum digunakan.
                    </div>
                  </div>

                  {/* Panel C: Panduan Mengembangkan Game atau Media di Canva AI */}
                  <div className="p-6 rounded-3xl bg-[#0B1B31] border border-[#8B5CF6]/30 space-y-4 shadow-xl">
                    <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
                      <div className="w-7 h-7 rounded-lg bg-[#1C1236] flex items-center justify-center border border-[#8B5CF6]/40">
                        <Monitor className="w-4 h-4 text-[#C084FC]" />
                      </div>
                      <h4 className="text-sm font-bold text-white">
                        Cara Mengembangkan Game atau Media di Canva AI
                      </h4>
                    </div>

                    <ol className="space-y-2 text-xs text-slate-300 list-decimal list-inside leading-relaxed">
                      <li>Atur parameter game pada Game Studio GURITA.</li>
                      <li>Klik <strong>"Buat Prompt Game"</strong>.</li>
                      <li>Klik <strong>"Salin Prompt"</strong>.</li>
                      <li>Klik tombol <strong>"Buka Canva AI"</strong>.</li>
                      <li>Setelah Canva terbuka, masuk ke fitur AI yang sesuai dan tersedia pada akun pengguna.</li>
                      <li>Tempelkan prompt yang telah disalin.</li>
                      <li>Jika Canva tidak mendukung pembuatan game interaktif lengkap melalui prompt tersebut, gunakan prompt untuk membuat prototipe visual, desain permainan, presentasi interaktif, atau media pembelajaran yang sesuai dengan fitur Canva.</li>
                      <li>Periksa dan sesuaikan hasil desain.</li>
                      <li>Uji tautan, tombol, dan navigasi apabila membuat presentasi interaktif.</li>
                      <li>Bagikan atau unduh hasil sesuai kebutuhan.</li>
                    </ol>

                    <div className="p-3.5 rounded-2xl bg-[#071426] border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
                      <span className="font-semibold text-[#FFD166] block mb-1">Penjelasan Jujur:</span>
                      Canva AI memiliki kemampuan dan batasan berbeda dari Gemini Canvas. Prompt yang sama tidak selalu menghasilkan game interaktif yang sama. Canva dapat digunakan untuk mengembangkan desain permainan, kartu permainan, presentasi interaktif, dan media edukasi sesuai fitur yang tersedia.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SUB-TAB 2: PLAYTEST ARENA INTERACTIVE DEMO */}
        {activeTab === 'playtest' && (
          <div className="max-w-2xl mx-auto p-8 rounded-3xl bg-[#0B1B31] border border-[#2979FF]/40 shadow-2xl space-y-6 animate-fade-in">
            {/* Top Bar Status */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#00E5FF]">
                <Gamepad2 className="w-4 h-4" />
                <span>Playtest Arena Cepat: {config.gameName}</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="text-slate-400">Soal {currentQuestionIndex + 1}/{sampleQuestions.length}</span>
                <span className="text-[#FFD166] font-bold">Skor: {score}</span>
                <span className="text-rose-400">{'❤️'.repeat(lives)}</span>
              </div>
            </div>

            {!gameFinished ? (
              <div className="space-y-6">
                <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
                  {currentQ.question}
                </h3>

                {/* Options Grid */}
                <div className="space-y-2.5">
                  {currentQ.options.map((option, idx) => {
                    let btnStyle = 'bg-[#071426] border-slate-700 text-slate-200 hover:border-[#00E5FF]';
                    if (showFeedback) {
                      if (idx === currentQ.correctIndex) {
                        btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-md';
                      } else if (idx === selectedOption) {
                        btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
                      } else {
                        btnStyle = 'opacity-40 border-slate-800 text-slate-400';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectOption(idx)}
                        disabled={showFeedback}
                        className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                      >
                        <span>{option}</span>
                        {showFeedback && idx === currentQ.correctIndex && (
                          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Feedback Box */}
                {showFeedback && (
                  <div className="p-4 rounded-2xl bg-[#071426] border border-[#00E5FF]/30 space-y-2 text-xs animate-fade-in">
                    <span className="font-bold text-[#00E5FF] uppercase font-mono block">
                      Pembahasan Pedagogis:
                    </span>
                    <p className="text-slate-300">{currentQ.explanation}</p>
                    <div className="pt-3 flex justify-end">
                      <button
                        onClick={handleNextPlaytest}
                        className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#2979FF] to-[#00E5FF] text-white font-bold text-xs cursor-pointer"
                      >
                        Lanjutkan Tantangan →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 space-y-4 animate-fade-in">
                <Trophy className="w-14 h-14 text-[#FFD166] mx-auto animate-bounce" />
                <h3 className="text-2xl font-bold text-white">Sesi Playtest Selesai!</h3>
                <p className="text-sm text-slate-300">
                  Total Skor Anda: <strong className="text-[#00E5FF]">{score} Poin</strong>
                </p>
                <div className="pt-4">
                  <button
                    onClick={handleRestartPlaytest}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#2979FF] to-[#00E5FF] text-white font-bold text-xs cursor-pointer"
                  >
                    Mainkan Ulang
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
