import { Link } from '@tanstack/react-router';
import type { Chapter } from '~/types/quran';

export default function SurahCard({ chapter }: { chapter: Chapter }) {
  return (
    <Link
      to="/quran/$surahId"
      params={{ surahId: String(chapter.id) }}
      search={{ page: 1 }}
      className="island-shell group hover:-translate-y-0.5 flex items-center gap-4 rounded-2xl px-4 py-4 no-underline hover:border-[color-mix(in_oklab,var(--lagoon-deep)_35%,var(--line))]"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[linear-gradient(135deg,var(--lagoon),var(--palm))] font-semibold text-sm text-white">
        {chapter.id}
      </span>

      <div className="min-w-0 flex-1">
        <p className="m-0 font-semibold text-(--sea-ink) text-sm leading-snug">
          {chapter.name_simple}
        </p>
        <p className="m-0 text-(--sea-ink-soft) text-xs leading-snug">
          {chapter.translated_name.name} &middot; {chapter.verses_count} verses
        </p>
      </div>

      <span
        className="shrink-0 text-right font-arabic text-(--sea-ink) text-lg leading-relaxed"
        dir="rtl"
        lang="ar"
      >
        {chapter.name_arabic}
      </span>
    </Link>
  );
}
