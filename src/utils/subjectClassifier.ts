/**
 * Subject-Aware Output Engine for GURITA
 * Detects domain and provides mathematically and conceptually accurate
 * formulas, step-by-step calculations, specialized tables, and code.
 *
 * Subject-Aware NUMERIK HANYA diaktifkan bila mata pelajaran dan materi/topik
 * memang membutuhkan kalkulasi, rumus, angka, data kuantitatif, atau sistem bilangan.
 * Pada mata pelajaran konseptual, bahasa, seni, sosial, dan DKV, TIDAK dipaksakan rumus!
 */

export type SubjectDomain =
  | 'MATHEMATICS'
  | 'PHYSICS'
  | 'CHEMISTRY'
  | 'ECONOMICS_ACCOUNTING'
  | 'INFORMATICS'
  | 'GENERAL_SCIENCE'
  | 'HUMANITIES_ARTS_LANGUAGE';

export interface FormulaItem {
  name: string;
  latex: string;
  textFallback: string;
  variables: Array<{ symbol: string; meaning: string; unit?: string }>;
}

export interface WorkedStep {
  stepNumber: number;
  description: string;
  mathExpression: string;
}

export interface WorkedExample {
  problemTitle: string;
  problemStatement: string;
  given: string[];
  steps: WorkedStep[];
  finalAnswer: string;
  verificationOrNote: string;
}

export interface SpecializedTable {
  title: string;
  headers: string[];
  rows: string[][];
  summaryOrInsight?: string;
}

export interface CodeBlockInfo {
  language: string;
  title: string;
  code: string;
  explanation: string;
}

export interface SubjectAwareAnalysis {
  domain: SubjectDomain;
  domainNameId: string;
  isQuantitative: boolean; // TRUE HANYA bila materi benar-benar membutuhkan rumus/angka
  requiresFormulas: boolean;
  requiresStepByStep: boolean;
  requiresTables: boolean;
  requiresCode: boolean;
  confidenceScore: number;
  detectedCharacteristics: string[];
  coreFormulas?: FormulaItem[];
  workedExample?: WorkedExample;
  specializedTable?: SpecializedTable;
  codeOrPseudocode?: CodeBlockInfo;
  nonNumericGuidance?: {
    conceptualFramework: string;
    keyConcepts: string[];
    artisticPrinciples?: string[];
    visualHierarchyGuidelines?: string[];
    caseStudyOrActivity?: string;
  };
}

/**
 * Subject classifier that evaluates subject, materi, topic, and learning context
 * to determine whether quantitative formulas are needed or if qualitative/conceptual
 * representation should be used.
 */
export function classifySubject(
  subject: string,
  materi: string = '',
  topic: string = '',
  additionalContext: string = ''
): SubjectAwareAnalysis {
  const combined = `${subject} ${materi} ${topic} ${additionalContext}`.toLowerCase();
  const subLower = (subject || '').toLowerCase();
  const topicLower = `${materi} ${topic} ${additionalContext}`.toLowerCase();

  // 1. BAHASA & SASTRA (Strictly Non-Numeric)
  const isLanguageSubject = [
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

  if (isLanguageSubject) {
    return buildLanguageAnalysis(combined, subject, topic);
  }

  // 2. KEWARGAAN, SEJARAH, SOSIAL, AGAMA, BK (Strictly Non-Numeric)
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
    return buildSocialCivicsAnalysis(combined, subject, topic);
  }

  // 3. DESAIN KOMUNIKASI VISUAL (DKV) & SENI BUDAYA
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

  if (isDkvOrArt && !topicLower.includes('biaya cetak kalkulasi numerik')) {
    return buildDkvAnalysis(combined, topic);
  }

  // 4. EKONOMI & AKUNTANSI
  if (subLower.includes('ekonomi') || subLower.includes('akuntansi')) {
    // Topik konseptual: Kebutuhan, Kelangkaan, Pelaku Ekonomi, Sistem Ekonomi, dll -> Non-Numerik!
    const isQualitativeEconomy = [
      'kebutuhan',
      'kelangkaan',
      'pelaku ekonomi',
      'sistem ekonomi',
      'badan usaha',
      'bumn',
      'koperasi',
      'ketenagakerjaan',
      'perdagangan internasional',
      'masalah ekonomi',
      'konsumsi',
      'distribusi'
    ].some((k) => topicLower.includes(k));

    const isNumericEconomy = [
      'akuntansi',
      'jurnal umum',
      'buku besar',
      'laba rugi',
      'untung',
      'rugi',
      'persentase keuntungan',
      'pajak',
      'bunga bank',
      'harga jual',
      'harga beli',
      'debit kredit',
      'neraca saldo',
      'biaya produksi',
      'titik impas',
      'bep'
    ].some((k) => topicLower.includes(k));

    if (isQualitativeEconomy && !isNumericEconomy && !subLower.includes('akuntansi')) {
      return buildEconomicsQualitativeAnalysis(combined, topic);
    }
    if (isNumericEconomy || subLower.includes('akuntansi')) {
      return buildEconomicsAccountingAnalysis(combined);
    }
    // Default ekonomi: konseptual
    return buildEconomicsQualitativeAnalysis(combined, topic);
  }

  // 5. INFORMATIKA
  if (subLower.includes('informatika') || subLower.includes('komputer')) {
    // Topik kualitatif: Berpikir Komputasional, Dampak Sosial, Etika Siber, dll -> Non-Numerik!
    const isQualitativeInformatics = [
      'berpikir komputasional',
      'computational thinking',
      'dampak sosial',
      'etika siber',
      'literasi digital',
      'keamanan data',
      'dekomposisi',
      'pengenalan pola',
      'abstraksi',
      'flowchart',
      'diagram alir'
    ].some((k) => topicLower.includes(k));

    const isNumericInformatics = [
      'biner',
      'binary',
      'oktal',
      'heksadesimal',
      'gerbang logika',
      'tabel kebenaran',
      'boolean',
      'sistem bilangan',
      'konversi basis'
    ].some((k) => topicLower.includes(k));

    if (isQualitativeInformatics && !isNumericInformatics) {
      return buildInformaticsQualitativeAnalysis(combined, topic);
    }
    if (isNumericInformatics) {
      return buildInformaticsAnalysis(combined);
    }
    // Default informatika: kualitatif logika
    return buildInformaticsQualitativeAnalysis(combined, topic);
  }

  // 6. FISIKA
  if (subLower.includes('fisika')) {
    const isQualitativePhysics = ['pemanasan global', 'perubahan iklim', 'keselamatan laboratorium', 'etika sains'].some((k) =>
      topicLower.includes(k)
    );
    if (isQualitativePhysics) {
      return buildGenericQualitativeAnalysis(combined, subject, topic);
    }
    return buildPhysicsAnalysis(combined);
  }

  // 7. KIMIA
  if (subLower.includes('kimia')) {
    const isQuantitativeChemistry = [
      'molaritas',
      'molalitas',
      'stoikiometri',
      'konsentrasi larutan',
      'konsentrasi',
      'hitung',
      'kalkulasi',
      'ph asam basa',
      'perhitungan ph',
      'termokimia hitung',
      'entalpi reaksi',
      'laju reaksi hitung',
      'kesetimbangan kimia hitung',
      'tetapan kesetimbangan',
      'hukum faraday',
      'elektrolisis hitung',
      'titrasi hitung',
      'massa molar',
      'mr',
      'ar'
    ].some((k) => topicLower.includes(k));

    if (isQuantitativeChemistry) {
      return buildChemistryAnalysis(combined);
    }
    // Jika materi/topik konseptual (struktur atom, ikatan kimia, tabel periodik, sifat materi, kimia hijau, dsb)
    return buildChemistryQualitativeAnalysis(combined, topic);
  }

  // 8. MATEMATIKA
  if (
    subLower.includes('matematika') ||
    ['aljabar', 'persamaan linear', 'bangun datar', 'bangun ruang', 'geometri', 'statistika', 'kalkulus', 'trigonometri', 'splsv', 'spldv'].some(
      (k) => combined.includes(k)
    )
  ) {
    return buildMathematicsAnalysis(combined, topic);
  }

  // 9. Generic Numerical Detection
  const generalNumericKeywords = [
    'hitunglah',
    'rumus perhitungan',
    'angka kalkulasi',
    'data numerik kuantitatif',
    'persamaan matematis'
  ];
  if (generalNumericKeywords.some((k) => topicLower.includes(k))) {
    return buildGenericQuantitativeAnalysis(combined);
  }

  // 10. Default Fallback: Non-numeric / Contextual General Learning
  return buildGenericQualitativeAnalysis(combined, subject, topic);
}

