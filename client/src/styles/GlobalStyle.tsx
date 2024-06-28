import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
* {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
	vertical-align: middle;
	outline: 0;
}

ul,
ol,
li {
	list-style: none;
	margin: 0;
}

p {margin:0}

a,
img {
	vertical-align: top;
	text-decoration: none;
	outline: 1;
}

table {
	border-collapse: collapse;
}

fieldset {
	border: none;
}

.sr-only {
	display: none;
}

body {
	margin: 0 auto;
	font-family: Consolas, monaco;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	user-select: none;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

/* 타블릿 사이즈 */
/* @media screen and (max-width:1024px) {
	body {
	margin: 0;
	padding: 0 20px;
	}
} */



`;

export default GlobalStyle;
