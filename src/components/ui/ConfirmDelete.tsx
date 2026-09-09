interface Props {
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting?: boolean;
}

export default function ConfirmDelete({
  description,
  onConfirm,
  onCancel,
  isDeleting = false,
}: Props) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-zinc-400">
        Are you sure you want to delete{" "}
        <span className="text-zinc-100 font-medium">"{description}"</span>? This
        cannot be undone.
      </p>
      <div className="flex gap-3">
        <button
          onClick={onConfirm}
          disabled={isDeleting}
          className="flex-1 bg-red-600 hover:bg-red-500 disabled:opacity-50
                     text-white text-sm font-medium py-2.5 rounded-lg transition-colors"
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
        <button
          onClick={onCancel}
          className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300
                     text-sm font-medium py-2.5 rounded-lg transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
