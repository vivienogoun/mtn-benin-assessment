export function Button({
  label,
  submit = false,
  onClick,
  classname,
}: {
  label: string;
  submit?: boolean;
  onClick?: () => void;
  classname?: string;
}) {
  return (
    <button
      type={submit ? "submit" : "button"}
      onClick={onClick}
      className={`px-4 py-2 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none cursor-pointer ${classname}`}
    >
      {label}
    </button>
  );
}
