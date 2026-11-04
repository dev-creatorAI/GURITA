import { ModulAjarDocument } from '../types';
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  AlignmentType
} from 'docx';

// Helper to sanitize filename
export function getSafeFilename(doc: ModulAjarDocument, extension: 'docx' | 'pdf'): string {
  const mapel = doc.informasiUmum.mataPelajaran.replace(/[^a-zA-Z0-9]/g, '_');
  const topik = doc.informasiUmum.topikPembelajaran.replace(/[^a-zA-Z0-9]/g, '_');
  const kelas = doc.informasiUmum.faseAtauKelas.replace(/[^a-zA-Z0-9]/g, '_');
  return `Modul_Ajar_${mapel}_${topik}_${kelas}.${extension}`;
}

// ==========================================
// 1. EXPORT TO REAL MICROSOFT WORD (.DOCX)
// ==========================================
export async function exportModulToWord(doc: ModulAjarDocument): Promise<void> {
  const sectionsChildren: any[] = [];

  // Helper for title & paragraphs
  const makeHeading = (text: string, level: any = HeadingLevel.HEADING_1) => {
    return new Paragraph({
      text,
      heading: level,
      spacing: { before: 240, after: 120 }
    });
  };

  const makePara = (text: string, isBold = false) => {
    return new Paragraph({
      children: [new TextRun({ text, bold: isBold, font: 'Calibri', size: 22 })],
      spacing: { after: 100 }
    });
  };

  const makeBullet = (text: string) => {
    return new Paragraph({
      bullet: { level: 0 },
      children: [new TextRun({ text, font: 'Calibri', size: 22 })],
      spacing: { after: 60 }
    });
  };

  // Header Title
  sectionsChildren.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: 'MODUL AJAR KURIKULUM MERDEKA',
          bold: true,
          size: 32,
          font: 'Calibri'
        })
      ],
      spacing: { after: 100 }
    })
  );

  sectionsChildren.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: `${doc.informasiUmum.mataPelajaran.toUpperCase()} — ${doc.informasiUmum.namaSekolah.toUpperCase()}`,
          bold: true,
          size: 24,
          font: 'Calibri',
          color: '2979FF'
        })
      ],
      spacing: { after: 300 }
    })
  );

  // BAGIAN I. INFORMASI UMUM
  sectionsChildren.push(makeHeading('INFORMASI UMUM', HeadingLevel.HEADING_1));
  const infoData = [
    ['Nama Sekolah', doc.informasiUmum.namaSekolah],
    ['Mata Pelajaran', doc.informasiUmum.mataPelajaran],
    ['Materi', doc.informasiUmum.materi],
    ['Topik Pembelajaran', doc.informasiUmum.topikPembelajaran],
    ['Fase / Kelas', doc.informasiUmum.faseAtauKelas],
    ['Semester', doc.informasiUmum.semester],
    ['Alokasi Waktu', doc.informasiUmum.alokasiWaktu],
    ['Nama Penyusun', doc.informasiUmum.namaPenyusun]
  ];

  const infoTableRows = infoData.map(
    ([label, val]) =>
      new TableRow({
        children: [
          new TableCell({
            width: { size: 30, type: WidthType.PERCENTAGE },
            children: [makePara(label, true)]
          }),
          new TableCell({
            width: { size: 70, type: WidthType.PERCENTAGE },
            children: [makePara(val)]
          })
        ]
      })
  );

  sectionsChildren.push(
    new Table({
      rows: infoTableRows,
      width: { size: 100, type: WidthType.PERCENTAGE }
    })
  );

  // BAGIAN II. IDENTIFIKASI DAN DESAIN PEMBELAJARAN
  sectionsChildren.push(makeHeading('IDENTIFIKASI DAN DESAIN PEMBELAJARAN', HeadingLevel.HEADING_1));

  sectionsChildren.push(makeHeading('1. Identifikasi Peserta Didik', HeadingLevel.HEADING_2));
  sectionsChildren.push(makePara(`Pengetahuan Awal: ${doc.identifikasiDanDesain.identifikasiPesertaDidik.pengetahuanAwal}`));
  sectionsChildren.push(makePara(`Minat & Motivasi: ${doc.identifikasiDanDesain.identifikasiPesertaDidik.minatDanMotivasi}`));
  sectionsChildren.push(makePara(`Kesiapan Belajar: ${doc.identifikasiDanDesain.identifikasiPesertaDidik.kesiapanBelajar}`));
  sectionsChildren.push(makePara(`Kebutuhan Belajar: ${doc.identifikasiDanDesain.identifikasiPesertaDidik.kebutuhanBelajar}`));
  sectionsChildren.push(makePara(`Potensi Miskonsepsi: ${doc.identifikasiDanDesain.identifikasiPesertaDidik.potensiMiskonsepsi}`));
  sectionsChildren.push(makePara(`Dukungan & Diferensiasi: ${doc.identifikasiDanDesain.identifikasiPesertaDidik.dukunganDanDiferensiasi}`));
  sectionsChildren.push(makePara(doc.identifikasiDanDesain.identifikasiPesertaDidik.catatanAsumsi, true));

  sectionsChildren.push(makeHeading('2. Identifikasi Mata Pelajaran', HeadingLevel.HEADING_2));
  sectionsChildren.push(makePara(`Elemen: ${doc.identifikasiDanDesain.identifikasiMataPelajaran.elemen}`));
  sectionsChildren.push(makePara(`Relevansi Kehidupan Nyata: ${doc.identifikasiDanDesain.identifikasiMataPelajaran.relevansiKehidupanNyata}`));

  sectionsChildren.push(makeHeading('3. Dimensi Profil Lulusan', HeadingLevel.HEADING_2));
  doc.identifikasiDanDesain.dimensiProfilLulusan.forEach((dp) => {
    sectionsChildren.push(makeBullet(`${dp.dimensi}: ${dp.alasanRelevansi} (Perilaku teramati: ${dp.perilakuTeramati})`));
  });

  sectionsChildren.push(makeHeading('4. Capaian Pembelajaran (CP)', HeadingLevel.HEADING_2));
  sectionsChildren.push(makePara(doc.identifikasiDanDesain.capaianPembelajaran));

  sectionsChildren.push(makeHeading('5. Lintas Disiplin Ilmu', HeadingLevel.HEADING_2));
  sectionsChildren.push(makePara(doc.identifikasiDanDesain.lintasDisiplinIlmu));

  sectionsChildren.push(makeHeading('6. Tujuan Pembelajaran', HeadingLevel.HEADING_2));
  sectionsChildren.push(makePara('A. Pengalaman Memahami:', true));
  doc.identifikasiDanDesain.tujuanPembelajaran.memahami.forEach((tp) => sectionsChildren.push(makeBullet(tp)));
  sectionsChildren.push(makePara('B. Pengalaman Mengaplikasi:', true));
  doc.identifikasiDanDesain.tujuanPembelajaran.mengaplikasi.forEach((tp) => sectionsChildren.push(makeBullet(tp)));
  sectionsChildren.push(makePara('C. Pengalaman Merefleksi:', true));
  doc.identifikasiDanDesain.tujuanPembelajaran.merefleksi.forEach((tp) => sectionsChildren.push(makeBullet(tp)));

  sectionsChildren.push(makeHeading('7. Praktik Pedagogis', HeadingLevel.HEADING_2));
  sectionsChildren.push(makePara(`Pendekatan: ${doc.identifikasiDanDesain.praktikPedagogis.namaPendekatan}`, true));
  sectionsChildren.push(makePara(`Alasan Pemilihan: ${doc.identifikasiDanDesain.praktikPedagogis.alasanPemilihan}`));
  sectionsChildren.push(makePara(`Sintaks / Tahapan Pembelajaran:`, true));
  doc.identifikasiDanDesain.praktikPedagogis.sintaksTahapan.forEach((stx) => {
    sectionsChildren.push(makeBullet(`${stx.tahapan}: ${stx.deskripsi}`));
  });

  sectionsChildren.push(makeHeading('8. Mitra Pembelajaran', HeadingLevel.HEADING_2));
  sectionsChildren.push(makePara(doc.identifikasiDanDesain.mitraPembelajaran));

  sectionsChildren.push(makeHeading('9. Lingkungan Pembelajaran', HeadingLevel.HEADING_2));
  sectionsChildren.push(makePara(`Fisik: ${doc.identifikasiDanDesain.lingkunganPembelajaran.fisik}`));
  sectionsChildren.push(makePara(`Sosial: ${doc.identifikasiDanDesain.lingkunganPembelajaran.sosial}`));
  sectionsChildren.push(makePara(`Digital: ${doc.identifikasiDanDesain.lingkunganPembelajaran.digital}`));

  sectionsChildren.push(makeHeading('10. Pemanfaatan Digital', HeadingLevel.HEADING_2));
  sectionsChildren.push(makePara(doc.identifikasiDanDesain.pemanfaatanDigital));

  // BAGIAN III. LANGKAH-LANGKAH PEMBELAJARAN (TABEL 5 KOLOM)
  sectionsChildren.push(makeHeading('LANGKAH-LANGKAH PEMBELAJARAN', HeadingLevel.HEADING_1));
  sectionsChildren.push(makePara(doc.langkahPembelajaran.asumsiWaktuText, true));

  const tableHeaderRow = new TableRow({
    tableHeader: true,
    children: [
      new TableCell({ width: { size: 35, type: WidthType.PERCENTAGE }, children: [makePara('Aktivitas Pembelajaran', true)] }),
      new TableCell({ width: { size: 15, type: WidthType.PERCENTAGE }, children: [makePara('Alokasi Waktu', true)] }),
      new TableCell({ width: { size: 15, type: WidthType.PERCENTAGE }, children: [makePara('Prinsip Pembelajaran', true)] }),
      new TableCell({ width: { size: 15, type: WidthType.PERCENTAGE }, children: [makePara('Pengalaman Belajar', true)] }),
      new TableCell({ width: { size: 20, type: WidthType.PERCENTAGE }, children: [makePara('Sumber & Media', true)] })
    ]
  });

  const allStepRows = [
    ...doc.langkahPembelajaran.kegiatanAwal,
    ...doc.langkahPembelajaran.kegiatanInti,
    ...doc.langkahPembelajaran.kegiatanPenutup
  ].map(
    (row) =>
      new TableRow({
        children: [
          new TableCell({ children: [makePara(row.activity)] }),
          new TableCell({ children: [makePara(row.timeAllocation)] }),
          new TableCell({ children: [makePara(row.principle)] }),
          new TableCell({ children: [makePara(row.learningExperience)] }),
          new TableCell({ children: [makePara(row.learningResources)] })
        ]
      })
  );

  sectionsChildren.push(
    new Table({
      rows: [tableHeaderRow, ...allStepRows],
      width: { size: 100, type: WidthType.PERCENTAGE }
    })
  );

  // BAGIAN IV. ASESMEN PEMBELAJARAN
  sectionsChildren.push(makeHeading('ASESMEN PEMBELAJARAN', HeadingLevel.HEADING_1));
  sectionsChildren.push(makePara(`1. Asesmen Awal: ${doc.asesmen.asesmenAwal.tujuan}. Teknik: ${doc.asesmen.asesmenAwal.teknik}`));
  sectionsChildren.push(makePara(`2. Asesmen Formatif: ${doc.asesmen.asesmenFormatif.teknik}. Waktu: ${doc.asesmen.asesmenFormatif.waktuPelaksanaan}`));
  sectionsChildren.push(makePara(`3. Asesmen Sumatif: ${doc.asesmen.asesmenSumatif.bentuk}. ${doc.asesmen.asesmenSumatif.deskripsiTugasSoal}`));

  sectionsChildren.push(makeHeading('Rubrik Penilaian Skala 1–4:', HeadingLevel.HEADING_2));
  doc.asesmen.rubrikPenilaian.forEach((r) => {
    sectionsChildren.push(makePara(`Aspek: ${r.aspek} (${r.indikator})`, true));
    sectionsChildren.push(makeBullet(`Skor 1 (Perlu Bimbingan): ${r.skala1}`));
    sectionsChildren.push(makeBullet(`Skor 2 (Cukup): ${r.skala2}`));
    sectionsChildren.push(makeBullet(`Skor 3 (Baik): ${r.skala3}`));
    sectionsChildren.push(makeBullet(`Skor 4 (Sangat Baik): ${r.skala4}`));
  });

  sectionsChildren.push(makePara(`Pengolahan & Tindak Lanjut: ${doc.asesmen.pengolahanDanTindakLanjut.remedial} ${doc.asesmen.pengolahanDanTindakLanjut.pengayaan}`));

  // BAGIAN V. ALAT DAN SUMBER BELAJAR
  sectionsChildren.push(makeHeading('ALAT DAN SUMBER BELAJAR', HeadingLevel.HEADING_1));
  sectionsChildren.push(makePara('Alat & Bahan:', true));
  doc.alatDanSumberBelajar.alatDanBahan.forEach((a) => sectionsChildren.push(makeBullet(a)));
  sectionsChildren.push(makePara('Media Pembelajaran:', true));
  doc.alatDanSumberBelajar.mediaPembelajaran.forEach((m) => sectionsChildren.push(makeBullet(m)));
  sectionsChildren.push(makePara(`Alternatif Sumber Luring: ${doc.alatDanSumberBelajar.alternatifLuring}`));

  // BAGIAN VI. REFLEKSI
  sectionsChildren.push(makeHeading('REFLEKSI GURU & PESERTA DIDIK', HeadingLevel.HEADING_1));
  sectionsChildren.push(makePara('Refleksi Peserta Didik:', true));
  doc.refleksi.refleksiPesertaDidik.forEach((rf) => sectionsChildren.push(makeBullet(rf)));
  sectionsChildren.push(makePara('Refleksi Guru:', true));
  doc.refleksi.refleksiGuru.forEach((rf) => sectionsChildren.push(makeBullet(rf)));

  // BAGIAN VII. PENGESAHAN
  //sectionsChildren.push(makeHeading(HeadingLevel.HEADING_1));
  sectionsChildren.push(makePara(doc.pengesahan.kotaDanTanggal));

  const pengesahanTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.NONE },
      bottom: { style: BorderStyle.NONE },
      left: { style: BorderStyle.NONE },
      right: { style: BorderStyle.NONE },
      insideHorizontal: { style: BorderStyle.NONE },
      insideVertical: { style: BorderStyle.NONE }
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 50, type: WidthType.PERCENTAGE },
            children: [
              makePara('Mengetahui,\nKepala Sekolah'),
              new Paragraph({ spacing: { before: 800 } }),
              makePara(doc.pengesahan.namaKepalaSekolah, true),
              makePara(doc.pengesahan.nipKepalaSekolah ? `NIP. ${doc.pengesahan.nipKepalaSekolah}` : 'NIP. ........................................')
            ]
          }),
          new TableCell({
            width: { size: 50, type: WidthType.PERCENTAGE },
            children: [
              makePara('Penyusun,\nGuru Mata Pelajaran'),
              new Paragraph({ spacing: { before: 800 } }),
              makePara(doc.pengesahan.namaPenyusun, true),
              makePara(doc.pengesahan.nipPenyusun ? `NIP. ${doc.pengesahan.nipPenyusun}` : 'NIP. ........................................')
            ]
          })
        ]
      })
    ]
  });

  sectionsChildren.push(pengesahanTable);

  const wordDoc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 }
          }
        },
        children: sectionsChildren
      }
    ]
  });

  const blob = await Packer.toBlob(wordDoc);
  const safeFilename = getSafeFilename(doc, 'docx');

  const downloadUrl = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = downloadUrl;
  a.download = safeFilename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(downloadUrl);
}

