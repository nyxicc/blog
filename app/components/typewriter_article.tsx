import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
}

const TypewriterArticle = forwardRef<HTMLElement, Props>(function TypewriterArticle({ children, className }, forwardedRef) {
  const ref = useRef<HTMLElement>(null);
  useImperativeHandle(forwardedRef, () => ref.current!);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
    const textNodes: Text[] = [];
    let node: Text | null;
    while ((node = walker.nextNode() as Text | null)) {
      if (node.nodeValue?.trim()) textNodes.push(node);
    }

    const charSpans: HTMLSpanElement[] = [];
    for (const textNode of textNodes) {
      const chars = textNode.nodeValue ?? '';
      const frag = document.createDocumentFragment();
      for (const ch of chars) {
        const span = document.createElement('span');
        span.textContent = ch;
        span.style.visibility = 'hidden';
        frag.appendChild(span);
        charSpans.push(span);
      }
      textNode.parentNode?.replaceChild(frag, textNode);
    }

    const total = charSpans.length;
    if (total === 0) return;

    // Reveal all chars in under 5 seconds using rAF
    const DURATION_MS = 4500;
    const startTime = performance.now();
    let rafId: number;

    const tick = (now: number) => {
      const progress = Math.min(1, (now - startTime) / DURATION_MS);
      const target = Math.floor(progress * total);
      for (let i = 0; i < target; i++) {
        charSpans[i].style.visibility = 'visible';
      }
      if (progress < 1) rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <article ref={ref} className={className}>
      {children}
    </article>
  );
});

export default TypewriterArticle;
