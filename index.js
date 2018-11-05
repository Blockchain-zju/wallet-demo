const { Api, JsonRpc, RpcError, JsSignatureProvider } = require('eosjs');
const fetch = require('node-fetch');                            // node only; not needed in browsers
const { TextDecoder, TextEncoder } = require('text-encoding');  // node, IE11 and IE Edge Browsers

const rpc = new JsonRpc('https://api.kylin-testnet.eospacex.com', { fetch });

// const defaultPrivateKey = "5JtUScZK2XEp3g9gh7F8bwtPTRAkASmNrrftmx4AxDKD5K4zDnr";


// account name: zjuwalletapp
// http://faucet.cryptokylin.io/create_account?zjuwalletapp
const account = {'msg': 'succeeded',
  'keys': {
    'active_key': {
      'public': 'EOS6Rd9FXo373NUXSpXvkA16mEeJvuJ64AekrGzVtGQLcegK6EjCm',
      'private': '5JCfVMhq62LR8iRsRALTHnZ98EuhpQ9wX4YJzTjzzPDxBbiBSPN'
    },
    'owner_key': {
      'public': 'EOS5EDRwpKuwRScjRHyRjAdAbNjuxisrJgv9GyxmCdeTqikUdfaLC',
      'private': '5JLcjL96DDKU3wu5sh4qF7TYAEVbgRe3CMfe3ddLJhDMtzJLZgW'
    }
  },
  'account': 'zjuwalletapp'
}


const signatureProvider = new JsSignatureProvider([account.keys.active_key.private]);

const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });


async function getBalance() {
  const result = await rpc.get_currency_balance('zjubcatokent', 'zjuwalletapp');
  console.log(result);
}

async function testTransfer() {
  const result = await api.transact({
    actions: [{
      account: 'zjubcatokent',
      name: 'transfer',
      authorization: [{
        actor: 'zjuwalletapp',
        permission: 'active',
      }],
      data: {
        from: 'zjuwalletapp',
        to: 'useraaaaaaaa',
        quantity: '0.0001 SYS',
        memo: '',
      },
    }]
  }, {
    blocksBehind: 3,
    expireSeconds: 30,
  });

  console.dir(result);
  //{ transaction_id: 'f0febc8814f586ea93f139404c97f87d989969b7abdb0bbe506d5ea975c9eab6',
  //   processed:
  //    { id: 'f0febc8814f586ea93f139404c97f87d989969b7abdb0bbe506d5ea975c9eab6',
  //      block_num: 19107755,
  //      block_time: '2018-11-05T12:21:08.000',
  //      producer_block_id: null,
  //      receipt: { status: 'executed', cpu_usage_us: 774, net_usage_words: 16 },
  //      elapsed: 774,
  //      net_usage: 128,
  //      scheduled: false,
  //      action_traces: [ [Object] ],
  //      except: null } }
}

getBalance();
