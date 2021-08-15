import answer from './answer.js'
import th from '../images/th.jpg'
import * as lodash from 'lodash'
export default function () {
  var a = lodash.deepClone([1, 2, 3])
  const c = {1: '中国'}
  console.log('the answer is ' + answer, a, c)
}
const img = document.querySelector('.img')
img.src = th
