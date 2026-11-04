/**
 * Subject-Aware Output Engine for GURITA
 * Detects domain and provides mathematically and conceptually accurate
 * formulas, step-by-step calculations, specialized tables, and code.
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
  isQuantitative: boolean;
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
    artisticPrinciples: string[];
    conceptualFramework: string;
    visualHierarchyGuidelines: string[];
  };
}

/**
 * Flexible classifier that detects subject characteristics from subject name,
 * topic, materi, and learning outcomes without relying strictly on rigid keywords.
 */
export function classifySubject(
  subject: string,
  materi: string = '',
  topic: string = '',
  additionalContext: string = ''
): SubjectAwareAnalysis {
  const combined = `${subject} ${materi} ${topic} ${additionalContext}`.toLowerCase();

  // Helper matching
  const matchAny = (keywords: string[]) => keywords.some((k) => combined.includes(k));

  // 1. INFORMATIKA / COMPUTING
  const infoKeywords = [
    'informatika',
    'komputer',
    'coding',
    'pemrograman',
    'biner',
    'binary',
    'oktal',
    'heksadesimal',
    'hexadecimal',
    'boolean',
    'gerbang logika',
    'tabel kebenaran',
    'algoritma',
    'pseudocode',
    'python',
    'struktur data',
    'basis data',
    'jaringan',
    'berpikir komputasional'
  ];
  if (matchAny(infoKeywords)) {
    return buildInformaticsAnalysis(combined);
  }

  // 2. KIMIA / CHEMISTRY
  const chemKeywords = [
    'kimia',
    'stoikiometri',
    'reaksi kimia',
    'mol',
    'molaritas',
    'ikatan kimia',
    'tabel periodik',
    'larutan',
    'asam basa',
    'termokimia',
    'unsur',
    'senyawa',
    'ph',
    'redoks',
    'hidrokarbon',
    'avogadro'
  ];
  if (matchAny(chemKeywords)) {
    return buildChemistryAnalysis(combined);
  }

  // 3. FISIKA / PHYSICS
  const physicsKeywords = [
    'fisika',
    'kecepatan',
    'percepatan',
    'glb',
    'glbb',
    'gaya newton',
    'usaha',
    'energi',
    'daya',
    'tekanan',
    'termodinamika',
    'listrik statis',
    'listrik dinamis',
    'hukum ohm',
    'optik',
    'gelombang',
    'bunyi',
    'vektor',
    'kinematika',
    'dinamika'
  ];
  if (matchAny(physicsKeywords)) {
    return buildPhysicsAnalysis(combined);
  }

  // 4. EKONOMI & AKUNTANSI
  const econKeywords = [
    'akuntansi',
    'ekonomi',
    'jurnal umum',
    'buku besar',
    'neraca saldo',
    'laba rugi',
    'keuntungan',
    'kerugian',
    'persentase keuntungan',
    'bunga bank',
    'pajak',
    'harga jual',
    'harga beli',
    'arus kas',
    'debit kredit',
    'permintaan dan penawaran',
    'inflasi',
    'biaya produksi'
  ];
  if (matchAny(econKeywords)) {
    return buildEconomicsAccountingAnalysis(combined);
  }

  // 5. MATEMATIKA / MATHEMATICS
  const mathKeywords = [
    'matematika',
    'aljabar',
    'persamaan linear',
    'spldv',
    'splsv',
    'bangun datar',
    'bangun ruang',
    'luas',
    'volume',
    'geometri',
    'trigonometri',
    'statistika',
    'peluang',
    'fungsi kuadrat',
    'matriks',
    'vektor',
    'kalkulus',
    'pecahan',
    'desimal',
    'persentase',
    'pythagoras',
    'lingkaran',
    'deret aritmatika',
    'eksponen'
  ];
  if (matchAny(mathKeywords)) {
    return buildMathematicsAnalysis(combined);
  }

  // 6. HUMANIORA / ARTS / DKV / LANGUAGE (Explicit Non-Numeric!)
  const humanitiesKeywords = [
    'dkv',
    'desain komunikasi visual',
    'tipografi',
    'seni rupa',
    'seni budaya',
    'seni musik',
    'tata letak',
    'layout',
    'bahasa indonesia',
    'bahasa inggris',
    'sastra',
    'puisi',
    'cerpen',
    'sejarah',
    'ppkn',
    'pancasila',
    'sosiologi',
    'antropologi',
    'filsafat',
    'bimbingan konseling'
  ];
  if (matchAny(humanitiesKeywords)) {
    return buildHumanitiesArtsAnalysis(combined, subject, topic);
  }

  // 7. Check if text mentions generic quantitative or numerical needs
  const generalNumericKeywords = [
    'hitung',
    'rumus',
    'angka',
    'data numerik',
    'persamaan',
    'pengukuran',
    'kalkulasi',
    'tabel'
  ];
  if (matchAny(generalNumericKeywords)) {
    return buildGenericQuantitativeAnalysis(combined);
  }

  // Default: General Science / Contextual without forced math
  return {
    domain: 'GENERAL_SCIENCE',
    domainNameId: 'Sains Terpadu & Literasi Umum',
    isQuantitative: false,
    requiresFormulas: false,
    requiresStepByStep: false,
    requiresTables: false,
    requiresCode: false,
    confidenceScore: 0.7,
    detectedCharacteristics: [
      'Eksplorasi fenomena konseptual dan kontekstual',
      'Pengamatan kualitatif dan penyelidikan berbasis bukti',
      'Tidak memaksakan rumus atau angka numerik artifisial'
    ]
  };
}

