
const TimeAgo = (props) =>{
    const postedDate= props.date;
    const currentDate= new Date();
    const month = currentDate.getMonth()-postedDate.getMonth() ;
    const date=currentDate.getDate()-postedDate.getDate();
    const hour=currentDate.getHours()-postedDate.getHours();
    const mins=currentDate.getMinutes()-postedDate.getMinutes();

    if (month === 0){
        if (date === 0){
            if (hour===0){
                if (mins === 0){
                    return "Posted a few seconds ago"
                } else {
                    return `Posted ${mins} ${mins>1 ? 'mins':'min'} ago`
                }
            } else {
                return `Posted ${hour} ${hour>1 ? 'hours':'hour'} ago`
            }
        } else {
            return `Posted ${date} ${date>1 ? 'days':'day'} ago`
        }
    } else {
        return `Posted ${month} ${month>1 ? 'months':'month'} ago`
    }   
}

export default TimeAgo;