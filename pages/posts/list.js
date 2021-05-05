import { useEffect, useRef, useState } from "react";
import Timer from "../../src/components/Timer";
import styles from "./list.module.scss";

const getListData = () => new Array(100).fill(0).map((i, index) => index);
const listData = getListData();

const List = () => {
  const screenHeight = 400;
  const itemHeight = 30;
  const containerRef = useRef();

  const listHeight = listData.length * itemHeight;
  const visibleCount = Math.ceil(screenHeight / itemHeight);

  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(visibleCount);
  const [startOffset, setStartOffset] = useState(0);
  const visibleItems = listData;

  useEffect(() => {
    const dom = containerRef.current;
    function scrollHandler(e) {
      const scrollTop = dom.scrollTop;
      const startIndex = Math.floor(scrollTop / itemHeight);
      const endIndex = startIndex + visibleCount;
      const startOffset = scrollTop - (scrollTop % itemHeight);
      setStartIndex(startIndex);
      setEndIndex(endIndex);
      setStartOffset(startOffset);
    }
    dom.addEventListener("scroll", scrollHandler, { passive: true });
    return () => {
      dom.removeEventListener("scroll", scrollHandler);
    };
  }, [containerRef, visibleCount]);

  return (
    <div
      ref={containerRef}
      className={styles.container}
      style={{ height: screenHeight + "px" }}
    >
      <div
        className={styles.phantom}
        style={{ height: listHeight + "px" }}
      ></div>
      <div
        className={styles.list}
        style={{
          height: screenHeight + "px",
          transform: `translate3D(0,${startOffset}px,0)`,
        }}
      >
        {visibleItems
          .slice(startIndex, Math.min(endIndex, visibleItems.length))
          .map((item) => (
            <li
              key={item}
              style={{
                height: itemHeight + "px",
                lineHeight: itemHeight + "px",
              }}
            >
              {item}
            </li>
          ))}
      </div>
      <Timer className={styles.timer} />
    </div>
  );
};

export default List;
