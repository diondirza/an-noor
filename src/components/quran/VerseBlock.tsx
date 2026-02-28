import type { Verse } from '~/types/quran';

function stripFootnotes(html: string): string {
	return html.replace(/<sup[^>]*>.*?<\/sup>/gi, '');
}

export default function VerseBlock({ verse }: { verse: Verse }) {
	const translation = verse.translations?.[0];

	return (
		<div className="island-shell rounded-2xl px-5 py-5 sm:px-7 sm:py-6">
			<div className="mb-3 flex items-center gap-2">
				<span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-(--lagoon)/12 font-semibold text-(--lagoon-deep) text-xs">
					{verse.verse_number}
				</span>
				<span className="text-(--sea-ink-soft) text-xs">{verse.verse_key}</span>
			</div>

			<p
				className="m-0 text-right font-arabic text-(--sea-ink) text-2xl leading-[2.2] sm:text-3xl"
				dir="rtl"
				lang="ar"
			>
				{verse.text_uthmani}
			</p>

			{translation && (
				<p className="m-0 mt-4 border-(--line) border-t pt-4 text-(--sea-ink-soft) text-sm leading-relaxed">
					{stripFootnotes(translation.text)}
				</p>
			)}
		</div>
	);
}