// -------------------------------------------------------------
// DOMAIN-SPECIFIC BUILDERS
// -------------------------------------------------------------

function buildMathematicsAnalysis(context: string): SubjectAwareAnalysis {
  const isGeometry = context.includes('bangun') || context.includes('ruang') || context.includes('volume') || context.includes('luas');
  const isLinearEq = context.includes('linear') || context.includes('splsv') || context.includes('spldv') || context.includes('variabel');

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
        variables: [
          { symbol: 's', meaning: 'Panjang rusuk kubus', unit: 'cm / m' }
        ]
      }
    ];

    workedExample = {
      problemTitle: 'Menghitung Volume dan Luas Permukaan Balok',
      problemStatement:
        'Sebuah kotak wadah alat peraga berbentuk balok memiliki ukuran panjang 12 cm, lebar 8 cm, dan tinggi 5 cm. Hitunglah volume wadah dan luas bahan minimum yang diperlukan untuk membuatnya!',
      given: ['Panjang (p) = 12 cm', 'Lebar (l) = 8 cm', 'Tinggi (t) = 5 cm'],
      steps: [
        {
          stepNumber: 1,
          description: 'Tuliskan rumus volume balok dan substitusikan nilai ukuran yang diketahui.',
          mathExpression: 'V = p \\times l \\times t = 12\\text{ cm} \\times 8\\text{ cm} \\times 5\\text{ cm}'
        },
        {
          stepNumber: 2,
          description: 'Lakukan perkalian bertahap untuk memperoleh nilai volume.',
          mathExpression: 'V = 96 \\times 5 = 480\\text{ cm}^3'
        },
        {
          stepNumber: 3,
          description: 'Tuliskan rumus luas permukaan balok dan hitung luas setiap pasangan sisi.',
          mathExpression: 'L_p = 2 \\times (p \\cdot l + p \\cdot t + l \\cdot t) = 2 \\times ((12 \\cdot 8) + (12 \\cdot 5) + (8 \\cdot 5))'
        },
        {
          stepNumber: 4,
          description: 'Sederhanakan operasi dalam tanda kurung lalu kalikan dengan 2.',
          mathExpression: 'L_p = 2 \\times (96 + 60 + 40) = 2 \\times 196 = 392\\text{ cm}^2'
        }
      ],
      finalAnswer: 'Volume kotak adalah 480 cm³ dan luas permukaan bahan adalah 392 cm².',
      verificationOrNote: 'Validasi: Satuan volume adalah kubik (cm³) dan satuan luas adalah persegi (cm²).'
    };

    specializedTable = {
      title: 'Tabel Perbandingan Karakteristik Bangun Ruang',
      headers: ['Nama Bangun', 'Jumlah Sisi', 'Jumlah Rusuk', 'Rumus Luas Permukaan', 'Rumus Volume'],
      rows: [
        ['Kubus', '6 persegi identik', '12 sama panjang', '6s²', 's³'],
        ['Balok', '6 persegi panjang', '12 (3 pasang sejajar)', '2(pl + pt + lt)', 'p × l × t'],
        ['Prisma Segitiga', '5 sisi', '9 rusuk', '(2 × L_alas) + (Kel_alas × t)', 'L_alas × t'],
        ['Tabung (Silinder)', '3 (2 lingkaran + 1 selimut)', '2 rusuk lengkung', '2πr(r + t)', 'πr²t']
      ],
      summaryOrInsight: 'Setiap bangun ruang memiliki relasi antara bentuk bidang alas dan perkalian tinggi prisma.'
    };
  } else {
    // Linear Equations (SPLSV / SPLDV)
    coreFormulas = [
      {
        name: 'Bentuk Umum Persamaan Linear Satu Variabel (SPLSV)',
        latex: 'ax + b = c, \\quad a \\neq 0',
        textFallback: 'ax + b = c (dengan a ≠ 0)',
        variables: [
          { symbol: 'a', meaning: 'Koefisien variabel x' },
          { symbol: 'x', meaning: 'Variabel yang dicari' },
          { symbol: 'b, c', meaning: 'Konstanta bilangan real' }
        ]
      },
      {
        name: 'Solusi Nilai Variabel x',
        latex: 'x = \\frac{c - b}{a}',
        textFallback: 'x = (c - b) / a',
        variables: [{ symbol: 'x', meaning: 'Akar penyelesaian' }]
      }
    ];

    workedExample = {
      problemTitle: 'Penyelesaian Persamaan Linear Satu Variabel (SPLSV)',
      problemStatement:
        'Tentukan nilai x yang memenuhi persamaan linear: 4x + 12 = 36.',
      given: ['Persamaan awal: 4x + 12 = 36', 'Koefisien a = 4, b = 12, c = 36'],
      steps: [
        {
          stepNumber: 1,
          description: 'Kurangkan kedua ruas dengan konstanta 12 untuk mengisolasi suku bervariabel.',
          mathExpression: '4x + 12 - 12 = 36 - 12 \\implies 4x = 24'
        },
        {
          stepNumber: 2,
          description: 'Bagi kedua ruas dengan koefisien variabel 4 untuk menemukan nilai x.',
          mathExpression: 'x = \\frac{24}{4} \\implies x = 6'
        },
        {
          stepNumber: 3,
          description: 'Uji substitusi balik ke persamaan awal untuk memastikan kebenaran hasil.',
          mathExpression: '4(6) + 12 = 24 + 12 = 36\\quad (\\text{Terbukti Benar})'
        }
      ],
      finalAnswer: 'Himpunan penyelesaian dari 4x + 12 = 36 adalah {6}.',
      verificationOrNote: 'Pemeriksaan substitusi membuktikan ruas kiri sama dengan ruas kanan secara presisi.'
    };

    specializedTable = {
      title: 'Tabel Uji Titik dan Validasi Solusi SPLSV: 4x + 12',
      headers: ['Nilai Uji (x)', 'Perhitungan Ruas Kiri (4x + 12)', 'Ruas Kanan Target', 'Status Validasi'],
      rows: [
        ['x = 4', '4(4) + 12 = 16 + 12 = 28', '36', 'Salah (Terlalu kecil)'],
        ['x = 5', '4(5) + 12 = 20 + 12 = 32', '36', 'Salah (Mendekati)'],
        ['x = 6', '4(6) + 12 = 24 + 12 = 36', '36', 'Tepat (Solusi Benar)'],
        ['x = 7', '4(7) + 12 = 28 + 12 = 40', '36', 'Salah (Terlalu besar)']
      ],
      summaryOrInsight: 'Hanya ada tepat satu nilai x yang membuat persamaan bernilai benar.'
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
    confidenceScore: 0.98,
    detectedCharacteristics: [
      'Memerlukan notasi matematika presisi dan rumus formal',
      'Langkah penyelesaian bertahap dengan operasi aljabar runtut',
      'Penyajian tabel validasi angka dan solusi eksak'
    ],
    coreFormulas,
    workedExample,
    specializedTable
  };
}

