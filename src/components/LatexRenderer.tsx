export default function LatexRenderer({
  latex,
  className,
}: {
  latex: string;
  className?: string;
}) {
  function renderLatex(latex: string) {
    return latex
      .replace(/\\textit\{(.*?)\}/g, "<i>$1</i>")
      .replace(/\\textbf\{(.*?)\}/g, "<b>$1</b>")
      .replace(/\\ac\{(.*?)\}/g, "<b>$1</b>")
      .replace(/\\nth\{(.*?)\}/g, "$1<sup>th</sup>")
      .replace(/\\%/g, "%");
  }

  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{
        __html: renderLatex(latex),
      }}
    />
  );
}