// -------------------------------------------------------------
// DOMAIN-SPECIFIC BUILDERS (KUANTITATIF / NUMERIK)
// -------------------------------------------------------------

function buildMathematicsAnalysis(context: string, topic: string = ''): SubjectAwareAnalysis {
  const isGeometry = context.includes('bangun') || context.includes('ruang') || context.includes('volume') || context.includes('luas');
  const isLinearEq = context.includes('linear') || context.includes('splsv') || context.includes('spldv') || context.includes('variabel');
  const isStats = context.includes('statistika') || context.includes('mean') || context.includes('median') || context.includes('modus');

  let coreFormulas: FormulaItem[] = [];
  let workedExample: WorkedExample;
  let specializedTable: SpecializedTable | undefined;

  if (isGeometry) {
    coreFormulas = [
      {
        name: 'Volume Balok',
        latex: 'V = p \\times l \\times t',
        textFallback: 'V = p × l × t',
        variables: [
          { symbol: 'V', meaning: 'Volume Bangun Ruang', unit: 'cm³ / m³' },
          { symbol: 'p', meaning: 'Panjang balok', unit: 'cm / m' },
          { symbol: 'l', meaning: 'Lebar balok', unit: 'cm / m' },
          { symbol: 't', meaning: 'Tinggi balok', unit: 'cm / m' }
        ]
      },
      {
        name: 'Luas Permukaan Balok',
        latex: 'L_p = 2(pl + pt + lt)',
        textFallback: 'Lp = 2 × (p×l + p×t + l×t)',
        variables: [
          { symbol: 'L_p', meaning: 'Luas Seluruh Permukaan', unit: 'cm² / m²' }
        ]
      },
      {
        name: 'Volume Kubus',
        latex: 'V = s^3',
        textFallback: 'V = s³',
        variables: [{ symbol: 's', meaning: 'Panjang rusuk kubus', unit: 'cm / m' }]
      }
    ];

    workedExample = {
      problemTitle: 'Menghitung Volume dan Luas Permukaan Balok',
      problemStatement:
        'Sebuah kotak wadah alat peraga berbentuk balok memiliki ukuran panjang 12 cm, lebar 8 cm, dan tinggi 5 cm. Hitunglah volume wadah dan luas bahan karton yang diperlukan untuk membuatnya!',
      given: ['Panjang (p) = 12 cm', 'Lebar (l) = 8 cm', 'Tinggi (t) = 5 cm'],
      steps: [
        {
          stepNumber: 1,
          description: 'Tuliskan rumus volume balok dan substitusikan ukuran yang diketahui.',
          mathExpression: 'V = p \\times l \\times t = 12\\text{ cm} \\times 8\\text{ cm} \\times 5\\text{ cm}'
        },
        {
          stepNumber: 2,
          description: 'Lakukan perkalian bertahap untuk memperoleh volume total.',
          mathExpression: 'V = 96 \\times 5 = 480\\text{ cm}^3'
        },
        {
          stepNumber: 3,
          description: 'Tuliskan rumus luas permukaan balok dan hitung luas setiap pasangan sisi.',
          mathExpression: 'L_p = 2 \\times ((12 \\cdot 8) + (12 \\cdot 5) + (8 \\cdot 5)) = 2 \\times (96 + 60 + 40)'
        },
        {
          stepNumber: 4,
          description: 'Selesaikan penjumlahan dalam kurung lalu kalikan dengan 2.',
          mathExpression: 'L_p = 2 \\times 196 = 392\\text{ cm}^2'
        }
      ],
      finalAnswer: 'Volume wadah adalah 480 cm³ dan luas permukaan bahan adalah 392 cm².',
      verificationOrNote: 'Validasi Satuan: Satuan volume adalah kubik (cm³) dan satuan luas adalah persegi (cm²).'
    };

    specializedTable = {
      title: 'Tabel Perbandingan Karakteristik Bangun Ruang Sisi Datar',
      headers: ['Nama Bangun', 'Jumlah Sisi', 'Jumlah Rusuk', 'Rumus Luas Permukaan', 'Rumus Volume'],
      rows: [
        ['Kubus', '6 persegi identik', '12 sama panjang', '6s²', 's³'],
        ['Balok', '6 persegi panjang', '12 (3 pasang)', '2(pl + pt + lt)', 'p × l × t'],
        ['Prisma Segitiga', '5 sisi', '9 rusuk', '(2 × L_alas) + (Kel_alas × t)', 'L_alas × t'],
        ['Limas Segiempat', '5 sisi', '8 rusuk', 'L_alas + Jumlah L_segitiga', '1/3 × L_alas × t']
      ],
      summaryOrInsight: 'Setiap bangun ruang memiliki relasi antara bentuk bidang alas dan perkalian tinggi prisma.'
    };
  } else if (isStats) {
    coreFormulas = [
      {
        name: 'Rata-Rata (Mean)',
        latex: '\\bar{x} = \\frac{\\sum x_i}{n}',
        textFallback: 'Mean = Total Nilai / Jumlah Data',
        variables: [
          { symbol: '\\bar{x}', meaning: 'Nilai Rata-Rata Sampel' },
          { symbol: '\\sum x_i', meaning: 'Jumlah seluruh nilai data' },
          { symbol: 'n', meaning: 'Banyaknya data observasi' }
        ]
      }
    ];

    workedExample = {
      problemTitle: 'Menghitung Rata-Rata Nilai Asesmen Harian',
      problemStatement: 'Data nilai 5 peserta didik adalah: 75, 80, 85, 90, 95. Hitunglah nilai rata-rata (mean)!',
      given: ['Data nilai: 75, 80, 85, 90, 95', 'Banyak data (n) = 5'],
      steps: [
        {
          stepNumber: 1,
          description: 'Jumlahkan seluruh nilai data yang diobservasi.',
          mathExpression: '\\sum x_i = 75 + 80 + 85 + 90 + 95 = 425'
        },
        {
          stepNumber: 2,
          description: 'Bagikan jumlah total nilai dengan banyak data n = 5.',
          mathExpression: '\\bar{x} = \\frac{425}{5} = 85'
        }
      ],
      finalAnswer: 'Nilai rata-rata hitung (mean) data tersebut adalah 85.',
      verificationOrNote: 'Validasi: Nilai rata-rata berada tepat di rentang tengah antara nilai terendah (75) dan tertinggi (95).'
    };

    specializedTable = {
      title: 'Tabel Distribusi Frekuensi Data Tunggal',
      headers: ['Nilai (x)', 'Turus', 'Frekuensi (f)', 'f × x'],
      rows: [
        ['75', '||', '2', '150'],
        ['80', '|||', '3', '240'],
        ['85', '||||', '4', '340'],
        ['90', '||', '2', '180']
      ],
      summaryOrInsight: 'Total frekuensi N = 11 dengan total fx = 910.'
    };
  } else {
    // Default Linear Equation (SPLSV)
    coreFormulas = [
      {
        name: 'Bentuk Umum Persamaan Linear Satu Variabel (SPLSV)',
        latex: 'ax + b = c, \\quad a \\neq 0',
        textFallback: 'ax + b = c, dengan a ≠ 0',
        variables: [
          { symbol: 'x', meaning: 'Variabel peubah linear berderajat satu' },
          { symbol: 'a', meaning: 'Koefisien variabel x' },
          { symbol: 'b, c', meaning: 'Konstanta bilangan real' }
        ]
      },
      {
        name: 'Prinsip Keseimbangan Ruas Linear',
        latex: 'ax = c - b \\iff x = \\frac{c - b}{a}',
        textFallback: 'ax = c - b <=> x = (c - b) / a',
        variables: [
          { symbol: 'x', meaning: 'Nilai penyelesaian (akar persamaan)' }
        ]
      }
    ];

    workedExample = {
      problemTitle: 'Menyelesaikan Masalah Kontekstual SPLSV',
      problemStatement:
        'Pak Budi membeli 4 buku tulis yang sama harganya dan sebuah penggaris seharga Rp12.000,00. Total belanjaan Pak Budi di kasir adalah Rp36.000,00. Berapakah harga sebuah buku tulis?',
      given: [
        'Banyak buku tulis = 4 buah (dimisalkan variabel x)',
        'Harga penggaris = Rp12.000,00',
        'Total pembayaran = Rp36.000,00'
      ],
      steps: [
        {
          stepNumber: 1,
          description: 'Modelkan situasi kontekstual ke dalam bentuk persamaan linear satu variabel.',
          mathExpression: '4x + 12.000 = 36.000'
        },
        {
          stepNumber: 2,
          description: 'Gunakan prinsip keseimbangan ruas: kurangkan kedua ruas dengan 12.000.',
          mathExpression: '4x = 36.000 - 12.000 \\implies 4x = 24.000'
        },
        {
          stepNumber: 3,
          description: 'Bagi kedua ruas dengan koefisien x (yaitu 4) untuk menemukan nilai tunggal x.',
          mathExpression: 'x = \\frac{24.000}{4} = 6.000'
        }
      ],
      finalAnswer: 'Harga sebuah buku tulis adalah Rp6.000,00.',
      verificationOrNote: 'Substitusi Uji Validasi: 4(6.000) + 12.000 = 24.000 + 12.000 = 36.000 (Terbukti Tepat/Benar).'
    };

    specializedTable = {
      title: 'Tabel Tahapan Keseimbangan Ruas SPLSV',
      headers: ['Langkah Operasi', 'Ruas Kiri', 'Ruas Kanan', 'Keterangan Keseimbangan'],
      rows: [
        ['Bentuk Awal', '4x + 12.000', '36.000', 'Kedua ruas seimbang awal'],
        ['Kurangi 12.000', '4x + 12.000 - 12.000', '36.000 - 12.000', 'Menghilangkan konstanta ruas kiri'],
        ['Hasil Penyederhanaan', '4x', '24.000', 'Ruas kiri hanya menyisakan suku variabel'],
        ['Bagi dengan 4', '4x / 4', '24.000 / 4', 'Mendapatkan nilai variabel x = 6.000']
      ],
      summaryOrInsight: 'Prinsip keadilan matematis: operasi hitung yang dilakukan pada ruas kiri wajib dilakukan setara pada ruas kanan.'
    };
  }

  return {
    domain: 'MATHEMATICS',
    domainNameId: 'Matematika & Penalaran Numerik',
    isQuantitative: true,
    requiresFormulas: true,
    requiresStepByStep: true,
    requiresTables: true,
    requiresCode: false,
    confidenceScore: 0.99,
    detectedCharacteristics: [
      'Memerlukan notasi persamaan matematis eksak',
      'Langkah penyelesaian bertahap terstruktur dengan substitusi angka',
      'Tabel representasi numerik dan verifikasi hasil hitungan'
    ],
    coreFormulas,
    workedExample,
    specializedTable
  };
}

