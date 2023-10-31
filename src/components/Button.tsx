interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  label?: string;
  alt?: 'primary' | 'secondary';
}

export default function Button({ label, onClick, alt = 'primary', children }: Props) {
  if (alt === 'secondary') {
    return (
      <button className="rounded-3xl border border-solid border-black bg-white text-sm items-center py-2.5 px-3.5 hover:border-red-600 hover:text-white hover:bg-red-600" onClick={onClick}>
        { label || children }
      </button>
    );
  }

  return (
    <button className="rounded-3xl border border-solid text-sm text-white bg-red-600 py-2.5 px-3.5" onClick={onClick}>
      { label || children }
    </button>
  );
}