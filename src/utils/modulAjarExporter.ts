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
  AlignmentType,
  VerticalAlign,
  Header,
  Footer,
  PageNumber
} from 'docx';

/**
 * Constants for A4 Page Setup with precise margins:
 * A4 size: 210mm x 297mm = 11906 dxa x 16838 dxa.
 * Margins:
 * - Kiri: 3.0 cm = 1701 dxa
 * - Kanan: 2.5 cm = 1417 dxa
 * - Atas: 2.5 cm = 1417 dxa
 * - Bawah: 2.5 cm = 1417 dxa
 * Printable Width = 11906 - 1701 - 1417 = 8788 dxa.
 */
const PAGE_WIDTH_DXA = 11906;
const PAGE_HEIGHT_DXA = 16838;
const MARGIN_LEFT_DXA = 1701; // 3.0 cm
const MARGIN_RIGHT_DXA = 1417; // 2.5 cm
const MARGIN_TOP_DXA = 1417; // 2.5 cm
const MARGIN_BOTTOM_DXA = 1417; // 2.5 cm
export const PRINTABLE_WIDTH_DXA = 8788; // Total usable width in dxa

// Standard Colors
const COLOR_PRIMARY_NAVY = '0F2C59'; // Deep Navy for primary titles & headings
const COLOR_ACCENT_BLUE = '1E3A8A'; // Electric Navy for subtitles
const COLOR_TEXT_BLACK = '1E293B'; // Clean dark charcoal text
const COLOR_MUTED_GRAY = '64748B'; // Muted labels and headers/footers
const COLOR_BORDER_GRAY = 'CBD5E1'; // Clean subtle table borders
const COLOR_BG_HEADER = 'F1F5F9'; // Soft elegant table header shading
const COLOR_BG_CALLOUT = 'F8FAFC'; // Soft callout shading

// Thin border definition for tables
const standardTableBorders = {
  top: { style: BorderStyle.SINGLE, size: 1, color: COLOR_BORDER_GRAY },
  bottom: { style: BorderStyle.SINGLE, size: 1, color: COLOR_BORDER_GRAY },
  left: { style: BorderStyle.SINGLE, size: 1, color: COLOR_BORDER_GRAY },
  right: { style: BorderStyle.SINGLE, size: 1, color: COLOR_BORDER_GRAY },
  insideHorizontal: { style: BorderStyle.SINGLE, size: 1, color: COLOR_BORDER_GRAY },
  insideVertical: { style: BorderStyle.SINGLE, size: 1, color: COLOR_BORDER_GRAY }
};

// Borderless definition for signatures
const noBorders = {
  top: { style: BorderStyle.NONE },
  bottom: { style: BorderStyle.NONE },
  left: { style: BorderStyle.NONE },
  right: { style: BorderStyle.NONE },
  insideHorizontal: { style: BorderStyle.NONE },
  insideVertical: { style: BorderStyle.NONE }
};

// Helper: Sanitize safe filename according to specification
export function getSafeFilename(doc: ModulAjarDocument, extension: 'docx' | 'pdf' = 'docx'): string {
  const sanitize = (str: string) =>
    (str || '')
      .replace(/[/\\?%*:|"<>]/g, '')
      .trim()
      .replace(/\s+/g, '_');

  const mapel = sanitize(doc.informasiUmum.mataPelajaran || 'Mata_Pelajaran');
  const kelas = sanitize(doc.informasiUmum.faseAtauKelas || 'Fase');
  const topik = sanitize(doc.informasiUmum.topikPembelajaran || doc.informasiUmum.materi || 'Materi');

  return `Modul_Ajar_${mapel}_${kelas}_${topik}.${extension}`;
}

// Typography Helpers
function createHeading1(text: string): Paragraph {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 280, after: 120, line: 276 },
    children: [
      new TextRun({
        text,
        bold: true,
        font: 'Arial',
        size: 24, // 12 pt
        color: COLOR_PRIMARY_NAVY
      })
    ]
  });
}

function createHeading2(text: string): Paragraph {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 200, after: 80, line: 276 },
    children: [
      new TextRun({
        text,
        bold: true,
        font: 'Arial',
        size: 22, // 11 pt
        color: COLOR_ACCENT_BLUE
      })
    ]
  });
}

type AlignmentValue = (typeof AlignmentType)[keyof typeof AlignmentType];

function createParagraph(
  text: string,
  options?: { bold?: boolean; italic?: boolean; size?: number; color?: string; align?: AlignmentValue; spacingAfter?: number }
): Paragraph {
  return new Paragraph({
    alignment: options?.align || AlignmentType.JUSTIFIED,
    spacing: { before: 0, after: options?.spacingAfter ?? 100, line: 276 },
    children: [
      new TextRun({
        text,
        bold: options?.bold || false,
        italics: options?.italic || false,
        font: 'Arial',
        size: options?.size || 21, // 10.5 pt
        color: options?.color || COLOR_TEXT_BLACK
      })
    ]
  });
}

function createBullet(text: string, options?: { boldPrefix?: string }): Paragraph {
  const children: TextRun[] = [];
  if (options?.boldPrefix) {
    children.push(
      new TextRun({
        text: options.boldPrefix,
        bold: true,
        font: 'Arial',
        size: 21,
        color: COLOR_TEXT_BLACK
      })
    );
  }
  children.push(
    new TextRun({
      text: options?.boldPrefix ? ` ${text}` : text,
      font: 'Arial',
      size: 21,
      color: COLOR_TEXT_BLACK
    })
  );

  return new Paragraph({
    bullet: { level: 0 },
    alignment: AlignmentType.JUSTIFIED,
    spacing: { before: 0, after: 60, line: 276 },
    children
  });
}

