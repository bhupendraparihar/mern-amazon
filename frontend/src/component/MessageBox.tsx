import Alert from 'react-bootstrap/Alert';

type MessageBoxProps = {
  variant: string;
  children: any;
};
export default function MessageBox(props: MessageBoxProps) {
  return <Alert variant={props.variant || 'info'}>{props.children}</Alert>;
}
