import ExcelJS from 'exceljs'
import { requireAdmin } from '../lib/admin-auth.js'
import { listApplications } from '../lib/application-store.js'

const stageOrder = new Map([
  ['new', 0],
  ['reviewing', 1],
  ['approved', 2],
  ['paid', 3],
  ['declined', 4],
  ['waitlisted', 5],
])

const stageColours = {
  new: { fill: 'DBEAFE', text: '1D4ED8' },
  reviewing: { fill: 'FEF3C7', text: 'B45309' },
  approved: { fill: 'D1FAE5', text: '047857' },
  paid: { fill: 'EDE9FE', text: '6D28D9' },
  declined: { fill: 'FEE2E2', text: 'BE123C' },
  waitlisted: { fill: 'E7E5E4', text: '57534E' },
}

const workbookColumns = [
  { name: 'Business / Trading Name', key: 'businessName', width: 30 },
  { name: 'Stall Type', key: 'stallType', width: 27 },
  { name: 'Application Stage', key: 'stage', width: 19 },
  { name: 'Items Being Sold', key: 'itemsBeingSold', width: 58 },
]

function exportFileDate() {
  const parts = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'Europe/London',
  }).formatToParts(new Date())
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]))
  return `${values.year}-${values.month}-${values.day}`
}

function titleCase(value) {
  const text = String(value || '')
  return text ? text[0].toUpperCase() + text.slice(1) : ''
}

function sortApplications(applications) {
  return [...applications].sort((first, second) => {
    const firstData = first.data || {}
    const secondData = second.data || {}
    const typeComparison = String(firstData.stallTypeLabel || 'Unspecified').localeCompare(
      String(secondData.stallTypeLabel || 'Unspecified'),
      'en-GB',
    )
    if (typeComparison) return typeComparison

    const firstStage = stageOrder.get(first.status) ?? 99
    const secondStage = stageOrder.get(second.status) ?? 99
    if (firstStage !== secondStage) return firstStage - secondStage

    return String(firstData.businessName || '').localeCompare(String(secondData.businessName || ''), 'en-GB')
  })
}

function applicationValues(application) {
  const data = application.data || {}

  return {
    businessName: data.businessName || '',
    stallType: data.stallTypeLabel || 'Unspecified',
    stage: titleCase(application.status),
    itemsBeingSold: data.itemsToBeSold || '',
  }
}

function estimatedRowHeight(rowValues) {
  return Math.min(76, Math.max(24, 18 + Math.ceil(String(rowValues.itemsBeingSold || '').length / 70) * 14))
}

export async function applicationsToWorkbookBuffer(applications) {
  const workbook = new ExcelJS.Workbook()
  workbook.creator = 'Shongo Shomithi'
  workbook.company = 'Shongo Shomithi'
  workbook.subject = 'Stall application administration export'
  workbook.created = new Date()
  workbook.modified = new Date()

  const worksheet = workbook.addWorksheet('Stall Applications', {
    properties: { defaultRowHeight: 22 },
    views: [{ state: 'frozen', ySplit: 3, activeCell: 'A4' }],
  })
  worksheet.pageSetup = {
    orientation: 'landscape',
    fitToPage: true,
    fitToWidth: 1,
    fitToHeight: 0,
    paperSize: 9,
  }
  worksheet.headerFooter.oddFooter = 'Shongo Shomithi — Stall Applications'

  const finalColumnLetter = worksheet.getColumn(workbookColumns.length).letter
  worksheet.mergeCells(`A1:${finalColumnLetter}1`)
  worksheet.getCell('A1').value = 'Shongo Shomithi — Stall Applications'
  worksheet.getCell('A1').font = { bold: true, color: { argb: 'FFFFFFFF' }, size: 18 }
  worksheet.getCell('A1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF014437' } }
  worksheet.getCell('A1').alignment = { vertical: 'middle', horizontal: 'left' }
  worksheet.getRow(1).height = 34

  worksheet.mergeCells(`A2:${finalColumnLetter}2`)
  worksheet.getCell('A2').value = 'Use the filter arrows in row 3 to choose which businesses, stall types, application stages or items you want to view.'
  worksheet.getCell('A2').font = { italic: true, color: { argb: 'FF4B5563' }, size: 11 }
  worksheet.getCell('A2').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF6F1E8' } }
  worksheet.getCell('A2').alignment = { vertical: 'middle', wrapText: true }
  worksheet.getRow(2).height = 34

  worksheet.columns = workbookColumns.map((column) => ({
    key: column.key,
    width: column.width,
    style: column.numberFormat ? { numFmt: column.numberFormat } : {},
  }))

  const sortedApplications = sortApplications(applications)
  const rowValues = sortedApplications.map(applicationValues)
  worksheet.addTable({
    name: 'StallApplicationsTable',
    ref: 'A3',
    headerRow: true,
    totalsRow: false,
    style: {
      theme: 'TableStyleMedium4',
      showFirstColumn: false,
      showLastColumn: false,
      showRowStripes: true,
      showColumnStripes: false,
    },
    columns: workbookColumns.map((column) => ({ name: column.name, filterButton: true })),
    rows: rowValues.map((values) => workbookColumns.map((column) => values[column.key])),
  })

  worksheet.getRow(3).height = 34
  worksheet.getRow(3).font = { bold: true, color: { argb: 'FFFFFFFF' } }
  worksheet.getRow(3).alignment = { vertical: 'middle', wrapText: true }

  sortedApplications.forEach((application, index) => {
    const row = worksheet.getRow(index + 4)
    row.alignment = { vertical: 'top', wrapText: true }
    row.height = estimatedRowHeight(rowValues[index])

    row.eachCell((cell) => {
      cell.border = {
        right: { style: 'hair', color: { argb: 'FFD1D5DB' } },
        bottom: { style: 'hair', color: { argb: 'FFE5E7EB' } },
      }
    })

    const colours = stageColours[application.status] || { fill: 'F3F4F6', text: '374151' }
    const stageCell = row.getCell(3)
    stageCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: `FF${colours.fill}` } }
    stageCell.font = { bold: true, color: { argb: `FF${colours.text}` } }
  })
  worksheet.pageSetup.printTitlesRow = '1:3'

  return workbook.xlsx.writeBuffer()
}

export default async function handler(req, res) {
  if (!requireAdmin(req, res)) return
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed.' })

  try {
    const applications = await listApplications()
    const workbookBuffer = Buffer.from(await applicationsToWorkbookBuffer(applications))
    const date = exportFileDate()
    res.setHeader('Cache-Control', 'private, no-store')
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    res.setHeader('Content-Disposition', `attachment; filename="shongo-stall-applications-${date}.xlsx"`)
    res.setHeader('Content-Length', String(workbookBuffer.length))
    return res.status(200).send(workbookBuffer)
  } catch {
    console.error('admin-export request failed')
    return res.status(500).json({ error: 'Unable to export applications.' })
  }
}
