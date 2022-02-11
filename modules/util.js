// Page Request
function getPageAttributes(request) {
  // Adding Pagination
  var limitValue = request.query.limit || 100;
  if (limitValue <= 0) {
    limitValue = 100;
  }
  var pageValue = request.query.page || 1;
  if (pageValue <= 0) {
    pageValue = 100;
  }

  const skipValue = (pageValue - 1) * limitValue
  return {
    limit: parseInt(limitValue, 10),
    skip: parseInt(skipValue, 10)
  };
}

function sleep(ms) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

module.exports = {
  getPageAttributes,
  sleep
};
