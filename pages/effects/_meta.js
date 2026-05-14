import Item from '../../components/Icon'

export default {
  rocks: {
    title: <Item icon="/icons/rocks_vfx.svg" label="Rocks/Debris" />
  },

  lightning: {
    title: <Item icon="/icons/lightning_vfx.svg" label="Lightning" />
  },

  record: {
    title: <Item icon="/icons/record_vfx.svg" label="Record" />
  },

   presets: {
    title: <Item
    icon="/icons/presets_vfx.svg"
    label="Presets"
    width={24}
    height={24}
    imgTransform={'translateX(-4px)'}
    labelTransform={'translateX(-8px)'}
    />
  },

  movement: {
    title: <Item
    icon="/icons/movement_vfx.svg"
    label="Movement"
    width={24}
    height={24}
    imgTransform={'translateX(-6px)'}
    labelTransform={'translateX(-8px)'}
    />
  },
}