import type from '../typeof'
window._ = window._ || type

import * as checks from './check'

import * as formats from './format'

export * from './check'

export * from './format'

export default {
	...checks,
	...formats
}




