export function setModuleEnv(value) {
	process.env.BABEL_MODULE = value
}

export function setNodeEnv(value) {
	process.env.NODE_ENV = value
}

export function setBuildTarget(value) {
	process.env.BUILD_TARGET = value
}

export function isDev() {
	return process.env.NODE_ENV === 'development'
}
