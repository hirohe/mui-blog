import request from '../utils/request';

const apiOrigin = '';

export async function articles() {
  return request('/article')
}

export async function article(id) {
  return request('/article/' + id)
}
