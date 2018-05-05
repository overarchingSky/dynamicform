// import OSS from 'ali-oss';
// 目前直接打包oss报错未解决，只能通过页面直接引用ali CDN

import Env from '@/config/environment'

let protocol = window.location.protocol;

let client = new OSS.Wrapper({
  region: Env.oss.region,
  accessKeyId: Env.oss.accessKeyId,
  accessKeySecret: Env.oss.accessKeySecret,
	endpoint: protocol + Env.oss.endpoint,
	bucket: Env.oss.bucket
});

function sign(object, options = {expires: 3600}) {
	return client.signatureUrl(object, options);
}

export default {
	result:{},//解析前后的路径对照，以解析后的路径为key，解析前的路径为value
	sign: sign,
	signWithStyle: function(object, style, expires = 3600) {
		let signedUrl = sign(object, {
			process: 'style/' + style,
			expires: expires
		});
		this.result[signedUrl] = object
		return signedUrl
	}
}