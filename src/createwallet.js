//importando as dependencias
const bip32=require('bip32')
const bip39=require('bip39')
const bitcoin=require('bitcoinjs-lib')

//definir rede
const network=bitcoin.networks.testnet

//derivacao de carteiras HD
const path =`m/49'/1'/0'/0`

let mnemonic =bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)
//criando a raiz da carteira HD
let root = bip32.fromSeed(seed, network)
//criando uma conta-par priv-pubkeys
let acount = root.derivePath(path)
let node = acount.derive(0).derive(0)
const { address: btcAddress } = bitcoin.payments.p2pkh({
  pubkey: node.publicKey,
  network: network,
})

// saída
console.log("Carteira gerada")
console.log("Endereço: ", btcAddress)
console.log("Chave privada (WIF): ", node.toWIF())
console.log("Mnemonic (seed phrase): ", mnemonic)
