import moment from 'moment';
const formatCurrency = (number) => {
	if (number >= 0) {
		return "$" + formatNumber(Math.abs(number).toFixed(2));
	}
	else {
		return "-$" + formatNumber(Math.abs(number).toFixed(2));
	}
}
const formatNumber = (number) => {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const formatCurrencyToFixed = (number) => {
	if (number >= 0) {
		return formatNumber(Math.abs(number).toFixed(2));
	}
	else {
		return formatNumber(Math.abs(number).toFixed(2));
	}
}
const formatCurrencyToFixedZero = (number) => {
	if (number >= 0) {
		return formatNumber(Math.abs(number).toFixed(0))
	} else {
		return formatNumber(Math.abs(number).toFixed(0))
	}

}
const formatToTimeStamp = (_time) => {
	let [time, period] = _time.split(' ');
	let [hours, minutes] = time.split(':')
	if (hours === '12')
		hours = '0'
	hours = period === 'PM' ? +hours + 12 : +hours
	minutes = +minutes
	let timestamp = new Date();
	timestamp.setHours(hours, minutes)
	return moment(timestamp, 'YYYY-MM-DD hh:mm A').unix()
}
export {
	formatCurrency,
	formatNumber,
	formatCurrencyToFixed, 
	formatToTimeStamp,
	formatCurrencyToFixedZero
}