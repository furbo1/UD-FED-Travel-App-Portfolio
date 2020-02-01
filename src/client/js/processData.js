function processDates(dep, ret){

    let depDate = dep.split('-');
    depDate = depDate.join('/');
    let retDate = ret.split('-');
    retDate = retDate.join('/');
    let parsedDepDate = Date.parse(depDate);
    let parsedRetDate = Date.parse(retDate);
    let diff = parsedRetDate - parsedDepDate;
    diff = Math.ceil(diff/86400000)
    
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    today = yyyy + '/' + mm + '/' + dd;
    let parsedToday = Date.parse(today);
    let fromNow = parsedDepDate - parsedToday
    fromNow = Math.ceil(fromNow/86400000)

    return { 
        diff: diff,
        fromNow: fromNow,
        depDate: depDate,
        retDate: retDate
    };
}

export { processDates }