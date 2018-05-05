import fetch from "../../../Resources/utils/fetch";
/**
 * Order 字段：
 * 	id - 订单id
 * 	amount - 订单金额，整数，单位分
 * 	title - 订单标题
 * 	timeoutInSeconds - 超时时间，单位秒
 * 	status - 订单状态
 * 	channel - 支付渠道
 * 	thirdPartyUserId - 第三方用户id，对于微信支付是openid
 */

export function orderStatusToText(status) {
	if (status == "WaitingForPayment") {
		return "等待支付";
	} else if (status == "Completed") {
		return "已支付";
	} else if (status == "Failed") {
		return "支付失败";
	} else if (status == "UserCancelled") {
		return "用户已取消";
	} else if (status == "SystemCancelled") {
		return "系统已取消";
	} else if (status == "StartedPayment") {
		return "正在支付";
	}
	return "";
}

/**
 * 新建一个order对象
 */
export function newOrder() {
	return {
		id: "",
		amount: 0,
		timeoutInSeconds: 60
	};
}

export function getOrder(id) {
	return fetch(`/pay/api/orders/${id}`, "GET");
}

export function createOrder(order) {
	return fetch("/pay/api/orders", "POST", {
		...order
	});
}

/**
 * 获取当前租户可用的支付渠道列表
 */
export function getChannels() {
	return fetch("/pay/api/payment/channels", "GET");
}

/**
 * 对指定订单，使用指定渠道开始支付
 * 返回的结果数据里包含channelPaymentParameters，为各个渠道的前端支付参数
 * @param {*} id
 * @param {*} channel
 */
export function startPayment(id, channel, extraParameters) {
	return fetch(
		"/pay/api/payment/start",
		"POST",
		{
			id,
			channel,
			parameters: extraParameters ? JSON.stringify(extraParameters) : ""
		},
		false
	);
}
