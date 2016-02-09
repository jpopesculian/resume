import {hJSX} from '@cycle/dom'
import isolate from '@cycle/isolate'
import {Observable} from 'rx'

const intent = (DOM) => {
  return {}
}

const model = (actions) => {
  return Observable.just({})
}

const view = (state$) => {
  return state$.map((state) => {
    return (
      <div id="header-page">
        <div className="header-text">
          <h1>
            <span className="first-name">Julian</span>
            <span className="last-name">Popescu</span>
          </h1>
          <h2>
            <span className="first-line">Development</span>
            <span calssName="second-line">&amp; Design</span>
          </h2>
        </div>
        <div className="scroll-indicator">
        </div>
        <div className="triangle-block"></div>
      </div>
    )
  })
}

const HeaderPage = ({DOM, prop$}) => {
  const state$ = model(intent(DOM))
  return {
    value$: state$,
    DOM: view(state$)
  }
}

export default isolate(HeaderPage)
