export default function CopyButton({ text, label }) {
  return (
    <>
      <button type="button" data-copy={text}>
        {label}
      </button>
      <span aria-live="polite" />
    </>
  );
}
