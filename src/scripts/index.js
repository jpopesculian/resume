import Cycle from '@cycle/core'
import {makeDOMDriver, hJSX} from '@cycle/dom'

function main(sources) {

  const DOM = sources.DOM.select('input').events('click')
    .map((e) => e.target.checked)
    .startWith(false)
    .map((toggled) =>
         <div>
          <input type="checkbox"/> Toggle Me
          <p>{toggled ? 'ON' : 'off'}</p>
         </div>
        )

  return {DOM}
}

Cycle.run(main, {
  DOM: makeDOMDriver('#app')
})

