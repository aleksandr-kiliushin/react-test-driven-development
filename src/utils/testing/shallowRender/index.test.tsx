import React from "react"

import { createShallowRenderer, getChildrenOf } from "./index"

describe("childrenOf", () => {
  it("returns no children", () => {
    expect(getChildrenOf(<div />)).toEqual([])
  })

  it("returns direct children", () => {
    expect(
      getChildrenOf(
        <div>
          <p>A</p>
          <p>B</p>
        </div>
      )
    ).toEqual([<p>A</p>, <p>B</p>])
  })

  it("returns text as an array of one item", () => {
    expect(getChildrenOf(<div>text</div>)).toEqual(["text"])
  })

  it("returns no children for text", () => {
    expect(getChildrenOf("text")).toEqual([])
  })

  it("returns array of children for elements with one child", () => {
    expect(
      getChildrenOf(
        <div>
          <p>A</p>
        </div>
      )
    ).toEqual([<p>A</p>])
  })
})

const TestComponent: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <>{children}</>
}

describe("child", () => {
  let getChildOfIndex: any
  let render: any

  beforeEach(() => {
    ;({ getChildOfIndex, render } = createShallowRenderer())
  })

  it("returns undefined if the child does not exist", () => {
    render(<TestComponent />)
    expect(getChildOfIndex(0)).not.toBeDefined()
  })

  it("returns child of rendered element", () => {
    render(
      <TestComponent>
        <p>A</p>
        <p>B</p>
      </TestComponent>
    )
    expect(getChildOfIndex(1)).toEqual(<p>B</p>)
  })
})

const type = (typeName: string) => {
  return (element: React.ReactElement) => {
    return element.type === typeName
  }
}

describe("elementsMatching", () => {
  let elementsMatching: any
  let render: any

  beforeEach(() => {
    ;({ elementsMatching, render } = createShallowRenderer())
  })

  it("finds multiple direct children", () => {
    render(
      <TestComponent>
        <p>A</p>
        <p>B</p>
      </TestComponent>
    )
    expect(elementsMatching(type("p"))).toEqual([<p>A</p>, <p>B</p>])
  })

  it("finds indirect children", () => {
    render(
      <TestComponent>
        <div>
          <p>A</p>
        </div>
      </TestComponent>
    )
    expect(elementsMatching(type("p"))).toEqual([<p>A</p>])
  })
})

describe("elementMatching", () => {
  let elementMatching: any
  let render: any

  beforeEach(() => {
    ;({ elementMatching, render } = createShallowRenderer())
  })

  it("finds first direct child", () => {
    render(
      <TestComponent>
        <p>A</p>
        <p>B</p>
      </TestComponent>
    )
    expect(elementMatching(type("p"))).toEqual(<p>A</p>)
  })
})
