import request from '../utils/request';

const apiOrigin = 'http://localhost:7001/blog';

export async function articles() {
  return request(apiOrigin + '/articles')
}

export async function article(id) {
  return request(apiOrigin + '/article/' + id)
}

export async function articleComments(id, page, pageSize) {
  return request(`${apiOrigin}/article/${id}/comments/page/${page}${pageSize?'?pageSize=' + pageSize:''}`)
}
