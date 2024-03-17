import { createRoot } from 'react-dom/client';
import './global.css';

import Counter from './Counter';

const root = createRoot(document.querySelector('#app')!);
root.render(<Counter />);
