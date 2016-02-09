import Cycle from '@cycle/core'
import {makeDOMDriver, hJSX} from '@cycle/dom'
import HeaderPage from 'app/pages/header'

function main({DOM}) {

  const headerPage = HeaderPage({DOM})
  const view = headerPage.DOM
    .map((headerVTree) => {
      return (
        <div>
          {headerVTree}
        </div>
      )
    })

  return {DOM: view}
}

const bootstrap = (selector) => {
  Cycle.run(main, {
    DOM: makeDOMDriver(selector)
  })
}

export default bootstrap
