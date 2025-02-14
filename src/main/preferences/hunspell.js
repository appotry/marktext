import path from 'path'
import fs from 'fs-extra'
import log from 'electron-log'
import { getResourcesPath } from 'common/filesystem/paths'

// This is an asynchronous function to not block the process. The spell checker may be
// diabled on first application start because the dictionary doesn't exists or is incomplete.
export default async appDataPath => {
  const srcPath = path.join(getResourcesPath(), 'hunspell_dictionaries/en-US.bdic')

  // NOTE: Hardcoded in "@hfelix/electron-spellchecker/src/spell-check-handler.js"
  const destDir = path.join(appDataPath, 'dictionaries')
  const destPath = path.join(destDir, 'en-US.bdic')

  if (!fs.existsSync(srcPath)) {
    log.error('Error while installing Hunspell default dictionary. Mark Text resources are corrupted!')
    return
  }

  if (!fs.existsSync(destPath)) {
    await fs.ensureDir(destDir)
    await fs.copy(srcPath, destPath)
  }
}
