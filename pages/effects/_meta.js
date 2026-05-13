function Item({ icon, label, width, height, labelTransform, imgTransform }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
      }}
    >
      <img
        src={icon}
        alt=""
        width={height || 16}
        height={width || 16}
        style={{
          display: 'inline-block',
          objectFit: 'contain',
          transform: imgTransform,
          filter: 'var(--icon-filter)',
        }}
      />

      <span style={{
        transform: labelTransform,
      }}
      >{label}</span>
    </span>
  )
}

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