function buildPhysicsAnalysis(context: string): SubjectAwareAnalysis {
  const coreFormulas: FormulaItem[] = [
    {
      name: 'Persamaan Kecepatan Gerak Lurus Beraturan (GLB)',
      latex: 'v = \\frac{s}{t}',
      textFallback: 'v = s / t',
      variables: [
        { symbol: 'v', meaning: 'Kecepatan gerak benda', unit: 'm/s' },
        { symbol: 's', meaning: 'Jarak tempuh lintasan', unit: 'meter (m)' },
        { symbol: 't', meaning: 'Waktu tempuh perjalanan', unit: 'sekon (s)' }
      ]
    },
    {
      name: 'Persamaan Percepatan Rata-Rata (GLBB)',
      latex: 'a = \\frac{\\Delta v}{\\Delta t} = \\frac{v_t - v_0}{t}',
      textFallback: 'a = Δv / Δt = (vt - v0) / t',
      variables: [
        { symbol: 'a', meaning: 'Percepatan gerak benda', unit: 'm/s²' },
        { symbol: 'v_t', meaning: 'Kecepatan akhir benda', unit: 'm/s' },
        { symbol: 'v_0', meaning: 'Kecepatan awal benda', unit: 'm/s' },
        { symbol: 't', meaning: 'Selang waktu gerak', unit: 'sekon (s)' }
      ]
    },
    {
      name: 'Persamaan Jarak Tempuh GLB',
      latex: 's = v \\times t',
      textFallback: 's = v × t',
      variables: [
        { symbol: 's', meaning: 'Jarak tempuh', unit: 'meter (m)' }
      ]
    }
  ];

  const workedExample: WorkedExample = {
    problemTitle: 'Menghitung Kecepatan dan Jarak pada GLB',
    problemStatement:
      'Sebuah mobil bergerak di jalan tol lurus tanpa hambatan dan menempuh jarak 300 meter dalam waktu 15 detik. Hitunglah kecepatan rata-rata mobil tersebut dan tentukan jarak yang ditempuh jika mobil terus melaju selama 40 detik!',
    given: [
      'Jarak pertama (s₁) = 300 m',
      'Waktu pertama (t₁) = 15 s',
      'Waktu kedua (t₂) = 40 s'
    ],
    steps: [
      {
        stepNumber: 1,
        description: 'Tuliskan persamaan GLB untuk mencari kecepatan v.',
        mathExpression: 'v = \\frac{s_1}{t_1} = \\frac{300\\text{ m}}{15\\text{ s}} = 20\\text{ m/s}'
      },
      {
        stepNumber: 2,
        description: 'Gunakan kecepatan v = 20 m/s untuk mencari jarak s₂ pada waktu t₂ = 40 s.',
        mathExpression: 's_2 = v \\times t_2 = 20\\text{ m/s} \\times 40\\text{ s} = 800\\text{ m}'
      }
    ],
    finalAnswer: 'Kecepatan mobil adalah 20 m/s dan jarak yang ditempuh selama 40 detik adalah 800 meter.',
    verificationOrNote: 'Validasi Satuan SI: Kecepatan dalam m/s dan jarak dalam meter (m). Konversi ke km/jam: 20 × 3,6 = 72 km/jam.'
  };

  const specializedTable: SpecializedTable = {
    title: 'Tabel Hubungan Jarak Tempuh terhadap Waktu (Kecepatan Konstan v = 20 m/s)',
    headers: ['Waktu t (sekon)', 'Jarak Tempuh s (meter)', 'Rasio Kecepatan s/t (m/s)', 'Karakteristik GLB'],
    rows: [
      ['0', '0', '-', 'Posisi awal diam'],
      ['5', '100', '20 m/s', 'Pertambahan jarak linier konstan'],
      ['10', '200', '20 m/s', 'Kecepatan konstan tanpa percepatan'],
      ['15', '300', '20 m/s', 'Kecepatan konstan (a = 0)'],
      ['20', '400', '20 m/s', 'Grafik s-t membentuk garis lurus miring']
    ],
    summaryOrInsight: 'Pada Gerak Lurus Beraturan (GLB), perbandingan jarak terhadap waktu selalu bernilai konstan.'
  };

  return {
    domain: 'PHYSICS',
    domainNameId: 'Fisika & Kinematika Gerak (SI Units)',
    isQuantitative: true,
    requiresFormulas: true,
    requiresStepByStep: true,
    requiresTables: true,
    requiresCode: false,
    confidenceScore: 0.98,
    detectedCharacteristics: [
      'Notasi besaran dan rumus fisika standar internasional (SI)',
      'Konsistensi satuan m, s, m/s, dan kg',
      'Langkah perhitungan numerik bertahap dan tabel observasi gerak'
    ],
    coreFormulas,
    workedExample,
    specializedTable
  };
}

