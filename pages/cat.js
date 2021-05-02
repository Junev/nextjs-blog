import { useEffect, useState } from 'react';
import styles from '../styles/category.module.scss';

const Cat = () => {
  const [count, setCount] = useState(0);
  return (
    <div className={styles.category}>
      {count}
      <button onClick={() => setCount(c => c + 1)}>ADD</button>
    </div>
  )
};

export default Cat;