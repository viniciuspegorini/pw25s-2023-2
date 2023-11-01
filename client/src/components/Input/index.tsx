interface InputProps {
  name: string;
  className: string;
  label: string;
  type: string;
  placeholder: string;
  value: string;
  hasError: boolean;
  error: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export function Input({
  name,
  className,
  label,
  type,
  placeholder,
  value,
  hasError,
  error,
  onChange,
}: InputProps) {
  let inputClassName = className;
  if (hasError !== undefined) {
    inputClassName += hasError ? " is-invalid" : " is-valid";
  }
  return (
    <>
      <input
        name={name}
        className={inputClassName}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />      
      {label && <label htmlFor={name}>{label}</label>}
      {hasError && <div className="invalid-feedback">{error}</div>}
    </>
  );
}
