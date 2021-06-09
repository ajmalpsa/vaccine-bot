const filterCenters = (centers) => {
    let new_center;
    new_center = centers.filter((center)=>center.sessions.filter((session)=>(session.available_capacity > 0)).length)
    return new_center;
}

module.exports = {filterCenters};