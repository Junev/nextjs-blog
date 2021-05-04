import { useCallback, useEffect, useRef, useState } from "react";
import FriendStatus from "../../src/components/FriendStatus";

const FriendList = (props) => {
  const friend = { id: "2" };

  const [name, setName] = useState("Mary");

  useEffect(() => {
    localStorage.setItem("formData", name);
  }, [name]);

  const [surname, setSurname] = useState("Poppins");

  useEffect(() => {
    const wait = async () => {
      await new Promise((resolve) => {
        setTimeout(() => {
          setName("");
          resolve();
        }, 200);
      });
    };
    wait();
  });
  useEffect(() => {
    document.title = name + "" + surname;
  }, [name, surname]);

  const [count, setCount] = useState(0);

  const handleAlertClick = useCallback(() => {
    setTimeout(() => {
      alert("You clicked on " + count);
    }, 3000);
  }, [count]);

  const latestProps = useRef(props);
  useEffect(() => (latestProps.current = props), [props]);
  useEffect(() => {
    const tick = () => {
      console.log(latestProps.current);
    };
    setInterval(tick, 1000);
  }, []);
  return (
    <>
      <p>You Clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click Me</button>
      <button onClick={handleAlertClick}>Show Alert</button>
      <FriendStatus friend={friend} />
    </>
  );
};

export default FriendList;
