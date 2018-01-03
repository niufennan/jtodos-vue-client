export function weather(num) {
	var weatherValue=["wb_sunny",""]
	if(num==null)
		num=0;
	return weatherValue[num];
}
