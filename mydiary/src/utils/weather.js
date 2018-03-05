export function weather(num) {
	var weatherValue=["wb_sunny",""]
	if(num==null)
		num=0;
	return "http://localhost:8082/images/3d_60/"+num+".png"
	//return "../assets/3d_60/"+num+".png"
}
