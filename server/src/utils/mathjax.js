const { startup, mathjax } = require("mathjax-full/js/mathjax.js");

const mathjaxConfig = {
  loader: { load: ["input/tex", "output/svg"] },
  tex: { packages: { "[+]": ["ams"] } },
};

const initializeMathJax = async () => {
  const MathJaxPromise = startup.promise;
  mathjaxConfig.loader = { ...mathjaxConfig.loader, require: require };

  try {
    await MathJaxPromise;
    mathjax.config(mathjaxConfig);
    mathjax.startup.defaultReady();
  } catch (err) {
    console.error(err);
  }
};

const convertToSVG = (mathExpression) => {
  return mathjax.tex2svg(mathExpression, { display: true });
};

module.exports = {
  initializeMathJax,
  convertToSVG,
};
