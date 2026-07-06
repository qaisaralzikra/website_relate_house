import sharp from 'sharp'
import { readdirSync } from 'fs'
import { join, extname, parse } from 'path'

const assetsDir = 'public/assets'
const images = readdirSync(assetsDir).filter(f => /\.(png|jpg|jpeg)$/i.test(f))

const sizes = {
  'event.png': 1200,
  'Logo Relate6.png': 200,
  'team.png': 800,
  'workflow.png': 800,
  'partner.png': 150,
  'design creative.jpg': 800,
  'produksi.jpg': 800,
  'RelateColor.png': 64,
}

async function main() {
  for (const file of images) {
    const name = parse(file).name
    const input = join(assetsDir, file)
    const maxW = sizes[file] || 800

    try {
      await sharp(input)
        .resize({ width: maxW, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(join(assetsDir, `${name}.webp`))
      console.log(`✅ ${name}.webp (max ${maxW}px)`)

      // Also create smaller JPEG/PNG
      await sharp(input)
        .resize({ width: maxW, withoutEnlargement: true })
        .jpeg({ quality: 80, mozjpeg: true })
        .toFile(join(assetsDir, `${name}-opt${extname(file)}`))
      console.log(`✅ ${name}-opt${extname(file)}`)
    } catch (e) {
      console.error(`❌ ${file}: ${e.message}`)
    }
  }
  console.log('\nDone!')
}

main()
