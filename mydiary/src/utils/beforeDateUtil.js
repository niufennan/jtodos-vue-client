export function getBeforeMonth(year,month){
	if(month>0){
		return {year:year,month:--month}
	}else{
		return{
			year:--year,
			month:11
		}
	}
}
