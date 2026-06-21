import { useState, type ReactNode } from 'react';
import { Play } from 'lucide-react';
import { MuxPublicPlayer } from '@/components/mux/mux-public-player';
import { muxThumbnailUrl } from '@/lib/mux';
import type { PortalPreview } from '@/lib/api';
import { cn } from '@/lib/utils';

const cardShellClassName =
  'overflow-hidden rounded-2xl border border-brand-grey bg-white shadow-[0_18px_50px_-35px_rgba(26,26,46,0.25)]';

const videoFrameClassName =
  'overflow-hidden rounded-xl border border-brand-grey bg-brand-grey/30 shadow-sm';

export function PortalPreviewCardShell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn(cardShellClassName, className)}>
      <div className="p-5 lg:p-4">
        <div className={videoFrameClassName}>{children}</div>
      </div>
    </div>
  );
}

export interface PortalMuxPreviewCardProps {
  preview: PortalPreview;
  isOfflineDemo?: boolean;
  videoClassName?: string;
  className?: string;
}

export function PortalMuxPreviewCard({
  preview,
  isOfflineDemo,
  videoClassName,
  className,
}: PortalMuxPreviewCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const hasPlayback = Boolean(preview.muxPlaybackId);
  const videoAreaClassName = cn(
    'aspect-video min-h-[220px] w-full sm:min-h-[260px] md:min-h-[300px]',
    videoClassName,
  );

  if (!hasPlayback) {
    return (
      <PortalPreviewCardShell className={className}>
        <div
          className={cn(
            videoAreaClassName,
            'flex flex-col items-center justify-center bg-brand-grey/15 px-3 text-center text-sm text-brand-dark/60',
          )}
        >
          <p>{isOfflineDemo ? 'Preview unavailable in offline demo' : 'Preview coming soon'}</p>
        </div>
      </PortalPreviewCardShell>
    );
  }

  if (isPlaying) {
    return (
      <PortalPreviewCardShell className={className}>
        <div className={cn(videoAreaClassName, 'bg-black')}>
          <MuxPublicPlayer
            playbackId={preview.muxPlaybackId}
            title={preview.title}
            className="aspect-video h-full min-h-[inherit] w-full"
          />
        </div>
      </PortalPreviewCardShell>
    );
  }

  const thumbnailUrl = muxThumbnailUrl(preview.muxPlaybackId);

  return (
    <PortalPreviewCardShell className={className}>
      <button
        type="button"
        className={cn(
          videoAreaClassName,
          'group relative block w-full overflow-hidden bg-brand-grey/20 text-left',
        )}
        onClick={() => setIsPlaying(true)}
        aria-label={`Play preview: ${preview.title}`}
      >
        <img
          src={thumbnailUrl}
          alt=""
          className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
          loading="lazy"
          decoding="async"
        />
        <span className="absolute inset-0 bg-brand-dark/20 transition-colors group-hover:bg-brand-dark/30" />
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex size-16 items-center justify-center rounded-full bg-white/95 text-brand-dark shadow-md md:size-14">
            <Play className="ml-1 size-7 fill-current md:size-6" aria-hidden />
          </span>
        </span>
      </button>
    </PortalPreviewCardShell>
  );
}

export function PortalPreviewCardSkeleton({ className }: { className?: string }) {
  return (
    <PortalPreviewCardShell className={className}>
      <div className="aspect-video min-h-[220px] w-full animate-pulse bg-brand-grey/25 sm:min-h-[260px] md:min-h-[300px]" />
    </PortalPreviewCardShell>
  );
}

export function PortalPreviewCardPlaceholder({
  message,
  className,
}: {
  message: string;
  className?: string;
}) {
  return (
    <PortalPreviewCardShell className={className}>
      <div className="flex aspect-video min-h-[220px] w-full items-center justify-center bg-brand-grey/15 px-3 text-center text-sm text-brand-dark/60 sm:min-h-[260px] md:min-h-[300px]">
        {message}
      </div>
    </PortalPreviewCardShell>
  );
}
