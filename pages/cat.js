import React, { useEffect, useState } from "react";
import styles from "../styles/cat.module.scss";

const Cat = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `You called ${count} times`;
  }, [count]);
  return (
    <div className={styles.cat}>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>ADD</button>
    </div>
  );
};

export default Cat;
