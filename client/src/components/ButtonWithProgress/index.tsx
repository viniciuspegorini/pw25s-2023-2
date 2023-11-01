interface IButtonWithProgress {
    className: string;
    disabled: boolean;
    pendingApiCall: boolean;
    text: string;
    onClick: () => void;
  }

export function ButtonWithProgress({
    className,
    disabled,
    pendingApiCall,
    text,
    onClick
  }: IButtonWithProgress) {
  
    return (
      <button
        disabled={disabled}
        className={className || "btn btn-primary"}
        onClick={onClick}
      >
        {pendingApiCall && (
          <div
            className="spinner-border text-light-spinner spinner-border-sm mr-sm-1"
            role="status"
          >
            <span className="visually-hidden">Aguarde...</span>
          </div>
        )}
        {text}
      </button>
    );
  }