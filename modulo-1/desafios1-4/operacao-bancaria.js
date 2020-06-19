const user = {
    name: "Jessica",
    transactions: [],
    balance: 0
};

//função para criar transacao:
function createTransaction (transaction){
    user.transactions.push(transaction);

    if (transaction.type === 'credit'){
        user.balance += transaction.value;
    }else{
        user.balance -= transaction.value;
    }
}
//maior valor
function getHigherTransactionByType(type){
    let maxValue = 0;
    let higherTransaction;

    for (let transaction of user.transactions){
        if (transaction.value > maxValue && transaction.type == type) {
            maxValue = transaction.value;
            higherTransaction = transaction;
        }
    }
    return higherTransaction;
}
//retorna valor médio das transações:
function getAverageTransactionValue (){
    let sum = 0;
    for (let transaction of user.transactions){
        sum += transaction.value;
    }
    return sum/user.transactions.length
}
//retorna o número de transações de cada tipo de operação bancária:
function getTransactionsCount(){
    let count = {
        credit: 0,
        debit: 0
    };
    for (let transaction of user.transactions){
        if (transaction.type === 'credit'){
            count.credit++;
    }else{
            count.debit++;
         }
    }   
    return count;
}

createTransaction({type: 'credit', value: 50});
createTransaction({type: 'credit', value: 120});
createTransaction({type: 'debit', value: 80});
createTransaction({type: 'debit', value: 30});

console.log(user.balance);

console.log(getHigherTransactionByType('credit'));
console.log(getHigherTransactionByType('debit'));

console.log(getAverageTransactionValue());

console.log(getTransactionsCount());