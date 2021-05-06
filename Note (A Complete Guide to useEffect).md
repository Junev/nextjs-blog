# A Complete Guide to useEffect

## 每一次渲染都有自己的 Props 和 state

&emsp;useState 不是 data binding, watcher, proxy,
当更新状态的时候，React 会重新渲染组件。每一次渲染都能拿到独立的状态，这个状态就是 useState 返回的常量。

&emsp;函数组件每次 render 时都会被调用，但是每一次调用中获取的 state 都是常量，并被赋予了当前渲染中的状态值。

&emsp;在每一次 render 中，props 和 state 是始终保持不变的。

## 每次渲染都有自己的 Effects

&emsp;effect 函数在每一次渲染中都不同。React 会记住提供的 effect 函数，并在每次更改作用于 DOM 并让浏览器绘制屏幕后去调用它。  
可以把 effects 看成是渲染结果的一部分。

## 每次渲染都有它自己的...所有

&emsp;class 中 state 并不是这样运作的。class 中，this.state 总是指向最新的值，问题缘由：可变数据（React 修改了 Class 中的 this.state 使其指向最新状态）。解决办法：使用闭包，在 update 开始时获取 state。

## 逆潮而动

&emsp;每一个组件内的函数（包括事件处理器、effect、定时器、API 调用等）都会捕获某次渲染中定义的 props 和 state.  
&emsp;组件内什么时候去获取 state 或 props 无关紧要.
&emsp;注意:当想要从过去的渲染函数中,读取最新的 props 和 state 时, 你是在逆潮而动,因为它打破了默认范式,使得代码不够干净.

## Effect 中的 cleanup 执行顺序?

1. React 渲染了{id: 20}的 UI;
2. 浏览器绘制;
3. React 清除{id: 10}的 effect;
4. React 运行{id: 20}的 effect;

## 同步,而非生命周期

> 重要的是目的, 而非过程
> useEffect 使你能够根据 props 和 state 同步 React tree 之外的东西.

## deps

1. 设置 deps 避免不必要的重复调用.
2. effect 中用到的所有组件内的值都要包含在依赖中.
3. 设置了错误的依赖,那么 effect 不会重新运行.

&emsp;两种告知依赖的方法:

1. deps 中包好所有 effect 中用到的组件内的值.
2. 修改 effect 内部的代码,以确保它包含的值旨在需要的时候发生变更.

&emsp;去除 effect 依赖的方法

1. setState 的函数形式.
2. 当想要更新一个状态,并且这个状态依赖于另一个状态时,需要用 useReducer 去替换它们.
   useReducer 可以把更新逻辑和描述分开,从而移除不必要的依赖.

useEffect 的设计意图: 强迫你关注数据流的改变,然后决定 effects 如何与它同步.

## 函数作为 effect 的依赖

当忘记 effect 中使用函数依赖时,effects 就不会同步 props 和 state 带来的变更.  
如果某些函数只在 effect 中调用,可以定义在 effect 中.  
如果函数没有使用组件中的任何值,可以将它提到外部定义.  
使用 useCallback 包裹.通过添加一层依赖检查的方式解决问题.
通过 useCallback,函数完全可以参与到数据流中.  
useMemo 能够对复杂对象做类似的事.

## 竞态

简单方法:使用 bool 值跟踪(didCancel)

## 总结

在 class 组件的生命周期模型中,副作用的行为与渲染输出不同.  
在 useEffect 的思维模型中,默认都是同步的,副作用变成了 React 数据流的一部分,
