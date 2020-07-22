module.exports = {
    
    age: function (timestamp){
        const today = new Date();
        const birthDate = new Date(timestamp);

        let age = today.getFullYear() - birthDate.getFullYear();
        const month = today.getMonth() - birthDate.getMonth();

        if (month == 0 || month < 0 && today.getDate() < birthDate.getDate()){
            age = age - 1;
        }
        return age;
    },
    graduation: function (degree) {
        if (degree === 'medio') return 'Ensino Médio Completo';
        if (degree === 'superior') return 'Ensino Superior Completo';
        if (degree === 'mestrado') return 'Mestrado';
        if (degree === 'doutorado') return 'Doutorado';
    },
    date: function(timestamp){
        const date = new Date(timestamp);

        const year = date.getUTCFullYear();
        const month = `0${date.getUTCMonth() + 1}`.slice(-2);
        const day = `0${date.getUTCDate()}`.slice(-2);

        return  {
            day, 
            month,
            year,
            iso: `${year}-${month}-${day}`,
            birthDay: `${day}/${month}`
        };
    },
    grade: function(grade){
        if(grade === '3EF') return '3º Série';
        if(grade === '4EF') return '4º Série';
        if(grade === '5EF') return '5º Série';
        if(grade === '6EF') return '6º Série';
        if(grade === '7EF') return '7º Série';
        if(grade === '8EF') return '8º Série';
        if(grade === '9EF') return '9º Série';
        if(grade === '1EM') return '1º Ano';
        if(grade === '2EM') return '2º Ano';
        if(grade === '3EM') return '3º Ano';
    }
}

