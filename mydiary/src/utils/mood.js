export function mood(num) {
	var moodValue=["sentiment_very_satisfied","sentiment_satisfied","sentiment_neutral","sentiment_dissatisfied","sentiment_very_dissatisfied"]
	if(num==null)
		num=0;
	return moodValue[num];
}