function buildChemistryAnalysis(context: string): SubjectAwareAnalysis {
  const coreFormulas: FormulaItem[] = [
    {
      name: 'Konsep Mol dari Massa Zat',
      latex: 'n = \\frac{m}{M_r}',
      textFallback: 'n = m / Mr',
      variables: [
        { symbol: 'n', meaning: 'Jumlah mol zat', unit: 'mol' },
        { symbol: 'm', meaning: 'Massa zat', unit: 'gram (g)' },
        { symbol: 'M_r', meaning: 'Massa molekul relatif', unit: 'g/mol' }
      ]
    },
    {
      name: 'Hubungan Mol dengan Jumlah Partikel (Bilangan Avogadro)',
      latex: 'N = n \\times 6{,}022 \\times 10^{23}',
      textFallback: 'N = n × 6.022 × 10²³ partikel/mol',
      variables: [
        { symbol: 'N', meaning: 'Jumlah partikel (atom/molekul/ion)' },
        { symbol: 'L', meaning: 'Tetapan Avogadro (6,022 × 10²³ partikel/mol)' }
      ]
    }
  ];

  const workedExample: WorkedExample = {
    problemTitle: 'Menghitung Jumlah Mol dan Partikel Gas Karbon Dioksida',
    problemStatement:
      'Sebuah tabung laboratorium berisi 88 gram gas karbon dioksida (CO₂). Diketahui Ar C = 12 dan Ar O = 16. Hitunglah massa molar (Mr) CO₂, jumlah mol CO₂, dan jumlah molekul gas CO₂ dalam tabung!',
    given: [
      'Massa gas CO₂ (m) = 88 gram',
      'Ar C = 12, Ar O = 16',
      'Bilangan Avogadro (L) = 6,022 × 10²³ partikel/mol'
    ],
    steps: [
      {
        stepNumber: 1,
        description: 'Hitung massa molekul relatif (Mr) dari CO₂.',
        mathExpression: 'M_r\\text{ CO}_2 = (1 \\times \\text{Ar C}) + (2 \\times \\text{Ar O}) = (1 \\times 12) + (2 \\times 16) = 12 + 32 = 44\\text{ g/mol}'
      },
      {
        stepNumber: 2,
        description: 'Hitung jumlah mol n dengan membagi massa zat m dengan Mr.',
        mathExpression: 'n = \\frac{m}{M_r} = \\frac{88\\text{ g}}{44\\text{ g/mol}} = 2\\text{ mol}'
      },
      {
        stepNumber: 3,
        description: 'Hitung jumlah molekul total menggunakan ketetapan Avogadro.',
        mathExpression: 'N = n \\times L = 2\\text{ mol} \\times (6{,}022 \\times 10^{23}\\text{ molekul/mol}) = 1{,}2044 \\times 10^{24}\\text{ molekul}'
      }
    ],
    finalAnswer: 'Massa molar CO₂ adalah 44 g/mol, jumlah zat adalah 2 mol, dan berisi 1,2044 × 10²⁴ molekul CO₂.',
    verificationOrNote: 'Validasi Kimia: 1 mol zat selalu setara dengan 6,022 × 10²³ partikel.'
  };

  const specializedTable: SpecializedTable = {
    title: 'Tabel Hubungan Mol terhadap Massa dan Partikel Berbagai Zat Kimia',
    headers: ['Nama Zat', 'Rumus Kimia', 'Mr (g/mol)', 'Massa Sampel (g)', 'Jumlah Mol (mol)', 'Jumlah Partikel'],
    rows: [
      ['Karbon Dioksida', 'CO₂', '44', '88', '2,0', '1,204 × 10²⁴ molekul'],
      ['Air Murni', 'H₂O', '18', '36', '2,0', '1,204 × 10²⁴ molekul'],
      ['Gas Oksigen', 'O₂', '32', '16', '0,5', '3,011 × 10²³ molekul'],
      ['Natrium Klorida', 'NaCl', '58,5', '58,5', '1,0', '6,022 × 10²³ satuan rumus']
    ],
    summaryOrInsight: 'Mol adalah jembatan kuantitatif antara massa makroskopis zat dan jumlah partikel mikroskopis.'
  };

  return {
    domain: 'CHEMISTRY',
    domainNameId: 'Kimia & Stoikiometri (Mol & Avogadro)',
    isQuantitative: true,
    requiresFormulas: true,
    requiresStepByStep: true,
    requiresTables: true,
    requiresCode: false,
    confidenceScore: 0.98,
    detectedCharacteristics: [
      'Konsep mol, massa molar Mr, dan persamaan stoikiometri',
      'Bilangan Avogadro dan notasi ilmiah partikel',
      'Langkah perhitungan konversi gram-mol-partikel terstruktur'
    ],
    coreFormulas,
    workedExample,
    specializedTable
  };
}

