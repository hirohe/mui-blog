import {
  red200, pink200, purple200, deepPurple200,
  indigo200, blue200, lightBlue200, cyan200,
  yellow200, orange200, green500
} from 'material-ui/styles/colors';

const delay = (timeout) => new Promise(resolve => setTimeout(resolve, timeout));

const effectFactory = () => {

};

const randomMDColors = (n) => {
  let colors = [
    indigo200, blue200,
    purple200, deepPurple200,
    lightBlue200, cyan200,
    red200, pink200,
    yellow200, orange200, green500
  ];

  let _colors = [];
  if (n <= colors.length) {
    _colors = colors.sort((a, b) => {return .5 - Math.random()});
    return _colors.splice(0, n);
  } else {
    for (let i = 0; i < (n/colors.length) >> 0; i++) {
      _colors = _colors.concat(colors)
    }
    _colors = _colors.concat(colors.splice(0, n % colors.length));
    return _colors.sort((a, b) => {return .5 - Math.random()});
  }
};

export {
  delay,
  randomMDColors
}
