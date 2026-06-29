import { useEffect, useState } from 'react';

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface Props {
  articleRef: React.RefObject<HTMLElement | null>;
  title: string;
}

export default function TableOfContents({ articleRef, title }: Props) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('__top__');

  useEffect(() => {
    const el = articleRef.current;
    if (!el) return;

    const nodes = Array.from(el.querySelectorAll('h1, h2, h3, h4')).filter(
      (n): n is HTMLElement => !!(n as HTMLElement).id
    ) as HTMLElement[];

    setHeadings(
      nodes.map(n => ({
        id: n.id,
        text: n.textContent ?? '',
        level: parseInt(n.tagName[1]),
      }))
    );

    const onScroll = () => {
      // If near top of page, highlight the title
      if (window.scrollY < 80) {
        setActiveId('__top__');
        return;
      }

      // Find the last heading whose top is at or above 30% of the viewport
      const threshold = window.innerHeight * 0.3;
      let active = '__top__';
      for (const node of nodes) {
        if (node.getBoundingClientRect().top <= threshold) {
          active = node.id;
        }
      }
      setActiveId(active);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [articleRef]);

  if (headings.length === 0) return null;

  const linkClass = (id: string) =>
    `block font-mono text-xs leading-snug py-0.5 pl-2 border-l-2 transition-colors ${
      activeId === id
        ? 'text-white border-white'
        : 'text-neutral-600 hover:text-neutral-300 border-transparent'
    }`;

  return (
    <nav className="hidden lg:block w-52 shrink-0">
      <div className="sticky top-12 max-h-[calc(100vh-6rem)] overflow-y-auto">
        <ul className="space-y-1">
          {/* Title → scroll to top */}
          <li>
            <a
              href="#"
              onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={linkClass('__top__')}
            >
              {title}
            </a>
          </li>

          {headings.map(h => (
            <li key={h.id} style={{ paddingLeft: `${(h.level - 2) * 12}px` }}>
              <a
                href={`#${h.id}`}
                onClick={e => {
                  e.preventDefault();
                  document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={linkClass(h.id)}
              >
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