function buildPhysicsAnalysis(context: string): SubjectAwareAnalysis {
  const isKinematics = context.includes('kecepatan') || context.includes('jarak') || context.includes('waktu') || context.includes('glbb') || context.includes('gerak');

  const coreFormulas: FormulaItem[] = [
    {
      name: 'Persamaan Kecepatan Rata-Rata (Gerak Lurus Beraturan)',
      latex: 'v = \\frac{s}{t}',
      textFallback: 'v = s / t',
      variables: [
        { symbol: 'v', meaning: 'Kecepatan benda', unit: 'm/s atau km/jam' },
        { symbol: 's', meaning: 'Jarak / Perpindahan', unit: 'meter (m) atau km' },
        { symbol: 't', meaning: 'Waktu tempuh', unit: 'sekon (s) atau jam' }
      ]
    },
    {
      name: 'Persamaan Jarak Tempuh',
      latex: 's = v \\times t',
      textFallback: 's = v × t',
      variables: [
        { symbol: 's', meaning: 'Jarak tempuh', unit: 'meter (m)' }
      ]
    },
    {
      name: 'Konversi Kecepatan Standar SI',
      latex: '1\\text{ km/jam} = \\frac{1.000\\text{ m}}{3.600\\text{ s}} = \\frac{1}{3,6}\\text{ m/s}',
      textFallback: '1 km/jam = 1/3,6 m/s',
      variables: [
        { symbol: '3,6', meaning: 'Faktor konversi km/jam ke m/s' }
      ]
    }
  ];

  const workedExample: WorkedExample = {
    problemTitle: 'Menghitung Kecepatan dan Konversi Satuan SI',
    problemStatement:
      'Sebuah bus pariwisata menempuh perjalanan dari kota A ke kota B dengan jarak total 150 km dalam waktu 2,5 jam. Berapakah kecepatan bus dalam km/jam dan dalam satuan internasional (m/s)?',
    given: ['Jarak tempuh (s) = 150 km', 'Waktu tempuh (t) = 2,5 jam'],
    steps: [
      {
        stepNumber: 1,
        description: 'Gunakan rumus kecepatan rata-rata untuk menghitung kecepatan dalam km/jam.',
        mathExpression: 'v = \\frac{s}{t} = \\frac{150\\text{ km}}{2,5\\text{ jam}} = 60\\text{ km/jam}'
      },
      {
        stepNumber: 2,
        description: 'Lakukan konversi satuan ke Satuan Internasional (m/s) dengan membagi 3,6.',
        mathExpression: 'v = \\frac{60}{3,6}\\text{ m/s} = \\frac{600}{36}\\text{ m/s} \\approx 16,67\\text{ m/s}'
      },
      {
        stepNumber: 3,
        description: 'Alternatif pembuktian langsung konversi meter dan sekon.',
        mathExpression: 'v = \\frac{150.000\\text{ m}}{2,5 \\times 3.600\\text{ s}} = \\frac{150.000\\text{ m}}{9.000\\text{ s}} = 16,67\\text{ m/s}'
      }
    ],
    finalAnswer: 'Kecepatan rata-rata bus adalah 60 km/jam atau setara dengan 16,67 m/s.',
    verificationOrNote: 'Satuan konsisten dengan kaidah besaran dan satuan internasional (SI).'
  };

  const specializedTable: SpecializedTable = {
    title: 'Tabel Pengamatan Hubungan Jarak, Waktu, dan Kecepatan Konstan (v = 20 m/s)',
    headers: ['Waktu Tempuh (t dalam sekon)', 'Kecepatan (v dalam m/s)', 'Jarak Tempuh (s = v × t dalam meter)', 'Jarak dalam Kilometer (km)'],
    rows: [
      ['5 s', '20 m/s', '100 m', '0,10 km'],
      ['10 s', '20 m/s', '200 m', '0,20 km'],
      ['30 s', '20 m/s', '600 m', '0,60 km'],
      ['60 s (1 menit)', '20 m/s', '1.200 m', '1,20 km'],
      ['300 s (5 menit)', '20 m/s', '6.000 m', '6,00 km']
    ],
    summaryOrInsight: 'Pada Gerak Lurus Beraturan (GLB), grafik jarak terhadap waktu membentuk garis lurus linier dengan kemiringan konstan (kecepatan).'
  };

  return {
    domain: 'PHYSICS',
    domainNameId: 'Fisika & Pemodelan Sains Kuantitatif',
    isQuantitative: true,
    requiresFormulas: true,
    requiresStepByStep: true,
    requiresTables: true,
    requiresCode: false,
    confidenceScore: 0.96,
    detectedCharacteristics: [
      'Menyertakan rumus fisika formal dan besaran pokok/turunan',
      'Konsistensi satuan SI (m, s, m/s, kg, N, Joule)',
      'Tabel data pengamatan eksperimen dan interpretasi grafik'
    ],
    coreFormulas,
    workedExample,
    specializedTable
  };
}

