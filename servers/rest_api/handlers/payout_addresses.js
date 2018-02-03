
module.exports.index = await (request, reply) => {
  let accountId = request.auth.credentials.accessToken.account_id;
  var account = await Account.findOne({ where: { id: accountId } })

  return account;
}

