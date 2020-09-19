import querystring from 'querystring';

export const createQuerystring = <F>(filters: F, size?: number) => {
  const query = {};
  Object.entries(filters).forEach((key, value) => {
    query[`filter[${key}]`] = value;
  });
  if (size) {
    query['page[size]'] = size;
  }
  return querystring.stringify(query);
};
