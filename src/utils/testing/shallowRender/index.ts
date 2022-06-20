import React from "react"
import ShallowRenderer from "react-test-renderer/shallow"

export const getChildrenOf = (aReactNode: React.ReactNode) => {
  if (typeof aReactNode === "string") return []
  const {
    // @ts-ignore
    props: { children },
  } = aReactNode
  if (!children) return []
  if (typeof children === "string") return [children]
  if (Array.isArray(children)) return children
  return [children]
}

// @ts-ignore
const elementsMatching = (element: React.ReactNode, matcherFn) => {
  if (matcherFn(element)) {
    return [element]
  }
  return getChildrenOf(element).reduce((acc, child) => [...acc, ...elementsMatching(child, matcherFn)], [])
}

export const createShallowRenderer = () => {
  // @ts-ignore
  let renderer = new ShallowRenderer()
  return {
    // @ts-ignore
    elementMatching: (matcherFn) => elementsMatching(renderer.getRenderOutput(), matcherFn)[0],
    // @ts-ignore
    elementsMatching: (matcherFn) => elementsMatching(renderer.getRenderOutput(), matcherFn),
    getChildOfIndex: (index: number) => getChildrenOf(renderer.getRenderOutput())[index],
    render: (component: React.ReactElement) => renderer.render(component),
  }
}

export const id = (id: string) => {
  return (element: React.ReactElement) => {
    return element.props && element.props.id === id
  }
}
export const className = (className: string) => {
  return (element: React.ReactElement) => {
    return element.props.className === className
  }
}
export const click = (element: React.ReactElement) => {
  element.props.onClick()
}
