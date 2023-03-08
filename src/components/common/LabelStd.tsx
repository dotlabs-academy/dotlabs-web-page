interface LabelStdProps {
  label: string;
  htmlFor: string;
  className?: string;
}

export const LabelStd = ({ htmlFor, label, className }: LabelStdProps) => {
  return (
    <label htmlFor={htmlFor} className={className}>
      {label}
    </label>
  );
};
