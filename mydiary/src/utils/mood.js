export function mood(num) {
	var moodValue=["mood",""]
	if(num==null)
		num=0;
	return moodValue[num];
}