function buildChemistryAnalysis(context: string): SubjectAwareAnalysis {
  const coreFormulas: FormulaItem[] = [
    {
      name: 'Hubungan Mol dengan Massa (Gram)',
      latex: 'n = \\frac{m}{M_r}',
      textFallback: 'n = m / Mr',
      variables: [
        { symbol: 'n', meaning: 'Jumlah mol zat', unit: 'mol' },
        { symbol: 'm', meaning: 'Massa zat', unit: 'gram (g)' },
        { symbol: 'M_r', meaning: 'Massa molekul relatif', unit: 'g/mol' }
      ]
    },
    {
      name: 'Hubungan Mol dengan Jumlah Partikel (Avogadro)',
      latex: 'N = n \\times 6,022 \\times 10^{23}',
      textFallback: 'N = n × 6,022 × 10²³ partikel',
      variables: [
        { symbol: 'N', meaning: 'Jumlah partikel (atom / molekul)', unit: 'partikel' }
      ]
    },
    {
      name: 'Hubungan Mol dengan Volume Gas pada Kondisi Standar (STP)',
      latex: 'V_{STP} = n \\times 22,4\\text{ L}',
      textFallback: 'V_STP = n × 22,4 Liter',
      variables: [
        { symbol: 'V', meaning: 'Volume gas pada 0°C, 1 atm', unit: 'Liter (L)' }
      ]
    }
  ];

  const workedExample: WorkedExample = {
    problemTitle: 'Konversi Massa ke Jumlah Mol dan Partikel Molekul Air (H₂O)',
    problemStatement:
      'Tentukan jumlah mol dan jumlah molekul yang terkandung di dalam 36 gram air (H₂O)! (Diketahui Ar H = 1, Ar O = 16, tetapan Avogadro = 6,022 × 10²³)',
    given: [
      'Massa air (m) = 36 gram',
      'Ar H = 1, Ar O = 16',
      'Mr H₂O = (2 × 1) + 16 = 18 g/mol'
    ],
    steps: [
      {
        stepNumber: 1,
        description: 'Hitung Massa Molekul Relatif (Mr) senyawa H₂O.',
        mathExpression: 'M_r(\\text{H}_2\\text{O}) = (2 \\times A_r\\text{ H}) + A_r\\text{ O} = (2 \\times 1) + 16 = 18\\text{ g/mol}'
      },
      {
        stepNumber: 2,
        description: 'Gunakan rumus mol untuk mencari jumlah mol air.',
        mathExpression: 'n = \\frac{m}{M_r} = \\frac{36\\text{ gram}}{18\\text{ g/mol}} = 2\\text{ mol}'
      },
      {
        stepNumber: 3,
        description: 'Kalikan nilai mol dengan bilangan Avogadro untuk menghitung total molekul.',
        mathExpression: 'N = n \\times 6,022 \\times 10^{23} = 2 \\times 6,022 \\times 10^{23} = 1,2044 \\times 10^{24}\\text{ molekul}'
      }
    ],
    finalAnswer: '36 gram air setara dengan 2 mol atau mengandung 1,2044 × 10²⁴ molekul H₂O.',
    verificationOrNote: 'Validasi: Konsep jembatan mol menghubungkan dunia mikroskopis (atom) dengan makroskopis (gram).'
  };

  const specializedTable: SpecializedTable = {
    title: 'Tabel Perhitungan Jembatan Mol pada Senyawa Umum',
    headers: ['Senyawa Kimia', 'Rumus Mr (g/mol)', 'Massa Sampel (g)', 'Jumlah Mol (mol)', 'Volume STP (L)', 'Jumlah Partikel'],
    rows: [
      ['Gas Oksigen (O₂)', '32', '64 g', '2,0 mol', '44,8 L', '1,204 × 10²⁴ molekul'],
      ['Karbon Dioksida (CO₂)', '44', '22 g', '0,5 mol', '11,2 L', '3,011 × 10²³ molekul'],
      ['Natrium Klorida (NaCl)', '58,5', '117 g', '2,0 mol', '- (Bukan Gas)', '1,204 × 10²⁴ ion pair'],
      ['Gas Metana (CH₄)', '16', '32 g', '2,0 mol', '44,8 L', '1,204 × 10²⁴ molekul']
    ],
    summaryOrInsight: '1 mol gas apapun pada kondisi STP (0°C, 1 atm) selalu menempati volume sebesar 22,4 Liter.'
  };

  return {
    domain: 'CHEMISTRY',
    domainNameId: 'Kimia & Perhitungan Stoikiometri',
    isQuantitative: true,
    requiresFormulas: true,
    requiresStepByStep: true,
    requiresTables: true,
    requiresCode: false,
    confidenceScore: 0.95,
    detectedCharacteristics: [
      'Memerlukan notasi rumus kimia dan persamaan reaksi seimbang',
      'Perhitungan jembatan mol (massa, partikel, volume gas STP)',
      'Tabel stoikiometri data eksperimen'
    ],
    coreFormulas,
    workedExample,
    specializedTable
  };
}

