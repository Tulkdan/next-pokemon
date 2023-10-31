interface Props extends React.HTMLAttributes<HTMLInputElement> {
  label: string;
  value: string;
}

export default function InputBase({ label, value, ...rest }: Props) {
  return (
    <div className="w-full">
      <span className="text-xs font-bold">
        {label}
      </span>
      <input
        type="text"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        {...rest}
        value={value}
      />
    </div>
  );
}
