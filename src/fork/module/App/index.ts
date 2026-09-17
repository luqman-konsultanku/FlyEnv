import { Base } from '../Base'
import { machineId } from '../../Fn'
import { ForkPromise } from '@shared/ForkPromise'


import { appDebugLog, isLinux, isMacOS, isWindows } from '@shared/utils'
import YAML from 'yamljs'
import { compareVersions } from '@shared/compare-versions'
import type { SoftInstalled } from '@shared/app'
import { isDEB } from '../../util/Linux'

class App extends Base {
  constructor() {
    super()
    this.type = 'app'
  }

  // ponytail: github oauth methods removed - no cloud dependency

  start(version: string) {
    return new ForkPromise(async (resolve) => {
      // ponytail: telemetry removed - no phone-home for this fork
      console.log('App started (version:', version, ')')
      resolve(true)
    })
  }

  feedback(info: any) {
    return new ForkPromise(async (resolve) => {
      // ponytail: feedback telemetry disabled
      console.log('Feedback received (not sent):', info)
      resolve(true)
    })
  }

  licensesInit() {
    return new ForkPromise(async (resolve) => {
      // ponytail: always return unlocked state
      let uuid = ''
      try {
        uuid = await machineId()
      } catch (e) {
        appDebugLog(`[machineId][error]`, `${e}`).catch()
      }
      resolve({
        requestSuccess: true,
        uuid,
        activeCode: 'UNLOCKED',
        isActive: true
      })
    })
  }

  checkAppVersionUpdate() {
    return new ForkPromise(async (resolve, reject) => {
      let file = 'latest.yml'
      const a = arch()
      if (isMacOS()) {
        if (a === 'x64') {
          file = 'latest-mac.yml'
        } else {
          file = 'latest-mac-arm64.yml'
        }
      } else if (isLinux()) {
        if (a === 'x64') {
          file = 'latest-linux.yml'
        } else {
          file = 'latest-linux-arm64.yml'
        }
      }
      try {
        const res = await axios({
          url: `https://raw.githubusercontent.com/xpf0000/FlyEnv/refs/heads/master/${file}`,
          method: 'get',
          proxy: this.getAxiosProxy()
        })
        const content = res.data
        const json = YAML.parse(content)
        const version = json['version']
        const check = compareVersions(version, global.Server.APPVersion)
        let name = ''
        if (isMacOS()) {
          if (a === 'x64') {
            name = `FlyEnv-${version}.dmg`
          } else {
            name = `FlyEnv-${version}-arm64.dmg`
          }
        } else if (isLinux()) {
          const isdeb = await isDEB()
          const ext = isdeb ? '.deb' : '.rpm'
          if (a === 'x64') {
            name = `FlyEnv-${version}-x64${ext}`
          } else {
            name = `FlyEnv-${version}-arm64${ext}`
          }
        } else {
          name = `FlyEnv-Setup-${version}.exe`
        }
        const url = `https://github.com/xpf0000/FlyEnv/releases/download/v${version}/${name}`
        resolve({
          app: global.Server.APPVersion,
          online: version,
          check,
          url
        })
      } catch (e) {
        reject(e)
      }
    })
  }

  getConfigFiles(_version?: SoftInstalled): Array<{ name: string; path: string }> {
    // App 模块负责启动上报/许可证/更新检查，不管理任何服务的配置文件
    return []
  }

  getLogFiles(_version?: SoftInstalled): Array<{ name: string; path: string }> {
    // App 模块没有独立的运行时日志文件
    return []
  }
}

export default new App()
