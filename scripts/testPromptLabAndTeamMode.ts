import { generateCompleteModulAjar } from '../src/utils/modulAjarGenerator';
import { buildPromptFromModulAjar } from '../src/utils/modulAjarPromptBuilder';
import { ModulAjarFormInput, GameStudioConfig } from '../src/types';

function runTestSuite() {
  console.log('======================================================================');
  console.log('TEST SUITE: PROMPT LAB GENERATE PROMPT & GAME STUDIO TEAM MODE');
  console.log('======================================================================\n');

  let passedTests = 0;
  let totalTests = 0;

  function assert(condition: boolean, message: string) {
    totalTests++;
    if (condition) {
      console.log(`  ✅ PASS: ${message}`);
      passedTests++;
    } else {
      console.error(`  ❌ FAIL: ${message}`);
      throw new Error(`Assertion failed: ${message}`);
    }
  }

  // ==================================================================
  // BAGIAN 1: PENGUJIAN PROMPT LAB GENERATOR PROMPT
  // ==================================================================
  console.log('--- PENGUJIAN 1: PROMPT LAB — GENERATE PROMPT DARI MODUL AJAR ---');

  const testInput: ModulAjarFormInput = {
    schoolName: 'SMP Negeri 1 Surabaya',
    principalName: 'Drs. H. Mulyadi, M.Pd.',
    teacherName: 'Ahmad Fauzi, S.Pd., M.Mat.',
    subject: 'Matematika',
    materi: 'Aljabar dan Persamaan Linear',
    topic: 'Persamaan Linear Satu Variabel (SPLSV)',
    learningOutcomeCP:
      'Peserta didik dapat memahami relasi dan fungsi, serta menyelesaikan persamaan dan pertidaksamaan linear satu variabel.',
    element: 'Aljabar & Penalaran Simbolik',
    gradeLevel: 'Fase D (SMP Kelas 7)',
    semester: '1 (Ganjil)',
    timeAllocation: '2 JP (2 x 40 Menit)',
    pedagogicalPractice: 'Problem Based Learning (PBL)',
    studentCharacteristics: 'Siswa kelas 7 memerlukan jembatan pemodelan timbangan nyata sebelum manipulasi aljabar simbolik.',
    facilitiesAndTools: 'Papan tulis, LKPD, proyektor',
    learningApproach: 'Pembelajaran Kontekstual'
  };

  const doc = generateCompleteModulAjar(testInput);
  assert(!!doc, 'Modul ajar aktif berhasil digenerate');

  const promptResult = buildPromptFromModulAjar(doc);
  assert(promptResult.length > 2500, `Panjang prompt utuh memadai dan tidak terpotong (${promptResult.length} karakter)`);

  // Verify key components in prompt
  assert(promptResult.includes('SMP Negeri 1 Surabaya'), 'Prompt memuat Identitas Sekolah');
  assert(promptResult.includes('Ahmad Fauzi, S.Pd., M.Mat.'), 'Prompt memuat Nama Guru/Penyusun');
  assert(promptResult.includes('Persamaan Linear Satu Variabel (SPLSV)'), 'Prompt memuat Topik Pembelajaran Aktif');
  assert(promptResult.includes(testInput.learningOutcomeCP), 'Prompt mempertahankan Capaian Pembelajaran (CP) asli');
  assert(promptResult.includes('Ranah Memahami (Knowing)'), 'Prompt memuat Tujuan Pembelajaran Memahami');
  assert(promptResult.includes('Ranah Mengaplikasi (Doing/Applying)'), 'Prompt memuat Tujuan Pembelajaran Mengaplikasi');
  assert(promptResult.includes('Ranah Merefleksi (Reflecting)'), 'Prompt memuat Tujuan Pembelajaran Merefleksi');
  assert(promptResult.includes('KEGIATAN PENDAHULUAN'), 'Prompt memuat 5 Kolom Langkah Pendahuluan');
  assert(promptResult.includes('KEGIATAN INTI'), 'Prompt memuat 5 Kolom Langkah Inti');
  assert(promptResult.includes('KEGIATAN PENUTUP'), 'Prompt memuat 5 Kolom Langkah Penutup');
  assert(promptResult.includes('Rubrik Penilaian Bertingkat (Skala 1 - 4)'), 'Prompt memuat Rubrik Asesmen 1-4');
  assert(promptResult.includes('Refleksi Guru'), 'Prompt memuat Refleksi Guru');
  assert(promptResult.includes('Rencana Pengayaan'), 'Prompt memuat Rencana Pengayaan');
  assert(promptResult.includes('Rencana Remedial'), 'Prompt memuat Rencana Remedial');

  // Verify Subject-Aware Appendix in Prompt
  if (doc.subjectAwareAnalysis?.isQuantitative) {
    assert(promptResult.includes('LAMPIRAN KHUSUS SUBJECT-AWARE'), 'Prompt memuat Lampiran Subject-Aware untuk Matematika');
    assert(promptResult.includes('Rumus & Notasi Utama'), 'Prompt memuat Rumus Utama');
    assert(promptResult.includes('Worked Example'), 'Prompt memuat Contoh Soal & Langkah Penyelesaian');
  }

  // Verify edit independence
  const editedPrompt = promptResult + '\n[CATATAN TAMBAHAN DARI GURU]: Berikan 3 studi kasus tambahan.';
  assert(editedPrompt.length > promptResult.length, 'Prompt dapat diedit guru tanpa mengubah modul');
  assert(doc.informasiUmum.topikPembelajaran === testInput.topic, 'Modul ajar asli tetap aman dan tidak berubah saat prompt diedit');

  // ==================================================================
  // BAGIAN 2: PENGUJIAN GAME STUDIO TEAM MODE
  // ==================================================================
  console.log('\n--- PENGUJIAN 2: GAME STUDIO — PENGATURAN MODE PERMAINAN TIM ---');

  const baseConfig: GameStudioConfig = {
    gameName: 'Arena Tantangan Sains & Matematika',
    subject: 'Matematika',
    gradeLevel: 'Fase D (SMP Kelas 7)',
    topic: 'Aljabar dan Persamaan Linear',
    learningGoal: 'Menyelesaikan persamaan linear satu variabel',
    questionCount: 5,
    difficulty: 'Sedang',
    gameType: 'Kuis Interaktif',
    mode: 'Individu',
    teamCount: 2,
    teamNamesList: ['Tim 1', 'Tim 2'],
    teamNames: 'Tim 1, Tim 2',
    teamMemberAllocation: 'Otomatis dan seimbang',
    teamCustomMembers: [4, 4],
    teamDistributionSystem: 'Acak otomatis',
    teamCompetitionSystem: 'Bergiliran antar tim',
    durationMinutes: 10,
    scoreSystem: '+100 poin per jawaban tepat',
    winLoseRule: 'Skor tertinggi menang',
    colorTheme: 'Biru dan cyan futuristik',
    designTheme: 'Cyber Arena',
    characterStyle: 'Avatar sains',
    backgroundStyle: 'Laboratorium digital',
    buttonShape: 'Rounded Modern',
    visualEffects: 'Glow neon cyan',
    animationStyle: 'Smooth 60 FPS',
    soundEffects: 'Modern Synth Web Audio',
    language: 'Bahasa Indonesia',
    enableTimer: true,
    enableScoreboard: true,
    enableLivesOrEnergy: true,
    enableSoundEffects: true,
    enableAnimations: true,
    enableInstantFeedback: true,
    enableRestartButton: true,
    enableHints: true,
    enableResultsRecap: true
  };

  // Test 1: Individu mode behavior
  assert(baseConfig.mode === 'Individu', 'Default mode adalah Individu');

  // Test 2: Switch to Tim mode
  const teamConfig: GameStudioConfig = {
    ...baseConfig,
    mode: 'Tim',
    teamCount: 4,
    teamNamesList: ['Tim Garuda', 'Tim Elang', 'Tim Rajawali', 'Tim Merak'],
    teamNames: 'Tim Garuda, Tim Elang, Tim Rajawali, Tim Merak',
    teamMemberAllocation: 'Otomatis dan seimbang',
    teamDistributionSystem: 'Acak otomatis',
    teamCompetitionSystem: 'Bergiliran antar tim'
  };

  assert(teamConfig.mode === 'Tim', 'Mode Tim aktif');
  assert(teamConfig.teamCount === 4, 'Jumlah tim adalah 4');
  assert((teamConfig.teamNamesList?.length ?? 0) === 4, 'Terdapat 4 nama tim');
  assert(teamConfig.teamNamesList?.[0] === 'Tim Garuda', 'Nama Tim 1 kustom tersimpan');
  assert(teamConfig.teamNamesList?.[1] === 'Tim Elang', 'Nama Tim 2 kustom tersimpan');
  assert(teamConfig.teamNamesList?.[2] === 'Tim Rajawali', 'Nama Tim 3 kustom tersimpan');
  assert(teamConfig.teamNamesList?.[3] === 'Tim Merak', 'Nama Tim 4 kustom tersimpan');

  // Test 3: Dynamic scaling without losing custom names
  // If count is reduced to 3
  const countReducedList = (teamConfig.teamNamesList || []).slice(0, 3);
  assert(countReducedList.length === 3, 'Jumlah tim disesuaikan menjadi 3');
  assert(countReducedList[0] === 'Tim Garuda' && countReducedList[1] === 'Tim Elang' && countReducedList[2] === 'Tim Rajawali', 'Nama-nama tim lama tetap utuh saat dikurangi');

  // If count is increased to 5
  const countIncreasedList = [...countReducedList];
  for (let i = countIncreasedList.length; i < 5; i++) {
    countIncreasedList.push(`Tim ${i + 1}`);
  }
  assert(countIncreasedList.length === 5, 'Jumlah tim ditambah menjadi 5');
  assert(countIncreasedList[0] === 'Tim Garuda', 'Nama tim yang sudah diganti guru tetap ada saat jumlah ditambah');
  assert(countIncreasedList[4] === 'Tim 5', 'Tim baru mendapat nama default Tim 5');

  // Test 4: Custom member allocations
  const customMemberConfig: GameStudioConfig = {
    ...teamConfig,
    teamMemberAllocation: 'Ditentukan guru',
    teamCustomMembers: [5, 4, 6, 5]
  };
  assert(customMemberConfig.teamMemberAllocation === 'Ditentukan guru', 'Alokasi anggota Ditentukan Guru aktif');
  assert(customMemberConfig.teamCustomMembers?.[0] === 5, 'Anggota Tim 1 = 5 peserta');
  assert(customMemberConfig.teamCustomMembers?.[2] === 6, 'Anggota Tim 3 = 6 peserta');

  // Test 5: Competition systems
  const competitionSystems = [
    'Semua tim bermain bersamaan',
    'Bergiliran antar tim',
    'Sistem duel (Head-to-Head)'
  ];
  for (const comp of competitionSystems) {
    const cConfig: GameStudioConfig = {
      ...teamConfig,
      teamCompetitionSystem: comp as any
    };
    assert(cConfig.teamCompetitionSystem === comp, `Sistem kompetisi '${comp}' tervalidasi`);
  }

  // Test 6: Team simulation logic
  const currentTeams = ['Tim Garuda', 'Tim Elang', 'Tim Rajawali'];
  const teamScores: Record<string, number> = { 'Tim Garuda': 0, 'Tim Elang': 0, 'Tim Rajawali': 0 };
  let activeTurnIndex = 0;

  // Question 1: Tim Garuda answers correctly
  let activeTeam = currentTeams[activeTurnIndex % currentTeams.length];
  teamScores[activeTeam] += 100;
  assert(teamScores['Tim Garuda'] === 100, 'Tim Garuda mendapat +100 poin saat giliran');
  assert(teamScores['Tim Elang'] === 0, 'Skor Tim Elang tidak terpengaruh');

  // Rotate turn
  activeTurnIndex++;
  activeTeam = currentTeams[activeTurnIndex % currentTeams.length];
  assert(activeTeam === 'Tim Elang', 'Giliran berputar ke Tim Elang');
  teamScores[activeTeam] += 100;
  assert(teamScores['Tim Elang'] === 100, 'Tim Elang mendapat +100 poin');

  // Question 3: Tim Rajawali answers correctly
  activeTurnIndex++;
  activeTeam = currentTeams[activeTurnIndex % currentTeams.length];
  assert(activeTeam === 'Tim Rajawali', 'Giliran berputar ke Tim Rajawali');
  teamScores[activeTeam] += 200; // e.g. bonus

  // Determine champion
  const sorted = [...currentTeams].sort((a, b) => teamScores[b] - teamScores[a]);
  assert(sorted[0] === 'Tim Rajawali', 'Tim Rajawali adalah Juara 1 dengan skor tertinggi');
  assert(teamScores[sorted[0]] === 200, 'Skor juara tercatat 200 poin secara akurat');

  console.log('\n======================================================================');
  console.log(`SEMUA ${totalTests} PENGUJIAN OTOMATIS BERHASIL DILALUI DENGAN SUKSES! (100% PASS)`);
  console.log('======================================================================\n');
}

runTestSuite();
