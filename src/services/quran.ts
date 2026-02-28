import type { ChaptersResponse, VersesResponse } from '~/types/quran';

const API_BASE = 'https://api.quran.com/api/v4';

export async function fetchChapters(): Promise<ChaptersResponse> {
	const res = await fetch(`${API_BASE}/chapters?language=en`);
	if (!res.ok) throw new Error('Failed to fetch chapters');
	return res.json();
}

export async function fetchVersesByChapter(
	surahId: number,
	page = 1,
): Promise<VersesResponse> {
	const params = new URLSearchParams({
		translations: '20',
		fields: 'text_uthmani',
		per_page: '50',
		page: String(page),
	});
	const res = await fetch(`${API_BASE}/verses/by_chapter/${surahId}?${params}`);
	if (!res.ok) throw new Error('Failed to fetch verses');
	return res.json();
}

export const quranKeys = {
	chapters: () => ['chapters'] as const,
	verses: (surahId: number, page: number) => ['verses', surahId, page] as const,
};
