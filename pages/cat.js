import React, { useState } from "react"
import styles from "../styles/cat.module.scss"

const Cat = () => {
  const [count, setCount] = useState(0)
  return (
    <div className={styles.cat}>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>ADD</button>
    </div>
  )
}

export default Cat
