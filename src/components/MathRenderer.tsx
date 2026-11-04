import React from 'react';
import katex from 'katex';

interface MathRendererProps {
  latex: string;
  displayMode?: boolean;
  className?: string;
  fallbackText?: string;
}

export const MathRenderer: React.FC<MathRendererProps> = ({
  latex,
  displayMode = false,
  className = '',
  fallbackText
}) => {
  try {
    const html = katex.renderToString(latex, {
      displayMode,
      throwOnError: false,
      output: 'html'
    });

    return (
      <span
        className={`inline-block math-rendered ${displayMode ? 'my-2 block overflow-x-auto py-1' : ''} ${className}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  } catch (err) {
    console.warn('KaTeX render error:', err);
    return (
      <span className={`font-mono text-cyan-300 ${className}`}>
        {fallbackText || latex}
      </span>
    );
  }
};

/**
 * Component that parses mixed text containing LaTeX delimiters ($...$, $$...$$, \(...\), \[...\])
 * and renders both regular formatted text and embedded mathematical equations.
 */
export const MixedMathText: React.FC<{ content: string; className?: string }> = ({
  content,
  className = ''
}) => {
  if (!content) return null;

  // Split by $$...$$ or \[...\] or $...$ or \(...\)
  const regex = /(\$\$[\s\S]*?\$\$|\\\[[\s\S]*?\\\]|\$[^\$\n]+?\$|\\\([\s\S]*?\\\))/g;
  const parts = content.split(regex);

  return (
    <span className={className}>
      {parts.map((part, index) => {
        if (!part) return null;

        // Display math: $$...$$ or \[...\]
        if (part.startsWith('$$') && part.endsWith('$$')) {
          const formula = part.slice(2, -2).trim();
          return <MathRenderer key={index} latex={formula} displayMode={true} />;
        }
        if (part.startsWith('\\[') && part.endsWith('\\]')) {
          const formula = part.slice(2, -2).trim();
          return <MathRenderer key={index} latex={formula} displayMode={true} />;
        }

        // Inline math: $...$ or \(...\)
        if (part.startsWith('$') && part.endsWith('$') && part.length > 2) {
          const formula = part.slice(1, -1).trim();
          return <MathRenderer key={index} latex={formula} displayMode={false} />;
        }
        if (part.startsWith('\\(') && part.endsWith('\\)')) {
          const formula = part.slice(2, -2).trim();
          return <MathRenderer key={index} latex={formula} displayMode={false} />;
        }

        return <React.Fragment key={index}>{part}</React.Fragment>;
      })}
    </span>
  );
};
