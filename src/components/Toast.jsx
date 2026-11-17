import { useApp } from '../context/AppContext';

export default function Toast() {
  const { toast } = useApp();
  return (
    <div id="toast" className={toast.visible ? 'on' : ''}>
      {toast.msg}
    </div>
  );
}
