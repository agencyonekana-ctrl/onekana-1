import { spawn } from 'node:child_process'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import process from 'node:process'

const projectRoot = resolve(import.meta.dirname, '..')
const localEnvPath = resolve(projectRoot, '.env.local')

if (existsSync(localEnvPath)) {
  process.loadEnvFile(localEnvPath)
}

const children = []
let isStopping = false

const stopAll = (exitCode = 0) => {
  if (isStopping) return
  isStopping = true

  for (const child of children) {
    if (!child.killed) child.kill()
  }

  process.exitCode = exitCode
}

const start = (command, args, extraEnv = {}) => {
  const child = spawn(command, args, {
    cwd: projectRoot,
    env: { ...process.env, ...extraEnv },
    stdio: 'inherit',
  })

  child.on('error', (error) => {
    console.error(`[dev] Impossible de démarrer ${command}: ${error.message}`)
    stopAll(1)
  })

  child.on('exit', (code, signal) => {
    if (!isStopping) {
      const reason = signal ? `signal ${signal}` : `code ${code ?? 1}`
      console.error(`[dev] ${command} s'est arrêté (${reason}).`)
      stopAll(code ?? 1)
    }
  })

  children.push(child)
}

const viteCli = resolve(projectRoot, 'node_modules', 'vite', 'bin', 'vite.js')

start('php', ['-S', '127.0.0.1:8787', '-t', 'public'], {
  APP_ENV: 'development',
})
start(process.execPath, [viteCli, ...process.argv.slice(2)])

process.on('SIGINT', () => stopAll(0))
process.on('SIGTERM', () => stopAll(0))
