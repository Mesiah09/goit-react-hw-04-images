import s from './loader.module.scss';
import { SpinnerInfinity } from 'spinners-react';
export default function Loader() {
  return (
    <div className={s.spinner}>
      {' '}
      <SpinnerInfinity enabled={true} size={150} />
    </div>
  );
}
