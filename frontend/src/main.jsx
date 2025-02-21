import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router';
import router from './routers/router';
import 'remixicon/fonts/remixicon.css';

import { Provider } from 'react-redux'
import { store } from './redux/store';

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);


