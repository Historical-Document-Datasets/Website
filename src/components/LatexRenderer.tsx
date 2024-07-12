export default function LatexRenderer({
  latex,
  className,
}: {
  latex: string;
  className?: string;
}) {
  function renderLatex(latex: string) {
    const citationKeys = latex.match(/\\cite\{(.*?)\}/g) || [];
    let result = latex;

    citationKeys.forEach((key, index) => {
      result = result.replace(
        key,
        `[<a class='text-blue-600 hover:text-blue-800' href='#${index + 1}'>${
          index + 1
        }</a>]`
      );
    });

    return result
      .replace(/\\textit\{(.*?)\}/g, "<i>$1</i>")
      .replace(/\\textbf\{(.*?)\}/g, "<b>$1</b>")
      .replace(/\\ac\{(.*?)\}/g, "<b>$1</b>")
      .replace(/\\nth\{(.*?)\}/g, "$1<sup>th</sup>")
      .replace(/\\%/g, "%")
      .replace(/\\%/g, "%");
  }

  return (
    <p
      className={className}
      dangerouslySetInnerHTML={{
        __html: renderLatex(latex),
      }}
    />
  );
}
