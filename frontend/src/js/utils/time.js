export function timeAgo(time){
    var units = [
        { name: 'second', limit: 60, in_seconds: 1 },
        { name: 'minute', limit: 3600, in_seconds: 60 },
        { name: 'hour', limit: 86400, in_seconds: 3600  },
        { name: 'day', limit: 604800, in_seconds: 86400 },
        { name: 'week', limit: 2629743, in_seconds: 604800  },
        { name: 'month', limit: 31556926, in_seconds: 2629743 }
    ];
    var diff = (new Date() - new Date(time)) / 1000;
    if (diff < 5) return 'now';

    var i = 0, unit = units[i++];

    while (unit) {
        if (diff < unit.limit || !unit.limit){
            diff =  Math.floor(diff / unit.in_seconds);
            return diff + ' ' + unit.name + (diff>1 ? 's' : '') + ' ago';
        }else {
            return new Date(time).toDateString().replace(' ', ', ');
        }
        unit = units[i++];
    }
}

export function timeStamp(dateString){
    // console.log(dateString, new Date(dateString).getTime())
    return new Date(dateString).getTime();
}
