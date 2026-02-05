/**
 * ============================================================
 * VIDEO MODAL COMPONENT
 * ============================================================
 * Opens a YouTube video in a modal dialog.
 * 
 * TO CUSTOMIZE:
 * - Change the default YouTube URL in the component usage
 * - Adjust modal size by editing max-w-4xl class
 * ============================================================
 */

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface VideoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  videoUrl: string;
  title?: string;
}

const VideoModal = ({ open, onOpenChange, videoUrl, title = "How It Works" }: VideoModalProps) => {
  // Convert YouTube URL to embed format
  const getEmbedUrl = (url: string) => {
    const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?/]+)/)?.[1];
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : url;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-background border-border">
        <DialogHeader className="p-4 pb-0">
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="aspect-video w-full">
          <iframe
            src={open ? getEmbedUrl(videoUrl) : ""}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={title}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoModal;