function buildEconomicsAccountingAnalysis(context: string): SubjectAwareAnalysis {
  const isAccounting = context.includes('jurnal') || context.includes('buku besar') || context.includes('neraca') || context.includes('debit');

  const coreFormulas: FormulaItem[] = [
    {
      name: isAccounting ? 'Persamaan Dasar Akuntansi' : 'Perhitungan Laba / Rugi Bersih',
      latex: isAccounting ? '\\text{Aset} = \\text{Liabilitas} + \\text{Ekuitas}' : '\\text{Laba} = \\text{Pendapatan Total} - \\text{Total Beban}',
      textFallback: isAccounting ? 'Aset = Liabilitas + Ekuitas' : 'Laba = Pendapatan - Beban',
      variables: [
        { symbol: 'Aset', meaning: 'Kekayaan perusahaan (Kas, Piutang, Perlengkapan)' },
        { symbol: 'Liabilitas', meaning: 'Kewajiban / Utang usaha' },
        { symbol: 'Ekuitas', meaning: 'Modal pemilik usaha' }
      ]
    },
    {
      name: 'Persentase Keuntungan terhadap Modal / Harga Beli',
      latex: '\\%\\text{Untung} = \\frac{\\text{Harga Jual} - \\text{Harga Beli}}{\\text{Harga Beli}} \\times 100\\%',
      textFallback: '%Untung = ((Harga Jual - Harga Beli) / Harga Beli) × 100%',
      variables: [
        { symbol: '%Untung', meaning: 'Margin keuntungan persentase', unit: '%' }
      ]
    }
  ];

  const workedExample: WorkedExample = {
    problemTitle: isAccounting ? 'Pencatatan Transaksi ke Persamaan Akuntansi' : 'Menghitung Persentase Keuntungan Penjualan Produk',
    problemStatement: isAccounting
      ? 'Pada tanggal 5 Januari, Pemilik menyetorkan uang tunai Rp50.000.000 sebagai modal awal dan meminjam kredit bank Rp20.000.000. Catatlah transaksi ini ke dalam persamaan dasar akuntansi!'
      : 'Seorang wirausahawan membeli 100 unit tas dengan harga pokok Rp80.000 per unit. Seluruh tas berhasil terjual dengan harga Rp110.000 per unit. Hitunglah total laba kotor dan persentase keuntungan yang diperoleh!',
    given: isAccounting
      ? ['Setoran modal tunai = Rp50.000.000', 'Utang bank = Rp20.000.000']
      : ['Modal/Harga Beli Total = 100 × Rp80.000 = Rp8.000.000', 'Pendapatan/Harga Jual Total = 100 × Rp110.000 = Rp11.000.000'],
    steps: isAccounting
      ? [
          {
            stepNumber: 1,
            description: 'Identifikasi akun Kas yang bertambah dari setoran pemilik dan pinjaman bank.',
            mathExpression: '\\Delta\\text{Kas} = 50.000.000 + 20.000.000 = 70.000.000\\text{ (Aset)}'
          },
          {
            stepNumber: 2,
            description: 'Identifikasi akun Utang Bank (Liabilitas) dan Modal Pemilik (Ekuitas).',
            mathExpression: '\\text{Utang Bank} = 20.000.000, \\quad \\text{Modal Pemilik} = 50.000.000'
          },
          {
            stepNumber: 3,
            description: 'Buktikan keseimbangan ruas kiri (Aset) dan ruas kanan (Liabilitas + Ekuitas).',
            mathExpression: '70.000.000\\text{ (Aset)} = 20.000.000\\text{ (Liabilitas)} + 50.000.000\\text{ (Ekuitas)} \\quad (\\text{Seimbang})'
          }
        ]
      : [
          {
            stepNumber: 1,
            description: 'Hitung total keuntungan nominal (Laba = Harga Jual Total - Harga Beli Total).',
            mathExpression: '\\text{Laba} = 11.000.000 - 8.000.000 = \\text{Rp}3.000.000'
          },
          {
            stepNumber: 2,
            description: 'Hitung persentase keuntungan terhadap total harga beli awal.',
            mathExpression: '\\%\\text{Laba} = \\frac{3.000.000}{8.000.000} \\times 100\\% = 0,375 \\times 100\\% = 37,5\\%'
          }
        ],
    finalAnswer: isAccounting
      ? 'Total aset kas bertambah Rp70.000.000, diimbangi liabilitas utang Rp20.000.000 dan ekuitas modal Rp50.000.000.'
      : 'Total keuntungan nominal adalah Rp3.000.000 dengan persentase keuntungan sebesar 37,5%.',
    verificationOrNote: 'Validasi: Neraca saldo dan perhitungan margin keuntungan terbukti akurat matematis.'
  };

  const specializedTable: SpecializedTable = isAccounting
    ? {
        title: 'Tabel Format Jurnal Umum 5 Kolom Standar Akuntansi',
        headers: ['Tanggal', 'Keterangan Akun & Ref', 'Ref', 'Debit (Rp)', 'Kredit (Rp)'],
        rows: [
          ['01 Jan 2026', 'Kas\n   Modal Pemilik (Setoran Awal)', '101\n301', '50.000.000\n-', '-\n50.000.000'],
          ['03 Jan 2026', 'Peralatan Usaha\n   Kas (Pembelian Tunai)', '121\n101', '15.000.000\n-', '-\n15.000.000'],
          ['07 Jan 2026', 'Kas\n   Pendapatan Jasa', '101\n401', '8.500.000\n-', '-\n8.500.000'],
          ['Total Seimbang', 'Jumlah Total Debit dan Kredit', '-', '73.500.000', '73.500.000']
        ],
        summaryOrInsight: 'Prinsip Akuntansi Berpasangan (Double-Entry): Total kolom Debit harus selalu sama persis dengan total kolom Kredit (Balance).'
      }
    : {
        title: 'Tabel Rekapitulasi Harga Beli, Harga Jual, dan Margin Laba Rugi',
        headers: ['Nama Barang', 'Harga Beli Satuan', 'Harga Jual Satuan', 'Nominal Laba (Rp)', 'Persentase Untung (%)'],
        rows: [
          ['Paket ATK Sekolah', 'Rp20.000', 'Rp25.000', 'Rp5.000', '25,0%'],
          ['Tas Ransel Kanvas', 'Rp80.000', 'Rp110.000', 'Rp30.000', '37,5%'],
          ['Botol Minum Ramah Lingkungan', 'Rp35.000', 'Rp45.500', 'Rp10.500', '30,0%'],
          ['Topi Seragam Sekolah', 'Rp15.000', 'Rp18.000', 'Rp3.000', '20,0%']
        ],
        summaryOrInsight: 'Seluruh produk menghasilkan laba positif dengan margin rata-rata di atas 20%.'
      };

  return {
    domain: 'ECONOMICS_ACCOUNTING',
    domainNameId: 'Ekonomi, Bisnis & Akuntansi Keuangan',
    isQuantitative: true,
    requiresFormulas: true,
    requiresStepByStep: true,
    requiresTables: true,
    requiresCode: false,
    confidenceScore: 0.95,
    detectedCharacteristics: [
      'Perhitungan persentase margin keuntungan dan biaya',
      'Format tabel berpasangan akuntansi (Debit & Kredit)',
      'Prinsip neraca seimbang (Aset = Liabilitas + Ekuitas)'
    ],
    coreFormulas,
    workedExample,
    specializedTable
  };
}