function buildEconomicsAccountingAnalysis(context: string): SubjectAwareAnalysis {
  const coreFormulas: FormulaItem[] = [
    {
      name: 'Persentase Keuntungan Usaha',
      latex: '\\%\\text{Untung} = \\frac{\\text{Harga Jual} - \\text{Harga Beli}}{\\text{Harga Beli}} \\times 100\\%',
      textFallback: '%Untung = ((Harga Jual - Harga Beli) / Harga Beli) × 100%',
      variables: [
        { symbol: '\\%U', meaning: 'Persentase Margin Keuntungan', unit: '%' },
        { symbol: 'HJ', meaning: 'Harga Jual Produk / Total Pendapatan', unit: 'Rp' },
        { symbol: 'HB', meaning: 'Harga Pokok Pembelian / Modal', unit: 'Rp' }
      ]
    },
    {
      name: 'Prinsip Keseimbangan Akuntansi (Persamaan Dasar)',
      latex: '\\text{Aset (Harta)} = \\text{Liabilitas (Utang)} + \\text{Ekuitas (Modal)}',
      textFallback: 'Harta = Utang + Modal (Debit = Kredit)',
      variables: [
        { symbol: 'Debit', meaning: 'Pencatatan penambahan aset atau beban' },
        { symbol: 'Kredit', meaning: 'Pencatatan penambahan utang, modal, atau pendapatan' }
      ]
    }
  ];

  const workedExample: WorkedExample = {
    problemTitle: 'Perhitungan Laba Usaha dan Pencatatan Transaksi Jurnal',
    problemStatement:
      'Toko Alat Tulis "Cerdas" membeli 100 paket ATK dengan modal Rp50.000,00 per paket (total modal Rp5.000.000,00). Seluruh paket terjual habis dengan harga Rp65.000,00 per paket. Hitunglah total keuntungan, persentase keuntungan, dan catat transaksi penjualan tunai dalam jurnal umum!',
    given: [
      'Modal awal pembelian (HB) = 100 × Rp50.000 = Rp5.000.000,00',
      'Penerimaan penjualan (HJ) = 100 × Rp65.000 = Rp6.500.000,00'
    ],
    steps: [
      {
        stepNumber: 1,
        description: 'Hitung selisih nominal keuntungan bersih usaha.',
        mathExpression: '\\text{Keuntungan} = \\text{HJ} - \\text{HB} = \\text{Rp}6.500.000 - \\text{Rp}5.000.000 = \\text{Rp}1.500.000'
      },
      {
        stepNumber: 2,
        description: 'Hitung persentase keuntungan terhadap modal awal pembelian.',
        mathExpression: '\\%\\text{Untung} = \\frac{\\text{Rp}1.500.000}{\\text{Rp}5.000.000} \\times 100\\% = 0{,}30 \\times 100\\% = 30\\%'
      }
    ],
    finalAnswer: 'Total keuntungan toko adalah Rp1.500.000,00 dengan persentase keuntungan sebesar 30%.',
    verificationOrNote: 'Validasi Akuntansi: Penjualan tunai menambah akun Kas (Debit Rp6.500.000) dan menambah Pendapatan Penjualan (Kredit Rp6.500.000) secara seimbang.'
  };

  const specializedTable: SpecializedTable = {
    title: 'Format Standar Jurnal Umum 5 Kolom (Seimbang / Balance)',
    headers: ['Tanggal (2026)', 'No. Bukti', 'Keterangan Akun & Ref', 'Debit (Rp)', 'Kredit (Rp)'],
    rows: [
      ['02 Nov', 'BKK-01', 'Kas\n   Modal Pemilik', '15.000.000\n-', '-\n15.000.000'],
      ['03 Nov', 'BKK-02', 'Perlengkapan Toko\n   Kas', '2.000.000\n-', '-\n2.000.000'],
      ['05 Nov', 'BKM-01', 'Kas\n   Pendapatan Jasa/Barang', '6.500.000\n-', '-\n6.500.000'],
      ['Total', '-', 'TOTAL SALDO BERIMBANG', '23.500.000', '23.500.000']
    ],
    summaryOrInsight: 'Kaidah Baku Akuntansi: Total kolom Debit harus sama persis dengan total kolom Kredit (Keseimbangan Mutlak).'
  };

  return {
    domain: 'ECONOMICS_ACCOUNTING',
    domainNameId: 'Akuntansi & Keuangan Kuantitatif (5 Kolom Seimbang)',
    isQuantitative: true,
    requiresFormulas: true,
    requiresStepByStep: true,
    requiresTables: true,
    requiresCode: false,
    confidenceScore: 0.98,
    detectedCharacteristics: [
      'Format Jurnal Umum 5 kolom dengan posisi Debit dan Kredit berimbang',
      'Perhitungan persentase keuntungan, laba rugi, dan margin usaha',
      'Analisis transaksi keuangan dengan kaidah saldo normal akun'
    ],
    coreFormulas,
    workedExample,
    specializedTable
  };
}

