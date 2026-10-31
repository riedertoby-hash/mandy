// In-page confirmation dialog (browser confirm()/alert() are not available everywhere, e.g. embedded views).
interface Props {
  open: boolean;
  title: string;
  text?: string;
  confirmLabel: string;
  cancelLabel?: string;
  danger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({ open, title, text, confirmLabel, cancelLabel = 'Abbrechen', danger, onConfirm, onCancel }: Props) {
  if (!open) return null;
  return (
    <div className="dialog-backdrop" role="presentation" onClick={onCancel}>
      <div className="dialog card" role="dialog" aria-modal="true" aria-labelledby="dialog-title" onClick={(e) => e.stopPropagation()}>
        <h2 id="dialog-title">{title}</h2>
        {text && <p className="muted">{text}</p>}
        <div className="dialog-actions">
          <button className="btn ghost" onClick={onCancel} autoFocus>
            {cancelLabel}
          </button>
          <button className={`btn ${danger ? 'danger' : 'primary'}`} onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
