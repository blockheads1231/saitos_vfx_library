export default function Item({ icon, label, width, height, labelTransform, imgTransform }) {
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
          filter: 'var(--mode-adaptive-filter)',
        }}
      />

      <span style={{
        transform: labelTransform,
      }}
      >{label}</span>
    </span>
  )
}