// Table Cell Helper
function createCell(
  content: string | Paragraph | Paragraph[],
  options?: {
    widthDxa?: number;
    bold?: boolean;
    isHeader?: boolean;
    align?: AlignmentValue;
    shadingColor?: string;
    colSpan?: number;
    fontSize?: number;
    textColor?: string;
  }
): TableCell {
  let paragraphs: Paragraph[];

  if (Array.isArray(content)) {
    paragraphs = content;
  } else if (content instanceof Paragraph) {
    paragraphs = [content];
  } else {
    paragraphs = [
      new Paragraph({
        alignment: options?.align || (options?.isHeader ? AlignmentType.CENTER : AlignmentType.LEFT),
        spacing: { before: 0, after: 40, line: 240 },
        children: [
          new TextRun({
            text: content,
            bold: options?.bold || options?.isHeader || false,
            font: 'Arial',
            size: options?.fontSize || (options?.isHeader ? 20 : 19), // 10 pt for header, 9.5 pt for cell
            color: options?.textColor || (options?.isHeader ? COLOR_PRIMARY_NAVY : COLOR_TEXT_BLACK)
          })
        ]
      })
    ];
  }

  return new TableCell({
    width: options?.widthDxa ? { size: options.widthDxa, type: WidthType.DXA } : undefined,
    columnSpan: options?.colSpan,
    shading: options?.shadingColor
      ? { fill: options.shadingColor }
      : options?.isHeader
      ? { fill: COLOR_BG_HEADER }
      : undefined,
    verticalAlign: VerticalAlign.TOP,
    margins: { top: 120, bottom: 120, left: 140, right: 140 },
    children: paragraphs
  });
}

/**
 * SECTION 1: PROFESSIONAL COVER PAGE (HALAMAN SAMPUL)
 * Standar administrasi pembelajaran formal, bersih, dan elegan pada halaman tersendiri.
 */
function buildCoverSection(doc: ModulAjarDocument) {
  const children: Paragraph[] = [];

  // Top spacing
  children.push(new Paragraph({ spacing: { before: 800 } }));

  // Main Cover Titles
  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 80 },
      children: [
        new TextRun({
          text: 'PERANGKAT ADMINISTRASI PEMBELAJARAN',
          bold: true,
          font: 'Arial',
          size: 20, // 10 pt
          color: COLOR_MUTED_GRAY
        })
      ]
    })
  );

  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 60 },
      children: [
        new TextRun({
          text: 'MODUL AJAR',
          bold: true,
          font: 'Arial',
          size: 52, // 26 pt
          color: COLOR_PRIMARY_NAVY
        })
      ]
    })
  );

  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 360 },
      children: [
        new TextRun({
          text: 'PEMBELAJARAN MENDALAM (DEEP LEARNING)',
          bold: true,
          font: 'Arial',
          size: 24, // 12 pt
          color: COLOR_ACCENT_BLUE
        })
      ]
    })
  );

  // Decorative Accent Divider Table
  const dividerTable = new Table({
    width: { size: PRINTABLE_WIDTH_DXA, type: WidthType.DXA },
    borders: noBorders,
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: PRINTABLE_WIDTH_DXA, type: WidthType.DXA },
            shading: { fill: COLOR_ACCENT_BLUE },
            margins: { top: 20, bottom: 20, left: 0, right: 0 },
            children: [new Paragraph({ text: '' })]
          })
        ]
      })
    ]
  });
  children.push(new Paragraph({ children: [] }));

  // Topic & Subject Highlight Card
  children.push(new Paragraph({ spacing: { before: 500 } }));

  const topicBoxTable = new Table({
    width: { size: PRINTABLE_WIDTH_DXA, type: WidthType.DXA },
    borders: standardTableBorders,
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: PRINTABLE_WIDTH_DXA, type: WidthType.DXA },
            shading: { fill: COLOR_BG_CALLOUT },
            margins: { top: 240, bottom: 240, left: 300, right: 300 },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 60 },
                children: [
                  new TextRun({
                    text: 'MATA PELAJARAN',
                    bold: true,
                    font: 'Arial',
                    size: 18,
                    color: COLOR_MUTED_GRAY
                  })
                ]
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 180 },
                children: [
                  new TextRun({
                    text: doc.informasiUmum.mataPelajaran.toUpperCase(),
                    bold: true,
                    font: 'Arial',
                    size: 32, // 16 pt
                    color: COLOR_PRIMARY_NAVY
                  })
                ]
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 60 },
                children: [
                  new TextRun({
                    text: 'TOPIK PEMBELAJARAN',
                    bold: true,
                    font: 'Arial',
                    size: 18,
                    color: COLOR_MUTED_GRAY
                  })
                ]
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: `"${doc.informasiUmum.topikPembelajaran}"`,
                    bold: true,
                    font: 'Arial',
                    size: 26, // 13 pt
                    color: COLOR_TEXT_BLACK
                  })
                ]
              })
            ]
          })
        ]
      })
    ]
  });

  // Lower Section: Formal Identity Block
  children.push(new Paragraph({ spacing: { before: 700 } }));

  const coverIdRows = [
    ['Satuan Pendidikan', doc.informasiUmum.namaSekolah],
    ['Penyusun / Guru', doc.informasiUmum.namaPenyusun],
    ['Fase / Kelas', doc.informasiUmum.faseAtauKelas],
    ['Semester / Alokasi Waktu', `${doc.informasiUmum.semester} · ${doc.informasiUmum.alokasiWaktu}`],
    ['Model Pembelajaran', doc.identifikasiDanDesain.praktikPedagogis.namaPendekatan || 'Problem Based Learning (PBL)'],
    ['Tahun Pelajaran', 'Tahun Ajaran Berjalan']
  ].map(
    ([lbl, val]) =>
      new TableRow({
        children: [
          createCell(lbl, { widthDxa: 2800, bold: true, fontSize: 20 }),
          createCell(`:  ${val}`, { widthDxa: PRINTABLE_WIDTH_DXA - 2800, fontSize: 20 })
        ]
      })
  );

  const coverIdTable = new Table({
    width: { size: PRINTABLE_WIDTH_DXA, type: WidthType.DXA },
    borders: standardTableBorders,
    rows: coverIdRows
  });

  return {
    properties: {
      page: {
        size: { width: PAGE_WIDTH_DXA, height: PAGE_HEIGHT_DXA },
        margin: {
          top: MARGIN_TOP_DXA,
          bottom: MARGIN_BOTTOM_DXA,
          left: MARGIN_LEFT_DXA,
          right: MARGIN_RIGHT_DXA
        }
      }
    },
    children: [
      ...children,
      dividerTable as any,
      new Paragraph({ spacing: { before: 200 } }),
      topicBoxTable as any,
      new Paragraph({ spacing: { before: 400 } }),
      coverIdTable as any
    ]
  };
}

