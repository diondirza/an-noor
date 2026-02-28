import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import SurahCard from '~/components/quran/SurahCard';
import { SITE_URL } from '~/lib/site';
import { fetchChapters, quranKeys } from '~/services/quran';

export const Route = createFileRoute('/')({
	loader: ({ context }) =>
		context.queryClient.ensureQueryData({
			queryKey: quranKeys.chapters(),
			queryFn: fetchChapters,
			staleTime: 1000 * 60 * 60,
		}),
	head: () => ({
		meta: [
			{ title: 'Quran — An-Noor' },
			{
				name: 'description',
				content:
					'Read all 114 surahs of the Holy Quran with Arabic text and English translation.',
			},
		],
		links: [{ rel: 'canonical', href: SITE_URL }],
	}),
	component: QuranIndex,
});

function QuranIndex() {
	const { data } = useQuery({
		queryKey: quranKeys.chapters(),
		queryFn: fetchChapters,
		staleTime: 1000 * 60 * 60,
	});

	const chapters = data?.chapters ?? [];

	return (
		<main className="page-wrap px-4 pt-14 pb-12">
			<header className="rise-in mb-10 text-center">
				<p className="island-kicker mb-2">The Holy Quran</p>
				<h1 className="display-title m-0 text-3xl sm:text-4xl">
					Browse Surahs
				</h1>
				<p className="mx-auto mt-3 max-w-lg text-(--sea-ink-soft) text-sm">
					All 114 surahs of the Quran. Select a surah to read its verses with
					English translation.
				</p>
			</header>

			<div className="rise-in grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
				{chapters.map((chapter) => (
					<SurahCard key={chapter.id} chapter={chapter} />
				))}
			</div>
		</main>
	);
}
