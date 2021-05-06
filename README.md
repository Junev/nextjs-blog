This is a starter template for [Learn Next.js](https://nextjs.org/learn).

# Hooks

## Introducing Hooks

提出 hooks 的动机：

> 1.  难以在组件间复用状态逻辑；render Props, HOC 会使增加组件层级。Hooks 不会增加组件层级。
> 2.  复杂的组件变得难以理解。组件中充斥大量状态逻辑、副作用，同时生命周期函数内包含不相关的逻辑。Hooks 通过将相关逻辑组织在一起，把组件拆分成为更小的函数。
> 3.  Class 使人困惑。this 的表现与其他语言不同。Class 组件在不注意时，会使得优化效果下降。Hooks 提供了不使用 class 条件下，使用 React 特性的能力。

## Hook at a Glance

State Hook  
&emsp;&emsp;存储、获取本地状态，与 setState 不同的是：不会合并状态。

Hook 是什么？  
&emsp;&emsp;Hook 是一些函数，用于在函数组件中，钩入 React 状态和生命周期特性。用途：重用状态逻辑。

Effect Hook  
&emsp;&emsp;副作用：数据获取、订阅、手动操作 dom.  
&emsp;&emsp;Effect Hook 提供了在函数组件中进行副作用的能力。  
&emsp;&emsp;React 在每次 render 后执行副作用，包括第一次 render

&emsp;&emsp;Hooks 让开发者将组件中相关联的副作用组织在一起，而不是被生命周期函数强行拆分。

Rules of Hooks

1. 只在顶层调用 Hooks, 不要在循环、条件、嵌套函数中使用。
2. 只在 React 函数组件中使用 Hooks。

通过自定义 Hook 实现组件间复用状态逻辑。

## Using the State Hook

调用 useState 发生了什么？  
&emsp;&emsp;声明了一个状态变量，在组件调用之间保存值。通常来说，函数退出后，变量被清除，但是 React 保留了状态变量。  
&emsp;&emsp;不像 class 中的 state，state hook 中变量不必是 object。  
useState 在第一次调用时创建状态，在后续调用时，提供当前状态。

## Using the Effect Hook

副作用可分为：不需要清除的、需要清除的。  
有时候，我们想在 dom 更新后运行一些代码，比如网络请求，dom 操作，记录日志，这些是不需要清除的副作用，因为它们运行之后就马上遗忘了。

useEffect 做了什么?  
&emsp;&emsp;通过使用 useEffect 告诉 React 你的组件想要在 render 后做什么。React 会记住你传递的副作用函数，并在每次 Dom 更新后执行它(通过 Deps 优化)。

为什么 useEffect 要在组件中调用？  
&emsp;&emsp;将其放在组件里，让我们可以直接获取到 state 和 props。不需要特殊的 API 来获取 state,props.Hooks 拥抱了闭包,避免引入特定的 React API.

&emsp;&emsp;我们传递给 useEffect 的函数,在每次 render 时是不同的,这是故意的,这使得我们在 effect 内部拿到当前 state 而不是旧 state.

&emsp;&emsp;与 componentDidMount, componentDidUpdate 不同的是: useEffect 中的副作用函数不会阻塞浏览器刷新屏幕.多数副作用不需要同步执行,特殊需要同步执行的副作用可以使用 useLayoutEffect

为什么在每次重渲染之后会执行清除函数?  
&emsp;&emsp;从 prop 获取派生状态, 但是忘记在 prop 更新时,更新派生状态是常见的 Bug 来源. 通过在下一次 effect 前执行前一次 effect 清除函数,useEffect 默认会处理这种情况.

Tip: 通过跳过 Effects 优化性能:  
&emsp;&emsp;通过依赖项与前一次的比较,如果相同跳过执行副作用.

> 确保在 deps 中包含了组件作用域中随时间改变, 并在 effects 中使用的值.否则副作用将接收到前一次 render 的值.

## Rules of Hooks

1. 只在顶层调用 hooks，不要在循环、条件、嵌套中调用。这条规则确保每次 render 的时候 Hooks 都被以相同的顺序调用，从而使得在多次 useState 和 useEffect 调用时，React 能够正确的保存 hooks 的状态。
2. 只在 React 函数组件内调用 Hooks。不要在普通的 JavaScript 函数中调用 hooks，正确的做法是：  
   &emsp; 1. 在 React 函数组件内调用 Hooks；  
   &emsp; 2. 在自定义的 Hooks 内调用 Hooks;
3. React 依赖于 Hooks 调用的顺序获取 state，

![Alt wrap effect with condition](<public/images/屏幕截图(43).png>)

![Alt not found last queue](<public/images/屏幕截图(47).png>)

![Alt hook](<public/images/屏幕截图(49).png>)

![Alt Cat](public/images/cat.jpg)

## Building Your Own Hooks

自定义的 Hooks 是一种遵守 Hooks 设计的约定，而不是一个 React 特性。  
自定义的 Hooks 函数名以 use 开头。  
使用同一个 Hook 并不会共享 state。自定义的 Hooks 提供了一种重用状态逻辑的机制。在每一次使用一个自定义 Hook 的时候，其内部的状态和逻辑是完全隔离的。

## Hooks API Reference

### Basic Hooks

#### useState

1. 接受一个初始状态，把组件的一次 re-render 加入队列。
2. 参数为函数形式时，可以获取到上次的 state。如果 update 函数返回值与当前值相同，React 会跳过 re-render（Object.is()）。
3. 延迟初始化 state。初始化时提供一个初始化函数。
4. 当 render 时需要执行昂贵操作时，使用 useMemo 优化。

#### useEffect

1. 传递给 useEffect 的函数将在 render 完成后执行。useEffect 是一个从函数式编程到命令式编程的逃生出口。
2. clean-up 函数在组件从 UI 中移除前执行。
3. 传递给 useEffect 的函数在每次 layout 和 paint 后执行。useLayoutEffect 中的函数在每次 render 前执行。
4. 默认 effects 会在每次 render 后执行，如果其依赖改变，effect 总会重新创建。  
   在不需要每次 update 时产生一次新的订阅时，使用 useEffect 的第二个参数，添加依赖项。
   > 确保 deps 数组中添加了组件作用域内 effect 中使用的所有依赖
   > deps 数组表示的是：每一个在 effect 函数中引用的值，都要在 deps 中。

#### useContext

1. 即使祖先使用了 React.memo 或 shouldComponentUpdate，使用了 useContext 的组件仍然会重新渲染。
2. 正确的参数：useContext(MyContext)
3. 使用了 useContext 的组件会在 context 值改变时重新渲染。

### Additional Hooks

#### useReducer

1. state 复杂时，useState 的替代方案。另一方面，在组件深度更新时，通过向下传递 dispatch 而不是 callback 有助于优化性能。
2. 延迟初始化：传递延迟函数作为第三个参数。

#### useCallback

1. 返回一个被缓存的 callback。
2. 用途：传递 callback 给经过优化的子组件，子组件依赖引用相等性比较,从而避免不必要的更新。
3. useCallback(fn, deps) 等价于 useMemo(() => fn, deps)

#### useMemo

1. 返回一个被缓存的值。
2. 传递给 useMemo 的函数在 render 的时候执行，不要在内部执行副作用。
3. useMemo 只是一种性能优化，不是语义上的保证。未来，React 可能忘记缓存过的值，在下次 render 的时候重新计算。

#### useRef

1. 返回一个可变的 ref 对象，其.current 属性使用传递的 initialValue 值初始化。
2. 用途：
   1. 操作 dom;
   2. 保存变量，类似于 class 中的实例变量。
3. 除非做延迟初始化，避免在 render 时设置 refs（会导致令惊奇的行为）。典型用法：在 event handler 和 effects 中使用。

#### useImperativeHandle

1. 当使用 ref 时自定义暴露给父组件的实例值。useImperativeHandle 应该与 forwardRef 一起使用。

#### useLayoutEffect

1. Dom 变更后同步调用 Effect

#### useDebugValue

1. 用途：在 React 开发者工具中显示自定义 Hook 的标签。
