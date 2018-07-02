// self explained
export const isDef = x => typeof x !== 'undefined'

// self explained
export const isEmpty = arr => arr.length === 0

// self explained
export const isArray = arr => Array.isArray(arr)

// returns true when provided 'obj' has provided 'property'
export const hasProperty = property => obj =>
  Object.prototype.hasOwnProperty.call(obj, property)