function buildInformaticsAnalysis(context: string): SubjectAwareAnalysis {
  const coreFormulas: FormulaItem[] = [
    {
      name: 'Konversi Bilangan Biner ke Desimal (Bobot Pangkat 2)',
      latex: 'N_{10} = \\sum_{i=0}^{n-1} (b_i \\times 2^i)',
      textFallback: 'N10 = (b_n-1 × 2^n-1) + ... + (b_0 × 2^0)',
      variables: [
        { symbol: 'b_i', meaning: 'Digit bit biner (0 atau 1)' },
        { symbol: '2^i', meaning: 'Nilai bobot posisi bit biner pangkat 2' }
      ]
    }
  ];

  const workedExample: WorkedExample = {
    problemTitle: 'Konversi Bilangan Desimal ke Biner dan Representasi 8-bit',
    problemStatement: 'Konversikan bilangan desimal 25 ke dalam sistem bilangan biner menggunakan metode pembagian bertingkat modulo 2!',
    given: ['Nilai bilangan desimal = 25', 'Basis target biner = 2'],
    steps: [
      { stepNumber: 1, description: '25 dibagi 2 menghasilkan 12 dengan sisa 1.', mathExpression: '25 \\div 2 = 12 \\quad \\text{sisa } 1' },
      { stepNumber: 2, description: '12 dibagi 2 menghasilkan 6 dengan sisa 0.', mathExpression: '12 \\div 2 = 6 \\quad \\text{sisa } 0' },
      { stepNumber: 3, description: '6 dibagi 2 menghasilkan 3 dengan sisa 0.', mathExpression: '6 \\div 2 = 3 \\quad \\text{sisa } 0' },
      { stepNumber: 4, description: '3 dibagi 2 menghasilkan 1 dengan sisa 1.', mathExpression: '3 \\div 2 = 1 \\quad \\text{sisa } 1' },
      { stepNumber: 5, description: '1 dibagi 2 menghasilkan 0 dengan sisa 1.', mathExpression: '1 \\div 2 = 0 \\quad \\text{sisa } 1' }
    ],
    finalAnswer: 'Bilangan desimal 25 setara dengan 11001 dalam bilangan biner (11001₂).',
    verificationOrNote: 'Validasi Pembuktian Bobot: (1×16) + (1×8) + (0×4) + (0×2) + (1×1) = 16 + 8 + 1 = 25 (Terbukti Tepat).'
  };

  const specializedTable: SpecializedTable = {
    title: 'Tabel Konversi Bilangan Biner dan Tabel Kebenaran Logika',
    headers: ['Desimal', 'Biner (8-bit)', 'Heksadesimal', 'Input A, B', 'A AND B', 'A OR B'],
    rows: [
      ['0', '0000 0000', '0x00', '0, 0', '0', '0'],
      ['1', '0000 0001', '0x01', '0, 1', '0', '1'],
      ['2', '0000 0010', '0x02', '1, 0', '0', '1'],
      ['25', '0001 1001', '0x19', '1, 1', '1', '1']
    ],
    summaryOrInsight: 'Sistem komputasi menggunakan sinyal biner high (1) dan low (0) untuk memproses seluruh data.'
  };

  const codeOrPseudocode: CodeBlockInfo = {
    language: 'python',
    title: 'Algoritma Konversi Desimal ke Biner (Python & Pseudocode)',
    code: `def desimal_ke_biner(n: int) -> str:
    """Mengonversi bilangan bulat positif ke string biner."""
    if n == 0:
        return "0"
    sisa_list = []
    angka = n
    while angka > 0:
        sisa = angka % 2
        sisa_list.append(str(sisa))
        angka = angka // 2
    return "".join(reversed(sisa_list))

# Contoh Pengujian
nilai = 25
hasil_biner = desimal_ke_biner(nilai)
print(f"Desimal {nilai} = Biner {hasil_biner}") # Output: 11001`,
    explanation: 'Algoritma menggunakan loop pembagian bertingkat dengan operator modulo (%) dan pembagian bulat (//).'
  };

  return {
    domain: 'INFORMATICS',
    domainNameId: 'Informatika, Logika Digital & Sistem Bilangan',
    isQuantitative: true,
    requiresFormulas: true,
    requiresStepByStep: true,
    requiresTables: true,
    requiresCode: true,
    confidenceScore: 0.97,
    detectedCharacteristics: [
      'Representasi bilangan biner dan konversi basis 2',
      'Tabel kebenaran logika Boolean (AND, OR, NOT)',
      'Algoritma pemrograman terstruktur dengan blok kode Python'
    ],
    coreFormulas,
    workedExample,
    specializedTable,
    codeOrPseudocode
  };
}

function buildGenericQuantitativeAnalysis(context: string): SubjectAwareAnalysis {
  return {
    domain: 'GENERAL_SCIENCE',
    domainNameId: 'Sains Kuantitatif & Data Terapan',
    isQuantitative: true,
    requiresFormulas: true,
    requiresStepByStep: true,
    requiresTables: true,
    requiresCode: false,
    confidenceScore: 0.85,
    detectedCharacteristics: [
      'Penyelidikan berbasis pengukuran dan estimasi angka',
      'Penyusunan tabel observasi kuantitatif',
      'Perhitungan data terapan dengan satuan yang konsisten'
    ]
  };
}

// -------------------------------------------------------------
// DOMAIN-SPECIFIC BUILDERS (KONSEPTUAL / NON-NUMERIK)
// -------------------------------------------------------------

function buildChemistryQualitativeAnalysis(context: string, topic: string): SubjectAwareAnalysis {
  return {
    domain: 'CHEMISTRY',
    domainNameId: 'Kimia Konseptual & Struktur Materi (Non-Numerik)',
    isQuantitative: false,
    requiresFormulas: false,
    requiresStepByStep: false,
    requiresTables: false,
    requiresCode: false,
    confidenceScore: 0.98,
    detectedCharacteristics: [
      'Fokus pada pemahaman konsep struktur mikroskopis materi dan sifat kimiawi',
      'TIDAK memaksakan perhitungan kuantitatif atau rumus stoikiometri',
      'Menekankan pemodelan partikel (atom, molekul, ion) dan interaksi kimiawi',
      'Pembelajaran berbasis visualisasi konseptual dan investigasi fenomena materi'
    ],
    nonNumericGuidance: {
      conceptualFramework: `Pembelajaran materi "${topic}" berorientasi pada pemahaman konsep esensial struktur mikroskopis materi, sifat periodik, atau interaksi partikel tanpa beban perhitungan matematis yang tidak relevan.`,
      keyConcepts: [
        'Konsep Inti Materi: Partikel penyusun, konfigurasi elektron, atau interaksi kimiawi',
        'Hubungan Struktur dan Sifat: Menghubungkan struktur mikroskopis dengan fenomena makroskopis yang teramati',
        'Model & Representasi Visual: Penggunaan diagram partikel dan analogi konkret dalam kehidupan sehari-hari'
      ],
      caseStudyOrActivity:
        'Aktivitas Investigasi Visual: Peserta didik membuat pemodelan struktur materi dengan media visual/sederhana, mendiskusikan karakteristiknya dalam kelompok, dan mempresentasikan hubungan struktur tersebut dengan fenomena kontekstual.'
    }
  };
}

