import dva from 'dva';
import { useRouterHistory } from 'dva/router';
import { createHashHistory } from 'history';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './index.css';
//hightlight css
import 'highlightjs/styles/monokai.css';

injectTapEventPlugin();

// 1. Initialize
const app = dva({
  history: useRouterHistory(createHashHistory)({ queryKey: false }),
  onError(error, dispatch) {
    let message;
    switch (error.response.status) {
      case 401: {
        message = '验证失败';
        break
      }
      case 403: {
        message = '参数错误';
        break
      }
      case 500: {
        message = '服务器错误';
        break
      }
      default: {
        message = '未知错误';
      }
    }
    dispatch({
      type: 'snackbar/show',
      payload: { message }
    })
  }
});

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/Index'));
app.model(require('./models/Article'));
app.model(require('./models/Comment'));
app.model(require('./models/Snackbar'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
