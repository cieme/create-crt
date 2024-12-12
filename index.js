const fs = require('fs');
const forge = require('node-forge');

function generateSelfSignedCertificate() {
  const pki = forge.pki;

  // 生成 RSA 密钥对
  const keys = pki.rsa.generateKeyPair(2048);

  // 创建证书
  const cert = pki.createCertificate();
  cert.publicKey = keys.publicKey;
  cert.serialNumber = '01'; // 序列号
  cert.validity.notBefore = new Date(); // 开始时间
  cert.validity.notAfter = new Date(); // 结束时间
  cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 1); // 有效期 1 年

  // 设置证书颁发者和主题
  const attrs = [
    { name: 'commonName', value: 'localhost' }, // 通用名称
    { name: 'countryName', value: 'US' }, // 国家
    { name: 'organizationName', value: 'My Company' }, // 组织
    { shortName: 'ST', value: 'California' } // 省份/州
  ];
  cert.setSubject(attrs);
  cert.setIssuer(attrs);

  // 使用私钥对证书进行签名
  cert.sign(keys.privateKey, forge.md.sha256.create());

  // 导出为 PEM 格式
  const privateKeyPem = pki.privateKeyToPem(keys.privateKey);
  const certPem = pki.certificateToPem(cert);

  // 写入文件
  fs.writeFileSync('key.pem', privateKeyPem);
  fs.writeFileSync('cert.pem', certPem);

  console.log('Self-signed certificate generated:');
  console.log('key.pem and cert.pem have been saved.');
}

generateSelfSignedCertificate();
