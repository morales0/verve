type Props<K extends number | string> = {
  value: K;
  onChange: (val: K) => void;
};

const SetInput = <K extends number | string>({ value, onChange }: Props<K>) => {
  if (typeof value === "string") {
    return <div>String input</div>;
  } else {
    return <div>Number input</div>;
  }
};

export default SetInput;
