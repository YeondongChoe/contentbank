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

// itex_
.body {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  position: relative;
  /* background-color: inherit; */
}

.open_editor {
  position: absolute;
  top: 40px;
  left: 50%;
  transform: translate(-50%, 0);
  width: 200px;
  height: 100px;
  /* border: 1px solid yellowgreen; */
}

/* #input_container button{
  display: flex;
  justify-content: center;
  align-items: center;
} */

button > img {
  /* width: 37px; */
  height: auto;
  pointer-events: none;
}

aside {
  font-size: 8px;
  margin-top: 2px;
}

#itex_eq_editor_container {
  position: absolute;
  bottom: -100vh;
  width: 100%;
  height: auto;
}
/* display ================================================ */
#display_container {
  /* border: 1px solid gray; */
  /* border-radius: 20px 20px 0 0; */
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.itex_editor_close {
  position: absolute;
  top: 10px;
  right: 0px;
  transform: translateX(-50%);
  width: 27px;
  height: 27px;
  border-radius: 8px;
  opacity: 40%;
}
.itex_editor_close:hover {
  opacity: 100%;
}
/* keyboard ================================================ */
#used_btn_wrap {
  /* border: 1px solid red; */
  height: 50px;
  width: 100%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}
.bookmark_btn {
  background-color: #f5f5f5;
  border: none;
  width: 60px;
  height: 30px;
  border-radius: 5px;
  margin: 0 3px;
  transition: linear 0.2s;
  font-size: 0.8rem;
}
.active_bookmark {
  font-weight: bold;
  color: white;
  background-color: #6c757d;
  box-shadow: 2px 2px 3px rgba(39, 40, 71, 0.2),
    -2px -2px 4px rgba(255, 255, 255, 0.9);
}
.bookmark_close_btn {
  width: 15px;
  height: 15px;
  border: none;
  background-color: pink;
  border-radius: 2px;
  font-size: 10px;
  left: 50%;
  transform: translate(-50%, -3px);
}
.bookmark_close_btn:hover {
  background-color: red;
}

.used_btn_list,
.bookmark_list {
  display: flex;
  margin-left: 20px;
  width: 410px;
  align-items: center;
}

/* .bookmark_list {
  display: flex;
} */
#input_container {
  /* border: 1px solid orange; */
  background-color: #f5f5f5;
  min-height: 280px;
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
}
.keyboard_box,
.draw_container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.draw_container {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
}
.draw_setting {
  /* position: absolute;
  right: -100%; */
  z-index: -99;
}

#input_menu {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 800px;
  margin: 6px 0;
}

#keyboard_menu_wrap {
  margin: 0 40px 0 10px;
}
.sketch_menu_wrap {
  margin: 0 185px 0 10px;
}
.keyboard_menu_wrap,
.sketch_menu_wrap {
  position: relative;
  display: flex;
}

/* ---------------------------- */
#menu_selector {
  position: absolute;
  border-radius: 10px;
  top: 36px;
  left: 5px;
  width: 36px;
  height: 5px;
  background-color: red;
  pointer-events: none;
  transition: transform 0.2s ease;
}
#s_menu_selector {
  position: absolute;
  border-radius: 10px;
  top: 36px;
  left: 5px;
  width: 36px;
  height: 5px;
  background-color: blue;
  pointer-events: none;
  transition: transform 0.2s ease;
}

.menu,
.s_menu {
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: 1px solid blue; */
  font-size: 1.2rem;
  width: 45px;
  margin-left: 5px;
  height: 40px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  z-index: 999;
  position: relative;
}
.menu_descript {
  position: absolute;
  top: -20px;
  left: 50%;
  width: max-content;
  transform: translate(-50%, 0);
  transition: 1s;
  color: green;
  font-size: small;
  z-index: 9999;
}
.s_menu > img {
  pointer-events: none;
  width: 30px;
}
#menu_btn_wrap {
  display: flex;
  margin-left: 10px;
}
#menu_btn_wrap img {
  width: 23px;
  height: auto;
}
.menu_btn,
.ocr_eqn_insert {
  width: 80px;
  height: 38px;
  margin-right: 10px;
  border: none;
  border-radius: 10px;
  box-shadow: 2px 2px 3px rgba(39, 40, 71, 0.2),
    -2px -2px 4px rgba(255, 255, 255, 0.9);
  transition: 0.3s;
  position: relative;
}
/* .menu_btn:hover {
    
    box-shadow: 4px 4px 6px rgba(39, 40, 71, 0.2),
    -4px -4px 8px rgba(255, 255, 255, 0.9);
    transition: 0.3s;
  } */
.input_btn,
.ocr_eqn_insert {
  /* border: 4px solid rgb(51, 176, 249); */
  border: 4px solid cornflowerblue;
  border-radius: 999px;
  /* background-color: cornflowerblue; */
  /* box-shadow: 2px 2px 3px rgba(36, 126, 250, 0.716),
    -2px -2px 4px rgba(83, 176, 238, 0.9); */
  /* box-shadow: 2px 2px 3px rgba(39, 40, 71, 0.2),
    -2px -2px 4px rgba(255, 255, 255, 0.9); */
}
.draw_btn {
  width: 80px;
  height: 40px;
  position: relative;
  border: 4px solid yellow;
  top: 1px;
  border-radius: 999px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* transform: scale(1.5); */
}
.change_btn {
  /* border: 1px solid red; */
  pointer-events: none;
  width: 25px;
}

