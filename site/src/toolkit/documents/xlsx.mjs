// Workbooks for the register, the training overview and the enactment plan. Yellow cells are the gaps the business fills.
import ExcelJS from 'exceljs';

const GAP = 'FFFFF3BF';
const HEAD = 'FFE9EDF3';

export function workbook() {
  const wb = new ExcelJS.Workbook();
  wb.creator = 'Scutoria';
  wb.created = new Date();
  return wb;
}

// A validation list. Excel splits an inline list at every comma, so a list whose values contain a comma (or that is too long to be
// written inline) goes into a column of a hidden sheet "Lists" and is referenced as a range.
const listColumns = new WeakMap();
function listFormula(wb, list) {
  const values = list.map((v) => String(v));
  const inline = `"${values.join(',')}"`;
  if (!values.some((v) => v.includes(',')) && inline.length <= 255) return inline;
  let sheet = wb.getWorksheet('Lists');
  if (!sheet) { sheet = wb.addWorksheet('Lists'); sheet.state = 'hidden'; }
  const col = (listColumns.get(wb) ?? 0) + 1;
  listColumns.set(wb, col);
  values.forEach((v, i) => { sheet.getCell(i + 1, col).value = v; });
  const letter = sheet.getColumn(col).letter;
  return `Lists!$${letter}$1:$${letter}$${values.length}`;
}

// spec: { columns: [{ header, width }], rows: [[...]], lists: { colIndex: [values] }, gaps: [{ r, c }] | 'rowsCols', note: 'text' , title: 'text' }
export function addSheet(wb, name, spec) {
  const ws = wb.addWorksheet(name.slice(0, 31));
  let r = 1;
  if (spec.title) {
    ws.getCell(r, 1).value = spec.title;
    ws.getCell(r, 1).font = { bold: true, size: 14 };
    r += 1;
  }
  if (spec.note) {
    ws.getCell(r, 1).value = spec.note;
    ws.getCell(r, 1).font = { italic: true, color: { argb: 'FF555555' } };
    ws.getCell(r, 1).alignment = { wrapText: true, vertical: 'top' };
    ws.mergeCells(r, 1, r, Math.max(spec.columns.length, 4));
    ws.getRow(r).height = 48;
    r += 1;
  }
  const headRow = r;
  ws.getRow(headRow).values = spec.columns.map((c) => c.header);
  ws.getRow(headRow).font = { bold: true };
  ws.getRow(headRow).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: HEAD } };
  ws.getRow(headRow).alignment = { wrapText: true, vertical: 'top' };
  spec.columns.forEach((c, i) => { ws.getColumn(i + 1).width = c.width ?? 18; });
  const dataStart = headRow + 1;
  const rowCount = Math.max(spec.rows.length, spec.minRows ?? 0);
  for (let i = 0; i < rowCount; i++) {
    const values = spec.rows[i] ?? [];
    const row = ws.getRow(dataStart + i);
    row.values = values;
    row.alignment = { wrapText: true, vertical: 'top' };
  }
  const lastRow = dataStart + rowCount - 1;
  // borders on the table
  for (let rr = headRow; rr <= Math.max(lastRow, headRow); rr++) {
    for (let cc = 1; cc <= spec.columns.length; cc++) {
      ws.getCell(rr, cc).border = { top: { style: 'thin', color: { argb: 'FFBBBBBB' } }, left: { style: 'thin', color: { argb: 'FFBBBBBB' } }, bottom: { style: 'thin', color: { argb: 'FFBBBBBB' } }, right: { style: 'thin', color: { argb: 'FFBBBBBB' } } };
    }
  }
  // validation lists per column (1-based column index); Excel rejects entries outside the list
  for (const [col, list] of Object.entries(spec.lists ?? {})) {
    const formula = listFormula(wb, list);
    for (let rr = dataStart; rr <= Math.max(lastRow, dataStart + (spec.minRows ?? 0)); rr++) {
      ws.getCell(rr, Number(col)).dataValidation = { type: 'list', allowBlank: true, showErrorMessage: true, formulae: [formula] };
    }
  }
  // gap columns: yellow for every data row
  for (const col of spec.gapColumns ?? []) {
    for (let rr = dataStart; rr <= Math.max(lastRow, dataStart); rr++) ws.getCell(rr, col).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: GAP } };
  }
  for (const g of spec.gaps ?? []) ws.getCell(dataStart + g.r, g.c).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: GAP } };
  ws.views = [{ state: 'frozen', ySplit: headRow }];
  return ws;
}

export async function toBuffer(wb) {
  return Buffer.from(await wb.xlsx.writeBuffer());
}
