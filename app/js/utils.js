function formatTime(totalSec){
	var hours = parseInt( totalSec / 3600 ) % 24;
	var minutes = parseInt( totalSec / 60 ) % 60;
	var seconds = totalSec % 60;

	var result = (hours < 1 ? '': hours + ':') ;
	result +=  (minutes < 1 ? "00:" : minutes + ':') ;
	result += (seconds  < 10 ? "0" + seconds : seconds);
	return result;
}