import { Link } from '@tanstack/react-router';
import { Button } from '~/components/ui/button';
import type { Pagination } from '~/types/quran';

export default function PaginationBar({
  pagination,
  surahId,
}: {
  pagination: Pagination;
  surahId: string;
}) {
  const { current_page, total_pages } = pagination;
  if (total_pages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-3">
      {current_page > 1 ? (
        <Button variant="outline" size="sm" asChild>
          <Link
            to="/quran/$surahId"
            params={{ surahId }}
            search={{ page: current_page - 1 }}
          >
            Previous
          </Link>
        </Button>
      ) : (
        <Button variant="outline" size="sm" disabled>
          Previous
        </Button>
      )}

      <span className="text-(--sea-ink-soft) text-sm">
        Page {current_page} of {total_pages}
      </span>

      {current_page < total_pages ? (
        <Button variant="outline" size="sm" asChild>
          <Link
            to="/quran/$surahId"
            params={{ surahId }}
            search={{ page: current_page + 1 }}
          >
            Next
          </Link>
        </Button>
      ) : (
        <Button variant="outline" size="sm" disabled>
          Next
        </Button>
      )}
    </div>
  );
}