function buildLanguageAnalysis(context: string, subject: string, topic: string): SubjectAwareAnalysis {
  const isProsedur = context.includes('prosedur') || topic.toLowerCase().includes('prosedur');
  const isEksplanasi = context.includes('eksplanasi') || topic.toLowerCase().includes('eksplanasi');

  let conceptualFramework = `Pembelajaran materi "${topic}" berfokus pada analisis teks, penemuan ide pokok, interpretasi makna wacana, dan pengembangan kompetensi komunikasi tertulis serta lisan secara santun dan efektif tanpa memaksakan rumus matematis.`;
  let keyConcepts = [
    'Keterampilan Membaca & Memirsa: Menemukan gagasan utama dan bukti tekstual',
    'Keterampilan Menulis: Menyusun paragraf kohesif dan koheren dengan ejaan baku (EYD)',
    'Keterampilan Berbicara: Menyampaikan ide secara runtut dan artikulatif'
  ];
  let caseStudyOrActivity = 'Aktivitas Analisis Teks & Diskusi: Peserta didik membaca teks wacana autentik, membedah struktur isi dalam kelompok, dan mempresentasikan hasil simpulan makna teks.';

  if (isEksplanasi) {
    conceptualFramework = `Pembelajaran Teks Eksplanasi pada materi "${topic}" berfokus pada penjelasan ilmiah mengenai proses terjadinya fenomena alam, sosial, atau budaya secara runtut berdasarkan hubungan sebab-akibat (kausalitas) dan kronologis faktual, tanpa memaksakan rumus atau angka matematika artifisial.`;
    keyConcepts = [
      'Struktur Teks Eksplanasi: Pernyataan Umum (Identifikasi Fenomena), Rangkaian Kejadian / Deretan Penjelas (Kausalitas & Kronologis), dan Interpretasi / Ulasan (Kesimpulan Faktual)',
      'Kaidah Kebahasaan Kausalitas: Konjungsi sebab-akibat (sebab, karena, akibatnya, sehingga, menimbulkan, memicu)',
      'Kaidah Kebahasaan Kronologis: Konjungsi temporal (kemudian, setelah itu, lalu, pada awalnya, akhirnya)',
      'Karakteristik Wacana: Berorientasi pada fakta ilmiah objektif, penggunaan kata kerja pasif dan verba relasional, serta peristilahan teknis kontekstual'
    ];
    caseStudyOrActivity =
      'Aktivitas Penulisan Eksplanasi Ilmiah: Peserta didik menyelidiki fenomena nyata (misal terjadinya siklus air, gempa bumi, atau proses pembentukan pelangi), memetakan alur sebab-akibat ke dalam kerangka 3 bagian teks eksplanasi, menyusun draf teks utuh dengan bahasa baku, lalu saling memberikan ulasan sejawat (peer-review).';
  } else if (isProsedur) {
    conceptualFramework = `Pembelajaran Teks Prosedur menekankan pemahaman struktur sistematis (Tujuan, Bahan/Alat, Langkah-Langkah Berurutan, dan Penutup) serta kaidah kebahasaan spesifik (kata kerja imperatif, kata penghubung/konjungsi temporal, dan verba material) tanpa melibatkan rumus perhitungan matematis.`;
    keyConcepts = [
      'Struktur Teks Prosedur: Judul, Tujuan, Alat/Bahan, Langkah-Langkah Bertahap, dan Penegasan Ulang/Penutup',
      'Kaidah Kebahasaan: Kalimat imperatif (perintah), kata kerja aksi, konjungsi temporal (pertama, selanjutnya, kemudian), dan kalimat persuasif',
      'Karakteristik Instruksi: Jelas, operasional, logis, dan mudah diikuti oleh pembaca'
    ];
    caseStudyOrActivity =
      'Aktivitas Praktik Menulis & Demonstrasi: Peserta didik secara berpasangan merancang teks prosedur bertema "Kiat Sukses Mengatur Waktu Belajar Mandiri" atau "Panduan Mengoperasikan Aplikasi Digital Edukasi", lalu mempraktikkan langkah-langkahnya di hadapan teman sekelas.';
  }

  return {
    domain: 'HUMANITIES_ARTS_LANGUAGE',
    domainNameId: 'Bahasa, Sastra & Komunikasi (Non-Numerik)',
    isQuantitative: false,
    requiresFormulas: false,
    requiresStepByStep: false,
    requiresTables: false,
    requiresCode: false,
    confidenceScore: 0.99,
    detectedCharacteristics: [
      'Fokus pada pemahaman teks, struktur wacana, dan kaidah kebahasaan',
      'TIDAK memaksakan rumus atau angka numerik artifisial',
      'Menekankan 4 kemahiran berbahasa: Menyimak, Berbicara, Membaca, dan Menulis',
      'Praktik menyusun karya tulis orisinal dan telaah bukti tekstual'
    ],
    nonNumericGuidance: {
      conceptualFramework,
      keyConcepts,
      caseStudyOrActivity
    }
  };
}

function buildDkvAnalysis(context: string, topic: string): SubjectAwareAnalysis {
  return {
    domain: 'HUMANITIES_ARTS_LANGUAGE',
    domainNameId: 'Desain Komunikasi Visual & Prinsip Tipografi (Non-Numerik)',
    isQuantitative: false,
    requiresFormulas: false,
    requiresStepByStep: false,
    requiresTables: false,
    requiresCode: false,
    confidenceScore: 0.99,
    detectedCharacteristics: [
      'Fokus pada penalaran konseptual, estetika rupa, dan komunikasi visual',
      'TIDAK memaksakan rumus matematika atau kalkulasi angka',
      'Menganalisis anatomi tipografi, klasifikasi jenis huruf, dan hierarki desain',
      'Praktik perancangan sketsa tata letak dan apresiasi karya visual (Gallery Walk)'
    ],
    nonNumericGuidance: {
      conceptualFramework: `Eksplorasi materi "${topic}" berorientasi pada penciptaan pesan visual yang komunikatif, bernilai estetika tinggi, serta memiliki keterbacaan (readability & legibility) yang optimal tanpa membutuhkan rumus matematika paksaan.`,
      keyConcepts: [
        'Anatomi Tipografi: Baseline, Mean line, X-height, Ascender, Descender, dan Cap Height',
        'Klasifikasi Huruf: Serif (klasik/formal), Sans Serif (modern/bersih), Script (elegan/personal), dan Display (dekoratif/atraktif)',
        'Hierarki Visual: Skala perbandingan ukuran headline (fokus utama), sub-headline, body text (isi), dan caption',
        'Legibilitas & Keterbacaan: Jarak spasi antarkarakter (kerning), spasi kata (tracking), dan spasi antarbaris (leading)',
        'Prinsip Komposisi: Keseimbangan (balance), kontras (contrast), kesatuan (unity), dan ruang bernapas (negative space)'
      ],
      artisticPrinciples: [
        'Anatomi Huruf: Mengenali proporsi fisik huruf dari baseline hingga cap height',
        'Hierarki Visual: Mengarahkan pandangan audiens dari informasi terpenting ke detail pendukung',
        'Harmoni Warna & Kontras: Memastikan rasio kontras teks terhadap latar belakang terbaca dengan jelas',
        'Kesesuaian Emosi (Mood): Memilih typeface yang selaras dengan pesan komunikasi yang ingin disampaikan'
      ],
      caseStudyOrActivity:
        'Aktivitas Praktik Tipografi: Peserta didik merancang poster tipografi mini yang memadukan 2 keluarga huruf (misal Serif untuk judul dan Sans-Serif untuk teks tubuh), menata hierarki informasi, lalu mengadakan pameran mini karya (Gallery Walk).'
    }
  };
}

