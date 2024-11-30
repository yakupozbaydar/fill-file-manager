/* for vscode config, add the following to settings.json:
"tailwindCSS.experimental.classRegex": [
  "tw`([^`]*)" // cntl`...`
], */

export const tw = (strings: TemplateStringsArray) => {
  return strings.join(" ");
};
