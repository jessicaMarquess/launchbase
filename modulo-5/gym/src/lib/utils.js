module.exports = {
    age(timestamp){
        const today = new Date ();
        const birthDate = new Date(timestamp);
    
        let age = today.getFullYear() - birthDate.getFullYear();
        const month = today.getMonth() - birthDate.getMonth();
        
        if(month == 0 || month < 0 && today.getDate() <= birthDate.getDate()){
            age = age - 1;
        }
        return age;
    },
    date(timestamp){
        const date = new Date(timestamp);

        const year = date.getUTCFullYear();
        const month = `0${date.getUTCMonth() + 1}`.slice(-2);
        const day = `0${date.getUTCDate()}`.slice(-2);

        return {
            day,
            month,
            year,
            iso: `${year}-${month}-${day}`,
            birthDay: `${day}/${month}`
        }; //iso
    },
    bloodGroups(tips){
        if (tips === 'A1') return 'A+';
        if (tips === 'A0') return 'A-';
        if (tips === 'B1') return 'B+';
        if (tips === 'B0') return 'B-';
        if (tips === 'AB1') return 'AB+';
        if (tips === 'AB0') return 'AB-';
        if (tips === 'O1') return 'O+';
        if (tips === 'O0') return 'O-';
    }
}