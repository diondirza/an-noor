import { useQuery } from '@tanstack/react-query';
import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import { z } from 'zod';
import PaginationBar from '~/components/quran/PaginationBar';
import VerseBlock from '~/components/quran/VerseBlock';
import { SITE_URL } from '~/lib/site';
import {
	fetchChapters,
	fetchVersesByChapter,
	quranKeys,
} from '~/services/quran';

const searchSchema = z.object({
	page: z.number().int().positive().catch(1),
});

export const Route = createFileRoute('/quran/$surahId')({
	validateSearch: (search) => searchSchema.parse(search),
	loader: async ({ params, context, search }) => {
		const surahId = Number(params.surahId);
		if (Number.isNaN(surahId) || surahId < 1 || surahId > 114) {
			throw notFound();
		}

		const [chaptersData] = await Promise.all([
			context.queryClient.ensureQueryData({
				queryKey: quranKeys.chapters(),
				queryFn: fetchChapters,
				staleTime: 1000 * 60 * 60,
			}),
			context.queryClient.ensureQueryData({
				queryKey: quranKeys.verses(surahId, search.page),
				queryFn: () => fetchVersesByChapter(surahId, search.page),
			}),
		]);

		const chapter = chaptersData.chapters.find((c) => c.id === surahId);
		if (!chapter) throw notFound();

		return { chapter };
	},
	head: ({ loaderData, params }) => {
		const name = loaderData?.chapter?.name_simple ?? `Surah ${params.surahId}`;
		return {
			meta: [
				{ title: `${name} — Quran — An-Noor` },
				{
					name: 'description',
					content: `Read Surah ${name} with Arabic text (Uthmani script) and English translation.`,
				},
			],
			links: [
				{
					rel: 'canonical',
					href: `${SITE_URL}/quran/${params.surahId}`,
				},
			],
		};
	},
	component: SurahReader,
});

const BISMILLAH = 'بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ';

function SurahReader() {
	const { chapter } = Route.useLoaderData();
	const { surahId } = Route.useParams();
	const { page } = Route.useSearch();

	const { data } = useQuery({
		queryKey: quranKeys.verses(Number(surahId), page),
		queryFn: () => fetchVersesByChapter(Number(surahId), page),
	});

	const verses = data?.verses ?? [];
	const pagination = data?.pagination;

	return (
		<main className="page-wrap px-4 pt-14 pb-12">
			<header className="rise-in mb-8 text-center">
				<Link
					to="/"
					className="island-kicker mb-2 inline-block no-underline hover:text-(--lagoon-deep)"
				>
					&larr; All Surahs
				</Link>
				<h1 className="display-title m-0 text-3xl sm:text-4xl">
					{chapter.name_simple}
				</h1>
				<p
					className="mt-2 font-arabic text-(--sea-ink-soft) text-2xl"
					dir="rtl"
					lang="ar"
				>
					{chapter.name_arabic}
				</p>
				<p className="mt-1 text-(--sea-ink-soft) text-sm">
					{chapter.translated_name.name} &middot; {chapter.verses_count} verses
					&middot;{' '}
					{chapter.revelation_place === 'makkah' ? 'Meccan' : 'Medinan'}
				</p>
			</header>

			{chapter.bismillah_pre && page === 1 && (
				<div className="rise-in mb-6 text-center">
					<p
						className="m-0 font-arabic text-(--lagoon-deep) text-2xl sm:text-3xl"
						dir="rtl"
						lang="ar"
					>
						{BISMILLAH}
					</p>
				</div>
			)}

			<div className="rise-in flex flex-col gap-4">
				{verses.map((verse) => (
					<VerseBlock key={verse.id} verse={verse} />
				))}
			</div>

			{pagination && (
				<div className="mt-8">
					<PaginationBar pagination={pagination} surahId={surahId} />
				</div>
			)}
		</main>
	);
}
