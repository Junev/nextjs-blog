1. badge 无限循环请求

```javascript
const [product, setProduct] = useState();

useEffect(() => {
  const didCancel = false;
  const getProduct = async () => {
    const result = await fetch("url");
    if(!didCancel) {
      setProduct(result);
    }
  }

  getProduct();

  doOtherThing(product);

  return () => {
    didCancel = false;
  }
  };
}, [product]);
```

2. 关于状态管理的 hooks

   useState:

   1. 提供了在 function 组件中保存状态的能力。
   2. 只用来存储与视图直接相关的变量。(因为 setState 会重新渲染组件)
   3. 延迟创建昂贵 state 的方法：使用函数形式初始化。

   useReducer:

   1. 通过传递 dispatch 函数，而不是 callback 优化性能。
   2. 分离状态更新逻辑。state 依赖另一个 state，或前一次 render 的 state 时。
   3. 用例： 移除 useEffect 中的 state 依赖。通过 context 传递 dispatch, 避免层层传递 callback

   useRef:

   1. 保存可变对象。每次 render 返回相同的 ref 对象。不通知内容改变。
   2. 用例：与 useEffect 同时使用，保存之前的 props 和 state. 通过 callback Ref 测量 DOM 节点。

   要保存依赖前一次 state 得到的新 state 时，简单情况可使用 useState 参数为函数形式，复杂情况使用 useReducer。使用 useRef，保存可变值，类似 class 中的实例变量。

3. 执行副作用 hooks

   useEffect:

   1. 浏览器 paint 之后调用回调函数。

   useLayoutEffect:

   1. 在浏览器 paint 之前同步执行。
   2. 从 server-rendered HTML 中排除组件的方法：

   ```javascript
   const [showChild, setShowChild] = useState(false);
   useEffect(() => {
     showShowChild(true);
   });
   return (
     showChild && <Child />;
   )
   ```

4. useCallback

   返回缓存的回调函数，用于传递 callback 给子组件时，避免子组件不必要的重复 render.

   useCallback(fn, deps) 等价于 useMemo(() => fn, deps)

5. useMemo
   返回缓存值，用于在 deps 没有变化时，直接获取前一次的结果。避免了每次渲染时的重复计算。
6. useImperativeHandle 对外暴露属性、方法，使父组件能够通过 ref 调用子组件的方法。

## 总结

hooks 更关注于数据流，每一次 render 都按照相同顺序执行，根据当前的 props 和 state 同步 DOM.

function 组件内的函数也是数据流的一部分, 每个 callback 关联的是当前的 state,props, 不存在 class 组件中的 state 合并问题。

不可变数据： 每次 render 组件都拥有自己的 prop, state, effects.
