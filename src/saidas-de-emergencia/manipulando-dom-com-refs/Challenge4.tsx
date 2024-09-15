import { forwardRef, useRef } from "react";

type PropsMyInput = React.ComponentPropsWithRef<"input">;
type RefMyInput = HTMLInputElement;

export const SearchInput = forwardRef<RefMyInput, PropsMyInput>(
  (props, ref) => (
    <input {...props} ref={ref} placeholder="Looking for something?" />
  ),
);

export function SearchButton({ onSearch }: { onSearch: () => void }) {
  return <button onClick={onSearch}>Search</button>;
}

export default function Page() {
  const refInput = useRef<null | HTMLInputElement>(null);

  return (
    <>
      <nav>
        <SearchButton
          onSearch={() => {
            refInput.current?.focus();
          }}
        />
      </nav>
      <SearchInput ref={refInput} />
    </>
  );
}
