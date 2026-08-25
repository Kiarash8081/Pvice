import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./Book.css";

const DEFAULT_LABELS = {
  openHint: "برای گشودن، برگ را ورق بزن",
  tocKicker: "درآمد",
  prev: "برگ قبل",
  next: "برگ بعد",
  navLabel: "ورق زدن کتاب",
};

function Ornament() {
  return (
    <svg className="ornament" viewBox="0 0 220 28" aria-hidden="true">
      <path
        d="M10 14h70 M210 14h-70 M110 4c8 6 8 16 0 22 M110 4c-8 6-8 16 0 22"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <circle cx="110" cy="14" r="3.2" fill="currentColor" />
    </svg>
  );
}

function CoverFace({ page, hint, logoSrc }) {
  return (
    <div className="face cover-face">
      <div className="cover-frame">
        {logoSrc ? <img src={logoSrc} alt="" className="cover-logo" /> : null}
        <Ornament />
        <h1 className="cover-title">{page.title}</h1>
        {page.subtitle ? <p className="cover-subtitle">{page.subtitle}</p> : null}
        {page.author ? <p className="cover-author">{page.author}</p> : null}
      </div>
      {hint ? <span className="cover-hint">{hint}</span> : null}
    </div>
  );
}

function TocFace({ page, onJump, kicker }) {
  return (
    <div className="face paper-face">
      <header className="page-head">
        <p className="page-kicker">{kicker}</p>
        <h2>{page.title}</h2>
      </header>
      <ul className="toc-list">
        {(page.items || []).map((item) => (
          <li key={item.title}>
            <button type="button" onClick={() => onJump(item.page - 1)}>
              <span>{item.title}</span>
              <span className="toc-dots" />
              <span className="toc-num">{item.page}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function BlankFace() {
  return <div className="face paper-face blank-face" />;
}

function ContentFace({ page }) {
  return (
    <div className="face paper-face">
      <header className="page-head">
        <p className="page-kicker">{page.chapter}</p>
        <h2>{page.title}</h2>
      </header>
      <div className="page-scroll">
        {page.body ? <p className="page-body">{page.body}</p> : null}
        {page.points ? (
          <ul className="page-points">
            {page.points.map((item) => (
              <li key={item.title}>
                <strong>{item.title}: </strong>
                {item.text}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}

function EndpaperFace({ page }) {
  return (
    <div className="face paper-face endpaper-face">
      <Ornament />
      <h2>{page.title}</h2>
      <p className="page-body">{page.body}</p>
    </div>
  );
}

function BackFace({ page, logoSrc }) {
  return (
    <div className="face cover-face back-cover-face">
      <div className="cover-frame compact">
        {logoSrc ? <img src={logoSrc} alt="" className="cover-logo small" /> : null}
        <p className="cover-title small">{page.title}</p>
        {page.colophon ? <p className="cover-subtitle">{page.colophon}</p> : null}
      </div>
    </div>
  );
}

function PageFace({ page, onJump, labels, logoSrc }) {
  switch (page.kind) {
    case "cover":
      return <CoverFace page={page} hint={labels.openHint} logoSrc={logoSrc} />;
    case "toc":
      return <TocFace page={page} onJump={onJump} kicker={labels.tocKicker} />;
    case "blank":
      return <BlankFace />;
    case "endpaper":
      return <EndpaperFace page={page} />;
    case "back":
      return <BackFace page={page} logoSrc={logoSrc} />;
    default:
      return <ContentFace page={page} />;
  }
}

export function BookStandalone({
  pages = [],
  isRtl = true,
  logoSrc,
  labels: labelOverrides,
}) {
  const labels = { ...DEFAULT_LABELS, ...labelOverrides };
  const bookRef = useRef(null);
  const touchRef = useRef(null);
  const [index, setIndex] = useState(0);
  const lastIndex = pages.length - 1;
  const canPrev = index > 0;
  const canNext = index < lastIndex;

  useEffect(() => {
    setIndex(0);
  }, [pages]);

  const goTo = useCallback(
    (nextIndex) => {
      setIndex((current) => {
        const clamped = Math.max(0, Math.min(lastIndex, nextIndex));
        return clamped === current ? current : clamped;
      });
    },
    [lastIndex]
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    const onKey = (event) => {
      if (event.target?.closest?.("textarea, input, button")) return;
      if (event.key === "PageDown") {
        event.preventDefault();
        next();
      }
      if (event.key === "PageUp") {
        event.preventDefault();
        prev();
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        if (isRtl) next();
        else prev();
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        if (isRtl) prev();
        else next();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isRtl, next, prev]);

  const onTouchStart = (event) => {
    const point = event.changedTouches[0];
    touchRef.current = { x: point.clientX, y: point.clientY };
  };

  const onTouchEnd = (event) => {
    if (!touchRef.current) return;
    const point = event.changedTouches[0];
    const dx = point.clientX - touchRef.current.x;
    const dy = point.clientY - touchRef.current.y;
    touchRef.current = null;
    if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy)) return;
    if (dx > 0) {
      if (isRtl) next();
      else prev();
    } else if (isRtl) prev();
    else next();
  };

  const onEdgeClick = (event) => {
    if (event.target.closest("textarea, button, a")) return;
    const bounds = bookRef.current.getBoundingClientRect();
    const ratio = (event.clientX - bounds.left) / bounds.width;
    if (ratio < 0.28) {
      if (isRtl) next();
      else prev();
    } else if (ratio > 0.72) {
      if (isRtl) prev();
      else next();
    }
  };

  const progress = useMemo(
    () => `${index + 1} / ${pages.length}`,
    [index, pages.length]
  );

  if (!pages.length) return null;

  return (
    <div className="book-stage">
      <div className="book-rig">
        <div className="book-floor-shadow" aria-hidden="true" />
        <div
          className={`book${isRtl ? "" : " is-ltr"}`}
          ref={bookRef}
          onClick={onEdgeClick}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className="book-board" aria-hidden="true" />
          <div className="book-stack" aria-hidden="true" />
          <div className="book-edge" aria-hidden="true" />
          <div className="book-spine" aria-hidden="true" />
          <div className="book-pages">
            {pages.map((page, pageIndex) => {
              const flipped = pageIndex < index;
              const isTop = pageIndex === index;
              return (
                <article
                  key={page.id}
                  className={`sheet${flipped ? " flipped" : ""}${
                    isTop ? " current" : ""
                  }${
                    page.kind === "cover" || page.kind === "back" ? " hard" : ""
                  }`}
                  style={{
                    zIndex: flipped
                      ? pages.length + pageIndex
                      : pages.length - pageIndex,
                  }}
                  aria-hidden={!isTop}
                >
                  <div className="sheet-front">
                    <PageFace
                      page={page}
                      onJump={goTo}
                      labels={labels}
                      logoSrc={logoSrc}
                    />
                    {page.kind !== "cover" &&
                      page.kind !== "back" &&
                      page.kind !== "blank" && (
                        <span className="page-number">{pageIndex + 1}</span>
                      )}
                  </div>
                  <div className="sheet-back" aria-hidden="true">
                    <div className="paper-reverse" />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>

      <nav className="book-nav" aria-label={labels.navLabel}>
        <button type="button" onClick={prev} disabled={!canPrev}>
          {labels.prev}
        </button>
        <p className="book-progress">{progress}</p>
        <button type="button" onClick={next} disabled={!canNext}>
          {labels.next}
        </button>
      </nav>
    </div>
  );
}
