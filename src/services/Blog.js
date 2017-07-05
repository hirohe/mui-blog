import request from '../utils/request';
import qs from 'qs';

const apiOrigin = 'http://localhost:7001/blog';

export async function articles(page) {
  return request(apiOrigin + '/articles/page/' + page)
}

/* { field: value }, sort, order, exclude */
export async function queryArticles(fields, sort, order, exclude) {
  const params = { ...fields };
  if (sort) params.sort = sort;
  if (order) params.order = order;
  if (exclude) params.exclude = exclude;
  console.log(params);
  return request(`${apiOrigin}/articles?${qs.stringify(params)}`)
}

export async function article(id) {
  return request(apiOrigin + '/article/' + id)
}

export async function articleComments(articleId, page, pageSize) {
  return request(`${apiOrigin}/article/${articleId}/comments/page/${page}${pageSize?'?pageSize=' + pageSize:''}`)
}

export async function sendComment(articleId, { name, email, comment, referenceId }) {
  const data = { name, email, comment };
  if (referenceId) data.reference_id = referenceId;
  return request(`${apiOrigin}/article/${articleId}/comment`,{
    method: 'POST',
    headers: {'Content-Type': 'application/json; charset=UTF-8'},
    body: JSON.stringify(data)
  })
}

export async function likeArticle(articleId) {
  return request(`${apiOrigin}/article/${articleId}/like`)
}

export async function dislikeArticle(articleId) {
  return request(`${apiOrigin}/article/${articleId}/dislike`)
}
