
const Number = (props) =>{
    const {num}=props
    if (num >= 999){ 
        return `${(props.num/1000).toFixed(1)}K`
    } else{ 
        return props.num
    }
    
}

export default Number;