function buildInformaticsAnalysis(context: string): SubjectAwareAnalysis {
  const isBinary = context.includes('biner') || context.includes('binary') || context.includes('oktal') || context.includes('heksa');

  const coreFormulas: FormulaItem[] = [
    {
      name: 'Konversi Bilangan Biner ke Desimal (Bobot Posisi Basis 2)',
      latex: 'N_{10} = \\sum_{i=0}^{n} (b_i \\times 2^i) = (b_n 2^n + \\dots + b_1 2^1 + b_0 2^0)',
      textFallback: 'N10 = (bn × 2^n) + ... + (b1 × 2^1) + (b0 × 2^0)',
      variables: [
        { symbol: 'b_i', meaning: 'Digit biner (bit: 0 atau 1)' },
        { symbol: '2^i', meaning: 'Bobot posisi perpangkatan basis dua (1, 2, 4, 8, 16, 32, ...)' }
      ]
    },
    {
      name: 'Operasi Logika Boolean Dasar (Konjungsi AND & Disjungsi OR)',
      latex: 'A \\land B = 1 \\iff A=1 \\text{ dan } B=1; \\quad A \\lor B = 0 \\iff A=0 \\text{ dan } B=0',
      textFallback: 'A AND B = 1 jika keduanya 1; A OR B = 0 jika keduanya 0',
      variables: [
        { symbol: '\\land', meaning: 'Operator logika AND' },
        { symbol: '\\lor', meaning: 'Operator logika OR' }
      ]
    }
  ];

  const workedExample: WorkedExample = {
    problemTitle: 'Konversi Bilangan Desimal 25 ke Bilangan Biner (Basis 2)',
    problemStatement:
      'Ubahlah bilangan desimal 25₁₀ menjadi representasi bilangan biner menggunakan metode pembagian bertingkat dengan sisa bagi (modulo 2)!',
    given: ['Bilangan desimal = 25', 'Basis target biner = 2'],
    steps: [
      {
        stepNumber: 1,
        description: 'Bagi 25 dengan 2, catat hasil bagi bulat dan sisa bagi.',
        mathExpression: '25 \\div 2 = 12, \\quad \\text{sisa } 1\\quad (\\text{bit LSB})'
      },
      {
        stepNumber: 2,
        description: 'Bagi hasil bagi sebelumnya (12) dengan 2.',
        mathExpression: '12 \\div 2 = 6, \\quad \\text{sisa } 0'
      },
      {
        stepNumber: 3,
        description: 'Bagi hasil bagi (6) dengan 2.',
        mathExpression: '6 \\div 2 = 3, \\quad \\text{sisa } 0'
      },
      {
        stepNumber: 4,
        description: 'Bagi hasil bagi (3) dengan 2.',
        mathExpression: '3 \\div 2 = 1, \\quad \\text{sisa } 1'
      },
      {
        stepNumber: 5,
        description: 'Bagi hasil bagi terakhir (1) dengan 2.',
        mathExpression: '1 \\div 2 = 0, \\quad \\text{sisa } 1\\quad (\\text{bit MSB})'
      },
      {
        stepNumber: 6,
        description: 'Tuliskan seluruh sisa bagi dari langkah terakhir (MSB) ke langkah pertama (LSB).',
        mathExpression: '25_{10} = 11001_2'
      }
    ],
    finalAnswer: 'Bilangan desimal 25 setara dengan 11001 dalam bilangan biner (11001₂).',
    verificationOrNote: 'Validasi pembuktian bobot: (1×16) + (1×8) + (0×4) + (0×2) + (1×1) = 16 + 8 + 1 = 25.'
  };

  const specializedTable: SpecializedTable = {
    title: 'Tabel Konversi Bilangan dan Tabel Kebenaran Gerbang Logika',
    headers: ['Desimal', 'Biner (8-bit)', 'Heksadesimal', 'Input A, B', 'A AND B', 'A OR B', 'NOT A'],
    rows: [
      ['0', '0000 0000', '0x00', '0, 0', '0', '0', '1'],
      ['1', '0000 0001', '0x01', '0, 1', '0', '1', '1'],
      ['2', '0000 0010', '0x02', '1, 0', '0', '1', '0'],
      ['3', '0000 0011', '0x03', '1, 1', '1', '1', '0'],
      ['25', '0001 1001', '0x19', '-', '-', '-', '-'],
      ['255', '1111 1111', '0xFF', '-', '-', '-', '-']
    ],
    summaryOrInsight: '1 byte tersusun atas 8 bit biner dengan rentang nilai representasi dari 0 hingga 255.'
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
        
    # Membalik urutan dari sisa terakhir (MSB) ke pertama (LSB)
    return "".join(reversed(sisa_list))

# Contoh Pengujian
nilai = 25
hasil_biner = desimal_ke_biner(nilai)
print(f"Desimal {nilai} = Biner {hasil_biner}") # Output: 11001`,
    explanation: 'Algoritma menggunakan loop pembagian bertingkat dengan operasi modulus (%) dan integer division (//).'
  };

  return {
    domain: 'INFORMATICS',
    domainNameId: 'Informatika, Logika Digital & Pemrograman',
    isQuantitative: true,
    requiresFormulas: true,
    requiresStepByStep: true,
    requiresTables: true,
    requiresCode: true,
    confidenceScore: 0.97,
    detectedCharacteristics: [
      'Representasi bilangan biner, oktal, dan heksadesimal',
      'Tabel kebenaran logika Boolean (AND, OR, NOT, XOR)',
      'Algoritma pemrograman dan blok kode terstruktur'
    ],
    coreFormulas,
    workedExample,
    specializedTable,
    codeOrPseudocode
  };
}

