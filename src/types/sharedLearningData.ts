import { ModulAjarFormInput, ModulAjarDocument } from './index';

/**
 * Structured Learning Data (Objek Data Pembelajaran Terstruktur)
 * Digunakan bersama oleh Prompt Lab, Game Studio, dan Generator Media.
 * Memisahkan secara tegas input asli guru dan hasil generasi modul ajar
 * agar tidak terjadi perubahan atau tebakan data secara tidak sengaja.
 */
export interface StructuredLearningData {
  id: string;
  createdAt: string;
  sourceModulTitle: string; // e.g. "Matematika — Persamaan Linear Satu Variabel (SPLSV)"

  // 1. DATA INPUT ASLI GURU (100% otentik dari formulir Prompt Lab)
  inputAsli: {
    schoolName: string;
    principalName: string;
    teacherName: string;
    subject: string;
    materi: string;
    topic: string;
    learningOutcomeCP: string;
    element: string;
    gradeLevel: string;
    semester: string;
    timeAllocation: string;
    pedagogicalPractice: string;
    customPedagogicalPractice?: string;
    studentCharacteristics?: string;
    priorKnowledge?: string;
    facilitiesAndTools?: string;
    specialLearningNeeds?: string;
    learningApproach?: string;
    teacherNotes?: string;
  };

  // 2. DATA TERSTRUKTUR HASIL MODUL AJAR (Disusun dari dokumen modul ajar)
  hasilModul: {
    tujuanPembelajaranRingkasan: string;
    tujuanPembelajaranDetail: {
      memahami: string[];
      mengaplikasi: string[];
      merefleksi: string[];
    };
    konsepMateri: string;
    aktivitasPembelajaranRingkas: string[];
    mediaDanSumberBelajar: string[];
    indikatorAsesmen: string;
    kriteriaKeberhasilan: string;
    profilPelajar: string[];
    subjectAwareDomain?: string;
    coreFormulas?: Array<{ name: string; formula: string; textFallback: string }>;
  };
}

/**
 * Helper to build StructuredLearningData from form inputs and generated document.
 * Strictly preserves the teacher's original input and extracts structured outputs.
 */
export function buildStructuredLearningData(
  input: ModulAjarFormInput,
  doc: ModulAjarDocument
): StructuredLearningData {
  // Combine learning objectives into clean summary
  const tpMemahami = doc.identifikasiDanDesain?.tujuanPembelajaran?.memahami || [];
  const tpMengaplikasi = doc.identifikasiDanDesain?.tujuanPembelajaran?.mengaplikasi || [];
  const tpMerefleksi = doc.identifikasiDanDesain?.tujuanPembelajaran?.merefleksi || [];

  const allTp = [...tpMemahami, ...tpMengaplikasi, ...tpMerefleksi].filter(Boolean);
  const tujuanPembelajaranRingkasan =
    allTp.length > 0
      ? allTp.join(' ')
      : input.learningOutcomeCP || `${input.subject} - ${input.topic}`;

  // Extract core activities from learning steps
  const langkahKegiatan: string[] = [];
  if (doc.langkahPembelajaran) {
    if (Array.isArray(doc.langkahPembelajaran.kegiatanInti)) {
      doc.langkahPembelajaran.kegiatanInti.forEach((k) => {
        if (k.activity) langkahKegiatan.push(k.activity);
      });
    }
    if (langkahKegiatan.length === 0 && Array.isArray(doc.langkahPembelajaran.kegiatanAwal)) {
      doc.langkahPembelajaran.kegiatanAwal.forEach((k) => {
        if (k.activity) langkahKegiatan.push(k.activity);
      });
    }
  }

  // Extract media and learning resources
  const mediaDanSumber: string[] = [];
  if (doc.alatDanSumberBelajar) {
    if (Array.isArray(doc.alatDanSumberBelajar.mediaPembelajaran)) {
      mediaDanSumber.push(...doc.alatDanSumberBelajar.mediaPembelajaran);
    }
    if (Array.isArray(doc.alatDanSumberBelajar.alatDanBahan)) {
      mediaDanSumber.push(...doc.alatDanSumberBelajar.alatDanBahan);
    }
  }

  // Extract assessment indicators
  const indikatorAsesmen =
    doc.asesmen?.asesmenFormatif?.indikator ||
    doc.asesmen?.asesmenAwal?.tujuan ||
    'Penguasaan pemahaman konsep dan keterampilan penerapan dalam pemecahan masalah.';

  const kriteriaKeberhasilan =
    doc.asesmen?.asesmenFormatif?.kriteriaKeberhasilan ||
    'Peserta didik mampu menyelesaikan tugas dengan tepat dan bernalar kritis.';

  // Extract student profile dimensions
  const profilPelajar: string[] = [];
  if (Array.isArray(doc.identifikasiDanDesain?.dimensiProfilLulusan)) {
    doc.identifikasiDanDesain.dimensiProfilLulusan.forEach((dp) => {
      if (dp.dimensi) profilPelajar.push(dp.dimensi);
    });
  }

  // Extract concept context
  const konsepMateri =
    doc.identifikasiDanDesain?.identifikasiPesertaDidik?.karakteristikMateri ||
    doc.identifikasiDanDesain?.identifikasiMataPelajaran?.relevansiKehidupanNyata ||
    `Konsep inti ${input.materi} pada topik ${input.topic}`;

  return {
    id: `modul-${Date.now()}`,
    createdAt: new Date().toISOString(),
    sourceModulTitle: `${input.subject} — ${input.topic}`,
    inputAsli: {
      schoolName: input.schoolName || '',
      principalName: input.principalName || '',
      teacherName: input.teacherName || '',
      subject: input.subject || '',
      materi: input.materi || '',
      topic: input.topic || '',
      learningOutcomeCP: input.learningOutcomeCP || '',
      element: input.element || '',
      gradeLevel: input.gradeLevel || '',
      semester: input.semester || '',
      timeAllocation: input.timeAllocation || '',
      pedagogicalPractice: input.pedagogicalPractice || '',
      customPedagogicalPractice: input.customPedagogicalPractice || '',
      studentCharacteristics: input.studentCharacteristics || '',
      priorKnowledge: input.priorKnowledge || '',
      facilitiesAndTools: input.facilitiesAndTools || '',
      specialLearningNeeds: input.specialLearningNeeds || '',
      learningApproach: input.learningApproach || '',
      teacherNotes: input.teacherNotes || ''
    },
    hasilModul: {
      tujuanPembelajaranRingkasan,
      tujuanPembelajaranDetail: {
        memahami: tpMemahami,
        mengaplikasi: tpMengaplikasi,
        merefleksi: tpMerefleksi
      },
      konsepMateri,
      aktivitasPembelajaranRingkas: langkahKegiatan.slice(0, 5),
      mediaDanSumberBelajar: mediaDanSumber.slice(0, 5),
      indikatorAsesmen,
      kriteriaKeberhasilan,
      profilPelajar,
      subjectAwareDomain: doc.subjectAwareAnalysis?.domainNameId,
      coreFormulas: doc.subjectAwareAnalysis?.coreFormulas
    }
  };
}