/**
 * SECTION 2: MAIN DOCUMENT BODY (ISI LENGKAP MODUL AJAR)
 * Dilengkapi Header Nama Sekolah, Footer Nomor Halaman Otomatis, dan Struktur Rapi.
 */
function buildMainDocumentSection(doc: ModulAjarDocument) {
  const children: any[] = [];

  // Document Title Header on Page 2
  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 100, after: 60 },
      children: [
        new TextRun({
          text: 'RENCANA PELAKSANAAN PEMBELAJARAN MENDALAM',
          bold: true,
          font: 'Arial',
          size: 28, // 14 pt
          color: COLOR_PRIMARY_NAVY
        })
      ]
    })
  );

  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 280 },
      children: [
        new TextRun({
          text: `MATA PELAJARAN ${doc.informasiUmum.mataPelajaran.toUpperCase()} — ${doc.informasiUmum.topikPembelajaran.toUpperCase()}`,
          bold: true,
          font: 'Arial',
          size: 22, // 11 pt
          color: COLOR_ACCENT_BLUE
        })
      ]
    })
  );

  // ==========================================
  // BAGIAN I. INFORMASI UMUM
  // ==========================================
  children.push(createHeading1('INFORMASI UMUM'));

  const col1Width = 2600;
  const col2Width = PRINTABLE_WIDTH_DXA - col1Width; // 6188 dxa

  const infoData = [
    ['Nama Satuan Pendidikan', doc.informasiUmum.namaSekolah],
    ['Nama Penyusun / Guru', doc.informasiUmum.namaPenyusun],
    ['Mata Pelajaran', doc.informasiUmum.mataPelajaran],
    ['Fase / Kelas', doc.informasiUmum.faseAtauKelas],
    ['Semester', doc.informasiUmum.semester],
    ['Alokasi Waktu', doc.informasiUmum.alokasiWaktu],
    ['Materi Pokok', doc.informasiUmum.materi],
    ['Topik Pembelajaran', doc.informasiUmum.topikPembelajaran],
    ['Elemen Capaian', doc.identifikasiDanDesain.identifikasiMataPelajaran.elemen || 'Pemahaman & Keterampilan Proses'],
    ['Target / Sasaran Peserta Didik', doc.informasiUmum.sasaranPesertaDidik || 'Peserta didik reguler dengan keberagaman kesiapan belajar'],
    ['Sarana dan Prasarana', doc.informasiUmum.saranaDanPrasarana || 'Ruang kelas, lembar kerja siswa, proyektor, papan tulis, dan media ajar pendukung.'],
    ['Model Pembelajaran', doc.identifikasiDanDesain.praktikPedagogis.namaPendekatan || 'Problem Based Learning (PBL)']
  ];

  const infoTableRows = infoData.map(
    ([label, val]) =>
      new TableRow({
        cantSplit: true,
        children: [
          createCell(label, { widthDxa: col1Width, bold: true, shadingColor: COLOR_BG_CALLOUT }),
          createCell(val, { widthDxa: col2Width })
        ]
      })
  );

  children.push(
    new Table({
      width: { size: PRINTABLE_WIDTH_DXA, type: WidthType.DXA },
      borders: standardTableBorders,
      rows: infoTableRows
    })
  );

  // ==========================================
  // BAGIAN II. IDENTIFIKASI DAN DESAIN PEMBELAJARAN
  // ==========================================
  children.push(createHeading1('IDENTIFIKASI DAN DESAIN PEMBELAJARAN'));

  // 1. Identifikasi Peserta Didik
  children.push(createHeading2('1. Identifikasi Karakteristik & Kesiapan Peserta Didik'));
  const idPd = doc.identifikasiDanDesain.identifikasiPesertaDidik;
  const pdRows = [
    ['Karakteristik Peserta Didik', idPd.karakteristikPesertaDidik || 'Peserta didik berada pada fase perkembangan kognitif eksploratif dan kontekstual.'],
    ['Pengetahuan Awal (Prasyarat)', idPd.pengetahuanAwal],
    ['Kesiapan Belajar', idPd.kesiapanBelajar],
    ['Minat & Kebutuhan Belajar', idPd.minatDanKebutuhanBelajar || idPd.minatDanMotivasi],
    ['Potensi Miskonsepsi', idPd.potensiMiskonsepsi],
    ['Diferensiasi & Dukungan Belajar', idPd.dukunganDanDiferensiasi]
  ].map(
    ([lbl, val]) =>
      new TableRow({
        cantSplit: true,
        children: [
          createCell(lbl, { widthDxa: 2600, bold: true, shadingColor: COLOR_BG_CALLOUT }),
          createCell(val, { widthDxa: col2Width })
        ]
      })
  );

  children.push(
    new Table({
      width: { size: PRINTABLE_WIDTH_DXA, type: WidthType.DXA },
      borders: standardTableBorders,
      rows: pdRows
    })
  );

  // 2. Dimensi Profil Lulusan (Tabel 3 Kolom)
  children.push(createHeading2('2. Dimensi Profil Lulusan / Profil Pelajar Pancasila'));
  const profilCol1 = 2500;
  const profilCol2 = 3300;
  const profilCol3 = PRINTABLE_WIDTH_DXA - profilCol1 - profilCol2; // 2988 dxa

  const profilHeader = new TableRow({
    tableHeader: true,
    cantSplit: true,
    children: [
      createCell('Dimensi Profil', { widthDxa: profilCol1, isHeader: true }),
      createCell('Alasan Relevansi dengan Materi', { widthDxa: profilCol2, isHeader: true }),
      createCell('Indikator Perilaku Teramati', { widthDxa: profilCol3, isHeader: true })
    ]
  });

  const profilRows = doc.identifikasiDanDesain.dimensiProfilLulusan.map(
    (dp) =>
      new TableRow({
        cantSplit: true,
        children: [
          createCell(dp.dimensi, { widthDxa: profilCol1, bold: true }),
          createCell(dp.alasanRelevansi, { widthDxa: profilCol2 }),
          createCell(dp.perilakuTeramati, { widthDxa: profilCol3 })
        ]
      })
  );

  children.push(
    new Table({
      width: { size: PRINTABLE_WIDTH_DXA, type: WidthType.DXA },
      borders: standardTableBorders,
      rows: [profilHeader, ...profilRows]
    })
  );

  // 3. Capaian Pembelajaran (CP) Box
  children.push(createHeading2('3. Capaian Pembelajaran (CP) Resmi'));
  const cpBox = new Table({
    width: { size: PRINTABLE_WIDTH_DXA, type: WidthType.DXA },
    borders: standardTableBorders,
    rows: [
      new TableRow({
        children: [
          createCell(
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              spacing: { before: 60, after: 60, line: 276 },
              children: [
                new TextRun({
                  text: `"${doc.identifikasiDanDesain.capaianPembelajaran}"`,
                  italics: true,
                  bold: true,
                  font: 'Arial',
                  size: 21,
                  color: COLOR_PRIMARY_NAVY
                })
              ]
            }),
            { widthDxa: PRINTABLE_WIDTH_DXA, shadingColor: COLOR_BG_CALLOUT }
          )
        ]
      })
    ]
  });
  children.push(cpBox);

  // 4. Lintas Disiplin Ilmu
  children.push(createHeading2('4. Koneksi Lintas Disiplin Ilmu'));
  children.push(createParagraph(doc.identifikasiDanDesain.lintasDisiplinIlmu));

  // 5. Tujuan Pembelajaran (3 Dimensi Pengalaman)
  children.push(createHeading2('5. Tujuan Pembelajaran (TP) Berdasarkan Pengalaman Belajar'));

  children.push(createParagraph('A. Dimensi Memahami (Understanding / Konseptual):', { bold: true, color: COLOR_ACCENT_BLUE }));
  doc.identifikasiDanDesain.tujuanPembelajaran.memahami.forEach((tp) => children.push(createBullet(tp)));

  children.push(createParagraph('B. Dimensi Mengaplikasi (Applying / Prosedural & Aksi Nyata):', { bold: true, color: COLOR_ACCENT_BLUE }));
  doc.identifikasiDanDesain.tujuanPembelajaran.mengaplikasi.forEach((tp) => children.push(createBullet(tp)));

  children.push(createParagraph('C. Dimensi Merefleksi (Reflecting / Metakognisi & Sikap):', { bold: true, color: COLOR_ACCENT_BLUE }));
  doc.identifikasiDanDesain.tujuanPembelajaran.merefleksi.forEach((tp) => children.push(createBullet(tp)));

  // 6. Praktik Pedagogis & Sintaks Pembelajaran
  children.push(createHeading2('6. Praktik Pedagogis & Sintaks Pembelajaran'));
  children.push(createParagraph(`Pendekatan Terpilih: ${doc.identifikasiDanDesain.praktikPedagogis.namaPendekatan}`, { bold: true }));
  children.push(createParagraph(`Alasan Pemilihan: ${doc.identifikasiDanDesain.praktikPedagogis.alasanPemilihan}`));

  if (doc.identifikasiDanDesain.praktikPedagogis.sintaksTahapan && doc.identifikasiDanDesain.praktikPedagogis.sintaksTahapan.length > 0) {
    const sintaksCol1 = 2800;
    const sintaksCol2 = PRINTABLE_WIDTH_DXA - sintaksCol1;

    const sintaksHeader = new TableRow({
      tableHeader: true,
      cantSplit: true,
      children: [
        createCell('Tahapan / Fase Sintaks', { widthDxa: sintaksCol1, isHeader: true }),
        createCell('Deskripsi Aktivitas Pembelajaran Terbimbing', { widthDxa: sintaksCol2, isHeader: true })
      ]
    });

    const sintaksRows = doc.identifikasiDanDesain.praktikPedagogis.sintaksTahapan.map(
      (st) =>
        new TableRow({
          cantSplit: true,
          children: [
            createCell(st.tahapan, { widthDxa: sintaksCol1, bold: true }),
            createCell(st.deskripsi, { widthDxa: sintaksCol2 })
          ]
        })
    );

    children.push(
      new Table({
        width: { size: PRINTABLE_WIDTH_DXA, type: WidthType.DXA },
        borders: standardTableBorders,
        rows: [sintaksHeader, ...sintaksRows]
      })
    );
  }

  // 7. Lingkungan Belajar & Pemanfaatan Digital
  children.push(createHeading2('7. Lingkungan Belajar & Pemanfaatan Digital'));
  const lingRows = [
    ['Lingkungan Fisik', doc.identifikasiDanDesain.lingkunganPembelajaran.fisik],
    ['Lingkungan Sosial-Emosional', doc.identifikasiDanDesain.lingkunganPembelajaran.sosial],
    ['Lingkungan Digital', doc.identifikasiDanDesain.lingkunganPembelajaran.digital],
    ['Pemanfaatan Teknologi Digital', doc.identifikasiDanDesain.pemanfaatanDigital],
    ['Kemitraan Pembelajaran', doc.identifikasiDanDesain.kemitraanPembelajaran || doc.identifikasiDanDesain.mitraPembelajaran || 'Kolaborasi rekan sejawat dalam kelompok kecil.']
  ].map(
    ([lbl, val]) =>
      new TableRow({
        cantSplit: true,
        children: [
          createCell(lbl, { widthDxa: 2800, bold: true, shadingColor: COLOR_BG_CALLOUT }),
          createCell(val, { widthDxa: PRINTABLE_WIDTH_DXA - 2800 })
        ]
      })
  );

  children.push(
    new Table({
      width: { size: PRINTABLE_WIDTH_DXA, type: WidthType.DXA },
      borders: standardTableBorders,
      rows: lingRows
    })
  );

  // ==========================================
  // BAGIAN III. LANGKAH-LANGKAH PEMBELAJARAN (TABEL 5 KOLOM)
  // ==========================================
  children.push(createHeading1('LANGKAH-LANGKAH PEMBELAJARAN'));
  children.push(createParagraph(doc.langkahPembelajaran.asumsiWaktuText, { bold: true, color: COLOR_ACCENT_BLUE }));

  // Proportional Column Widths for 5 Columns on A4 Portrait:
  // 1. Aktivitas Pembelajaran (42% = 3690 dxa)
  // 2. Alokasi Waktu (12% = 1054 dxa)
  // 3. Prinsip Pembelajaran (15% = 1318 dxa)
  // 4. Pengalaman Belajar (15% = 1318 dxa)
  // 5. Sumber & Media Belajar (16% = 1408 dxa)
  // Sum = 3690 + 1054 + 1318 + 1318 + 1408 = 8788 dxa (100% exact).
  const c1W = 3690;
  const c2W = 1054;
  const c3W = 1318;
  const c4W = 1318;
  const c5W = 1408;

  const tableStepHeader = new TableRow({
    tableHeader: true,
    cantSplit: true,
    children: [
      createCell('Aktivitas Pembelajaran', { widthDxa: c1W, isHeader: true }),
      createCell('Alokasi Waktu', { widthDxa: c2W, isHeader: true }),
      createCell('Prinsip Pembelajaran', { widthDxa: c3W, isHeader: true }),
      createCell('Pengalaman Belajar', { widthDxa: c4W, isHeader: true }),
      createCell('Sumber & Media', { widthDxa: c5W, isHeader: true })
    ]
  });

  const makePhaseSubheader = (title: string) =>
    new TableRow({
      cantSplit: true,
      children: [
        createCell(title, {
          colSpan: 5,
          bold: true,
          shadingColor: 'E2E8F0',
          textColor: COLOR_PRIMARY_NAVY,
          fontSize: 20
        })
      ]
    });

  const renderStepRows = (steps: any[]) =>
    steps.map(
      (row) =>
        new TableRow({
          cantSplit: true,
          children: [
            createCell(row.activity, { widthDxa: c1W }),
            createCell(row.timeAllocation, { widthDxa: c2W, align: AlignmentType.CENTER }),
            createCell(row.principle, { widthDxa: c3W, align: AlignmentType.CENTER }),
            createCell(row.learningExperience, { widthDxa: c4W, align: AlignmentType.CENTER }),
            createCell(row.learningResources, { widthDxa: c5W })
          ]
        })
    );

  const allTableRows: TableRow[] = [
    tableStepHeader,
    makePhaseSubheader('A. KEGIATAN PENDAHULUAN (AWAL)'),
    ...renderStepRows(doc.langkahPembelajaran.kegiatanAwal),
    makePhaseSubheader('B. KEGIATAN INTI (PEMBELAJARAN MENDALAM)'),
    ...renderStepRows(doc.langkahPembelajaran.kegiatanInti),
    makePhaseSubheader('C. KEGIATAN PENUTUP (REFLEKSI & TINDAK LANJUT)'),
    ...renderStepRows(doc.langkahPembelajaran.kegiatanPenutup)
  ];

  children.push(
    new Table({
      width: { size: PRINTABLE_WIDTH_DXA, type: WidthType.DXA },
      borders: standardTableBorders,
      rows: allTableRows
    })
  );

  // ==========================================
  // BAGIAN IV. ASESMEN PEMBELAJARAN
  // ==========================================
  children.push(createHeading1('ASESMEN PEMBELAJARAN'));

  // Asesmen Tripartit Table
  const asmRows = [
    [
      '1. Asesmen Awal (Diagnostik)',
      `Tujuan: ${doc.asesmen.asesmenAwal.tujuan}\nTeknik: ${doc.asesmen.asesmenAwal.teknik}\nContoh Instrumen: ${doc.asesmen.asesmenAwal.contohSoalTugas}\nPenyesuaian: ${doc.asesmen.asesmenAwal.penyesuaianPembelajaran}`
    ],
    [
      '2. Asesmen Formatif (Proses)',
      `Teknik: ${doc.asesmen.asesmenFormatif.teknik}\nWaktu Pelaksanaan: ${doc.asesmen.asesmenFormatif.waktuPelaksanaan}\nIndikator: ${doc.asesmen.asesmenFormatif.indikator}\nKriteria Keberhasilan: ${doc.asesmen.asesmenFormatif.kriteriaKeberhasilan}\nBentuk Umpan Balik: ${doc.asesmen.asesmenFormatif.bentukUmpanBalik}`
    ],
    [
      '3. Asesmen Sumatif (Akhir)',
      `Bentuk: ${doc.asesmen.asesmenSumatif.bentuk}\nDeskripsi Tugas: ${doc.asesmen.asesmenSumatif.deskripsiTugasSoal}\nKunci / Kriteria: ${doc.asesmen.asesmenSumatif.kunciAtauKriteria}`
    ]
  ].map(
    ([lbl, val]) =>
      new TableRow({
        cantSplit: true,
        children: [
          createCell(lbl, { widthDxa: 2800, bold: true, shadingColor: COLOR_BG_CALLOUT }),
          createCell(val, { widthDxa: PRINTABLE_WIDTH_DXA - 2800 })
        ]
      })
  );

  children.push(
    new Table({
      width: { size: PRINTABLE_WIDTH_DXA, type: WidthType.DXA },
      borders: standardTableBorders,
      rows: asmRows
    })
  );

  // Rubrik Penilaian Table (Tabel 5 Kolom)
  children.push(createHeading2('Rubrik Penilaian Kinerja & Penguasaan Konsep (Skala 1–4)'));

  // Columns for Rubric:
  // 1. Aspek & Indikator (28% = 2460 dxa)
  // 2. Perlu Bimbingan (Skor 1) (18% = 1582 dxa)
  // 3. Cukup (Skor 2) (18% = 1582 dxa)
  // 4. Baik (Skor 3) (18% = 1582 dxa)
  // 5. Sangat Baik (Skor 4) (18% = 1582 dxa)
  // Sum = 2460 + 1582*4 = 8788 dxa.
  const r1W = 2460;
  const rSubW = 1582;

  const rubricHeader = new TableRow({
    tableHeader: true,
    cantSplit: true,
    children: [
      createCell('Aspek & Indikator Penilaian', { widthDxa: r1W, isHeader: true }),
      createCell('Perlu Bimbingan (1)', { widthDxa: rSubW, isHeader: true }),
      createCell('Cukup (2)', { widthDxa: rSubW, isHeader: true }),
      createCell('Baik (3)', { widthDxa: rSubW, isHeader: true }),
      createCell('Sangat Baik (4)', { widthDxa: rSubW, isHeader: true })
    ]
  });

  const rubricRows = doc.asesmen.rubrikPenilaian.map(
    (r) =>
      new TableRow({
        cantSplit: true,
        children: [
          createCell(`${r.aspek}\n(${r.indikator})`, { widthDxa: r1W, bold: true }),
          createCell(r.skala1, { widthDxa: rSubW }),
          createCell(r.skala2, { widthDxa: rSubW }),
          createCell(r.skala3, { widthDxa: rSubW }),
          createCell(r.skala4, { widthDxa: rSubW })
        ]
      })
  );

  children.push(
    new Table({
      width: { size: PRINTABLE_WIDTH_DXA, type: WidthType.DXA },
      borders: standardTableBorders,
      rows: [rubricHeader, ...rubricRows]
    })
  );

  // Tindak Lanjut: Remedial & Pengayaan
  children.push(createHeading2('Pengolahan Hasil & Tindak Lanjut Asesmen'));
  const tindakRows = [
    ['Program Remedial', doc.asesmen.pengolahanDanTindakLanjut.remedial],
    ['Program Pengayaan', doc.asesmen.pengolahanDanTindakLanjut.pengayaan],
    ['Pemberian Umpan Balik', doc.asesmen.pengolahanDanTindakLanjut.umpanBalik],
    ['Refleksi Guru Terhadap Hasil', doc.asesmen.pengolahanDanTindakLanjut.refleksiGuru]
  ].map(
    ([lbl, val]) =>
      new TableRow({
        cantSplit: true,
        children: [
          createCell(lbl, { widthDxa: 2800, bold: true, shadingColor: COLOR_BG_CALLOUT }),
          createCell(val, { widthDxa: PRINTABLE_WIDTH_DXA - 2800 })
        ]
      })
  );

  children.push(
    new Table({
      width: { size: PRINTABLE_WIDTH_DXA, type: WidthType.DXA },
      borders: standardTableBorders,
      rows: tindakRows
    })
  );

  // ==========================================
  // BAGIAN V. ALAT DAN SUMBER BELAJAR
  // ==========================================
  children.push(createHeading1('ALAT DAN SUMBER BELAJAR'));
  children.push(createParagraph('Alat dan Bahan Praktik:', { bold: true }));
  doc.alatDanSumberBelajar.alatDanBahan.forEach((a) => children.push(createBullet(a)));

  children.push(createParagraph('Media Pembelajaran:', { bold: true }));
  doc.alatDanSumberBelajar.mediaPembelajaran.forEach((m) => children.push(createBullet(m)));

  if (doc.alatDanSumberBelajar.bukuReferensi && doc.alatDanSumberBelajar.bukuReferensi.length > 0) {
    children.push(createParagraph('Buku Referensi & Sumber Cetak:', { bold: true }));
    doc.alatDanSumberBelajar.bukuReferensi.forEach((b) => children.push(createBullet(b)));
  }

  if (doc.alatDanSumberBelajar.sumberDigital && doc.alatDanSumberBelajar.sumberDigital.length > 0) {
    children.push(createParagraph('Sumber Belajar Digital & Tautan Interaktif:', { bold: true }));
    doc.alatDanSumberBelajar.sumberDigital.forEach((s) => children.push(createBullet(s)));
  }

  children.push(createParagraph(`Alternatif Sumber Luring: ${doc.alatDanSumberBelajar.alternatifLuring}`));

  // ==========================================
  // BAGIAN VI. REFLEKSI GURU DAN PESERTA DIDIK
  // ==========================================
  children.push(createHeading1('REFLEKSI GURU & PESERTA DIDIK'));

  children.push(createParagraph('Pertanyaan Refleksi Peserta Didik:', { bold: true, color: COLOR_ACCENT_BLUE }));
  doc.refleksi.refleksiPesertaDidik.forEach((rf) => children.push(createBullet(rf)));

  children.push(createParagraph('Pertanyaan Refleksi Pendidik (Guru):', { bold: true, color: COLOR_ACCENT_BLUE }));
  doc.refleksi.refleksiGuru.forEach((rf) => children.push(createBullet(rf)));

  // ==========================================
  // BAGIAN VII. LAMPIRAN SUBJECT-AWARE (RUMUS, DATA, KODE)
  // ==========================================
  if (doc.subjectAwareAnalysis && doc.subjectAwareAnalysis.isQuantitative) {
    const sa = doc.subjectAwareAnalysis;
    children.push(
      createHeading1(
        `LAMPIRAN MATEMATIKA, RUMUS & DATA (${(sa.domainNameId || 'Subject-Aware').toUpperCase()})`
      )
    );

    if (sa.coreFormulas && sa.coreFormulas.length > 0) {
      children.push(createHeading2('1. Rumus & Persamaan Inti Terkalibrasi'));
      const fHeader = new TableRow({
        tableHeader: true,
        cantSplit: true,
        children: [
          createCell('Nama Rumus / Persamaan', { widthDxa: 3000, isHeader: true }),
          createCell('Notasi / Persamaan', { widthDxa: 3000, isHeader: true }),
          createCell('Keterangan Variabel & Satuan SI', { widthDxa: PRINTABLE_WIDTH_DXA - 6000, isHeader: true })
        ]
      });

      const fRows = sa.coreFormulas.map((f: any) => {
        const varsText = f.variables
          ? f.variables.map((v: any) => `${v.symbol} = ${v.meaning}${v.unit ? ` (${v.unit})` : ''}`).join('\n')
          : '-';
        return new TableRow({
          cantSplit: true,
          children: [
            createCell(f.name, { widthDxa: 3000, bold: true }),
            createCell(f.textFallback, { widthDxa: 3000, bold: true, textColor: COLOR_ACCENT_BLUE }),
            createCell(varsText, { widthDxa: PRINTABLE_WIDTH_DXA - 6000 })
          ]
        });
      });

      children.push(
        new Table({
          width: { size: PRINTABLE_WIDTH_DXA, type: WidthType.DXA },
          borders: standardTableBorders,
          rows: [fHeader, ...fRows]
        })
      );
    }

    if (sa.workedExample) {
      children.push(createHeading2('2. Contoh Soal Kontekstual & Langkah Perhitungan Bertahap'));
      children.push(createParagraph(`Soal Pembelajaran: ${sa.workedExample.problemStatement}`, { bold: true }));
      if (sa.workedExample.given && sa.workedExample.given.length > 0) {
        children.push(createParagraph('Diketahui:', { bold: true }));
        sa.workedExample.given.forEach((g: string) => children.push(createBullet(g)));
      }

      sa.workedExample.steps.forEach((st: any) => {
        children.push(createParagraph(`Langkah ${st.stepNumber}: ${st.description}`));
        children.push(createParagraph(`   =>  ${st.mathExpression}`, { bold: true, color: COLOR_ACCENT_BLUE }));
      });

      children.push(createParagraph(`Jawaban Akhir: ${sa.workedExample.finalAnswer}`, { bold: true, color: COLOR_PRIMARY_NAVY }));
      if (sa.workedExample.verificationOrNote) {
        children.push(createParagraph(`Verifikasi: ${sa.workedExample.verificationOrNote}`, { italic: true }));
      }
    }

    if (sa.specializedTable) {
      children.push(createHeading2(`3. ${sa.specializedTable.title}`));
      const colWidthEach = Math.floor(PRINTABLE_WIDTH_DXA / sa.specializedTable.headers.length);

      const stHeader = new TableRow({
        tableHeader: true,
        cantSplit: true,
        children: sa.specializedTable.headers.map((h: string) =>
          createCell(h, { widthDxa: colWidthEach, isHeader: true })
        )
      });

      const stRows = sa.specializedTable.rows.map(
        (row: string[]) =>
          new TableRow({
            cantSplit: true,
            children: row.map((cell: string) => createCell(cell, { widthDxa: colWidthEach }))
          })
      );

      children.push(
        new Table({
          width: { size: PRINTABLE_WIDTH_DXA, type: WidthType.DXA },
          borders: standardTableBorders,
          rows: [stHeader, ...stRows]
        })
      );

      if (sa.specializedTable.summaryOrInsight) {
        children.push(createParagraph(`Catatan Analisis: ${sa.specializedTable.summaryOrInsight}`, { italic: true }));
      }
    }

    if (sa.codeOrPseudocode) {
      children.push(createHeading2(`4. Kode Program / Algoritma (${sa.codeOrPseudocode.title})`));
      children.push(createParagraph(sa.codeOrPseudocode.explanation));
      const codeCell = createCell(
        new Paragraph({
          children: [
            new TextRun({
              text: sa.codeOrPseudocode.code,
              font: 'Courier New',
              size: 19,
              color: '065F46'
            })
          ]
        }),
        { widthDxa: PRINTABLE_WIDTH_DXA, shadingColor: 'F0FDF4' }
      );

      children.push(
        new Table({
          width: { size: PRINTABLE_WIDTH_DXA, type: WidthType.DXA },
          borders: standardTableBorders,
          rows: [new TableRow({ children: [codeCell] })]
        })
      );
    }
  }

  // ==========================================
  // BAGIAN PENGESAHAN DOKUMEN & TANDA TANGAN
  // ==========================================
  children.push(
    createHeading1(
      doc.subjectAwareAnalysis && doc.subjectAwareAnalysis.isQuantitative
        ? ''
        : ''
    )
  );

  children.push(
    new Paragraph({
      alignment: AlignmentType.RIGHT,
      spacing: { before: 120, after: 200 },
      children: [
        new TextRun({
          text: doc.pengesahan.kotaDanTanggal || 'Ditetapkan pada tanggal berjalan',
          font: 'Arial',
          size: 21,
          italics: true
        })
      ]
    })
  );

  const signColWidth = Math.floor(PRINTABLE_WIDTH_DXA / 2); // 4394 dxa

  const signTable = new Table({
    width: { size: PRINTABLE_WIDTH_DXA, type: WidthType.DXA },
    borders: noBorders,
    rows: [
      new TableRow({
        cantSplit: true,
        children: [
          new TableCell({
            width: { size: signColWidth, type: WidthType.DXA },
            margins: { top: 60, bottom: 60, left: 100, right: 100 },
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: 'Mengetahui,\n', font: 'Arial', size: 21 }),
                  new TextRun({ text: 'Kepala Sekolah', bold: true, font: 'Arial', size: 21 })
                ]
              }),
              new Paragraph({ spacing: { before: 800, after: 0 } }), // Adequate blank space for real signature & stamp
              new Paragraph({
                children: [
                  new TextRun({
                    text: doc.pengesahan.namaKepalaSekolah,
                    bold: true,
                    underline: {},
                    font: 'Arial',
                    size: 21
                  })
                ]
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: doc.pengesahan.nipKepalaSekolah
                      ? `NIP. ${doc.pengesahan.nipKepalaSekolah}`
                      : 'NIP. ........................................',
                    font: 'Arial',
                    size: 19,
                    color: COLOR_MUTED_GRAY
                  })
                ]
              })
            ]
          }),
          new TableCell({
            width: { size: signColWidth, type: WidthType.DXA },
            margins: { top: 60, bottom: 60, left: 100, right: 100 },
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: 'Guru Mata Pelajaran,\n', font: 'Arial', size: 21 }),
                  new TextRun({ text: 'Penyusun Modul Ajar', bold: true, font: 'Arial', size: 21 })
                ]
              }),
              new Paragraph({ spacing: { before: 800, after: 0 } }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: doc.pengesahan.namaPenyusun,
                    bold: true,
                    underline: {},
                    font: 'Arial',
                    size: 21
                  })
                ]
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: doc.pengesahan.nipPenyusun
                      ? `NIP. ${doc.pengesahan.nipPenyusun}`
                      : 'NIP. ........................................',
                    font: 'Arial',
                    size: 19,
                    color: COLOR_MUTED_GRAY
                  })
                ]
              })
            ]
          })
        ]
      })
    ]
  });

  children.push(signTable);

  return {
    properties: {
      page: {
        size: { width: PAGE_WIDTH_DXA, height: PAGE_HEIGHT_DXA },
        margin: {
          top: MARGIN_TOP_DXA,
          bottom: MARGIN_BOTTOM_DXA,
          left: MARGIN_LEFT_DXA,
          right: MARGIN_RIGHT_DXA
        }
      }
    },
    headers: {
      default: new Header({
        children: [
          new Paragraph({
            alignment: AlignmentType.RIGHT,
            spacing: { before: 0, after: 80 },
            border: {
              bottom: { style: BorderStyle.SINGLE, size: 1, color: COLOR_BORDER_GRAY }
            },
            children: [
              new TextRun({
                text: `${doc.informasiUmum.namaSekolah}  |  Modul Ajar Pembelajaran Mendalam`,
                font: 'Arial',
                size: 17, // 8.5 pt
                color: COLOR_MUTED_GRAY
              })
            ]
          })
        ]
      })
    },
    footers: {
      default: new Footer({
        children: [
          new Paragraph({
            alignment: AlignmentType.RIGHT,
            spacing: { before: 80, after: 0 },
            border: {
              top: { style: BorderStyle.SINGLE, size: 1, color: COLOR_BORDER_GRAY }
            },
            children: [
              new TextRun({
                text: `${doc.informasiUmum.mataPelajaran} — ${doc.informasiUmum.topikPembelajaran}   •   Halaman `,
                font: 'Arial',
                size: 17, // 8.5 pt
                color: COLOR_MUTED_GRAY
              }),
              new TextRun({
                children: [PageNumber.CURRENT],
                font: 'Arial',
                size: 17,
                bold: true,
                color: COLOR_PRIMARY_NAVY
              }),
              new TextRun({
                text: ' dari ',
                font: 'Arial',
                size: 17,
                color: COLOR_MUTED_GRAY
              }),
              new TextRun({
                children: [PageNumber.TOTAL_PAGES],
                font: 'Arial',
                size: 17,
                bold: true,
                color: COLOR_PRIMARY_NAVY
              })
            ]
          })
        ]
      })
    },
    children
  };
}

/**
 * EXPORT TO REAL MICROSOFT WORD (.DOCX)
 * Builds professional multi-section Word document with Cover Page, systematic hierarchy,
 * formatted 5-column learning steps table, 5-column rubric, and auto page numbering.
 */
export async function exportModulToWord(
  doc: ModulAjarDocument,
  returnBufferOnly: boolean = false
): Promise<{ filename: string; buffer?: Uint8Array }> {
  const coverSection = buildCoverSection(doc);
  const mainSection = buildMainDocumentSection(doc);

  const wordDoc = new Document({
    sections: [coverSection, mainSection]
  });

  const safeFilename = getSafeFilename(doc, 'docx');

  // Handle Node.js / test environments gracefully
  if (returnBufferOnly || typeof window === 'undefined') {
    const buffer = await Packer.toBuffer(wordDoc);
    return { filename: safeFilename, buffer };
  }

  const blob = await Packer.toBlob(wordDoc);
  const downloadUrl = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = downloadUrl;
  a.download = safeFilename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(downloadUrl);

  return { filename: safeFilename };
}