.arrow_l_btn,
.arrow_r_btn,
.clear_btn,
.enter_btn {
  width: 40px;
}
.arrow_l_btn {
  margin-right: 7px;
}

#key_container {
  width: 800px;
}
.key_layer {
  display: flex;
  justify-content: center;
}
.key {
  border: none;
  border-radius: 6px;
  width: 45px;
  height: 45px;
  margin: 5px;
  /* border: 3px solid white; */
  box-shadow: 2px 2px 3px rgba(39, 40, 71, 0.2),
    -2px -2px 4px rgba(255, 255, 255, 0.9);
  position: relative;
  font-size: 18px;
}
.used_key,
.bookmark_key {
  border: none;
  border-radius: 6px;
  width: 35px;
  height: 35px;
  margin: 3px;
  box-shadow: 2px 2px 3px rgba(39, 40, 71, 0.2),
    -2px -2px 4px rgba(255, 255, 255, 0.9);
  /* position: relative; */
  font-size: 12px;
}

.key > p,
.key > img,
.key > aside,
.add_key > p,
.add_key > img {
  pointer-events: none;
}
.key:hover {
  /* background-color:  */
}
.keyClick {
  /* box-shadow: inset 2px 2px 2px rgba(39, 40, 71, 0.2),
    inset -2px -2px 2px rgba(255, 255, 255, 0.9); */
}
.add_key_point {
  position: absolute;
  top: 2px;
  right: 3px;
  font-size: 7px;
  color: rgb(254, 66, 254);
  font-weight: bold;
}
.add_key_container {
  border-radius: 10px;
  position: absolute;
  top: -35px;
  left: 50%;
  transform: translate(-50%);
  width: auto;
  height: auto;
  background-color: #d5d3d3;
  display: none;
  z-index: 9999;
}
.add_key {
  width: 30px;
  height: 30px;
  margin: 5px;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 1.6px 1.6px 2px rgba(39, 40, 71, 0.2),
    -1.6px -1.6px 2px rgba(255, 255, 255, 0.9);
  background-color: #f5f5f5;
}
.add_key:hover {
  background-color: #cec5c5;
}
.two_key {
  width: 100px;
}
.three_key {
  width: 140px;
}
.onehalf_key {
  width: 80px;
}
.regular_key {
  background-color: #cfcfcf;
}
.regular_active,
.shift_active {
  box-shadow: inset 2px 2px 2px rgba(39, 40, 71, 0.2),
    inset -2px -2px 2px rgba(255, 255, 255, 0.9);
}
.key_space {
  margin-right: 15px;
}
.shift_key {
  /* border: 4px solid #cfcfcf; */
  background-color: #d3d3d3;
}
.delete_key {
  background-color: #d3d3d3;
  /* border: 4px solid pink; */
}
.font_btn {
  width: 38px;
  font-size: 0.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Draw ============================================================= */
.iframe_wrap {
  margin-top: 10px;
  box-shadow: 1.6px 1.6px 2px rgba(39, 40, 71, 0.2),
    -1.6px -1.6px 2px rgba(255, 255, 255, 0.9);
  /* border-radius: 20px; */
  width: 620px;
  height: 205px;
  margin-bottom: 5px;
}
#itex_frame_area {
  width: 100%;
  height: 100%;
  /* border: 1px solid red; */
}

/* #sketchpad {
  width: 100%;
  height: 100%;
} */
.conversion {
  /* border: 2px solid yellow; */
}

.output_test {
  width: 100%;
  height: 100px;
  position: absolute;
  top: 200px;
  border: 1px solid red;
}

/* ================================================================== */

.display_active {
  display: flex;
}

.display_inactive {
  display: none;
  position: none;
}

.display_hidden {
  visibility: hidden;
  position: absolute;
  bottom: 0;
}

.button_click {
  box-shadow: inset 2px 2px 2px rgba(39, 40, 71, 0.2),
    inset -2px -2px 2px rgba(255, 255, 255, 0.9);
}

.active_block {
  display: flex;
}

.bookmark_regist_open {
  box-shadow: 0 0 5px rgb(172, 172, 0);

  /* 애니메이션 설정 */
  /* animation: shadowPulse 1s infinite alternate; */
}
.bookmark_regist_open:hover {
  box-shadow: 0 0 5px rgb(16, 222, 2);
}
.bookmark_add_active {
  background-color: red;
  color: white;
  border: none;
}

/* @keyframes를 사용하여 그림자 애니메이션 정의 */
@keyframes shadowPulse {
  from {
    box-shadow: 0 0 5px rgb(172, 172, 0);
  }
  to {
    box-shadow: 0 0 8px rgb(172, 172, 0);
  }
}

`;

export default GlobalStyle;
