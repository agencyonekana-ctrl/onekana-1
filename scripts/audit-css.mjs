import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import postcss from 'postcss'

const projectRoot = process.cwd()
const shouldWrite = process.argv.includes('--write')
const manifestPath = path.join(projectRoot, 'src', 'App.css')
const manifest = fs.readFileSync(manifestPath, 'utf8')
const stylesheetPaths = [...manifest.matchAll(/@import\s+['"](.+?)['"]/g)]
  .map((match) => path.resolve(path.dirname(manifestPath), match[1]))

const activeSourcePaths = [
  'src/App.jsx',
  'src/pages/Home.jsx',
  'src/pages/Agence.jsx',
  'src/pages/Expertise.jsx',
  'src/pages/Journal.jsx',
  'src/pages/Contact.jsx',
  'src/components/Preloader.jsx',
  'src/components/CookiePopup.jsx',
  'src/components/InnerPageHero.jsx',
  'src/components/AccentText.jsx',
  'src/hooks/useScrollReveal.js',
].map((filePath) => path.join(projectRoot, filePath))

const activeSource = activeSourcePaths
  .map((filePath) => fs.readFileSync(filePath, 'utf8'))
  .join('\n')

const splitSelectorList = (selector) => {
  const parts = []
  let current = ''
  let depth = 0

  for (const character of selector) {
    if (character === '(' || character === '[') depth += 1
    if (character === ')' || character === ']') depth -= 1

    if (character === ',' && depth === 0) {
      parts.push(current.trim())
      current = ''
    } else {
      current += character
    }
  }

  if (current.trim()) parts.push(current.trim())
  return parts
}

const classNamesIn = (selector) => (
  [...selector.matchAll(/\.(-?[_a-zA-Z]+[_a-zA-Z0-9-]*)/g)].map((match) => match[1])
)

const isClassUsed = (className) => {
  if (activeSource.includes(className)) return true

  const modifierIndex = className.indexOf('--')
  if (modifierIndex !== -1) {
    const dynamicPrefix = className.slice(0, modifierIndex + 2)
    if (activeSource.includes(dynamicPrefix)) return true
  }

  return false
}

const contextFor = (node) => {
  const context = []
  let parent = node.parent

  while (parent && parent.type !== 'root') {
    if (parent.type === 'atrule') context.unshift(`@${parent.name} ${parent.params}`)
    parent = parent.parent
  }

  return context.join('|')
}

const signatureFor = (rule) => {
  const declarations = []
  rule.each((node) => {
    if (node.type === 'decl') declarations.push(`${node.prop}:${node.value}${node.important ? '!important' : ''}`)
  })
  return `${contextFor(rule)}|${rule.selector.replace(/\s+/g, ' ').trim()}|${declarations.join(';')}`
}

const documents = stylesheetPaths.map((filePath) => ({
  filePath,
  root: postcss.parse(fs.readFileSync(filePath, 'utf8'), { from: filePath }),
}))

const allRules = []
for (const document of documents) {
  document.root.walkRules((rule) => allRules.push(rule))
}

const signatureGroups = new Map()
for (const rule of allRules) {
  const signature = signatureFor(rule)
  const group = signatureGroups.get(signature) || []
  group.push(rule)
  signatureGroups.set(signature, group)
}

const duplicateRules = [...signatureGroups.values()].filter((group) => group.length > 1)
const deadSelectors = []
const animationValues = []

for (const document of documents) {
  document.root.walkDecls(/^animation(?:-name)?$/, (declaration) => animationValues.push(declaration.value))
}

const animationSource = `${animationValues.join(' ')} ${activeSource}`
const unusedKeyframes = []

for (const document of documents) {
  document.root.walkAtRules(/^(?:-webkit-)?keyframes$/, (atRule) => {
    const escapedName = atRule.params.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    if (!new RegExp(`(^|[^A-Za-z0-9_-])${escapedName}([^A-Za-z0-9_-]|$)`).test(animationSource)) {
      unusedKeyframes.push(atRule)
    }
  })
}

for (const rule of allRules) {
  const selectors = splitSelectorList(rule.selector)
  const liveSelectors = selectors.filter((selector) => {
    const classNames = classNamesIn(selector)
    const isLive = classNames.length === 0 || classNames.every(isClassUsed)
    if (!isLive) deadSelectors.push(selector)
    return isLive
  })

  rule.raws.onekanaLiveSelectors = liveSelectors
}

console.log(`Stylesheets: ${documents.length}`)
console.log(`Rules: ${allRules.length}`)
console.log(`Exact duplicate rule groups: ${duplicateRules.length}`)
console.log(`Dead selector branches: ${deadSelectors.length}`)
console.log(`Unused keyframes: ${unusedKeyframes.length}`)
console.log('Dead selector sample:')
for (const selector of [...new Set(deadSelectors)].slice(0, 80)) console.log(`  ${selector}`)
if (unusedKeyframes.length > 0) {
  console.log(`Unused keyframe names: ${unusedKeyframes.map((atRule) => atRule.params).join(', ')}`)
}

if (shouldWrite) {
  for (const group of duplicateRules) {
    for (const duplicate of group.slice(0, -1)) duplicate.remove()
  }

  for (const keyframes of unusedKeyframes) keyframes.remove()

  for (const document of documents) {
    document.root.walkRules((rule) => {
      if (!rule.parent) return
      const liveSelectors = rule.raws.onekanaLiveSelectors
      delete rule.raws.onekanaLiveSelectors

      if (liveSelectors.length === 0) rule.remove()
      else rule.selector = liveSelectors.join(',\n')
    })

    document.root.walkAtRules((atRule) => {
      if (atRule.nodes && atRule.nodes.length === 0) atRule.remove()
    })

    fs.writeFileSync(document.filePath, document.root.toString())
  }
}