function buildEconomicsQualitativeAnalysis(context: string, topic: string): SubjectAwareAnalysis {
  return {
    domain: 'ECONOMICS_ACCOUNTING',
    domainNameId: 'Ekonomi Konseptual & Keputusan Konsumsi (Non-Numerik)',
    isQuantitative: false,
    requiresFormulas: false,
    requiresStepByStep: false,
    requiresTables: false,
    requiresCode: false,
    confidenceScore: 0.98,
    detectedCharacteristics: [
      'Fokus pada pemahaman konsep kebutuhan, kelangkaan, dan pilihan keputusan ekonomi',
      'TIDAK memaksakan perhitungan atau pencatatan jurnal akuntansi',
      'Menganalisis skala prioritas dan perilaku konsumen bijak',
      'Pembelajaran berbasis studi kasus kontekstual kehidupan sehari-hari siswa'
    ],
    nonNumericGuidance: {
      conceptualFramework: `Materi "${topic}" mendalami pemahaman bahwa kebutuhan manusia bersifat tidak terbatas sementara alat pemuas kebutuhan bersifat terbatas (kelangkaan). Peserta didik dilatih bersikap rasional dalam menyusun skala prioritas dan mengambil keputusan ekonomi tanpa harus menggunakan rumus hitungan rumit.`,
      keyConcepts: [
        'Konsep Kelangkaan (Scarcity): Kondisi di mana sumber daya yang tersedia tidak cukup untuk memenuhi semua kebutuhan manusia',
        'Hierarki Kebutuhan: Kebutuhan Primer (pokok), Sekunder (pelengkap), dan Tersier (kemewahan)',
        'Faktor yang Memengaruhi Kebutuhan: Pendapatan, lingkungan sosial, tingkat pendidikan, kemajuan teknologi, dan kondisi alam',
        'Penyusunan Skala Prioritas: Menentukan urutan pemenuhan kebutuhan dari yang paling mendesak hingga yang dapat ditunda',
        'Literasi Keuangan Bijak: Membedakan antara "keinginan sesaat" (wants) dan "kebutuhan esensial" (needs)'
      ],
      caseStudyOrActivity:
        'Studi Kasus Pengambilan Keputusan: Peserta didik diberikan skenario uang saku mingguan terbatas dan daftar 10 pengeluaran mendadak. Peserta didik berdiskusi mengelompokkan pos pengeluaran berdasarkan skala prioritas, mendebat alasan keputusan mereka, dan mempresentasikan rencana konsumsi yang paling bijak.'
    }
  };
}

function buildInformaticsQualitativeAnalysis(context: string, topic: string): SubjectAwareAnalysis {
  return {
    domain: 'INFORMATICS',
    domainNameId: 'Informatika & Berpikir Komputasional (Non-Numerik)',
    isQuantitative: false,
    requiresFormulas: false,
    requiresStepByStep: false,
    requiresTables: false,
    requiresCode: false,
    confidenceScore: 0.98,
    detectedCharacteristics: [
      'Fokus pada 4 pilar Berpikir Komputasional (Computational Thinking) dan logika pemecahan masalah',
      'TIDAK memaksakan rumus atau konversi bilangan numerik',
      'Menggunakan representasi diagram alir (flowchart) dan algoritma langkah terstruktur',
      'Berorientasi pada pemecahan masalah sehari-hari secara logis, runtut, dan terdekomposisi'
    ],
    nonNumericGuidance: {
      conceptualFramework: `Pembelajaran Berpikir Komputasional pada materi "${topic}" berfokus pada metode menyelesaikan persoalan kompleks secara efektif dan efisien melalui cara berpikir ilmuwan komputer, tanpa harus menggunakan rumus matematika atau hitungan biner rumit.`,
      keyConcepts: [
        'Dekomposisi: Memecah masalah besar dan rumit menjadi bagian-bagian kecil yang lebih mudah dikelola',
        'Pengenalan Pola (Pattern Recognition): Menemukan kesamaan karakteristik atau pola dari masalah yang pernah diselesaikan sebelumnya',
        'Abstraksi (Abstraction): Memfokuskan perhatian hanya pada informasi yang penting dan mengabaikan detail yang tidak relevan',
        'Perancangan Algoritma: Menyusun langkah-langkah terurut, logis, dan terarah untuk memecahkan masalah',
        'Representasi Diagram Alir (Flowchart): Simbol terminator (mulai/selesai), proses (persegi panjang), keputusan (belah ketupat), dan alur panah'
      ],
      caseStudyOrActivity:
        'Aktivitas Logika Terstruktur: Peserta didik menganalisis alur antrean kantin sekolah atau sistem penyortiran sampah, memecahnya menjadi langkah dekomposisi, menyusun flowchart di kertas plano, dan menguji apakah langkah algoritma mereka bebas dari kesalahan logika (debugging langkah).'
    }
  };
}

function buildSocialCivicsAnalysis(context: string, subject: string, topic: string): SubjectAwareAnalysis {
  return {
    domain: 'HUMANITIES_ARTS_LANGUAGE',
    domainNameId: 'Pendidikan Pancasila, Sejarah & Sosial (Non-Numerik)',
    isQuantitative: false,
    requiresFormulas: false,
    requiresStepByStep: false,
    requiresTables: false,
    requiresCode: false,
    confidenceScore: 0.99,
    detectedCharacteristics: [
      'Fokus pada penanaman nilai karakter, etika kewargaan, dan telaah sosial-historis',
      'TIDAK melibatkan angka atau rumus matematika',
      'Mendorong dialog kritis, musyawarah mufakat, dan sikap toleransi kebinekaan',
      'Pembelajaran berbasis studi kasus nilai dalam kehidupan bermasyarakat'
    ],
    nonNumericGuidance: {
      conceptualFramework: `Pembelajaran materi "${topic}" menekankan penghayatan nilai-nilai kebangsaan, penalaran kritis terhadap fenomena sosial, serta komitmen menjadi warga negara yang bertanggung jawab, adil, dan berakhlak mulia.`,
      keyConcepts: [
        'Nilai-Nilai Luhur: Keadilan, kemanusiaan, persatuan, musyawarah, dan gotong royong',
        'Kesadaran Hukum & Norma: Hak dan kewajiban warga negara dalam tatanan masyarakat yang tertib',
        'Penalaran Kritis Sosial: Menganalisis sebab-akibat peristiwa sosial dan menemukan solusi damai',
        'Refleksi Diri: Menilai komitmen pribadi dalam mempraktikkan kebajikan dalam interaksi harian'
      ],
      caseStudyOrActivity:
        'Aktivitas Simulasi Musyawarah: Peserta didik melakukan simulasi sidang musyawarah penyelesaian konflik kepentingan di lingkungan RT/sekolah, mengutarakan argumen berlandaskan nilai Pancasila, dan menyepakati mufakat bersama.'
    }
  };
}

function buildGenericQualitativeAnalysis(context: string, subject: string, topic: string): SubjectAwareAnalysis {
  return {
    domain: 'GENERAL_SCIENCE',
    domainNameId: 'Literasi Konseptual & Penyelidikan Kualitatif',
    isQuantitative: false,
    requiresFormulas: false,
    requiresStepByStep: false,
    requiresTables: false,
    requiresCode: false,
    confidenceScore: 0.8,
    detectedCharacteristics: [
      'Eksplorasi fenomena konseptual, analitis, dan kontekstual',
      'Pengamatan kualitatif dan diskusi berbasis bukti nyata',
      'TIDAK memaksakan rumus atau angka numerik artifisial'
    ],
    nonNumericGuidance: {
      conceptualFramework: `Pembelajaran materi "${topic}" menekankan penguatan konsep esensial, diskusi terbimbing, dan penalaran kontekstual yang bermakna bagi peserta didik.`,
      keyConcepts: [
        'Pemahaman Konsep Inti materi pembelajaran',
        'Analisis Hubungan Sebab-Akibat pada fenomena kontekstual',
        'Penyusunan simpulan berbasis bukti dan refleksi pengalaman belajar'
      ]
    }
  };
}
