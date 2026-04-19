import React from 'react'
import { FaTwitter } from 'react-icons/fa'


const config = {
logo: (
    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <img src="/GreyTIcon.png" width="35" height="35" />
      <span>VFX Library</span>
    </span>
  ),
  chat: {
    link: 'https://discord.gg/2gCZY3ejQq',
  },
  project: {
    link: 'https://github.com/blockheads1231/saitos_vfx_library'
  },
 navbar: {
    extraContent: (
      <a
        href="https://x.com/SaitoSan1231"
        target="_blank"
        rel="noreferrer"
      >
        <FaTwitter />
      </a>
    )
  }
}

export default config