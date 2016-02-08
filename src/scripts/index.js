import Cycle from '@cycle/core'
import {makeDOMDriver, hJSX} from '@cycle/dom'

function main(sources) {


  const click$ = sources.DOM.select('input').events('click')
    .map((e) => e.target.checked)
    .startWith(false)


  const DOM = click$
      .map((toggled) =>
         <div>
          <input type="checkbox"/> Toggle Me
          <p>{toggled ? 'ON' : 'off'}</p>
         </div>
      )

  return {
    DOM
  }
}

const bootstrap = (selector) => {
  Cycle.run(main, {
    DOM: makeDOMDriver(selector)
  })
}

export default bootstrap
