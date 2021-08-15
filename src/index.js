import answer from './answer.js'
import * as lodash from 'lodash'
export default function () {
  var a = lodash.deepClone([1, 2, 3])
  console.log('the answer is ' + answer, a)
}
