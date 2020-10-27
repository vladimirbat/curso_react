import * as React from 'react';

interface ExampleProps {
  label: string
}

export const ExampleComponent: React.FunctionComponent<ExampleProps> = (props:ExampleProps) => {
  const {label} = props;
  return <div>
    <span>{label}</span><input type='text' />
  </div>;
}