function buildHumanitiesArtsAnalysis(context: string, subject: string, topic: string): SubjectAwareAnalysis {
  const isDkv = context.includes('dkv') || context.includes('tipografi') || context.includes('desain');

  return {
    domain: 'HUMANITIES_ARTS_LANGUAGE',
    domainNameId: 'Desain Komunikasi Visual, Seni & Humaniora',
    isQuantitative: false,
    requiresFormulas: false,
    requiresStepByStep: false,
    requiresTables: false,
    requiresCode: false,
    confidenceScore: 0.99,
    detectedCharacteristics: [
      'Fokus pada penalaran konseptual, estetika, dan komunikasi visual',
      'TIDAK memaksakan rumus atau angka numerik artifisial',
      'Menyajikan anatomi visual, hierarki tipografi, dan prinsip komposisi'
    ],
    nonNumericGuidance: {
      artisticPrinciples: [
        'Anatomi Tipografi: Baseline, Mean line, X-height, Ascender, Descender, dan Cap Height',
        'Hierarki Visual: Skala ukuran headline, sub-headline, body text, dan caption',
        'Legibilitas & Keterbacaan: Jarak antarkata (tracking), spasi antarkarakter (kerning), dan jarak antarbaris (leading)',
        'Harmoni Warna & Kontras: Rasio kontras teks terhadap latar belakang minimal 4.5:1 untuk aksesibilitas'
      ],
      conceptualFramework: `Eksplorasi materi "${topic}" berorientasi pada penciptaan pesan visual yang komunikatif, bernilai estetika tinggi, serta memicu empati dan apresiasi peserta didik tanpa membutuhkan kalkulasi angka numerik.`,
      visualHierarchyGuidelines: [
        'Focal Point: Menentukan elemen visual utama yang pertama kali dilihat audiens',
        'Grid System: Menyusun tata letak modular untuk keteraturan informasi',
        'Negative Space (Ruang Kosong): Memberikan ruang bernapas agar komposisi tidak padat',
        'Konsistensi Gaya: Penyelarasan gaya ilustrasi, palet warna, dan bobot tipografi'
      ]
    }
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
      'Perhitungan sederhana dengan satuan yang konsisten'
    ]
  };
}
