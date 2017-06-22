import request from '../utils/request';

const apiOrigin = 'http://localhost:7001/blog';

export async function articles() {
  return request(apiOrigin + '/articles')
}

export async function article(id) {
  return request(apiOrigin + '/article/' + id)
}

export async function articleComments(articleId, page, pageSize) {
  return request(`${apiOrigin}/article/${articleId}/comments/page/${page}${pageSize?'?pageSize=' + pageSize:''}`)
}

export async function sendComment(articleId, { name, email, comment, referenceId }) {
  return request(`${apiOrigin}/article/${articleId}/comment`,{
    method: 'POST',
    headers: {'Content-Type': 'application/json; charset=UTF-8'},
    body: JSON.stringify({ name, email, comment, referenceId })
  })
}

export async function likeArticle(articleId) {
  return request(`${apiOrigin}/article/${articleId}/like`)
}

export async function dislikeArticle(articleId) {
  return request(`${apiOrigin}/article/${articleId}/dislike`)
}
