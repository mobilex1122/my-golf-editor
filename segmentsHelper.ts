import fs from 'fs'
import type { Plugin } from 'vite'
import { DOMParser } from '@xmldom/xmldom'

export interface SvgSymbolInfo {
  id: string
  title: string | null
}

export default function segmentsHelper(): Plugin {
  return {
    name: 'svf-symbol-loader',
    enforce: 'pre',

    load(id) {
      if (!id.endsWith('.svg?seg')) return null

      const filePath = id.replace('?seg', '')
      const raw = fs.readFileSync(filePath, 'utf-8')

      const symbols = extractSymbols(raw)

      const d = {}
      return `export default ${JSON.stringify(symbols)}`

    }
  }
}

function extractSymbols(svg: string): SvgSymbolInfo[] {
  const parser = new DOMParser()
  const doc = parser.parseFromString(svg, 'image/svg+xml')

  const symbols = Array.from(doc.getElementsByTagName('symbol'))

  return symbols.map(symbol => {
    var id = symbol.getAttribute('id') ?? ''

    if (id.startsWith("segment-")) {
        id = id.substring(8);
    }

    const titleEl = symbol.getElementsByTagName('title')[0]
    const title = titleEl?.textContent ?? null

    return { id, title }
  })
}
