This is a starter template for [Learn Next.js](https://nextjs.org/learn).

# Hooks

## Introducing Hooks

提出 hooks 的动机：

> 1.  难以在组件间服用状态逻辑；render Props, HOC 会使增加组件层级。Hooks 不会增加组件层级。
> 2.  复杂的组件变得难以理解。组件中充斥大量状态逻辑、副总用，同时生命周期函数内包含不相关的逻辑。Hooks 通过将相关逻辑组织在一起，把组件拆分成为更小的函数。
> 3.  Class 使人困惑。this 的表现与其他语言不同。Class 组件在不注意时，会使得优化效果下降。Hooks 提供了不使用 class 条件下，使用 React 特性的功能。

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
有时候，我们想在 dom 更新后运行一些代码，比如网络请求，dom 操作，记录日志，这些是不需要清除的副作用，因为他们运行之后就马上遗忘了。

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
