import dataSet from '../../dataSet.json';
import moment from 'moment';

export const getDataSet = () => {
    return dataSet;
}

export const filterPurchasesByMonth = (arrayOfPurchases, filterMonth) => {
    return arrayOfPurchases.filter(purchase => moment(purchase.date).format('M') == filterMonth);
}

//calculateSpent takes in an array of purchases and returns a float 00.00
export const calculateSpent = (purchases) => {
    return purchases.reduce(function(total, array) { 
        // return the sum with previous value
        return total + array.amount;
    },0).toFixed(2);
}

//calculatePoints takes in a single purchase or an array of purchases and returns the point value 
export const calculatePoints = (purchasesToBeCalculated) => {
    if (purchasesToBeCalculated === null || purchasesToBeCalculated === undefined) {
        return 0;
    }

    if (typeof purchasesToBeCalculated === "object" && Array.isArray(purchasesToBeCalculated)) {
        //array of multiple purchases to be calculated
        return purchasesToBeCalculated.reduce(function(total, purchase) {
            return total + calculate(parseInt(purchase.amount));
        },0);
    } else {
        //single purchase to calculate
        return calculate(parseInt(purchasesToBeCalculated.amount));
    } 

}

const calculate = (purchaseAmount) => {
    if (purchaseAmount < 51) {
        return 0;
    }

    if (purchaseAmount >= 101) {
        return ((purchaseAmount - 100) * 2) + calculate(100);
    } else if (purchaseAmount >= 51) {
        return ((purchaseAmount - 50) * 1) + calculate(50);
    }
}