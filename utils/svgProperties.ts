import { svgPathProperties } from 'svg-path-properties';

export function getSvgProperties(d: string) {
	return new svgPathProperties(d);
}

export function getPathLength(d: string) {
	return getSvgProperties(d).getTotalLength();
}
