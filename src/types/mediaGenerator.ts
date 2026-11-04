export type MediaType = 'poster' | 'infografis' | 'lkpd' | 'sampul' | 'presentasi' | 'ilustrasi';

export type PageSize = 'A4' | 'A3' | 'A5' | 'Letter' | 'Kustom';
export type PageOrientation = 'potret' | 'lanskap';

export type ColorTheme =
  | 'Biru profesional'
  | 'Biru dan cyan futuristik'
  | 'Ungu kreatif'
  | 'Hijau edukatif'
  | 'Kuning dan oranye ceria'
  | 'Pastel lembut'
  | 'Monokrom'
  | 'Warna sekolah'
  | 'Kustom';

export type DesignStyle =
  | 'Minimalis profesional'
  | 'Futuristik'
  | 'Modern edukatif'
  | 'Infografis editorial'
  | 'Ilustrasi kartun'
  | 'Flat design'
  | 'Hand-drawn'
  | 'Geometris'
  | 'Majalah pendidikan'
  | 'Fun dan ceria'
  | 'Formal untuk sekolah';

export type IllustrationStyle =
  | 'Ikon'
  | 'Ilustrasi vektor'
  | 'Ilustrasi kartun'
  | 'Ilustrasi semi-realistis'
  | 'Diagram'
  | 'Tanpa ilustrasi';

export type InfographicType =
  | 'Infografis proses'
  | 'Infografis perbandingan'
  | 'Infografis daftar'
  | 'Infografis statistik'
  | 'Infografis garis waktu'
  | 'Infografis sebab-akibat';

export type LkpdType =
  | 'Observasi'
  | 'Eksperimen atau praktik'
  | 'Diskusi kelompok'
  | 'Pemecahan masalah'
  | 'Proyek'
  | 'Analisis kasus'
  | 'Lembar kerja individu'
  | 'Lembar kerja tim';

export interface MediaGeneratorConfig {
  mediaType: MediaType;
  title: string;
  subject: string;
  gradeLevel: string;
  topic: string;
  learningGoal: string;
  contentPoints: string;
  language: string;
  pageSize: PageSize;
  orientation: PageOrientation;
  colorTheme: ColorTheme;
  customColors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
  designStyle: DesignStyle;
  illustrationStyle: IllustrationStyle;
  typography: string;
  authorOrSchool: string;

  // Poster specific
  posterSubtitle?: string;
  posterMainMessage?: string;
  posterCallToAction?: string;
  posterAdditionalInfo?: string;

  // Infographic specific
  infographicType?: InfographicType;
  infographicProcessSteps?: string;
  infographicComparisonLeft?: string;
  infographicComparisonRight?: string;
  infographicConclusion?: string;
  infographicSourceReference?: string;

  // LKPD specific
  lkpdType?: LkpdType;
  lkpdInstructions?: string;
  lkpdStudentActivities?: string;
  lkpdQuestions?: string;
  lkpdAnswerSpaceFormat?: 'Garis Berbaris' | 'Kotak Kosong' | 'Tabel Isian';
  lkpdReflectionPrompt?: string;
  lkpdAssessmentCriteria?: string;
}
