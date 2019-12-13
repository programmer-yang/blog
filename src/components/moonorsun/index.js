import React from "react"
import cn from "classnames"
import styles from "./index.less"

const MoonOrSun = props => {
  const { isDark, onChange, className } = props
  const containerCN = cn(styles.root, { [className]: !!className })
  const mosCN = cn(styles.mos, { [styles.dark]: !isDark })
  const mmCN = cn(styles.mm, { [styles.dark]: !isDark })
  return (
    <div className={containerCN}>
      <button
        className={styles.container}
        onClick={onChange.bind(null, !isDark)}
      >
        <div className={mosCN} />
        <div className={mmCN} />
      </button>
    </div>
  )
}

export default MoonOrSun
