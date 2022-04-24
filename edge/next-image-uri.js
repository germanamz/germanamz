const querystring = require('querystring');

exports.handler = (event, ctx, cb) => {
  const request = event.Records[0].cf.request;
  const query = request.querystring && querystring.parse(request.querystring || '');

  if (query?.url?.length) {
    request.uri = query.url;
  }

  cb(null, request);
};
